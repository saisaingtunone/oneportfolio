import { useId, useState } from 'react'
import { asset } from '../../src/content'
import { uxStages, uxProcesses } from '../../src/ux-process'
import SplitText from './split-text'
import RubberSegment from './RubberSegment'
import TextReveal from './text-reveal'

const stageItems = uxStages.map(title => ({ title }))

export function UXWorkflow({ projectId }: { projectId: string }) {
  const id = useId()
  const [active, setActive] = useState(0)
  const [description, evidence] = uxProcesses[projectId][active]

  return (
    <section className="project-evidence workflow-evidence ux-workflow" aria-labelledby={id + '-heading'}>
      <SplitText tag="h2" id={id + '-heading'} text="Design process." effect="rise" splitType="words" textAlign="left" />
      <RubberSegment id={id} label="Design stages" items={stageItems} active={active} onChange={setActive} className="ux-stage-picker" />
      <div className="workflow-panel" role="tabpanel" id={id + '-panel'} aria-labelledby={id + '-tab-' + active} tabIndex={0}>
        <div className="workflow-panel-copy" key={active}>
          <TextReveal as="p" className="eyebrow">Stage {active + 1} / {uxStages.length}</TextReveal>
          <SplitText tag="h3" text={uxStages[active]} effect="rise" splitType="words" textAlign="left" />
          <TextReveal as="p">{description}</TextReveal>
          {evidence?.map(([name, caption]) => (
            <figure key={name} className="ux-evidence">
              <img src={asset(name)} alt={caption} loading="lazy" decoding="async" />
              <TextReveal as="figcaption">{caption}</TextReveal>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
