import type { ComponentType, ReactNode } from 'react'

declare const SwarmCursor: ComponentType<{
  children: ReactNode
  className?: string
  count?: number
  size?: number
  color?: string
  accentColor?: string
  spread?: number
  idle?: 'roam' | 'gather' | 'hide'
  clickEffect?: 'none' | 'pulse' | 'burst'
  intro?: boolean
}>

export default SwarmCursor
