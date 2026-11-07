import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Award, BrainCircuit, Braces, Briefcase, Component, Database, GitBranch, Route, Server, Trophy } from 'lucide-react';
import Projects from './Projects';
import DiagonalEntry from './DiagonalEntry';
import ScrollReveal, { ScrollSequence } from './ScrollReveal';
import './sections.css';

const skillGroups = [
  { name: 'Programming languages', Icon: Braces, skills: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript'] },
  { name: 'Frontend', Icon: Component, skills: ['React.js', 'HTML & CSS', 'Locomotive.js'] },
  { name: 'Backend', Icon: Server, skills: ['Express.js', 'Node.js', 'Django', 'REST API'] },
  { name: 'Databases', Icon: Database, skills: ['MongoDB', 'MySQL', 'SQLite3'] },
  { name: 'Machine learning', Icon: BrainCircuit, skills: ['Deep learning'] },
  { name: 'Developer tools', Icon: GitBranch, skills: ['Git', 'GitHub', 'Colab'] },
];

function SectionIndex({ number, children }) {
  return <p className="ps-index"><span>{number}</span><span className="ps-index-line" />{children}</p>;
}

const chapters = [
  {
    id: 'certification', number: '05', label: 'Certification', Icon: Award,
    title: 'Training & recognition',
    entries: [
      { title: 'Full Stack Web Development with Python (Django)', detail: 'Industry training · Ardent' },
      { title: 'Ethical Hacking', detail: 'Industry training · Ardent' },
      { title: 'Generative AI', detail: 'Industry training · Euphoria Gen-X' },
      { title: 'Coding contest finalist', detail: 'IceBreaker5' },
    ],
  },
  {
    id: 'hackathon', number: '06', label: 'Hackathon', Icon: Trophy,
    title: 'Finalist at Hackstorm 2025',
    entries: [
      { title: 'Sign Language Converter', detail: 'I led a team of four at BP Poddar College. We worked on a sign language converter for people who are deaf or communicate without speech, and our team reached the final round.' },
    ],
  },
  {
    id: 'internship', number: '07', label: 'Internship', Icon: Briefcase,
    title: 'Virtual internships',
    entries: [
      { title: 'Artificial intelligence & machine learning', detail: 'Completed a virtual internship on the EduSkills platform.' },
      { title: 'App development', detail: 'Virtual intern at EduSkills.' },
    ],
  },
  {
    id: 'experience', number: '08', label: 'Experience', Icon: Route,
    title: 'Technical experience',
    entries: [
      { title: 'Data structures & algorithms', detail: 'Applying DSA concepts to solve programming problems.' },
      { title: 'Web development', detail: 'Building both the frontend and backend of web applications.' },
      { title: 'Machine learning', detail: 'Training machine learning models.' },
    ],
  },
];

function PortfolioChapter({ chapter, index }) {
  const { id, number, label, Icon, title, entries } = chapter;
  return (
    <section id={id} className="portfolio-section" aria-labelledby={`${id}-heading`}>
      <div className="container">
        <ScrollSequence>
          <ScrollReveal><SectionIndex number={number}>{label}</SectionIndex></ScrollReveal>
          <div className="chapter-layout">
            <div>
              <ScrollReveal className="ps-chapter-icon" hover><Icon size={24} aria-hidden="true" /></ScrollReveal>
              <ScrollReveal as="h2" direction={index % 2 ? 'right' : 'left'} id={`${id}-heading`}>{title}</ScrollReveal>
            </div>
            <ul className="chapter-entries">
              {entries.map(entry => (
                <DiagonalEntry key={entry.title} className="chapter-entry">
                  <h3>{entry.title}</h3>
                  <p>{entry.detail}</p>
                </DiagonalEntry>
              ))}
            </ul>
          </div>
        </ScrollSequence>
      </div>
    </section>
  );
}

export default function Sections() {
  return (
    <>
      <section id="skill" className="portfolio-section ps-skill-section" aria-labelledby="skill-heading">
        <div className="container"><ScrollSequence stagger={0.105}>
          <ScrollReveal><SectionIndex number="03">Skill</SectionIndex></ScrollReveal>
          <div className="ps-skills-layout">
            <div className="ps-skills-intro"><ScrollReveal as="h2" id="skill-heading">Good ideas.<br /><em>The right tools.</em></ScrollReveal><ScrollReveal as="p">From interactive interfaces to web applications and deep learning, these are the tools I build with.</ScrollReveal></div>
            <div className="skill-domains">
              {skillGroups.map(({ name, Icon, skills }) => (
                <ScrollReveal as="article" className="skill-domain" key={name}>
                  <h3><Icon size={18} aria-hidden="true" />{name}</h3>
                  <ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollSequence></div>
      </section>

      <section id="project" className="portfolio-section ps-project-section" aria-labelledby="project-heading">
        <div className="container"><ScrollSequence stagger={0.13}><ScrollReveal><SectionIndex number="04">Project</SectionIndex></ScrollReveal><div className="ps-section-heading"><ScrollReveal as="h2" direction="right" id="project-heading">Ideas, made <em>tangible.</em></ScrollReveal><ScrollReveal as="p">From sports and commerce<br />to learning from data.</ScrollReveal></div><Projects /></ScrollSequence></div>
      </section>

      {chapters.map((chapter, index) => <PortfolioChapter key={chapter.id} chapter={chapter} index={index} />)}
      <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-heading">
        <div className="container">
          <SectionIndex number="09">Contact</SectionIndex>
          <ScrollSequence>
            <ScrollReveal as="h2" id="contact-heading">Get in <em>touch.</em></ScrollReveal>
            <ScrollReveal as="p" className="contact-copy">
              Have a question about a project or an opportunity in mind? Reach out by email, phone, or LinkedIn.
            </ScrollReveal>
            <div className="contact-details">
              <ScrollReveal>
                <a className="contact-detail" href="mailto:sarkarsayak15@gmail.com">
                  <Mail size={22} aria-hidden="true" />
                  <span><span className="contact-detail-label">Email</span><span className="contact-detail-value">sarkarsayak15@gmail.com</span></span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </ScrollReveal>
              <ScrollReveal>
                <a className="contact-detail" href="tel:+918777458286">
                  <Phone size={22} aria-hidden="true" />
                  <span><span className="contact-detail-label">Phone</span><span className="contact-detail-value">+91 87774 58286</span></span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </ScrollReveal>
            </div>
            <ScrollReveal className="contact-links">
              <a className="primary-button" href="https://www.linkedin.com/in/sayak-sarkar-991027355/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} aria-hidden="true" /> Connect on LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="text-link" href="https://github.com/sayakk-19" target="_blank" rel="noopener noreferrer">
                <Github size={18} aria-hidden="true" /> View my GitHub <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </ScrollReveal>
          </ScrollSequence>
        </div>
      </section>
    </>
  );
}
