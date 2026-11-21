const basePath = import.meta.env?.BASE_URL ?? '/'

export const siteUrl = (path = '') => basePath + path
export const assetUrl = (filename: string) => siteUrl('assets/' + filename)
export const asset = (name: string) => assetUrl(name + '.webp')
export const projectUrl = (id: string) => siteUrl('work/' + id + '/')

export const profile = {
  name: 'Sai Saing Tun One',
  email: 'saisaingtunone2002@gmail.com',
  lineId: 'saitunone792002',
  cv: 'https://drive.google.com/drive/folders/1JoPAxiiquD10E10UfynAQxzwPYK9q4Rh?usp=sharing',
  socials: [
    ['LinkedIn', 'https://www.linkedin.com/in/sai-saing-tun-one-49156a291/'],
    ['GitHub', 'https://github.com/saisaingtunone'],
    ['TikTok', 'https://www.tiktok.com/@saisaingtunone'],
  ],
}

export const categories = {
  ui: { label: 'UI/UX', cover: 'folder-ui', description: 'Responsive websites, user flows, and prototypes.' },
  poster: { label: 'Graphics & Posters', cover: 'folder-poster', description: 'Event identities, promotional graphics, and print.' },
  logo: { label: 'Logo', cover: 'folder-logo', description: 'Visual identities for institutions, shops, and events.' },
  work: { label: 'Volunteer & Work', cover: 'folder-work', description: 'Creative, technical, and cross-cultural collaboration.' },
}

export type Category = keyof typeof categories

export type ProjectVideo = { title: string; src: string; poster?: string; width: number; height: number }

