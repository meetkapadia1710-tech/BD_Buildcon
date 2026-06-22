import React from 'react'

interface LogoProps {
  className?: string
  light?: boolean // If true, renders dark text for light backgrounds. If false, renders white text for dark backgrounds.
}

export default function Logo({ className = 'h-12 w-auto', light = false }: LogoProps) {
  // Brand colors extracted from the uploaded logo image
  const cyanPill = '#009FDF'
  const yellowPill = '#FDB913'
  const redPill = '#E32322'
  
  // The primary text color in the image is a deep teal/blue.
  // On dark backgrounds (light=false), we switch to white for legibility.
  const textFill = light ? '#005579' : '#ffffff'

  return (
    <svg
      viewBox="0 0 320 150"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3 Colored Pillars */}
      <rect x="15" y="15" width="12" height="64" rx="6" fill={cyanPill} />
      <rect x="33" y="15" width="12" height="64" rx="6" fill={yellowPill} />
      <rect x="51" y="15" width="12" height="64" rx="6" fill={redPill} />

      {/* "BD" Text */}
      <text
        x="72"
        y="78"
        fill={textFill}
        fontSize="88"
        fontWeight="700"
        fontFamily="var(--font-hanken), system-ui, -apple-system, sans-serif"
        letterSpacing="-0.03em"
      >
        BD
      </text>

      {/* "BUILDCON LLP" Text */}
      <text
        x="15"
        y="122"
        fill={textFill}
        fontFamily="var(--font-hanken), system-ui, -apple-system, sans-serif"
      >
        <tspan fontSize="46" fontWeight="700" letterSpacing="0.02em">BUILDCON</tspan>
        <tspan fontSize="22" fontWeight="400" dx="8" dy="-2">LLP</tspan>
      </text>

      {/* Subtext */}
      <text
        x="15"
        y="142"
        fill={textFill}
        fontSize="14.5"
        fontWeight="600"
        fontFamily="var(--font-inter), system-ui, -apple-system, sans-serif"
        letterSpacing="0.01em"
      >
        (Formerly known as Bhumi Developers)
      </text>
    </svg>
  )
}
