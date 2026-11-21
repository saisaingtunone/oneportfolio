import { useId, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { asset } from '../../src/content'
import MagicBento from './MagicBento'
import RubberSegment from './RubberSegment'
import TumbleDeckShowcase from './tumble-deck-showcase'
import TextReveal from './text-reveal'

const contributions = [
  'Created storyboard sketches to visualize the story flow and camera angles',
  'Assisted in planning scene sequences before filming',
  'Supported the director during shooting process',
  'Helped organize shots and maintain continuity on set',
  'Contributed to translating ideas into visual storytelling',
]

const skills = [
  'Storyboarding',
  'Visual Storytelling',
  'Film Production',
  'Team Collaboration',
  'Communication',
  'On-set Assistance & Creative Planning',
]

const projectDetails = [
  {
    title: 'Project Focus',
    content: <p>The project aimed to develop teamwork and practical filmmaking skills through the creation of a short film, focusing on storytelling, visual planning, and production coordination.</p>,
  },
  {
    title: 'Skills Developed',
    content: (
      <ul className="case-study-list film-skills">
        {skills.map(skill => <li key={skill}>{skill}</li>)}
      </ul>
    ),
  },
  {
    title: 'Outcome',
    content: <p>Our group completed Birds of a Feather. I drew the storyboard to help the team plan the scene order and camera angles, then supported the director on set with camera setups, shot organization, and continuity.</p>,
  },
]

const stills = [
  ['birds-on-set-wide', 'Wide shot of the film crew with a tripod and clapperboard as two performers stand by a drinks machine.'],
  ['birds-on-set-camera', 'A camera operator lines up the drinks machine scene while a crew member holds the clapperboard.'],
  ['birds-on-set-closeup', 'Two performers seen from behind as one reaches toward the drinks machine touchscreen.'],
  ['birds-clapperboard', 'Sai Saing Tun One holds the Birds of a Feather clapperboard up to the camera.'],
  ['birds-film-team', 'The Birds of a Feather cast and crew pose outside under a tree with the clapperboard.'],
].map(([name, alt]) => ({ src: asset(name), alt }))

function FilmProjectDetails() {
  const id = useId()
  const [active, setActive] = useState(0)
  const reduceMotion = Boolean(useReducedMotion())
  const detail = projectDetails[active]

  return (
    <section id="project-details" className="project-evidence case-study-section" aria-labelledby={id + '-heading'}>
      <TextReveal as="h2" id={id + '-heading'}>Project details</TextReveal>
      <RubberSegment
        id={id}
        label="Project details"
        items={projectDetails}
        active={active}
        onChange={setActive}
        className="ux-stage-picker"
      />
      <div className="film-details-panel" role="tabpanel" id={id + '-panel'} aria-labelledby={id + '-tab-' + active} tabIndex={0}>
        <MagicBento
          columns={1}
          rowHeight={0}
          glowColor="#4ba8ff"
          spotlightRadius={320}
          enableBorderGlow={!reduceMotion}
          enableSpotlight={!reduceMotion}
          clickEffect={!reduceMotion}
          disableAnimations={reduceMotion}
          items={[{
            content: (
              <div className="workflow-panel">
                <TextReveal key={active} className="workflow-panel-copy" stagger={0.06}>
                  <h3>{detail.title}</h3>
                  {detail.content}
                </TextReveal>
              </div>
            ),
          }]}
        />
      </div>
    </section>
  )
}

export function ShortFilmCaseStudy() {
  return (
    <div className="case-study">
      <TextReveal as="dl" className="project-meta case-study-meta">
        <div><dt>Role</dt><dd>Storyboard &amp; Production Assistant</dd></div>
        <div><dt>Duration</dt><dd>1 week</dd></div>
        <div><dt>Team</dt><dd>Group Project</dd></div>
      </TextReveal>

      <section className="project-evidence case-study-section">
        <TextReveal as="h2">Overview</TextReveal>
        <TextReveal as="p">Participated in a group short film assignment as part of coursework, contributing to both <strong>pre-production and production stages</strong>. My role focused on visual planning and on-set support to ensure the story was effectively translated into film.</TextReveal>
      </section>

      <section className="project-evidence case-study-section">
        <TextReveal as="h2">My Contributions</TextReveal>
        <TextReveal as="p">I was responsible for <strong>drawing the storyboard during pre-production</strong> and <strong>assisting the director during the shooting process</strong>. I helped translate the script into visual scenes and supported the director in managing camera setups, scene composition, and shot execution.</TextReveal>
        <TextReveal as="ul" className="case-study-list">
          {contributions.map(contribution => <li key={contribution}>{contribution}</li>)}
        </TextReveal>
      </section>

      <FilmProjectDetails />

      <section className="project-evidence case-study-section">
        <TextReveal as="h2">Storyboard</TextReveal>
        <figure className="film-storyboard">
          <img src={asset('birds-storyboard-full')} width={2200} height={1606} loading="lazy" decoding="async" alt="Ten timed storyboard panels for Birds of a Feather, from Jin reading a phone message to memories with Mo and their reunion." />
          <TextReveal as="figcaption">Hand-drawn storyboard for Birds of a Feather.</TextReveal>
        </figure>
      </section>

      <section id="production-gallery" className="project-evidence case-study-section" aria-labelledby="film-gallery-heading">
        <TextReveal as="h2" id="film-gallery-heading">Production Gallery</TextReveal>
        <TumbleDeckShowcase
          cards={stills}
          aspect={1.68}
          imageFit="contain"
          depth={4}
          height="clamp(340px, 64vw, 760px)"
          background="transparent"
          ariaLabel="Birds of a Feather production photos"
        />
      </section>
    </div>
  )
}
