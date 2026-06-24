import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About BD Buildcon',
  description:
    'Learn about BD Buildcon LLP — a turnkey industrial EPC contractor with 35+ years, ISO 9001:2015 certified, specialised in Civil, Mechanical, PEB, piling and piping.',
}

export default function AboutPage() {
  return (
    <>
      <PageTitleBand title="About BD Buildcon" breadcrumbs={[{ label: 'About Us' }]} />
      <Suspense fallback={<div className="section-pad bg-white" />}>
        <AboutContent />
      </Suspense>
      <CTABand />
    </>
  )
}
