import { useLayoutEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import './RubberSegment.css'

type SegmentItem = { title: string; decoration?: ReactNode }

type RubberSegmentProps = {
  id: string
  label: string
  items: readonly SegmentItem[]
  active: number
  onChange: (index: number) => void
  className?: string
}

export default function RubberSegment({ id, label, items, active, onChange, className }: RubberSegmentProps) {
  const viewport = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const edgeLeft = useMotionValue(0)
  const edgeRight = useMotionValue(0)
  const thumbWidth = useTransform(() => Math.max(0, edgeRight.get() - edgeLeft.get()))
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const button = tabs.current[active]
    const scroller = viewport.current
    const track = rail.current
    if (!button || !scroller || !track) return

    const keepVisible = () => {
      const left = button.offsetLeft - 4
      const right = left + button.offsetWidth + 8
      const visibleLeft = scroller.scrollLeft
      const visibleRight = visibleLeft + scroller.clientWidth
      if (left < visibleLeft || button.offsetWidth > scroller.clientWidth) {
        scroller.scrollLeft = left
      } else if (right > visibleRight) {
        scroller.scrollLeft = right - scroller.clientWidth
      }
    }

    const syncThumb = (withMotion: boolean) => {
      const left = button.offsetLeft
      const right = left + button.offsetWidth
      const fromLeft = edgeLeft.get()
      const fromRight = edgeRight.get()

      if (withMotion && !reducedMotion && fromRight > fromLeft) {
        // RubberSegment stretches across both slots, then contracts to the selection.
        const transition = { duration: 0.38, times: [0, 0.36, 1], ease: 'easeOut' as const }
        animate(edgeLeft, [fromLeft, Math.min(fromLeft, left), left], transition)
        animate(edgeRight, [fromRight, Math.max(fromRight, right), right], transition)
      } else {
        edgeLeft.jump(left)
        edgeRight.jump(right)
      }
      keepVisible()
    }

    syncThumb(true)
    let trackWidth = track.offsetWidth
    let viewportWidth = scroller.clientWidth
    let tabLeft = button.offsetLeft
    let tabWidth = button.offsetWidth
    const observer = new ResizeObserver(() => {
      if (trackWidth === track.offsetWidth && viewportWidth === scroller.clientWidth
        && tabLeft === button.offsetLeft && tabWidth === button.offsetWidth) return
      trackWidth = track.offsetWidth
      viewportWidth = scroller.clientWidth
      tabLeft = button.offsetLeft
      tabWidth = button.offsetWidth
      syncThumb(false)
    })
    observer.observe(track)
    observer.observe(scroller)
    observer.observe(button)
    return () => {
      observer.disconnect()
      edgeLeft.stop()
      edgeRight.stop()
    }
  }, [active, edgeLeft, edgeRight, reducedMotion])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1
    const targets: Record<string, number | undefined> = {
      ArrowRight: (index + 1) % items.length,
      ArrowDown: (index + 1) % items.length,
      ArrowLeft: (index + last) % items.length,
      ArrowUp: (index + last) % items.length,
      Home: 0,
      End: last,
    }
    const next = targets[event.key]
    if (typeof next !== 'number') return
    event.preventDefault()
    onChange(next)
    tabs.current[next]?.focus({ preventScroll: true })
  }

  return (
    <div ref={viewport} className={['workflow-stage-picker', className].filter(Boolean).join(' ')}>
      <div ref={rail} className="rubber-segment" role="tablist" aria-label={label}>
        <motion.span aria-hidden="true" className="rubber-segment__thumb" style={{ x: edgeLeft, width: thumbWidth }} />
        {items.map(({ title, decoration }, index) => (
          <button
            key={title}
            ref={element => { tabs.current[index] = element }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => onChange(index)}
            onKeyDown={event => handleKeyDown(event, index)}
          >
            {decoration && <span className="rubber-segment__decoration" aria-hidden="true">{decoration}</span>}
            {title}
          </button>
        ))}
      </div>
    </div>
  )
}
