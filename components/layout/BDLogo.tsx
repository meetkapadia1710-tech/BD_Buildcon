import React from 'react'

interface BDLogoProps {
  light?: boolean // true for light backgrounds (renders navy text), false for dark backgrounds (renders white text)
  className?: string
}

export function BDLogo({ light = false, className = 'h-12 w-auto' }: BDLogoProps) {
  // Brand Colors
  const stripeBlue = '#00aeef'
  const stripeYellow = '#fbb040'
  const stripeRed = '#ed1c24'
  
  // Text Colors
  const textColor = light ? '#005a87' : '#ffffff'
  const llpColor = '#00aeef'

  return (
    <svg
      viewBox="0 0 340 135"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BD Buildcon LLP Logo"
    >
      {/* ── Graphic Mark: Three Vertical Stripes ── */}
      <rect x="5" y="10" width="9" height="52" rx="4.5" fill={stripeBlue} />
      <rect x="18" y="10" width="9" height="52" rx="4.5" fill={stripeYellow} />
      <rect x="31" y="10" width="9" height="52" rx="4.5" fill={stripeRed} />

      {/* ── BD Letters ── */}
      <text
        x="48"
        y="58"
        fill={textColor}
        fontSize="60"
        fontWeight="800"
        fontFamily="var(--font-hanken), var(--font-inter), system-ui, -apple-system, sans-serif"
        letterSpacing="-0.03em"
      >
        BD
      </text>

      {/* ── BUILDCON LLP ── */}
      <text
        x="5"
        y="88"
        fill={textColor}
        fontSize="24"
        fontWeight="700"
        fontFamily="var(--font-hanken), var(--font-inter), system-ui, -apple-system, sans-serif"
        letterSpacing="0.04em"
      >
        BUILDCON
        <tspan dx="6" fill={llpColor} fontWeight="400" fontSize="18" letterSpacing="0.05em">
          LLP
        </tspan>
      </text>

      {/* ── (Formerly known as Bhumi Developers) ── */}
      <text
        x="5"
        y="110"
        fill={textColor}
        fontSize="11.5"
        fontWeight="600"
        fontFamily="var(--font-inter), system-ui, -apple-system, sans-serif"
        letterSpacing="0.01em"
      >
        (Formerly known as Bhumi Developers)
      </text>
    </svg>
  )
}
