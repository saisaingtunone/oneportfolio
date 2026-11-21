import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'
import SplitText from '@/components/ui/split-text'
import { asset, assetUrl } from './content'

const Lanyard = lazy(() => import('@/components/ui/lanyard'))
const badgePortrait = assetUrl('one-portrait.jpg')

export function HeroText({ id, text, className, heading = false }: {
  id?: string; text: string; className?: string; heading?: boolean
}) {
  return <SplitText id={id} text={text} className={className} tag={heading ? 'h1' : 'p'} textAlign="left"
    trigger="load" effect={heading ? 'rise' : 'fade'} splitType={heading ? 'chars' : 'words'}
    delay={heading ? 75 : 17} duration={heading ? 0.8 : 0.47}
    accentColor={heading ? '#007EEF' : undefined} />
}

export function PortraitBadge() {
  const [motion, setMotion] = useState(false)
  const [ready, setReady] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const badgeRef = useRef<HTMLElement>(null)
  const flipRef = useRef<(() => void) | null>(null)
  const drag = useRef<{
    id: number; x: number; y: number; length: number
    left: number; right: number; top: number; bottom: number
  } | null>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (query.matches) {
        setMotion(false)
        setReady(false)
        return
      }
      const probe = document.createElement('canvas').getContext('webgl2')
      setMotion(Boolean(probe))
      probe?.getExtension('WEBGL_lose_context')?.loseContext()
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useLayoutEffect(() => {
    const badge = badgeRef.current
    const hero = badge?.closest('.hero')
    if (!badge || !hero) return
    const updateStrap = () => {
      const { top, height } = badge.getBoundingClientRect()
      badge.style.setProperty('--badge-page-offset', Math.max(0, top + window.scrollY) + 'px')
      badge.style.setProperty('--strap-width', height * 0.0619 + 'px')
    }
    updateStrap()
    const observer = new ResizeObserver(updateStrap)
    observer.observe(hero)
    observer.observe(badge)
    window.addEventListener('resize', updateStrap)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateStrap)
    }
  }, [])

  const grabBadge = (event: PointerEvent<HTMLDivElement>) => {
    const badge = badgeRef.current
    const hero = badge?.closest('.hero-swarm')
    if (!badge || !hero || ready || event.button !== 0 || drag.current) return
    const card = event.currentTarget.getBoundingClientRect()
    const bounds = hero.getBoundingClientRect()
    drag.current = {
      id: event.pointerId, x: event.clientX, y: event.clientY,
      length: card.top + window.scrollY,
      left: bounds.left - card.left, right: bounds.right - card.right,
      top: bounds.top - card.top, bottom: bounds.bottom - card.bottom,
    }
    badge.dataset.dragging = 'true'
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveBadge = (event: PointerEvent<HTMLDivElement>) => {
    const origin = drag.current
    const badge = badgeRef.current
    if (!origin || !badge || origin.id !== event.pointerId) return
    const x = Math.min(origin.right, Math.max(origin.left, event.clientX - origin.x))
    const dy = Math.min(origin.bottom, Math.max(origin.top, event.clientY - origin.y))
    const y = origin.length + dy
    badge.style.setProperty('--badge-x', x + 'px')
    badge.style.setProperty('--badge-y', dy + 'px')
    badge.style.setProperty('--band-length', Math.hypot(x, y) + 'px')
    badge.style.setProperty('--band-angle', -Math.atan2(x, y) + 'rad')
  }

  const releaseBadge = (event: PointerEvent<HTMLDivElement>) => {
    const badge = badgeRef.current
    if (!badge || drag.current?.id !== event.pointerId) return
    drag.current = null
    delete badge.dataset.dragging
    for (const property of ['--badge-x', '--badge-y', '--band-length', '--band-angle']) {
      badge.style.removeProperty(property)
    }
  }

  return (
    <>
      <div className="portrait-badge-slot">
        <figure ref={badgeRef} className="portrait-badge" data-ready={ready}>
          <div className="badge-static-strap" aria-hidden="true" />
          <div className="badge-static" data-flipped={flipped}
            onPointerDown={grabBadge} onPointerMove={moveBadge} onPointerUp={releaseBadge}
            onPointerCancel={releaseBadge} onLostPointerCapture={releaseBadge}>
            <img className="badge-front" src={badgePortrait} alt="One in graduation robes" width="1365" height="2048" fetchPriority="high" draggable={false} />
            <img className="badge-back" src={asset('one-badge')} alt="" width="1080" height="1519" draggable={false} />
          </div>
        </figure>
        <button className="badge-flip" type="button" onClick={() => {
          if (ready) flipRef.current?.()
          else setFlipped(value => !value)
        }}>Flip badge</button>
      </div>
      {motion && <Suspense fallback={null}><div className="badge-scene" aria-hidden="true" data-ready={ready}>
        <Lanyard frontImage={badgePortrait} backImage={asset('one-badge')} backImageFit="contain"
          framingRef={badgeRef} strapColor="#007EEF" cardColor="#1B1919" finish="matte" size={0.72}
          strapLength={0.28} strapWidth={0.78} cornerRadius={0.33} damping={0.7}
          breeze={0} intro={false} onReady={flip => { flipRef.current = flip; setReady(true) }} />
      </div></Suspense>}
    </>
  )
}
