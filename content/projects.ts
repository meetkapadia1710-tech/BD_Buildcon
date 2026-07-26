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
    slug: 'aarti-industries',
    name: 'Industrial Expansion',
    client: 'Aarti Industries Ltd.',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Structural',
    duration: '14 months',
    year: '2023',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/aarti industries/DocScanner Sep 9, 2025 5-45 PM_1(4).webp',
    images: [
      '/brochurephotos/site photos/aarti industries/DocScanner Sep 9, 2025 5-45 PM_1(4).webp',
      '/brochurephotos/site photos/aarti industries/WhatsApp Image 2026-07-03 at 8.43.07 PM.webp',
    ],
    excerpt: 'Key industrial expansion project executed with strict safety parameters.',
    challenge: 'Working in a live chemical environment required extreme caution and precision.',
    whatWeBuilt: 'Civil structures and expansion infrastructure.',
    outcome: 'Completed smoothly with no disruptions to existing operations.',
  },
  {
    slug: 'birla-cellulose',
    name: 'Cellulose plant',
    client: 'Birla Cellulose',
    sector: 'Natural Fibres',
    location: 'Gujarat',
    scope: 'Civil, Structural, Earthwork, Mechanical',
    duration: '20 months',
    year: '2021',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/birla/BIRLA CELLULOSIC 3 (2).webp',
    images: ['/brochurephotos/site photos/birla/BIRLA CELLULOSIC 3 (2).webp'],
    excerpt:
      'Greenfield cellulose processing plant for Birla Cellulose — mass earthwork, heavy RCC foundations and PEB structures across a large industrial plot.',
    challenge:
      'Large-scale earthwork and simultaneous multi-discipline construction across different plant zones, with demanding process requirements for the cellulose manufacturing environment.',
    whatWeBuilt:
      'Mass earthwork, RCC equipment foundations, PEB structural buildings, process piping, utility systems, and full site infrastructure for the greenfield processing complex.',
    outcome:
      'Civil and structural works cleared for equipment installation on programme, enabling the client to commission on planned timeline.',
  },
  {
    slug: 'city-center',
    name: 'City Center Corporate Complex',
    client: 'City Center',
    sector: 'Corporate',
    location: 'Gujarat',
    scope: 'Civil, Architectural Finishing',
    duration: '18 months',
    year: '2020',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/city center/city-center-night-170.webp',
    images: [
      '/brochurephotos/site photos/city center/city-center-night-170.webp',
      '/brochurephotos/site photos/city center/IMG_20200627_125547.webp',
    ],
    excerpt: 'A modern corporate hub featuring robust civil foundations and stunning architectural finish.',
    challenge: 'Tight urban location with restricted access and strict local regulations.',
    whatWeBuilt: 'Complete civil and structural frame along with exterior facade works.',
    outcome: 'A vibrant corporate destination delivered to exceptional standards.',
  },
  {
    slug: 'dic-fine-chemicals',
    name: 'Fine chemicals plant',
    client: 'DIC Fine Chemicals',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '14 months',
    year: '2019',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/dic fine chem/DSC_2480.webp',
    images: [
      '/brochurephotos/site photos/dic fine chem/DSC_2480.webp',
      '/brochurephotos/site photos/dic fine chem/DSC_2489.webp',
    ],
    excerpt:
      'Fine chemicals processing plant for DIC — high-specification civil and mechanical package delivered to exacting quality standards.',
    challenge:
      'Fine chemicals production demands high-purity process environments, precision mechanical installations, and rigorous quality verification at every stage of construction.',
    whatWeBuilt:
      'Complete civil and structural package, process piping with high-specification jointing, mechanical equipment erection, insulation, painting, and all utilities.',
    outcome:
      'Works completed within budget and programme. Quality audits cleared at first pass, enabling early equipment vendor access for commissioning.',
  },
  {
    slug: 'gacl-plant',
    name: 'GACL plant expansion',
    client: 'Gujarat Alkalies and Chemicals Limited',
    sector: 'Chemicals',
    location: 'Vadodara, Gujarat',
    scope: 'Mechanical, Piping, Civil',
    duration: '10 months',
    year: '2020',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/gacl ppa/WhatsApp Image 2021-02-26 at 7.33.32 AM.webp',
    images: [
      '/brochurephotos/site photos/gacl ppa/WhatsApp Image 2021-02-26 at 7.33.32 AM.webp',
      '/brochurephotos/site photos/gacl ppa/WhatsApp Image 2026-07-03 at 8.42.26 PM.webp',
      '/brochurephotos/site photos/gacl ppa/WhatsApp Image 2026-07-03 at 8.49.44 PM.webp',
    ],
    excerpt:
      'Live-plant capacity expansion at GACL — executed inside an operating chlorine and caustic plant with a zero-accident record and a formal safety certificate issued by GACL.',
    challenge:
      'Working within an operating chlorine and caustic plant demanded the highest safety discipline — all construction activities required daily audits, isolation permits and continuous coordination with plant operations.',
    whatWeBuilt:
      'New evaporator civil plinth, mechanical erection, interconnecting process piping, insulation, and painting — all within an active production environment.',
    outcome:
      "Zero accidents. Zero near-misses. GACL issued a formal safety certificate confirming BD Buildcon's exemplary safety record.",
  },
  {
    slug: 'gfl-dahej',
    name: 'Fluorochemical plant, Dahej',
    client: 'GFL — Gujarat Fluorochemicals Ltd.',
    sector: 'Fluorochemicals',
    location: 'Dahej, Gujarat',
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '18 months',
    year: '2017',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/gfl/Screenshot 2026-07-03 205836.webp',
    images: ['/brochurephotos/site photos/gfl/Screenshot 2026-07-03 205836.webp'],
    excerpt:
      'Fluorochemical plant at Dahej SEZ for GFL — large-scale civil and mechanical package for an integrated fluorine chemistry facility.',
    challenge:
      'Complex multi-discipline construction in a fluorine processing environment, coordinating civil, piping and structural works across multiple process areas simultaneously.',
    whatWeBuilt:
      'Mass earthwork, RCC equipment foundations, structural steel frame, process piping systems, mechanical equipment erection, and full site infrastructure at the Dahej facility.',
    outcome:
      'Works handed over on programme. Client recognised the quality of execution and zero-accident safety record.',
  },
  {
    slug: 'hscl',
    name: 'Infrastructure project',
    client: 'HSCL',
    sector: 'Infrastructure',
    location: 'India',
    scope: 'Civil, Structural, Earthwork',
    duration: '24 months',
    year: '2016',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/hscl/IMG-20190814-WA0039.webp',
    images: ['/brochurephotos/site photos/hscl/IMG-20190814-WA0039.webp'],
    excerpt:
      'Large-scale infrastructure project for Hindustan Steelworks Construction Ltd. — civil and structural package completed to government specification.',
    challenge:
      'Infrastructure works at scale require rigorous quality control, adherence to government specifications, and coordination across extended site areas — all within a demanding programme.',
    whatWeBuilt:
      'Civil foundations, structural works, earthwork and site grading, drainage, and ancillary infrastructure works in accordance with HSCL specifications.',
    outcome: 'Works passed government inspection at first submission. Completion certificate issued on programme.',
  },
  {
    slug: 'navin-fluorine',
    name: 'Fluorochemical plant',
    client: 'Navin Fluorine International Ltd.',
    sector: 'Fluorochemicals',
    location: 'Gujarat',
    scope: 'Civil, Mechanical, Piping, PEB Structure',
    duration: '16 months',
    year: '2018',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/navin flourine/Screenshot 2026-07-03 205518.webp',
    images: [
      '/brochurephotos/site photos/navin flourine/Screenshot 2026-07-03 205518.webp',
      '/brochurephotos/site photos/navin flourine/Screenshot 2026-07-03 205717.webp',
      '/brochurephotos/site photos/navin flourine/Screenshot 2026-07-03 205726.webp',
      '/brochurephotos/site photos/navin flourine/Screenshot 2026-07-03 205739.webp',
    ],
    excerpt:
      'Fluorochemical processing facility for Navin Fluorine International — full civil and mechanical package meeting stringent chemical resistance and safety requirements.',
    challenge:
      'Fluorochemical environments demand specialist materials, coatings and construction techniques throughout — from acid-resistant linings to speciality alloy piping — all within a strict safety regime.',
    whatWeBuilt:
      'Civil package with acid-resistant finishes, PEB structural buildings, speciality process piping, mechanical equipment foundations, utility systems and site infrastructure.',
    outcome:
      'Facility handed over on programme with zero safety incidents. Works passed client quality inspection without deficiency comments.',
  },
  {
    slug: 'renew',
    name: 'Renew Power Installation',
    client: 'Renew Power',
    sector: 'Energy',
    location: 'Gujarat',
    scope: 'Civil, Infrastructure',
    duration: '12 months',
    year: '2022',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/renew/WhatsApp Image 2026-07-12 at 12.59.19 PM.jpg',
    images: [
      '/brochurephotos/site photos/renew/WhatsApp Image 2026-07-12 at 12.59.19 PM.jpg',
      '/brochurephotos/site photos/renew/WhatsApp Image 2026-07-12 at 12.59.20 PM (1).webp',
      '/brochurephotos/site photos/renew/WhatsApp Image 2026-07-12 at 12.59.20 PM.webp',
    ],
    excerpt: 'Renewable energy infrastructure development supporting sustainable power solutions.',
    challenge: 'Managing extensive civil works across a vast site with varying terrains.',
    whatWeBuilt: 'Foundations and infrastructure to support critical energy installations.',
    outcome: 'Project completed ahead of schedule, facilitating green energy generation.',
  },
  {
    slug: 'roxul-rockwool',
    name: 'Rockwool manufacturing plant',
    client: 'Roxul Rockwool',
    sector: 'Insulation',
    location: 'Gujarat',
    scope: 'Civil, Structural, Earthwork',
    duration: '16 months',
    year: '2016',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/ROXUL ROCKWOOL/roxul-rockwool-building.webp',
    images: [
      '/brochurephotos/site photos/ROXUL ROCKWOOL/roxul-rockwool-building.webp',
      '/brochurephotos/site photos/ROXUL ROCKWOOL/DSC_8467.webp',
      '/brochurephotos/site photos/ROXUL ROCKWOOL/DSC_8545.webp',
    ],
    excerpt:
      'Greenfield insulation manufacturing facility — mass earthwork, heavy refractory foundations and structural erection for a high-temperature industrial process.',
    challenge:
      'High-temperature process requirements dictated heavy refractory foundations and special construction materials, while managing an aggressive schedule aligned with international programme milestones.',
    whatWeBuilt:
      'Mass earthwork (1.2 lakh cum), heavy RCC foundations for furnace equipment, structural steel erection, and site drainage across the entire greenfield plot.',
    outcome:
      "Civil works cleared for equipment installation ahead of schedule. Recognised in the client's annual EPC performance review.",
  },
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
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/tagros/TAGROS (1).webp',
    images: [
      '/brochurephotos/site photos/tagros/TAGROS (1).webp',
      '/brochurephotos/site photos/tagros/TAGROS (6).webp',
    ],
    excerpt:
      '₹72 Crore turnkey chemical processing facility at GIDC Dahej — delivered on schedule with zero accidents and formal client appreciation.',
    challenge:
      'Construction of a multi-unit chemical processing complex with stringent environmental and safety regulations, on a tight 18-month schedule, requiring simultaneous civil, mechanical, and piping works across multiple process units.',
    whatWeBuilt:
      'Turnkey EPC delivery encompassing RCC foundations, steel PEB warehouse structures, complete process piping networks, electrical and instrumentation works, effluent treatment plant civil works, and finished road infrastructure across a 12-acre plot.',
    outcome:
      'Plant commissioned on schedule with zero safety incidents. BD Buildcon received a formal letter of appreciation from Tagros Chemicals India Ltd.',
  },
  {
    slug: 'zcl-chemicals',
    name: 'Chemical plant',
    client: 'ZCL',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Mechanical, Piping',
    duration: '12 months',
    year: '2015',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/zcl/KBM_4823 - Copy.webp',
    images: ['/brochurephotos/site photos/zcl/KBM_4823 - Copy.webp'],
    excerpt:
      'Chemical processing plant for ZCL — turnkey civil and mechanical construction delivered on time and within budget.',
    challenge:
      'Multi-discipline chemical plant construction requiring parallel execution of civil, piping, and mechanical works within a compressed programme.',
    whatWeBuilt:
      'RCC foundations, structural buildings, process piping systems, mechanical equipment erection, utilities, and site infrastructure.',
    outcome:
      "Plant commissioned on schedule. Client cited BD Buildcon's project management capability and quality workmanship.",
  },
  {
    slug: 'acume-chemical',
    name: 'Chemical plant civil works',
    client: 'Acume Chemical',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Structural, Mechanical',
    duration: '12 months',
    year: '2024',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/acume chemical/DocScanner Sep 9, 2025 5-45 PM_1(130).webp',
    images: ['/brochurephotos/site photos/acume chemical/DocScanner Sep 9, 2025 5-45 PM_1(130).webp'],
    excerpt:
      'Chemical processing facility for Acume Chemical — civil, structural and mechanical package delivered to specification with a clean safety record.',
    challenge:
      'Building a chemical processing environment demanded precise foundations, chemical-resistant finishes and close coordination between civil and mechanical disciplines throughout the programme.',
    whatWeBuilt:
      'RCC equipment foundations, structural buildings, mechanical equipment erection, utilities and site infrastructure.',
    outcome: 'Works completed on programme with zero safety incidents and quality cleared at handover.',
  },
  {
    slug: 'agrotech',
    name: 'Agro processing facility',
    client: 'Agrotech',
    sector: 'Food Processing',
    location: 'Gujarat',
    scope: 'Civil, Structural, PEB Structure',
    duration: '12 months',
    year: '2023',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/agrotech/p2.webp',
    images: ['/brochurephotos/site photos/agrotech/p2.webp'],
    excerpt:
      'Agro processing facility — civil foundations and PEB structural works delivered for a modern food and agro processing plant.',
    challenge:
      'Food and agro processing environments require hygienic finishes, large clear-span structures and careful sequencing to meet the client programme.',
    whatWeBuilt:
      'RCC foundations, PEB structural buildings, processing hall civil works, utilities and site infrastructure.',
    outcome: 'Facility handed over on programme, ready for process equipment installation.',
  },
  {
    slug: 'atg-tires',
    name: 'Tyre manufacturing plant',
    client: 'ATG Tires',
    sector: 'Tyre',
    location: 'Dahej, Gujarat',
    scope: 'Civil, Structural, PEB Structure, Piping',
    duration: '18 months',
    year: '2022',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/atg tires/15-big.webp',
    images: ['/brochurephotos/site photos/atg tires/15-big.webp'],
    excerpt:
      'Off-highway tyre manufacturing plant — heavy civil, structural steel and PEB works for a large-scale tyre production facility.',
    challenge:
      'Tyre manufacturing demands heavy equipment foundations, large-span production halls and precise coordination of civil, structural and piping works across an extensive plot.',
    whatWeBuilt:
      'Mass earthwork, heavy RCC equipment foundations, structural steel and PEB production buildings, process piping and full site infrastructure.',
    outcome: 'Civil and structural works cleared for equipment installation on schedule with zero safety incidents.',
  },
  {
    slug: 'bostik',
    name: 'Adhesives plant',
    client: 'Bostik',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '14 months',
    year: '2021',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/bostik/5-big.webp',
    images: ['/brochurephotos/site photos/bostik/5-big.webp'],
    excerpt:
      'Adhesives manufacturing plant for Bostik — civil, mechanical and piping package delivered to international quality standards.',
    challenge:
      'Adhesives production requires precise process foundations, specialist piping and a high standard of quality control across all construction disciplines.',
    whatWeBuilt:
      'RCC equipment foundations, structural steel frame, process piping systems, mechanical equipment erection, utilities and site infrastructure.',
    outcome: 'Works completed on programme and passed client quality inspection with zero safety incidents.',
  },
  {
    slug: 'deepak-chemtech',
    name: 'Chemtech plant',
    client: 'Deepak Chemtech',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '16 months',
    year: '2024',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/deepak chemtech/deepak_310739.webp',
    images: ['/brochurephotos/site photos/deepak chemtech/deepak_310739.webp'],
    excerpt:
      'Chemical manufacturing facility for Deepak Chemtech — multi-discipline civil, mechanical and piping package for a modern process plant.',
    challenge:
      'Simultaneous execution of civil, structural, mechanical and piping works across multiple process areas within a demanding programme.',
    whatWeBuilt:
      'RCC equipment foundations, structural steel buildings, process piping systems, mechanical equipment erection, utilities and site infrastructure.',
    outcome: 'Works handed over on programme with zero safety incidents and quality cleared at inspection.',
  },
  {
    slug: 'deepak-nitrite',
    name: 'Chemical plant',
    client: 'Deepak Nitrite Ltd.',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '18 months',
    year: '2022',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/deepak nitride/Deepak_Nitrite.webp',
    images: ['/brochurephotos/site photos/deepak nitride/Deepak_Nitrite.webp'],
    excerpt:
      'Chemical processing plant for Deepak Nitrite — large-scale civil, mechanical and piping package delivered to exacting standards.',
    challenge:
      'A complex chemical processing environment required heavy equipment foundations, specialist piping and rigorous safety discipline across multiple process units.',
    whatWeBuilt:
      'Mass earthwork, RCC equipment foundations, structural steel frame, process piping, mechanical equipment erection, utilities and site infrastructure.',
    outcome: 'Works handed over on programme with a zero-accident safety record and quality cleared at handover.',
  },
  {
    slug: 'eurecat',
    name: 'Catalyst facility',
    client: 'Eurecat',
    sector: 'Chemicals',
    location: 'Gujarat',
    scope: 'Civil, Mechanical, Piping',
    duration: '12 months',
    year: '2023',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/eurecat/p-1.webp',
    images: ['/brochurephotos/site photos/eurecat/p-1.webp'],
    excerpt:
      'Catalyst regeneration and processing facility for Eurecat — civil, mechanical and piping works for a specialist process plant.',
    challenge:
      'Catalyst processing demands precise equipment foundations, specialist piping and careful coordination of civil and mechanical works.',
    whatWeBuilt:
      'RCC equipment foundations, structural works, process piping, mechanical equipment erection and site utilities.',
    outcome: 'Facility handed over on programme with zero safety incidents.',
  },
  {
    slug: 'khemani-distilleries',
    name: 'Distillery plant',
    client: 'Khemani Distilleries',
    sector: 'Distillery',
    location: 'Gujarat',
    scope: 'Civil, Structural, Mechanical, Piping',
    duration: '16 months',
    year: '2023',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/khemani distilleries/p-1 (1).webp',
    images: ['/brochurephotos/site photos/khemani distilleries/p-1 (1).webp'],
    excerpt:
      'Distillery and processing plant for Khemani Distilleries — civil, structural and mechanical package for a modern distillation facility.',
    challenge:
      'Distillery construction required tall structural supports, heavy tank and vessel foundations and integrated process piping across the facility.',
    whatWeBuilt:
      'RCC foundations for tanks and vessels, structural steel frames, process piping, mechanical equipment erection, utilities and site infrastructure.',
    outcome: 'Works completed on programme with zero safety incidents.',
  },
  {
    slug: 'reliance-jamnagar',
    name: 'Refinery works, Jamnagar',
    client: 'Reliance Industries Ltd.',
    sector: 'Petrochemicals',
    location: 'Jamnagar, Gujarat',
    scope: 'Civil, Mechanical, Piping, Structural Steel',
    duration: '20 months',
    year: '2021',
    safetyRecord: '0 fatal accidents',
    image: '/brochurephotos/site photos/reliance jamnagar/Screenshot 2026-07-03 205518.webp',
    images: [
      '/brochurephotos/site photos/reliance jamnagar/Screenshot 2026-07-03 205518.webp',
      '/brochurephotos/site photos/reliance jamnagar/Screenshot 2026-07-03 205717.webp',
      '/brochurephotos/site photos/reliance jamnagar/Screenshot 2026-07-03 205739.webp',
    ],
    excerpt:
      'Refinery and petrochemical works at the Reliance Jamnagar complex — civil, mechanical, piping and structural steel package executed to the highest safety standards.',
    challenge: `Working within one of the world's largest refinery complexes demanded stringent safety compliance, precise coordination and specialist construction across live and greenfield process areas.`,
    whatWeBuilt:
      'RCC equipment foundations, structural steel erection, process piping systems, mechanical equipment installation, utilities and site infrastructure.',
    outcome:
      'Works delivered on programme with a zero-accident safety record within a demanding operating environment.',
  },
]
