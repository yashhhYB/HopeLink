"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your HopeLink AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("blood") && lowerMessage.includes("type")) {
      return "Your blood type is crucial for matching. If you're unsure, please consult with your healthcare provider or get tested at any of our partner hospitals."
    }

    if (lowerMessage.includes("transfusion") || lowerMessage.includes("schedule")) {
      return "Based on your medical history, your next transfusion is scheduled for January 15, 2024. Would you like me to help you reschedule or find nearby hospitals?"
    }

    if (lowerMessage.includes("donate") || lowerMessage.includes("donor")) {
      return "Thank you for your interest in donating! You can donate blood every 56 days. Would you like me to check your eligibility or find nearby donation centers?"
    }

    if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent")) {
      return "For medical emergencies, please call 108 immediately or use our Emergency SOS button. I can also help you find the nearest hospital with blood availability."
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return "I can help you with:\n• Blood availability information\n• Transfusion scheduling\n• Donation eligibility\n• Emergency assistance\n• General Thalassemia information\n\nWhat would you like to know more about?"
    }

    return (
      "I understand you're asking about " +
      message +
      ". Let me help you with that. Could you please provide more specific details so I can assist you better?"
    )
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <CardTitle className="text-sm">HopeLink Assistant</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-blue-700 h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
