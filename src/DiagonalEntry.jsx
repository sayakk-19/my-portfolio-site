import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function DiagonalEntry({ className, children }) {
  const slot = useRef(null);
  const reducedMotion = useReducedMotion();
  // Measure the unmoving list item. Only its inner card follows scroll progress.
  const { scrollYProgress } = useScroll({ target: slot, offset: ['start end', 'start 72%'] });
  const remaining = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <li ref={slot}>
      <motion.div className={`diagonal-entry ${className}`} style={reducedMotion ? undefined : { '--remaining': remaining }}>
        {children}
      </motion.div>
    </li>
  );
}
