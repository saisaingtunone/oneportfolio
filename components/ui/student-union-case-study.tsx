import { asset, assetUrl } from '../../src/content'
import { CaseStudyTabs } from './case-study-tabs'
import TumbleDeckShowcase from './tumble-deck-showcase'
import TextReveal from './text-reveal'

const contributions = [
  'Designed posters and announcement graphics for student activities and campaigns',
  'Created promotional materials for social media and event communication',
  'Developed event visual concepts and maintained design consistency',
  'Assisted with content preparation and student engagement materials',
  'Interpreted discussions from Thai to English during meetings',
  'Delivered and communicated meeting outcomes to my team',
  'Supported event planning and coordination with committees',
]

const events = [
  ['Orientation Program', 'Supported event planning and organization, coordinated activities, and created announcement and promotional materials to welcome new students into the college community.'],
  ['Valentine’s Day Event', 'Participated in organizing event activities and experiences while designing promotional and announcement materials to increase student engagement.'],
  ['Student Trip', 'Contributed to organizing trip logistics, activity coordination, and creating supporting visuals and announcements for participants.'],
  ['Great Gatsby Gala Night', 'Supported event preparation and execution, collaborated with committees on event operations, and developed promotional and visual materials to align with the event theme.'],
  ['Pop-Up Events & Student Activities', 'Participated in organizing various student activities and campus pop-up events throughout the academic year, supporting operations, communication, coordination, and creative deliverables.'],
].map(([title, description]) => ({ title, content: <p>{description}</p> }))

const contributionAreas = [
  'Event Organization',
  'Event Coordination',
  'Poster & Announcement Design',
  'Creative Direction',
  'Team Collaboration',
  'Student Engagement',
  'Thai–English Interpretation',
]

const photos = [
  ['orientation-2023', 'Students gather below the Freshmen Orientation 2023 screen as a photographer takes their picture.'],
  ['traditional-thai-attire', 'Students in traditional Thai clothing pose together on outdoor stone steps.'],
  ['great-gatsby-gala', 'Great Gatsby Gala Night participants pose in formalwear against a black and gold backdrop.'],
  ['ric-team-outdoors', 'Six students in black RIC shirts pose by a brick wall and palm trees.'],
  ['campus-group', 'Students pose together with peace signs on an outdoor campus walkway.'],
  ['auditorium-team', 'The team poses on the auditorium stage in black suits and event lanyards.'],
  ['student-union-team', 'Students and staff gather onstage beneath the RIC Student Union logo.'],
  ['ballroom-group', 'A large group of event participants waves to the camera in a ballroom.'],
  ['blue-wall-group', 'Students and staff in RIC shirts strike poses in front of a bright blue wall.'],
  ['rsu-inter-series', 'The event team poses beside the red RSU Inter Series display.'],
  ['freshmen-orientation', 'The Student Union team in matching purple jackets gathers in front of the Freshmen Orientation screen.', asset('student')],
  ['ric-team-campus', 'RIC students wearing event lanyards pose together under campus trees.'],
  ['event-poster', 'A student stands beside a tall Student Union event poster inside the venue.', asset('student-event')],
].map(([name, alt, original]) => ({
  src: original ?? asset('student-union/' + name),
  alt,
  fullSizeSrc: original ?? assetUrl('student-union/full-size/' + name + '.png'),
}))

export function StudentUnionCaseStudy() {
  return (
    <div className="case-study">
      <TextReveal as="dl" className="project-meta case-study-meta">
        <div><dt>Role</dt><dd>Creative Officer</dd></div>
        <div><dt>Duration</dt><dd>1.5 years</dd></div>
        <div><dt>Team</dt><dd>RIC Gen-24</dd></div>
      </TextReveal>

      <section className="project-evidence case-study-section" aria-labelledby="student-union-overview">
        <TextReveal as="h2" id="student-union-overview">Overview</TextReveal>
        <TextReveal as="p">As a <strong>Creative Officer in Student Union GEN 24</strong>, I was responsible for creating visual communication materials and supporting event organization throughout the academic year. I worked closely with committees to design promotional content, manage event announcements, and ensure information was communicated clearly to students.</TextReveal>
        <TextReveal as="p">In addition to my creative role, I also served as a <strong>Thai–English interpreter</strong> during meetings with the <strong>RSU Student Union</strong> and delivered translated information to my team to support collaboration and decision-making.</TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="student-union-contributions">
        <TextReveal as="h2" id="student-union-contributions">My Contributions</TextReveal>
        <TextReveal as="ul" className="case-study-list case-study-list-columns">
          {contributions.map(contribution => <li key={contribution}>{contribution}</li>)}
        </TextReveal>
      </section>

      <CaseStudyTabs id="student-union-events" heading="Events I Contributed To" items={events} />

      <section className="project-evidence case-study-section" aria-labelledby="student-union-areas">
        <TextReveal as="h2" id="student-union-areas">Key Contribution Areas</TextReveal>
        <TextReveal as="ul" className="case-study-list">
          {contributionAreas.map(area => <li key={area}>{area}</li>)}
        </TextReveal>
      </section>

      <section id="event-gallery" className="project-evidence case-study-section" aria-labelledby="event-gallery-heading">
        <TextReveal as="h2" id="event-gallery-heading">Event Gallery</TextReveal>
        <TumbleDeckShowcase
          cards={photos}
          aspect={1.6}
          imageFit="contain"
          cardScale={1.2}
          depth={4}
          height="clamp(340px, 64vw, 760px)"
          background="transparent"
          ariaLabel="Student Union GEN-24 event photos"
        />
      </section>
    </div>
  )
}
