import { useState, useEffect, type CSSProperties, type KeyboardEvent } from 'react'

const lettering = [
  'M137 158 C190 151 252 153 300 154',
  'M151 178 C178 166 209 160 237 164 C214 185 181 201 151 218 C184 208 207 207 230 218 C251 230 276 218 286 190',
  'M184 219 C214 236 235 244 265 234 C285 224 295 199 293 171',
  'M187 238 C204 257 218 279 215 307 C213 319 206 327 199 333',
  'M310 226 C326 191 347 176 365 180 C379 184 373 201 359 214 C345 228 326 236 315 228 C325 248 349 246 370 229',
  'M384 224 C399 191 421 178 438 182 C451 186 443 204 430 216 C417 228 398 237 387 227 C400 245 424 243 445 226',
  'M458 224 C475 190 494 180 512 183 C526 186 518 203 505 215 C492 226 475 234 462 225 C477 244 501 241 522 224',
  'M536 223 C551 191 570 177 586 180 C598 183 590 201 577 211 C563 223 548 233 538 224 C552 242 576 239 598 220',
  'M587 181 C598 201 605 221 620 235',
  'M654 150 C705 160 759 157 868 157',
  'M655 132 C685 145 726 136 742 144 C756 151 765 159 773 171',
  'M673 194 C701 182 731 178 760 182 C746 198 724 210 700 219 C680 227 682 247 701 255 C721 263 744 244 748 219',
  'M748 188 C767 199 783 210 802 211 C789 224 776 238 759 246 C781 247 802 254 817 269',
  'M769 177 C795 189 824 187 852 183',
  'M824 170 C838 151 856 132 871 125 C885 134 900 151 912 171',
  'M855 178 C850 207 852 237 850 266',
  'M853 267 C842 289 826 303 813 316',
]

const ornaments = [
  'M260 82 C315 47 370 49 416 78 C376 68 343 75 326 103 C303 91 282 84 260 82',
  'M740 82 C685 47 630 49 584 78 C624 68 657 75 674 103 C697 91 718 84 740 82',
  'M454 79 C472 66 488 50 500 28 C512 50 528 66 546 79 C527 78 511 84 500 99 C489 84 473 78 454 79',
  'M322 336 C365 353 414 355 463 346 C445 367 423 379 396 383 C369 378 344 362 322 336',
  'M678 336 C635 353 586 355 537 346 C555 367 577 379 604 383 C631 378 656 362 678 336',
  'M466 360 C479 347 490 331 500 311 C510 331 521 347 534 360 C520 362 508 370 500 384 C492 370 480 362 466 360',
]

interface HeritageLogoAnimationProps {
  isOpen: boolean
  onClose: () => void
  isIntro?: boolean
}

export function HeritageLogoAnimation({ isOpen, onClose, isIntro = false }: HeritageLogoAnimationProps) {
  const [run, setRun] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  // Replay animation
  const replay = () => setRun((value) => value + 1)

  // Smooth dismiss with fade-out
  const handleDismiss = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsFadingOut(false)
      onClose()
    }, 450)
  }

  // Keyboard accessibility
  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      replay()
    }
  }

  // Listen to Escape key to close
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  // Reset run count whenever opened
  useEffect(() => {
    if (isOpen) {
      setRun((v) => v + 1)
      setIsFadingOut(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className={`heritage-overlay ${isFadingOut ? 'fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Swaad Desi Heritage Animated Logo"
    >
      <main className="heritage-stage" onClick={(e) => {
        // If clicking directly on the background (not inside logo-frame), dismiss
        if (e.target === e.currentTarget) {
          handleDismiss()
        }
      }}>
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />

        {/* Top bar controls */}
        <div className="heritage-top-bar">
          <button 
            type="button" 
            className="heritage-replay-btn"
            onClick={replay}
            title="Replay animation"
            aria-label="Replay animation"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19"/>
            </svg>
            <span>REPLAY</span>
          </button>

          <button 
            type="button" 
            className="heritage-close-btn"
            onClick={handleDismiss}
            aria-label={isIntro ? "Enter Restaurant" : "Close animation"}
          >
            <span>{isIntro ? 'ENTER RESTAURANT' : 'CLOSE'}</span>
            <span className="heritage-close-icon">✕</span>
          </button>
        </div>

        {/* Central Logo Stage */}
        <section className="logo-frame" aria-label="Swaad Desi animated heritage logo">
          <svg
            key={run}
            className="logo-animation"
            viewBox="0 0 1000 420"
            role="button"
            tabIndex={0}
            aria-label="Replay Swaad Desi logo animation"
            onClick={replay}
            onKeyDown={onKeyDown}
          >
            <defs>
              <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#9b651e" />
                <stop offset=".38" stopColor="#f4d88b" />
                <stop offset=".66" stopColor="#c58a2d" />
                <stop offset="1" stopColor="#fff0b5" />
              </linearGradient>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff8dc" />
                <stop offset=".58" stopColor="#f1d792" />
                <stop offset="1" stopColor="#b97820" />
              </linearGradient>
              <filter id="tipGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="softGlow" x="-30%" y="-60%" width="160%" height="220%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <mask id="logoSilhouette">
                <image href="/swaad-desi-mask.png" x="80" y="55" width="840" height="349" />
              </mask>
              <clipPath id="sweepClip">
                <rect x="80" y="55" width="840" height="349" />
              </clipPath>
            </defs>

            <g className="ornament-lines">
              {ornaments.map((path, index) => (
                <path
                  key={path}
                  d={path}
                  pathLength="1"
                  style={
                    {
                      '--delay': `${5.8 + index * 0.18}s`,
                      '--duration': '1.15s',
                    } as CSSProperties
                  }
                />
              ))}
              <circle cx="241" cy="83" r="3" />
              <circle cx="759" cy="83" r="3" />
            </g>

            <g mask="url(#logoSilhouette)" className="letter-reveal">
              {lettering.map((path, index) => (
                <path
                  key={path}
                  d={path}
                  pathLength="1"
                  style={
                    {
                      '--delay': `${0.35 + index * 0.29}s`,
                      '--duration': '0.75s',
                    } as CSSProperties
                  }
                />
              ))}
            </g>

            <g className="tracer-lines">
              {lettering.map((path, index) => (
                <path
                  key={path}
                  d={path}
                  pathLength="1"
                  style={
                    {
                      '--delay': `${0.35 + index * 0.29}s`,
                      '--duration': '0.75s',
                    } as CSSProperties
                  }
                />
              ))}
            </g>

            <rect
              className="final-logo"
              x="80"
              y="55"
              width="840"
              height="349"
              fill="url(#fill)"
              mask="url(#logoSilhouette)"
            />
            <g clipPath="url(#sweepClip)" mask="url(#logoSilhouette)">
              <rect className="light-sweep" x="-180" y="40" width="85" height="350" />
            </g>
          </svg>

          <div className="replay-hint">
            <span>CLICK MARK TO REPLAY</span>
          </div>

          <div className="heritage-bottom-actions">
            <button
              type="button"
              className="heritage-enter-cta"
              onClick={handleDismiss}
            >
              <span>{isIntro ? 'Explore Swaad Desi' : 'Back to Website'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
