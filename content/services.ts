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
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop', // Concrete building structure
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
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=900&auto=format&fit=crop', // Industrial valves and piping
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
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=900&auto=format&fit=crop', // Crane lifting steel frame
    icon: 'construction',
  },
]
