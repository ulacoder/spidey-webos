'use client'

import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react'

interface OsWindowProps {
  id: string
  title: string
  wide?: boolean
  position: { top: number; left: number }
  zIndex: number
  maximized: boolean
  contentClassName?: string
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onMove: (pos: { top: number; left: number }) => void
  children: ReactNode
}

export function OsWindow({
  id,
  title,
  wide,
  position,
  zIndex,
  maximized,
  contentClassName,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children,
}: OsWindowProps) {
  const windowRef = useRef<HTMLElement>(null)
  const dragState = useRef<{ startX: number; startY: number; origTop: number; origLeft: number } | null>(null)

  function handleHeaderPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    // don't start a drag from the traffic-light buttons
    if ((e.target as HTMLElement).closest('.wc-btn')) return
    if (maximized) return
    onFocus()
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origTop: position.top,
      origLeft: position.left,
    }
    const el = windowRef.current
    if (!el) return

    function handleMove(ev: PointerEvent) {
      const drag = dragState.current
      if (!drag || !el) return
      const dx = ev.clientX - drag.startX
      const dy = ev.clientY - drag.startY
      const width = el.offsetWidth
      const newTop = Math.min(Math.max(drag.origTop + dy, 38), window.innerHeight - 60)
      const newLeft = Math.min(Math.max(drag.origLeft + dx, -width + 80), window.innerWidth - 80)
      el.style.top = `${newTop}px`
      el.style.left = `${newLeft}px`
    }

    function handleUp() {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
      if (el && dragState.current) {
        onMove({ top: parseFloat(el.style.top), left: parseFloat(el.style.left) })
      }
      dragState.current = null
    }

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
  }

  return (
    <section
      ref={windowRef}
      id={id}
      className={`window${wide ? ' wide' : ''}${maximized ? ' maximized' : ''}`}
      style={{ top: position.top, left: position.left, zIndex }}
      onPointerDown={onFocus}
      role="dialog"
      aria-label={title}
    >
      <div className="window-header" onPointerDown={handleHeaderPointerDown} onDoubleClick={onMaximize}>
        <div className="window-controls">
          <button type="button" className="wc-btn wc-close" onClick={onClose} aria-label={`Close ${title}`} />
          <button type="button" className="wc-btn wc-min" onClick={onMinimize} aria-label={`Minimize ${title}`} />
          <button type="button" className="wc-btn wc-max" onClick={onMaximize} aria-label={`Maximize ${title}`} />
        </div>
        <span className="window-title">{title}</span>
        <span className="wh-spacer" />
      </div>
      <div className={`window-content${contentClassName ? ` ${contentClassName}` : ''}`}>{children}</div>
    </section>
  )
}
