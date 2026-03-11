"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Palette,
  Zap,
  MessageSquare,
  Rocket,
  BarChart3,
  Plus,
  ChevronLeft,
  Bot,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarNav = [
  { label: "Build", href: "/backend/build", icon: Building2 },
  { label: "Personalize", href: "/backend/personalize", icon: Palette },
  { label: "Actions", href: "/backend/actions", icon: Zap },
  { label: "Ask", href: "/backend/ask", icon: MessageSquare },
  { label: "Deploy", href: "/backend/deploy", icon: Rocket },
  { label: "Analyze", href: "/backend/analyze", icon: BarChart3 },
]

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-100" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'" }}>
      {/* Sidebar */}
      <aside className="w-60 border-r border-zinc-800/60 flex flex-col bg-[#0c0c0e]">
        {/* Logo */}
        <div className="px-5 py-4 flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-white flex items-center justify-center">
            <Bot className="h-4 w-4 text-black" />
          </div>
          <span className="font-medium text-[13px] tracking-tight text-zinc-100">CustomGPT.ai</span>
        </div>

        {/* New Agent Button */}
        <div className="px-3 mb-3">
          <button className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-lg px-3 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            New Agent
          </button>
        </div>

        <div className="h-px bg-zinc-800/60 mx-3" />

        {/* Agent Name */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 text-[13px]">
            <ChevronLeft className="h-3.5 w-3.5 text-zinc-500" />
            <span className="font-medium text-zinc-400 truncate">My Enterprise S...</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-0.5">
          {sidebarNav.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-all",
                  isActive
                    ? "bg-zinc-800 text-white font-medium"
                    : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="h-px bg-zinc-800/60 mx-3" />

        {/* Copilot Input */}
        <div className="p-3">
          <p className="text-[11px] text-zinc-600 mb-2 font-medium tracking-wide uppercase">Copilot</p>
          <div className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-800 rounded-lg px-3 py-2">
            <input
              placeholder="I need help with..."
              className="flex-1 bg-transparent text-[12px] text-zinc-400 placeholder:text-zinc-600 focus:outline-none"
            />
            <Send className="h-3 w-3 text-zinc-600" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
