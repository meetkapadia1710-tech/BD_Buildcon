export type Project = {
  slug: string
  name: string
  client: string
  sector: string
  location: string
  scope: string
  duration: string
  year: string
  safetyRecord: string
  image: string
  images: string[]
  excerpt: string
  challenge: string
  whatWeBuilt: string
  outcome: string
  quote?: string
  quoteName?: string
  quoteTitle?: string
}

export const projects: Project[] = [
  {
    slug: 'tagros-chemicals',
    name: 'Tagros Chemicals Plant',
    client: 'Tagros Chemicals Limited',
    sector: 'Chemical',
    location: 'Panoli, Gujarat',
    scope: 'Civil, Mechanical, Piping, PEB Structure',
    duration: '18 months',
    year: '2022',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'State-of-the-art chemical processing facility built with advanced safety and environmental controls at Panoli GIDC.',
    challenge:
      'Construction of a multi-unit chemical processing complex with stringent environmental and safety regulations, on a tight 18-month schedule, requiring simultaneous civil, mechanical, and piping works across multiple process units.',
    whatWeBuilt:
      'Turnkey EPC delivery encompassing RCC foundations, steel PEB warehouse structures, complete process piping networks, electrical and instrumentation works, effluent treatment plant civil works, and finished road infrastructure across a 12-acre plot.',
    outcome:
      'Plant commissioned on schedule with zero safety incidents. Client reported a 15% faster startup versus similar projects. BD Buildcon received a formal appreciation letter for timely and quality execution.',
    quote:
      'BD Buildcon delivered our project on time with the highest quality. Their safety standards and professionalism were exemplary throughout.',
    quoteName: 'Project Manager',
    quoteTitle: 'Tagros Chemicals Limited',
  },
  {
    slug: 'agrotech',
    name: 'Agro Tech Foods Manufacturing Unit',
    client: 'Agro Tech Foods (ConAgra)',
    sector: 'Food',
    location: 'Bharuch, Gujarat',
    scope: 'Civil, Structural, Flooring, Utility Piping',
    duration: '12 months',
    year: '2021',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'High-capacity food processing and packaging plant with hygienic flooring, heavy-duty civil works and utility installations.',
    challenge:
      'Food-grade construction demands hygienic finishes, precise floor-level tolerances, and rigorous cleanliness protocols during execution — all while maintaining a 12-month handover commitment.',
    whatWeBuilt:
      'Complete factory shell including RCC frame, epoxy-coated floors, utility piping for steam, compressed air and chilled water, insulated wall cladding, and external infrastructure.',
    outcome:
      'Plant passed FDA and internal quality audits at first inspection. Client renewed engagement for a subsequent expansion project.',
    quote:
      'The team at BD Buildcon understood our hygiene requirements and delivered a spotless, on-time facility.',
    quoteName: 'Plant Head',
    quoteTitle: 'Agro Tech Foods',
  },
  {
    slug: 'amity-enclave',
    name: 'Amity Enclave Residential Complex',
    client: 'Amity Developers',
    sector: 'Residential',
    location: 'Bharuch, Gujarat',
    scope: 'Full structural civil works, landscaping, roads',
    duration: '24 months',
    year: '2020',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Premium residential towers with modern amenities — from foundation piling to external landscaping and internal roads.',
    challenge:
      'Multi-tower residential project requiring coordinated piling, RCC frame construction, and finishing works across four simultaneous towers, with residents moving into completed towers while others were still under construction.',
    whatWeBuilt:
      'Deep piling foundation, RCC frames for four 12-storey towers, basement parking structure, internal road network, external landscaping and boundary walls.',
    outcome:
      'Delivered 3 weeks ahead of contracted handover date. All four towers passed structural audit without a single deficiency notice.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'abcfrc',
    name: 'ABCFRC Industrial Plant',
    client: 'ABCFRC Limited',
    sector: 'Chemical',
    location: 'Ankleshwar, Gujarat',
    scope: 'Civil, Piling, PEB, Mechanical Piping',
    duration: '14 months',
    year: '2023',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Greenfield industrial plant with deep piling, PEB warehouse, and complete process mechanical piping.',
    challenge:
      'Soft soil conditions required a deep bored-pile foundation strategy across the entire plot, extending the critical path — necessitating parallel-track construction planning to maintain schedule.',
    whatWeBuilt:
      'Bored piling (250+ piles), RCC pile cap and raft, PEB warehouse (3,500 sqm), complete process piping, access roads and drainage infrastructure.',
    outcome:
      'Handed over on schedule. Piling solution validated by third-party geotechnical consultant with zero deviation from design.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'gacl-plant',
    name: 'GACL Plant Expansion',
    client: 'Gujarat Alkalies and Chemicals Limited (GACL)',
    sector: 'Chemical',
    location: 'Vadodara, Gujarat',
    scope: 'Mechanical, Piping, Civil',
    duration: '10 months',
    year: '2022',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      "Capacity expansion works at GACL's operating chemical plant, requiring high-safety shutdown and live-plant construction.",
    challenge:
      'Working within an operating chlorine and caustic plant with extremely stringent safety protocols — all construction activities required daily safety audits and isolation permits.',
    whatWeBuilt:
      'New evaporator civil plinth, mechanical erection, interconnecting process piping, insulation, and painting.',
    outcome:
      'Zero near-misses, zero safety incidents. GACL issued a formal letter of appreciation. Repeat assignment awarded within 3 months.',
    quote:
      "BD Buildcon's safety culture is outstanding. They are our preferred contractor for sensitive plant work.",
    quoteName: 'Project Director',
    quoteTitle: 'Gujarat Alkalies & Chemicals Limited',
  },
  {
    slug: 'saint-gobain-rockwool',
    name: 'Saint-Gobain / Rockwool Facility',
    client: 'Saint-Gobain / Rockwool',
    sector: 'Glass',
    location: 'Sriperumbudur, Tamil Nadu',
    scope: 'Civil, Structural, Earthwork',
    duration: '16 months',
    year: '2021',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Large-scale greenfield glass wool manufacturing facility — site preparation, heavy civil works, and structural erection.',
    challenge:
      'High-temperature process requirements dictated heavy refractory foundations and special construction materials while managing an aggressive international project schedule.',
    whatWeBuilt:
      'Mass earthwork (1.2L cum), heavy RCC foundations for furnace equipment, structural steel erection, and site drainage.',
    outcome:
      "Civil works cleared for equipment installation two weeks ahead of schedule. Recognised in the client's annual EPC performance review.",
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
]
