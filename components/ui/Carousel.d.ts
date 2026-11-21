import type { ReactElement } from 'react'

export default function Carousel(props: {
  items: ReactElement[]
  baseWidth?: number
  aspectRatio?: number
  effect?: 'tilt' | 'slide' | 'scale' | 'fade' | 'cube'
  indicator?: 'dots' | 'bars' | 'counter' | 'none'
  arrows?: boolean
  loop?: boolean
  className?: string
}): ReactElement
