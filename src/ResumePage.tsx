import { useState, useEffect, useRef } from "react";
import { resume } from "./data";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <section
      ref={ref}
      className={`section ${visible ? "section--visible" : ""} ${className}`}
    >
      <h2 className="section__title">{title}</h2>
      {children}
    </section>
  );
}

function TimelineItem({
  company,
  title,
  dates,
  bullets,
  index,
}: {
  company: string;
  title: string;
  dates: string;
  bullets: string[];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`timeline__item ${visible ? "timeline__item--visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="timeline__dot" />
      <div className="timeline__content">
        <div className="timeline__header">
          <h3 className="timeline__company">{company}</h3>
          <span className="timeline__dates">{dates}</span>
        </div>
        <p className="timeline__role">{title}</p>
        <ul className="timeline__bullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkillBar({ label, items }: { label: string; items: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`skill-row ${visible ? "skill-row--visible" : ""}`}
    >
      <span className="skill-row__label">{label}</span>
      <div className="skill-row__tags">
        {items.split(", ").map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResumePage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="resume">
      <header className="hero" style={{ backgroundPositionY: scrollY * 0.4 }}>
        <div className="hero__inner">
          <h1 className="hero__name">{resume.name}</h1>
          <p className="hero__summary">{resume.summary}</p>
          <div className="hero__contact">
            <a href={`tel:${resume.contact.cell}`}>{resume.contact.cell}</a>
            <a href={`mailto:${resume.contact.email}`}>
              {resume.contact.email}
            </a>
            <span>{resume.contact.location}</span>
            <a
              href={`https://${resume.contact.github}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href={`https://${resume.contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <main className="main">
        <Section title="Experience" className="experience">
          <div className="timeline">
            {resume.experience.map((job, i) => (
              <TimelineItem key={job.company} index={i} {...job} />
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="skills-grid">
            {Object.entries(resume.skills).map(([label, items]) => (
              <SkillBar key={label} label={label} items={items} />
            ))}
          </div>
        </Section>

        <Section title="Open Source (Maven Central)">
          <div className="oss-grid">
            {resume.openSource.map((p) => (
              <div key={p.name} className="oss-item">
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="oss-item__name"><strong>{p.name}</strong></a>
                <span className="oss-item__desc">{p.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        <div className="two-col">
          <Section title="Patent">
            <p className="patent">
              <em>{resume.patent.title}</em>
              <br />
              <span className="patent__number">#{resume.patent.number}</span>
            </p>
          </Section>

          <Section title="Motivations">
            <div className="motivations">
              {resume.motivations.map((m) => (
                <div key={m.label} className="motivation">
                  <strong>{m.label}</strong>
                  <span>{m.text}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
