import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { PixCopyButton } from '../src/components/PixCopyButton';
import { MobileNavigation } from '../src/components/MobileNavigation';
import { AdoptionCard } from '../src/components/AdoptionCard';
import { siteConfig } from '../src/config/site';
import Home from '../src/app/page';

const setClipboard = (value: unknown) => Object.defineProperty(navigator, 'clipboard', { configurable: true, value });

describe('Pix', () => {
  it('remove o sucesso anterior enquanto aguarda uma nova cópia e trata a rejeição', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<PixCopyButton pixKey={siteConfig.pix.key} />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByText('Chave Pix copiada!')).toBeVisible();
    let rejectCopy!: (reason: Error) => void;
    writeText.mockImplementationOnce(() => new Promise((_, reject) => { rejectCopy = reject; }));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Chave Pix copiada!')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Copiando chave Pix…');
    expect(screen.getByRole('button')).toBeDisabled();
    await act(async () => rejectCopy(new Error('NotAllowedError')));
    expect(screen.getByRole('status')).toHaveTextContent('copie manualmente');
    expect(screen.getByRole('button')).toBeEnabled();
  });
  it('copia exatamente a chave e confirma somente a cópia, inclusive repetida', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<PixCopyButton pixKey={siteConfig.pix.key} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copiar chave Pix' }));
    expect(await screen.findByText('Chave Pix copiada!')).toBeVisible();
    fireEvent.click(screen.getByRole('button'));
    expect(writeText).toHaveBeenCalledTimes(2);
    expect(writeText).toHaveBeenLastCalledWith('orfanatodosgatos@gmail.com');
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(screen.queryByText(/pagamento realizado/i)).not.toBeInTheDocument();
  });
  it.each(['negado', 'indisponível'])('orienta cópia manual quando o clipboard está %s', async mode => {
    setClipboard(mode === 'negado' ? { writeText: vi.fn().mockRejectedValue(new Error('NotAllowedError')) } : undefined);
    render(<PixCopyButton pixKey={siteConfig.pix.key} />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByText('Não foi possível copiar automaticamente. Selecione a chave Pix acima e copie manualmente.')).toBeVisible();
  });
  it('permite copiar com Enter e Espaço', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render(<PixCopyButton pixKey={siteConfig.pix.key} />);
    await user.tab();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(writeText).toHaveBeenCalledTimes(2);
  });
});
describe('Menu móvel', () => {
  it('abre, fecha com Escape e devolve o foco ao controle', async () => {
    const user = userEvent.setup();
    render(<MobileNavigation />);
    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveFocus();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });
  it('fecha ao escolher seção e coloca foco no destino', async () => {
    const user = userEvent.setup();
    render(<><MobileNavigation /><section id="adocao" tabIndex={-1}>Destino</section></>);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('link', { name: 'Adoção' }));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Destino')).toHaveFocus();
  });
});
describe('Adoção e canais oficiais', () => {
  it.each([null, 'https://invalid.example/folders/test'])('mantém o botão desabilitado sem criar links falsos quando não há pasta válida: %s', driveUrl => {
    render(<AdoptionCard sex="female" driveUrl={driveUrl} />);
    expect(screen.getByRole('button', { name: 'Ver gatinhas' })).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAccessibleDescription('Conheça as gatinhas que procuram um novo lar.');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
  it('direciona cada sexo à sua própria pasta com aviso e atributos seguros', () => {
    const female = 'https://drive.google.com/drive/folders/TEST_female';
    const male = 'https://drive.google.com/drive/folders/TEST_male';
    render(<><AdoptionCard sex="female" driveUrl={female} /><AdoptionCard sex="male" driveUrl={male} /></>);
    const femaleLink = screen.getByRole('link', { name: /Ver gatinhas/ });
    const maleLink = screen.getByRole('link', { name: /Ver gatinhos/ });
    expect(femaleLink).toHaveAttribute('href', female);
    expect(maleLink).toHaveAttribute('href', male);
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAccessibleName(/abre em nova aba/);
      expect(link.querySelector('a, button')).toBeNull();
    }
  });
  it.each(['none', 'female', 'male', 'both'] as const)('mantém a apresentação definitiva em todos os estados de disponibilidade: %s', available => {
    const original = { ...siteConfig.adoption };
    try {
      siteConfig.adoption.femaleDriveUrl = available === 'female' || available === 'both' ? 'https://drive.google.com/drive/folders/TEST_female' : null;
      siteConfig.adoption.maleDriveUrl = available === 'male' || available === 'both' ? 'https://drive.google.com/drive/folders/TEST_male' : null;
      render(<Home />);
      const adoption = screen.getByRole('region', { name: /Seu novo melhor amigo/ });
      const steps = screen.getByRole('region', { name: 'Como funciona a adoção?' });
      expect(within(adoption).getByText('Explore as galerias de fêmeas e machos e conheça os gatos divulgados pelo Orfanato. Quem sabe seu novo companheiro está esperando por você?')).toBeVisible();
      expect(within(steps).getByText('Explore as galerias de fêmeas e machos e conheça os gatos divulgados pelo Orfanato.')).toBeVisible();
      expect(within(adoption).queryByText(/preparad/i)).not.toBeInTheDocument();
      if (available !== 'both') expect(within(adoption).getByRole('link', { name: /Ver Instagram da ONG/ })).toHaveAttribute('href', siteConfig.socials.instagram);
      const count = available === 'both' ? 2 : available === 'none' ? 0 : 1;
      expect(within(adoption).queryAllByRole('link', { name: /Ver gatinh[ao]s/ })).toHaveLength(count);
      expect(within(adoption).queryAllByRole('button', { name: /Ver gatinh[ao]s/ })).toHaveLength(2 - count);
    } finally {
      Object.assign(siteConfig.adoption, original);
    }
  });
  it('renderiza os canais reais, chave completa e estados honestos na página', () => {
    render(<Home />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    for (const button of screen.getAllByRole('button', { name: /Ver gatinh[ao]s/ })) expect(button).toBeDisabled();
    expect(screen.getByText(siteConfig.pix.key)).toBeVisible();
    expect(screen.getByRole('link', { name: /Visitar Instagram do bazar/ })).toHaveAttribute('href', siteConfig.socials.bazaarInstagram);
    expect(screen.getByRole('link', { name: /Seguir no Instagram/ })).toHaveAttribute('href', siteConfig.socials.instagram);
    expect(screen.getByRole('link', { name: /Como chegar/ })).toHaveAttribute('href', siteConfig.contact.mapsDirectionsUrl);
    expect(screen.getByRole('link', { name: /Como chegar/ })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: /Como chegar/ })).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('Entre em contato com a ONG antes de realizar uma visita.')).toBeVisible();
    for (const link of within(screen.getByRole('main')).getAllByRole('link')) {
      const href = link.getAttribute('href') ?? '';
      expect(href).not.toBe('#');
      expect(href).not.toMatch(/^(mailto:|tel:)|wa.me|whatsapp/);
      if (href.startsWith('https:')) expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
