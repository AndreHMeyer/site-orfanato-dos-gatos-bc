import { Cat, ExternalLink, Mars, Venus } from 'lucide-react';
import { getDriveFolderUrl } from '@/lib/links';

export function AdoptionCard({ sex, driveUrl }: { sex: 'female' | 'male'; driveUrl: string | null }) {
  const female = sex === 'female';
  const url = getDriveFolderUrl(driveUrl);
  const SexIcon = female ? Venus : Mars;
  const buttonLabel = female ? 'Ver gatinhas' : 'Ver gatinhos';
  const descriptionId = `adoption-${sex}-description`;

  return <article className={'adoption-card ' + (female ? 'female' : 'male')}>
    <div className="adoption-card-top"><span className="sex-label"><SexIcon size={17} aria-hidden="true" />{female ? 'Fêmeas' : 'Machos'}</span><Cat className="adoption-cat" size={68} strokeWidth={1.2} aria-hidden="true" /></div>
    <h3>Conheça {female ? 'as fêmeas' : 'os machos'}</h3>
    <p id={descriptionId}>Conheça {female ? 'as gatinhas' : 'os gatinhos'} que procuram um novo lar.</p>
    <div className="adoption-card-bottom">{url
      ? <a className="button adoption-cta" href={url} target="_blank" rel="noopener noreferrer">{buttonLabel}<ExternalLink size={18} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>
      : <button className="button adoption-cta" type="button" disabled aria-describedby={descriptionId}>{buttonLabel}<ExternalLink size={18} aria-hidden="true" /></button>}
    </div>
  </article>;
}
