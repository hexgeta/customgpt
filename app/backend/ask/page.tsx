"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hello! I'm your Enterprise Search Agent. Ask me anything about your data sources." },
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    setTimeout(() => {
      const responses = [
        "Based on your data sources, here's what I found...",
        "I found several relevant results in your documentation.",
        "Let me search through your knowledge base for that information.",
        "According to the uploaded documents, the answer is...",
        "I've reviewed the available data and here's a summary.",
      ]
      const reply: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: responses[Math.floor(Math.random() * responses.length)] }
      setMessages((prev) => [...prev, reply])
    }, 800)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-4 border-b border-zinc-800/60">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Ask</h1>
        <p className="text-[13px] text-zinc-500 mt-1">Test your agent in real-time.</p>
      </div>

      <div className="flex-1 overflow-auto p-8 space-y-5">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-white" : "bg-zinc-700"}`}>
              {msg.role === "assistant" ? <Bot className="h-3.5 w-3.5 text-black" /> : <User className="h-3.5 w-3.5 text-zinc-300" />}
            </div>
            <div className={`max-w-md px-3.5 py-2.5 text-[13px] rounded-xl ${msg.role === "user" ? "bg-white text-black" : "bg-zinc-900 border border-zinc-800 text-zinc-300"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-zinc-800/60">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
          <button onClick={handleSend} className="p-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
