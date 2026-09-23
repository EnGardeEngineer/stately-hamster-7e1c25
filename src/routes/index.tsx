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
import { FormEvent, useEffect, useRef, useState } from 'react'
import { BOROUGHS, BOROUGH_LABELS, MAP_VIEWBOX, PIN_POINTS } from '../nycBoroughs'

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
      'Operating in partner schools across Brooklyn, the Bronx and Manhattan, with Staten Island coming soon. Registration is limited to currently enrolled students at each respective campus.',
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

// Map highlights follow the hub descriptions above: schools in Brooklyn, the Bronx and Manhattan, private coaching in Manhattan.
const litBoroughs: Record<HubCategory, string[]> = {
  schools: ['manhattan', 'brooklyn', 'bronx'],
  private: ['manhattan'],
  flagship: [],
}

const mapPins: { hub: HubCategory; point: keyof typeof PIN_POINTS; label: string; soon?: boolean }[] = [
  { hub: 'schools', point: 'schoolBrooklyn1', label: 'Brooklyn scholastic hub' },
  { hub: 'schools', point: 'schoolBrooklyn2', label: 'Brooklyn scholastic hub' },
  { hub: 'schools', point: 'schoolBrooklyn3', label: 'Brooklyn scholastic hub' },
  { hub: 'schools', point: 'schoolBrooklyn4', label: 'Brooklyn scholastic hub' },
  { hub: 'schools', point: 'schoolBronxNorth', label: 'Bronx scholastic hub' },
  { hub: 'schools', point: 'schoolBronxSouth', label: 'Bronx scholastic hub' },
  { hub: 'schools', point: 'schoolManhattan', label: 'Manhattan scholastic hub' },
  { hub: 'schools', point: 'schoolStatenSoon', label: 'Staten Island scholastic hub, coming soon', soon: true },
  { hub: 'private', point: 'privateManhattan', label: 'Manhattan private coaching' },
]

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
    imagePosition: 'center top',
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
    credentials: ['World #1 · Men’s Épée (FIE)', 'Paris 2024 Olympic Bronze Medalist', '2026 World Championships Team Bronze'],
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
    name: 'Camron Daniel',
    role: 'NYU',
    credentials: ['NCAA & Nationally Competitive Coach'],
    image: '/images/camron-daniel.jpg',
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
            <div className="map-panel">
              <svg className="borough-map" viewBox={MAP_VIEWBOX} role="img" aria-label="Map of New York City's five boroughs showing Atlas Lions locations">
                {BOROUGHS.map((borough) => (
                  <path key={borough.id} className={`borough-shape ${litBoroughs[activeHub].includes(borough.id) ? 'lit' : ''}`} d={borough.d} />
                ))}
                {BOROUGHS.map((borough) => {
                  const [x, y] = BOROUGH_LABELS[borough.id]
                  return (
                    <text key={borough.id} className={`borough-label ${litBoroughs[activeHub].includes(borough.id) ? 'lit' : ''}`} x={x} y={y} transform={borough.id === 'manhattan' ? `rotate(-62 ${x} ${y})` : undefined}>
                      {borough.name}
                    </text>
                  )
                })}
                {mapPins.map((pin) => {
                  const [x, y] = PIN_POINTS[pin.point]
                  return (
                    <g
                      key={pin.point}
                      className={`svg-pin ${pin.soon ? 'soon-pin' : `${pin.hub}-pin`} ${activeHub === pin.hub ? 'active' : ''}`}
                      transform={`translate(${x} ${y})`}
                      role="button"
                      tabIndex={0}
                      aria-label={pin.label}
                      onClick={() => setActiveHub(pin.hub)}
                      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setActiveHub(pin.hub) }}
                    >
                      <circle className="pin-halo" r="17" />
                      <circle className="pin-dot" r="7" />
                      {pin.soon && <text className="soon-label" x="14" y="-12">Coming soon</text>}
                    </g>
                  )
                })}
              </svg>
              {activeHub === 'flagship' && <div className="map-note">Flagship location announced ahead of the 2027 launch</div>}

              <div className="map-status"><span className="live-dot" /> Academy network · New York City</div>
              <div className="map-key"><span className="key-dot" /> Active <span className="key-dot soon" /> Coming soon</div>
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
            <div><ShieldCheck /><span><strong>NYC DOE</strong>Fingerprinted &amp; FBI background-checked</span></div>
            <div><CircleCheck /><span><strong>USA Fencing</strong>Certified coaching staff</span></div>
            <div><Award /><span><strong>SafeSport</strong>Certified coaches</span></div>
          </div>

          <div className="staff-pyramid">
            <div className="founder-grid">
              {staff.slice(0, 2).map((person, index) => <CoachCard key={`${person.name}-${index}`} person={person} />)}
            </div>
            <CoachCard person={staff[2]} />
            
            <div className="development-grid">
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
            <a href="mailto:atlaslionsfa@gmail.com">atlaslionsfa@gmail.com</a>
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
        <div className="page-shell footer-bottom"><span>© 2026 Atlas Lions Fencing. All rights reserved.</span><span>Photography: Augusto Bizzi; Marie-Lan Nguyen (CC BY 3.0) / Wikimedia Commons</span><a href="#top">Back to top ↑</a></div>
      </footer>

      {modalOpen && <HostProgramModal onClose={() => setModalOpen(false)} />}
    </main>
  )
}

// THIS COMPONENT RENDERS THE CARDS FOR BOTH DATA ARRAYS
// If a photo is missing or its file name doesn't match, show the coach's initials instead of a broken box.
function CoachCard({ person }: { person: any }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [missing, setMissing] = useState(false)
  const initials = person.name.split(' ').map((part: string) => part[0]).join('')

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) setMissing(true)
  }, [])

  return (
    <article className={`coach-card coach-${person.featured}`}>
      {missing ? (
        <div className="coach-monogram" aria-hidden="true">{initials}</div>
      ) : (
        <img ref={imgRef} src={person.image} alt={`${person.name}, ${person.role}`} style={person.imagePosition ? { objectPosition: person.imagePosition } : undefined} onError={() => setMissing(true)} />
      )}
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
            {state === 'error' && <p className="form-error full-field">We couldn’t send this inquiry. Please retry or email atlaslionsfa@gmail.com.</p>}
            <button className="button button-gold full-field" type="submit" disabled={state === 'loading'}>{state === 'loading' ? 'Sending inquiry…' : 'Submit partnership inquiry'} <ArrowRight size={17} /></button>
          </form>
        )}
      </div>
    </div>
  )
}
