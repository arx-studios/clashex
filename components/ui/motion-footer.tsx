"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const STYLES = `
@keyframes arx-footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.6; }
}
@keyframes arx-footer-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.arx-footer-breathe  { animation: arx-footer-breathe  8s ease-in-out infinite alternate; }
.arx-footer-marquee  { animation: arx-footer-marquee  40s linear infinite; }

.arx-footer-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right,  rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

.arx-footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255,255,255,0.05) 0%,
    rgba(200,200,255,0.03) 40%,
    transparent 70%
  );
}

.arx-footer-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.04);
  background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 55%);
  -webkit-background-clip: text;
  background-clip: text;
}

.arx-footer-heading-glow {
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.35) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter:
    drop-shadow(0 0 20px rgba(255,255,255,0.55))
    drop-shadow(0 0 60px rgba(255,255,255,0.25))
    drop-shadow(0 0 120px rgba(255,255,255,0.1));
}

.arx-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.arx-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%);
  border-color: rgba(255,255,255,0.22);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15);
}
`

// ── Magnetic Button ────────────────────────────────────────────────────────
type MagneticProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType
  href?: string
  scroll?: boolean
  target?: string
  rel?: string
}

const MagneticButton = React.forwardRef<HTMLElement, MagneticProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null)

    useEffect(() => {
      if (typeof window === "undefined") return
      const el = localRef.current
      if (!el) return

      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect()
          const x = e.clientX - r.left - r.width / 2
          const y = e.clientY - r.top - r.height / 2
          gsap.to(el, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.15, rotationY: x * 0.15, scale: 1.05, ease: "power2.out", duration: 0.4 })
        }
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 })
        }
        el.addEventListener("mousemove", onMove as EventListener)
        el.addEventListener("mouseleave", onLeave)
        return () => {
          el.removeEventListener("mousemove", onMove as EventListener)
          el.removeEventListener("mouseleave", onLeave)
        }
      }, el)

      return () => ctx.revert()
    }, [])

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MagneticButton.displayName = "MagneticButton"

// ── Marquee strip ──────────────────────────────────────────────────────────
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 select-none">
    <span>Clash of Clans Tracker</span>
    <span className="opacity-30">✦</span>
    <span>AI-Powered Upgrades</span>
    <span className="opacity-30">✦</span>
    <span>Know Your Base</span>
    <span className="opacity-30">✦</span>
    <span>Max Smarter</span>
    <span className="opacity-30">✦</span>
    <span>ArxStudios</span>
    <span className="opacity-30">✦</span>
  </div>
)

// ── Main export ────────────────────────────────────────────────────────────
export function CinematicFooter() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgTextRef  = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgTextRef.current,
        { y: "8vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", end: "center center", scrub: 1.2 },
        }
      )
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "center center", scrub: 1.2 },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <section
        ref={sectionRef}
        className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-b from-transparent via-black/40 to-black/80 backdrop-blur-xl text-white"
      >
        {/* Amber aurora glow */}
        <div className="arx-footer-aurora arx-footer-breathe absolute left-1/2 top-1/2 h-[60vh] w-[80vw] rounded-[50%] blur-[90px] pointer-events-none z-0" />

        {/* Giant background text */}
        <div
          ref={bgTextRef}
          className="arx-footer-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none"
        >
          CLASH
        </div>

        {/* Subtle grid */}
        <div className="arx-footer-grid absolute inset-0 z-0 pointer-events-none" />

        {/* ── Marquee ── */}
        <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-white/[0.06] bg-black/30 backdrop-blur-md py-3.5 z-10 -rotate-2 scale-110">
          <div className="arx-footer-marquee flex w-max text-[11px] md:text-xs font-bold tracking-[0.3em] text-white/25 uppercase">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* ── Centre content ── */}
        <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 mt-16">
          <h2
            ref={headingRef}
            className="arx-footer-heading-glow text-5xl md:text-8xl font-black tracking-tighter mb-12 text-center pb-4"
          >
            Know your base.
          </h2>

          <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
            <MagneticButton
              as={Link}
              href="https://arxstudios.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="arx-glass-pill px-10 py-5 rounded-full text-white font-bold text-sm md:text-base"
            >
              by ArxStudios →
            </MagneticButton>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex items-center justify-between">
          <span className="text-white/20 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
            © {new Date().getFullYear()} ARX Studios. All rights reserved.
          </span>

          <MagneticButton
            as="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-11 h-11 rounded-full arx-glass-pill flex items-center justify-center text-white/35 hover:text-white/70 group transition-colors"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
