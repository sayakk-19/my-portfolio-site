import { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function useSmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Keep the browser's native scrolling when reduced motion is requested.
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      // Lenis reads our CSS scroll-padding-top for the sticky-header offset.
      // Native anchor behavior still provides URL hashes and browser history.
      anchors: true,
    });

    // Cleanup also prevents duplicate RAF loops in React Strict Mode and HMR.
    return () => lenis.destroy();
  }, [reducedMotion]);
}
