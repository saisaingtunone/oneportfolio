type Color = [name: string, hex: `#${string}`, use: string]
type TextStyle = [role: string, typeface: string, size?: string]

type VisualSystem = {
  palette: Color[]
  paletteSource?: string
  type: TextStyle[]
  typeSource: string
}

const screenType = 'Pixel values show the visible text height in the supplied screenshot.'

export const uxVisualSystems: Record<string, VisualSystem> = {
  'tokify-languages': {
    paletteSource: 'Tokify brand guidelines, with the yellow action color sampled from the homepage.',
    palette: [
      ['Tokify blue', '#0861BB', 'Primary identity and active states'],
      ['Deep navy', '#071A2E', 'Dark brand surfaces'],
      ['Soft blue', '#EAF3FC', 'Light supporting surfaces'],
      ['White', '#FFFFFF', 'Light backgrounds and reversed text'],
      ['Black', '#000000', 'Monochrome identity and dark text'],
      ['Action yellow', '#FFC426', 'Start Learning and key highlights'],
    ],
    type: [
      ['Brand and language text', 'Myanmar Sanpya Regular'],
      ['Hero heading', 'Bold sans serif', '53–68 px'],
      ['Introduction', 'Regular sans serif', '20–27 px'],
      ['Navigation and actions', 'Compact sans serif'],
    ],
    typeSource: `The brand guidelines specify Myanmar Sanpya Regular. ${screenType}`,
  },
  'gemsheaven-jade': {
    palette: [
      ['Charcoal green', '#121715', 'Navigation'],
      ['Forest green', '#131F19', 'Dark hero surfaces'],
      ['Jade', '#3E9C7D', 'Brand mark and interface accents'],
      ['Mint', '#A6DCC3', 'Primary shopping action'],
      ['Ivory', '#FFFEFA', 'Product information cards'],
    ],
    type: [
      ['Brand wordmark', 'Serif Latin lettering'],
      ['Hero heading', 'Bold Chinese sans serif', '83 px'],
      ['Hero description', 'Regular Chinese sans serif', '23 px'],
      ['Navigation and product details', 'Compact sans serif'],
    ],
    typeSource: screenType,
  },
  'anaya-hotel': {
    palette: [
      ['Warm white', '#FDF9F6', 'Content and room listings'],
      ['Sand', '#F1ECE7', 'Supporting sections'],
      ['Stone', '#DDDAD7', 'Neutral separators and surfaces'],
      ['Muted gold', '#B0954A', 'Badges and small accents'],
    ],
    type: [
      ['H1 · Hero title', 'Poltawski Nowy Regular', '72 px desktop · 56 px tablet · 36 px mobile'],
      ['H2 · Section heading', 'Poltawski Nowy Regular', '48 px desktop · 40 px tablet · 28 px mobile'],
      ['H3 · Subsection heading', 'Poltawski Nowy Regular', '32 px desktop · 28 px tablet · 22 px mobile'],
      ['H4 · Card heading', 'Poltawski Nowy Regular', '24 px desktop · 22 px tablet · 18 px mobile'],
      ['Body', 'Montserrat Regular', '16 px desktop · 16 px tablet · 15 px mobile'],
      ['Small text', 'Montserrat Regular', '14 px desktop · 14 px tablet · 13 px mobile'],
      ['Buttons and links', 'Montserrat Medium', '16 px desktop · 16 px tablet · 15 px mobile'],
    ],
    typeSource: 'Desktop, tablet, and mobile sizes from the ANAYA Hotel typography guide.',
  },
  'echo-dance-studio': {
    paletteSource: 'Echo’s project notes and desktop screens.',
    palette: [
      ['Echo red', '#DC2626', 'Hero, calls to action, and footer'],
      ['Coral', '#FC5959', 'Supporting accents'],
      ['Warm cream', '#FDF1D5', 'Secondary highlights'],
      ['Charcoal', '#222222', 'Navigation and dark sections'],
      ['Off-white', '#FAFAFA', 'Light sections and contrast'],
    ],
    type: [
      ['Section headings', 'Poppins', '8–9 px on the scaled desktop board'],
      ['Body copy', 'Fustat'],
    ],
    typeSource: `The case study identifies Poppins and Fustat. ${screenType}`,
  },
  'trinity-language-center': {
    paletteSource: 'Colors sampled from the swatches on the Trinity layout board.',
    palette: [
      ['Navy', '#112E4B', 'Navigation and footer'],
      ['Sky blue', '#D4EAFE', 'Learning and course surfaces'],
      ['Black', '#000000', 'Dark copy and contrast'],
      ['White', '#FFFFFF', 'Open content sections'],
    ],
    type: [
      ['Wordmark', 'Expressive display lettering', '77 px in the desktop mockup'],
      ['Section headings', 'Bold sans serif'],
      ['Course and team details', 'Sans-serif body text'],
    ],
    typeSource: screenType,
  },
  'personal-portfolios': {
    palette: [
      ['Black', '#000000', 'Main canvas'],
      ['Charcoal', '#101010', 'Navigation and card surfaces'],
      ['Orange', '#E45F38', 'Calls to action and section highlights'],
      ['Warm red', '#EB3223', 'Hero glow and project accents'],
    ],
    type: [
      ['Hero title', 'Bold uppercase sans serif', '44–45 px'],
      ['Section headings', 'Bold sans serif'],
      ['Introductory copy', 'Regular sans serif', '19–25 px'],
    ],
    typeSource: screenType,
  },
  'sprouting-tech-dashboard': {
    palette: [
      ['Graphite', '#1F1F1F', 'Sidebar and main canvas'],
      ['Dark gray', '#2E2E2E', 'Tables and form panels'],
      ['Teal', '#52B499', 'Active status and interface accents'],
      ['Blue teal', '#2F6E88', 'Selection and editing actions'],
      ['Coral red', '#EC5E52', 'Inactive status and destructive actions'],
    ],
    type: [
      ['Screen and panel headings', 'Semibold sans serif', '10 px on the course list board'],
      ['Tables and form controls', 'Compact sans serif'],
      ['Activity and status details', 'Small sans-serif labels'],
    ],
    typeSource: screenType,
  },
  'restaurant-website': {
    paletteSource: 'Colors sampled from the finished Bon Appétit desktop homepage.',
    palette: [
      ['Deep green', '#073027', 'Headings, navigation, and button outlines'],
      ['Orange', '#EE9748', 'Reservation buttons and accents'],
      ['Cream', '#FFFCF1', 'Hero and menu backgrounds'],
      ['White', '#FEFEFE', 'Navigation and supporting surfaces'],
      ['Black', '#000000', 'Body copy'],
    ],
    type: [
      ['Hero heading', 'Condensed uppercase sans serif', '38–39 px'],
      ['Section headings', 'Condensed uppercase sans serif'],
      ['Navigation and actions', 'Condensed uppercase sans serif'],
      ['Body copy', 'Regular sans serif', '20–26 px'],
    ],
    typeSource: screenType,
  },
  'eleva-clinic': {
    palette: [
      ['Blush', '#FAEDEA', 'Patient website and dashboard backgrounds'],
      ['Soft white', '#FEFEFE', 'Cards and reading surfaces'],
      ['Terracotta', '#AF725B', 'Primary treatment and contact actions'],
      ['Coral', '#F0A793', 'Dashboard chart highlights'],
      ['Sky blue', '#78A4D8', 'Secondary chart series'],
    ],
    type: [
      ['Patient website hero heading', 'Light sans serif', '21 px in the tablet mockup'],
      ['Treatment descriptions', 'Regular sans serif', '6–10 px in the tablet mockup'],
      ['Dashboard labels', 'Compact sans serif'],
    ],
    typeSource: screenType,
  },
  'som-som': {
    palette: [
      ['Logo orange', '#D86B2D', 'Wordmark and sound motif'],
      ['Cream', '#FFF6E5', 'Light interface details'],
      ['Near-black', '#181818', 'Discovery and karaoke screens'],
      ['Charcoal', '#262626', 'Secondary dark surfaces'],
      ['White', '#FFFFFF', 'Light screens and reversed text'],
    ],
    type: [
      ['Brand wordmark', 'Rounded display lettering'],
      ['Sign-in heading', 'Bold sans serif', '10 px on the mobile UI board'],
      ['Playback, forms, and settings', 'Compact sans serif'],
    ],
    typeSource: screenType,
  },
}
