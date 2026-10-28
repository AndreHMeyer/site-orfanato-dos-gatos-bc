export interface SiteConfig {
  name: string;
  shortName: string;
  location: string;
  pix: { keyType: 'email'; key: string; beneficiaryName: string | null; qrCodeAsset: string | null };
  socials: { instagram: string; bazaarInstagram: string };
  adoption: { femaleDriveUrl: string | null; maleDriveUrl: string | null; approvedProcess: string | null };
  contact: { whatsappNumber: string | null; email: string | null; address: string | null; openingHours: string | null; mapsDirectionsUrl: string };
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
  adoption: {
    femaleDriveUrl: 'https://drive.google.com/drive/folders/1HfU_bW0ckvWyxAlYe0pQ6j3FOqYSnVco',
    maleDriveUrl: 'https://drive.google.com/drive/folders/198_ebY4AQMtFQ-hru9L-PGA-ziVOjT-Y',
    approvedProcess: null,
  },
  contact: {
    whatsappNumber: null,
    email: null,
    address: null,
    openingHours: null,
    mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-26.97372595007401%2C-48.64839788898396',
  },
  domain: null,
  cnpj: null,
  media: {
    hero: { src: '/images/gatos/image03.webp', alt: 'Dois gatos juntos em um sofá, um de pelagem mesclada e outro laranja, em um ambiente aconchegante.' },
    about: { src: '/images/gatos/image02.webp', alt: 'Gatinho de pelagem clara e olhos azuis olhando para cima, diante de um fundo verde suave.' },
    ogCover: '/brand/og-cover.png',
  },
  editorial: { approved: false, universityCredit: null, officialHistory: null, collaborationRules: null },
};

// Textos baseados no planejamento; aguardam aprovação editorial da ONG.
export const content = {
  hero: 'Conheça o trabalho do Orfanato dos Gatos BC e descubra como apoiar gatos que precisam de cuidado, carinho e uma nova oportunidade.',
  about: 'O Orfanato dos Gatos BC atua no acolhimento e cuidado de gatos em situação de vulnerabilidade, buscando oferecer a eles melhores condições e a oportunidade de encontrar um novo lar.',
  description: 'Conheça o Orfanato dos Gatos BC, em Balneário Camboriú. Saiba mais sobre adoção responsável, conheça os gatos e descubra como ajudar a instituição.',
  title: 'Orfanato dos Gatos BC | Adoção e Proteção Animal',
};

export const navigation = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#adocao', label: 'Adoção' },
  { href: '#como-adotar', label: 'Como adotar' },
  { href: '#ajude', label: 'Como ajudar' },
  { href: '#contato', label: 'Contato' },
] as const;
