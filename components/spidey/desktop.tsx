'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { APPS, type AppId } from '@/lib/spidey-data'
import { OsWindow } from './os-window'
import { WelcomeApp, AboutApp } from './app-welcome'
import { ProjectsApp } from './app-projects'
import { DashboardApp } from './app-dashboard'
import { TerminalApp } from './app-terminal'
import { StickersApp } from './app-stickers'
import { StickerLayer, type PlacedSticker } from './sticker-layer'
import { PhotoLayer } from './photo-layer'

interface WindowState {
  open: boolean
  minimized: boolean
  maximized: boolean
  position: { top: number; left: number }
  zIndex: number
}

const SPIDER_QUIPS = [
  'Hey! Watch the legs.',
  'With great power... you know the rest.',
  'I do all the debugging around here.',
  'Eight legs, zero bugs.',
  'Careful, I just cleaned this web.',
  'Thwip thwip.',
  'Try typing "neofetch" in the terminal.',
]

function initialWindows(): Record<AppId, WindowState> {
  const state = {} as Record<AppId, WindowState>
  for (const app of APPS) {
    state[app.id] = {
      open: app.id === 'welcome',
      minimized: false,
      maximized: false,
      position: { ...app.initial },
      zIndex: app.id === 'welcome' ? 11 : 10,
    }
  }
  return state
}

