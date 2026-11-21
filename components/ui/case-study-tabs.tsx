import { useState, type ReactNode } from 'react'
import RubberSegment from './RubberSegment'
import TextReveal from './text-reveal'

type CaseStudyTabsProps = {
  id: string
  heading: string
  items: readonly { title: string; content: ReactNode }[]
}

export function CaseStudyTabs({ id, heading, items }: CaseStudyTabsProps) {
  const [active, setActive] = useState(0)
  const item = items[active]

  return (
    <section id={id} className="project-evidence case-study-section" aria-labelledby={id + '-heading'}>
      <TextReveal as="h2" id={id + '-heading'}>{heading}</TextReveal>
      <RubberSegment id={id} label={heading} items={items} active={active} onChange={setActive} className="ux-stage-picker" />
      <div className="workflow-panel" role="tabpanel" id={id + '-panel'} aria-labelledby={id + '-tab-' + active} tabIndex={0}>
        <TextReveal key={active} className="workflow-panel-copy" stagger={0.06}>
          <h3>{item.title}</h3>
          {item.content}
        </TextReveal>
      </div>
    </section>
  )
}
