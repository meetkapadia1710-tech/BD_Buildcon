'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { contactInfo } from '@/content/links'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About Us',      href: '/about' },
  { label: 'Why Us',        href: '/why-us' },
  { label: 'Projects',      href: '/projects' },
  { label: 'Employee Area', href: '/employee-area' },
  { label: 'Contact',       href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname    = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

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
          {navLinks.map((link) => (
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
          ))}
        </nav>

        {/* ── Desktop CTA ───────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Phone shortcut */}
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

          {/* Divider */}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-xl font-body text-body-md font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-surface hover:text-teal ${
                    isActive(link.href) ? 'text-teal' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

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
