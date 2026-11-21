"use client"

import * as React from "react"
import gsap from "gsap"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

/*
 * Tumble Deck Showcase — a stack of website screenshots standing on edge, one
 * behind the other. The front card tips forward on its bottom edge and lands
 * flat on the floor, the deck slides up to the line, the next one falls. It is
 * scroll-driven: the wheel, a trackpad or a drag scrubs the deck, and it never
 * runs out — after the last card the first one is standing behind it again,
 * both ways.
 *
 * Pure CSS 3D (one perspective, every card hinged on the same floor line) with
 * a single number driving it — the deck position, which may run any distance. A
 * small pool of card elements is recycled along it: slot j always holds the
 * virtual card k ≡ j (mod pool), showing image k mod n, and a slot is only
 * re-pointed while it is invisible (under the floor pile or past the back).
 */

export type TumbleCard = {
  src: string
  alt?: string
  fullSizeSrc?: string
}

export type TumbleDeckShowcaseProps = {
  cards: TumbleCard[]
  /** Any CSS length. Default 100svh. */
  height?: number | string
  /** Card width ÷ height. Images are cropped to it from the top. */
  aspect?: number
  imageFit?: "cover" | "contain"
  cardScale?: number
  /** Wheel / trackpad travel (px) that tips one card. */
  scrollPerCard?: number
  /** How many upright cards show behind the front one. */
  depth?: number
  background?: string
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}

// #region pose
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

/** Euclidean modulo: card k of an endless deck shows image wrap(k, n). */
export const wrap = (k: number, n: number) => (n ? ((k % n) + n) % n : 0)

/**
 * Hinge angle (deg, CSS rotateX) of a card `t` of the way through its fall.
 * 0 stands upright, -90 lies flat towards the viewer. Gravity eases in, then
 * the card kicks once off the floor and settles.
 */
export function fallAngle(t: number): number {
  const u = clamp01(t)
  const land = 0.78
  if (u <= land) {
    const k = u / land
    return -90 * k * k * k
  }
  const k = (u - land) / (1 - land)
  return -90 + 6 * Math.sin(Math.PI * k) * (1 - k)
}

/** How far the deck has slid forward, in card gaps, at deck position `pos`. */
export function deckAdvance(pos: number): number {
  const i = Math.floor(pos)
  const f = pos - i
  const k = clamp01((f - 0.28) / 0.6)
  return i + k * k * (3 - 2 * k)
}

export type Pose = { angle: number; z: number; lift: number; opacity: number; flat: boolean }

/**
 * Pose of virtual card `k` when the deck is at `pos` (card k is at the front
 * when pos = k). Both may run past the number of images, and below zero.
 */
export function cardPose(k: number, pos: number, depth: number): Pose {
  const t = pos - k
  // Floor cards lie a hair apart, the newest highest. Relative to the front
  // index so the pile doesn't creep upward as the loop runs on.
  const lift = (k - Math.floor(pos) + 3) * 0.6
  if (t >= 1) {
    // On the floor. Only the two latest show.
    return { angle: -90, z: 0, lift, opacity: t < 3 ? 1 : 0, flat: true }
  }
  if (t > 0) return { angle: fallAngle(t), z: 0, lift, opacity: 1, flat: false }
  const rel = k - deckAdvance(pos)
  const opacity = clamp01(depth + 1 - rel)
  return { angle: 0, z: -Math.max(rel, 0), lift: 0, opacity, flat: false }
}
// #endregion

