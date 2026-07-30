'use client'

import { useRef, type PointerEvent as ReactPointerEvent } from 'react'

export interface PlacedSticker {
  id: number
  emoji: string
  top: number
  left: number
  rotation: number
}

interface StickerLayerProps {
  stickers: PlacedSticker[]
  onMoveSticker: (id: number, pos: { top: number; left: number }) => void
  onRemoveSticker: (id: number) => void
}

export function StickerLayer({ stickers, onMoveSticker, onRemoveSticker }: StickerLayerProps) {
  const dragMoved = useRef(false)

  function handlePointerDown(e: ReactPointerEvent<HTMLButtonElement>, sticker: PlacedSticker) {
    const el = e.currentTarget
    const startX = e.clientX
    const startY = e.clientY
    dragMoved.current = false

    function handleMove(ev: PointerEvent) {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true
      const newTop = Math.min(Math.max(sticker.top + dy, 34), window.innerHeight - 60)
      const newLeft = Math.min(Math.max(sticker.left + dx, 0), window.innerWidth - 56)
      el.style.top = `${newTop}px`
      el.style.left = `${newLeft}px`
    }

    function handleUp() {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
      if (dragMoved.current) {
        onMoveSticker(sticker.id, { top: parseFloat(el.style.top), left: parseFloat(el.style.left) })
      }
    }

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
  }

  return (
    <div className="sticker-layer">
      {stickers.map((sticker) => (
        <button
          key={sticker.id}
          type="button"
          className="placed-sticker"
          style={{ top: sticker.top, left: sticker.left, transform: `rotate(${sticker.rotation}deg)` }}
          onPointerDown={(e) => handlePointerDown(e, sticker)}
          onDoubleClick={() => onRemoveSticker(sticker.id)}
          aria-label={`${sticker.emoji} sticker — double-click to remove`}
        >
          <img src={`/assets/emoji/${sticker.emoji}.png`} alt="" />
        </button>
      ))}
    </div>
  )
}
