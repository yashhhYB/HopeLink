"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX, Heart, Phone } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  language?: string
}

interface ChatbotProps {
  userProfile?: {
    bloodType?: string
    medicalConditions?: string[]
    emergencyContacts?: Array<{ name: string; phone: string }>
  }
}

export function EnhancedChatbot({ userProfile }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isLoading, setIsLoading] = useState(false)

  const recognitionRef = useRef<any>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  ]

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: "🩺 Hello! I'm your AI Health Assistant for HopeLink. I can help you with medical information about Thalassemia, blood donation guidance, emergency assistance, hospital locations, and health tips. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
        language: currentLanguage,
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = currentLanguage === "en" ? "en-US" : "hi-IN"

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputText(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }
      }
    }
  }, [currentLanguage])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase()

    if (message.includes("emergency") || message.includes("urgent") || message.includes("help")) {
      return "🚨 EMERGENCY ALERT 🚨\n\nIf this is a medical emergency:\n• Call 108 (India) immediately\n• For blood-related emergencies, contact the nearest hospital\n• Use our Emergency SOS feature\n• Share your location with emergency contacts\n\nI can help you find the nearest hospital with blood availability."
    }

    if (message.includes("blood") || message.includes("donation")) {
      return "🩸 Blood Donation Information:\n\n• You can donate blood every 56 days if healthy\n• Thalassemia patients often need regular transfusions\n• O- is universal donor, AB+ is universal recipient\n\nWould you like me to:\n1. Find nearby blood banks\n2. Check blood availability\n3. Schedule a donation appointment?"
    }

    if (message.includes("thalassemia")) {
      return "🧬 Thalassemia Information:\n\nThalassemia is a genetic blood disorder affecting hemoglobin production.\n\n**Management includes:**\n• Regular blood transfusions\n• Iron chelation therapy\n• Folic acid supplements\n• Regular medical monitoring\n\n**HopeLink helps with:**\n• Finding compatible donors\n• Scheduling transfusions\n• Connecting with specialists"
    }

    return "I'm here to help with your health questions related to Thalassemia and blood disorders. I can assist with medical information, blood donation guidance, hospital locations, and emergency assistance. What specific information are you looking for?"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
      language: currentLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsLoading(true)

    setTimeout(async () => {
      const botResponse = await generateBotResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        language: currentLanguage,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)

      if (isSpeaking) {
        speakText(botResponse)
      }
    }, 1000)
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = currentLanguage === "en" ? "en-US" : "hi-IN"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking)
    if (isSpeaking && typeof window !== "undefined") {
      window.speechSynthesis?.cancel()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-300" />
            AI Health Assistant
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="text-sm bg-white/20 text-white border border-white/30 rounded px-2 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-gray-800">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSpeech}
              className={`text-white hover:bg-white/20 ${isSpeaking ? "bg-white/20" : ""}`}
            >
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {userProfile?.bloodType && (
          <Badge variant="secondary" className="w-fit bg-white/20 text-white">
            Blood Type: {userProfile.bloodType}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your health question..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={startListening}
              className={isListening ? "bg-red-100 text-red-600" : ""}
              disabled={!recognitionRef.current}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!inputText.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center mt-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>Emergency: 108</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-red-500" />
            <span>Powered by HopeLink AI</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
