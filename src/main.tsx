import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { UXWorkflow } from '../components/ui/ux-workflow'
import { UXVisualSystem } from '../components/ui/ux-visual-system'
import { ShortFilmCaseStudy } from '../components/ui/short-film-case-study'
import { StudentUnionCaseStudy } from '../components/ui/student-union-case-study'
import { CreativeVideoCaseStudy } from '../components/ui/creative-video-case-study'
import { RicLanguageCenterCaseStudy } from '../components/ui/ric-language-center-case-study'
import { DanceClubCaseStudy } from '../components/ui/dance-club-case-study'
import { AvCrewCaseStudy } from '../components/ui/av-crew-case-study'
import { uxProcesses } from './ux-process'
import { createRoot } from 'react-dom/client'
import { useInView, useReducedMotion } from 'motion/react'
import { BadgeCheck, BriefcaseBusiness, CircleCheck, House, Languages, Mail, PanelsTopLeft, UserRound } from 'lucide-react'
import { MenuButton } from '@/components/ui/menu-button'
import { NavBar } from '@/components/ui/tubelight-navbar'
import AnimatedContent from '@/components/ui/AnimatedContent'
import TextReveal from '@/components/ui/text-reveal'
import SpecularButton from '@/components/ui/SpecularButton'
import SplitText from '@/components/ui/split-text'
import MagicBento from '@/components/ui/MagicBento'
import { LiveWebsiteButton } from '@/components/ui/live-website-button'
import { ArtworkWorkflow } from '@/components/ui/artwork-workflow'
import { getArtworkStages } from './artwork'
import { ProjectWorkflow } from '@/components/ui/project-workflow'
import Folder from '@/components/ui/Folder'
import CardSwap, { type CardSwapHandle } from '@/components/ui/CardSwap'
import SwarmCursor from '@/components/ui/swarm-cursor'
import GlassFolder from '@/components/ui/glass-folder-cards'
import HeroWordMorph from '@/components/ui/hero-word-morph'
import RotatingText, { type RotatingTextHandle } from '@/components/ui/rotating-text'
import { asset, assetUrl, categories, process, profile, projects, projectUrl, siteUrl, collaborationSkills, sourceUrl, type Category } from './content'
import { HeroText, PortraitBadge } from './hero'
import './styles.css'

const path = window.location.pathname.slice(siteUrl().length - 1).replace(/\/(?:index\.html)?$/, '')
const slug = path.startsWith('/work/') ? path.slice(6) : ''
const projectIndex = projects.findIndex(project => project.id === slug)
const project = projects[projectIndex]
const volunteerProjectsId = 'volunteer-projects'

const navItems = [
  { name: 'Home', url: siteUrl('#home'), icon: House },
  { name: 'Work', url: siteUrl('#work'), icon: BriefcaseBusiness },
  { name: 'About', url: siteUrl('#about'), icon: UserRound },
  { name: 'Contact', url: project ? '#contact' : siteUrl('#contact'), icon: Mail },
] as const

function currentNavItem() {
  const hash = window.location.hash
  if (path) return hash === '#contact' ? 'Contact' : 'Work'
  if (hash === '#categories' || hash === '#' + volunteerProjectsId) return 'Work'
  if (hash === '#skills' || hash === '#design-process' || hash === '#certificates') return 'About'
  return navItems.find(item => item.url.endsWith(hash))?.name ?? 'Home'
}

function Arrow({ direction = 'up' }: { direction?: 'up' | 'down' | 'right' | 'left' }) {
  const paths = { up: 'M4 12 12 4M6 4h6v6', down: 'M8 3v10m-4-4 4 4 4-4', right: 'M3 8h10M9 4l4 4-4 4', left: 'M13 8H3m4-4L3 8l4 4' }
  return <svg aria-hidden="true" className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={paths[direction]} /></svg>
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} <Arrow /></a>
}

const workLabels = ['View Work', 'Explore Work']
const cvLabels = ['Download CV', 'Get Résumé']
const navCvLabels = [cvLabels[0]]
const heroHighlights = ['Interfaces', 'Websites', 'Brand identities']

