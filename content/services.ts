export type Service = {
  id: string
  title: string
  shortTitle: string
  description: string
  bullets: string[]
  image: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'civil-engineering',
    title: 'Civil Engineering',
    shortTitle: 'Civil Engineering',
    description:
      'Complete civil works for industrial, commercial and corporate projects — from greenfield and brownfield developments to plant expansions, RCC construction, heavy foundations and site infrastructure.',
    bullets: [
      'Industrial Infrastructure Development',
      'Brownfield & Greenfield Projects',
      'Plant Expansion & Industrial Modernization',
      'Industrial, Commercial & Corporate Buildings',
      'Warehouses & Logistics Facilities',
      'RCC Construction',
      'Structural Engineering & Construction',
      'Heavy Equipment Foundations & Pile Foundations',
      'Site Development, Earthworks, Excavation & Backfilling',
      'Internal Roads & Pavements',
      'Storm Water & Drainage Systems',
      'Underground Utility & Service Networks',
    ],
    image: '/brochurephotos/site photos/technical photos/DocScanner Sep 9, 2025 5-45 PM_1(20).jpg', // Concrete building structure
    icon: 'foundation',
  },
  {
    id: 'mechanical-industrial',
    title: 'Mechanical Engineering & Industrial Services',
    shortTitle: 'Mechanical & Industrial',
    description:
      'Mechanical construction, heavy equipment erection, structural steel and piping fabrication — backed by an in-house fabrication yard, slag blasting, industrial painting and protective coating systems.',
    bullets: [
      'Mechanical Construction',
      'Heavy Equipment Erection',
      'Mechanical Equipment Installation',
      'Industrial Fabrication',
      'Structural Steel Fabrication',
      'Process & Utility Piping Fabrication',
      'In-House Fabrication Yard',
      'Industrial Piping Systems',
      'Utility Piping Networks',
      'Slag Blasting',
      'Industrial Painting',
      'Protective Coating Systems',
    ],
    image: '/brochurephotos/structure/WhatsApp Image 2026-07-12 at 12.14.02 PM (1).jpeg', // Industrial valves and piping
    icon: 'plumbing',
  },
  {
    id: 'turnkey-delivery',
    title: 'Turnkey Project Delivery',
    shortTitle: 'Turnkey Delivery',
    description:
      'End-to-end project delivery — planning, scheduling and controls, procurement, QA/QC, HSE management, testing and commissioning, right through to handover and after-sales support.',
    bullets: [
      'Project Planning',
      'Project Scheduling & Controls',
      'Procurement Management',
      'Vendor & Supply Chain Management',
      'Cost Optimization',
      'Material Inspection',
      'Quality Assurance & Quality Control (QA/QC)',
      'Health, Safety & Environment (HSE) Management',
      'Safety Audits',
      'Testing & Commissioning',
      'Project Handover',
      'After-Sales Support',
    ],
    image: '/brochurephotos/site photos/dic fine chem/DSC_2480.JPG', // Crane lifting steel frame
    icon: 'construction',
  },
]
