'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { PROJECTS, type AppId } from '@/lib/spidey-data'

interface TermLine {
  id: number
  text: string
  tone?: 'dim' | 'red' | 'blue' | 'green'
}

interface TerminalAppProps {
  onOpenApp: (id: AppId) => void
  onCloseTerminal: () => void
}

const HELP_TEXT = [
  'available commands:',
  '  help          show this list',
  '  about         who is behind this OS',
  '  projects      list projects',
  '  open <app>    open a window (welcome, about, projects, dashboard, terminal, stickers)',
  '  ls            look around',
  '  whoami        identity check',
  '  date          current date and time',
  '  echo <text>   repeat after you',
  '  motd          message of the day',
  '  neofetch      system info, sort of',
  '  clear         wipe the screen',
  '  exit          close the terminal',
]

const VALID_APPS: AppId[] = ['welcome', 'about', 'projects', 'dashboard', 'terminal', 'stickers']

let lineId = 0
function line(text: string, tone?: TermLine['tone']): TermLine {
  lineId += 1
  return { id: lineId, text, tone }
}

export function TerminalApp({ onOpenApp, onCloseTerminal }: TerminalAppProps) {
  const [lines, setLines] = useState<TermLine[]>([
    line('Spidey OS terminal — type "help" to get started.', 'dim'),
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [lines])

  function run(raw: string) {
    const input = raw.trim()
    const output: TermLine[] = [line(`spidey@web % ${raw}`, 'green')]

    if (input.length > 0) {
      const [cmd, ...rest] = input.split(/\s+/)
      const arg = rest.join(' ')

      switch (cmd.toLowerCase()) {
        case 'help':
          HELP_TEXT.forEach((t) => output.push(line(t)))
          break
        case 'about':
          output.push(line('spidey — builds robots, agents, and the occasional web desktop.'))
          output.push(line('motto: build fast, iterate faster.', 'dim'))
          break
        case 'projects':
          PROJECTS.forEach((p) => output.push(line(`  ${p.name.padEnd(20)} ${p.tagline} [${p.status}]`)))
          output.push(line('tip: run "open projects" for the full view', 'dim'))
          break
        case 'open': {
          const target = arg.toLowerCase() as AppId
          if (VALID_APPS.includes(target)) {
            output.push(line(`opening ${target}...`, 'blue'))
            onOpenApp(target)
          } else {
            output.push(line(`unknown app: "${arg}". try: ${VALID_APPS.join(', ')}`, 'red'))
          }
          break
        }
        case 'ls':
          output.push(line('projects/  dashboard/  stickers/  secrets/'))
          output.push(line('(nice try — secrets/ is permission denied)', 'dim'))
          break
        case 'whoami':
          output.push(line('a curious visitor on spidey\u2019s web desktop'))
          break
        case 'date':
          output.push(line(new Date().toString()))
          break
        case 'echo':
          output.push(line(arg || ''))
          break
        case 'motd':
          output.push(line('everything leaks, eventually. waterproof accordingly.', 'blue'))
          break
        case 'neofetch':
          output.push(line('        /\\  OS:       Spidey OS v2.0', 'red'))
          output.push(line('       (  ) Host:     your browser', 'red'))
          output.push(line('      (    ) Shell:    fake-zsh', 'red'))
          output.push(line('     /|/\\/\\|\\ Uptime:   since you opened this tab', 'red'))
          output.push(line('      \u2514 8 legs, 0 bugs (allegedly)', 'dim'))
          break
        case 'sudo':
          output.push(line('with great power comes great responsibility. request denied.', 'red'))
          break
        case 'clear':
          setLines([])
          return
        case 'exit':
          output.push(line('bye!', 'dim'))
          setLines((prev) => [...prev, ...output])
          setTimeout(onCloseTerminal, 350)
          return
        default:
          output.push(line(`command not found: ${cmd}. type "help".`, 'red'))
      }
    }

    setLines((prev) => [...prev, ...output])
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      if (value.trim()) {
        setHistory((prev) => [value, ...prev])
      }
      setHistoryIndex(-1)
      run(value)
      setValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, history.length - 1)
      if (history[next] !== undefined) {
        setHistoryIndex(next)
        setValue(history[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = historyIndex - 1
      if (next < 0) {
        setHistoryIndex(-1)
        setValue('')
      } else {
        setHistoryIndex(next)
        setValue(history[next])
      }
    }
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: clicking anywhere in the terminal focuses the input, standard terminal UX
    <div className="term-inner" onClick={() => inputRef.current?.focus()}>
      <div>
        {lines.map((l) => (
          <div key={l.id} className={`t-line${l.tone ? ` t-${l.tone}` : ''}`}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="term-line" ref={endRef}>
        <span className="term-prompt">spidey@web&nbsp;%</span>
        <input
          ref={inputRef}
          className="term-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>
    </div>
  )
}
