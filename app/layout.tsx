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
  title: 'BD Buildcon LLP | Industrial EPC Contractor, Bharuch, Gujarat',
  description:
    'Turnkey industrial EPC contractor since 1995. All projects completed on deadline with zero accidents. ISO 9001:2015 certified · CRISIL SME 3 rated · ₹200+ Cr delivered.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${hanken.variable}`}>
      <body className="font-body text-ink bg-white antialiased">
        <LenisProvider>
          <SmoothCursor />
          <ScrollProgress />
          <PageTransitionOverlay />
          <Header />
          <PageWrapper>
            <main>{children}</main>
          </PageWrapper>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
