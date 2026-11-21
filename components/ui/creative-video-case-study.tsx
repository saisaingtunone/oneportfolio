import type { ProjectVideo } from '../../src/content'
import { CaseStudyTabs } from './case-study-tabs'
import { CaseStudyVideos } from './case-study-videos'
import TextReveal from './text-reveal'

const details = [
  {
    title: 'Project Challenge',
    content: <p>The main challenge was creating a <strong>meaningful and visually engaging story</strong> while staying within the <strong>1-minute time limit</strong>. This required efficient planning, concise storytelling, and strong execution during production and editing.</p>,
  },
  {
    title: 'Outcome',
    content: <p>The project achieved <strong>Winner – Creative Video</strong> Category at TNSC 2025, recognizing creativity, storytelling, and execution quality.</p>,
  },
]

const skills = [
  'Creative Thinking',
  'Storytelling',
  'Video Production',
  'Video Editing',
  'Concept Development',
  'Visual Communication',
  'Team Collaboration',
  'Time Management',
]

export function CreativeVideoCaseStudy({ videos }: { videos?: readonly ProjectVideo[] }) {
  return (
    <div className="case-study">
      <TextReveal as="dl" className="project-meta case-study-meta">
        <div><dt>Role</dt><dd>Creative Lead</dd></div>
        <div><dt>Duration</dt><dd>2 Days</dd></div>
        <div><dt>Team</dt><dd>Duo Project</dd></div>
      </TextReveal>

      <section className="project-evidence case-study-section" aria-labelledby="creative-video-overview">
        <TextReveal as="h2" id="creative-video-overview">Overview</TextReveal>
        <TextReveal as="p">Created and produced the video submission for the <strong>Creative Video Category in Thailand Negotiation &amp; Sales Competition (TNSC) 2025</strong>. The project required delivering a complete and engaging message within a <strong>strict 1-minute duration</strong>. I focused on developing the <strong>visual storytelling and producing</strong> the final video while my teammate participated as the model.</TextReveal>
      </section>

      <section className="project-evidence case-study-section" aria-labelledby="creative-video-role">
        <TextReveal as="h2" id="creative-video-role">My Role – Creative Video Producer</TextReveal>
        <TextReveal as="ul" className="case-study-list case-study-list-columns">
          <li>Developed the creative <strong>concept and video direction</strong></li>
          <li>Created and planned the <strong>storyline</strong></li>
          <li>Organized scene <strong>flow and shooting sequence</strong></li>
          <li>Managed and supported the video shooting process</li>
          <li><strong>Edited and finalized</strong> the video content</li>
          <li>Ensured the story remained <strong>clear, engaging, and effective within 60 seconds</strong></li>
        </TextReveal>
      </section>

      <CaseStudyTabs id="creative-video-details" heading="Project details" items={details} />

      <section className="project-evidence case-study-section" aria-labelledby="creative-video-skills">
        <TextReveal as="h2" id="creative-video-skills">Skills Developed</TextReveal>
        <TextReveal as="ul" className="case-study-list case-study-list-columns">
          {skills.map(skill => <li key={skill}>{skill}</li>)}
        </TextReveal>
      </section>

      <CaseStudyVideos id="competition-video" heading="Competition Video" videos={videos} />
    </div>
  )
}
