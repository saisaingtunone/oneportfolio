import { useId, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import MagicBento from './MagicBento'
import { identitySystems, posterSystems } from '../../src/artwork-system'
import { artworkRationale } from '../../src/artwork-rationale'
import Folder from './Folder'
import SplitText from './split-text'
import { asset } from '../../src/content'
import { cityOfLoveCollection, type ArtworkStage } from '../../src/artwork'
import Carousel from './Carousel'
import RubberSegment from './RubberSegment'
import TextReveal from './text-reveal'

export function ArtworkWorkflow({ stages, logos, projectId }: { stages: ArtworkStage[]; logos: boolean; projectId: string }) {
  const [active, setActive] = useState(0)
  const id = useId()
  const reduce = useReducedMotion()
  const stage = stages[active]
  const system = logos ? identitySystems[active] : posterSystems[projectId]
  const decisions = artworkRationale[projectId]?.[active] ?? []

  return (
    <section className="project-evidence workflow-evidence artwork-workflow" aria-labelledby={id + '-heading'}>
      <div className="workflow-heading">
        <SplitText tag="h2" id={id + '-heading'} text={logos ? 'Identity studies.' : 'Design process.'} effect="rise" splitType="words" textAlign="left" />
        <TextReveal as="p">{logos ? 'Explore the marks, variations, and brand applications.' : 'Explore the brief, visual choices, and finished artwork.'}</TextReveal>
      </div>
      <div className="workflow-browser">
        <div className="workflow-folder-wrap">
          <Folder label="Artwork" color="#087ce2" paperColor="#e5f0ff" layout="stack"
            draggable={false} zoomOnClick={false} intro={!reduce} tilt={reduce ? 0 : 0.25}
            onItemClick={(_, index) => setActive(index)}
            items={stages.map(({ title, images, preview = images?.[0]?.[0] }) => ({
              title,
              content: <div className="workflow-file artwork-file">
                {preview && <img src={asset(preview)} alt="" draggable={false} />}
                <strong>{title}</strong>
              </div>,
            }))}
            frontContent={<div className="workflow-folder-cover"><strong>{logos ? 'Brand identities' : 'Project artwork'}</strong><span>{stages.length} files</span></div>} />
        </div>
        <RubberSegment id={id} label={logos ? 'Identity studies' : 'Design process'}
          items={stages} active={active} onChange={setActive} />
      </div>
      <div className="workflow-panel" role="tabpanel" id={id + '-panel'} aria-labelledby={id + '-tab-' + active} tabIndex={0}>
        <div key={stage.title} className="workflow-panel-copy">
          <TextReveal as="p" className="eyebrow">{logos ? 'Identity' : 'Stage'} {active + 1} / {stages.length}</TextReveal>
          <SplitText tag="h3" text={stage.title} effect="rise" splitType="words" textAlign="left" />
          <SplitText text={stage.body} effect="fade" splitType="lines" textAlign="left" />
          <div className="workflow-decisions">
            <TextReveal as="h4">Design decisions</TextReveal>
            <MagicBento className="artwork-bento" columns={2} gap={16} radius={18}
              glowColor="#4ba8ff" enableBorderGlow enableSpotlight clickEffect
              textAutoHide={false} style={{ gridAutoRows: 'auto' }}
              items={decisions.map(([choice, rationale]) => ({
                id: choice,
                content: <TextReveal className="artwork-decision" stagger={0.06}><h5>{choice}</h5><p>{rationale}</p></TextReveal>,
              }))} />
          </div>
          {system && <section className="artwork-system" aria-label="Visual system">
            <TextReveal as="h4">Visual system</TextReveal>
            <div className="artwork-system-palette">
              <TextReveal as="h5">Artwork palette</TextReveal>
              <TextReveal as="ul" className="artwork-swatches">
                {system.palette.map(([label, color]) => <li key={color}>
                  <span className="artwork-swatch" style={{ backgroundColor: color }} aria-hidden="true" />
                  <span>{label}</span>
                </li>)}
              </TextReveal>
            </div>
            <TextReveal as="dl" className="artwork-system-details">
              <div><dt>Typography</dt><dd>{system.type}</dd></div>
              <div><dt>Graphic elements</dt><dd>{system.elements}</dd></div>
              <div><dt>Applications</dt><dd>{system.application}</dd></div>
            </TextReveal>
          </section>}
          {stage.images && <>
            <TextReveal as="h4">Artwork & applications</TextReveal>
            <MagicBento className="artwork-bento" columns={2} gap={16} radius={18}
              glowColor="#4ba8ff" enableBorderGlow enableSpotlight clickEffect
              textAutoHide={false} style={{ gridAutoRows: 'auto' }}
              items={stage.images.map(([name, caption]) => ({
                id: name,
                colSpan: stage.images?.length === 1 ? 2 : 1,
                content: <figure className="artwork-bento-image">
                  <div className={name === 'artwork/tokify-alternate' || name === 'artwork/san-kyal-monochrome' || name === 'artwork/san-kyal-green' ? 'artwork-media artwork-media-light' : 'artwork-media'}><img src={asset(name)} alt={caption} loading="lazy" decoding="async" /></div>
                  <TextReveal as="figcaption">{caption}</TextReveal>
                </figure>,
              }))} />
          </>}
          {projectId === 'city-of-love' && active === 1 && <section className="city-collection" aria-label="City of Love event signage">
            <TextReveal as="h4">Event signage collection</TextReveal>
            <TextReveal as="p">The torn-paper border and pink lettering tie the six signs together. Each booth gets its own illustrations to help visitors recognize it at a glance.</TextReveal>
            <Carousel baseWidth={860} aspectRatio={2.15} effect="slide" indicator="dots" arrows loop
              items={cityOfLoveCollection.map(([name, title]) => (
                <figure key={name} className="city-collection-slide">
                  <img src={asset(name)} alt={title + ' sign'} draggable={false} />
                  <figcaption>{title}</figcaption>
                </figure>
              ))} />
          </section>}
          <div className="workflow-panel-footer">
            <span>{stage.title}</span>
            {active < stages.length - 1 && <button type="button" onClick={() => {
              setActive(active + 1)
              document.getElementById(id + '-panel')?.focus()
            }}>Next: {stages[active + 1].title} →</button>}
          </div>
        </div>
      </div>
    </section>
  )
}
