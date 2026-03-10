"use client"

import { useState } from "react"
import { Settings, User, MessageCircle, Quote, Brain, Wrench, Shield, Upload, Pencil, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function PersonalizePage() {
  const [activeTab, setActiveTab] = useState("general")
  const [agentName, setAgentName] = useState("My Enterprise Search Agent")
  const [agentRole, setAgentRole] = useState("enterprise-search")
  const [colorScheme, setColorScheme] = useState("legacy")
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [secondaryColor, setSecondaryColor] = useState("#666666")
  const [agentStyle, setAgentStyle] = useState("sharp")
  const [fontFamily, setFontFamily] = useState("inter")
  const [backgroundType, setBackgroundType] = useState("color")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [chatMessage, setChatMessage] = useState("")

  // Persona tab
  const [persona, setPersona] = useState("You are a helpful enterprise search assistant. Answer questions accurately based on the provided data sources.")
  const [responseLength, setResponseLength] = useState("medium")
  const [tone, setTone] = useState("professional")

  // Conversation tab
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I help you today?")
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What are the latest updates?",
    "How do I get started?",
    "Show me the documentation",
  ])
  const [noAnswerMessage, setNoAnswerMessage] = useState("I'm sorry, I couldn't find an answer to your question.")

  // Citations tab
  const [showCitations, setShowCitations] = useState("yes")
  const [citationStyle, setCitationStyle] = useState("inline")

  // Intelligence tab
  const [model, setModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState("0.7")
  const [contextWindow, setContextWindow] = useState("16k")

  // Security tab
  const [rateLimit, setRateLimit] = useState("100")
  const [allowedDomains, setAllowedDomains] = useState("")
  const [requireAuth, setRequireAuth] = useState("no")

  const fontClass = fontFamily === "inter" ? "font-sans" : "font-serif"
  const borderRadiusClass =
    agentStyle === "sharp" ? "rounded-none" : agentStyle === "soft" ? "rounded-md" : agentStyle === "round" ? "rounded-2xl" : "rounded-lg"

  return (
    <div className="flex h-full">
      {/* Settings Panel */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Personalize &bull; {agentName}</h1>
          <p className="text-sm text-neutral-500 mt-1">Settings here apply to all deployment options.</p>
        </div>

        {/* Tabs */}
        <div className="px-8 flex gap-1 border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-black text-black font-medium"
                  : "border-transparent text-neutral-500 hover:text-black"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-8 py-6 max-w-2xl space-y-8">
          {activeTab === "general" && (
            <>
              {/* Agent Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Settings className="h-4 w-4 text-neutral-400" />
                  Agent Name
                </Label>
                <Input
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="border-neutral-300"
                />
              </div>

              {/* Agent Role */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-sm font-semibold">
                    <Settings className="h-4 w-4 text-neutral-400" />
                    Agent Role
                  </Label>
                  <a href="#" className="text-xs text-neutral-500 hover:text-black underline">Learn more</a>
                </div>
                <Select value={agentRole} onValueChange={setAgentRole}>
                  <SelectTrigger className="border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enterprise-search">Enterprise Search</SelectItem>
                    <SelectItem value="customer-support">Customer Support</SelectItem>
                    <SelectItem value="knowledge-base">Knowledge Base</SelectItem>
                    <SelectItem value="sales-assistant">Sales Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Agent Avatar */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Settings className="h-4 w-4 text-neutral-400" />
                  Agent Avatar
                </Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border">
                    <AvatarFallback className="bg-neutral-100 text-neutral-500">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-neutral-500 mb-2">Upload square image only. Allowed are JPG, GIF or PNG image up to 800 Kb.</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Pencil className="h-3 w-3" />
                      Change Avatar
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Agent Color Scheme */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Settings className="h-4 w-4 text-neutral-400" />
                  Agent Color Scheme
                </Label>
                <RadioGroup value={colorScheme} onValueChange={setColorScheme} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adaptive" id="adaptive" />
                    <Label htmlFor="adaptive" className="text-sm font-normal">Adaptive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="legacy" id="legacy" />
                    <Label htmlFor="legacy" className="text-sm font-normal">Legacy</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Settings className="h-4 w-4 text-neutral-400" />
                  Colors
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Primary color</span>
                    <div className="flex items-center gap-2">
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-32 h-8 text-sm border-neutral-300"
                      />
                      <div
                        className="h-8 w-8 rounded border border-neutral-300 cursor-pointer"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Secondary color</span>
                    <div className="flex items-center gap-2">
                      <Input
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-32 h-8 text-sm border-neutral-300"
                      />
                      <div
                        className="h-8 w-8 rounded border border-neutral-300 cursor-pointer"
                        style={{ backgroundColor: secondaryColor }}
                      >
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Agent Style */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Settings className="h-4 w-4 text-neutral-400" />
                  Agent Style
                </Label>
                <RadioGroup value={agentStyle} onValueChange={setAgentStyle} className="space-y-2">
                  {["sharp", "soft", "round", "legacy"].map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <RadioGroupItem value={style} id={`style-${style}`} />
                      <Label htmlFor={`style-${style}`} className="text-sm font-normal capitalize">
                        {style}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              {/* Font Family */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Settings className="h-4 w-4 text-neutral-400" />
                  Font Family
                </Label>
                <RadioGroup value={fontFamily} onValueChange={setFontFamily} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inter" id="font-inter" />
                    <Label htmlFor="font-inter" className="text-sm font-normal">Inter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public-sans" id="font-public-sans" />
                    <Label htmlFor="font-public-sans" className="text-sm font-normal">Public Sans</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Background */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Settings className="h-4 w-4 text-neutral-400" />
                  Background
                </Label>
                <RadioGroup value={backgroundType} onValueChange={setBackgroundType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="bg-image" />
                    <Label htmlFor="bg-image" className="text-sm font-normal">Background Image</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="bg-color" />
                    <Label htmlFor="bg-color" className="text-sm font-normal">Background Color</Label>
                  </div>
                </RadioGroup>
                {backgroundType === "color" && (
                  <div className="flex items-center gap-2">
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-32 h-8 text-sm border-neutral-300"
                    />
                    <div
                      className="h-8 w-8 rounded border border-neutral-300 cursor-pointer"
                      style={{ backgroundColor: backgroundColor }}
                    >
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="opacity-0 w-full h-full cursor-pointer"
                      />
                    </div>
                  </div>
                )}
                {backgroundType === "image" && (
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-3 w-3" />
                    Upload Background Image
                  </Button>
                )}
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-neutral-800">Save Changes</Button>
              </div>
            </>
          )}

          {activeTab === "persona" && (
            <>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-neutral-400" />
                  System Persona
                </Label>
                <p className="text-xs text-neutral-500">Define how your agent should behave and respond.</p>
                <textarea
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  rows={5}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-neutral-400" />
                  Response Length
                </Label>
                <RadioGroup value={responseLength} onValueChange={setResponseLength} className="space-y-2">
                  {["short", "medium", "long"].map((len) => (
                    <div key={len} className="flex items-center space-x-2">
                      <RadioGroupItem value={len} id={`len-${len}`} />
                      <Label htmlFor={`len-${len}`} className="text-sm font-normal capitalize">{len}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <User className="h-4 w-4 text-neutral-400" />
                  Tone
                </Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-neutral-800">Save Changes</Button>
              </div>
            </>
          )}

          {activeTab === "conversation" && (
            <>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <MessageCircle className="h-4 w-4 text-neutral-400" />
                  Welcome Message
                </Label>
                <Input
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="border-neutral-300"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <MessageCircle className="h-4 w-4 text-neutral-400" />
                  Suggested Questions
                </Label>
                <p className="text-xs text-neutral-500">These will be shown as quick-start prompts to users.</p>
                {suggestedQuestions.map((q, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={q}
                      onChange={(e) => {
                        const updated = [...suggestedQuestions]
                        updated[i] = e.target.value
                        setSuggestedQuestions(updated)
                      }}
                      className="border-neutral-300"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSuggestedQuestions(suggestedQuestions.filter((_, idx) => idx !== i))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSuggestedQuestions([...suggestedQuestions, ""])}
                >
                  + Add Question
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <MessageCircle className="h-4 w-4 text-neutral-400" />
                  No Answer Message
                </Label>
                <Input
                  value={noAnswerMessage}
                  onChange={(e) => setNoAnswerMessage(e.target.value)}
                  className="border-neutral-300"
                />
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-neutral-800">Save Changes</Button>
              </div>
            </>
          )}

          {activeTab === "citations" && (
            <>
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Quote className="h-4 w-4 text-neutral-400" />
                  Show Citations
                </Label>
                <RadioGroup value={showCitations} onValueChange={setShowCitations} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cite-yes" />
                    <Label htmlFor="cite-yes" className="text-sm font-normal">Yes - Show source citations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cite-no" />
                    <Label htmlFor="cite-no" className="text-sm font-normal">No - Hide citations</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Quote className="h-4 w-4 text-neutral-400" />
                  Citation Style
                </Label>
                <Select value={citationStyle} onValueChange={setCitationStyle}>
                  <SelectTrigger className="border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inline">Inline</SelectItem>
                    <SelectItem value="footnote">Footnote</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-neutral-800">Save Changes</Button>
              </div>
            </>
          )}

          {activeTab === "intelligence" && (
            <>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Brain className="h-4 w-4 text-neutral-400" />
                  Model
                </Label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="border-neutral-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Brain className="h-4 w-4 text-neutral-400" />
                  Temperature
                </Label>
                <p className="text-xs text-neutral-500">Controls randomness. Lower = more deterministic.</p>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-32 border-neutral-300"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Brain className="h-4 w-4 text-neutral-400" />
                  Context Window
                </Label>
                <Select value={contextWindow} onValueChange={setContextWindow}>
                  <SelectTrigger className="border-neutral-300 w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4k">4K</SelectItem>
                    <SelectItem value="8k">8K</SelectItem>
                    <SelectItem value="16k">16K</SelectItem>
                    <SelectItem value="32k">32K</SelectItem>
                    <SelectItem value="128k">128K</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-neutral-800">Save Changes</Button>
              </div>
            </>
          )}

          {activeTab === "advanced" && (
            <>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Wrench className="h-4 w-4 text-neutral-400" />
                  Custom CSS
                </Label>
                <p className="text-xs text-neutral-500">Add custom CSS to style the chat widget.</p>
                <textarea
                  placeholder=".chat-widget { /* your styles */ }"
                  rows={6}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Wrench className="h-4 w-4 text-neutral-400" />
                  Custom JavaScript
                </Label>
                <p className="text-xs text-neutral-500">Add custom JavaScript to extend widget functionality.</p>
                <textarea
                  placeholder="// Your custom JS here"
                  rows={6}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-neutral-800">Save Changes</Button>
              </div>
            </>
          )}

          {activeTab === "security" && (
            <>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Shield className="h-4 w-4 text-neutral-400" />
                  Rate Limiting
                </Label>
                <p className="text-xs text-neutral-500">Maximum requests per minute per user.</p>
                <Input
                  type="number"
                  value={rateLimit}
                  onChange={(e) => setRateLimit(e.target.value)}
                  className="w-32 border-neutral-300"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Shield className="h-4 w-4 text-neutral-400" />
                  Allowed Domains
                </Label>
                <p className="text-xs text-neutral-500">Comma-separated list of domains where the widget can be embedded.</p>
                <Input
                  value={allowedDomains}
                  onChange={(e) => setAllowedDomains(e.target.value)}
                  placeholder="example.com, app.example.com"
                  className="border-neutral-300"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Shield className="h-4 w-4 text-neutral-400" />
                  Require Authentication
                </Label>
                <RadioGroup value={requireAuth} onValueChange={setRequireAuth} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="auth-yes" />
                    <Label htmlFor="auth-yes" className="text-sm font-normal">Yes - Users must authenticate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="auth-no" />
                    <Label htmlFor="auth-no" className="text-sm font-normal">No - Public access</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-neutral-800">Save Changes</Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-[400px] border-l border-neutral-200 flex flex-col" style={{ backgroundColor }}>
        {/* Preview Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white">
          <span className="text-xs text-neutral-500 font-medium">Live Preview</span>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-neutral-100">
              <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>

        {/* Chat Preview */}
        <div className="flex-1 flex flex-col p-6 justify-end">
          {/* Agent bubble */}
          <div className="flex items-start gap-3 mb-6">
            <Avatar className="h-8 w-8 border" style={{ borderColor: primaryColor }}>
              <AvatarFallback className="text-xs" style={{ backgroundColor: primaryColor, color: "#fff" }}>AI</AvatarFallback>
            </Avatar>
            <div
              className={cn("bg-white border border-neutral-200 px-4 py-3 text-sm max-w-[280px] shadow-sm", borderRadiusClass)}
              style={{ fontFamily: fontFamily === "inter" ? "Inter, sans-serif" : "Public Sans, sans-serif" }}
            >
              {welcomeMessage}
            </div>
          </div>

          {/* Suggested questions */}
          {suggestedQuestions.length > 0 && suggestedQuestions[0] !== "" && (
            <div className="flex flex-wrap gap-2 mb-6 ml-11">
              {suggestedQuestions.filter(q => q).map((q, i) => (
                <button
                  key={i}
                  className={cn(
                    "text-xs px-3 py-1.5 border border-neutral-300 bg-white hover:bg-neutral-50 transition-colors",
                    borderRadiusClass
                  )}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className={cn("bg-white border border-neutral-200 flex items-center shadow-sm", borderRadiusClass)}>
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Enter a topic or question to begin"
              className={cn("flex-1 px-4 py-3 text-sm bg-transparent focus:outline-none", borderRadiusClass)}
            />
            <button
              className="p-2 mr-2 rounded-full transition-colors"
              style={{ backgroundColor: primaryColor, color: "#fff" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-neutral-400 mt-3">
            Powered by <span className="font-medium">CustomGPT.ai</span>
          </p>
        </div>
      </div>
    </div>
  )
}
