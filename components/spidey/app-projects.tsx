'use client'

import { useState } from 'react'
import { PROJECTS } from '@/lib/spidey-data'

export function ProjectsApp() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0]

  return (
    <>
      <nav className="sidebar" aria-label="Project list">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`project-item${project.id === activeId ? ' active' : ''}`}
            onClick={() => setActiveId(project.id)}
          >
            <img src={project.icon || "/placeholder.svg"} alt="" className="emj" />
            <span>
              <h4>{project.name}</h4>
              <p>{project.tagline}</p>
            </span>
          </button>
        ))}
      </nav>
      <div className="content-pane">
        <h2>{active.name}</h2>
        <p>
          <span className="tag">{active.status}</span>
          {active.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </p>
        {active.description.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <div className="info-box">
          <strong>Highlights</strong>
          <ul>
            {active.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {active.quote && <blockquote>{active.quote}</blockquote>}
      </div>
    </>
  )
}
