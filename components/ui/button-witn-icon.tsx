import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ButtonWithIconProps = {
  href?: string
  children?: string
}

export default function ButtonWithIcon({ href, children = "Let's Collaborate" }: ButtonWithIconProps) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-y-1 right-1 flex size-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45 group-focus-visible:right-[calc(100%-44px)] group-focus-visible:rotate-45 motion-reduce:transition-none"
      >
        <ArrowUpRight size={16} />
      </span>
    </>
  )

  return (
    <Button
      asChild={Boolean(href)}
      type={href ? undefined : 'button'}
      className="group relative h-12 w-fit cursor-pointer justify-self-start overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium transition-all duration-500 hover:ps-14 hover:pe-6 focus-visible:ps-14 focus-visible:pe-6 motion-reduce:transition-none"
    >
      {href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content}
    </Button>
  )
}
