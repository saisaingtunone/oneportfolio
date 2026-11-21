import { asset, assetUrl } from '../../src/content'
import TumbleDeckShowcase from './tumble-deck-showcase'
import TextReveal from './text-reveal'

const contributions = [
  'Facilitated communication between Singaporean organizers and Thai AV staff through Thai–English interpretation',
  'Assisted with coordinating audiovisual operations during events',
  'Supported sound system setup and on-site technical preparation',
  'Helped manage event flow and resolve communication gaps',
  'Coordinated with teams to keep presentations and event activities running smoothly',
]

const skills = [
  'Cross-cultural Communication',
  'Event Operations',
  'AV Coordination',
  'Interpretation',
  'Problem Solving',
  'Team Collaboration',
]

const photos = [
  ['event-signage', 'IT&CMA and CTW APAC event signage showing the dates 23–25 September 2025.'],
  ['awards-group', 'Four event crew members pose in front of the TTG Travel Awards backdrop.'],
  ['crew-lobby', 'Three AV crew members take a photo together in the event venue lobby.'],
  ['backstage-crew', 'Three AV crew members wearing headsets backstage.'],
].map(([name, alt]) => ({
  src: asset('av-crew/' + name),
  alt,
  fullSizeSrc: assetUrl('av-crew/full-size/' + name + '.png'),
}))

export function AvCrewCaseStudy() {
  return (
    <div className="case-study">
      <TextReveal as="dl" className="project-meta case-study-meta">
        <div><dt>Role</dt><dd>AV Crew</dd></div>
        <div><dt>Duration</dt><dd>3 days per assignment</dd></div>
        <div><dt>Team</dt><dd>Event AV Crew</dd></div>
      </TextReveal>

      <section id="av-crew-work-dates" className="project-evidence case-study-section" aria-labelledby="av-crew-work-dates-heading">
        <TextReveal as="h2" id="av-crew-work-dates-heading">Work Dates</TextReveal>
        <TextReveal as="ul" className="case-study-list">
          <li><strong>2025</strong> — <time dateTime="2025-09-23">23</time>–<time dateTime="2025-09-25">25 September 2025</time></li>
          <li><strong>2026</strong> — <time dateTime="2026-09-21">21</time>–<time dateTime="2026-09-23">23 September 2026</time></li>
        </TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="av-crew-overview">
        <TextReveal as="h2" id="av-crew-overview">Overview</TextReveal>
        <TextReveal as="p">I worked as part of the AV crew at IT&amp;CMA and CTW APAC in 2025 and returned in 2026. My work included supporting event operations and helping the Singaporean organizers and Thai audiovisual staff coordinate on site.</TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="av-crew-contributions">
        <TextReveal as="h2" id="av-crew-contributions">My Contributions</TextReveal>
        <TextReveal as="ul" className="case-study-list case-study-list-columns">
          {contributions.map(contribution => <li key={contribution}>{contribution}</li>)}
        </TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="av-crew-skills">
        <TextReveal as="h2" id="av-crew-skills">Key Skills Developed</TextReveal>
        <TextReveal as="ul" className="case-study-list">
          {skills.map(skill => <li key={skill}>{skill}</li>)}
        </TextReveal>
      </section>

      <section id="av-crew-gallery" className="project-evidence case-study-section" aria-labelledby="av-crew-gallery-heading">
        <TextReveal as="h2" id="av-crew-gallery-heading">Event Gallery</TextReveal>
        <TumbleDeckShowcase
          cards={photos}
          aspect={1.6}
          imageFit="contain"
          cardScale={1.2}
          depth={3}
          height="clamp(340px, 64vw, 760px)"
          background="transparent"
          ariaLabel="AV Crew event photos"
        />
      </section>
    </div>
  )
}