export function SpideyDesktop() {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(initialWindows)
  const [stickers, setStickers] = useState<PlacedSticker[]>([])
  const [now, setNow] = useState<Date | null>(null)
  const [quip, setQuip] = useState<string | null>(null)
  const [startled, setStartled] = useState(false)
  const zCounter = useRef(11)
  const stickerIdRef = useRef(0)
  const quipTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const focusWindow = useCallback((id: AppId) => {
    setWindows((prev) => {
      if (prev[id].zIndex === zCounter.current) return prev
      zCounter.current += 1
      return { ...prev, [id]: { ...prev[id], zIndex: zCounter.current } }
    })
  }, [])

  const openWindow = useCallback((id: AppId) => {
    zCounter.current += 1
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: true, minimized: false, zIndex: zCounter.current },
    }))
  }, [])

  const closeWindow = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false, maximized: false },
    }))
  }, [])

  const minimizeWindow = useCallback((id: AppId) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], minimized: true } }))
  }, [])

  const maximizeWindow = useCallback((id: AppId) => {
    zCounter.current += 1
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], maximized: !prev[id].maximized, zIndex: zCounter.current },
    }))
  }, [])

  const moveWindow = useCallback((id: AppId, position: { top: number; left: number }) => {
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], position } }))
  }, [])

  function addSticker(emoji: string) {
    stickerIdRef.current += 1
    setStickers((prev) => [
      ...prev,
      {
        id: stickerIdRef.current,
        emoji,
        top: 80 + Math.random() * (window.innerHeight - 260),
        left: 120 + Math.random() * (window.innerWidth - 300),
        rotation: Math.round(Math.random() * 30 - 15),
      },
    ])
  }

  function pokeSpider() {
    setStartled(true)
    setTimeout(() => setStartled(false), 500)
    setQuip(SPIDER_QUIPS[Math.floor(Math.random() * SPIDER_QUIPS.length)])
    if (quipTimer.current) clearTimeout(quipTimer.current)
    quipTimer.current = setTimeout(() => setQuip(null), 2600)
  }

  const minimizedApps = APPS.filter((app) => windows[app.id].open && windows[app.id].minimized)

  return (
    <div className="spidey-os">
      <div className="desktop" />

      {/* menu bar */}
      <header className="topbar">
        <div className="topbar-left">
          <button type="button" className="os-name" onClick={() => openWindow('welcome')}>
            <img src="/assets/emoji/spider.png" alt="" className="emj emj-16" /> Spidey OS
          </button>
          <button type="button" className="app-button" onClick={() => openWindow('about')}>
            About
          </button>
          <button type="button" className="app-button" onClick={() => openWindow('projects')}>
            Projects
          </button>
          <button type="button" className="app-button" onClick={() => openWindow('dashboard')}>
            Dashboard
          </button>
          <button type="button" className="app-button" onClick={() => openWindow('terminal')}>
            Terminal
          </button>
        </div>
        <div className="topbar-right">
          <span suppressHydrationWarning>
            {now?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) ?? ''}
          </span>
          <span className="clock" suppressHydrationWarning>
            {now?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) ?? '--:--'}
          </span>
        </div>
      </header>

      {/* desktop icons */}
      <div className="desktop-icons">
        <button type="button" className="desktop-icon" onClick={() => openWindow('projects')}>
          <img src="/assets/emoji/rocket.png" alt="" className="emj emj-icon" />
          <span>Projects</span>
        </button>
        <button type="button" className="desktop-icon" onClick={() => openWindow('dashboard')}>
          <img src="/assets/emoji/chart.png" alt="" className="emj emj-icon" />
          <span>Dashboard</span>
        </button>
        <button type="button" className="desktop-icon" onClick={() => openWindow('terminal')}>
          <img src="/assets/emoji/terminal.png" alt="" className="emj emj-icon" />
          <span>Terminal</span>
        </button>
        <button type="button" className="desktop-icon" onClick={() => openWindow('stickers')}>
          <img src="/assets/emoji/pin.png" alt="" className="emj emj-icon" />
          <span>Stickers</span>
        </button>
      </div>

      {/* spidey photo wall */}
      <PhotoLayer />

      {/* placed stickers */}
      <StickerLayer
        stickers={stickers}
        onMoveSticker={(id, pos) =>
          setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, ...pos } : s)))
        }
        onRemoveSticker={(id) => setStickers((prev) => prev.filter((s) => s.id !== id))}
      />

      {/* windows */}
      {APPS.map((app) => {
        const state = windows[app.id]
        if (!state.open || state.minimized) return null
        return (
          <OsWindow
            key={app.id}
            id={app.id}
            title={app.windowTitle}
            wide={app.wide}
            position={state.position}
            zIndex={state.zIndex}
            maximized={state.maximized}
            contentClassName={
              app.id === 'projects' ? 'split' : app.id === 'dashboard' ? 'column' : app.id === 'terminal' ? 'term' : undefined
            }
            onClose={() => closeWindow(app.id)}
            onMinimize={() => minimizeWindow(app.id)}
            onMaximize={() => maximizeWindow(app.id)}
            onFocus={() => focusWindow(app.id)}
            onMove={(pos) => moveWindow(app.id, pos)}
          >
            {app.id === 'welcome' && <WelcomeApp onOpenProjects={() => openWindow('projects')} />}
            {app.id === 'about' && <AboutApp />}
            {app.id === 'projects' && <ProjectsApp />}
            {app.id === 'dashboard' && <DashboardApp />}
            {app.id === 'terminal' && (
              <TerminalApp onOpenApp={openWindow} onCloseTerminal={() => closeWindow('terminal')} />
            )}
            {app.id === 'stickers' && (
              <StickersApp onAddSticker={addSticker} onClearStickers={() => setStickers([])} />
            )}
          </OsWindow>
        )
      })}

      {/* dock — minimized windows live here */}
      {minimizedApps.length > 0 && (
        <footer className="dock" aria-label="Dock">
          {minimizedApps.map((app) => (
            <div key={app.id} className="dock-item-wrap">
              <button
                type="button"
                className="dock-item"
                data-label={app.title}
                onClick={() => openWindow(app.id)}
              >
                <img src={app.icon || "/placeholder.svg"} alt={app.title} />
              </button>
              <button
                type="button"
                className="dock-close"
                aria-label={`Close ${app.title}`}
                onClick={() => closeWindow(app.id)}
              >
                {'\u00d7'}
              </button>
            </div>
          ))}
        </footer>
      )}

      {/* the resident spider */}
      {quip && <div className="spider-quip">{quip}</div>}
      <button
        type="button"
        className={`spider${startled ? ' startled' : ''}`}
        onClick={pokeSpider}
        aria-label="A wild spider — click it"
      >
        <img src="/assets/emoji/spider.png" alt="" />
      </button>
    </div>
  )
}
