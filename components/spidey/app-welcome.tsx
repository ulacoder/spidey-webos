'use client'

interface WelcomeAppProps {
  onOpenProjects: () => void
}

export function WelcomeApp({ onOpenProjects }: WelcomeAppProps) {
  return (
    <>
      <img src="/assets/avatar.png" alt="Spidey avatar" className="avatar" />
      <h1>Hey, welcome to Spidey OS</h1>
      <p className="muted">
        My personal desk on the web. Poke around — windows drag, the terminal talks back, and there are stickers.
      </p>

      <div className="callout">
        <p>
          <strong>What I&apos;m into:</strong> autonomous agents, computer vision, hardware hacking
        </p>
        <p>
          <strong>Right now:</strong> getting an underwater drone to think for itself
        </p>
        <p>
          <strong>Motto:</strong> build fast, iterate faster
        </p>
      </div>

      <img
        src="/assets/spidey/spidey-perch.png"
        alt="Spider-Man perched on a ledge"
        className="welcome-hero"
      />

      <div className="btn-row">
        <a href="https://github.com/ulacoder" target="_blank" rel="noopener noreferrer" className="link-button">
          GitHub
        </a>
        <button type="button" className="link-button secondary" onClick={onOpenProjects}>
          See my projects
        </button>
      </div>
    </>
  )
}

export function AboutApp() {
  return (
    <>
      <h2>About this thing</h2>
      <p>
        Spidey OS is a small web desktop I put together for the <strong>Stardance Hackclub</strong> WebOS batch.
      </p>
      <p>
        The rule I set for myself: <s>just thinking about projects</s> →{' '}
        <strong className="accent">actually building them</strong>.
      </p>
      <p className="muted small">
        v2.0 — draggable windows, dock, terminal, sticker board.
        <br />
        Best enjoyed on a laptop with a cup of tea.
      </p>
    </>
  )
}
