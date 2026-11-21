import type { ComponentType, RefObject } from 'react'

declare const Lanyard: ComponentType<{
  frontImage: string
  backImage?: string
  backImageFit?: 'contain' | 'cover'
  framingRef?: RefObject<HTMLElement | null>
  cardColor?: string
  finish?: 'glossy' | 'matte' | 'holographic' | 'metallic'
  cornerRadius?: number
  size?: number
  strapLength?: number
  strapColor?: string
  strapWidth?: number
  damping?: number
  breeze?: number
  interactive?: boolean
  intro?: boolean
  onReady?: (flip: () => void) => void
}>

export default Lanyard
