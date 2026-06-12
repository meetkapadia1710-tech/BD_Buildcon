export type EquipmentItem = {
  no: string
  name: string
  make: string
  quantity: number | string
  isCategory?: boolean
}

export const equipment: EquipmentItem[] = [
  { no: '1', name: 'Needle Vibrator', make: '', quantity: '', isCategory: true },
  { no: '1.1', name: 'Needle Vibrator – Petrol', make: 'Enfield', quantity: 20 },
  { no: '1.2', name: 'Needle Vibrator – Electric', make: 'Kirloskar / Wacker Neuson', quantity: 30 },
  { no: '2', name: 'DE-Watering Motor – Electric, 5 HP', make: 'Kirloskar', quantity: 10 },
  { no: '3', name: 'DE-Watering Motor – Electric, 1 HP', make: 'Kirloskar', quantity: 10 },
  { no: '4', name: 'DE-Watering Motor – Diesel, 5 HP', make: 'Marshal', quantity: 5 },
  { no: '5', name: 'DE-Watering Motor – Diesel, 10 HP', make: 'Marshal', quantity: '–' },
  { no: '6', name: 'Mud Pump 15 HP', make: 'Lubi', quantity: 2 },
  { no: '7', name: 'Mud Pump 05 HP', make: 'Lubi', quantity: 2 },
  { no: '8', name: 'Pipe Cutting Machine', make: '', quantity: '', isCategory: true },
  { no: '8.1', name: 'Pipe Cutting Machine – Manual', make: 'Ridgid / Hira', quantity: 8 },
  { no: '8.2', name: 'Pipe Cutting Machine – Electric', make: 'Hitachi / Makita', quantity: 5 },
  { no: '9', name: 'Thread Cutting Machine', make: 'Ridgid', quantity: 4 },
  { no: '10', name: 'Grinding Machine (Angle Grinder)', make: '', quantity: '', isCategory: true },
  { no: '10.1', name: '4" Angle Grinder', make: 'Bosch / Hitachi', quantity: 30 },
  { no: '10.2', name: '9" Angle Grinder', make: 'Bosch / Dewalt', quantity: 15 },
  { no: '11', name: 'Drilling Machine', make: '', quantity: '', isCategory: true },
  { no: '11.1', name: 'Rotary Hammer Drill', make: 'Bosch / Hilti', quantity: 10 },
  { no: '11.2', name: 'Core Cutting Machine', make: 'Hilti / Husqvarna', quantity: 3 },
  { no: '12', name: 'Scaffolding & Formwork', make: '', quantity: '', isCategory: true },
  { no: '12.1', name: 'Cup-Lock Scaffolding System', make: 'Rapid / Acrow', quantity: '5000 m²' },
  { no: '12.2', name: 'Slab Shuttering (Plywood + Props)', make: 'Various', quantity: '3000 m²' },
  { no: '13', name: 'Chain Pulley Block & Lifting Tools', make: '', quantity: '', isCategory: true },
  { no: '13.1', name: 'Chain Pulley Block 5 MT', make: 'Indef', quantity: 10 },
  { no: '13.2', name: 'Chain Pulley Block 2 MT', make: 'Indef', quantity: 20 },
  { no: '13.3', name: 'Wire Rope Sling Sets', make: 'Various', quantity: '50 sets' },
  { no: '14', name: 'Concrete Testing Equipment', make: '', quantity: '', isCategory: true },
  { no: '14.1', name: 'Rebound Hammer (Schmidt Hammer)', make: 'Controls', quantity: 3 },
  { no: '14.2', name: 'Slump Test Cone Set', make: 'Various', quantity: 5 },
  { no: '14.3', name: 'Cube Mould (150×150×150 mm)', make: 'Various', quantity: 50 },
  { no: '15', name: 'Survey & Levelling Equipment', make: '', quantity: '', isCategory: true },
  { no: '15.1', name: 'Auto Level (Dumpy Level)', make: 'Leica / Sokkia', quantity: 3 },
  { no: '15.2', name: 'Total Station', make: 'Leica / Trimble', quantity: 1 },
  { no: '16', name: 'Safety Equipment', make: '', quantity: '', isCategory: true },
  { no: '16.1', name: 'Full Body Safety Harness', make: 'Karam / 3M', quantity: 50 },
  { no: '16.2', name: 'Gas Detector (Multi-Gas)', make: 'Drager / Industrial Scientific', quantity: 5 },
  { no: '16.3', name: 'Fire Extinguisher (ABC Dry Powder)', make: 'Cease Fire', quantity: 40 },
]
