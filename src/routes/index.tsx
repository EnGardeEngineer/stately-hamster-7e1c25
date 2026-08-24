import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowDown,
  ArrowRight,
  Award,
  Building2,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Crosshair,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: AtlasLionsHome,
})

type HubCategory = 'schools' | 'private' | 'flagship'

const hubDetails: Record<
  HubCategory,
  {
    kicker: string
    title: string
    description: string
    meta: string
  }
> = {
  schools: {
    kicker: 'Active scholastic hubs',
    title: 'Training inside the school day',
    description:
      'Operating in partner schools across Manhattan and Brooklyn. Registration is limited to currently enrolled students at each respective campus.',
    meta: 'In-day PE · After-school enrichment',
  },
  private: {
    kicker: 'Private coaching',
    title: 'Precision training, by appointment',
    description:
      'Elite one-on-one technical and tactical training at select premium athletic spaces across Manhattan.',
    meta: 'Manhattan · Individual development plans',
  },
  flagship: {
    kicker: 'Flagship academy',
    title: 'A permanent home is taking shape',
    description:
      'Our New York City flagship is currently in development for 2027, uniting the full Atlas Lions pathway under one roof.',
    meta: 'Launching 2027 · Founding access ahead',
  },
}

const programs = [
  {
    number: '01',
    icon: GraduationCap,
    title: 'Scholastic Residencies',
    label: 'Schools',
    description:
      'We bring the piste directly to the classroom, integrating into NYC physical education and after-school enrichment with safe, disciplined, high-energy instruction.',
    details: ['All equipment provided', 'DOE-ready program model', 'On-campus instruction'],
  },
  {
    number: '02',
    icon: Crosshair,
    title: 'Elite Private Coaching',
    label: 'Athletes',
    description:
      'One-on-one technical and tactical development for ambitious competitors, tailored to biomechanics, tournament goals, and the collegiate athletic pipeline.',
    details: ['Individual performance plan', 'Technical bout analysis', 'Competition preparation'],
  },
  {
    number: '03',
    icon: Zap,
    title: 'Intensive Camps',
    label: 'Performance',
    description:
      'School-holiday, winter-break, and summer camps designed to sharpen strip tactics, physical conditioning, and tournament psychological readiness.',
    details: ['High-performance training blocks', 'National-stage preparation', 'Tactical and mental conditioning'],
  },
]

// CLEANED AND CONSOLIDATED ROSTER DATA
const staff = [
  {
    tier: 'Tier 01 · Founding leadership',
    name: 'Yehia Ellis',
    role: 'Co-Founder · Épée Program',
    credentials: ['Founding Director', 'Moroccan National Team', 'World Cup & Grand Prix Competitor', 'NCAA Division I Athlete'],
    image: '/images/yehia-ellis.jpg',
    featured: 'founder',
  },
  {
    tier: 'Tier 01 · Founding leadership',
    name: 'Sarah Ellis',
    role: 'Co-Founder · Athlete Development',
    credentials: ['Founding Director', 'Moroccan National Team', 'Full Athletic Scholarship', 'NCAA Division I Athlete'],
    image: '/images/sarah-ellis.jpg',
    featured: 'founder',
  },
  {
    tier: 'Tier 02 · Marquee talent',
    name: 'Mohammed Elsayed',
    role: 'Olympic Medalist · Épée',
    credentials: ['3x NCAA Champion', '10x World Champion', 'Current #1 in the World'],
    image: '/images/mohammed-elsayed.jpg',
    featured: 'marquee',
  }
]

