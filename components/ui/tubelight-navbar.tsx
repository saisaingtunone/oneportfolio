import { motion, useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  id: string
  items: readonly NavItem[]
  active: string
  open: boolean
  onNavigate: () => void
}

export function NavBar({ id, items, active, open, onNavigate }: NavBarProps) {
  const reducedMotion = useReducedMotion()

  return (
    <nav id={id} className="portfolio-nav" aria-label="Main navigation" data-open={open}>
      {items.map(({ name, url, icon: Icon }) => (
        <a key={name} href={url} onClick={onNavigate}
          aria-current={active === name ? 'location' : undefined}>
          <Icon className="nav-link-icon" size={18} strokeWidth={1.7} aria-hidden="true" />
          <span>{name}</span>
          {active === name && (
            <motion.span layoutId={reducedMotion ? undefined : 'portfolio-lamp'}
              className="nav-lamp" initial={false} aria-hidden="true"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
          )}
        </a>
      ))}
    </nav>
  )
}
