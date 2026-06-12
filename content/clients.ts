export type Client = {
  id: string
  name: string
  sector: string
  logo?: string
}

export const clients: Client[] = [
  { id: 'saint-gobain', name: 'Saint-Gobain', sector: 'Glass / Manufacturing', logo: undefined },
  { id: 'torrent-pharma', name: 'Torrent Pharmaceuticals', sector: 'Pharma', logo: undefined },
  { id: 'rockwool', name: 'Rockwool', sector: 'Glass Wool / Manufacturing', logo: undefined },
  { id: 'atg', name: 'Alliance Tire Group (ATG)', sector: 'Tyre', logo: undefined },
  { id: 'agro-tech', name: 'Agro Tech Foods (ConAgra)', sector: 'Food', logo: undefined },
  { id: 'gacl', name: 'Gujarat Alkalies & Chemicals Ltd', sector: 'Chemical', logo: undefined },
  { id: 'aker-solutions', name: 'Aker Solutions', sector: 'Petroleum / Oil & Gas', logo: undefined },
  { id: 'gfl', name: 'Gujarat Fluorochemicals Ltd', sector: 'Chemical', logo: undefined },
  { id: 'tagros', name: 'Tagros Chemicals', sector: 'Chemical', logo: undefined },
  { id: 'thermax', name: 'Thermax', sector: 'Industrial / Energy', logo: undefined },
  { id: 'ipcl', name: 'ONGC / IPCL', sector: 'Petroleum', logo: undefined },
  { id: 'iffco', name: 'IFFCO', sector: 'Fertiliser', logo: undefined },
]
