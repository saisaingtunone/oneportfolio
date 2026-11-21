type VisualSystem = {
  palette: [label: string, color: string][]
  type: string
  elements: string
  application: string
}

export const posterSystems: Record<string, VisualSystem> = {
  'ric-gala': {
    palette: [['Black', '#15110E'], ['Antique gold', '#C8A462'], ['Champagne', '#F1DCAB']],
    type: 'Cinzel Decorative and Donau bring the decorative character of the Gatsby theme to the event title and supporting details.',
    elements: 'Gold ornament and a dark background create an Art Deco frame for the event information.',
    application: 'The same lettering and ornament connect the poster, invitations, coupons, and tickets.',
  },
  'ric-orientation': {
    palette: [['Purple', '#57378E'], ['Pale lavender', '#E7DEF5'], ['White', '#FFFFFF']],
    type: 'Large titles introduce the event. Supporting labels and schedule blocks give new students a clear reading order.',
    elements: 'Purple and white carry through the orientation materials, making the promotional and practical information recognizable as one program.',
    application: 'The identity works across the promotion and the schedule students use during orientation.',
  },
  'prachum-cheer': {
    palette: [['Navy', '#00318C'], ['Warm cream', '#FFFBD9'], ['Amber', '#B87610']],
    type: 'Futura’s geometric shapes give the information blocks a clear structure. Bold display lettering puts energy into the event name.',
    elements: 'A radial burst suggests the noise and movement of a crowd. The star-shaped callout pulls the start time away from the agenda.',
    application: 'The main poster gives the title, start time, and agenda distinct places in the composition.',
  },
  'wai-khru-ceremony': {
    palette: [['Ceremonial gold', '#A37C2A'], ['Ivory', '#FFFAEA'], ['Charcoal', '#545458']],
    type: 'Playfair Display gives the ceremony name a formal character, with smaller supporting text for the event details.',
    elements: 'Lotus imagery, floral garlands, and watercolor edges frame the wording and reflect the ceremonial setting.',
    application: 'The palette and botanical elements repeat across the main poster and supporting artwork.',
  },
  'city-of-love': {
    palette: [['Soft pink', '#FFAEB7'], ['Paper white', '#F4F3ED'], ['Coral pink', '#FF7484'], ['Heart red', '#E30613']],
    type: 'Black Bones brings the warmth of a handwritten note to the theme “Melodies of Love, Memories Forever.”',
    elements: 'The City of Love mark anchors a glowing skyline. Floating hearts, clouds, Cupid, envelopes, and torn-paper edges create a scrapbook feel.',
    application: 'The mark and palette connect the main poster to social graphics and printed event materials.',
  },
  'ric-2025-rayong-trip-1': {
    palette: [['Sky blue', '#90BFE8'], ['Sand', '#E9DFC1'], ['Coastal green', '#567D64']],
    type: 'Anton gives the RIC name and trip number priority, with the destination and details following underneath.',
    elements: 'An illustrated beach, palms, and an airy sky build the Throwback to Classics theme.',
    application: 'The cool color direction makes this trip recognizable alongside the warmer Trip 2 campaign.',
  },
  'ric-2025-rayong-trip-2': {
    palette: [['Sunset orange', '#F59444'], ['Palm green', '#375227'], ['Cream sand', '#FFECBA'], ['Vibrant orange', '#FC7B00']],
    type: 'Mont gives the large trip title clean, rounded shapes that stay legible over the warm gradient. The Golden Hour Glam script adds a relaxed finishing touch.',
    elements: 'A setting sun and its reflection anchor the beach scene. Soft waves, palms, seabirds, and a wooden beach sign frame the composition.',
    application: 'The warm landscape and palette carry through the poster and supporting graphics.',
  },
  'pop-up-event-posters': {
    palette: [['Webinar violet', '#72418A'], ['Summer blue', '#50BADE'], ['Summer yellow', '#FFCF55']],
    type: 'Each poster prioritizes a different message: the webinar topic, the summer-class offer, or the student ambassador’s name.',
    elements: 'A speaker portrait establishes the webinar’s focus. Bright borders and playful illustration give the summer-class promotion a lighter tone.',
    application: 'Each layout groups the information its audience needs, from event details to course times or campaign context.',
  },
}

export const identitySystems: VisualSystem[] = [
  { palette: [['Ocean blue', '#197CCA'], ['Earth green', '#39AB54'], ['University magenta', '#E6007E'], ['Gold', '#C9A66B']], type: 'The stacked RSU Global! name supports the symbol without competing with the globe.', elements: 'The globe, airplane, and university emblem show international learning, movement, and institutional affiliation.', application: 'The mark provides a recognizable identifier for RSU Global’s language and cultural exchange work.' },
  { palette: [['Jade green', '#0D641F'], ['Ink', '#171714'], ['Warm white', '#F5F2E9']], type: 'A flowing S and K monogram contrasts with the spaced uppercase shop name underneath.', elements: 'Connected strokes carry the initials into a single silhouette. Jade green points back to the shop’s jewelry.', application: 'Green and monochrome versions give the mark flexibility across light surfaces and single-color use.' },
  posterSystems['city-of-love'],
  { palette: [['Black', '#111111'], ['White', '#FFFFFF']], type: 'Uppercase lettering follows the rim to name the research group while keeping the portrait central.', elements: 'A circular badge, paired stars, and an illustrated portrait give the identity a distinct silhouette.', application: 'The monochrome artwork keeps the portrait and name readable together.' },
  { palette: [['Tokify blue', '#0C60B5'], ['White', '#FFFFFF'], ['Black', '#000000']], type: 'The full lockup pairs the Tokify name with the “Speak. Save. Swift.” tagline. The icon keeps only the lettermark and sound detail.', elements: 'The waveform points to speaking practice. Repeating the small icon creates the brand pattern.', application: 'White and black waveform variants, the standalone icon, and the pattern give the identity options for digital and printed touchpoints.' },
  { palette: [['Black', '#000000'], ['White', '#FFFFFF']], type: 'The studio name sits next to the icon in a horizontal lockup.', elements: 'The compact symbol and high-contrast treatment make the identity recognizable at smaller sizes.', application: 'The horizontal version pairs the studio name and mark for placements where both are needed.' },
  { palette: [['RSU blue', '#006683'], ['Magenta', '#E6007E'], ['Gold', '#C9A66B']], type: 'Montserrat Bold gives the title priority, while Montserrat Regular carries the supporting text.', elements: 'Students and recognizable campus landmarks illustrate the journey from the classroom to RSU Global.', application: 'The title, illustration, and RSU branding share the cover with a reading order suited to both print and digital viewing.' },
]
