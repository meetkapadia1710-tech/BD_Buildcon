export type Certification = {
  id: string
  client: string
  clientShort: string
  type: 'recommendation' | 'accreditation'
  year: string
  description: string
  image?: string
  documentImage?: string
}

export const certifications: Certification[] = [
  {
    id: 'gacl-rec',
    client: 'Gujarat Alkalies & Chemicals Limited (GACL)',
    clientShort: 'GACL',
    type: 'recommendation',
    year: '2020',
    description:
      'Safety certificate from GACL confirming zero accidents across all jobs executed at their facility. Signed by the Dy. General Manager (Civil).',
    image: undefined,
    documentImage: '/images/certificate_placeholder.webp',
  },
  {
    id: 'gfl-rec',
    client: 'Gujarat Fluorochemicals Limited (GFL)',
    clientShort: 'GFL',
    type: 'recommendation',
    year: '2019',
    description:
      'Vendor qualification certificate from GFL confirming BD Buildcon (formerly Bhumi Developers) as an approved contractor for civil construction at GFL Dahej Factory.',
    image: undefined,
    documentImage: '/images/certificate_placeholder.webp',
  },
  {
    id: 'aker-rec',
    client: 'Aker Solutions',
    clientShort: 'Aker Solutions',
    type: 'recommendation',
    year: '2018',
    description:
      'Completion certificate from Aker Solutions for the successful fabrication and erection of 450 MT of structural steel for a fast-track project at Dahej — executed to specification and on schedule.',
    image: undefined,
    documentImage: '/images/certificate_placeholder.webp',
  },
  {
    id: 'mott-rec',
    client: 'Mott MacDonald, Mumbai',
    clientShort: 'Mott MacDonald',
    type: 'recommendation',
    year: '2019',
    description:
      'Appreciation letter from Mott MacDonald recognising BD Buildcon for completing Civil and Structural works with zero accidents, and commending their professionalism and use of modern construction technologies.',
    image: undefined,
    documentImage: '/images/certificate_placeholder.webp',
  },
  {
    id: 'iso',
    client: 'TÜV SÜD South Asia — ISO 9001:2015',
    clientShort: 'ISO 9001:2015',
    type: 'accreditation',
    year: '2023',
    description:
      'Quality Management System certification issued by TÜV SÜD South Asia. Scope: Design, Construction and Erection of Pre-Engineered Buildings, Turnkey Real Estate, and Turnkey Industrial Construction Projects.',
    image: undefined,
    documentImage: '/images/certificate_placeholder.webp',
  },
  {
    id: 'crisil',
    client: 'CRISIL SME Rating — NSIC',
    clientShort: 'NSIC-CRISIL',
    type: 'accreditation',
    year: '2015',
    description:
      'CRISIL SME Rating of SME 3 awarded by NSIC-CRISIL, indicating an "Above Average" level of creditworthiness adjudged against other SMEs in India.',
    image: undefined,
    documentImage: '/images/certificate_placeholder.webp',
  },
]
