import AnimatedContent from './AnimatedContent'

export default function TextReveal<Tag extends keyof HTMLElementTagNameMap = 'div'>(
  props: Parameters<typeof AnimatedContent<Tag>>[0],
) {
  return <AnimatedContent<Tag> distance={14} duration={0.6} {...props} />
}
