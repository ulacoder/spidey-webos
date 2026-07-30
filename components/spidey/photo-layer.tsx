'use client'

import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

interface DesktopPhoto {
  id: string
  src: string
  caption: string
  top: string
  right: string
  rotation: number
  width: number
}

const PHOTOS: DesktopPhoto[] = [
  {
    id: 'tom',
    src: '/assets/spidey/tom-holland.png',
    caption: 'Tom Holland',
    top: '8%',
    right: '2%',
    rotation: 4,
    width: 170,
  },
  {
    id: 'tobey',
    src: '/assets/spidey/tobey-maguire.png',
    caption: 'Tobey Maguire',
    top: '34%',
    right: '13%',
    rotation: -5,
    width: 170,
  },
  {
    id: 'andrew',
    src: '/assets/spidey/andrew-garfield.png',
    caption: 'Andrew Garfield',
    top: '38%',
    right: '1%',
    rotation: 6,
    width: 170,
  },
  {
    id: 'swing',
    src: '/assets/spidey/spiderman-swing.png',
    caption: 'thwip!',
    top: '68%',
    right: '14%',
    rotation: -3,
    width: 200,
  },
  {
    id: 'meme',
    src: '/assets/spidey/three-spideys.png',
    caption: 'wait... who is who?',
    top: '71%',
    right: '1%',
    rotation: 5,
    width: 200,
  },
]

export function PhotoLayer() {
  const [topPhoto, setTopPhoto] = useState<string | null>(null)
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({})
  const dragMoved = useRef(false)

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>, id: string) {
    const startX = e.clientX
    const startY = e.clientY
    const startOffset = offsets[id] ?? { x: 0, y: 0 }
    dragMoved.current = false
    setTopPhoto(id)

    function handleMove(ev: PointerEvent) {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved.current = true
      setOffsets((prev) => ({ ...prev, [id]: { x: startOffset.x + dx, y: startOffset.y + dy } }))
    }

    function handleUp() {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
    }

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
  }

  return (
    <div className="photo-layer" aria-label="Spider-Man photo wall">
      {PHOTOS.map((photo) => {
        const offset = offsets[photo.id] ?? { x: 0, y: 0 }
        return (
          <div
            key={photo.id}
            className={`polaroid${topPhoto === photo.id ? ' on-top' : ''}`}
            style={{
              top: photo.top,
              right: photo.right,
              width: photo.width,
              transform: `translate(${offset.x}px, ${offset.y}px) rotate(${photo.rotation}deg)`,
            }}
            onPointerDown={(e) => handlePointerDown(e, photo.id)}
          >
            <img src={photo.src || '/placeholder.svg'} alt={photo.caption} draggable={false} />
            <span className="polaroid-caption">{photo.caption}</span>
            <span className="polaroid-tape" aria-hidden="true" />
          </div>
        )
      })}
    </div>
  )
}
