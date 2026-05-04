"use client"

import React from "react"
import { Sword, BarChart3, Sparkles, ChevronRight } from "lucide-react"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { CinematicFooter } from "@/components/ui/motion-footer2"
import { ScrollCue } from "@/components/scroll-cue"
import Link from "next/link"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

const steps = [
  {
    number: "01",
    icon: Sword,
    title: "Enter your player tag",
    description:
      "Paste your Clash of Clans player tag and connect your village in seconds. No login required.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Get your stats",
    description:
      "Instantly see your troops, heroes, defenses, and resource levels pulled straight from the official CoC API.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Let AI advise your next upgrade",
    description:
      "Our AI analyzes your base and delivers a prioritized upgrade plan so every gem and resource counts.",
  },
]

export default function Page() {
  return (
    <>
      <WebGLShader />

      <div className="relative z-10 flex flex-col">

        {/* ── Hero — just the name ── */}
        <section className="relative flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-7xl md:text-8xl font-semibold tracking-tighter text-white leading-none">
              Clashex
            </h1>
            <p className="text-white/40 text-sm tracking-[0.35em] uppercase mt-1">
              By ARX Studios
            </p>
          </div>
          <ScrollCue />
        </section>

        {/* ── Content — details ── */}
        <section className="flex flex-col items-center gap-20 px-6 py-24">

          {/* How it works label */}
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-white/25 text-xs tracking-[0.3em] uppercase">How it works</p>
            <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
              Three steps to your perfect village
            </h2>
          </div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row max-w-5xl w-full mx-auto border border-white/[0.06] rounded-2xl overflow-hidden">
            {steps.map(({ number, icon: Icon, title, description }, i) => (
              <React.Fragment key={number}>
                <div
                  className="relative flex-1 bg-black/40 backdrop-blur-sm p-8 flex flex-col gap-5 group hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <span className="absolute top-4 right-6 font-display text-6xl text-white/[0.04] select-none group-hover:text-white/[0.07] transition-colors">
                    {number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-white/90 text-sm font-semibold tracking-tight mb-1.5">
                      {title}
                    </h3>
                    <p className="text-white/35 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    key={`sep-${i}`}
                    className="hidden md:flex items-center justify-center w-px bg-white/[0.06] shrink-0"
                  >
                    <ChevronRight className="w-4 h-4 text-white/20 -mx-2" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-white/20 text-xs uppercase tracking-[0.2em]">Get started</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* CTA */}
          <Link href="/dashboard">
            <LiquidButton
              className="text-white border border-white/20 rounded-full tracking-widest uppercase text-sm px-10"
              size="xl"
            >
              Track My Village
            </LiquidButton>
          </Link>

        </section>

      </div>

      <CinematicFooter />
    </>
  )
}
