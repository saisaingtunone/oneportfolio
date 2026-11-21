import type { projects } from './content'

export type Artwork = [file: string, caption: string]
export type ArtworkStage = { title: string; body: string; images?: Artwork[]; preview?: string }
type Project = typeof projects[number]

const files: Record<string, Record<number, Artwork[]>> = {
  'ric-gala': { 1: [['gala-print', 'Original Gatsby-themed event tickets'], ['artwork/gala-coupon', 'Original 360 camera and food coupon'], ['artwork/gala-invitation-cover', 'Original Gatsby invitation cover'], ['artwork/gala-invitation', 'Original three-panel invitation with date, venue, and dress code']] },
  'prachum-cheer': {
    0: [['artwork/prachum-cheer-poster', 'Junior Cheer Meeting poster and agenda']],
    1: [['artwork/prachum-cheer-logo', 'Main Prachum Cheer and Junior Cheer Meeting logo'], ['artwork/prachum-cheer-elements', 'Lettering, drum, cymbal, and cheering motifs']],
  },
  'wai-khru-ceremony': { 1: [['artwork/wai-khru-lotus', 'Gold lotus motif used above the ceremony title'], ['artwork/wai-khru-elements', 'Botanical ornaments, garlands, lotus, and borders']] },
  'city-of-love': {
    0: [['artwork/city-love-poster', 'City of Love event poster'], ['artwork/city-love-elements', 'Cupid, hearts, clouds, envelopes, and the skyline used in the event artwork']],
    1: [['artwork/city-love-social', 'City of Love social promotion with the torn-paper treatment']],
  },
  'ric-2025-rayong-trip-1': { 1: [['artwork/rayong-one-poster', 'Throwback to Classics poster'], ['artwork/rayong-one-elements', 'Illustrated beach, palms, and leisure motifs']] },
  'ric-2025-rayong-trip-2': { 1: [['artwork/rayong-two-poster', 'Golden Hour Glam poster'], ['artwork/rayong-two-elements', 'Sunset, palms, shoreline, seabirds, and beach sign used in the poster']] },
  'pop-up-event-posters': { 1: [['artwork/trinity-summer-poster', 'Trinity Learning Club summer classes announcement']], 0: [['artwork/confidence-webinar-social', 'Published promotion for The Power of Confidence']], 2: [['artwork/freshy-model-social', 'Published RSU Freshy Model 2024 campaign artwork']] },
  'logo-collection': {
    0: [['artwork/rsu-global-mark', 'RSU Global globe and airplane mark'], ['artwork/rsu-global-study', 'RSU Global identity and color study']],
    1: [['artwork/san-kyal-green', 'San Kyal jade-green monogram'], ['artwork/san-kyal-monochrome', 'Monochrome monogram variation'], ['artwork/san-kyal-study', 'San Kyal concept and brand application']],
    2: [['artwork/city-love-poster', 'City of Love event artwork with the Valentine’s mark'], ['artwork/city-love-identity', 'City of Love logo concept and application']],
    3: [['artwork/research-factory-mark', 'Dr. Edward’s Research Factory portrait badge']],
  },
}

const additionalIdentities: ArtworkStage[] = [
  {
    title: 'Tokify Languages',
    body: 'The custom lettermark combines the opening letters of Tokify with an audio waveform. The brand package carries the mark across light and dark variations, business cards, and a repeating pattern.',
    images: [
      ['artwork/tokify-wordmark', 'Tokify primary wordmark with white waveform detail'],
      ['artwork/tokify-alternate', 'Tokify alternative wordmark with black waveform detail'],
      ['artwork/tokify-icon', 'Compact Tokify icon'],
      ['artwork/tokify-pattern', 'Tokify repeating brand pattern'],
      ['artwork/tokify-card-front', 'Tokify business card front'],
      ['artwork/tokify-card-back', 'Tokify business card back'],
    ],
  },
  {
    title: 'Echo Dance Studio',
    body: 'A compact graphic mark sits alongside the studio name in the supplied monochrome lockup.',
    images: [['artwork/echo-mark', 'Echo Dance Studio white logo lockup']],
  },
  {
    title: 'Book cover',
    body: 'For From Classroom to RSU Global!, the bold title establishes the reading order. The illustrated students convey collaboration and intercultural learning. Recognizable campus landmarks and the university logo tie the cover to Rangsit University.',
    images: [['artwork/book-cover-study', 'Book cover design and rationale board']],
  },
]

export function getArtworkStages(project: Project): ArtworkStage[] {
  const attachments = files[project.id]
  const stages = project.sections.map(([title, body], index) => ({
    title,
    body,
    images: attachments?.[index],
  }))
  if (project.category === 'logo') return [...stages, ...additionalIdentities]
  return stages.map(stage => ({
    ...stage,
    preview: stage.images?.[0]?.[0] ?? project.image,
    images: stage.images ?? (project.image && (project.id !== 'pop-up-event-posters' || stage === stages[0]) ? [[project.image, project.imageAlt ?? project.title]] : undefined),
  }))
}


export const cityOfLoveCollection: Artwork[] = [
  ['artwork/city-love-registration', 'Registration'],
  ['artwork/city-love-snacks', 'Snacks booth'],
  ['artwork/city-love-music', 'Music booth'],
  ['artwork/city-love-photo', 'Photo booth'],
  ['artwork/city-love-mocktail', 'Mocktail booth'],
  ['artwork/city-love-tarot', 'Tarot booth'],
]
