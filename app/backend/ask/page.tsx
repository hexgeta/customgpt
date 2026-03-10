"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "Based on your data sources, here's what I found...",
        "I found several relevant results in your documentation.",
        "Let me search through your knowledge base for that information.",
        "According to the uploaded documents, the answer is...",
        "I've reviewed the available data and here's a summary.",
      ]
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      }
      setMessages((prev) => [...prev, reply])
    }, 800)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-bold tracking-tight">Ask</h1>
        <p className="text-sm text-neutral-500 mt-1">Test your agent in real-time.</p>
      </div>

      <div className="flex-1 overflow-auto p-8 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-8 w-8 border border-neutral-200">
              <AvatarFallback className={msg.role === "assistant" ? "bg-black text-white" : "bg-neutral-100"}>
                {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div
              className={`max-w-md px-4 py-3 text-sm rounded-lg ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-neutral-200">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="border-neutral-300"
          />
          <button
            onClick={handleSend}
            className="p-2.5 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
