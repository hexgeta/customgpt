"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Users, MessageSquare, Clock, ThumbsUp } from "lucide-react"

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
          <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Analyze</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Monitor your agent&apos;s performance and usage.</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-600 appearance-none cursor-pointer"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/50">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-4 w-4 text-zinc-500" />
              <span className="text-[11px] font-medium text-emerald-400">{stat.change}</span>
            </div>
            <p className="text-2xl font-semibold text-zinc-100">{stat.value}</p>
            <p className="text-[11px] text-zinc-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border border-zinc-800 rounded-xl p-5 bg-zinc-900/50">
        <label className="text-[13px] font-medium text-zinc-200 flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-zinc-500" />
          Conversations Over Time
        </label>
        <div className="h-44 flex items-end gap-1">
          {[35, 52, 48, 70, 65, 80, 72, 90, 85, 95, 88, 105, 98, 110].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-zinc-100 rounded-t transition-all hover:bg-white"
                style={{ height: `${(value / 110) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-zinc-600">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
            <span key={i}>{day}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <label className="text-[13px] font-medium text-zinc-200 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-zinc-500" />
            Top Queries
          </label>
        </div>
        <div className="divide-y divide-zinc-800/60">
          {recentQueries.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-900/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-zinc-600 w-4 text-right tabular-nums">{i + 1}</span>
                <span className="text-[13px] text-zinc-300">{item.query}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-zinc-500 tabular-nums">{item.count}x</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${item.answered ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
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