function HeroButton({
  href, labels, external = false, primary = true, className = '',
}: { href: string; labels: string[]; external?: boolean; primary?: boolean; className?: string }) {
  const text = useRef<RotatingTextHandle>(null)
  const reducedMotion = useReducedMotion()

  return <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className={['button hero-button', primary ? 'button-primary' : 'button-secondary', className].join(' ')}
    aria-label={labels[0]}
    onPointerEnter={event => { if (!reducedMotion && event.pointerType === 'mouse') text.current?.jumpTo(1) }}
    onPointerLeave={() => text.current?.reset()}
    onFocus={event => { if (!reducedMotion && event.currentTarget.matches(':focus-visible')) text.current?.jumpTo(1) }}
    onBlur={() => text.current?.reset()}
  >
    <span className="hero-button-label" aria-hidden="true">
      {labels.length === 1 ? labels[0] : <>
        <span className="hero-button-size">{labels[0]}</span>
        <span className="hero-button-size">{labels[1]}</span>
        <RotatingText ref={text} texts={labels} auto={false} effect="slide" staggerDuration={0.012} splitLevelClassName="hero-button-mask" />
      </>}
    </span>
    <span className="hero-button-icon"><Arrow direction="right" /></span>
  </a>
}

function Header() {
  const [active, setActive] = useState(currentNavItem)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const sync = () => setActive(currentNavItem())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (!open) return

    const desktop = window.matchMedia('(min-width: 1025px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuRef.current?.focus()
    }

    desktop.addEventListener('change', closeOnDesktop)
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <header ref={headerRef} className="site-header" data-home={path === '' || undefined}>
      <AnimatedContent className="container header-inner" trigger="mount" distance={8} duration={0.48}>
        <a className="brand" href={siteUrl('#home')} aria-label="Portfolio home" onClick={() => setOpen(false)}>
          <img src={assetUrl('one-logo.png')} alt="" width="32" height="32" />
        </a>
        <HeroButton href={profile.cv} labels={navCvLabels} external className="header-download" />
        <MenuButton ref={menuRef} open={open} controls="primary-navigation" onClick={() => setOpen(value => !value)} />
        <NavBar id="primary-navigation" items={navItems} active={active} open={open} onNavigate={() => setOpen(false)} />
      </AnimatedContent>
    </header>
  )
}

function Hero() {
  return (
    <SwarmCursor className="hero-swarm" count={240} size={1.65} spread={50} color="#007EEF"
      accentColor="#FFFFFF" idle="hide" clickEffect="pulse" intro={false}>
    <section className="hero container" id="home" aria-labelledby="hero-title">
      <AnimatedContent className="hero-copy" trigger="mount" distance={16} duration={0.65} initialOpacity={0.35}>
        <p className="eyebrow"><span className="status-dot" /> UI/UX &amp; Graphic Designer</p>
        <HeroText id="hero-title" text="One" heading />
        <p className="hero-rotation">
          <span className="sr-only">I design interfaces, websites, and brand identities.</span>
          <span aria-hidden="true" className="hero-rotation-visual">
            <span>I design</span>
            <HeroWordMorph words={heroHighlights} />
          </span>
        </p>
        <HeroText className="hero-lede" text="I design intuitive digital experiences and visual identities, combining design systems, user insight, and digital marketing." />
        <div className="actions">
          <HeroButton href="#work" labels={workLabels} />
          <HeroButton href={profile.cv} labels={cvLabels} external primary={false} />
        </div>
      </AnimatedContent>
      <PortraitBadge />
    </section>
    </SwarmCursor>
  )
}

function FeaturedCard({ item }: { item: typeof projects[number] }) {
  return (
    <AnimatedContent as="article" className={'featured-card ' + item.category + ' ' + item.id} distance={24} duration={0.65}>
      <a href={projectUrl(item.id)}>
        {item.image && <div className="card-media"><img src={asset(item.image)} alt={item.imageAlt} loading="lazy" width="720" height="420" /></div>}
        <div className="card-body">
          <div><p className="eyebrow">{categories[item.category].label}</p><h3>{item.title}</h3><p>{item.summary}</p></div>
          <span className="round-arrow"><Arrow /></span>
        </div>
      </a>
    </AnimatedContent>
  )
}

