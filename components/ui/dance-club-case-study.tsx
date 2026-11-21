import { asset, assetUrl } from '../../src/content'
import { CaseStudyTabs } from './case-study-tabs'
import TumbleDeckShowcase from './tumble-deck-showcase'
import TextReveal from './text-reveal'

const skills = [
  'Financial Coordination',
  'Performance & Stage Presence',
  'Event Execution',
  'Teamwork',
  'Time Management',
  'Communication',
]

const events = [
  ['Orientation', 'Performed to welcome and engage new students during orientation activities.'],
  ['Valentine’s Day Event', 'Participated in performance showcases and supported event activities.'],
  ['Open House', 'Represented the club through performances for prospective students and visitors.'],
  ['Job Fair', 'Joined event performances to create engagement and enhance the event atmosphere.'],
  ['RSUnival 2025 – Songkran Water Festival (Winner)', 'Performed as part of the dance team and contributed to event activities. Our team won prizes for the performance.'],
].map(([title, description]) => ({ title, content: <p>{description}</p> }))

const photos = [
  ['carnival-parade-award', 'First-place Carnival Parade 2026 award sign showing the 10,000 baht prize.'],
  ['carnival-parade', 'RIC parade participants carry the college sign and a purple flag.'],
  ['dance-crew', 'RIC Dance Crew poses on the steps in black performance outfits.'],
  ['valentines-day', 'The dancers pose in red and white in front of the City of Love stage.'],
  ['auditorium-group', 'Dancers and event guests pose together onstage in a full auditorium.'],
  ['stage-group', 'Dancers and event participants pose together on a wooden stage.'],
  ['songkran-celebration', 'RIC participants celebrate outdoors with colored powder.'],
].map(([name, alt]) => ({
  src: asset('dance-club/' + name),
  alt,
  fullSizeSrc: assetUrl('dance-club/full-size/' + name + '.png'),
}))

export function DanceClubCaseStudy() {
  return (
    <div className="case-study">
      <TextReveal as="dl" className="project-meta case-study-meta">
        <div><dt>Role</dt><dd>Finance Team Member &amp; Dancer</dd></div>
        <div><dt>Duration</dt><dd>3 years</dd></div>
        <div><dt>Team</dt><dd>RIC Dance Crew</dd></div>
      </TextReveal>

      <section className="project-evidence case-study-section" aria-labelledby="dance-club-overview">
        <TextReveal as="h2" id="dance-club-overview">Overview</TextReveal>
        <TextReveal as="p">As a member of the <strong>RIC Dance Club</strong>, I contributed to both <strong>administrative and performance</strong> activities by supporting financial coordination and participating in club performances across university events. This experience allowed me to develop <strong>teamwork, responsibility, and event execution</strong> skills while representing the club through performances.</TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="dance-club-contributions">
        <TextReveal as="h2" id="dance-club-contributions">My Contributions</TextReveal>
        <TextReveal as="ul" className="case-study-list case-study-list-columns">
          <li>Managed and supported club <strong>financial activities and budget coordination</strong></li>
          <li>Assisted with <strong>planning and preparation</strong> for performances and events</li>
          <li>Participated as a <strong>dance performer</strong> in university activities and campaigns</li>
          <li>Collaborated with <strong>team members</strong> during rehearsals and event execution</li>
          <li>Supported backstage <strong>coordination</strong> and event operations</li>
        </TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="dance-club-skills">
        <TextReveal as="h2" id="dance-club-skills">Key Skills Developed</TextReveal>
        <TextReveal as="ul" className="case-study-list">
          {skills.map(skill => <li key={skill}>{skill}</li>)}
        </TextReveal>
      </section>

      <CaseStudyTabs id="dance-club-events" heading="Events I Contributed To" items={events} />

      <section id="dance-gallery" className="project-evidence case-study-section" aria-labelledby="dance-gallery-heading">
        <TextReveal as="h2" id="dance-gallery-heading">Event Gallery</TextReveal>
        <TumbleDeckShowcase
          cards={photos}
          aspect={1.9}
          imageFit="contain"
          cardScale={1.2}
          depth={4}
          height="clamp(300px, 60vw, 720px)"
          background="transparent"
          ariaLabel="RIC Dance Crew event photos"
        />
      </section>
    </div>
  )
}
