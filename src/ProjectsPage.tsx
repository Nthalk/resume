import { useState } from "react";
import { projects } from "./projects";

function ProjectCard({
  project,
  isOpen,
  onToggle,
}: {
  project: (typeof projects)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`project-card ${isOpen ? "project-card--open" : ""}`}>
      <button className="project-card__header" onClick={onToggle}>
        <div>
          <h3 className="project-card__name">
            {project.name}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-card__link" onClick={(e) => e.stopPropagation()}>repo</a>
            )}
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link" onClick={(e) => e.stopPropagation()}>live</a>
            )}
            {project.maven && (
              <a href={`https://central.sonatype.com/artifact/${project.maven.group}/${project.maven.artifact}/${project.maven.version}`} target="_blank" rel="noopener noreferrer" className="project-card__link" onClick={(e) => e.stopPropagation()}>maven {project.maven.version}</a>
            )}
          </h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>
        <span className="project-card__toggle">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="project-card__body">
          <p className="project-card__summary">{project.summary}</p>
          <div className="project-card__tech">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <ul className="project-card__highlights">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(projects[0].slug);

  return (
    <div className="page projects-page">
      <h1 className="page__title">Projects</h1>
      <p className="page__subtitle">
        All projects solo-developed. A collection of established work, open source libraries, and tools.
      </p>
      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            isOpen={openSlug === p.slug}
            onToggle={() =>
              setOpenSlug(openSlug === p.slug ? null : p.slug)
            }
          />
        ))}
      </div>
    </div>
  );
}
