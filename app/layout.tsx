import type { Metadata } from 'next'
import { Hanken_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { UtilityBar } from '@/components/layout/UtilityBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/motion/LenisProvider'
import { PageTransitionOverlay } from '@/components/motion/PageTransitionOverlay'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BD Buildcon LLP | Industrial EPC Contractor, Bharuch, Gujarat',
    template: '%s | BD Buildcon LLP',
  },
  description:
    'BD Buildcon LLP (formerly Bhumi Developers) — turnkey industrial EPC contractor with 35+ years in Civil, Mechanical, PEB structures, piling and piping. ISO 9001:2015 certified. Based in Bharuch, Gujarat.',
  keywords: [
    'industrial EPC contractor',
    'turnkey construction',
    'PEB structures',
    'civil construction',
    'Bharuch Gujarat',
    'BD Buildcon',
    'Bhumi Developers',
    'industrial construction',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bdbuildcon.com',
    siteName: 'BD Buildcon LLP',
    title: 'BD Buildcon LLP | Industrial EPC Contractor',
    description:
      'Turnkey industrial EPC contractor with 35+ years. Specialised in Civil, Mechanical, PEB, piling, piping. ISO 9001:2015 certified.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BD Buildcon LLP | Industrial EPC Contractor',
    description: 'Turnkey industrial EPC contractor since 1995. Zero accidents. On-time delivery.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${hanken.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'BD Buildcon LLP',
              alternateName: 'Bhumi Developers',
              url: 'https://bdbuildcon.com',
              telephone: '+919879100355',
              email: 'business@bdbuildcon.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '7-8-9, Millenium Arcade, Opp. SVM Engineering College, Old National Highway No 8',
                addressLocality: 'Bharuch',
                addressRegion: 'Gujarat',
                postalCode: '392002',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '21.7051',
                longitude: '72.9959',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '10:00',
                closes: '20:00',
              },
              description:
                'Turnkey industrial EPC contractor specialised in Civil, Mechanical, PEB, piling, piping. 35+ years. ISO 9001:2015 certified.',
            }),
          }}
        />
      </head>
      <body>
        <LenisProvider>
          <PageTransitionOverlay />
          <UtilityBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
