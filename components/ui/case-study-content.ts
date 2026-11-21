export type StageDetail = {
  summary: string
  sections: { title: string; body: string }[]
  decisions: { choice: string; reason: string }[]
  output: string
}

export const caseStudies = {
  'tokify-languages': {
    core: 'Turn interest in learning a language into a clear starting point: understand the offer, find the right level, choose a class, and continue learning through an account.',
    challenge: 'A new learner has two decisions to make: which language to study and where to begin. A long feature list alone does not resolve either question.',
    response: 'Separate discovery from learning. The homepage introduces the offer and routes visitors to a language path or placement test; the signed-in dashboard provides continuity.',
    contribution: 'Custom UI/UX design and collaborative AI-assisted implementation with Khine Win Yee Soe. Design direction comes from us; AI supports the build.',
    branches: [
      { title: 'Discover', pages: ['Homepage & learning method', 'Language Paths', 'Help / FAQ', 'Contact'] },
      { title: 'Get started', pages: ['Create account / log in', 'Free placement test', 'Choose a language', 'Choose an available class'] },
      { title: 'Continue learning', pages: ['Dashboard (signed in)', 'Course-path progress', 'XP & streak display', 'Profile / account'] },
    ],
    stages: [
      {
        summary: 'The central design question is how to help a visitor move from “I want to learn” to a suitable first class without losing confidence along the way.',
        sections: [
          { title: 'What the public experience shows', body: 'The homepage offers five language tracks, presents Thai as available, and distinguishes future tracks. It also explains a placement test, short lessons, speaking practice, and a dashboard. These are different needs and should not compete as equally important actions.' },
          { title: 'How that shapes the problem', body: 'Someone who knows their target language can browse a path directly. Someone unsure of their level needs a placement-test route. Returning learners need an account-based destination rather than repeating the discovery journey.' },
        ],
        decisions: [
          { choice: 'Two clear entry actions', reason: '“Start Learning” supports confident visitors; “Start Free Test” gives uncertain visitors another starting point.' },
          { choice: 'Visible availability states', reason: 'Available, upcoming, or locked classes need distinct labels so visitors do not mistake a future course for an open one.' },
          { choice: 'Explain the method after the offer', reason: 'Speaking practice and short modules give context once the visitor understands the core learning proposition.' },
        ],
        output: 'A focused design brief: make the next action understandable and preserve a path from discovery to continued learning. This is an interface-based analysis, not an interview or usability-study report.',
      },
      {
        summary: 'The information architecture separates the public introduction, onboarding, and the signed-in learning area instead of treating every function as a standalone page.',
        sections: [
          { title: 'Public discovery layer', body: 'Language Path, Help, and Contact are sections of the homepage. Keeping them in one introduction lets a new learner compare the offer, read common questions, and contact the team without losing context.' },
          { title: 'Account and learning layer', body: 'Sign-up, log-in, and the placement test have their own entry points. The public navigation script shows the Dashboard for signed-in users, connecting the marketing experience with ongoing learning.' },
        ],
        decisions: [
          { choice: 'Homepage anchors for discovery', reason: 'Language choices and support remain easy to revisit without fragmenting the introduction.' },
          { choice: 'Conditional dashboard destination', reason: 'Navigation can reflect whether the visitor is exploring or already learning.' },
        ],
        output: 'A reconstructed site map and learner journey based on the published homepage and navigation structure.',
      },
      {
        summary: 'The page hierarchy gives the learning promise, first action, and language choices priority before asking the visitor to process a complete course system.',
        sections: [
          { title: 'Desktop structure', body: 'The hero balances a message-and-action column with a speaking-practice visual. Language chips make the offer scannable. Below it, language-path cards introduce the course choices, followed by the method, level progression, onboarding steps, FAQ, and contact.' },
          { title: 'Mobile structure', body: 'A useful mobile adaptation stacks the message, actions, and supporting visual; wraps language choices; and presents course cards in a readable vertical flow. A compact navigation should retain account entry and avoid covering the page content.' },
        ],
        decisions: [
          { choice: 'Message → action → reassurance', reason: 'Learners should know what to do before reading supporting features.' },
          { choice: 'Course states inside the cards', reason: 'Availability belongs next to the choice it affects.' },
        ],
        output: 'Reconstructed structural wireframes from the supplied homepage. They explain hierarchy and responsive intent; they are not presented as original design-file exports.',
      },
      {
        summary: 'The interface pairs a calm blue learning environment with a high-contrast yellow primary action, so the next step is easy to recognize.',
        sections: [
          { title: 'Visual hierarchy', body: 'The supplied design uses a dark navigation band, a large blue hero, a white headline, and a yellow emphasis line. The yellow learning button stands apart from the darker secondary test action, while rounded chips group the language options.' },
          { title: 'Reusable interface patterns', body: 'Navigation, language chips, class cards, account actions, and status labels form the recurring system. Consistent spacing and type hierarchy help visitors recognize the same action or state across different parts of the experience.' },
        ],
        decisions: [
          { choice: 'Language names alongside codes', reason: 'Readable names reduce reliance on short abbreviations alone.' },
          { choice: 'English / Burmese interface controls', reason: 'The language control is visible in the public experience and supports the site’s audience.' },
        ],
        output: 'The supplied high-fidelity homepage shows the project’s visual direction. Site copy describing AI practice or certification is a product claim, not an independently verified result of this case study.',
      },
      {
        summary: 'Vibe coding supports implementation of our own UI/UX decisions. The work is to translate the intended experience into a coherent website, not simply accept the first generated screen.',
        sections: [
          { title: 'Design ownership and collaboration', body: 'Khine Win Yee Soe and I co-designed the UI/UX and used AI assistance to support development. The important handoff is between layout intent, reusable UI patterns, and the behavior expected when a learner chooses a path or enters an account flow.' },
          { title: 'What the public implementation exposes', body: 'The published frontend separates navigation, translations, theme controls, API helpers, and visual interactions into JavaScript modules. The navigation changes with account state. The homepage contains a language-path area and a contact form, showing that the project extends beyond a static hero composition.' },
        ],
        decisions: [
          { choice: 'Shared navigation and language handling', reason: 'Central behavior helps keep pages consistent as the site grows.' },
          { choice: 'Explicit loading and unavailable states', reason: 'A data-driven class list needs understandable states before and after content is available.' },
        ],
        output: 'A published, collaborative, design-led web project. This walkthrough explains the public frontend; it does not claim access to private source history, backend tests, or AI-development logs.',
      },
      {
        summary: 'The deliverable is a published language-learning website connecting discovery, placement-test entry, course selection, and account-based learning.',
        sections: [
          { title: 'What visitors can inspect', body: 'The live homepage presents language tracks, learning-method explanations, progression levels, onboarding instructions, FAQ, and contact. The published structure links to account creation and the free test; signed-in navigation includes the dashboard.' },
          { title: 'Outcome and next validation', body: 'The portfolio outcome is the transition from a custom interface design to a live website. A meaningful next evaluation would measure whether first-time learners can choose an available class and understand the placement-test route. No conversion, retention, learning-gain, or certification results are claimed here.' },
        ],
        decisions: [],
        output: 'Live reference: tokifylanguages.com. The portfolio screenshot records the supplied design; the live website may evolve.',
      },
    ] satisfies StageDetail[],
  },
  'gemsheaven-jade': {
    core: 'Give jade jewelry a distinctive brand presence while helping visitors move from a striking first impression to product information, comparison, and shopping.',
    challenge: 'High-value jewelry needs more than attractive imagery: shoppers need clear product categories, comparable details, and a way to resolve questions before choosing a piece.',
    response: 'Pair an image-led brand introduction with a structured catalog, product-discovery controls, shopping actions, and visible support destinations.',
    contribution: 'Custom UI/UX design and collaborative AI-assisted web development with Khine Win Yee Soe, carrying the jade brand’s visual identity into the storefront.',
    branches: [
      { title: 'Discover the brand', pages: ['Home', 'Featured pieces', 'New arrivals / best sellers', 'About / brand story'] },
      { title: 'Explore & shop', pages: ['Shop / category filters', 'Product details', 'Cart', 'Checkout entry'] },
      { title: 'Build confidence', pages: ['FAQ / shipping / care', 'Contact', 'English / Burmese / Chinese', 'Light / dark theme'] },
    ],
    stages: [
      {
        summary: 'The design problem is to balance an emotional first impression with practical product discovery. A collector should be able to admire a piece and still find the information needed to consider it.',
        sections: [
          { title: 'What the storefront presents', body: 'The public site organizes jewelry into rings, bracelets, necklaces, earrings, and loose jade. Its shop markup includes category and price filters, search, and sorting. Product data has fields for localized names, pricing, stone information, grade, weight, and imagery.' },
          { title: 'Design implications', body: 'An editorial hero can communicate the brand, but shoppers also need a structured catalog. Product information and support content should remain easy to reach, especially when the imagery alone cannot answer questions about a piece.' },
        ],
        decisions: [
          { choice: 'Brand story and shop as separate routes', reason: 'Some visitors want context; others arrive ready to browse the collection.' },
          { choice: 'Comparable product information', reason: 'Consistent fields help visitors understand differences between pieces.' },
          { choice: 'Visible support destinations', reason: 'FAQ and contact give shoppers a next step when product details do not answer a question.' },
        ],
        output: 'A storefront design focus derived from the public site: combine brand presence, product clarity, and shopping guidance. No customer interviews or purchasing-study results are asserted.',
      },
      {
        summary: 'The site map connects three needs: discover the brand, find a suitable piece, and resolve practical shopping questions.',
        sections: [
          { title: 'Primary navigation', body: 'The published navigation links Home, Shop, About, Contact, and FAQ. Home introduces the brand and collection; Shop supports browsing; About provides context; Contact and FAQ support questions before purchase.' },
          { title: 'Shopping and utility layer', body: 'The shared header includes a cart destination plus language and theme controls. The footer exposes jewelry-category links and shipping, care, and payment-related destinations. These utilities sit alongside the main content structure rather than replacing it.' },
        ],
        decisions: [
          { choice: 'Category routes inside Shop', reason: 'Rings, bracelets, and other product types act as useful starting points without overcrowding the main navigation.' },
          { choice: 'Persistent shopping utilities', reason: 'Language selection and the cart need to remain recognizable across the browsing journey.' },
        ],
        output: 'A reconstructed information architecture from the published navigation, shop page, and shared frontend.',
      },
      {
        summary: 'The layout gives the featured jade piece space to establish the brand, then introduces a more structured browsing experience below the hero.',
        sections: [
          { title: 'Desktop structure', body: 'The hero places the message and two actions on one side and the product visual on the other. Supporting product cards and a delivery cue sit around that main composition. Subsequent sections organize featured products, new arrivals, and best sellers.' },
          { title: 'Mobile structure', body: 'A readable mobile adaptation places the message, primary shopping action, and product visual in a deliberate sequence. Product information should remain legible, and catalog filters should be accessible without letting a desktop sidebar consume the narrow screen.' },
        ],
        decisions: [
          { choice: 'Large hero image, structured product grids', reason: 'The introduction builds brand character; the catalog supports comparison.' },
          { choice: 'Separate Shop and Our story actions', reason: 'The actions communicate two different visitor intentions.' },
        ],
        output: 'Reconstructed wireframes explain the supplied homepage’s hierarchy. They are explanatory studies rather than original wireframe exports.',
      },
      {
        summary: 'The visual direction uses jade greens, dark surfaces, mint accents, and prominent product photography to give the collection a recognizable identity.',
        sections: [
          { title: 'Brand expression', body: 'The supplied Chinese-language homepage combines a dark green navigation band with a large jade bangle visual. Light text contrasts against the hero, and the mint primary action connects the interaction color to the jewelry palette.' },
          { title: 'A storefront system', body: 'The catalog needs consistent product cards, image treatment, price hierarchy, category states, and buttons. The public frontend also includes English, Burmese, and Chinese language selection and a light/dark theme control, so content length and contrast are part of the interface problem.' },
        ],
        decisions: [
          { choice: 'Product-first imagery', reason: 'The jewelry’s color and material are the main visual subject.' },
          { choice: 'Localized fields with a fallback', reason: 'The public code handles missing translated fields so a product does not become blank in another language.' },
        ],
        output: 'The supplied high-fidelity storefront reference illustrates the brand and interface. Product certification, stock, reviews, and delivery claims are not independently verified by this portfolio.',
      },
      {
        summary: 'Our custom UI/UX sets the direction; AI-assisted development supports the work of turning that direction into catalog and shopping interfaces.',
        sections: [
          { title: 'Design to implementation', body: 'Khine Win Yee Soe and I co-designed and developed the website. The implementation has to preserve the brand composition while also handling catalog states, product information, language changes, and a coherent route toward the cart.' },
          { title: 'Public implementation details', body: 'The public frontend separates shared site behavior, product/translation data, and page-level logic. The shared script renders navigation, manages language and theme preferences, and contains browser-side cart handling. The shop page defines search, category and price filters, and sort controls.' },
        ],
        decisions: [
          { choice: 'Shared header and reusable product information', reason: 'Catalog and utility behavior can stay consistent across pages.' },
          { choice: 'Preference persistence', reason: 'Remembering language and theme avoids requiring the visitor to repeat the same choice.' },
        ],
        output: 'A live, collaborative, design-led storefront. Public frontend inspection does not establish payment-provider operation, order fulfillment, or a completed production transaction.',
      },
      {
        summary: 'The outcome is a published jade-jewelry storefront that combines a distinct visual identity with a product-discovery and shopping structure.',
        sections: [
          { title: 'What visitors can inspect', body: 'The live site provides the homepage, Shop, About, Contact, FAQ, and a cart route. The public shop structure exposes search, sorting, and category/price controls, while the shared header includes language and theme options.' },
          { title: 'Outcome and next validation', body: 'The portfolio demonstrates a move from custom interface design into a live storefront. A useful next evaluation would ask whether shoppers can find a product category, compare key details, and locate delivery or care information. No sales, conversion, fulfillment, or revenue improvements are claimed.' },
        ],
        decisions: [],
        output: 'Live reference: gemsheavenjade.com. The portfolio uses the supplied storefront capture; the live catalog and interface can change.',
      },
    ] satisfies StageDetail[],
  },
}
