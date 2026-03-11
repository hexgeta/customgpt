"use client"

import { useState } from "react"
import { Copy, Check, Globe, MessageSquare, Code, ExternalLink } from "lucide-react"

const embedCode = `<script src="https://app.customgpt.ai/widget/agent-abc123.js"></script>
<div id="customgpt-widget" data-agent="abc123"></div>`

const iframeCode = `<iframe
  src="https://app.customgpt.ai/embed/abc123"
  width="400"
  height="600"
  frameborder="0"
></iframe>`

export default function DeployPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Deploy</h1>
      <p className="text-[13px] text-zinc-500 mt-1">Deploy your agent across multiple channels.</p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { icon: MessageSquare, label: "Chat Widget", desc: "Embed on your website" },
          { icon: Globe, label: "Hosted Page", desc: "Shareable standalone page" },
          { icon: Code, label: "API", desc: "Integrate via REST API" },
        ].map((channel) => (
          <div key={channel.label} className="border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors cursor-pointer bg-zinc-900/50">
            <div className="flex items-center justify-between mb-3">
              <channel.icon className="h-4 w-4 text-zinc-400" />
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-200">{channel.label}</p>
            <p className="text-[11px] text-zinc-600 mt-0.5">{channel.desc}</p>
          </div>
        ))}
      </div>

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="space-y-3">
        <label className="text-[13px] font-medium text-zinc-200 flex items-center gap-2">
          <Globe className="h-4 w-4 text-zinc-500" />
          Hosted Page URL
        </label>
        <div className="flex gap-2">
          <input value="https://app.customgpt.ai/agent/abc123" readOnly className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-400 font-mono" />
          <button className="flex items-center gap-1.5 text-[12px] text-zinc-300 border border-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-800/50 transition-colors" onClick={() => handleCopy("https://app.customgpt.ai/agent/abc123", "url")}>
            {copied === "url" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied === "url" ? "Copied" : "Copy"}
          </button>
          <button className="flex items-center gap-1.5 text-[12px] text-zinc-300 border border-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-800/50 transition-colors">
            <ExternalLink className="h-3.5 w-3.5" />
            Open
          </button>
        </div>
      </div>

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="space-y-3">
        <label className="text-[13px] font-medium text-zinc-200 flex items-center gap-2">
          <Code className="h-4 w-4 text-zinc-500" />
          Embed Widget
        </label>
        <div className="relative">
          <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-[12px] font-mono text-zinc-400 overflow-x-auto">{embedCode}</pre>
          <button className="absolute top-2 right-2 flex items-center gap-1 text-[11px] text-zinc-400 border border-zinc-700 rounded-lg px-2 py-1 bg-zinc-800 hover:bg-zinc-700 transition-colors" onClick={() => handleCopy(embedCode, "embed")}>
            {copied === "embed" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied === "embed" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="space-y-3">
        <label className="text-[13px] font-medium text-zinc-200 flex items-center gap-2">
          <Code className="h-4 w-4 text-zinc-500" />
          iFrame Embed
        </label>
        <div className="relative">
          <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-[12px] font-mono text-zinc-400 overflow-x-auto">{iframeCode}</pre>
          <button className="absolute top-2 right-2 flex items-center gap-1 text-[11px] text-zinc-400 border border-zinc-700 rounded-lg px-2 py-1 bg-zinc-800 hover:bg-zinc-700 transition-colors" onClick={() => handleCopy(iframeCode, "iframe")}>
            {copied === "iframe" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied === "iframe" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="space-y-3">
        <label className="text-[13px] font-medium text-zinc-200 flex items-center gap-2">
          <Code className="h-4 w-4 text-zinc-500" />
          API Key
        </label>
        <div className="flex gap-2">
          <input value="sk-cgpt-••••••••••••••••••••" readOnly className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-500 font-mono" />
          <button className="text-[12px] text-zinc-300 border border-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-800/50 transition-colors">Reveal</button>
          <button className="text-[12px] text-zinc-300 border border-zinc-800 rounded-lg px-3 py-2 hover:bg-zinc-800/50 transition-colors">Regenerate</button>
        </div>
      </div>
    </div>
  )
}
