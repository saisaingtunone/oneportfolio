import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

export interface CardSwapHandle {
  next: () => void
  prev: () => void
}
export interface CardSwapItem {
  title: string
  image: string
  alt?: string
  icon?: ReactNode
}
export interface CardSwapProps {
  items?: CardSwapItem[]
  children?: ReactNode
  width?: number
  height?: number
  cardDistance?: number
  verticalDistance?: number
  depth?: number
  skewAmount?: number
  visibleCards?: number
  delay?: number
  autoplay?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
  speed?: number
  bounce?: number
  parallax?: number
  hoverSpread?: number
  dim?: number
  cardRadius?: number
  intro?: boolean
  theme?: 'dark' | 'light'
  onCardClick?: (index: number) => void
  onChange?: (index: number) => void
  className?: string
}
export const Card: ForwardRefExoticComponent<{
  children?: ReactNode
  className?: string
  style?: CSSProperties
} & RefAttributes<HTMLDivElement>>
declare const CardSwap: ForwardRefExoticComponent<CardSwapProps & RefAttributes<CardSwapHandle>>
export default CardSwap
