type Evidence = [asset: string, caption: string]
type Stage = [description: string, evidence?: Evidence[]]
export const uxStages = ['Planning', 'Wireframe', 'UI Design', 'Prototype', 'Complete'] as const

export const uxProcesses: Record<string, [Stage, Stage, Stage, Stage, Stage]> = {
  'anaya-hotel': [
    ['Map the hotel’s rooms, offers, facilities, experiences, and location information. The sitemap also traces the booking path through date selection, payment, and confirmation.', [['ux/hotel-sitemap', 'Hotel sitemap and booking flow']]],
    ['Use low-fidelity layouts to test how guests compare rooms, browse offers, and move through booking on desktop and mobile.', [['ux/hotel-low-fidelity', 'Low-fidelity desktop and mobile wireframes']]],
    ['Apply a shared visual system and hotel photography to rooms, packages, and promotions across screen sizes.', [['ux/hotel-high-fidelity', 'High-fidelity mobile and desktop UI designs']]],
    ['Connect room details and offers to the booking sequence. Use the desktop or mobile prototype to follow those paths.', [['hotel-design', 'Figma prototype board showing connections between screens']]],
    ['The group delivered a 36-screen Figma prototype covering responsive layouts, rooms, packages, offers, and booking.', [['hotel', 'Desktop and mobile mockups']]],
  ],
  'echo-dance-studio': [
    ['Map how a visitor discovers dance styles, classes, workshops, and instructors, then finds a path to enrollment.', [['ux/echo-plan', 'Sitemap and early class-booking flow']]],
    ['Explore different page hierarchies for the home, studio, and contact pages on desktop and mobile.', [['ux/echo-wireframes', 'Low-fidelity desktop and mobile layout explorations']]],
    ['Carry Echo’s red, black, and white identity across visual sections and reusable controls. Poppins supports headings and Fustat supports body copy.', [['ux/echo-desktop', 'Workshops, home, contact, and studio desktop designs'], ['ux/echo-mobile', 'Mobile menu, studio, home, and contact layouts']]],
    ['Connect the studio and class discovery paths to the enrollment experience in desktop and mobile prototypes.', [['echo-design', 'Figma prototype board showing connections between Echo screens']]],
    ['The final design adapts workshop listings, instructor profiles, studio content, and contact information across screen sizes.', [['ux/echo-complete', 'Final Echo mobile mockups']]],
  ],
  'trinity-language-center': [
    ['Plan the site around four visitor needs: learn about the club, browse available courses, find contact details, and understand who teaches there.'],
    ['Explore home, about, and contact layouts and group the course content by English, Chinese, Thai, and mathematics.', [['ux/trinity-wireframes', 'Early homepage, contact, about, and course wireframes']]],
    ['Use navy, light blue, and white to distinguish sections while keeping the header and footer consistent from page to page.', [['ux/trinity-layouts', 'Page layout and color studies']]],
    ['Use the navigation to move between the club introduction, course listings, and contact information. The published site is the interactive reference for this case study.'],
    ['The responsive website is live. The mockups show how the club introduction and team content adapt across devices.', [['ux/trinity-complete', 'Published design presented across desktop, tablet, phone, and laptop']]],
  ],
  'personal-portfolios': [
    ['Organize the portfolio around a short introduction, achievements, project categories, detailed case studies, and contact details.', [['ux/portfolio-plan', 'Portfolio sitemap']]],
    ['Establish a repeatable hierarchy for individual projects: overview, goals, process, results, and conclusion.'],
    ['Use a black canvas and orange highlights to distinguish the introduction, project cards, achievements, and primary actions.', [['ux/portfolio-ui', 'Achievement, contact, homepage, and about screens'], ['ux/portfolio-project-pages', 'Project listing and case study layout overview']]],
    ['Connect the project categories and individual case studies to show how readers can move from an overview to detailed evidence.', [['ux/portfolio-prototype', 'Figma prototype connection overview']]],
    ['The final concept presents Khine Win Yee Soe’s work through a homepage, project gallery, and consistent case study pages.', [['ux/portfolio-monitor', 'Desktop presentation of the completed portfolio design']]],
  ],
  'sprouting-tech-dashboard': [
    ['Focus the internship contribution on the profile, settings, and navigation within the Academy dashboard.'],
    ['Review existing screen structures and address spacing and alignment where repeated controls and account settings need to read consistently.'],
    ['Refine the sidebar, account controls, and repeated layouts within the existing dashboard. The UI board shows how navigation and shared controls appear across course management and promotion banner screens.', [['ux/academy-dashboard', 'Sprouting Tech Academy UI design board showing course lists, course details, and promotion banner settings']]],
    ['Maintain consistent navigation between account areas in the design handoff.'],
    ['The refined interface was handed back to the team during development.', [['dashboard-cover', 'Academy dashboard presentation']]],
  ],
  'restaurant-website': [
    ['Organize the restaurant experience around menu browsing, reservations, and delivery. The sitemap maps the main pages and traces a reservation from date selection through confirmation.', [['ux/restaurant-sitemap', 'Bon Appétit website sitemap and reservation flow']]],
    ['Give menu discovery, reservations, and delivery distinct entry points so diners can go directly to the task they came for.', [
      ['ux/restaurant-wireframes-desktop', 'Desktop wireframes for the homepage, menu, restaurant information, and ordering'],
      ['ux/restaurant-wireframes-mobile', 'Mobile wireframes for browsing, reservations, and checkout'],
    ]],
    ['Use a soft palette and gallery imagery to convey the dining atmosphere alongside practical booking controls.', [['ux/restaurant-ui', 'High-fidelity Bon Appétit layouts for mobile and desktop']]],
    ['Use Figma Smart Animate to illustrate transitions through the restaurant website concept.'],
    ['The finished homepage combines restaurant photography, a clear reservation action, and menu discovery.', [['ux/restaurant-complete', 'Completed Bon Appétit desktop homepage']]],
  ],
  'eleva-clinic': [
    ['Help visitors understand treatments and find a clear path to request an appointment.'],
    ['Structure the patient journey around treatment discovery, promotions, doctor profiles, FAQs, and appointment details.', [['ux/eleva-wireframes', 'Eleva Clinic desktop, mobile, and admin dashboard wireframes']]],
    ['Refine screen and component alignment through feedback rounds, with consistent placement for treatment information and appointment actions.', [['ux/eleva-ui', 'High-fidelity Eleva Clinic mobile and desktop layouts and admin dashboard screens']]],
    ['Use the patient-facing layouts to illustrate the path from researching the clinic to requesting an appointment.', [['ux/eleva-prototype', 'Eleva Clinic desktop and mobile Figma prototype flows']]],
    ['The redesign documents patient-facing screens and adjacent dashboard views for the clinic experience.', [['ux/eleva-hero', 'Eleva Clinic dashboard and patient-facing website shown on a laptop, tablet, and phone']]],
  ],
  'som-som': [
    ['Sketch how users enter the app, discover songs, follow friends, and reach the karaoke player.', [['ux/som-som-planning', 'Hand-drawn Som Som planning board with onboarding, social feed, and karaoke flows']]],
    ['Lay out discovery, sign-in, genre selection, profiles, and playback controls as mobile wireframes.', [['ux/som-som-wireframes', 'Som Som mobile wireframes for onboarding, discovery, settings, and playback']]],
    ['Carry the orange-and-cream wordmark, headphones motif, and icons into the app’s darker mobile screens.', [
      ['ux/som-som-ui', 'High-fidelity Som Som screens for discovery, the social feed, karaoke controls, and payments'],
      ['som-som-identity', 'Logo, interface icons, and close-up mobile screens'],
    ]],
    ['Use the screen sequence to illustrate how the browsing and singing controls relate to one another.'],
    ['The final presentation brings the mobile interface and brand identity together.', [['som-som', 'Som Som mobile screens and identity']]],
  ],
}
