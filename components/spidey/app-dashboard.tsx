'use client'

import { useState } from 'react'
import { SKILLS, GOALS, EXPERIMENTS, STATS, FACTS } from '@/lib/spidey-data'

type Tab = 'skills' | 'goals' | 'lab' | 'stats'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'skills', label: 'Skills', icon: '/assets/emoji/target.png' },
  { id: 'goals', label: 'Goals', icon: '/assets/emoji/trophy.png' },
  { id: 'lab', label: 'Lab', icon: '/assets/emoji/test-tube.png' },
  { id: 'stats', label: 'Stats', icon: '/assets/emoji/chart-up.png' },
]

const STATUS_CLASS: Record<string, string> = {
  'On track': 'on-track',
  'In progress': 'in-progress',
  Stalled: 'stalled',
  Done: 'done',
}

const RESULT_LABEL: Record<string, { text: string; className: string }> = {
  worked: { text: 'worked', className: 'done' },
  failed: { text: 'failed', className: 'stalled' },
  inconclusive: { text: 'inconclusive', className: 'in-progress' },
}

export function DashboardApp() {
  const [tab, setTab] = useState<Tab>('skills')

  return (
    <>
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <img src={t.icon || "/placeholder.svg"} alt="" className="emj emj-16" /> {t.label}
          </button>
        ))}
      </div>

      <div className="tab-body">
        {tab === 'skills' && (
          <div>
            <h2>Skills</h2>
            {SKILLS.map((cat) => (
              <div key={cat.name} className="skill-cat">
                <h3>
                  <img src={cat.icon || "/placeholder.svg"} alt="" className="emj emj-16" /> {cat.name}
                </h3>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-meta">
                      <span>{skill.name}</span>
                      <span>{skill.note}</span>
                    </div>
                    <div className="bar">
                      <div style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab === 'goals' && (
          <div>
            <h2>Goals</h2>
            {GOALS.map((goal) => (
              <div key={goal.title} className="goal-card">
                <div className="goal-head">
                  <h4>
                    <img src={goal.icon || "/placeholder.svg"} alt="" className="emj emj-16" /> {goal.title}
                  </h4>
                  <span className={`status-pill ${STATUS_CLASS[goal.status]}`}>{goal.status}</span>
                </div>
                <div className="bar">
                  <div style={{ width: `${goal.progress}%` }} />
                </div>
                <div className="goal-foot">
                  <span>{goal.progress}%</span>
                  <span>{goal.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'lab' && (
          <div>
            <h2>Lab notes</h2>
            {EXPERIMENTS.map((exp) => (
              <div key={exp.title} className="exp-card">
                <div className="exp-head">
                  <h4>{exp.title}</h4>
                  <time>{exp.date}</time>
                </div>
                <p>{exp.note}</p>
                <span className={`status-pill ${RESULT_LABEL[exp.result].className}`}>
                  {RESULT_LABEL[exp.result].text}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === 'stats' && (
          <div>
            <h2>Stats</h2>
            <div className="stats-grid">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <h3>
                    <img src={stat.icon || "/placeholder.svg"} alt="" className="emj emj-16" /> {stat.label}
                  </h3>
                  <div className="big">{stat.value}</div>
                  <div className="sub">{stat.sub}</div>
                </div>
              ))}
            </div>
            <div className="facts">
              <h3>Random facts</h3>
              <div className="grid2">
                {FACTS.map((fact) => (
                  <div key={fact.label}>
                    <strong>{fact.label}:</strong> {fact.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
