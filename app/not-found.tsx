import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
      <h1 className="font-display text-8xl text-amber-400">404</h1>
      <p className="text-white/50">Page not found</p>
      <Link
        href="/"
        className="mt-2 text-sm text-amber-400/80 hover:text-amber-400 transition-colors"
      >
        ← Back home
      </Link>
    </div>
  )
}
