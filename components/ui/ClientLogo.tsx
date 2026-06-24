import Image from 'next/image'
import type { Client } from '@/content/clients'

/**
 * Renders a single client on the "Trusted By" wall.
 * - If `client.logo` is set, shows the real logo in grayscale → colour on hover.
 * - Otherwise falls back to a clean wordmark placeholder (not a 2-letter monogram),
 *   so the wall reads as intentional until real logos are dropped into
 *   /public/images/clients/.
 */
export function ClientLogo({ client }: { client: Client }) {
  return (
    <div
      className="group flex h-24 flex-col items-center justify-center gap-1 rounded-card border border-hairline bg-white px-4 text-center transition-colors duration-300 hover:border-teal/30"
      title={`${client.name} — ${client.sector}`}
    >
      {client.logo ? (
        <div className="relative h-12 w-full">
          <Image
            src={client.logo}
            alt={client.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
            className="object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>
      ) : (
        <span className="font-display text-[15px] font-bold leading-tight text-ink/70 transition-colors duration-300 group-hover:text-teal">
          {client.name}
        </span>
      )}
    </div>
  )
}
