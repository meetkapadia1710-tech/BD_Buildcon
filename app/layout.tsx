import type { Metadata } from 'next'
import { Inter, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothCursor } from '@/components/motion/SmoothCursor'
import { LenisProvider } from '@/components/motion/LenisProvider'
import { PageTransitionOverlay } from '@/components/motion/PageTransitionOverlay'
import { PageWrapper } from '@/components/motion/PageWrapper'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { Toaster } from 'sonner'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { contactInfo, addressComponents, socialLinks } from '@/content/links'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bdbuildcon.com'),
  title: {
    default: 'BD Buildcon LLP | Industrial EPC Contractor, Bharuch, Gujarat',
    template: '%s | BD Buildcon LLP',
  },
  description:
    'Turnkey industrial EPC contractor. All projects completed on deadline with zero accidents. ISO 9001:2015 certified · 35+ years experience · ₹200+ Cr delivered.',
  alternates: {
    canonical: 'https://bdbuildcon.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bdbuildcon.com',
    siteName: 'BD Buildcon LLP',
    title: 'BD Buildcon LLP | Industrial EPC Contractor',
    description:
      'Turnkey industrial EPC contractor with 35+ years experience. All projects completed on deadline with zero accidents.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BD Buildcon LLP | Industrial EPC Contractor',
    description:
      'Turnkey industrial EPC contractor since 1995. All projects completed on deadline with zero accidents.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${hanken.variable}`}>
      <body className="font-body text-ink bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': ['LocalBusiness', 'ConstructionCompany'],
                '@id': 'https://bdbuildcon.com/#organization',
                name: 'BD Buildcon LLP',
                alternateName: 'Bhumi Developers',
                url: 'https://bdbuildcon.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://bdbuildcon.com/logo.svg',
                  width: 200,
                  height: 60,
                },
                image: 'https://bdbuildcon.com/opengraph-image.png',
                description:
                  'Turnkey industrial EPC contractor with 35+ years of delivery. ISO 9001:2015 certified, zero-accident record across 35 years.',
                foundingDate: '1995',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: addressComponents.streetAddress,
                  addressLocality: addressComponents.addressLocality,
                  addressRegion: addressComponents.addressRegion,
                  postalCode: addressComponents.postalCode,
                  addressCountry: addressComponents.addressCountry,
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 21.7051,
                  longitude: 72.9959,
                },
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    telephone: contactInfo.phone,
                    contactType: 'customer service',
                    areaServed: 'IN',
                    availableLanguage: ['English', 'Hindi', 'Gujarati'],
                  },
                ],
                email: contactInfo.email,
                openingHours: contactInfo.openingHoursSchema,
                openingHoursSpecification: contactInfo.openingHoursSpecification,
                priceRange: '₹₹₹',
                currenciesAccepted: 'INR',
                paymentAccepted: 'Bank Transfer, Cheque',
                areaServed: {
                  '@type': 'Country',
                  name: 'India',
                },
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Industrial EPC Services',
                  itemListElement: [
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Civil Engineering' } },
                    {
                      '@type': 'Offer',
                      itemOffered: { '@type': 'Service', name: 'Mechanical Engineering & Industrial Services' },
                    },
                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Turnkey Project Delivery' } },
                  ],
                },
                // TODO(meet): socialLinks in content/links.ts is currently empty — fill in LinkedIn/other profile URLs, plus consider adding Google Business Profile, IndiaMART, and JustDial listing URLs here once live. sameAs is a strong entity-disambiguation signal for AI answer engines.
                sameAs: Object.values(socialLinks).filter(Boolean),
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://bdbuildcon.com/#website',
                url: 'https://bdbuildcon.com',
                name: 'BD Buildcon LLP',
                publisher: { '@id': 'https://bdbuildcon.com/#organization' },
                inLanguage: 'en-IN',
              },
            ]),
          }}
        />
        <LenisProvider>
          <GrainOverlay />
          <SmoothCursor />
          <ScrollProgress />
          <PageTransitionOverlay />
          <Header />
          <PageWrapper>
            <main>{children}</main>
          </PageWrapper>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </LenisProvider>
      </body>
    </html>
  )
}
