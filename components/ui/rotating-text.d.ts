import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export type RotatingTextHandle = { jumpTo: (index: number) => void; reset: () => void }

declare const RotatingText: ForwardRefExoticComponent<{
  auto?: boolean
  direction?: 'up' | 'down'
  highlight?: boolean
  highlightColor?: string
  rotationInterval?: number
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number
  effect?: 'slide' | 'flip' | 'blur' | 'scale' | 'drop'
  transition?: { type: 'tween'; duration: number; ease: 'easeOut' }
  texts: string[]
  staggerDuration?: number
  splitLevelClassName?: string
  mainClassName?: string
} & RefAttributes<RotatingTextHandle>>
export default RotatingText
