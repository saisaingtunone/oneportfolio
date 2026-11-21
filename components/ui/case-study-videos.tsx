import type { ProjectVideo } from '../../src/content'
import TextReveal from './text-reveal'

export function CaseStudyVideos({ id, heading, videos }: { id: string; heading: string; videos?: readonly ProjectVideo[] }) {
  if (!videos?.length) return null

  return (
    <section id={id} className="project-evidence case-study-section" aria-labelledby={id + '-heading'}>
      <TextReveal as="h2" id={id + '-heading'}>{heading}</TextReveal>
      {videos.map(({ title, src, poster, width, height }) => (
        <video
          key={src}
          className="case-study-video"
          aria-label={title}
          controls
          playsInline
          preload="metadata"
          poster={poster}
          width={width}
          height={height}
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <source src={src} type="video/mp4" />
          <a href={src}>Watch {title}</a>
        </video>
      ))}
    </section>
  )
}
