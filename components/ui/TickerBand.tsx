type Props = {
  items: string[]
}

/**
 * Scrolling marquee strip — teal band used beneath the redesigned page heroes.
 */
export function TickerBand({ items }: Props) {
  const group = (key: string) => (
    <div className="flex gap-[48px] pr-[48px]" aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-[48px] shrink-0">
          <span className="font-display font-bold text-[13px] sm:text-[14px] uppercase tracking-[0.16em] text-white whitespace-nowrap">
            {item}
          </span>
          <span className="text-white/50">◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="bg-teal overflow-hidden py-[12px] sm:py-[13px] border-b-[3px] border-teal-deep">
      <div className="flex w-max animate-marquee">
        {group('a')}
        {group('b')}
      </div>
    </div>
  )
}
