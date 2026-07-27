export type CapabilityCard = {
  id: string
  title: string
  description: string
  iconName: string
  sectorLabel: string
}

export const unifiedCapabilities: Record<string, CapabilityCard[]> = {
  'civil-engineering': [
    {
      id: 'industrial-building',
      title: 'Industrial Building works',
      description:
        'Heavy industrial structures, manufacturing plants, RCC construction, and corporate complexes built to exacting engineering standards.',
      iconName: 'factory',
      sectorLabel: 'Industrial',
    },
    {
      id: 'road-drain',
      title: 'Road & drain works',
      description:
        'Heavy-duty internal roads, concrete pavements, highway access roads, storm water drainage, and utility networks.',
      iconName: 'road',
      sectorLabel: 'Infrastructure',
    },
    {
      id: 'heavy-rig-foundation',
      title: 'Heavy Rig Foundation & Huge Pile Work',
      description:
        'Deep pile foundations, RCC machine foundations, and dynamic vibration-resistant base structures for industrial equipment.',
      iconName: 'rig',
      sectorLabel: 'Industrial',
    },
    {
      id: 'wtg-wind-foundation',
      title: 'WTG Wind Foundation Work',
      description:
        'Comprehensive civil EPC works for high-capacity wind turbine generator (WTG) foundations and renewable energy structures.',
      iconName: 'wind',
      sectorLabel: 'Renewable Energy',
    },
    {
      id: 'warehouse-work',
      title: 'Warehouse Work',
      description:
        'Large-span automated warehouses, cold storage logistics hubs, and high-floor-load industrial fulfillment centers.',
      iconName: 'warehouse',
      sectorLabel: 'Logistics',
    },
    {
      id: 'brownfield-greenfield',
      title: 'Brownfield & Greenfield Projects',
      description:
        'Building new greenfield complexes or executing complex brownfield expansions inside live chemical and pharma facilities with zero downtime.',
      iconName: 'factory',
      sectorLabel: 'Industrial',
    },
    {
      id: 'plant-expansion',
      title: 'Plant Expansion & Modernization',
      description:
        'Turnkey plant capacity expansions, structural retrofits, and equipment upgrades to modernise existing manufacturing assets efficiently.',
      iconName: 'factory',
      sectorLabel: 'Industrial',
    },
    {
      id: 'rcc-construction',
      title: 'RCC Construction',
      description:
        'Reinforced Cement Concrete (RCC) structures built with certified concrete batches, stringent formwork controls, and mill-traceable steel.',
      iconName: 'construction',
      sectorLabel: 'Civil',
    },
    {
      id: 'structural-engineering',
      title: 'Structural Engineering',
      description:
        'Precision structural engineering and heavy civil construction for complex process plant structures and high-load equipment platforms.',
      iconName: 'steel',
      sectorLabel: 'Civil',
    },
    {
      id: 'site-development',
      title: 'Site Development & Earthworks',
      description:
        'Comprehensive site clearance, bulk excavation, soil compaction using owned vibro rollers, and precision land grading for industrial bases.',
      iconName: 'road',
      sectorLabel: 'Civil',
    },
    {
      id: 'underground-utility',
      title: 'Underground Utility Networks',
      description:
        'Underground piping trenches, electrical cable duct banks, fire-water mains, and industrial effluent drainage lines with full CAD/BIM traceability.',
      iconName: 'piping',
      sectorLabel: 'Infrastructure',
    },
  ],
  'mechanical-industrial': [
    {
      id: 'peb-work',
      title: 'Pre-Engineering Building (PEB) work',
      description:
        'High-tensile structural steel PEB frames, rapid assembly sheds, and modular industrial factory structures.',
      iconName: 'peb',
      sectorLabel: 'Industrial',
    },
    {
      id: 'structural-steel',
      title: 'Structural Steel Work',
      description:
        'Custom structural steel fabrication, heavy girders, industrial pipe racks, and multi-story steel frameworks.',
      iconName: 'steel',
      sectorLabel: 'Industrial',
    },
    {
      id: 'tanks-cooling-etp',
      title: 'Chemical Tanks, Cooling Tower, ETP & STP',
      description:
        'Industrial storage tanks, cooling tower basins, effluent (ETP) and sewage treatment (STP) civil and mechanical works.',
      iconName: 'tanks',
      sectorLabel: 'Petrochemical',
    },
    {
      id: 'process-utility-piping',
      title: 'Process & Utility Piping Networks',
      description:
        'End-to-end industrial piping fabrication, high-pressure utility lines, valve manifolds, and testing systems.',
      iconName: 'piping',
      sectorLabel: 'Petrochemical',
    },
    {
      id: 'heavy-equipment-erection',
      title: 'Heavy Equipment Erection & Rigging',
      description:
        'Precision alignment and heavy rigging of industrial boilers, turbines, vessels, and rotating plant machinery.',
      iconName: 'crane',
      sectorLabel: 'Industrial',
    },
    {
      id: 'slag-blasting-painting',
      title: 'Slag Blasting & Protective Coating',
      description:
        'Advanced surface preparation, abrasive slag blasting, and multi-layer anti-corrosive industrial painting systems.',
      iconName: 'coating',
      sectorLabel: 'Surface Protection',
    },
    {
      id: 'mechanical-construction',
      title: 'Mechanical Construction',
      description:
        'Complete mechanical construction services for industrial process plants, chemical units, and manufacturing facilities.',
      iconName: 'factory',
      sectorLabel: 'Industrial',
    },
    {
      id: 'in-house-fabrication',
      title: 'In-House Fabrication Yard',
      description:
        'Operating a dedicated in-house fabrication facility equipped for high-volume steel cutting, bending, assembly, and quality testing.',
      iconName: 'factory',
      sectorLabel: 'Fabrication',
    },
  ],
  'turnkey-delivery': [
    {
      id: 'turnkey-epc-hse',
      title: 'Turnkey Project Delivery & HSE Management',
      description:
        'End-to-end project controls, procurement, QA/QC testing, commissioning, and uncompromising HSE compliance.',
      iconName: 'turnkey',
      sectorLabel: 'Project Management',
    },
    {
      id: 'project-planning-scheduling',
      title: 'Project Planning & Scheduling',
      description:
        'Detailed project execution planning, ERP-integrated resource tracking, and project control systems ensuring schedule compliance.',
      iconName: 'turnkey',
      sectorLabel: 'Planning',
    },
    {
      id: 'procurement-supply-chain',
      title: 'Procurement & Supply Chain Management',
      description:
        'Strategic procurement from approved vendors with mill certificate traceability, and logistics coordination to keep site supply chains seamless.',
      iconName: 'turnkey',
      sectorLabel: 'Procurement',
    },
    {
      id: 'cost-optimization',
      title: 'Cost Optimization',
      description:
        'Value engineering and material optimization to deliver maximum structural durability within target client budgets.',
      iconName: 'turnkey',
      sectorLabel: 'Management',
    },
    {
      id: 'material-inspection-qa-qc',
      title: 'Material Inspection & QA/QC',
      description:
        'Rigorous incoming material inspection, mill certificate verification, and ISO 9001:2015-certified QA/QC protocols enforced at every hold point.',
      iconName: 'turnkey',
      sectorLabel: 'Quality',
    },
    {
      id: 'safety-audits',
      title: 'Safety Audits',
      description:
        'Regular site safety audits and statutory environmental inspections conducted by certified safety officers.',
      iconName: 'turnkey',
      sectorLabel: 'Safety',
    },
    {
      id: 'testing-commissioning',
      title: 'Testing & Commissioning',
      description:
        'Comprehensive hydro-testing, non-destructive testing (NDT), electrical continuity checks, and dry run commissioning.',
      iconName: 'turnkey',
      sectorLabel: 'Commissioning',
    },
    {
      id: 'project-handover-support',
      title: 'Project Handover & After-Sales Support',
      description:
        'Final project handover complete with as-built drawings, QA/QC inspection dossiers, statutory clearance certificates, and operational maintenance assistance.',
      iconName: 'turnkey',
      sectorLabel: 'Support',
    },
  ],
}
