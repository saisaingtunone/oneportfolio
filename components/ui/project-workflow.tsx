import { useId, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Search, Network, PanelsTopLeft, Palette, Code2, Rocket } from 'lucide-react'
import Folder from './Folder'
import MagicBento from './MagicBento'
import { LiveWebsiteButton } from './live-website-button'
import SplitText from './split-text'
import { caseStudies } from './case-study-content'
import RubberSegment from './RubberSegment'
import TextReveal from './text-reveal'
import { asset } from '../../src/content'

const steps = [
  { title: 'Research', icon: Search },
  { title: 'Site map', icon: Network },
  { title: 'Wireframes', icon: PanelsTopLeft },
  { title: 'UI design', icon: Palette },
  { title: 'Vibe coding', icon: Code2 },
  { title: 'Launched', icon: Rocket },
]
const stageItems = steps.map(({ title, icon: Icon }, index) => ({
  title,
  decoration: <><span className="workflow-step-number">0{index + 1}</span><Icon size={18} /></>,
}))
const projects = {
  'tokify-languages': {
    title: 'Tokify Languages', image: asset('tokify'), url: 'https://tokifylanguages.com/index.html#languageClasses',
    focus: 'Help visitors understand the learning offer, choose a language, and find a clear first step.',
    audience: 'Language learners exploring courses and speaking practice.',
    priorities: ['Make language choices easy to compare', 'Give learning and placement-test actions clear priority', 'Keep navigation and the learner journey consistent'],
    map: ['Home', 'Language Path', 'Dashboard', 'Help', 'Contact'],
    journey: ['Create an account', 'Take a placement test', 'Choose language & class', 'Continue on Dashboard'],
    ui: 'A blue foundation, yellow primary actions, rounded language chips, and a speaking-practice feature create a welcoming learning interface.',
    build: ['Translate the custom UI/UX into reusable page sections', 'Use AI assistance to implement and refine the design', 'Adapt navigation, cards, and layouts for smaller screens'],
  },
  'gemsheaven-jade': {
    title: 'GemsHeaven Jade', image: asset('gemsheaven'), url: 'https://gemsheavenjade.com/',
    focus: 'Present jade jewelry clearly while connecting brand storytelling with product discovery.',
    audience: 'Customers exploring jade jewelry and looking for product information.',
    priorities: ['Give jewelry photography a clear visual focus', 'Keep shop, story, and support easy to find', 'Create a consistent path from discovery to shopping'],
    map: ['Home', 'Shop', 'About us', 'Contact', 'FAQ'],
    journey: ['Discover the collection', 'Search / filter in Shop', 'Explore product details', 'Continue to Cart'],
    ui: 'Deep green tones, mint accents, generous product photography, and restrained typography support the jade storefront’s visual identity.',
    build: ['Build the storefront from the custom interface design', 'Use AI assistance to implement and refine page behavior', 'Carry the brand palette and layout into responsive views'],
  },
} as const

type ProjectId = keyof typeof projects

function Wireframe({ jade }: { jade: boolean }) {
  return <svg className="workflow-wireframe" viewBox="0 0 760 420" role="img" aria-label="Reconstructed homepage wireframe with navigation, headline, actions, and feature image">
    <rect x="1" y="1" width="758" height="418" rx="20" fill="#101a2a" stroke="#456181" />
    <g fill="#273c56" stroke="#6686aa" strokeWidth="1.5">
      <rect x="26" y="24" width="68" height="30" rx="5" />
      {[250,340,430,520,610].map(x=><rect key={x} x={x} y="33" width="62" height="9" rx="4" />)}
      <rect x="32" y="113" width="130" height="9" rx="4" />
      <rect x="32" y="150" width="302" height="22" rx="5" />
      <rect x="32" y="185" width="260" height="22" rx="5" />
      <rect x="32" y="242" width="294" height="9" rx="4" />
      <rect x="32" y="263" width="260" height="9" rx="4" />
      <rect x="32" y="318" width="132" height="40" rx="20" />
      <rect x="178" y="318" width="132" height="40" rx="20" />
      <rect x="390" y="100" width="337" height="276" rx="18" />
      <path d="M412 122L706 354M706 122L412 354" />
    </g>
    <g fill="#c7d9ef" fontFamily="system-ui" fontSize="13"><text x="42" y="44">Brand</text><text x="467" y="242">{jade ? 'Jewelry / product focus' : 'Speaking-practice feature'}</text></g>
  </svg>
}

