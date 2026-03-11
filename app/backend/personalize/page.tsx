"use client"

import { useState } from "react"
import { Settings, User, MessageCircle, Quote, Brain, Wrench, Shield, Upload, Pencil, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "persona", label: "Persona", icon: User },
  { id: "conversation", label: "Conversation", icon: MessageCircle },
  { id: "citations", label: "Citations", icon: Quote },
  { id: "intelligence", label: "Intelligence", icon: Brain },
  { id: "advanced", label: "Advanced", icon: Wrench },
  { id: "security", label: "Security", icon: Shield },
]

function DarkInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors",
        className
      )}
      {...props}
    />
  )
}

function DarkTextarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors resize-none",
        className
      )}
      {...props}
    />
  )
}

function DarkSelect({ value, onChange, children, className }: { value: string; onChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-[13px] text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors appearance-none cursor-pointer",
        className
      )}
    >
      {children}
    </select>
  )
}

function RadioOption({ id, name, value, checked, onChange, label }: { id: string; name: string; value: string; checked: boolean; onChange: (v: string) => void; label: string }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2.5 cursor-pointer group">
      <div className={cn(
        "h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors",
        checked ? "border-white" : "border-zinc-600 group-hover:border-zinc-400"
      )}>
        {checked && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <input type="radio" id={id} name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      <span className="text-[13px] text-zinc-300">{label}</span>
    </label>
  )
}

function SectionLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2 text-[13px] font-medium text-zinc-200 tracking-tight">
      <Icon className="h-4 w-4 text-zinc-500" />
      {children}
    </label>
  )
}

