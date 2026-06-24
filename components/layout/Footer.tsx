'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { contactInfo, socialLinks } from '@/content/links'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { useLenis } from '@/components/motion/LenisProvider'

export function Footer() {
  const { scrollTo } = useLenis()

  return (
    <footer className="bg-footer text-white relative overflow-hidden">
      {/* Top teal border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-deep via-teal to-teal-deep" />

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-container mx-auto px-gutter py-20 lg:py-24">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8" stagger={0.15}>
          {/* About — 5 cols */}
          <div className="md:col-span-5 lg:pr-12">
            <h3 className="font-display text-headline-sm text-white mb-2">About Us</h3>
            <span className="block w-12 h-[3px] rounded-full bg-teal mb-6" />
            <p className="font-body text-body-md text-white/70 leading-relaxed max-w-md">
              BD Buildcon LLP (Formerly known as Bhumi Developers) has professional human resource commensurate with the
              required expertise and state-of-the-art construction quality testing equipment required for successful
              execution of any project it undertakes.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-8">
              {[
                {
                  href: socialLinks.twitter,
                  label: 'Twitter',
                  icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.857-8.166-10.643H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
                },
                {
                  href: socialLinks.facebook,
                  label: 'Facebook',
                  icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                },
                {
                  href: socialLinks.linkedin,
                  label: 'LinkedIn',
                  icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                },
              ]
                .filter((social) => social.href)
                .map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white"
                    whileHover={{ scale: 1.15, rotate: 5, backgroundColor: '#16A8B8', borderColor: '#16A8B8' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
            </div>
          </div>

          {/* Company Links — 3 cols */}
          <div className="md:col-span-3">
            <h3 className="font-display text-headline-sm text-white mb-2">Company Links</h3>
            <span className="block w-12 h-[3px] rounded-full bg-teal mb-6" />
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Why Us', href: '/why-us' },
                { label: 'Safety & Quality', href: '/safety-quality' },
                { label: 'Projects', href: '/projects' },
                { label: 'Employee Area', href: '/employee-area' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-body-md text-white/70 hover:text-white transition-colors duration-200 w-fit link-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info — 4 cols */}
          <div className="md:col-span-4">
            <h3 className="font-display text-headline-sm text-white mb-2">Contact Info</h3>
            <span className="block w-12 h-[3px] rounded-full bg-teal mb-6" />
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-teal group-hover:text-white transition-colors text-teal">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <p className="font-body text-body-md text-white/70 leading-relaxed mt-1 group-hover:text-white transition-colors">
                  {contactInfo.address}
                </p>
              </div>

              <a href={`tel:${contactInfo.phoneTel}`} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-teal group-hover:text-white transition-colors text-teal">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <span className="font-body text-body-md text-white/70 group-hover:text-white transition-colors tracking-wide">
                  {contactInfo.phone}
                </span>
              </a>

              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-teal group-hover:text-white transition-colors text-teal">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <span className="font-body text-body-md text-white/70 group-hover:text-white transition-colors">
                  {contactInfo.email}
                </span>
              </a>
            </div>
          </div>
        </StaggerReveal>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-body text-body-sm text-white/60 tracking-wide">
            © {new Date().getFullYear()} BD Buildcon LLP. All rights reserved.
          </p>
          <button
            onClick={() => scrollTo(0, { duration: 1.5 })}
            aria-label="Back to top"
            className="group flex items-center gap-2 text-teal hover:text-white transition-colors font-body text-label-md uppercase tracking-widest"
          >
            Back to top
            <motion.div
              className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal"
              whileHover={{ y: -3 }}
            >
              <svg
                className="w-3 h-3 text-teal group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>
    </footer>
  )
}
