"use client"

import { BarChart3, TrendingUp, Users, MessageSquare, Clock, ThumbsUp } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const stats = [
  { label: "Total Conversations", value: "1,247", change: "+12.5%", icon: MessageSquare },
  { label: "Unique Users", value: "834", change: "+8.2%", icon: Users },
  { label: "Avg Response Time", value: "1.2s", change: "-15%", icon: Clock },
  { label: "Satisfaction Rate", value: "94%", change: "+3.1%", icon: ThumbsUp },
]

const recentQueries = [
  { query: "How do I reset my password?", count: 45, answered: true },
  { query: "What are the pricing plans?", count: 38, answered: true },
  { query: "Where can I find the API docs?", count: 31, answered: true },
  { query: "How to upgrade my account?", count: 27, answered: true },
  { query: "Integration with Salesforce", count: 19, answered: false },
  { query: "Custom domain setup", count: 15, answered: true },
  { query: "Data export options", count: 12, answered: false },
]

export default function AnalyzePage() {
  const [period, setPeriod] = useState("7d")

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analyze</h1>
          <p className="text-sm text-neutral-500 mt-1">Monitor your agent&apos;s performance and usage.</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-36 border-neutral-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-neutral-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-neutral-400" />
              <span className={`text-xs font-medium ${stat.change.startsWith("+") || stat.change.startsWith("-") && stat.label === "Avg Response Time" ? "text-green-600" : "text-green-600"}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="mt-8 border border-neutral-200 rounded-lg p-6">
        <Label className="text-sm font-semibold flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-neutral-400" />
          Conversations Over Time
        </Label>
        <div className="h-48 flex items-end gap-1">
          {[35, 52, 48, 70, 65, 80, 72, 90, 85, 95, 88, 105, 98, 110].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-neutral-900 rounded-t transition-all hover:bg-neutral-700"
                style={{ height: `${(value / 110) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-neutral-400">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <span key={i}>{day}</span>
          ))}
        </div>
      </div>

      {/* Top Queries */}
      <div className="mt-8 border border-neutral-200 rounded-lg">
        <div className="p-4 border-b border-neutral-200">
          <Label className="text-sm font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-neutral-400" />
            Top Queries
          </Label>
        </div>
        <div className="divide-y divide-neutral-100">
          {recentQueries.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400 w-5 text-right">{i + 1}</span>
                <span className="text-sm">{item.query}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-500">{item.count} times</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.answered ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                  {item.answered ? "Answered" : "Unanswered"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
