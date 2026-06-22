import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BD Buildcon LLP - Corporate Brochure',
  description: 'Turnkey industrial EPC contractor with 35+ years in Civil, Mechanical, PEB structures, piling and piping.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
