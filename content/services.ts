export type Service = {
  id: string
  title: string
  shortTitle: string
  description: string
  bullets: string[]
  image: string
  icon: string
}

export const services: Service[] = [
  {
    id: 'civil-structural',
    title: 'Industrial Civil & Structural',
    shortTitle: 'Civil & Structural',
    description:
      'From deep foundations and piling to superstructures — complete civil works for industrial facilities in chemical, pharma, petroleum, and manufacturing sectors.',
    bullets: [
      'RCC foundations and frames',
      'Pre-cast and cast-in-situ structures',
      'Bored piling and pile caps',
      'Industrial flooring and trenches',
      'Chimney and tower structures',
    ],
    image: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=900&auto=format&fit=crop',
    icon: 'foundation',
  },
  {
    id: 'peb',
    title: 'PEB Structures',
    shortTitle: 'PEB Structures',
    description:
      'Supply and erection of Pre-Engineered Buildings (PEB) — warehouses, process buildings, storage sheds, and modular industrial structures.',
    bullets: [
      'Steel frame design and fabrication',
      'Insulated roof and wall cladding',
      'Clear-span and multi-bay options',
      'Mezzanine floors',
      'Crane-gantry integrated structures',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop',
    icon: 'warehouse',
  },
  {
    id: 'piping-mechanical',
    title: 'Piping & Mechanical',
    shortTitle: 'Piping & Mechanical',
    description:
      'Complete process and utility piping fabrication and erection, along with mechanical equipment installation across complex industrial plants.',
    bullets: [
      'Carbon steel, SS, alloy piping',
      'Equipment erection and alignment',
      'Structural steel fabrication',
      'Insulation and painting',
      'Pressure testing and commissioning',
    ],
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=900&auto=format&fit=crop',
    icon: 'plumbing',
  },
  {
    id: 'roads-earthwork',
    title: 'Piling, Roads & Earthwork',
    shortTitle: 'Piling & Roads',
    description:
      'Turnkey earthwork, road construction, and piling for industrial estates, greenfield plants, and infrastructure projects.',
    bullets: [
      'Mass earthwork and grading',
      'Industrial road and pavement',
      'Bored piling and driven piles',
      'Drainage and culverts',
      'Compound walls and fencing',
    ],
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=900&auto=format&fit=crop',
    icon: 'construction',
  },
]
