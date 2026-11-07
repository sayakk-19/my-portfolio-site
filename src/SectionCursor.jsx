import React, { useEffect, useRef } from 'react';
import { sections } from './navigation';

const labels = new Map(sections.map(section => [section.id, section.label]));

export default function SectionCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const cursor = ref.current;
    const enabled = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let point, frame, x, y;
    const clear = () => {
      point = undefined;
      cursor.hidden = true;
      cancelAnimationFrame(frame);
      frame = undefined;
    };
    const draw = () => {
      frame = undefined;
      if (!point) return;
      const hit = document.elementFromPoint(point.x, point.y);
      const label = labels.get(hit?.closest('section[id]')?.id);
      if (!label) {
        cursor.hidden = true;
        return;
      }
      const targetX = point.x + (point.x > innerWidth - 140 ? -120 : 17);
      const targetY = point.y + (point.y > innerHeight - 44 ? -32 : 17);
      if (cursor.hidden) { x = targetX; y = targetY; }
      x += (targetX - x) * 0.24;
      y += (targetY - y) * 0.24;
      cursor.hidden = false;
      if (cursor.textContent !== label) cursor.textContent = label;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(x - targetX) + Math.abs(y - targetY) > 0.3) schedule();
    };
    const schedule = () => {
      if (point && frame === undefined) frame = requestAnimationFrame(draw);
    };
    const move = event => {
      if (!enabled.matches || event.pointerType !== 'mouse') return clear();
      point = { x: event.clientX, y: event.clientY };
      schedule();
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('blur', clear);
    document.documentElement.addEventListener('pointerleave', clear);
    enabled.addEventListener('change', clear);
    return () => {
      clear();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('blur', clear);
      document.documentElement.removeEventListener('pointerleave', clear);
      enabled.removeEventListener('change', clear);
    };
  }, []);

  return <span ref={ref} className="section-cursor" hidden aria-hidden="true" />;
}
