export type AppId = 'welcome' | 'about' | 'projects' | 'dashboard' | 'terminal' | 'stickers'

export interface AppMeta {
  id: AppId
  title: string
  windowTitle: string
  icon: string
  wide?: boolean
  initial: { top: number; left: number }
}

export const APPS: AppMeta[] = [
  { id: 'welcome', title: 'Welcome', windowTitle: 'Welcome', icon: '/assets/emoji/web.png', initial: { top: 90, left: 120 } },
  { id: 'about', title: 'About', windowTitle: 'About', icon: '/assets/emoji/memo.png', initial: { top: 140, left: 260 } },
  { id: 'projects', title: 'Projects', windowTitle: 'Projects', icon: '/assets/emoji/rocket.png', wide: true, initial: { top: 110, left: 320 } },
  { id: 'dashboard', title: 'Dashboard', windowTitle: 'Dashboard', icon: '/assets/emoji/chart.png', wide: true, initial: { top: 100, left: 180 } },
  { id: 'terminal', title: 'Terminal', windowTitle: 'spidey@web — zsh', icon: '/assets/emoji/terminal.png', initial: { top: 160, left: 380 } },
  { id: 'stickers', title: 'Stickers', windowTitle: 'Stickers', icon: '/assets/emoji/pin.png', initial: { top: 130, left: 440 } },
]

export interface Project {
  id: string
  name: string
  tagline: string
  icon: string
  status: string
  tags: string[]
  description: string[]
  highlights: string[]
  quote?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'drone',
    name: 'SaqDrone',
    tagline: 'search & rescue on water',
    icon: '/assets/emoji/robot.png',
    status: 'In progress',
    tags: ['Robotics', 'Computer Vision', 'Python'],
    description: [
      'A search-and-rescue drone for lakes, rivers, and reservoirs. It patrols the water, spots people in distress with onboard computer vision, and relays their location to rescuers in seconds — not minutes.',
      'The mission: cut down response time on open water, where every second counts. It can also drop a flotation device and hold position next to a person until help arrives.',
    ],
    highlights: [
      'Person-in-water detection with onboard vision',
      'GPS location relay to the rescue team in real time',
      'Flotation device drop for immediate assistance',
      'Autonomous patrol routes over designated water zones',
    ],
    quote: 'On open water, the fastest rescuer is the one already there.',
  },
  {
    id: 'veya',
    name: 'Veya Glasses',
    tagline: 'smart glasses that detect eye diseases',
    icon: '/assets/emoji/glasses.png',
    status: 'Prototype',
    tags: ['Hardware', 'AI', 'Computer Vision'],
    description: [
      'Smart glasses that detect eye diseases with AI. A camera on the frame captures a close-up image of the eye, a CNN model running on a Raspberry Pi analyzes it locally, and the diagnosis is sent to a mobile app over WiFi.',
      'It classifies Cataract, Conjunctivitis, and Pterygium — conditions with clear visual signs and high social impact. All processing happens on-device: no cloud, images auto-delete after 24 hours.',
    ],
    highlights: [
      'On-device CNN (TensorFlow Lite, MobileNetV2) — 2-3s per scan',
      'Detects Cataract, Conjunctivitis, and Pterygium',
      'Mobile app with diagnosis, confidence score, and scan history',
      '6-8 hours of battery life on a power bank',
    ],
  },
  {
    id: 'webos',
    name: 'Spidey OS',
    tagline: 'this very thing',
    icon: '/assets/emoji/web.png',
    status: 'Shipped',
    tags: ['Web', 'UI', 'Fun'],
    description: [
      'The thing you are looking at right now. A little web desktop with draggable windows, a dock, a terminal that talks back, and stickers.',
      'Built for the Stardance Hackclub WebOS batch. The goal was to make a personal site that is actually fun to poke around in.',
    ],
    highlights: [
      'Full window manager: drag, focus, minimize, maximize',
      'Terminal with a dozen commands',
      'Sticker board — slap emojis on the desktop',
      'A resident spider (click it)',
    ],
  },
]

export interface SkillCategory {
  name: string
  icon: string
  skills: { name: string; level: number; note: string }[]
}

