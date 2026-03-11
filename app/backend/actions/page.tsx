"use client"

import { useState } from "react"
import { Zap, Plus, Trash2, Code, Globe, Mail, Webhook } from "lucide-react"

interface Action {
  id: string
  name: string
  type: string
  enabled: boolean
}

export default function ActionsPage() {
  const [actions, setActions] = useState<Action[]>([
    { id: "1", name: "Send Email Notification", type: "email", enabled: true },
    { id: "2", name: "Webhook - Slack Alert", type: "webhook", enabled: true },
    { id: "3", name: "Custom API Call", type: "api", enabled: false },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState("webhook")

  const typeIcons: Record<string, React.ReactNode> = {
    email: <Mail className="h-4 w-4 text-zinc-500" />,
    webhook: <Webhook className="h-4 w-4 text-zinc-500" />,
    api: <Globe className="h-4 w-4 text-zinc-500" />,
    code: <Code className="h-4 w-4 text-zinc-500" />,
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Actions</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Configure actions your agent can trigger.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors" onClick={() => setShowForm(true)}>
          <Plus className="h-3.5 w-3.5" />
          New Action
        </button>
      </div>

      {showForm && (
        <>
          <div className="h-px bg-zinc-800/60 my-6" />
          <div className="border border-zinc-800 rounded-xl p-5 space-y-4 bg-zinc-900/50">
            <h3 className="text-[13px] font-medium text-zinc-200">Create New Action</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] text-zinc-400">Action Name</label>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="My Action" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] text-zinc-400">Type</label>
                <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-600 appearance-none">
                  <option value="webhook">Webhook</option>
                  <option value="email">Email</option>
                  <option value="api">API Call</option>
                  <option value="code">Custom Code</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors" onClick={() => { if (newName) { setActions([...actions, { id: Date.now().toString(), name: newName, type: newType, enabled: true }]); setNewName(""); setShowForm(false) } }}>
                Create
              </button>
              <button className="border border-zinc-800 text-zinc-300 rounded-lg px-4 py-2 text-[13px] hover:bg-zinc-800/50 transition-colors" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

      <div className="h-px bg-zinc-800/60 my-8" />

      <div className="border border-zinc-800 rounded-xl divide-y divide-zinc-800/60 overflow-hidden">
        {actions.map((action) => (
          <div key={action.id} className="flex items-center justify-between p-4 hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-center gap-3">
              {typeIcons[action.type] || <Zap className="h-4 w-4 text-zinc-500" />}
              <div>
                <p className="text-[13px] font-medium text-zinc-200">{action.name}</p>
                <p className="text-[11px] text-zinc-600 capitalize">{action.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActions(actions.map(a => a.id === action.id ? { ...a, enabled: !a.enabled } : a))}
                className={`relative w-9 h-5 rounded-full transition-colors ${action.enabled ? "bg-white" : "bg-zinc-700"}`}
              >
                <div className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${action.enabled ? "left-[18px] bg-black" : "left-0.5 bg-zinc-400"}`} />
              </button>
              <button onClick={() => setActions(actions.filter(a => a.id !== action.id))} className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
                <Trash2 className="h-3.5 w-3.5 text-zinc-600 hover:text-zinc-400" />
              </button>
            </div>
          </div>
        ))}
        {actions.length === 0 && (
          <div className="p-8 text-center text-[13px] text-zinc-600">No actions configured yet.</div>
        )}
      </div>
    </div>
  )
}
