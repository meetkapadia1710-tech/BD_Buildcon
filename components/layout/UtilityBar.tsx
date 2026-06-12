import Link from 'next/link'
import { contactInfo, socialLinks } from '@/content/links'

export function UtilityBar() {
  return (
    <div className="hidden md:block bg-teal text-white text-xs">
      <div className="max-w-container mx-auto px-gutter flex items-center justify-between h-9">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          <Link
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Twitter"
            className="hover:opacity-75 transition-opacity"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.857-8.166-10.643H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </Link>
          <Link
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            className="hover:opacity-75 transition-opacity"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </Link>
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-6">
          <Link
            href={`tel:${contactInfo.phoneTel}`}
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="font-semibold">{contactInfo.phone}</span>
          </Link>
          <Link
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>{contactInfo.email}</span>
          </Link>
          <span className="text-white/80">{contactInfo.hours}</span>
        </div>
      </div>
    </div>
  )
}
