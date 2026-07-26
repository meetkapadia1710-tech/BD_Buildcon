import { company, statsDisplay, certifications as certLevels } from '@/content/company'
import { services } from '@/content/services'
import { clients } from '@/content/clients'
import { certifications } from '@/content/certifications'
import { projects } from '@/content/projects'
import { contactInfo } from '@/content/links'

export const dynamic = 'force-static'

function buildLlmsTxt(): string {
  const sectors = Array.from(new Set(clients.map((c) => c.sector))).sort()

  const lines: string[] = []
  lines.push(`# ${company.legalName}`)
  lines.push('')
  lines.push(
    `> Industrial EPC (Engineering, Procurement & Construction) contractor headquartered in Bharuch, Gujarat, India. Formerly known as ${company.formerName}. Operating since ${company.foundedYear} (${statsDisplay.yearsExperience} years). ${statsDisplay.projects} projects delivered, ${statsDisplay.accidents} recorded fatalities, ${statsDisplay.repeatClientPct} repeat-client rate. ${certLevels.join(', ')} certified.`,
  )
  lines.push('')

  lines.push('## Services')
  for (const s of services) {
    lines.push(`- **${s.title}**: ${s.description} (https://bdbuildcon.com/services/${s.id})`)
  }
  lines.push('')

  lines.push('## Sectors served')
  lines.push(sectors.join(', '))
  lines.push('')

  lines.push('## Representative clients')
  lines.push(clients.map((c) => c.name).join(', '))
  lines.push('')

  lines.push('## Case studies')
  for (const p of projects) {
    lines.push(
      `- **${p.name}** — ${p.client} (${p.sector}, ${p.location}, ${p.year}): ${p.excerpt} (https://bdbuildcon.com/projects/${p.slug})`,
    )
  }
  lines.push('')

  lines.push('## Recognitions & certifications')
  for (const c of certifications) {
    lines.push(`- ${c.client} — ${c.description}`)
  }
  lines.push('')

  lines.push('## Key pages')
  lines.push('- Homepage: https://bdbuildcon.com/')
  lines.push('- About: https://bdbuildcon.com/about')
  lines.push('- Why BD Buildcon: https://bdbuildcon.com/why-us')
  lines.push('- Safety & Quality: https://bdbuildcon.com/safety-quality')
  lines.push('- Services: https://bdbuildcon.com/services')
  lines.push('- Projects: https://bdbuildcon.com/projects')
  lines.push('- Contact: https://bdbuildcon.com/contact')
  lines.push('')

  lines.push('## Contact')
  lines.push(`- Phone: ${contactInfo.phone}`)
  lines.push(`- Email: ${contactInfo.email}`)
  lines.push(`- Address: ${contactInfo.address}`)

  return lines.join('\n')
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
