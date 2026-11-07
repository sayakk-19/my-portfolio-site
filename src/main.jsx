import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig, motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Mouse, Sparkles } from 'lucide-react';
import SectionCursor from './SectionCursor';
import Home from './Home';
import { Education, AboutStats } from './AboutDetails';
import Navbar from './Navbar';
import Sections from './Sections';
import useSmoothScroll from './useSmoothScroll';
import ScrollReveal, { ScrollSequence } from './ScrollReveal';
import './styles.css';
import './motion.css';
import './refinements.css';

function Portrait() {
  return (
    <div className="portrait-frame">
      <span className="portrait-orbit" aria-hidden="true" />
      <img src="/sayak-portrait.jpg" alt="Portrait of Sayak" width="1024" height="1024" fetchPriority="high" />
    </div>
  );
}

function App() {
  useSmoothScroll();
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);
  useEffect(() => {
    // Honor direct section URLs after React has rendered the destinations.
    const id = location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <motion.div className="reading-progress" style={{ scaleX: reducedMotion ? scrollYProgress : progress }} aria-hidden="true" />
      <div className="intro-grid" aria-hidden="true" />
      <SectionCursor />
      <Navbar theme={theme} toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
      <main id="main-content">
        <Home />
        <section id="about" ref={aboutRef} className={`hero container${aboutInView ? ' about-in-view' : ''}`} aria-labelledby="about-title">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow"><span className="status-dot" /> 02 / ABOUT ME</div>
              <h2 id="about-title">Crafting ideas.<br />Building <span className="serif-accent">what’s next.</span></h2>
              <p className="hero-intro">Hi, I’m <strong>Sayak</strong> <span className="wave" aria-hidden="true">↗</span></p>
              <p className="hero-description">I'm a final year student pursuing B. Tech in CSE</p>
              <Education />
              <div className="hero-actions"><a href="#project" className="primary-button">Explore my work <ArrowDownRight size={19} /></a><a href="#skill" className="text-link">Get to know me <ArrowUpRight size={17} /></a></div>
              <div className="hero-footnote"><span><Code2 size={15} /> Thoughtful code.</span><span><Sparkles size={15} /> A creative point of view.</span></div>
            </div>
            <div className="hero-art"><Portrait /></div>
            <AboutStats />
            <div className="hero-bottom"><a href="#skill" className="scroll-prompt"><Mouse size={17} /> SCROLL TO EXPLORE <ArrowDown size={14} /></a><span className="hero-bottom-note">ALWAYS CURIOUS. ALWAYS BUILDING.</span><span className="section-index">02 <span>/ 09</span></span></div>
        </section>
        <div className="principles-band" aria-label="Portfolio themes"><div className="container"><ScrollSequence stagger={0.065}>{['IDEA', '-', 'DESIGN', '-', 'DEVELOP', '-', 'REFINE', '-', 'REPEAT'].map((word, index) => <ScrollReveal as="span" key={index} aria-hidden={word === '-' || undefined} distance={18}>{word}</ScrollReveal>)}</ScrollSequence></div></div>
        <Sections />
      </main>
      <footer className="site-footer container"><ScrollSequence><ScrollReveal as="a" href="#home" className="wordmark">sayak<span className="wordmark-dot">.</span></ScrollReveal><ScrollReveal as="span">A little better, one iteration at a time.</ScrollReveal><ScrollReveal as="a" href="#home" className="text-link">Back to top <ArrowUpRight size={15} /></ScrollReveal></ScrollSequence></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>);
