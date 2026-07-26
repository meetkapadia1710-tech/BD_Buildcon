import React from 'react'

export function ServiceIcon({ name, className = 'w-7 h-7' }: { name: string; className?: string }) {
  const defaultProps = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  switch (name) {
    case 'factory':
      return (
        <svg {...defaultProps}>
          <path d="M2 20h20 M4 20V10l6 3V9l6 3V6l4 2v12 M9 20v-4h6v4 M4 14h2 M4 17h2" />
        </svg>
      )
    case 'road':
      return (
        <svg {...defaultProps}>
          <path d="M4 19l4-14h8l4 14 M12 5v2 M12 11v2 M12 17v2 M18 4l2-2 M17 6l3-1" />
          <circle cx="21" cy="2" r="1" />
        </svg>
      )
    case 'rig':
      return (
        <svg {...defaultProps}>
          <path d="M12 2v20 M8 20h8 M9 2l3-1 3 1 M7 15l5-4 5 4 M8 9l4-3 4 3 M6 20v-2l6-5 6 5v2" />
          <path d="M12 20v2 M10 22h4" />
        </svg>
      )
    case 'wind':
    case 'solar':
      return (
        <svg {...defaultProps}>
          <path d="M12 2v20 M12 11l6-4 M12 11l-6-4 M12 11l3 7 M12 11l-3 7" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      )
    case 'peb':
      return (
        <svg {...defaultProps}>
          <path d="M2 18h20 M4 18V8l8-4 8 4v10 M12 4v14 M4 12h16 M8 18v-6 M16 18v-6" />
        </svg>
      )
    case 'steel':
      return (
        <svg {...defaultProps}>
          <path d="M4 4h6 M4 20h6 M7 4v16 M14 4h6 M14 20h6 M17 4v16 M7 12h10 M4 8h16 M4 16h16" />
        </svg>
      )
    case 'tanks':
      return (
        <svg {...defaultProps}>
          <path d="M4 6v13a2 2 0 002 2h4a2 2 0 002-2V6 M4 6a2 2 0 012-2h4a2 2 0 012 2 M4 10h8 M4 15h8 M16 10l2-4 2 4v11h-4V10z M15 21h7" />
        </svg>
      )
    case 'warehouse':
      return (
        <svg {...defaultProps}>
          <path d="M3 21V8l9-5 9 5v13 M3 21h18 M9 21v-7h6v7 M6 11h3v2H6v-2z M15 11h3v2h-3v-2z" />
        </svg>
      )
    case 'piping':
      return (
        <svg {...defaultProps}>
          <path d="M3 7h6a3 3 0 013 3v4a3 3 0 003 3h6 M2 5v4 M8 5v4 M16 15v4 M22 15v4 M12 10V6 M10 6h4" />
        </svg>
      )
    case 'crane':
      return (
        <svg {...defaultProps}>
          <path d="M3 21h18 M6 21V5l14-2v3l-14 2 M6 9h10 M6 14h7 M15 6v9l-3 3 M12 18h3" />
        </svg>
      )
    case 'coating':
      return (
        <svg {...defaultProps}>
          <path d="M12 3L4 7v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7l-8-4z M12 8v8 M9 11l3 3 3-3" />
        </svg>
      )
    case 'turnkey':
      return (
        <svg {...defaultProps}>
          <path d="M9 12l2 2 4-4 M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z M12 6v2 M12 16v2 M6 12H4 M20 12h-2" />
        </svg>
      )
    default:
      return (
        <svg {...defaultProps}>
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16 M3 21h18 M9 8h1 M9 12h1 M9 16h1 M14 8h1 M14 12h1 M14 16h1" />
        </svg>
      )
  }
}
