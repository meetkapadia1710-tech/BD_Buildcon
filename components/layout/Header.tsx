'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { contactInfo } from '@/content/links'
import Logo from '@/components/ui/Logo'

const aboutSubLinks = [
  {
    label: 'Overview',
    href: '/about?tab=overview',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    desc: 'Who we are & our history',
  },
  {
    label: 'Ideology & Values',
    href: '/about?tab=ideology',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    desc: 'Our vision, mission & values',
  },
  {
    label: 'Certifications',
    href: '/about?tab=certification',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    desc: 'Client recommendation letters',
  },
  {
    label: 'Plant & Equipment',
    href: '/about?tab=infrastructure',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    desc: 'Our owned fleet & machinery',
  },
]

const navLinks = [
  { label: 'Home', href: '/', hasDropdown: false },
  { label: 'About Us', href: '/about', hasDropdown: true },
  { label: 'Why Us', href: '/why-us', hasDropdown: false },
  { label: 'Safety & Quality', href: '/safety-quality', hasDropdown: false },
  { label: 'Projects', href: '/projects', hasDropdown: false },
  { label: 'Employee Area', href: '/employee-area', hasDropdown: false },
  { label: 'Contact', href: '/contact', hasDropdown: false },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Mobile drawer: focus management + trap + Escape-to-close
  useEffect(() => {
    if (!mobileOpen) return
    const drawer = drawerRef.current
    if (!drawer) return

    const getFocusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null)

    getFocusable()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const items = getFocusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      hamburgerRef.current?.focus()
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleAboutEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setAboutOpen(true)
  }
  const handleAboutLeave = () => {
    closeTimer.current = setTimeout(() => setAboutOpen(false), 150)
  }
  // Keyboard: close the dropdown when focus leaves the whole About group.
  const handleAboutBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setAboutOpen(false)
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.08)]'
            : 'bg-white border-b border-hairline'
        }`}
      >
        <div className="max-w-container mx-auto px-gutter flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 flex items-center py-4" aria-label="BD Buildcon home">
            <Logo light={true} className="h-10 w-auto" />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-stretch flex-1 justify-center" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative flex items-stretch"
                  onMouseEnter={handleAboutEnter}
                  onMouseLeave={handleAboutLeave}
                  onFocus={handleAboutEnter}
                  onBlur={handleAboutBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setAboutOpen(false)
                  }}
                >
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-1.5 px-4 py-5 font-body text-[12.5px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200 ${
                      isActive(link.href) ? 'text-teal' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {link.label}
                    <motion.svg
                      animate={{ rotate: aboutOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-3 h-3 shrink-0 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-teal rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {aboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-0 w-72 bg-white rounded-2xl border border-hairline shadow-[0_12px_40px_rgba(0,0,0,0.10)] overflow-hidden"
                        onMouseEnter={handleAboutEnter}
                        onMouseLeave={handleAboutLeave}
                      >
                        <div className="p-2">
                          {aboutSubLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => {
                                setAboutOpen(false)
                                setMobileOpen(false)
                                setMobileAboutOpen(false)
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal/5 group transition-colors duration-150 text-left"
                            >
                              <div className="w-8 h-8 rounded-lg bg-teal/8 flex items-center justify-center text-teal shrink-0 group-hover:bg-teal group-hover:text-white transition-colors duration-150">
                                {sub.icon}
                              </div>
                              <div>
                                <p className="font-body text-[12px] font-semibold text-ink group-hover:text-teal transition-colors duration-150 leading-tight">
                                  {sub.label}
                                </p>
                                <p className="font-body text-[11px] text-body/70 leading-snug mt-0.5">{sub.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-hairline px-4 py-2.5 bg-surface/60 flex items-center justify-between">
                          <Link
                            href="/about"
                            className="font-body text-[11px] text-teal font-semibold tracking-wide hover:underline underline-offset-2"
                            onClick={() => setAboutOpen(false)}
                          >
                            View full About page
                          </Link>
                          <svg
                            className="w-3.5 h-3.5 text-teal"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center px-4 py-5 font-body text-[12.5px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200 ${
                    isActive(link.href) ? 'text-teal' : 'text-ink/70 hover:text-ink'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-teal rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </Link>
              ),
            )}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Phone */}
            <a
              href={`tel:${contactInfo.phoneTel}`}
              className="hidden xl:flex items-center gap-2.5 text-ink/60 hover:text-teal transition-colors duration-200 group"
              aria-label={`Call ${contactInfo.phone}`}
            >
              <div className="w-8 h-8 rounded-full bg-teal/8 flex items-center justify-center group-hover:bg-teal transition-colors duration-200">
                <svg
                  className="w-3.5 h-3.5 text-teal group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span className="font-body text-[12.5px] font-semibold tracking-wide">{contactInfo.phone}</span>
            </a>

            <div className="hidden xl:block w-px h-5 bg-hairline" aria-hidden="true" />

            <MagneticButton
              as="a"
              href="/contact"
              className="btn-primary text-[11.5px] tracking-[0.08em] px-5 py-2.5 whitespace-nowrap"
            >
              Start Your Project
            </MagneticButton>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-ink hover:bg-surface transition-colors"
          >
            <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
            <div className="w-5 flex flex-col gap-[5px]">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-full bg-current rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] w-full bg-current rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] w-full bg-current rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-white shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-hairline shrink-0">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Logo light={true} className="h-8 w-auto" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-ink/60 hover:bg-surface hover:text-ink transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5" aria-label="Mobile navigation">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <div key={link.href}>
                      <button
                        onClick={() => setMobileAboutOpen((o) => !o)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-body text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:bg-surface ${
                          isActive(link.href) ? 'text-teal bg-teal/5' : 'text-ink hover:text-teal'
                        }`}
                      >
                        {link.label}
                        <motion.svg
                          animate={{ rotate: mobileAboutOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-4 h-4 shrink-0 opacity-50"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                      </button>

                      <AnimatePresence>
                        {mobileAboutOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-1 mb-2 pl-3 border-l-2 border-teal/20 flex flex-col gap-0.5">
                              {aboutSubLinks.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => {
                                    setAboutOpen(false)
                                    setMobileOpen(false)
                                    setMobileAboutOpen(false)
                                  }}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-body hover:text-teal hover:bg-teal/5 transition-colors text-left w-full"
                                >
                                  <span className="text-teal shrink-0">{sub.icon}</span>
                                  <span className="font-body text-[13px] font-medium">{sub.label}</span>
                                </Link>
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
                      className={`flex items-center px-4 py-3 rounded-xl font-body text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:bg-surface hover:text-teal ${
                        isActive(link.href) ? 'text-teal bg-teal/5' : 'text-ink'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>

              {/* Drawer footer */}
              <div className="shrink-0 px-4 py-5 border-t border-hairline space-y-3 bg-surface/50">
                <a
                  href={`tel:${contactInfo.phoneTel}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-hairline text-ink hover:border-teal/40 hover:text-teal transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-teal shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="font-body text-[13px] font-semibold">{contactInfo.phone}</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-center text-sm py-3"
                >
                  Start Your Project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
