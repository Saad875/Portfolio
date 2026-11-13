import { useEffect, useRef, useState } from 'react'

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Adds .is-visible to every [data-reveal] element as it scrolls into view. */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (reduceMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* Material-style ripple on any element with the .ripple class. */
export function useGlobalRipple() {
  useEffect(() => {
    const onDown = (e) => {
      const host = e.target.closest('.ripple')
      if (!host) return
      const rect = host.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2.2
      const wave = document.createElement('span')
      wave.className = 'ripple-wave'
      wave.style.width = wave.style.height = `${size}px`
      wave.style.left = `${e.clientX - rect.left - size / 2}px`
      wave.style.top = `${e.clientY - rect.top - size / 2}px`
      host.appendChild(wave)
      wave.addEventListener('animationend', () => wave.remove())
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])
}

/* Cycles through words with a typing / deleting effect. */
export function useTypewriter(words, { type = 70, erase = 40, hold = 1600 } = {}) {
  const [text, setText] = useState(reduceMotion() ? words[0] : '')
  useEffect(() => {
    if (reduceMotion()) return
    let i = 0
    let pos = 0
    let deleting = false
    let timer
    const tick = () => {
      const word = words[i]
      if (!deleting) {
        pos++
        setText(word.slice(0, pos))
        if (pos === word.length) {
          deleting = true
          timer = setTimeout(tick, hold)
          return
        }
      } else {
        pos--
        setText(word.slice(0, pos))
        if (pos === 0) {
          deleting = false
          i = (i + 1) % words.length
        }
      }
      timer = setTimeout(tick, deleting ? erase : type)
    }
    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [words, type, erase, hold])
  return text
}

/* Counts up to `end` once the element is visible. */
export function useCountUp(end, duration = 1600) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion()) {
      setValue(end)
      return
    }
    let raf
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(end * eased))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])
  return [ref, value]
}

/* 3D tilt + spotlight that follows the pointer. */
export function tiltHandlers(max = 8) {
  return {
    onPointerMove(e) {
      if (e.pointerType !== 'mouse') return
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
      el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
    },
    onPointerLeave(e) {
      const el = e.currentTarget
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    },
  }
}

/* Index of the section currently in view, for the nav. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}

export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  return p
}