export default function TumbleDeckShowcase({
  cards,
  height = "100svh",
  aspect = 2.06,
  imageFit = "cover",
  cardScale = 1,
  scrollPerCard = 240,
  depth = 5,
  background = "var(--color-background)",
  className,
  style,
  ariaLabel = "Website showcase",
}: TumbleDeckShowcaseProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const sceneRef = React.useRef<HTMLDivElement>(null)
  const photoDialogRef = React.useRef<HTMLDialogElement>(null)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = React.useRef<(HTMLImageElement | null)[]>([])
  const slotK = React.useRef<number[]>([])
  const state = React.useRef({ pos: 0 })
  const geo = React.useRef({ h: 200, gap: 44 })
  const [active, setActive] = React.useState(0)
  const [viewedPhoto, setViewedPhoto] = React.useState<TumbleCard | null>(null)
  const instructionsId = React.useId()
  const n = cards.length
  // Two on the floor, the falling one, the front one, `depth` behind, one fading in.
  const pool = n ? depth + 5 : 0

  const paint = React.useCallback(() => {
    const { pos } = state.current
    const { gap } = geo.current
    const base = Math.floor(pos) - 2
    cardRefs.current.forEach((el, j) => {
      const img = imgRefs.current[j]
      if (!el || !img || j >= pool) return
      const k = base + wrap(j - base, pool)
      if (slotK.current[j] !== k) {
        slotK.current[j] = k
        const c = cards[wrap(k, n)]
        img.src = c.src
        img.alt = c.alt ?? ""
      }
      const p = cardPose(k, pos, depth)
      el.style.transform = `translate3d(0, ${-p.lift}px, ${p.z * gap}px) rotateX(${p.angle}deg)`
      el.style.opacity = String(p.opacity)
      el.style.visibility = p.opacity > 0 ? "visible" : "hidden"
      // Light falls from above: a card darkens a touch as it tips away from it.
      const shade = p.flat ? 0.06 : (-p.angle / 90) * 0.06
      el.style.setProperty("--td-shade", String(shade))
    })
  }, [depth, pool, cards, n])

  // New images: re-point every slot on the next paint.
  React.useLayoutEffect(() => {
    slotK.current = []
  }, [cards])

  // Fit: the card, the deck above it and the floor card below all inside the
  // root. Perspective and eye height are fixed ratios of the card height,
  // measured off the reference composition.
  React.useLayoutEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    if (!root || !scene) return
    const fit = () => {
      const W0 = root.clientWidth
      const H0 = root.clientHeight
      const wFrac = Math.min((W0 < 420 ? 0.76 : 0.655) * cardScale, 0.82)
      const hFrac = Math.min(0.42 * cardScale, 0.51)
      const h = Math.max(60, Math.min((W0 * wFrac) / aspect, H0 * hFrac, 620))
      const w = h * aspect
      const top = H0 / 2 - 0.62 * h
      geo.current = { h, gap: 0.24 * h }
      scene.style.perspective = `${6 * h}px`
      scene.style.perspectiveOrigin = `50% ${top - 1.66 * h}px`
      root.style.setProperty("--td-w", `${w}px`)
      root.style.setProperty("--td-h", `${h}px`)
      root.style.setProperty("--td-top", `${top}px`)
      paint()
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(root)
    return () => ro.disconnect()
  }, [aspect, cardScale, paint])

  // Scroll-driven. Wheel, trackpad and drag push a target position; the deck
  // eases after it every frame and, once the input goes quiet, settles on the
  // nearest whole card so nothing is left half-fallen. No autoplay.
  const api = React.useRef<{ step: (dir: 1 | -1) => void }>({ step: () => {} })
  const dragged = React.useRef(false)
  React.useEffect(() => {
    const root = rootRef.current
    if (!root || n < 2) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const s = state.current
    let target = s.pos
    let running = false
    let idle: ReturnType<typeof setTimeout> | undefined
    let acc = 0

    const follow = () => {
      const dt = gsap.ticker.deltaRatio(60) / 60
      s.pos += (target - s.pos) * (1 - Math.exp(-dt * 9))
      if (Math.abs(target - s.pos) < 2e-3) {
        s.pos = target
        gsap.ticker.remove(follow)
        running = false
      }
      paint()
    }
    const push = (to: number) => {
      // A hard fling still travels card by card instead of skipping the deck.
      target = Math.max(Math.round(s.pos) - 3, Math.min(Math.round(s.pos) + 3, to))
      if (Number.isInteger(target)) setActive(wrap(target, n))
      if (reduce) {
        s.pos = target
        paint()
      } else if (!running) {
        running = true
        gsap.ticker.add(follow)
      }
    }
    // Settle on a whole card, leaning the way the input was heading.
    const settle = (bias = 0) =>
      push(bias > 0 ? Math.floor(target + 0.7) : bias < 0 ? Math.ceil(target - 0.7) : Math.round(target))
    api.current.step = (dir) => {
      clearTimeout(idle)
      push(Math.round(target) + dir)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return
      if (!e.shiftKey && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      const scale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? root.clientHeight : 1
      const d = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * scale
      if (reduce) {
        // No scrubbing: whole cards only, one per `scrollPerCard` of travel.
        acc += d
        while (Math.abs(acc) >= scrollPerCard) {
          const dir = Math.sign(acc)
          acc -= dir * scrollPerCard
          push(target + dir)
        }
        return
      }
      push(target + d / scrollPerCard)
      clearTimeout(idle)
      idle = setTimeout(() => settle(Math.sign(d)), 140)
    }

    let drag: { id: number; axis: "clientX" | "clientY"; position: number; travel: number; last: number } | null = null
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || !e.isPrimary) return
      const axis = e.pointerType === "touch" ? "clientX" : "clientY"
      drag = { id: e.pointerId, axis, position: e[axis], travel: 0, last: 0 }
      dragged.current = false
      clearTimeout(idle)
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const delta = drag.position - e[drag.axis]
      drag.position = e[drag.axis]
      drag.travel += Math.abs(delta)
      if (delta) drag.last = Math.sign(delta)
      if (drag.travel > 6 && !dragged.current) {
        dragged.current = true
        root.setPointerCapture(e.pointerId)
      }
      if (dragged.current && !reduce) {
        const size = drag.axis === "clientX" ? geo.current.h * aspect : geo.current.h
        push(target + delta / (size * 1.1))
      }
    }
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      if (dragged.current) {
        if (reduce) push(Math.round(target) + (drag.last || 0))
        else settle(drag.last)
      }
      drag = null
    }

    root.addEventListener("wheel", onWheel, { passive: false })
    root.addEventListener("pointerdown", onDown)
    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerup", onUp)
    root.addEventListener("pointercancel", onUp)
    paint()
    return () => {
      clearTimeout(idle)
      gsap.ticker.remove(follow)
      root.removeEventListener("wheel", onWheel)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerup", onUp)
      root.removeEventListener("pointercancel", onUp)
    }
  }, [n, aspect, scrollPerCard, paint])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
      e.preventDefault()
      api.current.step(1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      api.current.step(-1)
    }
  }

  if (!n) return null
  const selected = wrap(active, n)
  const selectedPhoto = cards[selected]

  return (
    <div className="td-showcase">
      <style>{`
        .td-root { touch-action: pan-y pinch-zoom; }
        .td-scene { position: absolute; inset: 0; transform-style: preserve-3d; }
        .td-card {
          position: absolute; left: 50%; top: var(--td-top);
          width: var(--td-w); height: var(--td-h); margin-left: calc(var(--td-w) / -2);
          transform-origin: 50% 100%; transform-style: preserve-3d;
          backface-visibility: visible; will-change: transform;
          border-radius: 3px; overflow: hidden; cursor: pointer;
          background: color-mix(in oklab, var(--color-foreground) 8%, var(--color-background));
          box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-foreground) 10%, transparent);
        }
        .td-card img {
          display: block; width: 100%; height: 100%; max-width: none;
          object-fit: cover; object-position: 50% 0%; pointer-events: none;
        }
        .td-card::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: #000; opacity: var(--td-shade, 0);
        }
        .td-root:focus-visible { box-shadow: inset 0 0 0 2px var(--color-primary); }
        .td-controls {
          display: flex; align-items: center; justify-content: center;
          gap: 16px; margin-top: 16px;
        }
        .td-controls button {
          display: grid; place-items: center; width: 44px; height: 44px;
          border: 1px solid var(--color-border); border-radius: 50%;
          color: var(--color-foreground); background: var(--color-accent); cursor: pointer;
        }
        .td-controls button:hover { border-color: var(--color-ring); }
        .td-count {
          min-width: 5ch; text-align: center;
          color: var(--color-muted-foreground); font-variant-numeric: tabular-nums;
        }
        .td-view-full, .td-photo-close {
          display: flex; align-items: center; gap: 0.5rem;
          min-height: 44px; padding: 0 1rem; border-radius: 99px;
          border: 1px solid var(--color-border);
          background: var(--color-accent); color: var(--color-foreground);
          font-size: 0.875rem; font-weight: 600; cursor: pointer;
        }
        .td-view-full { margin: 0.75rem auto 0; }
        .td-view-full:hover, .td-photo-close:hover { border-color: var(--color-ring); }
        .td-photo-dialog {
          position: fixed; inset: 0; width: fit-content; margin: auto;
          max-width: calc(100% - 1.5rem); max-height: calc(100dvh - 1.5rem);
          padding: 0.625rem; border: 0; border-radius: 0.75rem;
          background: var(--color-background); color: var(--color-foreground);
        }
        .td-photo-dialog::backdrop { background: rgb(0 0 0 / 0.88); }
        .td-photo-close { margin: 0 0 0.625rem auto; }
        .td-photo-dialog img {
          display: block; margin-inline: auto;
          width: auto; height: auto; max-width: 100%;
          max-height: calc(100dvh - 6.25rem); object-fit: contain;
        }
      `}</style>
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={n === 1 ? cards[0].alt ?? ariaLabel : ariaLabel}
        aria-describedby={n > 1 ? instructionsId : undefined}
        tabIndex={n > 1 ? 0 : undefined}
        onKeyDown={onKey}
        onClick={() => {
          if (!dragged.current) api.current.step(1)
        }}
        className={["td-root relative w-full overflow-hidden outline-none select-none", className]
          .filter(Boolean)
          .join(" ")}
        style={{ height, background, ...style }}
      >
        <div ref={sceneRef} className="td-scene" aria-hidden="true">
          {Array.from({ length: pool }, (_, j) => (
            <div
              key={j}
              ref={(el) => {
                cardRefs.current[j] = el
              }}
              className="td-card"
            >
              {/* The image follows its slot as the deck rotates. */}
              <img
                ref={(el) => {
                  imgRefs.current[j] = el
                }}
                alt=""
                width={720}
                height={Math.round(720 / aspect)}
                style={{ objectFit: imageFit, objectPosition: imageFit === "contain" ? "center" : "50% 0%" }}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
      {n > 1 && <>
        <span id={instructionsId} className="sr-only">
          Swipe, scroll sideways, or use the arrow keys or buttons to browse.
        </span>
        <div className="td-controls">
          <button type="button" aria-label="Previous photo" onClick={() => api.current.step(-1)}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <span className="td-count" aria-live="polite" aria-atomic="true">
            <span aria-hidden="true">{selected + 1} / {n}</span>
            <span className="sr-only">Photo {selected + 1} of {n}. {selectedPhoto.alt}</span>
          </span>
          <button type="button" aria-label="Next photo" onClick={() => api.current.step(1)}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </>}
      {selectedPhoto.fullSizeSrc && <>
        <button
          type="button"
          className="td-view-full"
          aria-haspopup="dialog"
          onClick={() => {
            setViewedPhoto(selectedPhoto)
            photoDialogRef.current?.showModal()
          }}
        >
          <Maximize2 size={16} aria-hidden="true" />
          View full size
        </button>
        <dialog
          ref={photoDialogRef}
          className="td-photo-dialog"
          aria-label="Full-size gallery photo"
          onClose={() => setViewedPhoto(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close()
          }}
        >
          <button type="button" className="td-photo-close" onClick={() => photoDialogRef.current?.close()}>
            <X size={16} aria-hidden="true" />
            Close
          </button>
          {viewedPhoto && <img src={viewedPhoto.fullSizeSrc} alt={viewedPhoto.alt ?? ""} />}
        </dialog>
      </>}
    </div>
  )
}
