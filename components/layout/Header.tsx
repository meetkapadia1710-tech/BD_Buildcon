'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { contactInfo } from '@/content/links'
import Logo from '@/components/ui/Logo'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Safety & Quality', href: '/safety-quality' },
  { label: 'Projects', href: '/projects' },
  { label: 'Employee Area', href: '/employee-area' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 h-[60px] flex items-center border-b ${
          scrolled ? 'bg-white border-hairline shadow-[0_1px_24px_rgba(0,0,0,0.08)]' : 'bg-white border-hairline'
        }`}
      >
        <div className="max-w-container w-full mx-auto px-gutter flex items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 flex items-center" aria-label="BD Buildcon home">
            <Logo light={true} className="h-10 w-auto" />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-stretch flex-1 justify-end pr-8 h-[60px]" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center px-4 h-full font-body text-[11px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200 ${
                  isActive(link.href) ? 'text-teal' : 'text-nav hover:text-ink'
                }`}
              >
                {link.label}
                {isActive(link.href) && <span className="absolute bottom-[-1px] left-4 right-4 h-[2px] bg-teal" />}
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            {/* Phone */}
            <a
              href={`tel:${contactInfo.phoneTel}`}
              className="flex items-center gap-2.5 text-ink/60 hover:text-teal transition-colors duration-200 group"
              aria-label={`Call ${contactInfo.phone}`}
            >
              <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal transition-colors duration-200">
                <svg
                  className="w-3.5 h-3.5 text-teal group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
            </a>

            <Link
              href="/contact"
              className="btn-primary text-[13px] font-semibold px-[15px] py-[8px] min-h-[32px] h-[32px]"
            >
              START YOUR PROJECT
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl text-ink hover:bg-surface transition-colors"
          >
            <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
            <div className="w-6 flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] w-full bg-current rounded-full transition-transform ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
              />
              <span
                className={`block h-[2px] w-full bg-current rounded-full transition-opacity ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-[2px] w-full bg-current rounded-full transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-hairline shrink-0 h-[60px]">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Logo light={true} className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-xl text-ink/60 hover:bg-surface hover:text-ink transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl font-body text-[13px] font-semibold uppercase tracking-[0.06em] transition-colors hover:bg-surface hover:text-teal ${
                    isActive(link.href) ? 'text-teal bg-teal/5' : 'text-ink'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="shrink-0 px-4 py-5 border-t border-hairline space-y-3 bg-surface/50">
              <a
                href={`tel:${contactInfo.phoneTel}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-hairline text-ink hover:border-teal/40 hover:text-teal transition-colors"
              >
                <svg className="w-5 h-5 text-teal shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="font-body text-[14px] font-semibold">{contactInfo.phone}</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center text-sm py-3"
              >
                START YOUR PROJECT
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
