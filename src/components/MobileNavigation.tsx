'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { navigation } from '@/config/site';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const pendingFocus = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const header = container.current?.closest('header');
    if (!header) return;
    // A ampliação do texto pode aumentar a altura além do breakpoint nominal.
    const measure = () => document.documentElement.style.setProperty('--measured-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--measured-header-height');
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, .site-footer, .skip-link'));
    const focusable = () => [toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])].filter((element): element is HTMLElement => element !== null);

    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.dataset.mobileMenuOpen = 'true';
    background.forEach(element => { element.inert = true; });

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        pendingFocus.current = toggle.current;
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    desktop.addEventListener('change', onResize);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      desktop.removeEventListener('change', onResize);
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      delete body.dataset.mobileMenuOpen;
      background.forEach(element => { element.inert = false; });
    };
  }, [open]);

  useEffect(() => {
    if (open || !pendingFocus.current) return;
    pendingFocus.current.focus({ preventScroll: true });
    pendingFocus.current = null;
  }, [open]);

  function select(href: string) {
    if (!open) return;
    pendingFocus.current = document.getElementById(href.slice(1));
    setOpen(false);
  }
  function toggleMenu() {
    if (open) pendingFocus.current = toggle.current;
    setOpen(value => !value);
  }
  return <div className="navigation-container" ref={container}>
    <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={toggleMenu}>
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </button>
    <nav ref={panel} id="main-navigation" className="nav-panel" data-open={open} aria-label="Navegação principal">
      {navigation.map(item => <a key={item.href} href={item.href} onClick={() => select(item.href)}>{item.label}</a>)}
      <a className="button button-primary nav-donate" href="#doar" onClick={() => select('#doar')}><Heart size={17} aria-hidden="true" />Doar via Pix</a>
    </nav>
  </div>;
}
