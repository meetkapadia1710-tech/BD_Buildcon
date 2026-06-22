import Link from 'next/link'
import { contactInfo, socialLinks } from '@/content/links'

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      {/* Top teal border */}
      <div className="h-1 bg-teal" />

      <div className="max-w-container mx-auto px-gutter py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <h3 className="font-display text-headline-sm text-white mb-1">About Us</h3>
            <span className="block w-10 h-0.5 bg-teal mb-5" />
            <p className="font-body text-body-md text-white/70 leading-relaxed">
              BD Buildcon LLP (Formerly known as Bhumi Developers) has professional human resource
              commensurate with the required expertise and state-of-the-art construction quality
              testing equipment required for successful execution of any project it undertakes.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-teal hover:bg-teal/10 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.857-8.166-10.643H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </Link>
              <Link
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-teal hover:bg-teal/10 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-teal hover:bg-teal/10 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display text-headline-sm text-white mb-1">Company Links</h3>
            <span className="block w-10 h-0.5 bg-teal mb-5" />
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about#overview' },
                { label: 'Projects', href: '/projects' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Certification', href: '/about#certification' },
                { label: 'Why Us', href: '/why-us' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-body-md text-white/70 hover:text-teal transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-headline-sm text-white mb-1">Contact Info</h3>
            <span className="block w-10 h-0.5 bg-teal mb-5" />
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 fill-teal shrink-0 mt-0.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p className="font-body text-body-md text-white/70 leading-relaxed">
                  {contactInfo.address}
                </p>
              </div>
              <Link
                href={`tel:${contactInfo.phoneTel}`}
                className="flex items-center gap-3 group"
              >
                <svg className="w-5 h-5 fill-teal shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="font-body text-body-md text-white/70 group-hover:text-teal transition-colors">
                  {contactInfo.phone}
                </span>
              </Link>
              <Link
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 group"
              >
                <svg className="w-5 h-5 fill-teal shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="font-body text-body-md text-white/70 group-hover:text-teal transition-colors">
                  {contactInfo.email}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-body-md text-white/50">
            © {new Date().getFullYear()} BD Buildcon LLP. All rights reserved.
          </p>
          <Link
            href="#top"
            aria-label="Back to top"
            className="flex items-center gap-2 text-teal hover:text-teal-hover transition-colors font-body text-label-md uppercase tracking-wider"
          >
            Back to top
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}
