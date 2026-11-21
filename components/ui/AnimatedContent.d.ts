import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type AnimatedContentOptions = {
  children: ReactNode
  container?: string | HTMLElement | Window
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  blur?: number
  rotate?: number
  tilt?: number
  wipe?: 'none' | 'up' | 'down' | 'left' | 'right' | 'center'
  threshold?: number
  delay?: number
  stagger?: number
  staggerFrom?: 'start' | 'end' | 'center' | 'edges' | 'random'
  trigger?: 'scroll' | 'mount'
  once?: boolean
  scrub?: boolean | number
  disappearAfter?: number
  disappearDuration?: number
  disappearEase?: string
  onStart?: () => void
  onComplete?: () => void
  onDisappearanceComplete?: () => void
}

export default function AnimatedContent<Tag extends keyof HTMLElementTagNameMap = 'div'>(
  props: AnimatedContentOptions & { as?: Tag } & Omit<ComponentPropsWithoutRef<Tag>, keyof AnimatedContentOptions>
): ReactNode
