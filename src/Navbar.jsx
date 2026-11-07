import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { sections, useActiveSection } from './navigation';

export default function Navbar({ theme, toggleTheme }) {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const desktop = matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  const links = (mobile = false) => sections.map(({ id, label }, index) => (
    <a
      key={id}
      href={`#${id}`}
      className={`nav-link ${active === id ? 'is-active' : ''}`}
      aria-current={active === id ? 'location' : undefined}
      onClick={() => setOpen(false)}
    >
      {active === id && !mobile && (
        <motion.span
          className="nav-indicator"
          layoutId="active-section"
          aria-hidden="true"
          transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 370, damping: 32 }}
        />
      )}
      {mobile && <span className="nav-number" aria-hidden="true">0{index + 1}</span>}
      <span className="nav-label">{label}</span>
      {mobile && <ArrowUpRight size={17} aria-hidden="true" />}
    </a>
  ));

  return (
    <header className="site-header">
      <div className="navbar container">
        <a className="wordmark" href="#home" aria-label="Sayak, back to Home" onClick={() => setOpen(false)}>
          <span>sayak<span className="wordmark-dot">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">{links()}</nav>
        <div className="nav-actions">
          <span className="nav-edition">PORTFOLIO</span>
          <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </button>
          <button ref={toggle} className="icon-button menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" data-lenis-prevent="" initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
          <div className="container">{links(true)}</div>
          <p className="mobile-nav-note">A little curiosity. A lot of possibility.</p>
        </motion.nav>
      )}
    </header>
  );
}