const developmentStaff = [
  {
    tier: 'Tier 03 · International Competitors',
    name: 'Eduardo Duarte',
    role: 'Team Portugal / LIU',
    credentials: ['Collegiate & International Competitor'],
    image: '/images/eduardo-duarte.jpg',
    featured: 'standard',
  },
  {
    tier: 'Tier 03 · International Competitors',
    name: 'Omari Smoak',
    role: 'Team USA / St. Johns',
    credentials: ['Collegiate & International Competitor'],
    image: '/images/omari-smoak.jpg',
    featured: 'standard',
  },
  {
    tier: 'Tier 03 · International Competitors',
    name: 'Baron Chang',
    role: 'Team Taiwan / LIU',
    credentials: ['Collegiate & International Competitor'],
    image: '/images/baron-chang.jpg',
    featured: 'standard',
  },
  {
    tier: 'Tier 03 · International Competitors',
    name: 'Costanza Greggi',
    role: 'LIU / NCAA',
    credentials: ['Collegiate & International Competitor'],
    image: '/images/costanza-greggi.jpg',
    featured: 'standard',
  },
  {
    tier: 'Tier 04 · Nationally Competitive',
    name: 'Francesca Perez',
    role: 'LIU',
    credentials: ['NCAA & Nationally Competitive Coach'],
    image: '/images/francesca-perez.jpg',
    featured: 'standard',
  },
  {
    tier: 'Tier 04 · Nationally Competitive',
    name: 'Mindi Sherpa',
    role: 'LIU',
    credentials: ['NCAA & Nationally Competitive Coach'],
    image: '/images/mindi-sherpa.jpg',
    featured: 'standard',
  },
  {
    tier: 'Tier 04 · Nationally Competitive',
    name: 'Cameron Daniel',
    role: 'NYU',
    credentials: ['NCAA & Nationally Competitive Coach'],
    image: '/images/cameron-daniel.jpg',
    featured: 'standard',
  }
]

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}

async function submitNetlifyForm(formName: string, fields: Record<string, string>) {
  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm({ 'form-name': formName, ...fields }),
  })

  if (!response.ok) throw new Error('Submission failed')
}

