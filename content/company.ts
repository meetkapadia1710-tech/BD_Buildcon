// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for company facts & headline stats.
// Edit values here — every page reads from this file, so numbers stay consistent.
// (If the real founding year is not 1995, update `foundedYear` + `yearsExperience`.)
// ─────────────────────────────────────────────────────────────────────────────

export const FOUNDED_YEAR = 1995

// Numeric values (for CountUp / RisingFloors animations)
export const stats = {
  yearsExperience: 30, // 1995 → present ≈ 30 years
  projects: 50,
  repeatClientPct: 70,
  accidents: 0,
} as const

// Display strings (for copy / badges)
export const statsDisplay = {
  yearsExperience: '30+',
  projects: '50+',
  repeatClientPct: '70%',
  accidents: '0',
  valueDelivered: '₹200+ Cr',
} as const

export const certifications = ['ISO 9001:2015', 'CRISIL SME 3'] as const

export const company = {
  legalName: 'BD Buildcon LLP',
  formerName: 'Bhumi Developers',
  foundedYear: FOUNDED_YEAR,
  // e.g. "Since 1995 · 30+ years"
  tagline: `Since ${FOUNDED_YEAR} · ${statsDisplay.yearsExperience} years`,
} as const
