'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { MagneticButton } from '@/components/motion/MagneticButton'

const aboutLinks = [
  { label: 'Overview', href: '/about/overview' },
  { label: 'Ideology', href: '/about/ideology' },
  { label: 'Desk of Directors', href: '/about/directors' },
  { label: 'Certification', href: '/about/certification' },
  { label: 'Plant & Machinery', href: '/about/plant-machinery' },
  { label: 'Equipment & Accessories', href: '/about/equipment' },
]

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/overview', hasDropdown: true },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Projects', href: '/projects' },
  { label: 'Employee Area', href: '/employee-area' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setAboutOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-white border-b border-hairline py-4'
      }`}
    >
      <div className="max-w-container mx-auto px-gutter flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display text-xl font-bold text-teal tracking-tight transition-colors group-hover:text-teal-hover">
            BD Buildcon LLP
          </span>
          <span className="text-[10px] text-body font-body tracking-wide hidden sm:block">
            (Formerly known as Bhumi Developers)
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setAboutOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setAboutOpen(false), 150)}
                  aria-expanded={aboutOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 px-3 py-2 rounded font-body text-label-md uppercase tracking-wider transition-colors duration-200 ${
                    isActive('/about')
                      ? 'text-teal'
                      : 'text-ink hover:text-teal'
                  }`}
                >
                  {link.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-card border border-hairline shadow-card-hover overflow-hidden z-50"
                    >
                      {aboutLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2.5 font-body text-body-md transition-colors duration-150 hover:bg-surface hover:text-teal ${
                            pathname === item.href ? 'text-teal bg-surface' : 'text-ink'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded font-body text-label-md uppercase tracking-wider transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-teal border-b-2 border-teal pb-1.5'
                    : 'text-ink hover:text-teal'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <MagneticButton as="a" href="/contact" className="btn-primary text-sm px-6 py-2.5">
            Start your project
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="lg:hidden p-2 rounded text-ink hover:text-teal transition-colors"
        >
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-hairline"
          >
            <nav className="px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label}>
                    <div className="font-body text-label-md uppercase tracking-wider text-body py-2 px-3">
                      {link.label}
                    </div>
                    <div className="pl-4 flex flex-col gap-1">
                      {aboutLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`py-2 px-3 rounded font-body text-body-md transition-colors hover:text-teal ${
                            pathname === item.href ? 'text-teal' : 'text-ink'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2.5 px-3 rounded font-body text-body-md uppercase tracking-wider transition-colors hover:text-teal ${
                      isActive(link.href) ? 'text-teal' : 'text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-4 pt-4 border-t border-hairline">
                <Link href="/contact" className="btn-primary w-full text-sm">
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