function AtlasLionsHome() {
  const [activeHub, setActiveHub] = useState<HubCategory>('schools')
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [waitlistState, setWaitlistState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  const openModal = () => {
    setMenuOpen(false)
    setModalOpen(true)
  }

  const handleWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setWaitlistState('loading')

    try {
      await submitNetlifyForm('corporate-waitlist', {
        email: String(formData.get('email') ?? ''),
      })
      form.reset()
      setWaitlistState('success')
    } catch {
      setWaitlistState('error')
    }
  }

  return (
    <main>
      <header className="site-nav">
        <a className="brand-lockup" href="#top" aria-label="Atlas Lions Fencing home">
          <span className="brand-mark">AL</span>
          <span>
            <strong>Atlas Lions</strong>
            <small>Fencing · New York City</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#locations">Locations</a>
          <a href="#programs">Programs</a>
          <a href="#coaches">Coaches</a>
          <a href="#corporate">Corporate</a>
        </nav>

        <button className="nav-cta desktop-cta" onClick={openModal}>
          Host a program <ArrowRight size={16} />
        </button>
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {['locations', 'programs', 'coaches', 'corporate'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button className="nav-cta" onClick={openModal}>Host a program</button>
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <img src="/images/hero-fencing.jpg" alt="Elite fencers competing under arena lights" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-content page-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> The new standard in New York City fencing</p>
            <h1>Forging champions <em>across New York City.</em></h1>
            <p className="hero-subtext">
              Premium fencing instruction led by elite athletes. We bring high-performance training directly to New York’s top scholastic hubs, with our Flagship Academy in development.
            </p>
            <div className="hero-actions">
              <a className="button button-gold" href="#locations">Find a training hub <MapPin size={18} /></a>
              <button className="button button-outline" onClick={openModal}>Host a program <ArrowRight size={18} /></button>
            </div>
          </div>
          <div className="hero-proof">
            <div><strong>NYC</strong><span>Citywide training model</span></div>
            <div><strong>D1</strong><span>Collegiate pedigree</span></div>
            <div><strong>2027</strong><span>Flagship in development</span></div>
          </div>
        </div>
        <a className="scroll-cue" href="#locations"><span>Explore the academy</span><ArrowDown size={18} /></a>
      </section>

      <section className="academy section-dark" id="locations">
        <div className="page-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow"><span /> Our distributed academy</p>
              <h2>A citywide footprint.<br /><em>One standard.</em></h2>
            </div>
            <p>
              Great fencers are built by great coaches, not four walls. Our exclusive Scholastic Residencies give students Division I-level coaching without leaving campus.
            </p>
          </div>

          <div className="academy-layout">
            <div className="map-panel" aria-label="Interactive New York City academy map">
              <div className="map-label map-label-bronx">The Bronx</div>
              <div className="map-label map-label-manhattan">Manhattan</div>
              <div className="map-label map-label-queens">Queens</div>
              <div className="map-label map-label-brooklyn">Brooklyn</div>
              <div className="map-label map-label-staten">Staten Island</div>
              <svg className="borough-map" viewBox="0 0 700 620" aria-hidden="true">
                <path className="borough-shape" d="M293 41 348 29 374 89 345 168 309 230 278 302 258 405 223 428 201 389 223 298 242 222 273 154Z" />
                <path className="borough-shape" d="m375 116 142-10 105 79-37 93-122 7-90-44-38-70Z" />
                <path className="borough-shape" d="m294 344 125-44 157 29-17 91-87 43-76 108-147-43-51-87Z" />
                <path className="borough-shape" d="m189 70 84-14 17 95-61 63-56-47Z" />
                <path className="borough-shape" d="m72 441 78-43 62 47-16 80-99 34-45-59Z" />
                <path className="river-line" d="M323 29c-20 100-17 192-61 282-26 54-48 141-17 241" />
              </svg>

              <button className={`map-pin school-pin pin-one ${activeHub === 'schools' ? 'active' : ''}`} onClick={() => setActiveHub('schools')} aria-label="Manhattan scholastic hub"><span /></button>
              <button className={`map-pin school-pin pin-two ${activeHub === 'schools' ? 'active' : ''}`} onClick={() => setActiveHub('schools')} aria-label="Brooklyn scholastic hub"><span /></button>
              <button className={`map-pin private-pin pin-three ${activeHub === 'private' ? 'active' : ''}`} onClick={() => setActiveHub('private')} aria-label="Manhattan private coaching"><span /></button>
              <button className={`map-pin flagship-pin pin-four ${activeHub === 'flagship' ? 'active' : ''}`} onClick={() => setActiveHub('flagship')} aria-label="Future flagship academy"><span /></button>

              <div className="map-status"><span className="live-dot" /> Academy network · New York City</div>
            </div>

            <aside className="map-legend">
              <p className="legend-title">Select a pathway</p>
              {(Object.keys(hubDetails) as HubCategory[]).map((key, index) => (
                <button key={key} className={`legend-tab ${activeHub === key ? 'active' : ''}`} onClick={() => setActiveHub(key)}>
                  <span className={`legend-icon icon-${key}`}>{index === 0 ? <Building2 size={18} /> : index === 1 ? <Target size={18} /> : <Sparkles size={18} />}</span>
                  <span><small>0{index + 1}</small>{hubDetails[key].kicker}</span>
                  <ChevronRight size={18} />
                </button>
              ))}
              <div className="legend-detail" key={activeHub}>
                <p>{hubDetails[activeHub].kicker}</p>
                <h3>{hubDetails[activeHub].title}</h3>
                <span>{hubDetails[activeHub].description}</span>
                <strong><MapPin size={15} /> {hubDetails[activeHub].meta}</strong>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="programs section-light" id="programs">
        <div className="page-shell">
          <div className="section-heading split-heading light-heading">
            <div>
              <p className="eyebrow"><span /> High-performance pathways</p>
              <h2>Built for the next<br /><em>competitive level.</em></h2>
            </div>
            <p>Every program is designed as part of a long-term athlete pathway—from the first salute to the national strip and collegiate recruitment.</p>
          </div>
          <div className="program-grid">
            {programs.map((program) => {
              const Icon = program.icon
              return (
                <article className="program-card" key={program.number}>
                  <div className="card-topline"><span>{program.number}</span><span>{program.label}</span></div>
                  <div className="program-icon"><Icon size={28} /></div>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <ul>{program.details.map((detail) => <li key={detail}><Check size={15} /> {detail}</li>)}</ul>
                  <button onClick={openModal}>Request program details <ArrowRight size={16} /></button>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="leadership section-light" id="coaches">
        <div className="page-shell">
          <div className="section-heading centered-heading light-heading">
            <p className="eyebrow"><span /> Leadership & pedigree <span /></p>
            <h2>Engineered by athletes.<br /><em>Built for competitors.</em></h2>
            <p>Olympic experience. National Team discipline. Collegiate excellence. Our coaching hierarchy gives every athlete access to proven competitive intelligence.</p>
          </div>

          <div className="trust-bar">
            <div><ShieldCheck /><span><strong>NYC DOE</strong>Fingerprint-ready standards</span></div>
            <div><CircleCheck /><span><strong>Fully protected</strong>Liability-insured model</span></div>
            <div><Award /><span><strong>SafeSport</strong>Aligned coaching culture</span></div>
          </div>

          <div className="staff-pyramid">
            <div className="founder-grid">
              {staff.slice(0, 2).map((person, index) => <CoachCard key={`${person.name}-${index}`} person={person} />)}
            </div>
            <CoachCard person={staff[2]} />
            
            <div className="development-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
              {developmentStaff.map((person, index) => (
                <CoachCard key={`${person.name}-${index}`} person={person} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="corporate" id="corporate">
        <img src="/images/team-fencing.jpg" alt="Fencing team preparing together" />
        <div className="corporate-overlay" />
        <div className="page-shell corporate-content">
          <div className="corporate-mark"><Swords size={38} /></div>
          <p className="eyebrow"><span /> Atlas Lions Executive</p>
          <h2>The ultimate executive<br /><em>team-building experience.</em></h2>
          <div className="launch-pill"><span /> Launching 2027</div>
          <p className="corporate-copy">
            Fencing is the ultimate exercise in strategic agility, lightning-fast risk assessment, and mental focus. Atlas Lions Executive brings premium retreats, team workshops, and private clinics to high-performance corporate cultures.
          </p>

          {waitlistState === 'success' ? (
            <div className="waitlist-success"><CircleCheck size={24} /><span><strong>You’re on the list.</strong> Executive launch updates are headed your way.</span></div>
          ) : (
            <form className="waitlist-form" name="corporate-waitlist" onSubmit={handleWaitlist}>
              <input type="hidden" name="form-name" value="corporate-waitlist" />
              <label className="sr-only" htmlFor="corporate-email">Corporate email address</label>
              <Mail size={19} />
              <input id="corporate-email" name="email" type="email" placeholder="Enter corporate email address" required />
              <button type="submit" disabled={waitlistState === 'loading'}>{waitlistState === 'loading' ? 'Joining…' : 'Join executive waitlist'} <ArrowRight size={17} /></button>
            </form>
          )}
          {waitlistState === 'error' && <p className="form-error">Something went wrong. Please try again or email our team directly.</p>}
          <small className="privacy-note">No noise. Only launch updates and priority access.</small>
        </div>
      </section>

      <footer className="footer">
        <div className="page-shell footer-grid">
          <div className="footer-brand">
            <a className="brand-lockup" href="#top"><span className="brand-mark">AL</span><span><strong>Atlas Lions</strong><small>Fencing · New York City</small></span></a>
            <p>Building New York City’s next generation of disciplined, strategic, and fearless competitors.</p>
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <a href="mailto:director@atlaslions.com">director@atlaslions.com</a>
            <span>New York City, NY</span>
            <small><Clock3 size={14} /> School partnership inquiries processed within 48 business hours.</small>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#locations">Academy locations</a><a href="#programs">Training programs</a><a href="#coaches">Coaching pedigree</a><a href="#corporate">Atlas Lions Executive</a>
          </div>
          <div className="footer-column">
            <h3>Standards</h3>
            <button onClick={openModal}>DOE vendor documentation</button><button onClick={openModal}>Participant waivers</button><button onClick={openModal}>SafeSport reporting</button><button onClick={openModal}>Lesson policy</button>
          </div>
          <div className="member-badge"><Trophy size={24} /><span>USA Fencing<small>Member club pathway</small></span></div>
        </div>
        <div className="page-shell footer-bottom"><span>© 2026 Atlas Lions Fencing. All rights reserved.</span><span>Photography: Augusto Bizzi / Wikimedia Commons</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {modalOpen && <HostProgramModal onClose={() => setModalOpen(false)} />}
    </main>
  )
}

// THIS COMPONENT RENDERS THE CARDS FOR BOTH DATA ARRAYS
function CoachCard({ person }: { person: any }) {
  return (
    <article className={`coach-card coach-${person.featured}`}>
      <img src={person.image} alt={`${person.name}, ${person.role}`} />
      <div className="coach-shade" />
      <div className="coach-tier">{person.tier}</div>
      <div className="coach-info">
        <p>{person.role}</p>
        <h3>{person.name}</h3>
        <div>{person.credentials.map((credential: string) => <span key={credential}>{credential}</span>)}</div>
      </div>
    </article>
  )
}

function HostProgramModal({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setState('loading')

    try {
      await submitNetlifyForm('school-program-inquiry', {
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        school: String(formData.get('school') ?? ''),
        role: String(formData.get('role') ?? ''),
        students: String(formData.get('students') ?? ''),
        message: String(formData.get('message') ?? ''),
      })
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Close inquiry form"><X /></button>
        <div className="modal-intro">
          <p className="eyebrow"><span /> School partnerships</p>
          <h2 id="modal-title">Bring elite fencing to your campus.</h2>
          <p>Tell us about your school and program goals. Our partnerships team responds within 48 business hours.</p>
          <div className="modal-points">
            <span><ShieldCheck /> Professional, safety-led delivery</span>
            <span><Swords /> Equipment supplied on-site</span>
            <span><Users /> Programs shaped to your student body</span>
          </div>
        </div>

        {state === 'success' ? (
          <div className="modal-success">
            <div><CircleCheck size={34} /></div>
            <h3>Inquiry received.</h3>
            <p>Thank you for considering Atlas Lions. A school partnerships lead is reviewing your request.</p>
            <button className="button button-gold" onClick={onClose}>Return to the academy</button>
          </div>
        ) : (
          <form className="inquiry-form" name="school-program-inquiry" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="school-program-inquiry" />
            <label>Full name<input name="name" type="text" autoFocus required /></label>
            <label>Work email<input name="email" type="email" required /></label>
            <label className="full-field">School or organization<input name="school" type="text" required /></label>
            <label>Your role<select name="role" defaultValue="" required><option value="" disabled>Select role</option><option>Principal / administrator</option><option>Athletic director</option><option>PE department</option><option>Parent association</option><option>Corporate team lead</option><option>Other</option></select></label>
            <label>Estimated students<select name="students" defaultValue=""><option value="">Not sure yet</option><option>Fewer than 20</option><option>20–50</option><option>51–100</option><option>100+</option></select></label>
            <label className="full-field">What are you looking to build?<textarea name="message" rows={4} placeholder="Share your timeline, age group, and program goals." required /></label>
            {state === 'error' && <p className="form-error full-field">We couldn’t send this inquiry. Please retry or email director@atlaslions.com.</p>}
            <button className="button button-gold full-field" type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Sending inquiry…' : 'Submit partnership inquiry'} <ArrowRight size={17} /></button>
          </form>
        )}
      </div>
    </div>
  )
}
