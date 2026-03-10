"use client"

import { useState } from "react"
import { Upload, FileText, Globe, Link2, Database, Trash2, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
      <h1 className="text-2xl font-bold tracking-tight">Build</h1>
      <p className="text-sm text-neutral-500 mt-1">Add data sources to train your agent.</p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="border border-neutral-200 rounded-lg p-4">
          <p className="text-sm text-neutral-500">Total Sources</p>
          <p className="text-2xl font-bold mt-1">{sources.length}</p>
        </div>
        <div className="border border-neutral-200 rounded-lg p-4">
          <p className="text-sm text-neutral-500">Total Pages</p>
          <p className="text-2xl font-bold mt-1">{totalPages}</p>
        </div>
        <div className="border border-neutral-200 rounded-lg p-4">
          <p className="text-sm text-neutral-500">Status</p>
          <p className="text-2xl font-bold mt-1 text-green-600">Active</p>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Upload Section */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold">Upload Files</Label>
        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-neutral-400 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 mx-auto text-neutral-400 mb-2" />
          <p className="text-sm text-neutral-600">Drag and drop files here, or click to browse</p>
          <p className="text-xs text-neutral-400 mt-1">PDF, TXT, CSV, DOCX, XLSX up to 50MB</p>
        </div>
      </div>

      <Separator className="my-8" />

      {/* URL Section */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold">Add Website / Sitemap URL</Label>
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="border-neutral-300"
          />
          <Button
            className="bg-black text-white hover:bg-neutral-800 gap-2"
            onClick={() => {
              if (url) {
                setSources([...sources, {
                  id: Date.now().toString(),
                  name: url,
                  type: "url",
                  status: "processing",
                  pages: 0,
                  lastUpdated: "Just now"
                }])
                setUrl("")
              }
            }}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Sources List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Data Sources</Label>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-3 w-3" />
            Re-index All
          </Button>
        </div>
        <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
          {sources.map((source) => (
            <div key={source.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {source.type === "file" ? (
                  <FileText className="h-5 w-5 text-neutral-400" />
                ) : source.type === "sitemap" ? (
                  <Globe className="h-5 w-5 text-neutral-400" />
                ) : (
                  <Link2 className="h-5 w-5 text-neutral-400" />
                )}
                <div>
                  <p className="text-sm font-medium">{source.name}</p>
                  <p className="text-xs text-neutral-400">{source.lastUpdated} &bull; {source.pages} pages</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {source.status === "ready" && (
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Ready</Badge>
                )}
                {source.status === "processing" && (
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="w-20 h-2" />
                    <span className="text-xs text-neutral-500">Processing</span>
                  </div>
                )}
                {source.status === "error" && (
                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Error</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSources(sources.filter(s => s.id !== source.id))}
                >
                  <Trash2 className="h-4 w-4 text-neutral-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
