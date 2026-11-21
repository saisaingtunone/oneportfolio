import type { ProjectVideo } from '../../src/content'
import { CaseStudyTabs } from './case-study-tabs'
import { CaseStudyVideos } from './case-study-videos'
import TextReveal from './text-reveal'

const details = [
  {
    title: 'Project Focus',
    content: <p>The main focus was improving students’ English communication skills through peer-to-peer learning, making English practice more accessible, comfortable, and engaging.</p>,
  },
  {
    title: 'Outcome',
    content: <p>Successfully contributed to improving student engagement and confidence in English communication within the RIC Language Center peer learning program.</p>,
  },
]

const skills = [
  'Communication',
  'Teaching',
  'Leadership',
  'Team Coordination',
  'Mentoring',
  'Public Speaking',
  'English Language Support',
  'Responsibility',
]

export function RicLanguageCenterCaseStudy({ videos }: { videos?: readonly ProjectVideo[] }) {
  return (
    <div className="case-study">
      <TextReveal as="dl" className="project-meta case-study-meta">
        <div><dt>Role</dt><dd>Mentor &amp; Leader</dd></div>
        <div><dt>Duration</dt><dd>2 years</dd></div>
        <div><dt>Team</dt><dd>Group Work</dd></div>
      </TextReveal>

      <section className="project-evidence case-study-section" aria-labelledby="language-center-overview">
        <TextReveal as="h2" id="language-center-overview">Overview</TextReveal>
        <TextReveal as="p">Worked as a <strong>volunteer Peer Mentor</strong> at the RIC Language Center under Rangsit International College, Rangsit University. The role focused on supporting Thai students <strong>in improving their English communication skills</strong> through informal teaching sessions and peer-based learning activities.</TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="language-center-role">
        <TextReveal as="h2" id="language-center-role">My Role – Peer Mentor &amp; Peer Mentor Leader</TextReveal>
        <TextReveal as="p">Provided English language support and guided <strong>Thai students</strong> through interactive learning activities. As a Peer Mentor Leader, I also helped <strong>coordinate sessions</strong> and support other peer mentors in <strong>delivering lessons effectively</strong>.</TextReveal>
        <TextReveal as="ul" className="case-study-list">
          <li>Assisted Thai students in practicing <strong>English speaking and communication</strong></li>
          <li>Led and supported peer learning sessions</li>
          <li>Explained basic grammar, vocabulary, and conversation skills in an <strong>easy-to-understand way</strong></li>
          <li>Helped create a <strong>friendly and supportive</strong> learning environment</li>
          <li><strong>Coordinated</strong> with other peer mentors to organize teaching sessions</li>
          <li>Encouraged student participation and <strong>confidence in using English</strong></li>
        </TextReveal>
      </section>

      <CaseStudyTabs id="language-center-details" heading="Project details" items={details} />

      <section className="project-evidence case-study-section" aria-labelledby="language-center-skills">
        <TextReveal as="h2" id="language-center-skills">Skills Developed</TextReveal>
        <TextReveal as="ul" className="case-study-list case-study-list-columns">
          {skills.map(skill => <li key={skill}>{skill}</li>)}
        </TextReveal>
      </section>

      <CaseStudyVideos id="language-center-videos" heading="Videos" videos={videos} />
    </div>
  )
}