export default function PersonalizePage() {
  const [activeTab, setActiveTab] = useState("general")
  const [agentName, setAgentName] = useState("My Enterprise Search Agent")
  const [agentRole, setAgentRole] = useState("enterprise-search")
  const [colorScheme, setColorScheme] = useState("legacy")
  const [primaryColor, setPrimaryColor] = useState("#6366f1")
  const [secondaryColor, setSecondaryColor] = useState("#818cf8")
  const [agentStyle, setAgentStyle] = useState("soft")
  const [fontFamily, setFontFamily] = useState("inter")
  const [backgroundType, setBackgroundType] = useState("color")
  const [backgroundColor, setBackgroundColor] = useState("#18181b")
  const [chatMessage, setChatMessage] = useState("")

  const [persona, setPersona] = useState("You are a helpful enterprise search assistant. Answer questions accurately based on the provided data sources.")
  const [responseLength, setResponseLength] = useState("medium")
  const [tone, setTone] = useState("professional")

  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I help you today?")
  const [suggestedQuestions, setSuggestedQuestions] = useState(["What are the latest updates?", "How do I get started?", "Show me the documentation"])
  const [noAnswerMessage, setNoAnswerMessage] = useState("I'm sorry, I couldn't find an answer to your question.")

  const [showCitations, setShowCitations] = useState("yes")
  const [citationStyle, setCitationStyle] = useState("inline")

  const [model, setModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState("0.7")
  const [contextWindow, setContextWindow] = useState("16k")

  const [rateLimit, setRateLimit] = useState("100")
  const [allowedDomains, setAllowedDomains] = useState("")
  const [requireAuth, setRequireAuth] = useState("no")

  const borderRadiusClass =
    agentStyle === "sharp" ? "rounded-none" : agentStyle === "soft" ? "rounded-xl" : agentStyle === "round" ? "rounded-3xl" : "rounded-lg"

  return (
    <div className="flex h-full">
      {/* Settings Panel */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 pt-8 pb-4">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-100">Personalize</h1>
          <p className="text-[13px] text-zinc-500 mt-1">Settings here apply to all deployment options.</p>
        </div>

        {/* Tabs */}
        <div className="px-8 flex gap-0.5 border-b border-zinc-800/60">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5 text-[13px] transition-all border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-white text-white font-medium"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-8 py-6 max-w-xl space-y-7">
          {activeTab === "general" && (
            <>
              <div className="space-y-2">
                <SectionLabel icon={Settings}>Agent Name</SectionLabel>
                <DarkInput value={agentName} onChange={(e) => setAgentName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <SectionLabel icon={Settings}>Agent Role</SectionLabel>
                  <a href="#" className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors">Learn more</a>
                </div>
                <DarkSelect value={agentRole} onChange={setAgentRole} className="w-full">
                  <option value="enterprise-search">Enterprise Search</option>
                  <option value="customer-support">Customer Support</option>
                  <option value="knowledge-base">Knowledge Base</option>
                  <option value="sales-assistant">Sales Assistant</option>
                </DarkSelect>
              </div>

              <div className="space-y-2">
                <SectionLabel icon={Settings}>Agent Avatar</SectionLabel>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 text-sm font-medium">
                    AI
                  </div>
                  <div>
                    <p className="text-[12px] text-zinc-500 mb-2">Square image. JPG, GIF or PNG up to 800 Kb.</p>
                    <button className="flex items-center gap-1.5 text-[12px] text-zinc-300 hover:text-white border border-zinc-700 rounded-lg px-3 py-1.5 hover:bg-zinc-800 transition-colors">
                      <Pencil className="h-3 w-3" />
                      Change Avatar
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-3">
                <SectionLabel icon={Settings}>Color Scheme</SectionLabel>
                <div className="space-y-2.5">
                  <RadioOption id="adaptive" name="colorScheme" value="adaptive" checked={colorScheme === "adaptive"} onChange={setColorScheme} label="Adaptive" />
                  <RadioOption id="legacy" name="colorScheme" value="legacy" checked={colorScheme === "legacy"} onChange={setColorScheme} label="Legacy" />
                </div>
              </div>

              <div className="space-y-4">
                <SectionLabel icon={Settings}>Colors</SectionLabel>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-zinc-400">Primary</span>
                    <div className="flex items-center gap-2">
                      <DarkInput value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-28 h-8 text-[12px]" />
                      <div className="h-8 w-8 rounded-lg border border-zinc-700 cursor-pointer overflow-hidden" style={{ backgroundColor: primaryColor }}>
                        <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="opacity-0 w-full h-full cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-zinc-400">Secondary</span>
                    <div className="flex items-center gap-2">
                      <DarkInput value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-28 h-8 text-[12px]" />
                      <div className="h-8 w-8 rounded-lg border border-zinc-700 cursor-pointer overflow-hidden" style={{ backgroundColor: secondaryColor }}>
                        <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="opacity-0 w-full h-full cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-3">
                <SectionLabel icon={Settings}>Style</SectionLabel>
                <div className="space-y-2.5">
                  {["sharp", "soft", "round", "legacy"].map((style) => (
                    <RadioOption key={style} id={`style-${style}`} name="agentStyle" value={style} checked={agentStyle === style} onChange={setAgentStyle} label={style.charAt(0).toUpperCase() + style.slice(1)} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-3">
                <SectionLabel icon={Settings}>Font Family</SectionLabel>
                <div className="space-y-2.5">
                  <RadioOption id="font-inter" name="fontFamily" value="inter" checked={fontFamily === "inter"} onChange={setFontFamily} label="Inter" />
                  <RadioOption id="font-public-sans" name="fontFamily" value="public-sans" checked={fontFamily === "public-sans"} onChange={setFontFamily} label="Public Sans" />
                </div>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-3">
                <SectionLabel icon={Settings}>Background</SectionLabel>
                <div className="flex gap-4">
                  <RadioOption id="bg-image" name="bgType" value="image" checked={backgroundType === "image"} onChange={setBackgroundType} label="Image" />
                  <RadioOption id="bg-color" name="bgType" value="color" checked={backgroundType === "color"} onChange={setBackgroundType} label="Color" />
                </div>
                {backgroundType === "color" && (
                  <div className="flex items-center gap-2">
                    <DarkInput value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-28 h-8 text-[12px]" />
                    <div className="h-8 w-8 rounded-lg border border-zinc-700 cursor-pointer overflow-hidden" style={{ backgroundColor }}>
                      <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="opacity-0 w-full h-full cursor-pointer" />
                    </div>
                  </div>
                )}
                {backgroundType === "image" && (
                  <button className="flex items-center gap-1.5 text-[12px] text-zinc-300 hover:text-white border border-zinc-700 rounded-lg px-3 py-1.5 hover:bg-zinc-800 transition-colors">
                    <Upload className="h-3 w-3" />
                    Upload Image
                  </button>
                )}
              </div>

              <div className="pt-2">
                <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">
                  Save Changes
                </button>
              </div>
            </>
          )}

          {activeTab === "persona" && (
            <>
              <div className="space-y-2">
                <SectionLabel icon={User}>System Persona</SectionLabel>
                <p className="text-[12px] text-zinc-500">Define how your agent should behave and respond.</p>
                <DarkTextarea value={persona} onChange={(e) => setPersona(e.target.value)} rows={5} />
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-3">
                <SectionLabel icon={User}>Response Length</SectionLabel>
                <div className="space-y-2.5">
                  {["short", "medium", "long"].map((len) => (
                    <RadioOption key={len} id={`len-${len}`} name="responseLength" value={len} checked={responseLength === len} onChange={setResponseLength} label={len.charAt(0).toUpperCase() + len.slice(1)} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-2">
                <SectionLabel icon={User}>Tone</SectionLabel>
                <DarkSelect value={tone} onChange={setTone} className="w-full">
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                </DarkSelect>
              </div>

              <div className="pt-2">
                <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">Save Changes</button>
              </div>
            </>
          )}

          {activeTab === "conversation" && (
            <>
              <div className="space-y-2">
                <SectionLabel icon={MessageCircle}>Welcome Message</SectionLabel>
                <DarkInput value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} />
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-3">
                <SectionLabel icon={MessageCircle}>Suggested Questions</SectionLabel>
                <p className="text-[12px] text-zinc-500">Shown as quick-start prompts to users.</p>
                {suggestedQuestions.map((q, i) => (
                  <div key={i} className="flex gap-2">
                    <DarkInput value={q} onChange={(e) => { const u = [...suggestedQuestions]; u[i] = e.target.value; setSuggestedQuestions(u) }} />
                    <button onClick={() => setSuggestedQuestions(suggestedQuestions.filter((_, idx) => idx !== i))} className="text-[12px] text-zinc-500 hover:text-red-400 border border-zinc-800 rounded-lg px-3 hover:bg-zinc-800/50 transition-colors">
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={() => setSuggestedQuestions([...suggestedQuestions, ""])} className="text-[12px] text-zinc-400 hover:text-white border border-zinc-800 border-dashed rounded-lg px-3 py-1.5 hover:bg-zinc-800/30 transition-colors">
                  + Add Question
                </button>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-2">
                <SectionLabel icon={MessageCircle}>No Answer Message</SectionLabel>
                <DarkInput value={noAnswerMessage} onChange={(e) => setNoAnswerMessage(e.target.value)} />
              </div>

              <div className="pt-2">
                <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">Save Changes</button>
              </div>
            </>
          )}

          {activeTab === "citations" && (
            <>
              <div className="space-y-3">
                <SectionLabel icon={Quote}>Show Citations</SectionLabel>
                <div className="space-y-2.5">
                  <RadioOption id="cite-yes" name="citations" value="yes" checked={showCitations === "yes"} onChange={setShowCitations} label="Yes - Show source citations" />
                  <RadioOption id="cite-no" name="citations" value="no" checked={showCitations === "no"} onChange={setShowCitations} label="No - Hide citations" />
                </div>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-2">
                <SectionLabel icon={Quote}>Citation Style</SectionLabel>
                <DarkSelect value={citationStyle} onChange={setCitationStyle} className="w-full">
                  <option value="inline">Inline</option>
                  <option value="footnote">Footnote</option>
                  <option value="sidebar">Sidebar</option>
                </DarkSelect>
              </div>

              <div className="pt-2">
                <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">Save Changes</button>
              </div>
            </>
          )}

          {activeTab === "intelligence" && (
            <>
              <div className="space-y-2">
                <SectionLabel icon={Brain}>Model</SectionLabel>
                <DarkSelect value={model} onChange={setModel} className="w-full">
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude 3</option>
                </DarkSelect>
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-2">
                <SectionLabel icon={Brain}>Temperature</SectionLabel>
                <p className="text-[12px] text-zinc-500">Controls randomness. Lower = more deterministic.</p>
                <DarkInput type="number" step="0.1" min="0" max="2" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-28" />
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-2">
                <SectionLabel icon={Brain}>Context Window</SectionLabel>
                <DarkSelect value={contextWindow} onChange={setContextWindow} className="w-28">
                  <option value="4k">4K</option>
                  <option value="8k">8K</option>
                  <option value="16k">16K</option>
                  <option value="32k">32K</option>
                  <option value="128k">128K</option>
                </DarkSelect>
              </div>

              <div className="pt-2">
                <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">Save Changes</button>
              </div>
            </>
          )}

          {activeTab === "advanced" && (
            <>
              <div className="space-y-2">
                <SectionLabel icon={Wrench}>Custom CSS</SectionLabel>
                <p className="text-[12px] text-zinc-500">Add custom CSS to style the chat widget.</p>
                <DarkTextarea placeholder=".chat-widget { /* your styles */ }" rows={6} className="font-mono" />
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-2">
                <SectionLabel icon={Wrench}>Custom JavaScript</SectionLabel>
                <p className="text-[12px] text-zinc-500">Extend widget functionality.</p>
                <DarkTextarea placeholder="// Your custom JS here" rows={6} className="font-mono" />
              </div>

              <div className="pt-2">
                <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">Save Changes</button>
              </div>
            </>
          )}

          {activeTab === "security" && (
            <>
              <div className="space-y-2">
                <SectionLabel icon={Shield}>Rate Limiting</SectionLabel>
                <p className="text-[12px] text-zinc-500">Max requests per minute per user.</p>
                <DarkInput type="number" value={rateLimit} onChange={(e) => setRateLimit(e.target.value)} className="w-28" />
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-2">
                <SectionLabel icon={Shield}>Allowed Domains</SectionLabel>
                <p className="text-[12px] text-zinc-500">Comma-separated domains for widget embedding.</p>
                <DarkInput value={allowedDomains} onChange={(e) => setAllowedDomains(e.target.value)} placeholder="example.com, app.example.com" />
              </div>

              <div className="h-px bg-zinc-800/60" />

              <div className="space-y-3">
                <SectionLabel icon={Shield}>Require Authentication</SectionLabel>
                <div className="space-y-2.5">
                  <RadioOption id="auth-yes" name="auth" value="yes" checked={requireAuth === "yes"} onChange={setRequireAuth} label="Yes - Users must authenticate" />
                  <RadioOption id="auth-no" name="auth" value="no" checked={requireAuth === "no"} onChange={setRequireAuth} label="No - Public access" />
                </div>
              </div>

              <div className="pt-2">
                <button className="bg-white text-black rounded-lg px-4 py-2 text-[13px] font-medium hover:bg-zinc-200 transition-colors">Save Changes</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-[380px] border-l border-zinc-800/60 flex flex-col" style={{ backgroundColor }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-[#0c0c0e]">
          <span className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase">Preview</span>
        </div>

        <div className="flex-1 flex flex-col p-5 justify-end">
          {/* Agent bubble */}
          <div className="flex items-start gap-2.5 mb-5">
            <div className="h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-medium text-white shrink-0" style={{ backgroundColor: primaryColor }}>
              AI
            </div>
            <div
              className={cn("bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-[13px] text-zinc-300 max-w-[260px]", borderRadiusClass)}
            >
              {welcomeMessage}
            </div>
          </div>

          {/* Suggested questions */}
          {suggestedQuestions.length > 0 && suggestedQuestions[0] !== "" && (
            <div className="flex flex-wrap gap-1.5 mb-5 ml-9">
              {suggestedQuestions.filter(q => q).map((q, i) => (
                <button
                  key={i}
                  className={cn(
                    "text-[11px] px-2.5 py-1.5 border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors",
                    borderRadiusClass
                  )}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className={cn("bg-zinc-900 border border-zinc-800 flex items-center", borderRadiusClass)}>
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Enter a topic or question to begin"
              className={cn("flex-1 px-3.5 py-2.5 text-[13px] bg-transparent text-zinc-300 placeholder:text-zinc-600 focus:outline-none")}
            />
            <button
              className="p-2 mr-2 rounded-lg transition-colors"
              style={{ backgroundColor: primaryColor }}
            >
              <Send className="h-3.5 w-3.5 text-white" />
            </button>
          </div>

          <p className="text-center text-[10px] text-zinc-600 mt-3">
            Powered by <span className="text-zinc-500">CustomGPT.ai</span>
          </p>
        </div>
      </div>
    </div>
  )
}
