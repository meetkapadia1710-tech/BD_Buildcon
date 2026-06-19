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
    id: 'tagros',
    company: 'Tagros Chemicals India Ltd.',
    companyShort: 'Tagros Chemicals',
    name: 'Mr. Sunish Nair',
    title: 'Tagros Chemicals India Ltd.',
    quote:
      'Bhumi Developers are one of our major construction contractors. They have an excellent track record and have helped us achieve significant milestones, timely, safely, and with the best quality of workmanship. They are dedicated contractors with all technology in construction under one roof. They have a track record of completing major tasks in minimum timelines and with zero accidents. We recommend them and endorse their maintaining timeliness in projects.',
    logo: undefined,
  },
  {
    id: 'mott-macdonald',
    company: 'Mott MacDonald, Mumbai',
    companyShort: 'Mott MacDonald',
    name: 'Mr. UM Mukharjee',
    title: 'Mott MacDonald, Mumbai',
    quote:
      'We appreciate M/s Bhumi Developers on successfully completing the Civil and Structural work with ZERO accident. We also appreciate their professionalism, workmanship, minimum usage of manpower and maximum usage of technologies and machineries.',
    logo: undefined,
  },
  {
    id: 'khemani',
    company: 'Khemani Distilleries Pvt. Ltd.',
    companyShort: 'Khemani Distilleries',
    name: 'Mr. Anubhav Kumar Verma',
    title: 'Khemani Distilleries Pvt. Ltd.',
    quote:
      'We are impressed with their professional approach and commitment towards the job.',
    logo: undefined,
  },
  {
    id: 'facilities-bangalore',
    company: 'Facilities and Building Solutions Pvt. Ltd., Bangalore',
    companyShort: 'Facilities & Building Solutions',
    name: 'Patil V.S.',
    title: 'Facilities and Building Solutions Pvt. Ltd.',
    quote:
      'M/s Bhumi Developers executed our Project at Daman (UT) with ZERO legal litigation and in a time-bound manner. We wish them all the best for their future projects.',
    logo: undefined,
  },
  {
    id: 'consultant-shah',
    company: 'Independent Consultant',
    companyShort: 'N.P. Shah — Consultant',
    name: 'N.P. Shah',
    title: 'Consultant',
    quote:
      'I am extremely pleased with the planning, speed and commitment towards the job.',
    logo: undefined,
  },
  {
    id: 'gacl',
    company: 'Gujarat Alkalies & Chemicals Limited',
    companyShort: 'GACL',
    name: 'Dy. General Manager (Civil)',
    title: 'Gujarat Alkalies & Chemicals Limited',
    quote:
      'M/s Bhumi Developers have always taken due care as regards safety precautions while working on various jobs assigned to them. To date, no accident took place during the execution of various jobs. We certify their outstanding safety record and quality of execution.',
    logo: undefined,
  },
]
