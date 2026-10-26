import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { HeritageLogoAnimation } from './HeritageLogoAnimation'

const interior = '/swaad-desi-interior.jpg'
const ambienceScenes = [
  {
    image: '/ambience-1.jpg',
    tag: 'Handcrafted Ambience',
    label: 'The Ambience • 01',
    heading: 'Warm Rustic Glow &\nHeritage Ceilings',
    desc: 'Artisanal woven bamboo ceilings and glowing cage pendants cast an intimate, golden light across our welcoming dining space.'
  },
  {
    image: '/ambience-2.jpg',
    tag: 'Cultural Heritage',
    label: 'Folk Artistry • 02',
    heading: 'Warli Artistry &\nGrand Banquets',
    desc: 'Traditional Warli tribal murals and luminous lanterns celebrate Jharkhand’s living culture alongside comfortable banquet tables.'
  },
  {
    image: '/ambience-3.jpg',
    tag: 'Family Gatherings',
    label: 'Celebrations • 03',
    heading: 'Spacious Halls for\nMemorable Feasts',
    desc: 'Plush velvet seating, festive celebration backdrops, and generous table arrangements created for family reunions and milestones.'
  },
  {
    image: '/ambience-4.jpg',
    tag: 'Beverage & Mocktails',
    label: 'Sapphire Lounge • 04',
    heading: 'Illuminated Bar &\nSignature Sips',
    desc: 'A vibrant sapphire bottle wall, warm suspended Edison filaments, and hand-crafted refreshing mocktails crafted to elevate every evening.'
  },
]
const dishCurry = '/dish-curry.jpg'
const dishBiryani = '/dish-biryani.jpg'
const dishPizza = '/dish-pizza.jpg'
const dishTandoori = '/dish-tandoori.jpg'
const heroDishes = [dishCurry, dishBiryani, dishPizza]

type IconName = 'arrow' | 'calendar' | 'check' | 'chevron' | 'clock' | 'close' | 'filter' | 'map' | 'menu' | 'phone' | 'search' | 'users'
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    filter: <><path d="M4 7h16M7 12h10M10 17h4"/><circle cx="8" cy="7" r="1"/><circle cx="15" cy="12" r="1"/></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    phone: <path d="M6.5 3h3l1.5 5-2 1.5a15 15 0 0 0 5.5 5.5l1.5-2 5 1.5v3A2.5 2.5 0 0 1 18.5 21C10 20.5 3.5 14 3 5.5A2.5 2.5 0 0 1 5.5 3Z"/>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Button({ children, className = '', onClick, type = 'button' }: { children: ReactNode; className?: string; onClick?: () => void; type?: 'button' | 'submit' }) {
  return <button type={type} className={`btn ${className}`} onClick={onClick}>{children}</button>
}
function Heading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`section-title ${className}`}>{children}</h2>
}
function Label({ children }: { children: ReactNode }) { return <span className="eyebrow">{children}</span> }
function WarliFigure() {
  return <svg className="warli-figure" aria-hidden="true" viewBox="0 0 36 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="6" r="4" />
    <path d="m18 10-8 13h16L18 10Zm0 13-8 13h16L18 23ZM12 17 4 11m20 6 8-6M15 36l-5 12m11-12 5 12" />
    <path d="M4 8v13m-2-9h4m-4 4h4m26-8v13" />
  </svg>
}
function Logo({ light = false, onClick }: { light?: boolean; onClick?: (e: React.MouseEvent) => void }) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
  }
  return (
    <a 
      href="#home" 
      onClick={handleClick}
      className={`logo ${light ? 'logo-light' : ''}`} 
      aria-label="स्वaad देसी home"
      title="Click to view animated heritage logo"
    >
      <img src="/swaad-desi-logo.png" alt="स्वaad देसी restaurant logo" className="logo-crest" />
      <div className="logo-text">
        <img
          src={light ? '/swaad-desi-wordmark-light.png' : '/swaad-desi-wordmark.png'}
          alt="स्वaad देसी"
          className="logo-wordmark"
        />
        <small>INDIAN • CHINESE</small>
      </div>
    </a>
  )
}

