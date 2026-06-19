export type Client = {
  id: string
  name: string
  sector: string
  logo?: string
}

export const clients: Client[] = [
  { id: 'gnfc',            name: 'GNFC',                              sector: 'Fertiliser / Chemical',   logo: undefined },
  { id: 'gacl',           name: 'Gujarat Alkalies & Chemicals',      sector: 'Chemical',                logo: undefined },
  { id: 'gfl',            name: 'Gujarat Fluorochemicals Ltd.',       sector: 'Fluorochemical',          logo: undefined },
  { id: 'tagros',         name: 'Tagros Chemicals India Ltd.',        sector: 'Chemical',                logo: undefined },
  { id: 'birla-cellulose',name: 'Birla Cellulose',                   sector: 'Natural Fibres / Viscose', logo: undefined },
  { id: 'navin-fluorine', name: 'Navin Fluorine International',      sector: 'Fluorochemical',          logo: undefined },
  { id: 'pidilite',       name: 'Pidilite Industries',                sector: 'Adhesives',               logo: undefined },
  { id: 'thermax',        name: 'Thermax',                            sector: 'Energy / Environment',    logo: undefined },
  { id: 'aker-solutions', name: 'Aker Solutions',                     sector: 'Petroleum / Oil & Gas',   logo: undefined },
  { id: 'atg',            name: 'ATG Tyres',                          sector: 'Tyre Manufacturing',      logo: undefined },
  { id: 'agro-tech',      name: 'Agrotech Foods Limited',             sector: 'Food Processing',         logo: undefined },
  { id: 'rockwool',       name: 'Roxul Rockwool',                     sector: 'Insulation',              logo: undefined },
  { id: 'air-liquide',    name: 'Eurecat (Air Liquide)',              sector: 'Industrial Gases',        logo: undefined },
  { id: 'bostik',         name: 'Bostik',                             sector: 'Adhesives',               logo: undefined },
  { id: 'mott-macdonald', name: 'Mott MacDonald',                     sector: 'Engineering Consultancy', logo: undefined },
  { id: 'hscl',           name: 'HSCL',                               sector: 'Infrastructure',          logo: undefined },
]
