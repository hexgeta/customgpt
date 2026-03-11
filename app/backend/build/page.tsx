"use client"

import { useState } from "react"
import { Upload, FileText, Globe, Link2, Trash2, Plus, RefreshCw } from "lucide-react"

interface DataSource {
  id: string
  name: string
  type: "file" | "url" | "sitemap"
  status: "ready" | "processing" | "error"
  pages: number
  lastUpdated: string
}

export default function BuildPage() {
  const [sources, setSources] = useState<DataSource[]>([
    { id: "1", name: "product-docs.pdf", type: "file", status: "ready", pages: 45, lastUpdated: "2 hours ago" },
    { id: "2", name: "https://docs.example.com", type: "sitemap", status: "ready", pages: 128, lastUpdated: "1 day ago" },
    { id: "3", name: "faq-database.csv", type: "file", status: "processing", pages: 0, lastUpdated: "Just now" },
  ])
  const [url, setUrl] = useState("")

  const totalPages = sources.reduce((acc, s) => acc + s.pages, 0)

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Build</h1>
      <p className="text-[13px] text-zinc-500 mt-1">Add data sources to train your agent.</p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { label: "Total Sources", value: sources.length.toString() },
          { label: "Total Pages", value: totalPages.toString() },
          { label: "Status", value: "Active", color: "text-emerald-400" },
        ].map((stat) => (
          <div key={stat.label} className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50">
            <p className="text-[12px] text-zinc-500">{stat.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${stat.color || "text-zinc-100"}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="space-y-3">
        <label className="text-[13px] font-medium text-zinc-200">Upload Files</label>
        <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center hover:border-zinc-600 transition-colors cursor-pointer bg-zinc-900/30">
          <Upload className="h-6 w-6 mx-auto text-zinc-600 mb-2" />
          <p className="text-[13px] text-zinc-400">Drag and drop files here, or click to browse</p>
          <p className="text-[11px] text-zinc-600 mt-1">PDF, TXT, CSV, DOCX, XLSX up to 50MB</p>
        </div>
      </div>

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="space-y-3">
        <label className="text-[13px] font-medium text-zinc-200">Add Website / Sitemap URL</label>
        <div className="flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
          <button
            className="flex items-center gap-1.5 bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors"
            onClick={() => {
              if (url) {
                setSources([...sources, { id: Date.now().toString(), name: url, type: "url", status: "processing", pages: 0, lastUpdated: "Just now" }])
                setUrl("")
              }
            }}
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-medium text-zinc-200">Data Sources</label>
          <button className="flex items-center gap-1.5 text-[12px] text-zinc-400 hover:text-white border border-zinc-800 rounded-lg px-3 py-1.5 hover:bg-zinc-800/50 transition-colors">
            <RefreshCw className="h-3 w-3" />
            Re-index All
          </button>
        </div>
        <div className="border border-zinc-800 rounded-xl divide-y divide-zinc-800/60 overflow-hidden">
          {sources.map((source) => (
            <div key={source.id} className="flex items-center justify-between p-4 hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center gap-3">
                {source.type === "file" ? <FileText className="h-4 w-4 text-zinc-500" /> : source.type === "sitemap" ? <Globe className="h-4 w-4 text-zinc-500" /> : <Link2 className="h-4 w-4 text-zinc-500" />}
                <div>
                  <p className="text-[13px] font-medium text-zinc-200">{source.name}</p>
                  <p className="text-[11px] text-zinc-600">{source.lastUpdated} &bull; {source.pages} pages</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {source.status === "ready" && <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ready</span>}
                {source.status === "processing" && (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className="w-2/5 h-full bg-zinc-400 rounded-full animate-pulse" /></div>
                    <span className="text-[11px] text-zinc-500">Processing</span>
                  </div>
                )}
                <button onClick={() => setSources(sources.filter(s => s.id !== source.id))} className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
                  <Trash2 className="h-3.5 w-3.5 text-zinc-600 hover:text-zinc-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
