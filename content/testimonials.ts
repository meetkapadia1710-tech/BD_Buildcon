export type Testimonial = {
  id: string
  company: string
  companyShort: string
  name: string
  title: string
  quote: string
  logo?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'gacl',
    company: 'Gujarat Alkalies & Chemicals Limited',
    companyShort: 'GACL',
    name: 'Project Director',
    title: 'Gujarat Alkalies & Chemicals Limited',
    quote:
      "BD Buildcon's safety culture is outstanding. Working inside our operating plant demands the highest discipline — they delivered flawlessly with zero incidents and completed the scope ahead of schedule.",
    logo: undefined,
  },
  {
    id: 'gfl',
    company: 'Gujarat Fluorochemicals Limited',
    companyShort: 'GFL',
    name: 'Head – Project Execution',
    title: 'Gujarat Fluorochemicals Limited',
    quote:
      "We have worked with BD Buildcon on multiple occasions. Their professionalism, quality of work and on-time delivery has made them a trusted partner for our capital expansion projects.",
    logo: undefined,
  },
  {
    id: 'mott-macdonald',
    company: 'Mott MacDonald',
    companyShort: 'Mott MacDonald',
    name: 'Senior Project Manager',
    title: 'Mott MacDonald India',
    quote:
      "Technically competent, safety-conscious and commercially reliable. BD Buildcon consistently meets our stringent contractor assessment criteria — we recommend them for industrial EPC work of any scale.",
    logo: undefined,
  },
  {
    id: 'tagros',
    company: 'Tagros Chemicals Limited',
    companyShort: 'Tagros',
    name: 'Plant Head',
    title: 'Tagros Chemicals Limited',
    quote:
      "BD Buildcon delivered our Panoli facility on time with the highest quality standards. Their zero-accident record on our site is a testament to their safety-first culture. We look forward to future collaborations.",
    logo: undefined,
  },
  {
    id: 'aker',
    company: 'Aker Solutions',
    companyShort: 'Aker Solutions',
    name: 'Construction Manager',
    title: 'Aker Solutions India',
    quote:
      "Reliable, skilled, and focused on quality. BD Buildcon executed the civil and structural scope for our project to international standards — on budget and within the contracted timeframe.",
    logo: undefined,
  },
]
