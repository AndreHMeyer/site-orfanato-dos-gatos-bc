import { Cat, Mars, Venus, Clock3 } from 'lucide-react';
import { getDriveFolderUrl } from '@/lib/links';
import { ExternalLink } from './ui';

export function AdoptionCard({ sex, driveUrl }: { sex: 'female' | 'male'; driveUrl: string | null }) {
  const female = sex === 'female';
  const url = getDriveFolderUrl(driveUrl);
  const SexIcon = female ? Venus : Mars;
  return <article className={'adoption-card ' + (female ? 'female' : 'male')}>
    <div className="adoption-card-top"><span className="sex-label"><SexIcon size={17} aria-hidden="true" />{female ? 'Fêmeas' : 'Machos'}</span><Cat className="adoption-cat" size={68} strokeWidth={1.2} aria-hidden="true" /></div>
    <h3>Conheça {female ? 'as fêmeas' : 'os machos'}</h3>
    <p>Veja {female ? 'as gatinhas divulgadas' : 'os gatinhos divulgados'} para adoção.</p>
    <div className="adoption-card-bottom">{url
      ? <ExternalLink className="text-link" href={url}>Ver {female ? 'fêmeas' : 'machos'} no Drive</ExternalLink>
      : <p className="pending-label"><Clock3 size={16} aria-hidden="true" />Link em preparação</p>}
    </div>
  </article>;
}
