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
  // ── 2023 ─────────────────────────────────────────────────────────────────
  {
    slug: 'tagros-chemicals',
    name: 'Chemical plant & civil package',
    client: 'Tagros Chemicals India Ltd.',
    sector: 'Chemicals',
    location: 'Dahej, Gujarat',
    value: '₹72 Crore',
    scope: 'Civil, Mechanical, Piping, PEB Structure',
    duration: '18 months',
    year: '2023',
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

  // ── 2022 ─────────────────────────────────────────────────────────────────
  {
    slug: 'agrotech',
    name: 'Food processing plant',
    client: 'Agrotech Foods Limited',
    sector: 'Food Processing',
    location: 'Jhagadia, Bharuch',
    value: '₹21 Crore',
    scope: 'Civil, Structural, Flooring, Utility Piping',
    duration: '12 months',
    year: '2022',
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
    quote: 'The team at BD Buildcon understood our requirements and delivered a quality, on-time facility.',
    quoteName: 'Plant Head',
    quoteTitle: 'Agrotech Foods Limited',
  },

  // ── 2021 ─────────────────────────────────────────────────────────────────
  {
    slug: 'eurecat-air-liquide',
    name: 'Technology centre',
    client: 'Eurecat (Air Liquide)',
    sector: 'Industrial Gases',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural Steel, Piping, Mechanical',
    duration: '14 months',
    year: '2021',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      "Turnkey technology centre for Air Liquide's Eurecat catalyst division — precision civil and mechanical construction for a high-specification R&D and production facility.",
    challenge:
      'High-specification process and laboratory requirements demanded close tolerances, specialist mechanical installations, and strict quality protocols throughout construction.',
    whatWeBuilt:
      'Full civil package including RCC structure, process piping systems, mechanical equipment foundations, utility connections and external site works for the catalyst technology centre.',
    outcome:
      'Facility handed over on schedule, meeting all technical specifications. Zero safety incidents recorded across the full construction period.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'birla-cellulose',
    name: 'Cellulose plant',
    client: 'Birla Cellulose',
    sector: 'Natural Fibres',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural, Earthwork, Mechanical',
    duration: '20 months',
    year: '2021',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Greenfield cellulose processing plant for Birla Cellulose — mass earthwork, heavy RCC foundations and PEB structures across a large industrial plot.',
    challenge:
      'Large-scale earthwork and simultaneous multi-discipline construction across different plant zones, with demanding process requirements for the cellulose manufacturing environment.',
    whatWeBuilt:
      'Mass earthwork, RCC equipment foundations, PEB structural buildings, process piping, utility systems, and full site infrastructure for the greenfield processing complex.',
    outcome:
      'Civil and structural works cleared for equipment installation on programme, enabling the client to commission on planned timeline.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },

  // ── 2020 ─────────────────────────────────────────────────────────────────
  {
    slug: 'mangalya',
    name: 'Residential housing complex',
    client: 'Mangalya',
    sector: 'Residential',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural, Piling, Internal Finishing',
    duration: '22 months',
    year: '2020',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Multi-block residential housing complex — from piling through structural frame to finishing works, completed and handed over to schedule.',
    challenge:
      'Phased construction across multiple residential blocks required careful programme management and coordination of resources to maintain individual handover milestones.',
    whatWeBuilt:
      'Piling foundations, RCC structural frame for multiple residential blocks, masonry, plastering, internal finishing works, external landscaping, internal roads and boundary walls.',
    outcome:
      'All blocks handed over within the contracted programme. Zero deficiency notices issued at structural sign-off.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'amity-enclave',
    name: 'Residential complex',
    client: 'Amity Enclave',
    sector: 'Residential',
    location: 'Gujarat',
    value: undefined,
    scope: 'Full structural civil works, piling, landscaping, internal roads',
    duration: '24 months',
    year: '2020',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop'],
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
    name: 'GACL plant expansion',
    client: 'Gujarat Alkalies and Chemicals Limited',
    sector: 'Chemicals',
    location: 'Vadodara, Gujarat',
    value: undefined,
    scope: 'Mechanical, Piping, Civil',
    duration: '10 months',
    year: '2020',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Live-plant capacity expansion at GACL — executed inside an operating chlorine and caustic plant with a zero-accident record and a formal safety certificate issued by GACL.',
    challenge:
      'Working within an operating chlorine and caustic plant demanded the highest safety discipline — all construction activities required daily audits, isolation permits and continuous coordination with plant operations.',
    whatWeBuilt:
      'New evaporator civil plinth, mechanical erection, interconnecting process piping, insulation, and painting — all within an active production environment.',
    outcome:
      "Zero accidents. Zero near-misses. GACL issued a formal safety certificate confirming BD Buildcon's exemplary safety record. A repeat assignment was awarded within 3 months.",
    quote:
      'M/s Bhumi Developers have always taken due care as regards safety precautions. To date, no accident took place during the execution of various jobs assigned to them.',
    quoteName: 'Dy. General Manager (Civil)',
    quoteTitle: 'Gujarat Alkalies & Chemicals Limited',
  },

  // ── 2019 ─────────────────────────────────────────────────────────────────
  {
    slug: 'bostik',
    name: 'Manufacturing facility',
    client: 'Bostik',
    sector: 'Adhesives',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural, Mechanical, Piping',
    duration: '12 months',
    year: '2019',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Adhesives manufacturing facility for Bostik — turnkey civil, structural and mechanical construction of a modern production plant with utility systems.',
    challenge:
      'Adhesives manufacturing requires precise containment structures, chemical-resistant flooring, and careful coordination of process vessel installations within the construction programme.',
    whatWeBuilt:
      'RCC factory frame, chemical-resistant floor systems, process piping, mechanical equipment foundations and erection, utility services, and external site works.',
    outcome:
      'Plant commissioned on schedule. Client noted the quality of civil finishing and the zero-incident safety record maintained throughout construction.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'dic-fine-chemicals',
    name: 'Fine chemicals plant',
    client: 'DIC Fine Chemicals',
    sector: 'Chemicals',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '14 months',
    year: '2019',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Fine chemicals processing plant for DIC — high-specification civil and mechanical package delivered to exacting quality standards.',
    challenge:
      'Fine chemicals production demands high-purity process environments, precision mechanical installations, and rigorous quality verification at every stage of construction.',
    whatWeBuilt:
      'Complete civil and structural package, process piping with high-specification jointing, mechanical equipment erection, insulation, painting, and all utilities.',
    outcome:
      'Works completed within budget and programme. Quality audits cleared at first pass, enabling early equipment vendor access for commissioning.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },

  // ── 2018 ─────────────────────────────────────────────────────────────────
  {
    slug: 'navin-fluorine',
    name: 'Fluorochemical plant',
    client: 'Navin Fluorine International Ltd.',
    sector: 'Fluorochemicals',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Mechanical, Piping, PEB Structure',
    duration: '16 months',
    year: '2018',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Fluorochemical processing facility for Navin Fluorine International — full civil and mechanical package meeting stringent chemical resistance and safety requirements.',
    challenge:
      'Fluorochemical environments demand specialist materials, coatings and construction techniques throughout — from acid-resistant linings to speciality alloy piping — all within a strict safety regime.',
    whatWeBuilt:
      'Civil package with acid-resistant finishes, PEB structural buildings, speciality process piping, mechanical equipment foundations, utility systems and site infrastructure.',
    outcome:
      'Facility handed over on programme with zero safety incidents. Works passed client quality inspection without deficiency comments.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'pritam-residency',
    name: 'Residential complex',
    client: 'Pritam Residency',
    sector: 'Residential',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural, Piling, Internal Finishing',
    duration: '18 months',
    year: '2018',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Residential complex for Pritam Residency — complete structural and civil package from piled foundations to finished apartments.',
    challenge:
      'Urban residential construction with phased handover demands tight scheduling and quality control across all finishing trades within a constrained site.',
    whatWeBuilt:
      'Piling, RCC structural frame, masonry, internal and external plastering, tiling, plumbing first-fix, electrical conduit, and external compound works.',
    outcome: 'Completed and handed over on programme. Zero structural deficiencies raised at handover inspection.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'gnfc',
    name: 'Fertilizer complex',
    client: 'GNFC — Gujarat Narmada Valley Fertilizers & Chemicals',
    sector: 'Fertiliser',
    location: 'Bharuch, Gujarat',
    value: undefined,
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '20 months',
    year: '2018',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Civil and mechanical package for GNFC fertilizer complex — executed within an operating plant environment with stringent safety controls.',
    challenge:
      'Working within an active fertilizer manufacturing complex required detailed isolation planning, permit-to-work compliance, and continuous safety vigilance throughout the construction period.',
    whatWeBuilt:
      'Civil foundations for new process equipment, structural steel erection, process piping installation, mechanical equipment erection, insulation and painting within the operating facility.',
    outcome:
      "Zero accidents throughout execution. Works completed on programme, enabling seamless integration with the client's plant expansion schedule.",
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'aker-solutions-dahej',
    name: 'Structural fabrication, Dahej',
    client: 'Aker Solutions',
    sector: 'Petroleum',
    location: 'Dahej, Gujarat',
    value: undefined,
    scope: 'Structural Steel Fabrication & Erection',
    duration: '8 months',
    year: '2018',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      '450 MT structural steel fabrication and erection for a fast-track international project at Dahej — completed to international quality standards and within schedule.',
    challenge:
      "High-precision structural fabrication to international specifications, with tight tolerances and a compressed project schedule demanded by Aker's global programme.",
    whatWeBuilt:
      '450 MT of structural fabrication and erection for the D-PTFE fast-track project at GFL Dahej — to international engineering and quality standards.',
    outcome:
      'Completed within contracted schedule with excellent quality. Aker Solutions issued a formal completion certificate commending the quality of execution.',
    quote:
      'M/s Bhumi Developers has completed around 450 MT of structural fabrication and erection work of the fast-track project with excellent quality and within the schedule time limit.',
    quoteName: 'Construction Manager',
    quoteTitle: 'Aker Solutions',
  },

  // ── 2017 ─────────────────────────────────────────────────────────────────
  {
    slug: 'gfl-dahej',
    name: 'Fluorochemical plant, Dahej',
    client: 'GFL — Gujarat Fluorochemicals Ltd.',
    sector: 'Fluorochemicals',
    location: 'Dahej, Gujarat',
    value: undefined,
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '18 months',
    year: '2017',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Fluorochemical plant at Dahej SEZ for GFL — large-scale civil and mechanical package for an integrated fluorine chemistry facility.',
    challenge:
      'Complex multi-discipline construction in a fluorine processing environment, coordinating civil, piping and structural works across multiple process areas simultaneously.',
    whatWeBuilt:
      'Mass earthwork, RCC equipment foundations, structural steel frame, process piping systems, mechanical equipment erection, and full site infrastructure at the Dahej facility.',
    outcome:
      'Works handed over on programme. Client recognised the quality of execution and zero-accident safety record.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },

  // ── 2016 ─────────────────────────────────────────────────────────────────
  {
    slug: 'roxul-rockwool',
    name: 'Rockwool manufacturing plant',
    client: 'Roxul Rockwool',
    sector: 'Insulation',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural, Earthwork',
    duration: '16 months',
    year: '2016',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Greenfield insulation manufacturing facility — mass earthwork, heavy refractory foundations and structural erection for a high-temperature industrial process.',
    challenge:
      'High-temperature process requirements dictated heavy refractory foundations and special construction materials, while managing an aggressive schedule aligned with international programme milestones.',
    whatWeBuilt:
      'Mass earthwork (1.2 lakh cum), heavy RCC foundations for furnace equipment, structural steel erection, and site drainage across the entire greenfield plot.',
    outcome:
      "Civil works cleared for equipment installation ahead of schedule. Recognised in the client's annual EPC performance review.",
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'hscl',
    name: 'Infrastructure project',
    client: 'HSCL',
    sector: 'Infrastructure',
    location: 'India',
    value: undefined,
    scope: 'Civil, Structural, Earthwork',
    duration: '24 months',
    year: '2016',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Large-scale infrastructure project for Hindustan Steelworks Construction Ltd. — civil and structural package completed to government specification.',
    challenge:
      'Infrastructure works at scale require rigorous quality control, adherence to government specifications, and coordination across extended site areas — all within a demanding programme.',
    whatWeBuilt:
      'Civil foundations, structural works, earthwork and site grading, drainage, and ancillary infrastructure works in accordance with HSCL specifications.',
    outcome: 'Works passed government inspection at first submission. Completion certificate issued on programme.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },

  // ── 2015 ─────────────────────────────────────────────────────────────────
  {
    slug: 'zcl-chemicals',
    name: 'Chemical plant',
    client: 'ZCL',
    sector: 'Chemicals',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Mechanical, Piping',
    duration: '12 months',
    year: '2015',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Chemical processing plant for ZCL — turnkey civil and mechanical construction delivered on time and within budget.',
    challenge:
      'Multi-discipline chemical plant construction requiring parallel execution of civil, piping, and mechanical works within a compressed programme.',
    whatWeBuilt:
      'RCC foundations, structural buildings, process piping systems, mechanical equipment erection, utilities, and site infrastructure.',
    outcome:
      "Plant commissioned on schedule. Client cited BD Buildcon's project management capability and quality workmanship.",
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'atg-tyres',
    name: 'Tyre manufacturing plant',
    client: 'ATG Tyres',
    sector: 'Tyre',
    location: 'Gujarat',
    value: undefined,
    scope: 'Civil, Structural, Mechanical, Piping',
    duration: '18 months',
    year: '2015',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Tyre manufacturing facility for ATG Tyres — large-span PEB structures, heavy equipment foundations, and utility systems across a multi-hectare industrial plot.',
    challenge:
      'Tyre manufacturing plants require heavy equipment foundations for curing presses, large clear-span structures, and extensive utility distribution — all coordinated within an aggressive construction programme.',
    whatWeBuilt:
      'Mass earthwork, heavy RCC curing press foundations, large-span PEB structures, utility piping for steam, compressed air and chilled water, mechanical equipment foundations, and full site infrastructure.',
    outcome:
      'Structural works handed over ahead of equipment installation schedule, enabling ATG Tyres to commission the plant within their planned timeline.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },

  // ── 2014 ─────────────────────────────────────────────────────────────────
  {
    slug: 'royal-palm',
    name: 'Golf & country club',
    client: 'Royal Palm',
    sector: 'Hospitality',
    location: 'Mumbai, Maharashtra',
    value: undefined,
    scope: 'Civil, Structural, Landscape, Internal Finishing',
    duration: '30 months',
    year: '2014',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop'],
    excerpt:
      'Golf & country club facility for Royal Palm, Mumbai — premium civil and finishing works for a prestigious leisure and hospitality destination.',
    challenge:
      'Premium hospitality construction demands an elevated standard of finishing quality, careful co-ordination of specialist trades, and site management that minimises disruption to surrounding areas.',
    whatWeBuilt:
      'RCC clubhouse structure, premium internal and external finishing, amenity facility civil works, landscaping and earthwork for golf course integration, car park and access roads.',
    outcome:
      "Facility completed and opened on schedule. BD Buildcon's finishing quality was commended by the client during handover.",
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
  {
    slug: 'khemani-distilleries',
    name: 'Distillery civil package',
    client: 'Khemani Distilleries Pvt. Ltd.',
    sector: 'Petroleum',
    location: 'Daman, UT',
    value: undefined,
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '14 months',
    year: '2014',
    safetyRecord: 'Zero accidents',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    ],
    excerpt:
      'Civil and mechanical package for Khemani Distilleries at Daman — full construction of a distillery complex with process piping, storage and utility systems.',
    challenge:
      'Distillery construction requires flammable-area classified construction methods, specialist piping, and integration of large storage vessel civil works — all under strict safety protocols.',
    whatWeBuilt:
      'RCC civil foundations, process building structures, distillation column civil works, bulk storage tank civil packages, utility piping, and full site infrastructure at the Daman facility.',
    outcome:
      'Works completed on programme with zero safety incidents. Client awarded BD Buildcon a repeat engagement for facility expansion the following year.',
    quote: undefined,
    quoteName: undefined,
    quoteTitle: undefined,
  },
]
