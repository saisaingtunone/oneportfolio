import { forwardRef } from 'react'
import { Button } from '@/components/ui/button'

interface MenuButtonProps {
  open: boolean
  controls: string
  onClick: () => void
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ open, controls, onClick }, ref) => (
    <Button ref={ref} className="nav-menu-toggle group" variant="outline" size="icon" type="button"
      onClick={onClick} aria-controls={controls} aria-expanded={open}
      aria-label={open ? 'Close menu' : 'Open menu'}>
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12L20 12"
          className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
        <path d="M4 12H20"
          className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45" />
        <path d="M4 12H20"
          className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
      </svg>
    </Button>
  ),
)
MenuButton.displayName = 'MenuButton'
