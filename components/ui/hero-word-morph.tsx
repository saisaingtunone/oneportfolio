import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'

export default function HeroWordMorph({ words }: { words: readonly string[] }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion || words.length < 2) return
    const timer = window.setInterval(() => setIndex(value => (value + 1) % words.length), 2800)
    return () => window.clearInterval(timer)
  }, [inView, reduceMotion, words.length])

  const word = words[reduceMotion ? 0 : index] ?? ''
  const occurrences = new Map<string, number>()
  const layoutTransition = { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <span className="hero-word-morph" ref={ref}>
      {words.map(phrase => <span className="hero-word-measure" key={phrase}>{phrase}</span>)}
      <span className="hero-word-letters">
        <motion.span className="hero-word-frame" layout={reduceMotion ? false : 'size'}
          transition={{ layout: layoutTransition }} />
        {reduceMotion ? <span>{word}</span> : (
          <AnimatePresence initial={false} mode="popLayout">
            {Array.from(word, (letter, i) => {
              const occurrence = (occurrences.get(letter) ?? 0) + 1
              occurrences.set(letter, occurrence)
              return <motion.span key={`${letter}${occurrence}`} layout="position"
                initial={{ opacity: 0, y: '30%', filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: '-30%', filter: 'blur(3px)', transition: { duration: 0.14 } }}
                transition={{ duration: 0.23, delay: 0.17 + i * 0.009, ease: 'easeOut',
                  layout: layoutTransition }}>
                {letter === ' ' ? '\u00a0' : letter}
              </motion.span>
            })}
          </AnimatePresence>
        )}
      </span>
    </span>
  )
}
