'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { contactInfo } from '@/content/links'
import Logo from '@/components/ui/Logo'
import { useLenis } from '@/components/motion/LenisProvider'

const aboutSubLinks = [
  {
    label: 'Overview',
    href: '/about#overview',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    desc: 'Who we are & our history',
  },
  {
    label: 'Ideology',
    href: '/about#ideology',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    desc: 'Our vision, mission & values',
  },
  {
    label: 'Certifications',
    href: '/about#certification',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    desc: 'Client recommendation letters',
  },
  {
    label: 'Plant & Equipment',
    href: '/about#infrastructure',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    desc: 'Our owned fleet & machinery',
  },
]

const navLinks = [
  { label: 'Home',          href: '/',              hasDropdown: false },
  { label: 'About Us',      href: '/about',          hasDropdown: true  },
  { label: 'Why Us',        href: '/why-us',         hasDropdown: false },
  { label: 'Projects',      href: '/projects',       hasDropdown: false },
  { label: 'Employee Area', href: '/employee-area',  hasDropdown: false },
  { label: 'Contact',       href: '/contact',        hasDropdown: false },
]

export function Header() {
  const [scrolled, setScrolled]               = useState(false)
  const [mobileOpen, setMobileOpen]           = useState(false)
  const [aboutOpen, setAboutOpen]             = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [highlightId, setHighlightId]         = useState<string | null>(null)
  const pathname  = usePathname()
  const router    = useRouter()
  const { scrollTo } = useLenis()
  const dropdownRef  = useRef<HTMLDivElement>(null)
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setAboutOpen(false)
    setMobileAboutOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleAboutEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setAboutOpen(true)
  }

  const handleAboutLeave = () => {
    closeTimer.current = setTimeout(() => setAboutOpen(false), 120)
  }

  // Smooth scroll to an anchor — navigate first if on a different page
  const handleSubLinkClick = useCallback((href: string) => {
    setAboutOpen(false)
    setMobileOpen(false)
    setMobileAboutOpen(false)

    const [path, hash] = href.split('#')
    const anchor = hash ? `#${hash}` : null

    if (!anchor) {
      router.push(path)
      return
    }

    if (pathname === path || pathname.startsWith(path)) {
      // Already on the page — just scroll
      scrollTo(anchor, { offset: -90, duration: 1.4 })
      setHighlightId(hash)
      setTimeout(() => setHighlightId(null), 1200)
    } else {
      // Navigate then scroll after mount
      router.push(path)
      setTimeout(() => {
        scrollTo(anchor, { offset: -90, duration: 1.4 })
        setHighlightId(hash)
        setTimeout(() => setHighlightId(null), 1200)
      }, 600)
    }
  }, [pathname, router, scrollTo])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_16px_rgba(0,0,0,0.07)] py-2'
          : 'bg-white border-b border-hairline py-3'
      }`}
    >
      <div className="max-w-container mx-auto px-gutter flex items-center justify-between gap-6">

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href="/" className="flex items-center shrink-0">
          <Logo light={true} className="h-10 w-auto" />
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────── */}
        <nav className="hidden lg:flex items-center" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.href}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleAboutEnter}
                onMouseLeave={handleAboutLeave}
              >
                {/* About Us trigger */}
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 ${
                    isActive(link.href) ? 'text-teal' : 'text-ink hover:text-teal'
                  }`}
                >
                  {link.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-teal rounded-full"
                    />
                  )}
                </Link>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl border border-hairline shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden"
                      onMouseEnter={handleAboutEnter}
                      onMouseLeave={handleAboutLeave}
                    >
                      <div className="p-2">
                        {aboutSubLinks.map((sub) => {
                          const hash = sub.href.split('#')[1]
                          const isActive = highlightId === hash
                          return (
                            <button
                              key={sub.href}
                              onClick={() => handleSubLinkClick(sub.href)}
                              className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-teal/5 group transition-colors duration-150 text-left"
                            >
                              <motion.div
                                animate={isActive ? { scale: [1, 1.3, 1], rotate: [0, 8, -8, 0] } : {}}
                                transition={{ duration: 0.45, ease: 'easeInOut' }}
                                className="mt-0.5 w-7 h-7 rounded-lg bg-teal/10 flex items-center justify-center text-teal shrink-0 group-hover:bg-teal group-hover:text-white transition-colors duration-150"
                              >
                                {sub.icon}
                              </motion.div>
                              <div>
                                <p className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-ink group-hover:text-teal transition-colors duration-150">
                                  {sub.label}
                                </p>
                                <p className="font-body text-[11px] text-body leading-snug mt-0.5">
                                  {sub.desc}
                                </p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                      {/* Footer strip */}
                      <div className="border-t border-hairline px-4 py-2.5 bg-surface">
                        <Link href="/about" className="font-body text-[11px] text-teal font-semibold uppercase tracking-wider hover:underline">
                          View full About page →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-3 font-body text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 ${
                  isActive(link.href) ? 'text-teal' : 'text-ink hover:text-teal'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-teal rounded-full"
                  />
                )}
              </Link>
            )
          )}
        </nav>

        {/* ── Desktop CTA ───────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${contactInfo.phoneTel}`}
            className="flex items-center gap-2 text-ink hover:text-teal transition-colors duration-200 group"
            aria-label={`Call ${contactInfo.phone}`}
          >
            <div className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center transition-colors duration-200 group-hover:border-teal group-hover:bg-teal/5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <span className="font-body text-[12px] font-semibold hidden xl:block">{contactInfo.phone}</span>
          </a>
          <span className="h-6 w-px bg-hairline hidden xl:block" aria-hidden="true" />
          <MagneticButton as="a" href="/contact" className="btn-primary text-[11px] tracking-wider px-5 py-2.5">
            Start your project
          </MagneticButton>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────── */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="lg:hidden p-2 rounded-lg text-ink hover:text-teal hover:bg-surface transition-colors"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-hairline"
          >
            <nav className="px-5 py-5 flex flex-col gap-0.5" aria-label="Mobile navigation">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.href}>
                    {/* About Us accordion toggle */}
                    <button
                      onClick={() => setMobileAboutOpen((o) => !o)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-body text-body-md font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-surface hover:text-teal ${
                        isActive(link.href) ? 'text-teal' : 'text-ink'
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {mobileAboutOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3 mt-1 mb-1 border-l-2 border-teal/30 pl-3 flex flex-col gap-0.5">
                            {aboutSubLinks.map((sub) => (
                              <button
                                key={sub.href}
                                onClick={() => handleSubLinkClick(sub.href)}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-body hover:text-teal hover:bg-teal/5 transition-colors text-left w-full"
                              >
                                <motion.span
                                  whileTap={{ scale: 0.85, rotate: -10 }}
                                  className="text-teal"
                                >
                                  {sub.icon}
                                </motion.span>
                                <span className="font-body text-sm font-medium">{sub.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2.5 rounded-xl font-body text-body-md font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-surface hover:text-teal ${
                      isActive(link.href) ? 'text-teal' : 'text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div className="mt-4 pt-4 border-t border-hairline flex flex-col gap-2.5">
                <a
                  href={`tel:${contactInfo.phoneTel}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface text-ink hover:text-teal transition-colors"
                >
                  <svg className="w-4 h-4 text-teal shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="font-body text-body-md font-semibold">{contactInfo.phone}</span>
                </a>
                <Link href="/contact" className="btn-primary w-full text-sm text-center">
                  Start your project
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
