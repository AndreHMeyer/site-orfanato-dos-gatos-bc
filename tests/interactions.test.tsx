import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { PixCopyButton } from '../src/components/PixCopyButton';
import { MobileNavigation } from '../src/components/MobileNavigation';
import { AdoptionCard } from '../src/components/AdoptionCard';
import { siteConfig } from '../src/config/site';
import Home from '../src/app/page';

const setClipboard = (value: unknown) => Object.defineProperty(navigator, 'clipboard', { configurable: true, value });

describe('Pix', () => {
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
  it.each([null, 'https://invalid.example/folders/test'])('não cria links falsos para pastas pendentes: %s', driveUrl => {
    render(<AdoptionCard sex="female" driveUrl={driveUrl} />);
    expect(screen.getByText('Link em preparação')).toBeVisible();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
  it('direciona cada sexo à sua própria pasta com aviso e atributos seguros', () => {
    const female = 'https://drive.google.com/drive/folders/TEST_female';
    const male = 'https://drive.google.com/drive/folders/TEST_male';
    render(<><AdoptionCard sex="female" driveUrl={female} /><AdoptionCard sex="male" driveUrl={male} /></>);
    expect(screen.getByRole('link', { name: /Ver fêmeas/ })).toHaveAttribute('href', female);
    expect(screen.getByRole('link', { name: /Ver machos/ })).toHaveAttribute('href', male);
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAccessibleName(/abre em nova aba/);
    }
  });
  it('renderiza os canais reais, chave completa e estados honestos na página', () => {
    render(<Home />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByText('Link em preparação')).toHaveLength(2);
    expect(screen.getByText(siteConfig.pix.key)).toBeVisible();
    expect(screen.getByRole('link', { name: /Visitar Instagram do bazar/ })).toHaveAttribute('href', siteConfig.socials.bazaarInstagram);
    expect(screen.getByRole('link', { name: /Seguir no Instagram/ })).toHaveAttribute('href', siteConfig.socials.instagram);
    for (const link of within(screen.getByRole('main')).getAllByRole('link')) {
      const href = link.getAttribute('href') ?? '';
      expect(href).not.toBe('#');
      expect(href).not.toMatch(/^(mailto:|tel:)|wa.me|whatsapp/);
      if (href.startsWith('https:')) expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
