export type EquipmentItem = {
  no: string
  name: string
  make: string
  quantity: number | string
  isCategory?: boolean
}

export const equipment: EquipmentItem[] = [
  { no: '01', name: 'NEEDLE VIBRATOR', make: '', quantity: '', isCategory: true },
  { no: '01.1', name: 'PETROL', make: 'ENFIELD', quantity: 20 },
  { no: '01.2', name: 'ELECTRIC', make: 'KIRLOSKAR / WACKER NEUSON', quantity: 30 },
  { no: '02', name: 'DE-WATERING MOTOR - ELECTRIC, 5 HP', make: 'KIRLOSKAR', quantity: 10 },
  { no: '03', name: 'DE-WATERING MOTOR - ELECTRIC, 1 HP', make: 'KIRLOSKAR', quantity: 10 },
  { no: '04', name: 'DE-WATERING PUMP - DIESEL, 5 HP', make: 'MARSHAL', quantity: 5 },
  { no: '05', name: 'DE-WATERING PUMP - DIESEL, 10 HP', make: 'MARSHAL', quantity: 5 },
  { no: '06', name: 'MUD PUMP 15 HP', make: 'LUBI', quantity: 2 },
  { no: '07', name: 'MUD PUMP 05 HP', make: 'LUBI', quantity: 2 },
  { no: '08', name: 'GRINDER - BIG', make: 'HILTI', quantity: 10 },
  { no: '09', name: 'GRINDER - SMALL', make: 'HILTI', quantity: 15 },
  { no: '10', name: 'DRILL MACHINE', make: 'HILTI', quantity: 10 },
  { no: '11', name: 'BREAKER | 1000', make: 'HILTI', quantity: 10 },
  { no: '12', name: 'REBARRING MACHINE', make: 'HILTI', quantity: 6 },
  { no: '13', name: 'WELDING MACHINE', make: 'SUBANDHU', quantity: 15 },
  { no: '14', name: 'STEEL CUTTING MACHINE - HYDRAULIC', make: 'SPANTEC / SMIT', quantity: 15 },
  { no: '15', name: 'STEEL CUTTING MACHINE - MANUAL', make: 'BOSCH', quantity: 20 },
  { no: '16', name: 'STEEL BENDING MACHINE - HYDRAULIC', make: 'SPANTEC / SMIT', quantity: 15 },
  { no: '17', name: 'PLY CUTTER', make: 'BOSCH', quantity: 35 },
  { no: '18', name: 'CHAIN KUPRA', make: '', quantity: '', isCategory: true },
  { no: '18.1', name: '10 MT', make: '', quantity: 5 },
  { no: '18.2', name: '5 MT', make: '', quantity: 10 },
  { no: '18.3', name: '3 MT', make: '', quantity: 8 },
  { no: '19', name: 'FLOOR SCRUBBER', make: '', quantity: 3 },
  { no: '20', name: 'FULLY EQUIPPED MATERIAL TESTING LAB', make: '', quantity: '', isCategory: true },
  { no: '20.1', name: 'COMPRESSIVE TESTING M/C, MOISTURE METER', make: '', quantity: '6 SET' },
  { no: '20.2', name: 'TOTAL STATION', make: '', quantity: '2 NOS' },
  { no: '21', name: 'DIESEL GENERATOR', make: '', quantity: '', isCategory: true },
  { no: '21.1', name: '125 KVA', make: 'KIRLOSKAR', quantity: 3 },
  { no: '21.2', name: '10 KVA', make: 'KIRLOSKAR', quantity: 3 },
  { no: '21.3', name: '25 KVA', make: 'KIRLOSKAR', quantity: 3 },
  { no: '21.4', name: '7.5 KVA', make: 'KIRLOSKAR', quantity: 5 },
  { no: '21.5', name: '62.5 KVA', make: 'SUDHIR (CUMMINS)', quantity: 3 },
  { no: '21.6', name: '25 KVA', make: 'KIRLOSKAR', quantity: 2 },
  { no: '22', name: 'SELF POWERED MOVABLE FLOOD LIGHT', make: 'KIRLOSKAR', quantity: 5 },
  { no: '23', name: 'PORTA CABINS - OFFICE', make: 'TEREX', quantity: 'PC-1 7 LAMP' },
  { no: '24', name: 'CONTAINER STORE - 40 X 8 FEET (CEMENT)', make: '', quantity: 15 },
  { no: '25', name: 'WATER STORAGE TANK', make: '', quantity: '', isCategory: true },
  { no: '25.1', name: '2000 LTR', make: 'SYNTEX', quantity: 5 },
  { no: '25.2', name: '1500 LTR', make: 'SYNTEX', quantity: 22 },
  { no: '25.3', name: '1000 LTR', make: 'SYNTEX', quantity: 23 },
]
