"use client"

import { useState } from "react"
import { Zap, Plus, Trash2, Code, Globe, Mail, Webhook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

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
    email: <Mail className="h-4 w-4 text-neutral-400" />,
    webhook: <Webhook className="h-4 w-4 text-neutral-400" />,
    api: <Globe className="h-4 w-4 text-neutral-400" />,
    code: <Code className="h-4 w-4 text-neutral-400" />,
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Actions</h1>
          <p className="text-sm text-neutral-500 mt-1">Configure actions your agent can trigger.</p>
        </div>
        <Button className="bg-black text-white hover:bg-neutral-800 gap-2" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          New Action
        </Button>
      </div>

      {showForm && (
        <>
          <Separator className="my-6" />
          <div className="border border-neutral-200 rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-semibold">Create New Action</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Action Name</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="My Action" className="border-neutral-300" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Type</Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger className="border-neutral-300"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="api">API Call</SelectItem>
                    <SelectItem value="code">Custom Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-black text-white hover:bg-neutral-800"
                onClick={() => {
                  if (newName) {
                    setActions([...actions, { id: Date.now().toString(), name: newName, type: newType, enabled: true }])
                    setNewName("")
                    setShowForm(false)
                  }
                }}
              >
                Create
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        </>
      )}

      <Separator className="my-8" />

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        {actions.map((action) => (
          <div key={action.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {typeIcons[action.type] || <Zap className="h-4 w-4 text-neutral-400" />}
              <div>
                <p className="text-sm font-medium">{action.name}</p>
                <p className="text-xs text-neutral-400 capitalize">{action.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={action.enabled}
                onCheckedChange={(checked) =>
                  setActions(actions.map(a => a.id === action.id ? { ...a, enabled: checked } : a))
                }
              />
              <Button variant="ghost" size="sm" onClick={() => setActions(actions.filter(a => a.id !== action.id))}>
                <Trash2 className="h-4 w-4 text-neutral-400" />
              </Button>
            </div>
          </div>
        ))}
        {actions.length === 0 && (
          <div className="p-8 text-center text-sm text-neutral-400">No actions configured yet.</div>
        )}
      </div>
    </div>
  )
}
