'use client'

import { STICKER_EMOJIS } from '@/lib/spidey-data'

interface StickersAppProps {
  onAddSticker: (emoji: string) => void
  onClearStickers: () => void
}

export function StickersApp({ onAddSticker, onClearStickers }: StickersAppProps) {
  return (
    <>
      <p className="muted small">Click a sticker to slap it on the desktop. Drag to move, double-click to peel off.</p>
      <div className="sticker-tray">
        {STICKER_EMOJIS.map((emoji) => (
          <button key={emoji} type="button" onClick={() => onAddSticker(emoji)} aria-label={`Place ${emoji} sticker`}>
            <img src={`/assets/emoji/${emoji}.png`} alt={emoji} />
          </button>
        ))}
      </div>
      <button type="button" className="link-button secondary small-btn" onClick={onClearStickers}>
        Clear desktop
      </button>
    </>
  )
}
