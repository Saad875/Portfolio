import { useEffect, useState } from 'react'
import Icon from './components/Icon.jsx'
import Embers from './components/Embers.jsx'
import {
  profile, stats, skills, languages, experience, projects, education, certifications, playApps, company,
} from './data.js'
import {
  useScrollReveal, useGlobalRipple, useTypewriter, useCountUp, tiltHandlers,
  useActiveSection, useScrollProgress,
} from './hooks.js'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'apps', label: 'Apps' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
const NAV_IDS = ['home', ...NAV.map((n) => n.id)]

function Loader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`loader ${done ? 'loader--done' : ''}`} aria-hidden="true">
      <div className="loader__mark">
        <span>M</span><span>S</span>
      </div>
      <div className="loader__bar"><i /></div>
    </div>
  )
}

function Nav() {
  const active = useActiveSection(NAV_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="brand" aria-label="Muhammad Saad, home">
          <span className="brand__mark">MS</span>
          <span className="brand__name">Muhammad<b>.</b>Saad</span>
        </a>
        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`nav__link ${active === n.id ? 'is-active' : ''}`}
              style={{ '--i': i }}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a href={profile.cv} download className="btn btn--primary btn--sm ripple nav__cta" onClick={() => setOpen(false)}>
            <Icon name="download" size={16} /> Resume
          </a>
        </nav>
        <button
          className={`burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const typed = useTypewriter(profile.roles)
  const tilt = tiltHandlers(5)
  return (
    <section id="home" className="hero">
      <Embers />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero-in" style={{ '--d': '1.2s' }}>
            <span className="pulse-dot" /> Android Developer at {company.name} · {profile.location}
          </p>
          <h1 className="hero__title">
            <span className="hero-in line" style={{ '--d': '1.3s' }}>Hi, I'm</span>
            <span className="hero-in line gradient-text" style={{ '--d': '1.42s' }}>
              {profile.name}
            </span>
          </h1>
          <p className="hero__role hero-in" style={{ '--d': '1.55s' }}>
            <span className="typed">{typed}</span><span className="caret" />
          </p>
          <p className="hero__lead hero-in" style={{ '--d': '1.68s' }}>
            I build production Android apps in Kotlin with MVVM and Clean Architecture, ship faster with
            AI-assisted development, and bring a React front-end background to every interface.
          </p>
          <div className="hero__actions hero-in" style={{ '--d': '1.8s' }}>
            <a href="#projects" className="btn btn--primary ripple">
              View my work <Icon name="arrow" size={18} />
            </a>
            <a href={profile.cv} download className="btn btn--ghost ripple">
              <Icon name="download" size={18} /> Download CV
            </a>
          </div>
          <div className="hero__social hero-in" style={{ '--d': '1.92s' }}>
            <a href={profile.github} target="_blank" rel="noreferrer" className="social ripple" aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social ripple" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a href={`mailto:${profile.email}`} className="social ripple" aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </div>

        <div className="hero__visual hero-in" style={{ '--d': '1.35s' }}>
          <div className="portrait hoverable" {...tilt}>
            <div className="portrait__ring" />
            <div className="portrait__frame">
              <img src={profile.photo} alt="Portrait of Muhammad Saad" width="640" height="640" />
              <div className="portrait__shine" />
            </div>
            <div className="chip-float chip-float--1">
              <Icon name="android" size={18} /> Kotlin · Android
            </div>
            <div className="chip-float chip-float--2">
              <Icon name="download" size={18} /> 20K+ Play downloads
            </div>
            <div className="chip-float chip-float--3">
              <Icon name="layout" size={18} /> React
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span className="scroll-cue__mouse"><i /></span>
        <span>Scroll</span>
      </a>
    </section>
  )
}

function SectionHead({ kicker, title, sub }) {
  return (
    <div className="section-head">
      <p className="kicker" data-reveal="up">{kicker}</p>
      <h2 className="section-title" data-reveal="up" style={{ '--delay': '80ms' }}>{title}</h2>
      {sub && <p className="section-sub" data-reveal="up" style={{ '--delay': '160ms' }}>{sub}</p>}
    </div>
  )
}

function Stat({ value, suffix, label, i }) {
  const [ref, v] = useCountUp(value)
  return (
    <div className="stat card spotlight hoverable" data-reveal="zoom" style={{ '--delay': `${i * 90}ms` }} ref={ref}>
      <span className="stat__num">{v}{suffix}</span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead kicker="About me" title={<>Clean code, <span className="gradient-text">shipped fast</span></>} />
        <div className="about">
          <div className="about__text">
            <p data-reveal="left">{profile.summary}</p>
            <p data-reveal="left" style={{ '--delay': '100ms' }}>
              At work I own features from R&amp;D and UI to QA-ready builds, across utility, productivity and AI apps,
              with localization, crash reporting and monetization built in.
            </p>
            <ul className="about__facts" data-reveal="left" style={{ '--delay': '200ms' }}>
              <li><Icon name="briefcase" size={18} /> Junior Android Developer at Trusted Technologies</li>
              <li><Icon name="cap" size={18} /> BS Computer Science, UMT Lahore (2021–2025)</li>
              <li><Icon name="pin" size={18} /> Based in {profile.location}</li>
              <li><Icon name="globe" size={18} /> English, Urdu, Turkish</li>
            </ul>
          </div>
          <div className="stats">
            {stats.map((s, i) => <Stat key={s.label} {...s} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function PlayApps() {
  return (
    <section id="apps" className="section section--alt">
      <div className="container">
        <SectionHead
          kicker="Live on Google Play"
          title={<>Apps people <span className="gradient-text">actually use</span></>}
          sub="Published Android apps I built in Kotlin, with 20K+ downloads between them."
        />
        <div className="play-apps">
          {playApps.map((a, i) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="play-app card spotlight hoverable ripple"
              data-reveal="up"
              style={{ '--delay': `${i * 120}ms` }}
            >
              <div className="play-app__top">
                <img className="play-app__icon" src={a.icon} alt={`${a.name} app icon`} width="72" height="72" loading="lazy" />
                <div className="play-app__dl">
                  <strong>{a.downloads}</strong>
                  <span>downloads</span>
                </div>
              </div>
              <p className="project__kind">{a.category}</p>
              <h3 className="play-app__name">{a.name}</h3>
              <p className="play-app__desc">{a.description}</p>
              <ul className="tags tags--sm">
                {a.features.map((f) => <li key={f} className="tag">{f}</li>)}
              </ul>
              <span className="play-app__cta">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="currentColor" d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Zm11.3 11.3 2.4 2.4-11.2 6.4 8.8-8.8Zm3.6-3.6 2.6 1.5c.8.5.8 1.6 0 2.1l-2.6 1.5-2.7-2.6 2.7-2.5ZM6.1 2.1l11.2 6.4-2.4 2.4-8.8-8.8Z" />
                </svg>
                Get it on Google Play
                <Icon name="arrow" size={16} />
              </span>
            </a>
          ))}
        </div>
        <div className="company card spotlight hoverable" data-reveal="up">
          <span className="icon-badge icon-badge--lg"><Icon name="briefcase" size={26} /></span>
          <div className="company__text">
            <p className="company__label">Built at</p>
            <h3>{company.name}</h3>
            <p className="company__meta">{company.role} · {company.place} · {company.since}</p>
          </div>
          <p className="company__note">
            I build and ship these apps end to end in Kotlin and XML, from R&amp;D and UI to QA-ready releases,
            with Firebase, AdMob, Crashlytics and localization built in.
          </p>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead
          kicker="Skills"
          title={<>The <span className="gradient-text">toolkit</span> I work with</>}
          sub="From native Android to the web, plus the AI tools that help me ship faster."
        />
        <div className="skills">
          {skills.map((g, i) => (
            <article
              key={g.group}
              className="skill-card card spotlight hoverable"
              data-reveal="up"
              style={{ '--delay': `${(i % 3) * 110}ms` }}
            >
              <div className="skill-card__head">
                <span className="icon-badge"><Icon name={g.icon} size={22} /></span>
                <h3>{g.group}</h3>
              </div>
              <ul className="tags">
                {g.items.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="langs card" data-reveal="up">
          <h3><Icon name="globe" size={20} /> Languages</h3>
          <div className="langs__list">
            {languages.map((l) => (
              <div key={l.name} className="lang">
                <div className="lang__top"><span>{l.name}</span><em>{l.level}</em></div>
                <div className="bar"><i style={{ '--w': `${l.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <SectionHead kicker="Experience" title={<>Where I've <span className="gradient-text">worked</span></>} />
        <ol className="timeline">
          {experience.map((job, i) => (
            <li key={job.role} className="timeline__item" data-reveal={i % 2 ? 'right' : 'left'}>
              <span className={`timeline__dot ${job.current ? 'is-current' : ''}`} />
              <article className="job card spotlight hoverable">
                <header className="job__head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="job__co">
                      {job.company}{job.place ? `, ${job.place}` : ''}
                    </p>
                  </div>
                  <span className={`pill ${job.current ? 'pill--live' : ''}`}>{job.period}</span>
                </header>
                <ul className="job__points">
                  {job.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <ul className="tags tags--sm">
                  {job.tags.map((t) => <li key={t} className="tag">{t}</li>)}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead
          kicker="Projects"
          title={<>Things I've <span className="gradient-text">built</span></>}
          sub="More work from Trusted Technologies, my final year project, and earlier web work."
        />
        <div className="projects">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`project card spotlight hoverable ripple ${p.featured ? 'project--featured' : ''}`}
              data-reveal="up"
              style={{ '--delay': `${(i % 3) * 110}ms` }}
            >
              <div className="project__top">
                <span className="icon-badge icon-badge--lg"><Icon name={p.icon} size={26} /></span>
                <span className="project__year">{p.year}</span>
              </div>
              <p className="project__kind">{p.kind}</p>
              <h3 className="project__name">{p.name}</h3>
              <p className="project__desc">{p.description}</p>
              <ul className="tags tags--sm">
                {p.tags.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section section--alt">
      <div className="container">
        <SectionHead kicker="Education" title={<>Learning &amp; <span className="gradient-text">credentials</span></>} />
        <div className="edu">
          <article className="edu__card card spotlight hoverable" data-reveal="left">
            <span className="icon-badge icon-badge--lg"><Icon name="cap" size={26} /></span>
            <div>
              <span className="pill">{education.period}</span>
              <h3>{education.degree}</h3>
              <p className="edu__school">{education.school}, {education.place}</p>
              <p className="edu__label">Relevant coursework</p>
              <ul className="tags tags--sm">
                {education.coursework.map((c) => <li key={c} className="tag">{c}</li>)}
              </ul>
            </div>
          </article>
          {certifications.map((c) => (
            <article key={c.name} className="edu__card card spotlight hoverable" data-reveal="right">
              <span className="icon-badge icon-badge--lg"><Icon name="award" size={26} /></span>
              <div>
                <span className="pill">{c.date}</span>
                <h3>{c.name}</h3>
                <p className="edu__school">{c.issuer}</p>
                <p className="edu__label">Certification</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  const links = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'linkedin', label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin },
    { icon: 'github', label: 'GitHub', value: profile.githubLabel, href: profile.github },
    { icon: 'pin', label: 'Location', value: profile.location },
  ]
  return (
    <section id="contact" className="section contact">
      <div className="contact__glow" />
      <div className="container">
        <SectionHead
          kicker="Contact"
          title={<>Let's build something <span className="gradient-text">great</span></>}
          sub="Have an Android or web project, or a role in mind? My inbox is open."
        />
        <div className="contact__grid">
          {links.map((l, i) => {
            const Tag = l.href ? 'a' : 'div'
            const ext = l.href && l.href.startsWith('http')
            return (
              <Tag
                key={l.label}
                className="contact-card card spotlight hoverable ripple"
                data-reveal="up"
                style={{ '--delay': `${i * 90}ms` }}
                {...(l.href ? { href: l.href } : {})}
                {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="icon-badge"><Icon name={l.icon} size={22} /></span>
                <span className="contact-card__label">{l.label}</span>
                <span className="contact-card__value">{l.value}</span>
              </Tag>
            )
          })}
        </div>
        <div className="contact__cta" data-reveal="zoom">
          <a href={`mailto:${profile.email}`} className="btn btn--primary btn--lg ripple">
            <Icon name="mail" size={20} /> Say hello
          </a>
          <button type="button" className="btn btn--ghost btn--lg ripple" onClick={copy}>
            <Icon name={copied ? 'check' : 'copy'} size={20} /> {copied ? 'Email copied' : 'Copy email'}
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React.</p>
        <div className="footer__social">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" size={18} /></a>
        </div>
      </div>
    </footer>
  )
}

function ProgressAndTop() {
  const p = useScrollProgress()
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />
      <a href="#home" className={`to-top ripple ${p > 0.08 ? 'is-shown' : ''}`} aria-label="Back to top">
        <svg viewBox="0 0 48 48" className="to-top__ring" aria-hidden="true">
          <circle cx="24" cy="24" r="21" pathLength="100" style={{ strokeDashoffset: 100 - p * 100 }} />
        </svg>
        <Icon name="up" size={18} />
      </a>
    </>
  )
}

export default function App() {
  useScrollReveal()
  useGlobalRipple()
  return (
    <>
      <Loader />
      <ProgressAndTop />
      <Nav />
      <main>
        <Hero />
        <About />
        <PlayApps />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