type Project = {
  id: string
  title: string
  category: Category
  image?: string
  detailImage?: string
  detailImageAlt?: string
  detailSubtitle?: string
  imageAlt?: string
  summary: string
  role?: string
  context?: string
  sections: [string, string][]
  gallery?: [string, string][]
  videos?: ProjectVideo[]
  prototypes?: [string, string][]
  source?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'tokify-languages', title: 'Tokify Languages', category: 'ui', image: 'tokify',
    imageAlt: 'Tokify Languages homepage with blue hero, language choices, and a speaking-practice card',
    summary: 'A live language-learning website with clear course paths, speaking practice, and a welcoming learner experience.',
    role: 'UI/UX Designer & AI-assisted Web Developer', context: 'Live collaborative project · Vibe coding',
    liveUrl: 'https://tokifylanguages.com/index.html#languageClasses',
    sections: [
      ['Project overview', 'Tokify Languages helps learners find a language path and understand how to get started. The public site introduces the learning experience, shows available and upcoming languages, and guides visitors toward classes and account registration.'],
      ['My contribution', 'I co-designed and developed the website with Khine Win Yee Soe. We created the UI/UX ourselves and used vibe coding to support implementation, translating our design decisions into a working website.'],
      ['Interface and learning flow', 'The interface connects language discovery, placement-test entry, class selection, and sign-up. Language cards make the available Thai classes and upcoming language tracks easy to distinguish. English and Burmese interface controls support the audience.'],
      ['From design to a live project', 'This project brings interface design and AI-assisted development together in a published website. The live link opens the current experience, and the process files below explain the design direction and implementation flow.'],
    ],
    gallery: [['tokify', 'Tokify Languages homepage supplied by the project designer']],
  },
  {
    id: 'gemsheaven-jade', title: 'GemsHeaven Jade', category: 'ui', image: 'gemsheaven',
    imageAlt: 'GemsHeaven Jade homepage with Chinese navigation and jade jewelry hero',
    summary: 'A live jade jewelry storefront that combines a refined brand presentation with product discovery and a clear shopping journey.',
    role: 'UI/UX Designer & AI-assisted Web Developer', context: 'Live collaborative project · Vibe coding',
    liveUrl: 'https://gemsheavenjade.com/',
    sections: [
      ['Project overview', 'GemsHeaven Jade is a live storefront for Burma jadeite jewelry. The website presents the brand story, introduces the collection, and connects customers with product information and shopping actions.'],
      ['My contribution', 'I co-designed and developed the website with Khine Win Yee Soe. We designed the UI/UX ourselves and used vibe coding to help implement the website, combining visual design with AI-assisted development.'],
      ['Brand and shopping experience', 'The layout gives jewelry photography room to stand out and organizes products into featured pieces, new arrivals, and best sellers. The public navigation connects the shop, brand story, contact information, FAQ, and cart.'],
      ['From design to a live project', 'The published storefront demonstrates how our interface and brand decisions work together in a real website. The live link lets visitors explore the current version, and the process files below explain the storefront’s design and implementation flow.'],
    ],
    gallery: [['gemsheaven', 'GemsHeaven Jade homepage supplied by the project designer']],
  },

  {
    id: 'anaya-hotel', title: 'ANAYA Hotel', category: 'ui', image: 'hotel',
    imageAlt: 'ANAYA Hotel desktop and mobile website mockups',
    summary: 'A responsive hotel website that makes it easier to compare rooms, browse packages, and book a stay.',
    role: 'UI/UX Designer', context: 'Group project · 3 weeks',
    sections: [
      ['The challenge', 'Guests needed a faster way to find suitable rooms and complete a booking. The hotel needed a digital presence that reflected its luxury positioning.'],
      ['Process', 'We compared hotel sitemaps to see how guests find rooms and offers. We then mapped the booking journey, built desktop and mobile wireframes, and translated them into a shared design system.'],
      ['Design outcome', 'The Figma prototype spans 36 responsive screens covering rooms, packages, promotions, and booking.'],
    ],
    prototypes: [
      ['Desktop prototype', 'https://www.figma.com/proto/Dl6Z4XSr5MDCWIKaOi1Unp/dance?node-id=198-29833&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=198%3A29725'],
      ['Mobile prototype', 'https://www.figma.com/proto/Dl6Z4XSr5MDCWIKaOi1Unp/dance?node-id=198-50672&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=198%3A50672'],
    ],
    source: '3139-8966',
  },
  {
    id: 'echo-dance-studio', title: 'Echo Dance Studio', category: 'ui', image: 'echo',
    imageAlt: 'Red and black Echo Dance Studio mobile interfaces',
    summary: 'A responsive website for discovering dance styles, instructors, workshops, and how to enroll.',
    role: 'UI/UX Designer', context: 'Solo project · 1 week',
    sections: [
      ['The challenge', 'Echo needed an energetic visual identity online and a clear way for visitors to explore classes, instructors, and workshops.'],
      ['Process', 'I moved from research and wireframes into high-fidelity screens and prototyping. The typography combines Poppins for headings and interface elements with Fustat for body copy.'],
      ['Design outcome', 'Desktop and mobile prototypes show how visitors discover classes and workshops and explore the studio.'],
    ],
    gallery: [['echo-wireframe', 'Early layouts and visual direction'], ['echo-design', 'Desktop and mobile designs in Figma']],
    prototypes: [
      ['Desktop prototype', 'https://www.figma.com/proto/Dl6Z4XSr5MDCWIKaOi1Unp/hotel_dance?node-id=1-4814&scaling=scale-down&content-scaling=fixed&page-id=1%3A2609'],
      ['Mobile prototype', 'https://www.figma.com/proto/Dl6Z4XSr5MDCWIKaOi1Unp/hotel_dance?node-id=1-4457&scaling=scale-down&content-scaling=fixed&page-id=1%3A2609'],
    ],
    source: '3139-9486',
  },
  {
    id: 'trinity-language-center', title: 'Trinity Learning Club', category: 'ui', image: 'trinity-cover',
    imageAlt: 'Trinity Learning Club website displayed on desktop, tablet and phone',
    summary: 'A responsive website for Trinity Learning Club that presents its courses to prospective learners in Myanmar.',
    role: 'UI/UX Designer', context: 'Solo project · 2 weeks',
    sections: [
      ['The brief', 'Give prospective students a place to learn about the center and explore its language courses.'],
      ['Design focus', 'I organized the website around the center and its learning offerings so visitors can understand what is available before deciding which course to explore.'],
    ],
    liveUrl: 'https://trinitylearningclubmuse.vercel.app/',
  },
  {
    id: 'personal-portfolios', title: 'Personal Portfolios', category: 'ui', image: 'personal-portfolios',
    detailImage: 'ux/portfolio-monitor',
    imageAlt: 'Khine Win Yee Soe’s black and orange portfolio displayed on a desktop monitor',
    summary: 'A portfolio website designed to showcase Khine Win Yee Soe’s professional experience and work.',
    sections: [
      ['The brief', 'Give Khine Win Yee Soe a dedicated website where visitors can understand her professional background, explore examples of her work, and get in touch.'],
      ['Visual direction', 'The cover uses a dark canvas, orange accents, and a prominent introduction. The project grid brings several pieces of work into view at once.'],
    ],
    gallery: [['personal-portfolios-detail', 'Closer view of the portfolio introduction and project grid']],
    source: '3139-10106',
  },
  {
    id: 'sprouting-tech-dashboard', title: 'Sprouting Tech Academy Dashboard', category: 'ui', image: 'dashboard-cover',
    imageAlt: 'Sprouting Tech Academy dashboard with course management and promotional banner screens',
    summary: 'UI/UX refinements for the Sprouting Tech Academy dashboard.',
    role: 'UI/UX Design Intern', context: 'Sprouting Tech',
    sections: [
      ['My contribution', 'I worked on the profile, settings, and navigation for the Sprouting Tech Academy dashboard. My focus was the day-to-day interface people use to move through the product and manage their account.'],
      ['Refinement and handoff', 'I tightened alignment and spacing across the screens and refined the navigation so the layouts would feel consistent. I handed the designs back to the team during development.'],
    ],
    source: '3139-10055',
  },
  {
    id: 'restaurant-website', title: 'Restaurant Website', category: 'ui', image: 'restaurant-cover',
    detailImage: 'ux/restaurant-hero',
    imageAlt: 'Bon Appétit website with restaurant home, menu, and reservation screens',
    summary: 'A restaurant website concept covering menus, reservations, and delivery.',
    role: 'UI/UX Design Intern', context: 'Sprouting Tech group project',
    sections: [
      ['The brief', 'Design a website for a European restaurant where guests can browse the menu, reserve a table, or order delivery. Those three actions shaped the site structure.'],
      ['Visual design and prototype', 'Our team used a soft palette and a gallery to convey the restaurant atmosphere. We prototyped transitions in Figma with Smart Animate to show how visitors move through the site.'],
    ],
    prototypes: [
      ['Desktop prototype', 'https://www.figma.com/proto/Ca8b6x9BYueqN0CqvrXTlP/REstaurant-Midori_copy?node-id=40-11797&scaling=min-zoom&content-scaling=fixed&page-id=40%3A6746&starting-point-node-id=40%3A10999'],
      ['Mobile prototype', 'https://www.figma.com/proto/Ca8b6x9BYueqN0CqvrXTlP/REstaurant-Midori_copy?node-id=40-11880&scaling=min-zoom&content-scaling=fixed&page-id=40%3A6746&starting-point-node-id=40%3A11880'],
    ],
    source: '3139-9884',
  },
  {
    id: 'eleva-clinic', title: 'Eleva Clinic Redesign', category: 'ui', image: 'eleva-cover',
    detailImage: 'ux/eleva-hero',
    imageAlt: 'Eleva Clinic administration dashboard alongside the patient-facing website and mobile homepage',
    summary: 'A clinic website redesign focused on treatment discovery and online appointments.',
    role: 'UI/UX Design Intern', context: 'Sprouting Tech group project',
    sections: [
      ['The brief', 'Make it easier for prospective patients to explore the clinic, understand its treatment offerings, and request an appointment online.'],
      ['Information and appointments', 'Our redesign brought treatments, promotions, doctor profiles, and frequently asked questions into the same experience. Visitors could use those pages to learn about the clinic before going to the appointment flow.'],
      ['Iteration', 'We refined the screens and reusable components through feedback rounds.'],
    ],
    prototypes: [
      ['Desktop prototype', 'https://www.figma.com/proto/Dl6Z4XSr5MDCWIKaOi1Unp/hotel_dance?node-id=187-8348&scaling=min-zoom&content-scaling=fixed&page-id=187%3A4802&starting-point-node-id=187%3A8395'],
      ['Mobile prototype', 'https://www.figma.com/proto/Dl6Z4XSr5MDCWIKaOi1Unp/hotel_dance?node-id=187-8508&scaling=min-zoom&content-scaling=fixed&page-id=187%3A4802&starting-point-node-id=187%3A8102'],
    ],
    source: '3139-9717',
  },
  {
    id: 'som-som', title: 'Som Som Project', category: 'ui', image: 'som-som',
    imageAlt: 'Som Som mobile screens, orange logo, and interface icons',
    summary: 'A mobile interface and visual identity for a karaoke app.',
    sections: [
      ['Product concept', 'Som Som brings karaoke browsing and singing into a mobile interface. The portfolio shows the screen designs alongside the identity elements that connect them.'],
      ['Visual system', 'The orange-and-cream identity carries through the wordmark, headphones motif, icons, and controls. The mobile mockups show how the same visual language works on dark screens.'],
    ],
    gallery: [['som-som-identity', 'Som Som wordmark, component icons, and mobile screen details']],
    source: '3139-9579',
  },
  {
    id: 'ric-gala', title: 'RIC Gala 2024', category: 'poster', image: 'gala',
    imageAlt: 'The Great Gatsby gala poster in gold and black',
    summary: 'A gold-on-black event identity inspired by The Great Gatsby, across posters, invitations, and tickets.',
    role: 'Event Branding, Visual Identity, and Print Design', context: 'October 2024 · 2 weeks',
    sections: [
      ['Visual direction', 'The Great Gatsby theme shaped the gold-on-black palette and decorative typography. I used Cinzel Decorative and Donau to carry that identity across event materials.'],
      ['Deliverables', 'The suite included event graphics, invitations, coupons, and tickets.'],
    ],
    gallery: [['gala-print', 'Gatsby-themed tickets']],
    source: '3139-9246',
  },
  {
    id: 'ric-orientation', title: 'RIC Orientation', category: 'poster', image: 'orientation',
    imageAlt: 'Purple and white poster for freshmen orientation',
    summary: 'A visual identity spanning promotional posters, schedules, and materials for new students.',
    sections: [
      ['The brief', 'Create a recognizable identity for freshmen orientation and make practical event information easy for new students to scan.'],
      ['Visual direction', 'The purple-and-white graphic system tied together schedules, promotional posters, and supporting materials so they read as one event.'],
    ],
    source: '3139-10923',
  },
  {
    id: 'prachum-cheer', title: 'Prachum Cheer', category: 'poster', image: 'artwork/prachum-cheer-poster',
    imageAlt: 'Cream, blue, and orange Prachum Cheer event poster',
    summary: 'An event poster promoting the Junior Cheer Meeting.',
    sections: [
      ['The brief', 'Promote the Junior Cheer Meeting and communicate when activities begin. The poster needed to carry the energy of the event while keeping the schedule easy to read.'],
      ['Visual direction', 'A radial burst evokes sound waves and crowd energy. The artwork board pairs Futura with a navy, warm cream, and orange palette. A star-shaped callout highlights the start time, and the agenda is grouped into short blocks for quick reading.'],
    ],
    source: '3139-10951',
  },
  {
    id: 'wai-khru-ceremony', title: 'Wai Khru Ceremony', category: 'poster', image: 'wai-khru',
    imageAlt: 'Wai Khru Ceremony poster with gold lotus motifs, floral garlands, and event details',
    summary: 'Ceremony poster with a cream-and-gold palette and decorative botanical elements.',
    sections: [
      ['Visual direction', 'I paired Thai-inspired floral motifs and soft watercolor elements with Playfair Display. The gold, cream, and charcoal palette kept the July 2024 ceremony poster formal and legible.'],
      ['Poster system', 'Muted gold and ivory establish a ceremonial tone, with charcoal gray for contrast. Lotus flowers and garlands carry the visual identity across the poster and supporting graphics.'],
    ],
    source: '3139-10985',
  },
  {
    id: 'city-of-love', title: 'City of Love Event', category: 'poster', image: 'artwork/city-love-poster',
    imageAlt: 'City of Love Valentine event poster with clouds, hearts, and a pink city skyline',
    summary: 'A Valentine’s event identity for Rangsit University International College, built around a glowing pink skyline, the City of Love mark, and coordinated print materials.',
    role: 'Event identity and poster design', context: 'RIC · 10 days',
    sections: [
      ['Visual concept', 'A pink palette, playful lettering, and illustrated hearts set the tone for the City of Love event. Repeating those elements makes the individual pieces easy to recognize.'],
      ['Deliverables', 'The case study shows the main poster, color palette and typography, social promotion, and a collection of printed event materials.'],
    ],
    source: '3139-9192',
  },
  {
    id: 'ric-2025-rayong-trip-2', title: 'RIC 2025 Rayong Trip 2', category: 'poster', image: 'artwork/rayong-two-poster',
    imageAlt: 'Golden Hour Glam poster for RIC Rayong Trip 2',
    summary: 'Promotional graphics for the second 2025 RIC Rayong trip.',
    sections: [
      ['The brief', 'Create promotional artwork for the second RIC Rayong trip that makes the destination and trip number immediately recognizable.'],
      ['Visual direction', 'Sunset orange and palm green set the Golden Hour Glam direction. The oversized trip title stays legible over the illustrated coastline, while the tropical artwork and palette carry through the supporting graphics.'],
    ],
    source: '3139-9121',
  },
  {
    id: 'ric-2025-rayong-trip-1', title: 'RIC 2025 Rayong Trip 1', category: 'poster', image: 'artwork/rayong-one-poster',
    imageAlt: 'Throwback to Classics poster for RIC Rayong Trip 1',
    summary: 'Promotional graphics for the first 2025 RIC Rayong trip.',
    sections: [
      ['The brief', 'Promote the first RIC Rayong trip with an identity that calls out the location and distinguishes it from the second trip.'],
      ['Visual direction', 'The Throwback to Classics theme informed the beach illustration, retro lettering, and sky-blue palette. Large RIC lettering and the trip number establish the reading order, followed by the destination and event details. The cool palette also distinguishes this trip from the warm Golden Hour Glam artwork.'],
    ],
    source: '3139-9157',
  },
  {
    id: 'pop-up-event-posters', title: 'Pop-Up Event Posters', category: 'poster', image: 'webinar-poster',
    imageAlt: 'The Power of Confidence webinar poster featuring Thet San Andersen',
    summary: 'Promotional graphics for campus events, classes, and a student campaign.',
    sections: [
      ['Miss Universe Myanmar 2024', 'I designed a promotional poster for RIC’s webinar collaboration with Thet San Andersen. The artwork highlights the topic of confidence and self-appreciation and presents the event details alongside the speaker.'],
      ['Trinity Learning Club Summer Class', 'The summer-class promotion uses a playful headline, bright color, and decorative borders to introduce the program. The timetable and course details sit together in the main information block so families can find them quickly.'],
      ['Rangsit University Freshy Model 2024', 'A campaign poster introducing RIC ambassador Evelina Svensson.'],
    ],
    source: '3139-8821',
  },
  {
    id: 'logo-collection', title: 'Logo Collection', category: 'logo', image: 'folder-logo',
    imageAlt: 'Figma portfolio collage of original logo work',
    summary: 'A collection of original logos and cover design, from university and event identities to retail and language learning.',
    sections: [
      ['RSU Global!', 'The RSU Global! identity represents global communication, cultural exchange, and language learning. The globe signals worldwide connection, the airplane suggests learning beyond borders, and the Rangsit University emblem establishes the center’s affiliation.'],
      ['San Kyal Jewelry Shop', 'The connected S and K form a single monogram from the San Kyal initials. Flowing strokes suggest craftsmanship, while the jade-green palette links the identity to the shop’s jewelry. A monochrome version shows how the mark holds up without color.'],
      ['Valentine’s Day event', 'Handwritten lettering, hearts, and cupid imagery evoke a warm, playful celebration for students.'],
      ['Personal logo', 'Dr. Edward’s Research Factory uses a circular badge to suggest credibility and academic professionalism. A monochrome portrait anchors the mark, with the name set around the edge and stars framing the illustration.'],
    ],
    source: '3139-8875',
  },
  {
    id: 'ric-student-union', title: 'Student Union GEN-24', category: 'work', image: 'student',
    detailImage: 'student-union/freshmen-orientation',
    imageAlt: 'RIC Student Union team in purple jackets in front of the Freshmen Orientation screen',
    detailSubtitle: 'Rangsit International College',
    summary: 'Event graphics, campaign materials, and Thai–English communication for RIC Student Union GEN-24.',
    sections: [],
    source: '3139-10229',
  },
  {
    id: 'av-crew', title: 'AV Crew 2025 & 2026', category: 'work', image: 'av',
    imageAlt: 'Sai Saing Tun One at the event venue',
    detailSubtitle: 'IT&CMA and CTW APAC',
    summary: 'On-site audiovisual coordination and Thai–English interpretation at IT&CMA and CTW APAC in 2025 and 2026.',
    sections: [],
    source: '3139-10806',
  },
  {
    id: 'creative-video-winner', title: 'Winner - Creative Video', category: 'work', image: 'creative-video-award',
    detailImage: 'creative-video-award-full',
    imageAlt: 'TNSC 2025 Creative Video award announcement featuring Khine Win Yee Soe',
    detailSubtitle: 'Thailand Negotiation & Sales Competition (TNSC) 2025',
    summary: 'Creative video production for an award-winning entry at the Thailand Negotiation & Sales Competition 2025.',
    sections: [],
    videos: [{
      title: 'TNSC 2025 Creative Video competition entry',
      src: assetUrl('tnsc-2025-competition-video.mp4'),
      poster: asset('tnsc-2025-video-poster'),
      width: 1920,
      height: 1080,
    }],
    source: '3139-10862',
  },
  {
    id: 'ric-language-center', title: 'RIC Language Center', category: 'work', image: 'language-center-group',
    detailImage: 'language-center-group-full',
    imageAlt: 'RIC Language Center peer mentors and students posing together in a classroom',
    detailSubtitle: 'Volunteer – Peer Mentor & Peer Mentor Leader',
    summary: 'Peer mentoring and team leadership at the RIC Language Center.',
    sections: [],
    source: '3139-10374',
  },
  {
    id: 'finance-team-dance', title: 'Finance Team & Dance Member', category: 'work', image: 'ric-dance-club',
    detailImage: 'ric-dance-event-banner-hd',
    detailImageAlt: 'Dancers and event guests posing together onstage in a full auditorium',
    imageAlt: 'RIC Dance Club members together in performance outfits',
    detailSubtitle: 'RIC Dance Club, Rangsit International College',
    summary: 'Budget coordination and performances with the RIC Dance Club.',
    sections: [],
    source: '3139-10306',
  },
  {
    id: 'short-film-group-assignment', title: 'Short Film Group Assignment', category: 'work', image: 'short-film-production',
    imageAlt: 'Sai Saing Tun One holding the Birds of a Feather clapperboard in front of his face',
    detailImage: 'birds-film-credits',
    detailImageAlt: 'The Birds of a Feather cast and crew pose outdoors next to the film’s production credits',
    summary: 'Birds of a Feather, a short film made as a group assignment at Rangsit University International College.',
    sections: [],
    source: '3139-10424',
  },

]

export const process = [
  ['Research', 'Understand user needs, project goals, and the market.'],
  ['Wireframe', 'Map the flow and test the structure with low-fidelity layouts.'],
  ['UI Design', 'Build a consistent visual system around the user journey.'],
  ['Test & Iterate', 'Improve the design through feedback and usability testing.'],
]

export const collaborationSkills = [
  'Communication', 'Collaboration', 'Critical thinking', 'Time management',
  'Adaptability', 'User empathy', 'Leadership', 'Problem solving',
]

export const sourceUrl = (id: string, view: 'design' | 'proto' = 'proto') =>
  `https://www.figma.com/${view}/xemu5SqJfr2j2MTPKqQG3n/PORTFOLIO_ROCCO?node-id=${id}`
