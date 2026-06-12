export type MachineryItem = {
  no: string
  name: string
  make: string
  quantity: number | string
  isCategory?: boolean
}

export const machinery: MachineryItem[] = [
  { no: '1', name: 'Excavator', make: '', quantity: '', isCategory: true },
  { no: '1.1', name: 'JCB 3DX', make: 'JCB India LTD', quantity: 2 },
  { no: '1.2', name: 'JCB 3DX', make: 'JCB India LTD', quantity: 2 },
  { no: '1.3', name: 'PDKLAIN EX-70 TATA Hitachi with Breaker Kit', make: 'TATA Hitachi', quantity: 1 },
  { no: '1.4', name: 'TEREX VECTRA TLB 844S with Breaker Kit', make: 'TEREX VECTRA', quantity: 1 },
  { no: '1.5', name: 'TEREX VECTRA TLB 844S', make: 'TEREX VECTRA', quantity: 1 },
  { no: '2', name: 'Road Roller Machine', make: '', quantity: '', isCategory: true },
  { no: '2.1', name: 'Vibro Roller Compactor 11.5–35 MT', make: 'L&T Case 110 7D', quantity: 1 },
  { no: '2.2', name: 'Vibro Roller Compactor 8 MT', make: 'DYNAPAC', quantity: 1 },
  { no: '3', name: 'Crane', make: '', quantity: '', isCategory: true },
  { no: '3.1', name: 'Hydraulic Mobile Crane 150 MT', make: 'Liebherr / Demag', quantity: 1 },
  { no: '3.2', name: 'Hydraulic Mobile Crane 60 MT', make: 'ACE', quantity: 1 },
  { no: '3.3', name: 'Hydraulic Mobile Crane 30 MT', make: 'Escorts / ACE', quantity: 2 },
  { no: '4', name: 'Transit Mixer', make: '', quantity: '', isCategory: true },
  { no: '4.1', name: 'Transit Mixer 7 m³', make: 'SCHWING STETTER', quantity: 2 },
  { no: '4.2', name: 'Transit Mixer 7 m³', make: 'AJAX', quantity: 1 },
  { no: '5', name: 'Concrete Pump', make: '', quantity: '', isCategory: true },
  { no: '5.1', name: 'Truck-Mounted Boom Pump 36 m', make: 'SCHWING STETTER', quantity: 1 },
  { no: '5.2', name: 'Stationary Pump S-36', make: 'SCHWING STETTER', quantity: 1 },
  { no: '6', name: 'Batching Plant', make: '', quantity: '', isCategory: true },
  { no: '6.1', name: 'Batching Plant 60 m³/hr', make: 'SCHWING STETTER', quantity: 1 },
  { no: '7', name: 'Piling Equipment', make: '', quantity: '', isCategory: true },
  { no: '7.1', name: 'Hydraulic Piling Rig 1.0 m dia', make: 'CASAGRANDE / BAUER', quantity: 1 },
  { no: '7.2', name: 'Tripod Piling Rig', make: 'Local Make', quantity: 3 },
  { no: '8', name: 'Generator', make: '', quantity: '', isCategory: true },
  { no: '8.1', name: 'DG Set 250 KVA', make: 'Kirloskar / Cummins', quantity: 2 },
  { no: '8.2', name: 'DG Set 125 KVA', make: 'Kirloskar', quantity: 2 },
  { no: '8.3', name: 'DG Set 62.5 KVA', make: 'Kirloskar', quantity: 3 },
  { no: '9', name: 'Compressor', make: '', quantity: '', isCategory: true },
  { no: '9.1', name: 'Air Compressor 500 CFM', make: 'Atlas Copco', quantity: 1 },
  { no: '9.2', name: 'Air Compressor 250 CFM', make: 'Atlas Copco', quantity: 2 },
  { no: '10', name: 'Welding Machine', make: '', quantity: '', isCategory: true },
  { no: '10.1', name: 'MIG / GMAW Welding Machine', make: 'Lincoln / Esab', quantity: 15 },
  { no: '10.2', name: 'TIG / GTAW Welding Machine', make: 'Lincoln / Esab', quantity: 8 },
  { no: '10.3', name: 'Arc Welding Machine 400 A', make: 'Lincoln', quantity: 20 },
  { no: '11', name: 'Dumper / Tipper', make: '', quantity: '', isCategory: true },
  { no: '11.1', name: 'Tipping Dumper 12 MT', make: 'Tata Motors', quantity: 4 },
  { no: '11.2', name: 'Hyva Tipper 9 m³', make: 'Eicher / Tata', quantity: 3 },
  { no: '12', name: 'Forklift / Rough Terrain', make: '', quantity: '', isCategory: true },
  { no: '12.1', name: 'Rough Terrain Forklift 5 MT', make: 'MANITOU', quantity: 1 },
  { no: '12.2', name: 'Electric Counterbalance Forklift 3 MT', make: 'GODREJ', quantity: 2 },
]
