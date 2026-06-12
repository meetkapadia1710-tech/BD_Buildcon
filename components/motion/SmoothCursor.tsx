'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

type Seg = { x1: number; y1: number; x2: number; y2: number; born: number }

const TRAIL_LIFE = 2400
const NODE_LIFE  = 600
const MIN_DIST   = 10

export function SmoothCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotRef    = useRef<HTMLDivElement>(null)
  const segs      = useRef<Seg[]>([])
  const last      = useRef({ x: -9999, y: -9999, init: false })
  const raf       = useRef<number>(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    const dot    = dotRef.current
    if (!canvas || !dot) return

    setShow(true)

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -300, y: -300 })
    const moveX = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'none' })
    const moveY = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'none' })

    const onMove = ({ clientX: x, clientY: y }: MouseEvent) => {
      moveX(x)
      moveY(y)
      if (!last.current.init) { last.current = { x, y, init: true }; return }
      const dx = x - last.current.x
      const dy = y - last.current.y
      if (Math.sqrt(dx * dx + dy * dy) >= MIN_DIST) {
        segs.current.push({ x1: last.current.x, y1: last.current.y, x2: x, y2: y, born: performance.now() })
        last.current = { x, y, init: true }
      }
    }

    const onOver = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('a,button,[role="button"]')) return
      gsap.to(dot, { scale: 2, duration: 0.22, ease: 'back.out(2.5)' })
    }
    const onOut = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('a,button,[role="button"]')) return
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    // Trail is drawn in pure white — mix-blend-mode:difference on canvas inverts bg colours
    const ctx = canvas.getContext('2d')!
    const draw = () => {
      raf.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = performance.now()
      segs.current = segs.current.filter(s => now - s.born < TRAIL_LIFE)

      for (const s of segs.current) {
        const age  = now - s.born
        const fade = Math.pow(1 - age / TRAIL_LIFE, 1.6)

        ctx.beginPath()
        ctx.moveTo(s.x1, s.y1)
        ctx.lineTo(s.x2, s.y2)
        ctx.strokeStyle = `rgba(255,255,255,${(fade * 0.75).toFixed(3)})`
        ctx.lineWidth   = 1.5
        ctx.lineCap     = 'round'
        ctx.stroke()

        if (age < NODE_LIFE) {
          const nf = 1 - age / NODE_LIFE
          ctx.beginPath()
          ctx.arc(s.x1, s.y1, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${(nf * 0.9).toFixed(3)})`
          ctx.fill()
        }
      }
    }

    draw()
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize',    resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
    }
  }, [show])

  return (
    <>
      {/*
        mix-blend-mode: difference on the canvas inverts the background colour.
        White drawn on white → black.  White on dark → white.  White on teal → orange/amber.
        The cursor is always legible regardless of background.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-[598] pointer-events-none"
        style={{
          opacity: show ? 1 : 0,
          transition: 'opacity 0.6s',
          mixBlendMode: 'difference',
        }}
      />

      {/* Diamond — white fill, mix-blend-mode:difference auto-contrasts any bg */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[600] pointer-events-none"
        style={{
          width: 14,
          height: 14,
          willChange: 'transform',
          opacity: show ? 1 : 0,
          transition: 'opacity 0.6s',
          mixBlendMode: 'difference',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14">
          <polygon points="7,0 14,7 7,14 0,7" fill="white" />
        </svg>
      </div>
    </>
  )
}
