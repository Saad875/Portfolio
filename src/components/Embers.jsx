import { useEffect, useRef } from 'react'

/* Glowing ember particles drifting upward, echoing the photo's orange sparks. */
export default function Embers({ density = 45 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, raf
    let mouse = { x: -9999, y: -9999 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const count = Math.round(density * Math.min(1, w / 1200) + 20)
    const make = (spawnBottom) => ({
      x: Math.random() * w,
      y: spawnBottom ? h + Math.random() * 40 : Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.45 + 0.15,
      vx: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.6 + 0.25,
      tw: Math.random() * Math.PI * 2,
    })
    const ps = Array.from({ length: count }, () => make(false))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.tw += 0.03
        p.y -= p.vy
        p.x += p.vx + Math.sin(p.tw) * 0.15
        if (p.y < -10 || p.x < -10 || p.x > w + 10) Object.assign(p, make(true))
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw))
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, `rgba(255, 196, 120, ${alpha})`)
        g.addColorStop(0.4, `rgba(255, 140, 40, ${alpha * 0.5})`)
        g.addColorStop(1, 'rgba(255, 120, 20, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    if (reduce) {
      draw()
      cancelAnimationFrame(raf)
    } else {
      draw()
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => (mouse = { x: -9999, y: -9999 })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [density])

  return <canvas ref={ref} className="embers" aria-hidden="true" />
}
