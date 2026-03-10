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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
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
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 flex flex-col bg-neutral-50">
        {/* Logo */}
        <div className="p-4 flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <span className="font-semibold text-sm">CustomGPT.ai</span>
        </div>

        {/* New Agent Button */}
        <div className="px-3 mb-2">
          <Button className="w-full justify-start gap-2 bg-black text-white hover:bg-neutral-800" size="sm">
            <Plus className="h-4 w-4" />
            New Agent
          </Button>
        </div>

        <Separator />

        {/* Agent Name */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <ChevronLeft className="h-4 w-4 text-neutral-400" />
            <span className="font-medium text-neutral-700 truncate">My Enterprise S...</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-0.5">
          {sidebarNav.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-neutral-200 text-black font-medium"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Separator />

        {/* Copilot Input */}
        <div className="p-3">
          <p className="text-xs text-neutral-500 mb-2 font-medium">CustomGPT.ai Copilot</p>
          <Input placeholder="I need help with..." className="text-xs h-8" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
