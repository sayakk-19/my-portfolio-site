import { useEffect, useState } from 'react';

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skill', label: 'Skill' },
  { id: 'project', label: 'Project' },
  { id: 'certification', label: 'Certification' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'internship', label: 'Internship' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    let frame;
    const measure = () => {
      const header = document.querySelector('.site-header');
      const line = (header?.getBoundingClientRect().bottom || 90) + 65;
      let current = sections[0].id;
      for (const { id } of sections) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections.at(-1).id;
      }
      setActive(current);
      frame = undefined;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    schedule();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    addEventListener('hashchange', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      removeEventListener('hashchange', schedule);
    };
  }, []);
  return active;
}
