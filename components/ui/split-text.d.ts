import type { ComponentType } from 'react'

declare const SplitText: ComponentType<{
  id?: string
  text: string
  className?: string
  delay?: number
  duration?: number
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  trigger?: 'view' | 'load'
  effect?: 'rise' | 'fade' | 'blur' | 'flip' | 'pop' | 'skew' | 'wave'
  textAlign?: 'left' | 'center' | 'right'
  accentColor?: string
}>

export default SplitText
