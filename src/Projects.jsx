import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useInView, useMotionTemplate, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { Activity, ArrowLeft, ArrowRight, ArrowUpRight, Github, Pause, Play, ShieldCheck, Trophy } from 'lucide-react';
import { projects } from './projectData';
import ScrollReveal from './ScrollReveal';

const artworkIcons = { democamp: Trophy, cellscope: Activity, churnshield: ShieldCheck };

function BouncingDescription({ index, children }) {
  const slot = useRef(null);
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  // Use vertical scroll progress so horizontal carousel movement never retriggers the bounce.
  const { scrollYProgress } = useScroll({ target: slot, offset: ['start end', 'end start'] });
  const updateVisibility = value => setVisible(value > 0 && value < 1);
  useMotionValueEvent(scrollYProgress, 'change', updateVisibility);
  useEffect(() => updateVisibility(scrollYProgress.get()), [scrollYProgress]);
  return <li ref={slot}>
    <motion.div className="diagonal-entry project-point project-point-bounce" initial={false}
      animate={{ x: reducedMotion || visible ? 0 : (index % 2 ? 120 : -120) }}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 115, damping: 12, mass: 1, delay: visible ? index * 0.1 : 0 }}>
      {children}
    </motion.div>
  </li>;
}

function ProjectArtwork({ project, index }) {
  const Icon = artworkIcons[project.id];
  return (
    <div className={`project-artwork artwork-${project.id}`} aria-hidden="true">
      <div className="project-art-grid" />
      <div className="project-art-caption"><span>PROJECT 0{index + 1}</span><Icon size={15} /></div>
      <div className="project-art-name">{project.name}<span>↗</span></div>
      {project.id === 'democamp' && <div className="sports-art"><div className="sports-court" /><div className="sports-ball"><span /><span /></div></div>}
      {project.id === 'cellscope' && <div className="cell-art"><span /><span /><span /><span /><span /></div>}
      {project.id === 'churnshield' && <div className="churn-art"><div className="churn-bars"><span /><span /><span /><span /><span /><span /></div><ShieldCheck size={75} strokeWidth={1} /></div>}
      <span className="project-art-tagline">{project.artworkLabel}</span>
    </div>
  );
}

function ProjectCard({ project, index, duplicate }) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${pointerX}px ${pointerY}px, rgba(194,219,170,0.13), transparent 72%)`;

  const followPointer = (event) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - bounds.left);
    pointerY.set(event.clientY - bounds.top);
  };

  return (
    <article className="project-card" onPointerMove={followPointer}>
      <motion.div className="project-pointer-glow" style={{ background: spotlight }} aria-hidden="true" />
      <ProjectArtwork project={project} index={index} />
      <div className="project-card-body">
        <p className="project-category">{project.category}</p>
        <h3>{project.name}</h3>
        <ul className="project-description project-highlights">
          {project.highlights.map((point, pointIndex) => (
            <BouncingDescription key={point} index={pointIndex}>{point}</BouncingDescription>
          ))}
        </ul>
        <div className="project-skills"><h4>Skills and tools used</h4><ul>{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>
        <a className="project-github-link" href={project.url} target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined} onMouseDown={duplicate ? event => event.preventDefault() : undefined} aria-label={`Have a look at ${project.name} on GitHub`}><Github size={16} aria-hidden="true" /><span>Have a look</span><ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </article>
  );
}

export default function Projects() {
  const viewportRef = useRef(null);
  const groupRef = useRef(null);
  const loopWidth = useRef(0);
  const fraction = useRef(0);
  const manualUntil = useRef(0);
  const hovered = useRef(false);
  const focused = useRef(false);
  const touching = useRef(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const visible = useInView(viewportRef, { amount: 0.1 });

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const measure = () => { loopWidth.current = group.getBoundingClientRect().width; };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const viewport = viewportRef.current;
    if (!viewport || !visible || reducedMotion || paused || hovered.current || focused.current || touching.current || !loopWidth.current || performance.now() < manualUntil.current) return;
    // Increasing native scrollLeft moves cards left while retaining keyboard access.
    // Some browsers round each scrollLeft write. Carry the fractional pixels
    // forward so small frame intervals never stall the loop.
    fraction.current += Math.min(delta, 64) * 0.055;
    const pixels = Math.floor(fraction.current);
    if (!pixels) return;
    fraction.current -= pixels;
    const next = viewport.scrollLeft + pixels;
    viewport.scrollLeft = next >= loopWidth.current ? next - loopWidth.current : next;
  });

  const move = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    manualUntil.current = performance.now() + 1000;
    const card = viewport.querySelector('.project-card');
    const distance = (card?.getBoundingClientRect().width || 360) + 24;
    const position = loopWidth.current ? viewport.scrollLeft % loopWidth.current : viewport.scrollLeft;
    const currentIndex = Math.round(position / distance) % projects.length;
    const nextIndex = (currentIndex + direction + projects.length) % projects.length;
    viewport.scrollTo({ left: nextIndex * distance, behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  return (
    <div className={`project-showcase ${reducedMotion ? 'is-reduced-motion' : ''}`}>
      <ScrollReveal direction="left" className="project-showcase-toolbar" distance={24}>
        <p><span className="project-motion-dot" />{reducedMotion ? 'Scroll to explore the projects' : 'A few things I’ve built — pause to explore'}</p>
        <div className="project-controls" aria-label="Project carousel controls">
          {!reducedMotion && <button className="project-pause" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume automatic project sliding' : 'Pause automatic project sliding'}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? 'Resume' : 'Pause'}</span></button>}
          <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Previous project"><ArrowLeft size={16} aria-hidden="true" /></button>
          <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Next project"><ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </ScrollReveal>
      <div ref={viewportRef} className="project-viewport" role="region" aria-label="Selected projects" data-lenis-prevent-horizontal=""
        onPointerEnter={event => { hovered.current = event.pointerType === 'mouse'; }} onPointerLeave={() => { hovered.current = false; }}
        onFocusCapture={event => { focused.current = event.target.matches(':focus-visible'); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) focused.current = false; }}
        onPointerDown={event => { if (event.pointerType !== 'mouse') { touching.current = true; } }} onPointerUp={() => { touching.current = false; manualUntil.current = performance.now() + 750; }} onPointerCancel={() => { touching.current = false; manualUntil.current = performance.now() + 750; }}
        onWheel={event => { if (Math.abs(event.deltaX) > 1) manualUntil.current = performance.now() + 750; }}>
        <div className="project-track">
          <ul className="project-group" ref={groupRef}>{projects.map((project, index) => <li key={project.id}><ProjectCard project={project} index={index} /></li>)}</ul>
          {!reducedMotion && <ul className="project-group project-group-copy" aria-hidden="true">{projects.map((project, index) => <li key={project.id}><ProjectCard project={project} index={index} duplicate /></li>)}</ul>}
        </div>
      </div>
      <ScrollReveal as="p" className="project-mobile-hint">{reducedMotion ? 'Swipe to explore the projects.' : 'Swipe to explore. Use Pause to take your time.'}</ScrollReveal>
    </div>
  );
}