export const SKILLS: SkillCategory[] = [
  {
    name: 'Software',
    icon: '/assets/emoji/laptop.png',
    skills: [
      { name: 'Python', level: 88, note: 'daily driver' },
      { name: 'TypeScript / JS', level: 78, note: 'web things' },
      { name: 'C++', level: 62, note: 'embedded' },
      { name: 'Computer Vision', level: 70, note: 'OpenCV, a bit of ML' },
    ],
  },
  {
    name: 'Hardware',
    icon: '/assets/emoji/wrench.png',
    skills: [
      { name: '3D printing / CAD', level: 82, note: 'Fusion 360' },
      { name: 'Electronics', level: 68, note: 'PCBs, soldering' },
      { name: 'Microcontrollers', level: 75, note: 'ESP32, STM32' },
    ],
  },
  {
    name: 'AI & Agents',
    icon: '/assets/emoji/brain.png',
    skills: [
      { name: 'LLM agents', level: 72, note: 'tool use, evals' },
      { name: 'Prompt engineering', level: 80, note: 'dark art' },
      { name: 'Reinforcement learning', level: 45, note: 'learning' },
    ],
  },
]

export interface Goal {
  title: string
  icon: string
  status: 'On track' | 'In progress' | 'Stalled' | 'Done'
  progress: number
  deadline: string
}

export const GOALS: Goal[] = [
  { title: 'Drone completes a full autonomous pool lap', icon: '/assets/emoji/robot.png', status: 'In progress', progress: 65, deadline: 'this summer' },
  { title: 'Ship Veya glasses v1 to 5 beta testers', icon: '/assets/emoji/glasses.png', status: 'On track', progress: 40, deadline: 'autumn' },
  { title: 'Write up the agent eval harness', icon: '/assets/emoji/memo.png', status: 'Stalled', progress: 20, deadline: 'someday' },
  { title: 'Ship Spidey OS for the WebOS batch', icon: '/assets/emoji/web.png', status: 'Done', progress: 100, deadline: 'shipped' },
]

export interface Experiment {
  title: string
  date: string
  note: string
  result: 'worked' | 'failed' | 'inconclusive'
}

export const EXPERIMENTS: Experiment[] = [
  { title: 'Mono-camera depth estimation underwater', date: 'last week', note: 'Tried MiDaS-style depth on underwater footage. Murky water destroys it. Falling back to sonar + heuristics.', result: 'failed' },
  { title: 'Agent self-critique loop', date: '2 weeks ago', note: 'Added a “criticize your own plan” step before execution. Cut silly failures roughly in half on my eval set.', result: 'worked' },
  { title: 'Prism display readability outdoors', date: 'last month', note: 'OLED through prism is readable indoors, washed out in sunlight. Need a brighter panel or a tint film.', result: 'inconclusive' },
  { title: 'PID vs. fuzzy control for depth hold', date: 'last month', note: 'Fancy fuzzy controller performed about the same as a well-tuned PID. Keeping the PID — simpler wins.', result: 'worked' },
]

export const STATS = [
  { label: 'Projects shipped', icon: '/assets/emoji/rocket.png', value: '7', sub: '2 this year' },
  { label: 'Hours in CAD', icon: '/assets/emoji/gear.png', value: '340+', sub: 'and counting' },
  { label: 'Hulls that leaked', icon: '/assets/emoji/robot.png', value: '2', sub: 'third one held' },
  { label: 'Coffee → code ratio', icon: '/assets/emoji/zap.png', value: '1:250', sub: 'cups to lines' },
]

export const FACTS: { label: string; value: string }[] = [
  { label: 'Editor', value: 'VS Code + Vim keys' },
  { label: 'OS', value: 'this one, obviously' },
  { label: 'Favorite tool', value: 'the 3D printer' },
  { label: 'Currently reading', value: 'papers on SLAM' },
  { label: 'Debug method', value: 'print statements, proudly' },
  { label: 'Spirit animal', value: 'spider (obviously)' },
]

export const STICKER_EMOJIS = [
  'spidey-mask', 'spidey-emblem', 'peter', 'spidey-swing', 'web-shooter', 'thwip',
  'spider', 'web', 'rocket', 'robot', 'brain', 'zap',
  'target', 'trophy', 'bulb', 'gear', 'wrench', 'laptop',
  'books', 'memo', 'folder', 'glasses', 'handshake', 'wave',
] as const
