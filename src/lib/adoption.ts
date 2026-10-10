import type { SiteConfig } from '@/config/site';
import { getDriveFolderUrl } from '@/lib/links';

/** Disponibilidade derivada da configuração; atualizada a cada build estático. */
export function getAdoptionContent(adoption: SiteConfig['adoption']) {
  const female = !!getDriveFolderUrl(adoption.femaleDriveUrl);
  const male = !!getDriveFolderUrl(adoption.maleDriveUrl);

  return {
    complete: female && male,
    description: 'Explore as galerias de fêmeas e machos e conheça os gatos divulgados pelo Orfanato. Quem sabe seu novo companheiro está esperando por você?',
    firstStep: 'Explore as galerias de fêmeas e machos e conheça os gatos divulgados pelo Orfanato.',
  };
}
