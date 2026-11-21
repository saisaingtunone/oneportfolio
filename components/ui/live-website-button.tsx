import { ChevronRight, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import './live-website-button.css'

export function LiveWebsiteButton({ href }: { href: string }) {
  const domain = URL.canParse(href) ? new URL(href).hostname : ''

  return (
    <Button asChild variant="ghost" className="live-website-button">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="live-website-icon" aria-hidden="true"><Globe size={14} /></span>
        <span className="live-website-copy">
          <span className="live-website-label">Visit live website</span>
          {domain && <span className="live-website-domain" title={domain}>{domain}</span>}
        </span>
        <ChevronRight className="live-website-chevron" size={11} aria-hidden="true" />
      </a>
    </Button>
  )
}
