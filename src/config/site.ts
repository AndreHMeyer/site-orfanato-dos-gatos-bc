export interface SiteConfig {
  name: string;
  shortName: string;
  location: string;
  pix: { keyType: 'email'; key: string; beneficiaryName: string | null; qrCodeAsset: string | null };
  socials: { instagram: string; bazaarInstagram: string };
  adoption: { femaleDriveUrl: string | null; maleDriveUrl: string | null; approvedProcess: string | null };
  contact: { whatsappNumber: string | null; email: string | null; address: string | null; openingHours: string | null };
  domain: string | null;
  cnpj: string | null;
  media: { hero: { src: string; alt: string } | null; about: { src: string; alt: string } | null; ogCover: string | null };
  editorial: { approved: boolean; universityCredit: string | null; officialHistory: string | null; collaborationRules: string | null };
}

/** null = informação ainda não fornecida/validada. Ver README antes de publicar. */
export const siteConfig: SiteConfig = {
  name: 'Orfanato dos Gatos BC',
  shortName: 'Orfanato dos Gatos',
  location: 'Balneário Camboriú – SC',
  pix: { keyType: 'email', key: 'orfanatodosgatos@gmail.com', beneficiaryName: null, qrCodeAsset: null },
  socials: {
    instagram: 'https://www.instagram.com/orfanatodosgatosbc/',
    bazaarInstagram: 'https://www.instagram.com/bazar_orfanatodosgatos',
  },
  adoption: { femaleDriveUrl: null, maleDriveUrl: null, approvedProcess: null },
  contact: { whatsappNumber: null, email: null, address: null, openingHours: null },
  domain: null,
  cnpj: null,
  media: { hero: null, about: null, ogCover: null },
  editorial: { approved: false, universityCredit: null, officialHistory: null, collaborationRules: null },
};

// Textos baseados no planejamento; aguardam aprovação editorial da ONG.
export const content = {
  hero: 'Conheça o trabalho do Orfanato dos Gatos BC e descubra como apoiar gatos que precisam de cuidado, carinho e uma nova oportunidade.',
  about: 'O Orfanato dos Gatos BC atua no acolhimento e cuidado de gatos em situação de vulnerabilidade, buscando oferecer a eles melhores condições e a oportunidade de encontrar um novo lar.',
  description: 'Conheça o Orfanato dos Gatos BC, veja como encontrar gatos para adoção em Balneário Camboriú e saiba como apoiar a ONG com doações via Pix.',
  title: 'Orfanato dos Gatos BC | Adoção, cuidado e solidariedade',
};

export const navigation = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#adocao', label: 'Adoção' },
  { href: '#como-adotar', label: 'Como adotar' },
  { href: '#ajude', label: 'Como ajudar' },
  { href: '#contato', label: 'Contato' },
] as const;
