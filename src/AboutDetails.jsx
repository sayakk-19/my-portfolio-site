import React, { useState } from 'react';
import { GraduationCap, Info } from 'lucide-react';

export function Education() {
  return <div className="about-education">
    <GraduationCap size={21} aria-hidden="true" />
    <div><p className="education-label">Education</p>
      <p><strong>Narula Institute of Technology</strong><span>B. Tech in CSE · CGPA 8.6 up to 6th semester</span></p>
      <p><strong>Gobardanga Khantura High School</strong><span>School</span></p>
    </div>
  </div>;
}

export function AboutStats() {
  const [showPlatforms, setShowPlatforms] = useState(false);
  return <div className="about-stats" aria-label="Portfolio at a glance">
    <div className="about-stat"><strong>10+</strong><span>Skills</span></div>
    <div className="about-stat"><strong>4+</strong><span>Projects</span></div>
    <div className="about-stat about-stat-interactive" onPointerEnter={event => { if (event.pointerType === 'mouse') setShowPlatforms(true); }} onPointerLeave={event => { if (event.pointerType === 'mouse') setShowPlatforms(false); }}>
      <button type="button" aria-expanded={showPlatforms} aria-controls="dsa-platforms" onClick={() => setShowPlatforms(value => !value)} onBlur={() => setShowPlatforms(false)} onKeyDown={event => { if (event.key === 'Escape') setShowPlatforms(false); }}>
        <strong>200+</strong><span>DSA problems <Info size={14} aria-hidden="true" /></span>
      </button>
      <p id="dsa-platforms" className="stat-tooltip" hidden={!showPlatforms}>200+ problems across coding platforms including LeetCode, GeeksforGeeks, HackerRank, CodeChef, Codeforces, and more.</p>
    </div>
  </div>;
}
