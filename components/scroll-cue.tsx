"use client"

export function ScrollCue() {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      <div className="w-px h-10 overflow-hidden relative">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white/40 to-transparent"
          style={{
            height: "200%",
            animation: "scroll-cue-line 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes scroll-cue-line {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}
