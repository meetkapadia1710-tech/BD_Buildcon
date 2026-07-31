export type Award = {
  id: string
  /** Headline achievement — what the award was actually for. */
  title: string
  /** Full legal name of the issuing organisation. */
  issuer: string
  /** Short form for compact card labels. */
  issuerShort: string
  /** What kind of recognition this is, as printed on the award itself. */
  kind: string
  /** Project the award relates to, where the award names one. */
  project?: string
  /** Omitted where the award carries no visible date — never guessed. */
  year?: string
  description: string
  image: string
}

/**
 * Client-issued safety recognitions. Every field below is transcribed from the
 * award images in public/awards — nothing is inferred. The Aarti certificate
 * carries no visible date, so it has no `year` rather than an invented one.
 *
 * Surfaced by components/ui/AwardsSection.tsx on /safety-quality and /about,
 * and summarised into the Organization JSON-LD `award` property in app/layout.tsx.
 */
export const awards: Award[] = [
  {
    id: 'dfpcl-dahej-3m-appreciation',
    title: '3 Million Safe Manhours',
    issuer: 'Deepak Fertilisers and Petrochemicals Corporation Limited',
    issuerShort: 'DFPCL',
    kind: 'Certificate of Appreciation',
    project: 'Nitric Acid Expansion Project, Dahej, Gujarat',
    year: '2025',
    description:
      'Awarded by DFPCL for completing 3 million safe manhours on the Nitric Acid Expansion Project at Dahej — recognising sustained adherence to safety standards and a hazard-free work environment. Signed by the President–Projects, DFPCL.',
    image: '/awards/dahej_4k.png',
  },
  {
    id: 'dfpcl-dahej-award-of-excellence',
    title: 'Award of Excellence',
    issuer: 'Deepak Fertilisers and Petrochemicals Corporation Limited',
    issuerShort: 'DFPCL',
    kind: 'Award of Excellence',
    project: 'DFPCL Dahej Project',
    year: '2025',
    description:
      'Presented in recognition of BD Buildcon’s contribution to achieving 3 million safe man hours at the DFPCL Dahej project, citing commitment to safety, quality and teamwork.',
    image: '/awards/safe man hours 4k.png',
  },
  {
    id: 'aarti-2-5m-safe-manhours',
    title: '2.5 Million Safe Manhours',
    issuer: 'Aarti Industries Limited',
    issuerShort: 'Aarti Industries',
    kind: 'Certificate of Achievement',
    description:
      'Issued by Aarti Industries in recognition of achieving 2.5 million safe manhours on site, countersigned by their Construction Safety Head and Construction Vertical Head.',
    image: '/awards/aarti_4k.png',
  },
]
