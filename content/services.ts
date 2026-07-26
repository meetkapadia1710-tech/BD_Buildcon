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
      'Complete civil works for industrial and corporate projects — from greenfield and brownfield developments to plant expansions, RCC construction, heavy foundations and site infrastructure.',
    bullets: [
      'Industrial Infrastructure Development',
      'Brownfield & Greenfield Projects',
      'Plant Expansion & Industrial Modernization',
      'Industrial & Corporate Buildings',
      'Chemical Tanks, Cooling Tower, ETP and STP Systems, and Civil',
      'Warehouses & Logistics Facilities',
      'RCC Construction',
      'Structural Engineering & Construction',
      'Heavy Equipment Foundations & Pile Foundations',
      'Site Development, Earthworks, Excavation & Backfilling',
      'Internal Roads & Pavements',
      'Storm Water & Drainage Systems',
      'Underground Utility & Service Networks',
    ],
    image: '/brochurephotos/site photos/technical photos/DocScanner Sep 9, 2025 5-45 PM_1(20).webp', // Concrete building structure
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
    image: '/brochurephotos/structure/WhatsApp Image 2026-07-12 at 12.14.02 PM (1).webp', // Industrial valves and piping
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
    image: '/brochurephotos/site photos/dic fine chem/DSC_2480.webp', // Crane lifting steel frame
    icon: 'construction',
  },
]

export type SpecializedService = {
  id: string
  title: string
  category: 'Civil Engineering' | 'Mechanical & Industrial' | 'Turnkey Delivery'
  sectorLabel: string
  description: string
  iconName: string
}

export const specializedServices: SpecializedService[] = [
  {
    id: 'industrial-building',
    title: 'Industrial Building works',
    category: 'Civil Engineering',
    sectorLabel: 'Industrial',
    description:
      'Heavy industrial structures, manufacturing plants, RCC construction, and corporate complexes built to exacting engineering standards.',
    iconName: 'factory',
  },
  {
    id: 'road-drain',
    title: 'Road & drain works',
    category: 'Civil Engineering',
    sectorLabel: 'Infrastructure',
    description:
      'Heavy-duty internal roads, concrete pavements, highway access roads, storm water drainage, and utility networks.',
    iconName: 'road',
  },
  {
    id: 'heavy-rig-foundation',
    title: 'Heavy Rig Foundation & Huge Pile Work',
    category: 'Civil Engineering',
    sectorLabel: 'Industrial',
    description:
      'Deep pile foundations, RCC machine foundations, and dynamic vibration-resistant base structures for industrial equipment.',
    iconName: 'rig',
  },
  {
    id: 'solar-epc-wind',
    title: 'Solar EPC & WTG Wind Foundation work',
    category: 'Civil Engineering',
    sectorLabel: 'Renewable Energy',
    description:
      'Comprehensive civil EPC works for solar power parks and high-capacity wind turbine generator (WTG) foundations.',
    iconName: 'solar',
  },
  {
    id: 'peb-work',
    title: 'Pre-Engineerinng Building (PEB) work',
    category: 'Mechanical & Industrial',
    sectorLabel: 'Industrial',
    description:
      'High-tensile structural steel PEB frames, rapid assembly sheds, and modular industrial factory structures.',
    iconName: 'peb',
  },
  {
    id: 'structural-steel',
    title: 'structural steel work',
    category: 'Mechanical & Industrial',
    sectorLabel: 'Industrial',
    description:
      'Custom structural steel fabrication, heavy girders, industrial pipe racks, and multi-story steel frameworks.',
    iconName: 'steel',
  },
  {
    id: 'tanks-cooling-etp',
    title: 'Chemical Tanks, Cooling Tower, ETP & STP system, Etc',
    category: 'Mechanical & Industrial',
    sectorLabel: 'Petrochemical',
    description:
      'Industrial storage tanks, cooling tower basins, effluent (ETP) and sewage treatment (STP) civil and mechanical works.',
    iconName: 'tanks',
  },
  {
    id: 'warehouse-work',
    title: 'Warehouse Work',
    category: 'Civil Engineering',
    sectorLabel: 'Logistics',
    description:
      'Large-span automated warehouses, cold storage logistics hubs, and high-floor-load industrial fulfillment centers.',
    iconName: 'warehouse',
  },
  {
    id: 'process-utility-piping',
    title: 'Process & Utility Piping Networks',
    category: 'Mechanical & Industrial',
    sectorLabel: 'Petrochemical',
    description:
      'End-to-end industrial piping fabrication, high-pressure utility lines, valve manifolds, and testing systems.',
    iconName: 'piping',
  },
  {
    id: 'heavy-equipment-erection',
    title: 'Heavy Equipment Erection & Rigging',
    category: 'Mechanical & Industrial',
    sectorLabel: 'Industrial',
    description:
      'Precision alignment and heavy rigging of industrial boilers, turbines, vessels, and rotating plant machinery.',
    iconName: 'crane',
  },
  {
    id: 'slag-blasting-painting',
    title: 'Slag Blasting & Protective Coating Systems',
    category: 'Mechanical & Industrial',
    sectorLabel: 'Surface Protection',
    description:
      'Advanced surface preparation, abrasive slag blasting, and multi-layer anti-corrosive industrial painting systems.',
    iconName: 'coating',
  },
  {
    id: 'turnkey-epc-hse',
    title: 'Turnkey Project Delivery & HSE Management',
    category: 'Turnkey Delivery',
    sectorLabel: 'Project Management',
    description:
      'End-to-end project controls, procurement, QA/QC testing, commissioning, and uncompromising HSE compliance.',
    iconName: 'turnkey',
  },
]
