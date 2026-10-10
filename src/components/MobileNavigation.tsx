'use client';
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Heart, Menu, X } from 'lucide-react';
import { navigation } from '@/config/site';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const desktop = useSyncExternalStore(
    callback => {
      const query = window.matchMedia('(min-width: 1024px)');
      query.addEventListener('change', callback);
      return () => query.removeEventListener('change', callback);
    },
    () => window.matchMedia('(min-width: 1024px)').matches,
    () => false,
  );
  const toggle = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const pendingFocus = useRef<HTMLElement | null>(null);
  const pendingNavigation = useRef<string | null>(null);

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
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverscrollBehavior = root.style.overscrollBehavior;
    const previousRootScrollBehavior = root.style.scrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyRight = body.style.right;
    const previousBodyWidth = body.style.width;
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, .site-footer, .skip-link'));
    const previousInert = new Map(background.map(element => [element, element.inert]));
    const focusable = () => [toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])].filter((element): element is HTMLElement => element !== null);

    root.style.overflow = 'hidden';
    root.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.right = '0';
    body.style.width = '100%';
    body.dataset.mobileMenuOpen = 'true';
    background.forEach(element => { element.inert = true; });

    function closeMenu() {
      pendingFocus.current = toggle.current;
      setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
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
      if (container.current?.contains(event.target as Node) || panel.current?.contains(event.target as Node)) return;
      closeMenu();
    }
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) closeMenu(); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    desktop.addEventListener('change', onResize);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      desktop.removeEventListener('change', onResize);
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscrollBehavior;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.right = previousBodyRight;
      body.style.width = previousBodyWidth;
      delete body.dataset.mobileMenuOpen;
      previousInert.forEach((inert, element) => { element.inert = inert; });
      root.style.scrollBehavior = 'auto';
      if (scrollX !== 0 || scrollY !== 0) window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = previousRootScrollBehavior;
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    const href = pendingNavigation.current;
    if (href) {
      pendingNavigation.current = null;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}${href}`);
      target.focus({ preventScroll: true });
      const frame = window.requestAnimationFrame(() => {
        if (typeof target.scrollIntoView === 'function') {
          target.scrollIntoView({
            block: 'start',
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          });
        }
      });
      return () => window.cancelAnimationFrame(frame);
    }
    if (pendingFocus.current) {
      pendingFocus.current.focus({ preventScroll: true });
      pendingFocus.current = null;
    }
  }, [open]);

  function select(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    if (!open) return;
    pendingNavigation.current = href;
    setOpen(false);
  }
  function toggleMenu() {
    if (open) pendingFocus.current = toggle.current;
    setOpen(value => !value);
  }

  const overlay = <nav ref={panel} id="main-navigation" className="nav-panel nav-panel-overlay" data-open={open} aria-hidden={!open || desktop} aria-label="Navegação principal">
    {navigation.map(item => <a key={item.href} href={item.href} onClick={event => select(event, item.href)}>{item.label}</a>)}
    <a className="button button-primary nav-donate" href="#doar" onClick={event => select(event, '#doar')}><Heart size={17} aria-hidden="true" />Doar via Pix</a>
  </nav>;

  return <div className="navigation-container" ref={container}>
    <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={toggleMenu}>
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </button>
    <nav className="nav-panel nav-panel-desktop" aria-hidden={mounted && !desktop} aria-label="Navegação principal">
      {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
      <a className="button button-primary nav-donate" href="#doar"><Heart size={17} aria-hidden="true" />Doar via Pix</a>
    </nav>
    {mounted ? createPortal(overlay, document.body) : null}
  </div>;
}