export function ProjectWorkflow({ projectId }: { projectId: ProjectId }) {
  const info = projects[projectId]
  const [active, setActive] = useState(0)
  const id = useId()
  const reduce = useReducedMotion()
  const activeStep = steps[active]
  const study = caseStudies[projectId]
  const detail = study.stages[active]
  return <section className="project-evidence workflow-evidence" aria-labelledby={`${id}-heading`}>
    <div className="workflow-heading">
      <TextReveal as="p" className="eyebrow">From idea to launch</TextReveal>
      <SplitText tag="h2" id={`${id}-heading`} text="Project process." effect="rise" splitType="words" duration={0.65} delay={50} textAlign="left" />
      <TextReveal as="p">Choose a stage to explore {info.title}.</TextReveal>
    </div>
    <div className="workflow-core">
      <SplitText text={study.core} className="workflow-core-statement" effect="fade" splitType="lines" duration={0.6} delay={70} textAlign="left" />
      <MagicBento className="workflow-core-bento" columns={3} gap={24} radius={22} glowColor="#4ba8ff" textAutoHide={false} style={{gridAutoRows:'minmax(220px, auto)'}} items={[
        ['The challenge',study.challenge],['The design response',study.response],['My contribution',study.contribution]
      ].map(([title,body])=>({id:title,content:<article><SplitText tag="h3" text={title} effect="rise" splitType="words" duration={0.55} delay={40} textAlign="left" /><SplitText text={body} effect="fade" splitType="lines" duration={0.55} delay={60} textAlign="left" /></article>}))} />
    </div>
    <div className="workflow-browser">
      <div className="workflow-folder-wrap">
        <Folder label="Project process" color="#087ce2" paperColor="#e5f0ff" layout="stack" size={1.2}
          draggable={false} zoomOnClick={false} intro={!reduce} tilt={reduce ? 0 : 0.25} bounce={0.2}
          onItemClick={(_, index) => setActive(index)}
          items={steps.map((step,index)=>({content:<div className="workflow-file"><step.icon aria-hidden="true" /><span>0{index+1}</span><strong>{step.title}</strong></div>}))}
          frontContent={<div className="workflow-folder-cover"><strong>Design → launch</strong><span>6 process files</span></div>} />
      </div>
      <RubberSegment id={id} label={`${info.title} project stages`} items={stageItems} active={active} onChange={setActive} />
    </div>
    <div className="workflow-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
      <div className="workflow-panel-copy"><TextReveal as="p" className="eyebrow">Stage 0{active+1} / 06</TextReveal><SplitText tag="h3" text={activeStep.title} effect="rise" splitType="words" duration={0.6} delay={45} textAlign="left" />
        <SplitText text={detail.summary} className="workflow-summary" effect="fade" splitType="lines" duration={0.6} delay={70} textAlign="left" />
        <div className="workflow-story">{detail.sections.map(section=><article key={section.title}><SplitText tag="h4" text={section.title} effect="rise" splitType="words" duration={0.55} delay={40} textAlign="left" /><SplitText text={section.body} effect="fade" splitType="lines" duration={0.55} delay={60} textAlign="left" /></article>)}</div>
        {active===1&&<>
          <div className="workflow-architecture">
            {study.branches.map(branch => <TextReveal as="article" key={branch.title} stagger={0.06}>
              <h4>{branch.title}</h4>
              <ul>{branch.pages.map(page => <li key={page}>{page}</li>)}</ul>
            </TextReveal>)}
          </div>
          <TextReveal as="h4">Core visitor journey</TextReveal>
          <TextReveal as="ol" className="workflow-journey">{info.journey.map(t => <li key={t}>{t}</li>)}</TextReveal>
        </>}
        {active === 2 && <>
          <Wireframe jade={projectId === 'gemsheaven-jade'} />
          <TextReveal className="workflow-mobile-plan" stagger={0.06}>
            <strong>Mobile reading order</strong>
            <ol>
              <li>Brand & compact navigation</li>
              <li>{projectId === 'gemsheaven-jade' ? 'Collection message & Shop action' : 'Learning promise & start/test actions'}</li>
              <li>{projectId === 'gemsheaven-jade' ? 'Featured jade visual' : 'Language choices & practice visual'}</li>
              <li>{projectId === 'gemsheaven-jade' ? 'Product groups & support' : 'Course paths, method & support'}</li>
            </ol>
          </TextReveal>
        </>}
        {(active === 3 || active === 5) && <figure>
          <img className="workflow-preview" src={info.image} alt={`${info.title} homepage supplied by the project designer`} loading="lazy" />
          <TextReveal as="figcaption" className="workflow-note">Supplied homepage reference · {info.title}</TextReveal>
        </figure>}
        {detail.decisions.length > 0 && <div className="workflow-decisions">
          <TextReveal as="h4">Decisions & rationale</TextReveal>
          <div>
            {detail.decisions.map(decision => <TextReveal as="article" key={decision.choice} stagger={0.06}>
              <h5>{decision.choice}</h5>
              <p>{decision.reason}</p>
            </TextReveal>)}
          </div>
        </div>}
        <div className="workflow-output">
          <TextReveal as="h4">Stage outcome & evidence</TextReveal>
          <TextReveal as="p" key={active}>{detail.output}</TextReveal>
        </div>
        {active===5&&<LiveWebsiteButton href={info.url} />}
        <div className="workflow-panel-footer"><span>0{active+1} / 06 · {activeStep.title}</span>{active<5&&<button type="button" onClick={()=>{setActive(active+1)}}>Next: {steps[active+1].title} →</button>}</div>
      </div>
    </div>
  </section>
}
