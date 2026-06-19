export type Project = {
  slug: string
  name: string
  client: string
  sector: string
  location: string
  value?: string
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
    client: 'Tagros Chemicals India Ltd.',
    sector: 'Chemical',
    location: '43/1 Amod Road, GIDC Dahej, Ta. Vagra, Dist. Bharuch',
    value: '₹72 Crore',
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
      '₹72 Crore turnkey chemical processing facility at GIDC Dahej — delivered on schedule with zero accidents and formal client appreciation.',
    challenge:
      'Construction of a multi-unit chemical processing complex with stringent environmental and safety regulations, on a tight 18-month schedule, requiring simultaneous civil, mechanical, and piping works across multiple process units.',
    whatWeBuilt:
      'Turnkey EPC delivery encompassing RCC foundations, steel PEB warehouse structures, complete process piping networks, electrical and instrumentation works, effluent treatment plant civil works, and finished road infrastructure across a 12-acre plot.',
    outcome:
      'Plant commissioned on schedule with zero safety incidents. BD Buildcon received a formal letter of appreciation from Tagros Chemicals India Ltd. for timely completion, quality workmanship and exemplary safety performance.',
    quote:
      'Bhumi Developers are one of our major construction contractors. They have an excellent track record and have helped us achieve significant milestones, timely, safely, and with the best quality of workmanship. We recommend them and endorse their maintaining timeliness in projects.',
    quoteName: 'Mr. Sunish Nair',
    quoteTitle: 'Tagros Chemicals India Ltd.',
  },
  {
    slug: 'agrotech',
    name: 'Agrotech Foods Manufacturing Unit',
    client: 'Agrotech Foods Limited',
    sector: 'Food Processing',
    location: 'Plot No. 902/2, Jhagadia GIDC, Jhagadia, Dist. Bharuch',
    value: '₹21 Crore',
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
      '₹21 Crore food-grade processing and packaging facility at Jhagadia GIDC — built to hygienic standards and handed over on deadline.',
    challenge:
      'Food-grade construction demands hygienic finishes, precise floor-level tolerances, and rigorous cleanliness protocols during execution — all while maintaining a 12-month handover commitment to the client.',
    whatWeBuilt:
      'Complete factory shell including RCC frame, epoxy-coated floors, utility piping for steam, compressed air and chilled water, insulated wall cladding, large industrial silos and storage tanks, and external infrastructure.',
    outcome:
      'Plant passed internal quality audits at first inspection. Client renewed engagement for a subsequent expansion project — a direct endorsement of quality and reliability.',
    quote:
      'The team at BD Buildcon understood our requirements and delivered a quality, on-time facility.',
    quoteName: 'Plant Head',
    quoteTitle: 'Agrotech Foods Limited',
  },
  {
    slug: 'amity-enclave',
    name: 'Amity Enclave Residential Complex',
    client: 'Amity Developers',
    sector: 'Residential',
    location: 'Bharuch, Gujarat',
    value: undefined,
    scope: 'Full structural civil works, piling, landscaping, internal roads',
    duration: '24 months',
    year: '2020',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Multi-tower premium residential complex — from deep piling to external landscaping, delivered 3 weeks ahead of schedule.',
    challenge:
      'Multi-tower residential project requiring coordinated piling, RCC frame construction, and finishing works across four simultaneous towers, with phased handover as each tower completed.',
    whatWeBuilt:
      'Deep piling foundation, RCC frames for four 12-storey towers, basement parking structure, internal road network, external landscaping and boundary walls.',
    outcome:
      'Delivered 3 weeks ahead of contracted handover date. All four towers passed structural audit without a single deficiency notice.',
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
    value: undefined,
    scope: 'Mechanical, Piping, Civil',
    duration: '10 months',
    year: '2020',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Live-plant capacity expansion at GACL — executed inside an operating chlorine and caustic plant with a zero-accident record and a formal safety certificate issued by GACL.',
    challenge:
      'Working within an operating chlorine and caustic plant demanded the highest safety discipline — all construction activities required daily audits, isolation permits and continuous coordination with plant operations.',
    whatWeBuilt:
      'New evaporator civil plinth, mechanical erection, interconnecting process piping, insulation, and painting — all within an active production environment.',
    outcome:
      'Zero accidents. Zero near-misses. GACL issued a formal safety certificate confirming BD Buildcon\'s exemplary safety record. A repeat assignment was awarded within 3 months.',
    quote:
      'M/s Bhumi Developers have always taken due care as regards safety precautions. To date, no accident took place during the execution of various jobs assigned to them.',
    quoteName: 'Dy. General Manager (Civil)',
    quoteTitle: 'Gujarat Alkalies & Chemicals Limited',
  },
  {
    slug: 'aker-solutions-dahej',
    name: 'Aker Solutions — Structural Fabrication, Dahej',
    client: 'Aker Solutions',
    sector: 'Petroleum / Industrial',
    location: 'Dahej, Gujarat',
    value: undefined,
    scope: 'Structural Steel Fabrication & Erection',
    duration: '8 months',
    year: '2018',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      '450 MT structural steel fabrication and erection for a fast-track international project at Dahej — completed to international quality standards and within schedule.',
    challenge:
      'High-precision structural fabrication to international specifications, with tight tolerances and a compressed project schedule demanded by Aker\'s global programme.',
    whatWeBuilt:
      '450 MT of structural fabrication and erection for the D-PTFE fast-track project at GFL Dahej — to international engineering and quality standards.',
    outcome:
      'Completed within contracted schedule with excellent quality. Aker Solutions issued a formal completion certificate commending the quality of execution.',
    quote:
      'M/s Bhumi Developers has completed around 450 MT of structural fabrication and erection work of the fast-track project with excellent quality and within the schedule time limit.',
    quoteName: 'Construction Manager',
    quoteTitle: 'Aker Solutions',
  },
  {
    slug: 'saint-gobain-rockwool',
    name: 'Roxul Rockwool Manufacturing Facility',
    client: 'Roxul Rockwool (Saint-Gobain)',
    sector: 'Insulation Manufacturing',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural, Earthwork',
    duration: '16 months',
    year: '2019',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Greenfield insulation manufacturing facility — mass earthwork, heavy refractory foundations and structural erection for a high-temperature industrial process.',
    challenge:
      'High-temperature process requirements dictated heavy refractory foundations and special construction materials, while managing an aggressive schedule aligned with international programme milestones.',
    whatWeBuilt:
      'Mass earthwork (1.2 lakh cum), heavy RCC foundations for furnace equipment, structural steel erection, and site drainage across the entire greenfield plot.',
    outcome:
      'Civil works cleared for equipment installation ahead of schedule. Recognised in the client\'s annual EPC performance review.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
]