function CategoryFolder({ category, open, onOpenChange }: { category: Category; open: boolean; onOpenChange: (open: boolean) => void }) {
  const data = categories[category]
  const items = projects.filter(project => project.category === category)
  const openLabel = items.length === 1 ? 'View project' : 'View all ' + items.length + ' projects'
  const [width, setWidth] = useState(100)
  const sizingRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = sizingRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.min(420, Math.floor(entry.contentRect.width * 0.92))))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatedContent as="article" className="category" distance={20} duration={0.6}>
      <div ref={sizingRef} className="folder-stage" id={category === 'work' ? volunteerProjectsId : undefined}>
        <GlassFolder
          label={data.label}
          tone="dark"
          image={asset(data.cover)}
          action="none"
          appear={false}
          width={width}
          open={open}
          onOpenChange={onOpenChange}
          files={items.map(item => ({ name: item.title, href: projectUrl(item.id), image: item.image ? asset(item.image) : undefined }))}
        />
      </div>
      <p>{data.description}</p>
      <button
        className="folder-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={category + '-project-list'}
        aria-label={(open ? 'Hide projects' : openLabel) + ' in ' + data.label}
        onClick={() => onOpenChange(!open)}
      >
        {open ? 'Hide projects' : openLabel}
        <Arrow direction={open ? 'down' : 'right'} />
      </button>
      {open ? (
        <AnimatedContent as="ul" id={category + '-project-list'} className="folder-links"
          aria-label={data.label + ' projects'} trigger="mount" distance={9} duration={0.42} stagger={0.035}>
          {items.map(item => <li key={item.id}><a href={projectUrl(item.id)}>{item.title}<Arrow /></a></li>)}
        </AnimatedContent>
      ) : <ul id={category + '-project-list'} hidden />}
    </AnimatedContent>
  )
}

