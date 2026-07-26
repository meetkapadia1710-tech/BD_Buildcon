export type FAQ = {
  id: string
  question: string
  answer: string
  page: ('home' | 'about' | 'why-us' | 'safety-quality' | 'services' | 'projects' | 'contact')[]
}

export const faqs: FAQ[] = [
  {
    id: 'what-is-bd-buildcon',
    question: 'What does BD Buildcon LLP do?',
    answer:
      'BD Buildcon LLP (formerly Bhumi Developers) is an industrial EPC — Engineering, Procurement and Construction — contractor headquartered in Bharuch, Gujarat, India. It handles civil engineering, mechanical engineering and industrial services, and turnkey project delivery for industrial, chemical, pharmaceutical and process-industry clients.',
    page: ['home', 'about'],
  },
  {
    id: 'years-experience',
    question: 'How long has BD Buildcon been in business?',
    answer:
      'BD Buildcon LLP was founded in 1995 (originally as Bhumi Developers) and has over 35 years of combined industrial construction experience.',
    page: ['home', 'about', 'why-us'],
  },
  {
    id: 'safety-record',
    question: "What is BD Buildcon's safety record?",
    answer:
      'BD Buildcon reports a zero-accident record across 35 years of project execution, and is ISO 9001:2015 certified for its Quality Management System.',
    page: ['home', 'safety-quality', 'why-us'],
  },
  {
    id: 'iso-certified',
    question: 'Is BD Buildcon ISO certified?',
    answer:
      'Yes. BD Buildcon holds ISO 9001:2015 certification issued by TÜV SÜD South Asia, covering design, construction and erection of pre-engineered buildings, turnkey real estate, and turnkey industrial construction projects.',
    page: ['safety-quality', 'why-us'],
  },
  {
    id: 'services-offered',
    question: 'What services does BD Buildcon offer?',
    answer:
      'BD Buildcon offers three core service lines: Civil Engineering (industrial, commercial and corporate construction, RCC, foundations, site infrastructure), Mechanical Engineering & Industrial Services (equipment erection, structural steel and piping fabrication, industrial painting and coatings), and Turnkey Project Delivery (planning, procurement, QA/QC, HSE management, testing and commissioning through handover).',
    page: ['home', 'services'],
  },
  {
    id: 'sectors-served',
    question: 'What industries does BD Buildcon work with?',
    answer:
      'BD Buildcon has delivered projects for chemicals, agrochemicals, pharmaceuticals, petrochemicals, fluorochemicals, energy, tyre and fibre manufacturing, and consumer goods clients, among others.',
    page: ['home', 'projects', 'about'],
  },
  {
    id: 'where-located',
    question: 'Where is BD Buildcon based and where does it operate?',
    answer:
      'BD Buildcon is headquartered in Bharuch, Gujarat, India, and executes industrial construction projects across India.',
    page: ['contact', 'about'],
  },
  {
    id: 'former-name',
    question: 'Was BD Buildcon previously known by another name?',
    answer: 'Yes — BD Buildcon LLP was previously known as Bhumi Developers.',
    page: ['about'],
  },
  {
    id: 'turnkey-meaning',
    question: 'Does BD Buildcon handle both civil and mechanical work on the same project?',
    answer:
      'Yes. BD Buildcon delivers turnkey projects that combine civil engineering and mechanical/industrial services under a single contractor, covering planning, procurement, execution, QA/QC and handover.',
    page: ['services', 'why-us'],
  },
  {
    id: 'repeat-clients',
    question: 'Does BD Buildcon work with repeat clients?',
    answer: "Yes — roughly 70% of BD Buildcon's project volume comes from repeat clients.",
    page: ['why-us', 'about'],
  },
  {
    id: 'equipment-owned',
    question: 'Does BD Buildcon own its own construction equipment?',
    answer: 'Yes, BD Buildcon owns and operates over 100 machines used across its project sites.',
    page: ['why-us', 'safety-quality'],
  },
  {
    id: 'how-to-contact',
    question: 'How can I get a quote or start a project with BD Buildcon?',
    answer:
      // TODO(meet): confirm the actual intake process (form vs. call vs. email) before shipping this answer.
      'Contact BD Buildcon directly by phone or email, or use the contact form on the website, to discuss project scope and get a quote.',
    page: ['contact', 'home'],
  },
]
