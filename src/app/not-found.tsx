import Link from 'next/link';
import { House } from 'lucide-react';
export default function NotFound() {
  return <main className="not-found"><House size={48} aria-hidden="true" /><p className="eyebrow">Página não encontrada</p><h1>Vamos voltar para casa?</h1><p>Este endereço não está disponível.</p><Link href="/" className="button button-primary">Voltar ao início</Link></main>;
}
