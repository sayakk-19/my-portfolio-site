import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react';
import './home.css';

const introduction = 'Hi, I’m Sayak, a final-year Computer Science student at Narula Institute of Technology. I build web applications and machine learning projects, turning ideas into useful experiences.';

function LetterSequence({ text, start = 0, headline = false }) {
  let offset = start;
  return text.split(' ').map((word, wordIndex) => {
    const firstLetter = offset;
    offset += word.length + 1;
    return <React.Fragment key={wordIndex}>
      {wordIndex > 0 && ' '}
      <span className={headline ? 'home-word' : 'intro-word'}>
        {[...word].map((letter, index) => <span key={index} className={headline ? 'home-letter' : 'intro-letter'} style={{ '--letter': firstLetter + index }}>{letter}</span>)}
      </span>
    </React.Fragment>;
  });
}

export default function Home() {
  const [downloading, setDownloading] = useState(false);
  const [downloadRun, setDownloadRun] = useState(0);
  const downloadTimer = useRef(null);
  useEffect(() => () => clearTimeout(downloadTimer.current), []);
  const animateDownload = () => {
    setDownloading(true);
    setDownloadRun(value => value + 1);
    clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => setDownloading(false), 2000);
  };
  return (
    <section id="home" className="home-section" aria-labelledby="home-title">
      <div className="home-content container">
        <p className="ps-index home-section-index"><span>01</span><span className="ps-index-line" aria-hidden="true" />Home</p>
        <h1 id="home-title" aria-label="Welcome to my portfolio">
          <span className="home-title-line" aria-hidden="true"><LetterSequence text="Welcome to" headline /></span>
          <span className="home-title-line home-title-accent" aria-hidden="true"><LetterSequence text="my portfolio" start={11} headline /></span>
        </h1>
        <p className="home-introduction"><span className="sr-only">{introduction}</span><span aria-hidden="true"><LetterSequence text={introduction} /></span></p>
        <div className="home-actions">
          <a className="home-social" href="https://github.com/sayakk-19" target="_blank" rel="noopener noreferrer" aria-label="Sayak on GitHub">
            <Github aria-hidden="true" /><span className="home-social-label">GitHub</span>
          </a>
          <a className="home-social" href="https://www.linkedin.com/in/sayak-sarkar-991027355/" target="_blank" rel="noopener noreferrer" aria-label="Sayak on LinkedIn">
            <Linkedin aria-hidden="true" /><span className="home-social-label">LinkedIn</span>
          </a>
          <a href="/Sayak-Sarkar-CV.pdf" download="Sayak-Sarkar-CV.pdf" className={`home-download${downloading ? ' is-downloading' : ''}`} onClick={animateDownload}>
            <Download aria-hidden="true" /> Download CV
            {downloading && <svg key={downloadRun} className="download-orbit" viewBox="0 0 180 52" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="2" width="176" height="48" rx="24" pathLength="100" /></svg>}
          </a>
        </div>
        <span className="sr-only" role="status">{downloading ? 'CV download requested.' : ''}</span>
      </div>
      <a className="home-next" href="#about">About me <ArrowDown size={15} aria-hidden="true" /></a>
    </section>
  );
}
