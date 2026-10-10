'use client';
import { useEffect, useRef, useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { navigation } from '@/config/site';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    }
    function onPointer(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function onFocus(event: FocusEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('focusin', onFocus);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('focusin', onFocus);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);
  function select(href: string) {
    if (!open) return;
    setOpen(false);
    document.getElementById(href.slice(1))?.focus({ preventScroll: true });
  }
  return <div className="navigation-container" ref={container}>
    <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </button>
    <nav id="main-navigation" className="nav-panel" data-open={open} aria-label="Navegação principal">
      {navigation.map(item => <a key={item.href} href={item.href} onClick={() => select(item.href)}>{item.label}</a>)}
      <a className="button button-primary nav-donate" href="#doar" onClick={() => select('#doar')}><Heart size={17} aria-hidden="true" />Doar via Pix</a>
    </nav>
  </div>;
}