function Work() {
  const [open, setOpen] = useState<Category | null>(() => window.location.hash === '#' + volunteerProjectsId ? 'work' : null)
  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="container">
        <AnimatedContent className="section-heading" distance={24} stagger={0.07}>
          <div><p className="eyebrow">Portfolio</p><h2 id="work-title">Selected work<span>.</span></h2></div>
          <a className="text-link" href="#categories">Browse categories <Arrow direction="down" /></a>
        </AnimatedContent>
        <div className="featured-grid">
          {[projects.find(item => item.id === 'tokify-languages')!, projects.find(item => item.id === 'echo-dance-studio')!, projects.find(item => item.id === 'gemsheaven-jade')!].map(item => <FeaturedCard key={item.id} item={item} />)}
        </div>
        <div className="category-section" id="categories">
          <AnimatedContent as="h3" distance={18}>Browse by category</AnimatedContent>
          <div className="categories">
            {(Object.keys(categories) as Category[]).map(category => <CategoryFolder key={category} category={category} open={open === category} onOpenChange={state => setOpen(state ? category : null)} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function DesignProcess() {
  const trackRef = useRef<HTMLOListElement>(null)
  const inView = useInView(trackRef, { margin: '0px 0px -10% 0px' })

  return (
    <section id="design-process" aria-labelledby="process-title">
      <AnimatedContent className="process-heading" distance={18}>
        <h3 id="process-title">How I design</h3>

      </AnimatedContent>
      <ol ref={trackRef} className="process" data-playing={inView}>
        {process.map(([title, body], index) => (
          <li key={title}>
            <span className="process-node" aria-hidden="true">0{index + 1}</span>
            {index < process.length - 1 && <span className="process-connection" aria-hidden="true" />}
            <div className="process-card">
              <TextReveal as="h4">{title}</TextReveal>
              <TextReveal as="p">{body}</TextReveal>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function AboutFolder({ label, color, icon, count, value, heading, items }: {
  label: string; color: string; icon?: ReactNode; count?: number; value: ReactNode; heading?: string;
  items: Array<{ title: string; description?: string; image?: string }>
}) {
  const host = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(1)
  const reducedMotion = useReducedMotion()
  useLayoutEffect(() => {
    const el = host.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect.width / 224))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={host} className="about-folder">
    <Folder label={label} color={color} items={items} size={size} theme="dark"
      draggable={false} zoomOnClick={false} intro={!reducedMotion} tilt={reducedMotion ? 0 : 0.35}
      bounce={0.25} layout="stack" paperColor="#e6f1ff"
      frontContent={<div className="about-folder-cover">
        <span className="about-folder-heading">{icon}{heading || label}{count !== undefined && <strong>{count}</strong>}</span>
        <span className="about-folder-value">{value}</span>
      </div>} />
  </div>
}

function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="container">
        <AnimatedContent className="about-intro" distance={22} stagger={0.09}>
          <div className="about-copy">
            <p className="eyebrow">Get to know</p>
            <h2 id="about-title">About Me.</h2>
            <p className="about-lede">
              I’m a creative designer focused on <strong>UI/UX</strong> and visual design, creating intuitive <strong>digital experiences</strong> through user-centered thinking.
              With skills in branding, prototyping, and <strong>digital marketing</strong>, I design solutions that balance aesthetics and functionality.
              As a <strong>multilingual</strong> professional, I bring a global perspective to every project.
            </p>
          </div>
          <div className="about-cards">
            <AboutFolder label="Projects" color="#087ce2" icon={<PanelsTopLeft />} count={projects.length} value="Across all fields" items={[
              { title: 'UI/UX design', description: 'Responsive websites and user journeys' },
              { title: 'Visual design', description: 'Brand identities and graphics' },
              { title: 'Live projects', description: 'Tokify Languages · GemsHeaven Jade' }
            ]} />
            <AboutFolder label="Certificates" color="#247bc9" icon={<BadgeCheck />} count={8} value="Skills development" items={[
              { image: asset('certificates/ict-degree'), title: 'First class honours' },
              { image: asset('certificates/deans-list'), title: 'Dean’s List Award' },
              { image: asset('certificates/student-leadership'), title: 'Leadership Award' }
            ]} />
            <AboutFolder label="Opportunities" color="#247bc9" value={<><CircleCheck />Available</>} heading="Open to opportunities" items={[
              { title: 'UI/UX design', description: 'Thoughtful digital experiences' },
              { title: 'Web design', description: 'Responsive layouts and prototypes' },
              { title: 'Collaboration', description: 'Creative, cross-cultural teamwork' }
            ]} />
            <AboutFolder label="Languages" color="#087ce2" icon={<Languages />} value={<>Burmese, English,<br />Thai, Chinese</>} items={[
              { title: 'Burmese', description: 'Native language' },
              { title: 'English · Thai', description: 'Multilingual communication' },
              { title: 'Chinese', description: 'Cross-cultural perspective' }
            ]} />
          </div>
        </AnimatedContent>
        <DesignProcess />
      </div>
    </section>
  )
}

const toolLogos = [
  ['Figma', 'figma.svg'], ['Canva', 'canva.svg'], ['Illustrator', 'illustrator.svg'],
  ['Photoshop', 'photoshop.svg'], ['CapCut', 'capcut.webp'], ['Procreate', 'procreate.webp'],
  ['Framer', 'framer.svg'], ['HTML', 'html5.svg'], ['CSS', 'css3.svg'], ['JavaScript', 'javascript.svg'],
]

const toolkitTiles = Array.from({ length: 144 }, (_, index) => <span key={index} />)

function Skills() {
  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <div className="skill-orbit">
        <div className="skill-backdrop" aria-hidden="true">
          <div className="skill-backdrop-light" />
          <div className="skill-backdrop-tiles">{toolkitTiles}</div>
        </div>
        <AnimatedContent className="skill-core" distance={22} stagger={0.07}>
          <p className="eyebrow">Hard skills</p>
          <h2 id="skills-title">Skills I<br />bring.</h2>
          <p>UI/UX design, wireframing, prototyping, visual identity, video editing, and responsive web development.</p>
          <a href="#work" className="button skill-button">See my work <Arrow /></a>
        </AnimatedContent>
        <AnimatedContent as="ul" className="skill-tokens" aria-label="Software and languages supporting my hard skills" distance={14} duration={0.75}>
          {toolLogos.map(([label, file], index) => (
            <li key={label} className={'token token-' + index}>
              <span className="token-logo">
                <img src={assetUrl('tool-logos/' + file)} alt="" width="64" height="64" loading="lazy" decoding="async" />
              </span>
              <span className="token-label">{label}</span>
            </li>
          ))}
        </AnimatedContent>
      </div>
      <AnimatedContent className="skill-strip container" distance={16} stagger={0.07}>
        <h3>Collaboration skills</h3>
        <ul>{collaborationSkills.map(skill => <li key={skill}>{skill}</li>)}</ul>
      </AnimatedContent>
    </section>
  )
}

const certificates = [
  { id: 'ict-degree', title: 'B.Sc. in Information and Communication Technology', issuer: 'Rangsit University', detail: 'First class honours', portrait: true },
  { id: 'deans-list', title: 'Dean’s List Award', issuer: 'Rangsit University International College', detail: 'Academic performance and activities' },
  { id: 'student-leadership', title: 'Student Activities Leadership Award', issuer: 'Rangsit University International College', detail: 'Student leadership' },
  { id: 'sprouting-internship', title: 'Internship Completion', issuer: 'Sprouting Tech', detail: 'Cooperative education' },
  { id: 'trinity-appreciation', title: 'Certificate of Appreciation', issuer: 'Trinity Learning Club', detail: 'Website project contribution' },
  { id: 'asean-data-science', title: 'ASEAN Data Science Explorers', issuer: 'SAP & ASEAN Foundation', detail: 'SAP Analytics Cloud training' },
  { id: 'digital-literacy', title: 'Digital Literacy', issuer: 'Rangsit University', detail: 'Digital literacy competency test' },
  { id: 'ict-ai-seminar', title: 'AI Seminar Participation', issuer: 'Department of Information and Communication Technology', detail: 'AI seminar participation' },
]

const certificateItems = certificates.map(certificate => ({
  title: certificate.title,
  image: asset('certificates/' + certificate.id),
  alt: certificate.title + ' awarded to Sai Saing Tun One',
}))

function Certificates() {
  const stackRef = useRef<CardSwapHandle>(null)
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const certificate = certificates[active]

  return (
    <section className="certificates section" id="certificates" aria-labelledby="certificates-title">
      <div className="container">
        <AnimatedContent className="certificate-heading" distance={20}>
          <p className="eyebrow">Achievements &amp; evidence</p>
          <h2 id="certificates-title">Certificates &amp; achievements<span>.</span></h2>
        </AnimatedContent>
        <div className="certificate-showcase">
          <div className="certificate-details">
            <TextReveal as="p" className="eyebrow">{active + 1} / {certificates.length}</TextReveal>
            <TextReveal as="h3">{certificate.title}</TextReveal>
            <TextReveal as="p">{certificate.issuer}</TextReveal>
            <TextReveal as="p" className="certificate-detail">{certificate.detail}</TextReveal>
            <div className="certificate-controls" aria-label="Certificate navigation">
              <button type="button" onClick={() => stackRef.current?.prev()} aria-label="Previous certificate"><Arrow direction="left" /></button>
              <button type="button" onClick={() => stackRef.current?.next()} aria-label="Next certificate"><Arrow direction="right" /></button>
            </div>
          </div>
          <div className="certificate-stack">
            <CardSwap ref={stackRef} items={certificateItems}
              width={640} height={465} cardDistance={45} verticalDistance={50} depth={75}
              skewAmount={3} visibleCards={3} delay={4500} autoplay={!reducedMotion}
              pauseOnHover draggable bounce={0.25} parallax={0.2} hoverSpread={0.06}
              dim={0.35} cardRadius={26} intro={!reducedMotion} onChange={setActive} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState('')
  const emailAddress = useRef<HTMLSpanElement>(null)
  const composeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(profile.email)
  const lineUrl = 'https://line.me/ti/p/~' + encodeURIComponent(profile.lineId)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus('Email address copied.')
    } catch {
      const selection = window.getSelection()
      if (selection && emailAddress.current) {
        const range = document.createRange()
        range.selectNodeContents(emailAddress.current)
        selection.removeAllRanges()
        selection.addRange(range)
        setCopyStatus('Email address selected. Use your device’s copy command.')
        return
      }
      setCopyStatus('Select the email address to copy it.')
    }
  }

  return (
    <section className="contact section container" id="contact" aria-labelledby="contact-title">
      <AnimatedContent distance={22} stagger={0.08}>
        <p className="eyebrow"><span className="status-dot" /> Open to opportunities</p>
        <h2 id="contact-title">Let’s connect<span>.</span></h2>
        <div className="contact-actions">
          <a href={composeUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">
            Email me <span className="sr-only">in Gmail</span><Arrow />
          </a>
          <div className="contact-email">
            <span ref={emailAddress} className="email">{profile.email}</span>
            <button type="button" className="email-copy" onClick={copyEmail}>Copy email</button>
          </div>
        </div>
        <p className="email-status" role="status">{copyStatus}</p>
        <ul className="socials">
          {profile.socials.map(([label, href]) => <li key={label}><External href={href}>{label}</External></li>)}
          <li><External href={lineUrl}>LINE · {profile.lineId}</External></li>
        </ul>
      </AnimatedContent>
    </section>
  )
}

function ProjectDetail({ item }: { item: typeof projects[number] }) {
  const next = projects[(projectIndex + 1) % projects.length]
  const coverImage = item.detailImage ?? item.image
  const isShortFilm = item.id === 'short-film-group-assignment'
  const isStudentUnion = item.id === 'ric-student-union'
  const isCreativeVideo = item.id === 'creative-video-winner'
  const isLanguageCenter = item.id === 'ric-language-center'
  const isDanceClub = item.id === 'finance-team-dance'
  const isAvCrew = item.id === 'av-crew'
  const hasCaseStudy = isShortFilm || isStudentUnion || isCreativeVideo || isLanguageCenter || isDanceClub || isAvCrew
  const backToVolunteer = isLanguageCenter || isDanceClub || isAvCrew
  const hasWorkflow = item.id === 'tokify-languages' || item.id === 'gemsheaven-jade'
  const hasArtwork = item.category === 'logo' || item.category === 'poster'
  return (
    <main id="main" className={['detail container', isShortFilm && 'film-detail', isStudentUnion && 'student-union-detail', isCreativeVideo && 'creative-video-detail', isLanguageCenter && 'language-center-detail', isDanceClub && 'dance-club-detail', isAvCrew && 'av-crew-detail'].filter(Boolean).join(' ')} tabIndex={-1}>
      <AnimatedContent as="a" href={siteUrl(backToVolunteer ? '#' + volunteerProjectsId : '#work')} className="back-link" trigger="mount" distance={8} duration={0.45}>
        <Arrow direction="left" /> {backToVolunteer ? 'Back to Volunteer Projects' : 'All work'}
      </AnimatedContent>
      <div className="project-heading">
        <p className="eyebrow">{categories[item.category].label}</p>
        <SplitText tag="h1" text={hasCaseStudy ? item.title : item.title + '.'} className="project-title-reveal" effect="rise" splitType={hasCaseStudy ? 'lines' : 'words'} trigger="load" delay={65} duration={0.7} textAlign="left" />
        <SplitText tag="p" text={item.detailSubtitle ?? item.summary} className="hero-lede" effect="fade" splitType="lines" trigger="load" delay={90} duration={0.65} textAlign="left" />
        {item.role && <dl className="project-meta"><div><dt>Role</dt><dd>{item.role}</dd></div>{item.context && <div><dt>Project</dt><dd>{item.context}</dd></div>}</dl>}
      </div>
      {item.liveUrl && <div className="actions"><LiveWebsiteButton href={item.liveUrl} /></div>}
      {coverImage && <AnimatedContent as="figure" className={'project-cover ' + item.category} trigger={hasCaseStudy ? 'mount' : 'scroll'} distance={24} duration={0.7}>
        <img src={asset(coverImage)} alt={item.detailImageAlt ?? item.imageAlt} />
      </AnimatedContent>}
      {isShortFilm && <ShortFilmCaseStudy />}
      {isStudentUnion && <StudentUnionCaseStudy />}
      {isCreativeVideo && <CreativeVideoCaseStudy videos={item.videos} />}
      {isLanguageCenter && <RicLanguageCenterCaseStudy videos={item.videos} />}
      {isDanceClub && <DanceClubCaseStudy />}
      {isAvCrew && <AvCrewCaseStudy />}
      {!hasCaseStudy && !hasArtwork && <MagicBento className="detail-sections project-detail-bento" columns={2} rowHeight={240} gap={24} radius={24}
        glowColor="#4ba8ff" theme="dark" enableBorderGlow enableSpotlight spotlightRadius={320}
        clickEffect enableTilt={false} enableMagnetism={false} textAutoHide={false}
        style={{ gridAutoRows: 'minmax(240px, auto)' }}
        items={item.sections.map(([title, body], index) => ({ id: title, content: <section className="detail-bento-copy">
          <span className="eyebrow" aria-hidden="true">0{index + 1} / {String(item.sections.length).padStart(2, '0')}</span>
          <SplitText tag="h2" text={title} effect="rise" splitType="words" delay={45} duration={0.6} textAlign="left" />
          <SplitText tag="p" text={body} effect="fade" splitType="lines" delay={70} duration={0.6} textAlign="left" />
        </section> }))} />}
      {!hasCaseStudy && (hasArtwork ? <ArtworkWorkflow projectId={item.id} stages={getArtworkStages(item)} logos={item.category === 'logo'} /> : hasWorkflow ? <ProjectWorkflow projectId={item.id as 'tokify-languages' | 'gemsheaven-jade'} /> : uxProcesses[item.id] ? <UXWorkflow projectId={item.id} /> : item.gallery && <section className="project-evidence" aria-labelledby="project-evidence-heading">
        <SplitText tag="h2" id="project-evidence-heading" text="Project evidence" effect="rise" splitType="words" delay={50} duration={0.65} textAlign="left" />
        <div className="project-gallery">
          {item.gallery.map(([name, caption]) => <AnimatedContent as="figure" key={name} distance={20}>
            <div className="project-image-frame"><img src={asset(name)} alt={caption} loading="lazy" /></div>
            <figcaption>{caption}</figcaption>
          </AnimatedContent>)}
        </div>
      </section>)}
      {item.category === 'ui' && <UXVisualSystem projectId={item.id} />}
      {(item.prototypes?.length || item.liveUrl || item.source) && <AnimatedContent as="nav" aria-label="Project links" className="project-links actions" distance={16} stagger={0.06}>
        {item.prototypes?.map(([title, href]) => (
          <HeroButton key={title} href={href} labels={[title, title.replace(/ prototype$/, ' preview')]} external primary={false} />
        ))}
        {item.liveUrl && <LiveWebsiteButton href={item.liveUrl} />}
        {item.source && <HeroButton href={sourceUrl(item.source, item.category === 'ui' ? 'design' : 'proto')} labels={['Original Figma project', 'Open in Figma']} external primary={false} />}
      </AnimatedContent>}
      <AnimatedContent distance={16}>
        <SpecularButton
          className="next-project"
          href={projectUrl(next.id)}
          radius={18}
          tint="var(--accent)"
          tintOpacity={0.09}
          textColor="var(--text)"
          lineColor="#56a5ff"
          baseColor="#284161"
        >
          <span><span className="eyebrow">Next project</span><strong>{next.title}</strong></span>
          <span className="round-arrow" aria-hidden="true"><Arrow direction="right" /></span>
        </SpecularButton>
      </AnimatedContent>
    </main>
  )
}

function App() {
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])
  if (project) document.title = project.title + ' — Sai Saing Tun One'
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      {project ? <ProjectDetail item={project} /> :
        path ? <main className="container section" id="main"><h1>Page not found</h1><a href={siteUrl('#work')} className="button button-primary">Back to work <Arrow /></a></main> :
        <main id="main" tabIndex={-1}><Hero /><Work /><About /><Skills /><Certificates /></main>}
      <div className="site-closing">
        <Contact />
        <AnimatedContent as="footer" className="container footer" distance={0} duration={0.45} threshold={0}><span>© {profile.name}</span><a href={project ? '#main' : '#home'}>Back to top ↑</a></AnimatedContent>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
