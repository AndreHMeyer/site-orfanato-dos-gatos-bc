import Image from 'next/image';
import { ArrowDown, ArrowRight, Cat, Heart, HeartHandshake, House, MapPin, MessageCircle, Navigation, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { content, navigation, siteConfig } from '@/config/site';
import { getAdoptionContent } from '@/lib/adoption';
import { withBasePath } from '@/lib/paths';
import { MobileNavigation } from '@/components/MobileNavigation';
import { PixCopyButton } from '@/components/PixCopyButton';
import { AdoptionCard } from '@/components/AdoptionCard';
import { CatIllustration, ExternalLink, Eyebrow, Instagram } from '@/components/ui';

const steps = [
  { icon: Cat, title: 'Conheça os gatos', text: null },
  { icon: MessageCircle, title: 'Converse com a ONG', text: 'Entre em contato pelo perfil oficial para tirar suas dúvidas.' },
  { icon: HeartHandshake, title: 'Receba orientações', text: 'A instituição explicará os critérios e os próximos passos da adoção.' },
  { icon: House, title: 'Adote com responsabilidade', text: 'Prepare-se para cuidar do seu novo companheiro.' },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#inicio" className={'brand ' + (footer ? 'brand-footer' : '')} aria-label="Orfanato dos Gatos BC — início">
    <Image src={withBasePath('/brand/logo-original.png')} alt="Orfanato dos Gatos BC" width={68} height={68} loading={footer ? 'lazy' : 'eager'} />
    <span aria-hidden="true"><strong>Orfanato dos Gatos</strong><small>Balneário Camboriú · SC</small></span>
  </a>;
}

export default function Home() {
  const adoptionContent = getAdoptionContent(siteConfig.adoption);
  return <>
    <a className="skip-link" href="#conteudo">Pular para conteúdo</a>
    <header className="site-header">
      <div className="container header-inner"><Brand /><MobileNavigation /></div>
      <noscript><nav className="no-js-nav" aria-label="Navegação sem JavaScript">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}<a href="#doar">Doar via Pix</a></nav></noscript>
    </header>
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className="hero-section" aria-labelledby="hero-title" tabIndex={-1}>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="location-label"><MapPin size={15} aria-hidden="true" />Balneário Camboriú · SC</p>
              <h1 id="hero-title">Todo gatinho merece um <span>lar cheio de amor.</span></h1>
              <p className="hero-description">{content.hero}</p>
              <div className="hero-actions"><a href="#adocao" className="button button-primary">Conhecer os gatos<ArrowRight size={18} aria-hidden="true" /></a><a href="#doar" className="button button-secondary">Fazer uma doação<Heart size={18} aria-hidden="true" /></a></div>
              <a href="#sobre" className="discover-link"><span><ArrowDown size={17} aria-hidden="true" /></span>Conheça a nossa causa</a>
            </div>
            <figure className={'hero-art' + (siteConfig.media.hero ? ' hero-photo' : '')}>
              {siteConfig.media.hero ? <Image className="real-photo" src={withBasePath(siteConfig.media.hero.src)} alt={siteConfig.media.hero.alt} width={980} height={653} sizes="(max-width: 767px) min(530px, calc(100vw - 40px)), (max-width: 1023px) 530px, (max-width: 1199px) calc((100vw - 105px) / 2), (max-width: 1279px) calc((100vw - 128px) / 2), 576px" preload /> : <>
                <div className="art-note"><Heart size={16} aria-hidden="true" />Um lar muda tudo.</div>
                <CatIllustration />
                <figcaption>Ilustração do Orfanato dos Gatos BC</figcaption>
              </>}
            </figure>
          </div>
          <div className="cause-strip" aria-label="Nossa causa">
            <span><House size={21} strokeWidth={1.6} aria-hidden="true" />Acolher com carinho</span>
            <span><HeartHandshake size={23} strokeWidth={1.6} aria-hidden="true" />Cuidar de cada vida</span>
            <span><Heart size={21} strokeWidth={1.6} aria-hidden="true" />Conectar novos lares</span>
          </div>
        </div>
      </section>

      <section id="sobre" className="section about-section" aria-labelledby="about-title" tabIndex={-1}>
        <div className="container about-grid">
          <div className="about-visual">
            {siteConfig.media.about ? <Image className="real-photo" src={withBasePath(siteConfig.media.about.src)} alt={siteConfig.media.about.alt} width={547} height={806} sizes="(max-width: 767px) min(530px, calc(100vw - 40px)), (max-width: 1023px) calc((100vw - 100px) * 0.475), (max-width: 1199px) calc((100vw - 130px) * 0.475), (max-width: 1279px) calc((100vw - 168px) * 0.475), 529px" loading="lazy" /> : <div className="about-art">
              <div className="about-orbit" aria-hidden="true"><span /><span /><span /></div>
              <div className="about-logo"><Image src={withBasePath('/brand/logo-original.png')} alt="Orfanato dos Gatos BC" width={220} height={220} /></div>
              <p>Cuidado que acolhe.<br /><strong>Amor que encontra um lar.</strong></p>
            </div>}
          </div>
          <div className="about-copy"><Eyebrow>Sobre o orfanato</Eyebrow><h2 id="about-title">Cuidando de vidas,<br />transformando histórias.</h2><p>{siteConfig.editorial.officialHistory ?? content.about}</p><p>O apoio da comunidade é parte importante desse trabalho. E você pode fazer parte dessa história.</p><ExternalLink href={siteConfig.socials.instagram} className="text-link">Conheça nosso Instagram</ExternalLink></div>
        </div>
      </section>

      <section id="adocao" className="section adoption-section" aria-labelledby="adoption-title" tabIndex={-1}>
        <div className="container">
          <div className="section-intro"><div><Eyebrow>Adoção responsável</Eyebrow><h2 id="adoption-title">Seu novo melhor amigo<br className="desktop-break" /> pode estar esperando<br className="desktop-break" /> por você.</h2></div><p>{adoptionContent.description}</p></div>
          <div className="adoption-grid"><AdoptionCard sex="female" driveUrl={siteConfig.adoption.femaleDriveUrl} /><AdoptionCard sex="male" driveUrl={siteConfig.adoption.maleDriveUrl} /></div>
          {!adoptionContent.complete ? <div className="adoption-fallback"><ExternalLink href={siteConfig.socials.instagram} className="text-link"><Instagram size={19} aria-hidden="true" />Ver Instagram da ONG</ExternalLink></div> : null}
          <p className="availability-note"><ShieldCheck size={17} aria-hidden="true" />A disponibilidade e as condições de adoção devem ser confirmadas diretamente com a ONG.</p>
        </div>
      </section>

      <section id="como-adotar" className="section steps-section" aria-labelledby="steps-title" tabIndex={-1}>
        <div className="container">
          <div className="center-heading"><Eyebrow>Um encontro, uma nova história</Eyebrow><h2 id="steps-title">Como funciona a adoção?</h2><p>O caminho começa com carinho e uma boa conversa.</p></div>
          <ol className="steps-grid">{steps.map((step, index) => <li key={step.title}><div className="step-top"><span className="step-icon"><step.icon size={27} strokeWidth={1.6} aria-hidden="true" /></span><span className="step-number" aria-hidden="true">0{index + 1}</span></div><h3>{step.title}</h3><p>{step.text ?? adoptionContent.firstStep}</p></li>)}</ol>
          {siteConfig.adoption.approvedProcess ? <p className="approved-process">{siteConfig.adoption.approvedProcess}</p> : null}
          <div className="center-action"><ExternalLink href={siteConfig.socials.instagram} className="button button-secondary"><Instagram size={18} aria-hidden="true" />Falar com a ONG no Instagram</ExternalLink></div>
        </div>
      </section>

      <section id="ajude" className="help-section" aria-label="Como ajudar" tabIndex={-1}>
        <section id="doar" className="section donate-section" aria-labelledby="donate-title" tabIndex={-1}>
          <div className="container donate-grid">
            <div className="donate-copy"><Eyebrow>Um gesto de solidariedade</Eyebrow><h2 id="donate-title">Sua ajuda faz parte<br />dessa história<span className="coral-dot">.</span></h2><p>Contribua com o trabalho do Orfanato dos Gatos BC por meio da chave Pix informada pela instituição.</p><div className="donation-note"><span><Heart size={24} strokeWidth={1.5} aria-hidden="true" /></span><p>Mais cuidado.<br /><strong>Mais oportunidades de um novo lar.</strong></p></div></div>
            <div className="pix-card">
              <div className="pix-card-header"><span className="pix-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m16 2 8 8-5 5a4 4 0 0 1-6 0l-5-5 8-8Zm14 14-6 6-5-5a4 4 0 0 0-6 0l-5 5-6-6 6-6 5 5a4 4 0 0 0 6 0l5-5 6 6ZM16 30l-8-8 5-5a4 4 0 0 1 6 0l5 5-8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></span><h3>Doe via Pix</h3></div>
              <p className="pix-label">Chave Pix (e-mail)</p>
              <p className="pix-key" id="pix-key">{siteConfig.pix.key}</p>
              {siteConfig.pix.beneficiaryName ? <p className="beneficiary">Recebedor: {siteConfig.pix.beneficiaryName}</p> : null}
              <PixCopyButton pixKey={siteConfig.pix.key} />
              <noscript><p className="small-text">Selecione a chave acima e copie manualmente.</p></noscript>
              {siteConfig.pix.qrCodeAsset ? <Image className="pix-qr" src={withBasePath(siteConfig.pix.qrCodeAsset)} alt="QR Code Pix oficial validado pelo Orfanato dos Gatos BC" width={200} height={200} /> : null}
              <p className="pix-instructions"><ShieldCheck size={19} aria-hidden="true" /><span>No aplicativo do seu banco, escolha Pix, cole a chave e confira os dados do recebedor antes de confirmar a doação.</span></p>
            </div>
          </div>
        </section>
        <section id="bazar" className="section bazaar-section" aria-labelledby="bazaar-title" tabIndex={-1}>
          <div className="container"><div className="bazaar-block">
            <div className="bazaar-art" aria-hidden="true"><div className="bag-circle"><ShoppingBag size={82} strokeWidth={1.1} /><Heart size={28} className="bag-heart" strokeWidth={1.5} /></div><Sparkles className="bag-sparkle" size={27} strokeWidth={1.3} /><span className="bag-dot" /></div>
            <div className="bazaar-copy"><Eyebrow>Bazar solidário</Eyebrow><h2 id="bazaar-title">Conheça também<br />nosso bazar.</h2><p>Acompanhe as novidades do bazar do Orfanato dos Gatos no Instagram.</p><ExternalLink href={siteConfig.socials.bazaarInstagram} className="button button-coral"><Instagram size={18} aria-hidden="true" />Visitar Instagram do bazar</ExternalLink></div>
          </div></div>
        </section>
      </section>

      <section id="contato" className="contact-section" aria-labelledby="contact-title" tabIndex={-1}>
        <div className="container contact-grid"><div><Eyebrow light>Vamos ficar por perto</Eyebrow><h2 id="contact-title">Acompanhe de perto<br />cada história.</h2><p>Confira as atualizações e novidades do Orfanato dos Gatos BC em seu perfil oficial.</p></div><div className="contact-action"><div className="contact-group contact-instagram"><ExternalLink href={siteConfig.socials.instagram} className="button button-white"><Instagram size={20} aria-hidden="true" />Seguir no Instagram</ExternalLink><span>@orfanatodosgatosbc</span></div><div className="contact-group contact-location"><p><MapPin size={15} aria-hidden="true" />{siteConfig.location}</p><ExternalLink href={siteConfig.contact.mapsDirectionsUrl} className="button button-outline-white"><Navigation size={18} aria-hidden="true" />Como chegar</ExternalLink><small>Entre em contato com a ONG antes de realizar uma visita.</small></div></div></div>
      </section>
    </main>
    <footer className="site-footer"><div className="container">
      <div className="footer-main"><div className="footer-brand"><Brand footer /><p>Cuidado, acolhimento e novas<br />oportunidades para gatos.</p></div><nav aria-label="Navegação do rodapé"><p className="footer-label">Explore</p>{navigation.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</nav><div className="footer-social"><p className="footer-label">Faça parte</p><ExternalLink href={siteConfig.socials.instagram} className="footer-link">Instagram da ONG</ExternalLink><ExternalLink href={siteConfig.socials.bazaarInstagram} className="footer-link">Instagram do bazar</ExternalLink><a href="#doar" className="footer-link">Doar via Pix<Heart size={15} aria-hidden="true" /></a></div></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} {siteConfig.name}</p><p>{siteConfig.location}<Heart size={13} aria-hidden="true" /></p></div>
      {siteConfig.editorial.universityCredit ? <p className="university-credit">{siteConfig.editorial.universityCredit}</p> : null}
    </div></footer>
  </>;
}
