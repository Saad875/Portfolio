import { useEffect, useState } from 'react'
import Icon from './components/Icon.jsx'
import {
  profile, stats, skills, languages, experience, projects, education, certifications, playApps, company,
} from './data.js'
import { useScrollReveal, useGlobalRipple, useCountUp, useActiveSection } from './hooks.js'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'apps', label: 'Apps' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
const NAV_IDS = ['home', ...NAV.map((n) => n.id)]

function Nav() {
  const active = useActiveSection(NAV_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a href="#home" className="brand">Muhammad Saad</a>
        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`nav__link ${active === n.id ? 'is-active' : ''}`}
              style={{ '--i': i }}
              onClick={() => setOpen(false)}
            >
              <span className="nav__num">0{i + 1}</span>{n.label}
            </a>
          ))}
          <a href={profile.cv} download className="nav__cv" onClick={() => setOpen(false)}>
            Résumé <Icon name="download" size={14} />
          </a>
        </nav>
        <button
          className={`burger ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function Figure({ value, suffix, label }) {
  const [ref, v] = useCountUp(value, 1400)
  return (
    <div className="figure" ref={ref}>
      <span className="figure__num">{v}<sup>{suffix}</sup></span>
      <span className="figure__label">{label}</span>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="status in" style={{ '--d': '0.1s' }}>
            <span className="status__dot" /> Android Developer at {company.name}
          </p>
          <h1 className="hero__title">
            <span className="mask"><span className="in-up" style={{ '--d': '0.2s' }}>Building Android</span></span>
            <span className="mask"><span className="in-up" style={{ '--d': '0.3s' }}>apps people</span></span>
            <span className="mask"><span className="in-up" style={{ '--d': '0.4s' }}><em>actually</em> use.</span></span>
          </h1>
          <p className="hero__lead in" style={{ '--d': '0.6s' }}>
            I'm Muhammad Saad, a Kotlin developer in {profile.location}. I ship production apps with
            MVVM, Clean Architecture and Firebase, and I'm fast with AI-assisted development.
          </p>
          <div className="hero__actions in" style={{ '--d': '0.7s' }}>
            <a href="#apps" className="btn btn--solid ripple">
              See my apps <Icon name="arrow" size={16} />
            </a>
            <a href={`mailto:${profile.email}`} className="link-u">Get in touch</a>
          </div>
        </div>
        <figure className="portrait in-clip" style={{ '--d': '0.25s' }}>
          <img src={profile.photo} alt="Portrait of Muhammad Saad" width="640" height="640" />
          <figcaption>
            <span>Muhammad Saad</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>
      </div>
      <div className="wrap figures in" style={{ '--d': '0.85s' }}>
        {stats.map((s) => <Figure key={s.label} {...s} />)}
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Kotlin', 'MVVM', 'Clean Architecture', 'Room', 'Coroutines & Flow', 'Firebase', 'ML Kit', 'Gemini API', 'AdMob', 'Crashlytics', 'React', 'Cursor AI']
  const row = items.map((t) => <span key={t}>{t}<i>✦</i></span>)
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">{row}{row}</div>
    </div>
  )
}

function Head({ num, label, title }) {
  return (
    <header className="head">
      <p className="head__label" data-reveal><span>{num}</span>{label}</p>
      <h2 className="head__title" data-reveal style={{ '--delay': '80ms' }}>{title}</h2>
    </header>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="wrap split">
        <Head num="01" label="About" title={<>Clean code, <em>shipped</em> fast.</>} />
        <div className="about">
          <p className="about__big" data-reveal>{profile.summary}</p>
          <dl className="facts" data-reveal style={{ '--delay': '120ms' }}>
            <div><dt>Currently</dt><dd>{company.role}, {company.name}</dd></div>
            <div><dt>Education</dt><dd>BS Computer Science, UMT ({education.period})</dd></div>
            <div><dt>Based in</dt><dd>{profile.location}</dd></div>
            <div><dt>Languages</dt><dd>{languages.map((l) => `${l.name} (${l.level})`).join(', ')}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function Apps() {
  return (
    <section id="apps" className="section">
      <div className="wrap">
        <Head num="02" label="On Google Play" title={<>Apps with <em>20K+</em> downloads.</>} />
        <ul className="rows">
          {playApps.map((a, i) => (
            <li key={a.url} data-reveal style={{ '--delay': `${i * 90}ms` }}>
              <a href={a.url} target="_blank" rel="noreferrer" className="app-row ripple">
                <img className="app-row__icon" src={a.icon} alt="" width="64" height="64" loading="lazy" />
                <div className="app-row__main">
                  <h3>{a.name}</h3>
                  <p className="app-row__cat">{a.category}<span className="m-only"> · {a.downloads} downloads</span></p>
                </div>
                <p className="app-row__desc">{a.description}</p>
                <div className="app-row__dl"><strong>{a.downloads}</strong><span>downloads</span></div>
                <span className="app-row__go" aria-hidden="true"><Icon name="arrow" size={18} /></span>
              </a>
            </li>
          ))}
        </ul>
        <p className="built-at" data-reveal>
          All three built and shipped at <strong>{company.name}</strong>, {company.place.split(',')[0]} ·{' '}
          {company.since}
        </p>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Head num="03" label="Experience" title={<>Where I've <em>worked.</em></>} />
        <ol className="jobs">
          {experience.map((job) => (
            <li key={job.role} className="job" data-reveal>
              <p className="job__when">{job.period}</p>
              <div>
                <h3>{job.role}</h3>
                <p className="job__co">{job.company}{job.place ? `, ${job.place}` : ''}</p>
                <ul className="job__points">
                  {job.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
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
      <div className="wrap">
        <Head num="04" label="Selected projects" title={<>More things I've <em>built.</em></>} />
        <div className="cards">
          {projects.map((p, i) => (
            <article key={p.name} className="card ripple" data-reveal style={{ '--delay': `${(i % 2) * 100}ms` }}>
              <div className="card__top">
                <span className="card__num">0{i + 1}</span>
                <span className="card__year">{p.year}</span>
              </div>
              <p className="card__kind">{p.kind}</p>
              <h3>{p.name}</h3>
              <p className="card__desc">{p.description}</p>
              <p className="card__tags">{p.tags.join(' · ')}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <Head num="05" label="Skills" title={<>The <em>toolkit.</em></>} />
        <div className="skills">
          {skills.map((g, i) => (
            <div key={g.group} className="skill" data-reveal style={{ '--delay': `${(i % 3) * 80}ms` }}>
              <h3>{g.group}</h3>
              <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="edu" data-reveal>
          <div>
            <p className="edu__label">Education</p>
            <h3>{education.degree}</h3>
            <p>{education.school}, {education.place} · {education.period}</p>
            <p className="edu__muted">Coursework: {education.coursework.join(', ')}</p>
          </div>
          {certifications.map((c) => (
            <div key={c.name}>
              <p className="edu__label">Certification</p>
              <h3>{c.name}</h3>
              <p>{c.issuer} · {c.date}</p>
            </div>
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
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <p className="head__label" data-reveal><span>06</span>Contact</p>
        <h2 className="contact__title" data-reveal style={{ '--delay': '80ms' }}>
          Have an app in mind?<br /><em>Let's talk.</em>
        </h2>
        <div className="contact__row" data-reveal style={{ '--delay': '160ms' }}>
          <a href={`mailto:${profile.email}`} className="contact__mail link-u">{profile.email}</a>
          <button type="button" className="btn btn--line ripple" onClick={copy}>
            <Icon name={copied ? 'check' : 'copy'} size={16} /> {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <ul className="socials" data-reveal style={{ '--delay': '220ms' }}>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-u">LinkedIn ↗</a></li>
          <li><a href={profile.github} target="_blank" rel="noreferrer" className="link-u">GitHub ↗</a></li>
          <li><a href={profile.cv} download className="link-u">Résumé ↓</a></li>
        </ul>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p>© {new Date().getFullYear()} Muhammad Saad</p>
        <a href="#home" className="link-u">Back to top ↑</a>
      </div>
    </footer>
  )
}

export default function App() {
  useScrollReveal()
  useGlobalRipple()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Apps />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
