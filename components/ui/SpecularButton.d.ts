import type { ComponentPropsWithoutRef, ReactElement } from 'react'

interface SpecularStyle {
  size?: 'sm' | 'md' | 'lg'
  radius?: number
  tint?: string
  tintOpacity?: number
  blur?: number
  textColor?: string
  lineColor?: string
  baseColor?: string
  intensity?: number
  idleIntensity?: number
  shineSize?: number
  shineFade?: number
  thickness?: number
  glow?: number
  followMouse?: boolean
  proximity?: number
  autoAnimate?: boolean
  speed?: number
}

export default function SpecularButton(props: SpecularStyle & (
  | (ComponentPropsWithoutRef<'a'> & { href: string })
  | (ComponentPropsWithoutRef<'button'> & { href?: never })
)): ReactElement
