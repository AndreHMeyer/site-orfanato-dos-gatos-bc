'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function PixCopyButton({ pixKey }: { pixKey: string }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [announcement, setAnnouncement] = useState(0);
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(pixKey);
      setStatus('success');
    } catch { setStatus('error'); }
    setAnnouncement(value => value + 1);
  }
  return <div className="pix-action">
    <button type="button" className="button button-primary pix-copy" onClick={copy}>
      {status === 'success' ? <Check size={19} aria-hidden="true" /> : <Copy size={19} aria-hidden="true" />}
      Copiar chave Pix
    </button>
    <div className={'copy-status ' + (status === 'error' ? 'copy-error' : '')} role="status" aria-live="polite" aria-atomic="true">
      <span key={announcement}>{status === 'success' ? 'Chave Pix copiada!' : status === 'error' ? 'Não foi possível copiar automaticamente. Selecione a chave Pix acima e copie manualmente.' : ''}</span>
    </div>
  </div>;
}
