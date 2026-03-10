"use client"

import { useState } from "react"
import { Copy, Check, Globe, MessageSquare, Code, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

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
      <h1 className="text-2xl font-bold tracking-tight">Deploy</h1>
      <p className="text-sm text-neutral-500 mt-1">Deploy your agent across multiple channels.</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, label: "Chat Widget", desc: "Embed on your website", status: "Active" },
          { icon: Globe, label: "Hosted Page", desc: "Shareable standalone page", status: "Active" },
          { icon: Code, label: "API", desc: "Integrate via REST API", status: "Active" },
        ].map((channel) => (
          <div key={channel.label} className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-400 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <channel.icon className="h-5 w-5 text-neutral-600" />
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-xs">{channel.status}</Badge>
            </div>
            <p className="text-sm font-medium">{channel.label}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{channel.desc}</p>
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      {/* Hosted Page */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Globe className="h-4 w-4 text-neutral-400" />
          Hosted Page URL
        </Label>
        <div className="flex gap-2">
          <Input value="https://app.customgpt.ai/agent/abc123" readOnly className="border-neutral-300 bg-neutral-50" />
          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleCopy("https://app.customgpt.ai/agent/abc123", "url")}>
            {copied === "url" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied === "url" ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Open
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Embed Code */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Code className="h-4 w-4 text-neutral-400" />
          Embed Widget
        </Label>
        <div className="relative">
          <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-xs font-mono overflow-x-auto">{embedCode}</pre>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 gap-1 text-xs"
            onClick={() => handleCopy(embedCode, "embed")}
          >
            {copied === "embed" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied === "embed" ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      {/* iFrame */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Code className="h-4 w-4 text-neutral-400" />
          iFrame Embed
        </Label>
        <div className="relative">
          <pre className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-xs font-mono overflow-x-auto">{iframeCode}</pre>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 gap-1 text-xs"
            onClick={() => handleCopy(iframeCode, "iframe")}
          >
            {copied === "iframe" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied === "iframe" ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      {/* API Key */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold flex items-center gap-2">
          <Code className="h-4 w-4 text-neutral-400" />
          API Key
        </Label>
        <div className="flex gap-2">
          <Input value="sk-cgpt-••••••••••••••••••••" readOnly className="border-neutral-300 bg-neutral-50 font-mono text-sm" />
          <Button variant="outline" size="sm">Reveal</Button>
          <Button variant="outline" size="sm">Regenerate</Button>
        </div>
      </div>
    </div>
  )
}