const signatureDishes = [
  {
    name: 'Cheesy Gourmet Pizza',
    cuisine: 'Continental',
    tag: 'Wood-Fired Crust',
    price: '₹349',
    image: dishPizza,
    desc: 'Artisanal crust topped with savory tomato reduction, bubbling mozzarella, capsicum, sweet corn, and black olives.'
  },
  {
    name: 'Special Kadai Chicken',
    cuisine: 'Indian',
    tag: 'Chef Specialty',
    price: '₹389',
    image: dishCurry,
    desc: 'Tender chicken simmered in an aromatic spiced wok gravy with bell peppers, onion petals, and ginger juliennes.'
  },
  {
    name: 'Royal Dum Biryani',
    cuisine: 'Indian',
    tag: 'Awadhi Dum Handi',
    price: '₹329',
    image: dishBiryani,
    desc: 'Fragrant saffron basmati rice layered with seasoned marinated meat, caramelized onions, fresh mint, and boiled eggs.'
  },
  {
    name: 'Sizzling Kebab Platter',
    cuisine: 'Indian',
    tag: 'Tandoori Starter',
    price: '₹429',
    image: dishTandoori,
    desc: 'Assortment of spiced tandoori appetizers cooked to perfection, accompanied by fresh mint chutney and onion salad.'
  },
]

