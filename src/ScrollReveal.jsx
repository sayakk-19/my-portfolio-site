import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const SequenceContext = createContext(null);

// Collect elements that enter together, then reveal them in document order.
// Later rows join the sequence when they actually reach the viewport.
export function ScrollSequence({ children, stagger = 0.11 }) {
  const pending = useRef(new Map());
  const visible = useRef(new Set());
  const frame = useRef(null);
  const nextSlot = useRef(0);

  const sequence = useMemo(() => ({
    enter(element, reveal) {
      visible.current.add(element);
      pending.current.set(element, reveal);
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        const batch = [...pending.current.entries()].filter(([node]) => node.isConnected);
        pending.current.clear();
        batch.sort(([a], [b]) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        const now = performance.now();
        let slot = Math.max(now, nextSlot.current);
        for (const [, start] of batch) {
          start(Math.max(0, (slot - now) / 1000));
          slot += stagger * 1000;
        }
        nextSlot.current = slot;
      });
    },
    leave(element) {
      pending.current.delete(element);
      visible.current.delete(element);
      if (!visible.current.size) nextSlot.current = 0;
    },
  }), [stagger]);

  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    pending.current.clear();
    visible.current.clear();
    nextSlot.current = 0;
  }, []);

  return <SequenceContext.Provider value={sequence}>{children}</SequenceContext.Provider>;
}

export default function ScrollReveal({ as: Element = 'div', children, className = '', distance = 32, direction = 'up', hover = false, ...props }) {
  const ref = useRef(null);
  const sequence = useContext(SequenceContext);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (reducedMotion || !window.IntersectionObserver || !el.animate) return;
    let animation;
    const offset = direction === 'up' ? `0 ${distance}px` : `${direction === 'left' ? -distance : distance}px 0`;
    const start = (delay = 0) => {
      animation?.cancel();
      animation = el.animate(
        [{ translate: offset, opacity: 0.75 }, { translate: '0 0', opacity: 1 }],
        { duration: 520, delay: Math.min(delay, 0.48) * 1000, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }
      );
    };
    // Content is visible at rest. Only decorate an entrance from below,
    // so returning upward or jumping to an anchor never waits for a reveal.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (entry.boundingClientRect.top < 0 || el.contains(document.activeElement)) return;
        if (sequence) sequence.enter(el, start);
        else start();
      } else {
        sequence?.leave(el);
        animation?.cancel();
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      sequence?.leave(el);
      animation?.cancel();
    };
  }, [sequence, distance, direction, reducedMotion]);

  return <Element ref={ref} className={`scroll-reveal ${hover ? 'reveal-hover' : ''} ${className}`} {...props}>{children}</Element>;
}
