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
    year: '2022',
    description:
      'Letter of appreciation from GACL for successful and safe completion of civil and mechanical works at their Vadodara complex.',
    image: undefined,
    documentImage: 'https://placehold.co/600x850/F6F8F8/2E353B?text=GACL+Recommendation+Letter',
  },
  {
    id: 'gfl-rec',
    client: 'Gujarat Fluorochemicals Limited (GFL)',
    clientShort: 'GFL',
    type: 'recommendation',
    year: '2021',
    description:
      'Certificate of appreciation from GFL for timely project execution and exemplary safety performance.',
    image: undefined,
    documentImage: 'https://placehold.co/600x850/F6F8F8/2E353B?text=GFL+Recommendation+Letter',
  },
  {
    id: 'aker-rec',
    client: 'Aker Solutions',
    clientShort: 'Aker Solutions',
    type: 'recommendation',
    year: '2020',
    description:
      'Client recommendation letter confirming BD Buildcon\'s capability for international standard EPC works.',
    image: undefined,
    documentImage: 'https://placehold.co/600x850/F6F8F8/2E353B?text=Aker+Solutions+Letter',
  },
  {
    id: 'tagros-rec',
    client: 'Tagros Chemicals Limited',
    clientShort: 'Tagros',
    type: 'recommendation',
    year: '2022',
    description:
      'Formal appreciation from Tagros for turnkey delivery of their Panoli chemical plant on schedule with zero accidents.',
    image: undefined,
    documentImage: 'https://placehold.co/600x850/F6F8F8/2E353B?text=Tagros+Letter',
  },
  {
    id: 'iso',
    client: 'ISO 9001:2015',
    clientShort: 'ISO 9001:2015',
    type: 'accreditation',
    year: '2023',
    description: 'Quality Management System certification — ISO 9001:2015 for industrial construction and EPC services.',
    image: undefined,
    documentImage: 'https://placehold.co/600x850/F6F8F8/2E353B?text=ISO+9001%3A2015+Certificate',
  },
  {
    id: 'nsic-crisil',
    client: 'NSIC-CRISIL',
    clientShort: 'NSIC-CRISIL',
    type: 'accreditation',
    year: '2023',
    description: 'NSIC-CRISIL performance and credit rating — affirming financial soundness and execution capability.',
    image: undefined,
    documentImage: 'https://placehold.co/600x850/F6F8F8/2E353B?text=NSIC-CRISIL+Rating',
  },
]