const sampleDishes = [
  {
    name: 'Special Kadai Chicken',
    scriptCategory: 'Desi Wok Special',
    cuisine: 'Indian',
    diet: 'Non-Vegetarian',
    price: '₹ 389/-',
    image: dishCurry,
    desc: 'Tender chicken simmered in an aromatic spiced wok gravy with bell peppers, onion petals, ginger juliennes, and freshly roasted coriander seeds.',
    cardTint: '#FAF5EE'
  },
  {
    name: 'Royal Dum Biryani',
    scriptCategory: 'Awadhi Biryani',
    cuisine: 'Indian',
    diet: 'Non-Vegetarian',
    price: '₹ 329/-',
    image: dishBiryani,
    desc: 'Fragrant long-grain saffron basmati rice layered with seasoned marinated meat, caramelized onions, fresh mint, ghee, and boiled eggs.',
    cardTint: '#FDFBF7'
  },
  {
    name: 'Cheesy Gourmet Pizza',
    scriptCategory: 'Wood-Fired Crust',
    cuisine: 'Continental',
    diet: 'Vegetarian',
    price: '₹ 349/-',
    image: dishPizza,
    desc: 'Artisanal oven-baked crust topped with rich herb tomato reduction, bubbling mozzarella, capsicum, sweet corn, and savory black olives.',
    cardTint: '#FAF7F2'
  },
  {
    name: 'Sizzling Kebab Platter',
    scriptCategory: 'Tandoori Special',
    cuisine: 'Indian',
    diet: 'Non-Vegetarian',
    price: '₹ 429/-',
    image: dishTandoori,
    desc: 'Succulent spiced tandoori appetizers fresh from the clay oven, garnished with chaat masala and accompanied by zesty mint chutney.',
    cardTint: '#FDF6F0'
  },
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('All')
  const [step, setStep] = useState(1)
  const [menuStep, setMenuStep] = useState<1 | 2>(1)
  const [booking, setBooking] = useState({ date: '', guests: '2', time: '', name: '', email: '' })
  const [scroll, setScroll] = useState(0)

  const ambienceRef = useRef<HTMLDivElement>(null)
  const [ambienceProgress, setAmbienceProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => setScroll(Math.min(window.scrollY / 650, 1))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleAmbienceScroll = () => {
      if (!ambienceRef.current) return
      const rect = ambienceRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return
      const current = -rect.top
      const p = Math.max(0, Math.min(1, current / totalScrollable))
      setAmbienceProgress(p)
    }

    window.addEventListener('scroll', handleAmbienceScroll, { passive: true })
    handleAmbienceScroll()
    return () => window.removeEventListener('scroll', handleAmbienceScroll)
  }, [])

  const totalAmbienceScenes = ambienceScenes.length
  const continuousSceneIdx = ambienceProgress * (totalAmbienceScenes - 1)
  const activeSceneIdx = Math.min(totalAmbienceScenes - 1, Math.max(0, Math.round(continuousSceneIdx)))

  const jumpToAmbienceScene = (idx: number) => {
    if (!ambienceRef.current) return
    const rect = ambienceRef.current.getBoundingClientRect()
    const targetScrollY = window.scrollY + rect.top + (idx / (totalAmbienceScenes - 1)) * (rect.height - window.innerHeight)
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
  }
  useEffect(() => {
    document.body.style.overflow = bookingOpen || mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [bookingOpen, mobileOpen])

  const guestSectionRef = useRef<HTMLElement | null>(null)
  const [guestInView, setGuestInView] = useState(false)

  useEffect(() => {
    const el = guestSectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGuestInView(true)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const [selectedDish, setSelectedDish] = useState('')
  const [logoAnimOpen, setLogoAnimOpen] = useState(true)
  const [isIntro, setIsIntro] = useState(true)

  const openLogoAnimation = () => {
    setIsIntro(false)
    setLogoAnimOpen(true)
  }

  const dishes = useMemo(() => sampleDishes.filter(d =>
    (cuisine === 'All' || d.cuisine === cuisine) &&
    `${d.name} ${d.desc} ${d.scriptCategory}`.toLowerCase().includes(query.toLowerCase())
  ), [query, cuisine])

  const openBooking = (dishName?: string | unknown) => {
    if (typeof dishName === 'string') {
      setSelectedDish(dishName)
    } else {
      setSelectedDish('')
    }
    setStep(1)
    setBookingOpen(true)
  }
  const exploreMenu = () => {
    const nextStep = menuStep === 1 ? 2 : 1
    setMenuStep(nextStep)
    if (nextStep === 2) {
      window.setTimeout(() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }), 650)
    }
  }
  const submitBooking = (e: FormEvent) => {
    e.preventDefault()
    if (step < 4) setStep(step + 1)
  }

  return <div>
    <HeritageLogoAnimation
      isOpen={logoAnimOpen}
      onClose={() => setLogoAnimOpen(false)}
      isIntro={isIntro}
    />
    <header className="header">
      <div className="nav-shell">
        <Logo onClick={openLogoAnimation} />
        <nav className="desktop-nav" aria-label="Primary">
          {['Home', 'Our Story', 'Menu', 'Gallery', 'Visit Us'].map(item =>
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}>{item}</a>
          )}
        </nav>
        <Button className="primary desktop-book" onClick={openBooking}>Reserve a Table</Button>
        <button className="icon-button mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
      </div>
    </header>

    {mobileOpen && <div className="mobile-menu">
      <div className="mobile-top"><Logo onClick={() => { setMobileOpen(false); openLogoAnimation() }} /><button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><Icon name="close" /></button></div>
      <nav>{['Home', 'Our Story', 'Menu', 'Gallery', 'Visit Us'].map(item => <a onClick={() => setMobileOpen(false)} key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}>{item}<Icon name="arrow" /></a>)}</nav>
      <Button className="primary full" onClick={() => { setMobileOpen(false); openBooking() }}>Reserve a Table</Button>
    </div>}

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <Label>Indian & Chinese Cuisine • Namkum, Ranchi</Label>
          <h1 className="hero-slogan" aria-label="Swaad Se Sambandh">
            <img
              src="/swaad-se-sambandh.png"
              alt="Swaad Se Sambandh"
              className="hero-slogan-img"
            />
          </h1>
          <p>A welcoming space. Rich flavours. Memorable moments.</p>
          <button
            className={`menu-journey ${menuStep === 2 ? 'step-two' : ''}`}
            onClick={exploreMenu}
            aria-label={menuStep === 1 ? 'Explore our menu' : 'Enjoy your meal'}
          >
            <div className="journey-labels">
              <span className="journey-label-explore">Explore our menu</span>
              <span className="journey-label-enjoy">Enjoy your meal</span>
            </div>
            <div className="journey-plate">
              <img src="/plate-food.png" alt="Explore our menu dish" className="plate-face plate-face-food" />
              <img src="/plate-empty.png" alt="Enjoy your meal plate" className="plate-face plate-face-empty" />
            </div>
          </button>
        </div>
        <div className="hero-visual">
          <img src={interior} alt="स्वaad देसी authentic restaurant dining interior and bar in Namkum, Ranchi" />
          {heroDishes.map((src, i) => <div key={i} className={`plate plate-${i + 1}`} style={{ transform: `translate3d(${(scroll * (i - 1) * 70)}px, ${scroll * (i % 2 ? -35 : 20)}px, 0) rotate(${scroll * (i - 1) * 18}deg)` }}><img src={src} alt="Authentic Swaad Desi culinary dish" /></div>)}
        </div>
      </section>

      <section className="ambience" id="gallery" ref={ambienceRef}>
        <div className="ambience-sticky">
          <div className="ambience-slide-layer">
            {ambienceScenes.map((scene, idx) => {
              const dist = continuousSceneIdx - idx
              let opacity = 0
              if (idx === 0 && continuousSceneIdx <= 0) {
                opacity = 1
              } else if (idx === totalAmbienceScenes - 1 && continuousSceneIdx >= totalAmbienceScenes - 1) {
                opacity = 1
              } else {
                opacity = Math.max(0, 1 - Math.abs(dist))
              }

              const scale = 1.02 + (1 - Math.min(1, Math.abs(dist))) * 0.05 - dist * 0.02
              const translateY = dist * -26

              return (
                <div
                  key={scene.image}
                  className="ambience-slide"
                  style={{
                    opacity,
                    transform: `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`,
                    zIndex: idx === activeSceneIdx ? 2 : 1,
                  }}
                >
                  <img
                    src={scene.image}
                    alt={`${scene.tag} - Swaad Desi Restaurant Namkum, Ranchi`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              )
            })}
          </div>

          <div className="ambience-vignette" aria-hidden="true" />

          <div className="ambience-overlay">
            <div className="ambience-text-stage">
              {ambienceScenes.map((scene, idx) => {
                const dist = continuousSceneIdx - idx
                let textOpacity = 0
                if (idx === 0 && continuousSceneIdx <= 0.35) {
                  textOpacity = Math.max(0, 1 - Math.max(0, continuousSceneIdx) * 1.8)
                } else if (idx === totalAmbienceScenes - 1 && continuousSceneIdx >= totalAmbienceScenes - 1.35) {
                  textOpacity = Math.max(0, 1 - Math.max(0, (totalAmbienceScenes - 1) - continuousSceneIdx) * 1.8)
                } else {
                  textOpacity = Math.max(0, 1 - Math.abs(dist) * 1.8)
                }
                const textTranslateY = dist * -18

                return (
                  <div
                    key={scene.label}
                    className="ambience-slide-text"
                    style={{
                      opacity: textOpacity,
                      transform: `translate3d(0, ${textTranslateY.toFixed(1)}px, 0)`,
                      pointerEvents: textOpacity > 0.6 ? 'auto' : 'none',
                    }}
                  >
                    <div className="ambience-tag-wrap">
                      <span className="ambience-tag">{scene.tag}</span>
                      <Label>{scene.label}</Label>
                    </div>
                    <Heading className="ambience-heading">
                      {scene.heading.split('\n').map((line, li) => (
                        <span key={li}>{line}<br /></span>
                      ))}
                    </Heading>
                    <p className="ambience-desc">{scene.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="ambience-scroll-hint" style={{ opacity: ambienceProgress < 0.08 ? 1 : 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
            <span>Scroll to explore space</span>
          </div>

          <div className="ambience-hud">
            <div className="ambience-counter">
              <b>{String(activeSceneIdx + 1).padStart(2, '0')}</b>
              <span>/</span>
              <small>04</small>
            </div>
            <div className="ambience-progress-track">
              <div
                className="ambience-progress-fill"
                style={{ width: `${(ambienceProgress * 100).toFixed(1)}%` }}
              />
            </div>
            <div className="ambience-dots" aria-label="Ambience gallery navigation">
              {ambienceScenes.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className={`ambience-dot ${i === activeSceneIdx ? 'active' : ''}`}
                  onClick={() => jumpToAmbienceScene(i)}
                  aria-label={`Jump to scene ${i + 1}: ${s.tag}`}
                  title={`Scene ${i + 1}: ${s.tag}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="story section" id="our-story">
        <div className="story-image"><img src={interior} alt="Placeholder restaurant interior" /><span className="vertical-note">NAMKUM • RANCHI</span></div>
        <div className="story-copy">
          <Label>Our Story</Label><Heading>Rooted in flavour.<br />Made for gathering.</Heading>
          <p>Discover स्वaad देसी, a restaurant offering Indian and Chinese cuisine in a welcoming dining setting.</p>
          <div className="story-points"><div><b>01</b><span>Indian & Chinese<br />Cuisine</span></div><div><b>02</b><span>A Welcoming<br />Dining Space</span></div></div>
        </div>
      </section>

      <section className="signature-flow-section" id="signature">
        <div className="signature-flow-shell">
          <div className="signature-flow-header">
            <span className="signature-flow-watermark">OUR MENU</span>
            <Label>From the Kitchen</Label>
            <Heading className="signature-flow-title">Signature Dishes</Heading>
            <p className="signature-flow-subtitle">A curated journey through Swaad Desi's most celebrated recipes</p>
          </div>

          <div className="serpentine-menu-wrap">
            <div className="serpentine-spine" aria-hidden="true" />

            <div className="serpentine-list">
              {signatureDishes.map((dish, i) => {
                const isPlateRight = i % 2 === 1
                return (
                  <article
                    key={dish.name}
                    className={`serpentine-row ${isPlateRight ? 'plate-right' : 'plate-left'}`}
                  >
                    {isPlateRight ? (
                      <>
                        <div className="serpentine-card-box">
                          <div className="serpentine-cradle">
                            <div className="serpentine-card">
                              <div className="serpentine-card-meta">
                                <span className="serpentine-card-tag">{dish.tag}</span>
                                <span className="serpentine-card-price">{dish.price}</span>
                              </div>
                              <h3 className="serpentine-card-title">{dish.name}</h3>
                              <p className="serpentine-card-desc">{dish.desc}</p>
                            </div>
                          </div>
                        </div>

                        <div className="serpentine-plate-box">
                          <div className="serpentine-plate-rim">
                            <img src={dish.image} alt={dish.name} className="serpentine-plate-img" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="serpentine-plate-box">
                          <div className="serpentine-plate-rim">
                            <img src={dish.image} alt={dish.name} className="serpentine-plate-img" />
                          </div>
                        </div>

                        <div className="serpentine-card-box">
                          <div className="serpentine-cradle">
                            <div className="serpentine-card">
                              <div className="serpentine-card-meta">
                                <span className="serpentine-card-tag">{dish.tag}</span>
                                <span className="serpentine-card-price">{dish.price}</span>
                              </div>
                              <h3 className="serpentine-card-title">{dish.name}</h3>
                              <p className="serpentine-card-desc">{dish.desc}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section section" id="menu">
        {/* Traditional Folk Art Border Ribbon running from left to right on the top border */}
        <div className="menu-top-border-ribbon" aria-hidden="true" />

        <div className="menu-head">
          <div>
            <Label>Browse the Table</Label>
            <Heading>Explore Our Menu</Heading>
            <p>Freshly prepared authentic recipes, crafted with passion and traditional spices.</p>
          </div>
          <span className="result-count">{dishes.length.toString().padStart(2, '0')} items</span>
        </div>

        <div className="toolbar">
          <div className="search">
            <Icon name="search" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search dishes, flavours, or ingredients…" aria-label="Search menu" />
          </div>
          <div className="filter-wrap">
            <Button className={`filter-btn ${cuisine !== 'All' ? 'active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>
              <Icon name="filter" /> Filter {cuisine !== 'All' && <span>1</span>}
            </Button>
            {filterOpen && (
              <div className="filter-panel">
                <b>Cuisine</b>
                {['All', 'Indian', 'Continental'].map(c => (
                  <label key={c}>
                    <input type="radio" name="cuisine" checked={cuisine === c} onChange={() => setCuisine(c)} />
                    {c}
                  </label>
                ))}
                <Button className="text-button" onClick={() => setCuisine('All')}>Clear filters</Button>
              </div>
            )}
          </div>
        </div>

        {dishes.length ? (
          <div className="food-grid">
            {dishes.map(d => (
              <article
                className="food-card"
                key={d.name}
                style={{ ['--card-tint' as any]: d.cardTint }}
              >
                <div className="food-platter-wrap">
                  <div className="food-dish-box">
                    <img src={d.image} alt={d.name} />
                    <div className="food-diet-badge" title={d.diet}>
                      <span className={`diet-icon ${d.diet === 'Vegetarian' ? 'veg' : 'non-veg'}`}>
                        <span className="diet-dot" />
                      </span>
                    </div>
                  </div>

                  <div className="food-price-disc" aria-label={`Price: ${d.price}`}>
                    <span className="price-label">PRICE</span>
                    <span className="price-value">{d.price}</span>
                    <span className="price-tax">+TAX*</span>
                    <span className="price-underline" aria-hidden="true" />
                  </div>
                </div>

                <div className="food-card-body">
                  <span className="food-script-category">{d.scriptCategory}</span>
                  <h3 className="food-card-title">{d.name}</h3>
                  <p className="food-card-ingredients">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <span>0 results</span>
            <h3>Nothing on this menu matches.</h3>
            <p>Try searching another dish or reset your cuisine filters.</p>
            <Button className="secondary" onClick={() => { setQuery(''); setCuisine('All') }}>Reset menu</Button>
          </div>
        )}

        {/* Traditional Folk Painting Border at the bottom border of Menu Section */}
        <div className="menu-painting-border-container">
          <div className="menu-painting-frieze-wrap">
            <img
              src="/menu-folk-border.jpg"
              alt="Traditional Indian folk painting border depicting musicians, dancers, village hut, and festive celebration"
              className="menu-painting-frieze-img"
            />
          </div>
          <div className="menu-painting-caption-bar">
            <span className="painting-caption-line" aria-hidden="true" />
            <span className="painting-caption-text">परम्परा और उत्सव • CELEBRATING DESI FOLK ART & FESTIVE FEASTS</span>
            <span className="painting-caption-line" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section 
        className={`guest-section-wrap section ${guestInView ? 'in-view' : ''}`} 
        id="reviews"
        ref={guestSectionRef}
      >
        <div className="guest-bg-layer" aria-hidden="true">
          <div className="guest-bg-pattern" />
          <div className="guest-bg-overlay" />
        </div>

        <div className="guest-inner-container">
          <div className="guest-head">
            <div className="guest-head-left">
              <Label>Guest Book</Label>
              <Heading>What Our Guests Say</Heading>
              <p className="guest-intro">Authentic moments and heartfelt experiences shared by diners at स्वaad देसी.</p>
            </div>
            <div className="guest-rating-pill">
              <span className="guest-google-badge">
                <span className="google-g">G</span> Google Reviews
              </span>
              <div className="guest-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <span className="guest-score">4.9 / 5.0 (280+ ratings)</span>
            </div>
          </div>

          <div className={`guest-masonry-grid ${guestInView ? 'is-revealed' : ''}`}>
            {/* Column 1 */}
            <div className="guest-col">
              {/* Card 1: Quote with Avatar right - from Top-Left */}
              <article className="guest-card card-quote-compact anim-from-top-left">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p className="guest-quote-text">
                  The Special Kadai Chicken and piping-hot garlic naan were out of this world. Genuine desi taste with pure ghee aroma!
                </p>
                <div className="guest-meta-row">
                  <div className="guest-info">
                    <strong className="guest-name">Aarav Sharma</strong>
                    <span className="guest-title">Local Foodie • Ranchi</span>
                  </div>
                  <img src="/guest-avatar-2.jpg" alt="Aarav Sharma" className="guest-avatar-round" />
                </div>
              </article>

              {/* Card 2: Square review with avatar - from Left */}
              <article className="guest-card card-quote-standard anim-from-left">
                <p className="guest-quote-text">
                  From the fragrant Awadhi biryani to the attentive hospitality, every family visit to Swaad Desi feels like coming home to a royal celebration feast.
                </p>
                <div className="guest-meta-row">
                  <div className="guest-info">
                    <strong className="guest-name">Pooja Verma</strong>
                    <span className="guest-title">Frequent Diner</span>
                  </div>
                  <img src="/guest-avatar-1.jpg" alt="Pooja Verma" className="guest-avatar-round" />
                </div>
              </article>

              {/* Card 3: Impressed card with Avatar Cluster - from Bottom-Left */}
              <article className="guest-card card-impressed anim-from-bottom-left">
                <h4 className="guest-card-title">I was very impressed!</h4>
                <p className="guest-quote-text">
                  Flavourful, hygienic, and authentic preparation. You can taste the freshly ground whole spices in every single bite.
                </p>
                <div className="guest-impressed-footer">
                  <span className="guest-author">The Mukherjee Family</span>
                  <div className="guest-avatar-cluster" aria-label="Reviewers">
                    <img src="/guest-avatar-1.jpg" alt="Guest" />
                    <img src="/guest-avatar-2.jpg" alt="Guest" />
                    <img src="/guest-avatar-3.jpg" alt="Guest" />
                  </div>
                </div>
              </article>
            </div>

            {/* Column 2 */}
            <div className="guest-col">
              {/* Card 4: Overlapping Avatar with 5 Stars and Floating Big Quote - from Top */}
              <article className="guest-card card-feature-rating anim-from-top">
                <div className="guest-avatar-peek">
                  <img src="/guest-avatar-3.jpg" alt="Rohan Mehta" />
                </div>
                <div className="guest-stars-row">★★★★★</div>
                <h4 className="guest-card-title">I really appreciate!!</h4>
                <p className="guest-quote-text">
                  The ambiance is serene and royal, and the tandoori kebab platter was seasoned and roasted to perfection. Definitely the finest dining experience in Namkum!
                </p>
                <div className="guest-author-tag">
                  <strong className="guest-name">Rohan Mehta</strong>
                  <span className="guest-handle">@rohan_eats</span>
                </div>
                <span className="quote-mark-floating" aria-hidden="true">”</span>
              </article>
            </div>

            {/* Column 3 */}
            <div className="guest-col">
              {/* Card 5: Tall Portrait Photo Card - from Top */}
              <article className="guest-card card-portrait-tall anim-from-top">
                <div className="guest-portrait-wrap">
                  <img src="/guest-woman-portrait.jpg" alt="Priyanka Sengupta at Swaad Desi" className="guest-portrait-img" />
                </div>
                <p className="guest-quote-caption">
                  The warm hospitality and royal Awadhi biryani made our anniversary dinner truly unforgettable.
                </p>
                <span className="guest-signature">Priyanka Sengupta</span>
              </article>

              {/* Card 6: Speech Bubble Card with Tail - from Bottom */}
              <article className="guest-card card-bubble-speech anim-from-bottom">
                <div className="guest-avatar-peek small">
                  <img src="/guest-avatar-4.jpg" alt="Devendra Nath" />
                </div>
                <div className="guest-stars-row">★★★★★</div>
                <p className="guest-quote-text">
                  “Hands down the most authentic desi flavours in town. A culinary masterpiece for family gatherings!”
                </p>
                <span className="guest-signature">Devendra Nath</span>
                <div className="speech-tail" aria-hidden="true" />
              </article>
            </div>

            {/* Column 4 */}
            <div className="guest-col">
              {/* Card 7: Good Job rating card - from Top-Right */}
              <article className="guest-card card-compact-rating anim-from-top-right">
                <div className="guest-avatar-peek small">
                  <img src="/guest-avatar-1.jpg" alt="Guest" />
                </div>
                <h4 className="guest-card-title small">Good Job!</h4>
                <div className="guest-stars-row">★★★★★</div>
                <p className="guest-quote-text">
                  Warm and courteous staff, spotless hygiene, and sizzling kebabs served fresh straight from the clay tandoor.
                </p>
              </article>

              {/* Card 8: Horizontal Split Card with Guest Photo - from Right */}
              <article className="guest-card card-horizontal-split anim-from-right">
                <div className="split-photo-col">
                  <img src="/guest-man-portrait.jpg" alt="Dr. Vikram Roy" />
                </div>
                <div className="split-content-col">
                  <span className="quote-mark small">“</span>
                  <p className="guest-quote-text">
                    Rarely do you find such balanced spices without excessive oil. Traditional home-style perfection.
                  </p>
                  <div className="guest-author-tag">
                    <strong className="guest-name">Dr. Vikram Roy</strong>
                    <span className="guest-title">Namkum Resident</span>
                  </div>
                </div>
              </article>

              {/* Card 9: Card with quote and avatar right - from Bottom-Right */}
              <article className="guest-card card-quote-compact anim-from-bottom-right">
                <p className="guest-quote-text">
                  The rich gravies, slow-cooked dal makhani, and dessert spread were pure magic. Our kids loved every dish!
                </p>
                <div className="guest-meta-row">
                  <div className="guest-info">
                    <strong className="guest-name">Kavita Deshmukh</strong>
                    <span className="guest-title">Lifestyle & Food Writer</span>
                  </div>
                  <img src="/guest-avatar-3.jpg" alt="Kavita Deshmukh" className="guest-avatar-round" />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="reserve-banner">
        <img src="/ambience-3.jpg" alt="Authentic Swaad Desi dining room in Namkum, Ranchi" />
        <div><Label>Come, Take a Seat</Label><Heading>Make moments<br />over a meal.</Heading><p>Plan your visit to स्वaad देसी. Reserve your table in advance.</p><Button className="primary" onClick={openBooking}>Reserve a Table <Icon name="arrow" /></Button><small>UI prototype • No real booking or payment processing</small></div>
      </section>

      <section className="visit section" id="visit-us">
        <div className="visit-copy"><Label>Visit Us</Label><Heading>We look forward to welcoming you.</Heading><p>Verified contact details have not yet been provided. Replace these placeholders before publishing.</p>
          <div className="contact-list"><div><Icon name="map" /><span><small>Address</small><b>Address to be verified<br />Namkum, Ranchi</b></span></div><div><Icon name="clock" /><span><small>Opening hours</small><b>Hours to be verified</b></span></div><div><Icon name="phone" /><span><small>Telephone</small><b>Number to be verified</b></span></div></div>
          <Button className="secondary" onClick={() => alert('Directions will be enabled after the verified location is supplied.')}>Get Directions <Icon name="arrow" /></Button>
        </div>
        <div className="map-placeholder"><div className="map-grid"></div><span className="map-pin"><Icon name="map" size={28} /></span><div><b>Verified map coming soon</b><small>No location pin is shown until confirmed.</small></div></div>
      </section>
    </main>

    <footer>
      <div className="footer-main"><div className="footer-brand"><Logo light onClick={openLogoAnimation} /><p>Indian and Chinese cuisine in a welcoming dining setting in Namkum, Ranchi.</p><small>Social links awaiting verification</small></div><div><b>Explore</b>{['Home', 'Our Story', 'Menu', 'Gallery', 'Visit Us'].map(i => <a key={i} href={`#${i.toLowerCase().replace(/ /g, '-')}`}>{i}</a>)}</div><div><b>Visit Us</b><p>Address & hours<br />to be verified</p><button className="footer-cta" onClick={openBooking}>Reserve a Table <Icon name="arrow" /></button></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} स्वaad देसी</span><span>Prototype website • Legal links pending</span></div>
    </footer>

    {bookingOpen && <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setBookingOpen(false) }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div className="booking-top">
          <div>
            <Label>Table Reservation</Label>
            <h2 id="booking-title">{step === 4 ? 'Request received' : 'Plan your visit'}</h2>
            {selectedDish && (
              <div className="selected-dish-pill">
                <span>Selected dish:</span> <b>{selectedDish}</b>
              </div>
            )}
          </div>
          <button className="icon-button" onClick={() => setBookingOpen(false)} aria-label="Close booking"><Icon name="close" /></button>
        </div>
        <div className="progress">{[1,2,3].map(n => <span className={step >= n ? 'done' : ''} key={n}>{step > n ? <Icon name="check" size={14} /> : n}</span>)}</div>
        <form onSubmit={submitBooking}>
          {step === 1 && <div className="form-step"><p>Choose a date and party size. Availability shown is illustrative only.</p><label>Date<input required type="date" value={booking.date} onChange={e => setBooking({...booking, date: e.target.value})} /></label><label>Number of guests<select value={booking.guests} onChange={e => setBooking({...booking, guests: e.target.value})}>{[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}</select></label></div>}
          {step === 2 && <div className="form-step"><p>Select an illustrative time slot.</p><div className="slots">{['6:30 PM','7:00 PM','7:30 PM','8:00 PM'].map(t => <button type="button" onClick={() => setBooking({...booking, time:t})} className={booking.time === t ? 'selected' : ''} key={t}>{t}</button>)}</div><label>Full name<input required value={booking.name} onChange={e => setBooking({...booking, name:e.target.value})} placeholder="Your name" /></label><label>Email<input required type="email" value={booking.email} onChange={e => setBooking({...booking, email:e.target.value})} placeholder="you@example.com" /></label></div>}
          {step === 3 && <div className="form-step"><div className="summary"><span><small>Date</small><b>{booking.date || 'Not selected'}</b></span><span><small>Guests</small><b>{booking.guests}</b></span><span><small>Time</small><b>{booking.time || 'Not selected'}</b></span></div><div className="deposit"><Icon name="calendar" /><div><b>Advance deposit required</b><p>Deposit amount and cancellation/refund terms are configuration placeholders and must be confirmed before this flow can process a real booking.</p></div></div><label className="consent"><input required type="checkbox" /> I understand this is a UI prototype and no reservation or payment will be created.</label></div>}
          {step === 4 ? <div className="success-state"><span><Icon name="check" size={32} /></span><h3>Prototype complete</h3><p>This demonstrates the final status screen. No booking was submitted and no payment was taken.</p><Button className="secondary full" onClick={() => setBookingOpen(false)}>Close</Button></div> :
          <div className="modal-actions">{step > 1 && <Button className="back" onClick={() => setStep(step - 1)}>Back</Button>}<Button type="submit" className="primary next">{step === 3 ? 'Simulate confirmation' : 'Continue'} <Icon name="arrow" /></Button></div>}
        </form>
      </section>
    </div>}
  </div>
}

export default App
