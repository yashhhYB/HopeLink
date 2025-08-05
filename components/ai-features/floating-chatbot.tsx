"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Heart,
  Phone,
} from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  language?: string
}

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string
      }
    }
  }
}

interface SpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: () => void
  onend: () => void
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isLoading, setIsLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
  ]

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = getLanguageCode(currentLanguage)

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript
          setInputText(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [currentLanguage])

  // Initialize welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text: getWelcomeMessage(currentLanguage),
        sender: "bot",
        timestamp: new Date(),
        language: currentLanguage,
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, currentLanguage])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  // Show notification for new messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true)
      const timer = setTimeout(() => setHasNewMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [messages, isOpen])

  const getLanguageCode = (lang: string): string => {
    const codes: { [key: string]: string } = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN",
      ta: "ta-IN",
      bn: "bn-BD",
      te: "te-IN",
      gu: "gu-IN",
      kn: "kn-IN",
    }
    return codes[lang] || "en-US"
  }

  const getWelcomeMessage = (lang: string): string => {
    const welcomeMessages: { [key: string]: string } = {
      en: "🩺 Hello! I'm your AI Health Assistant for HopeLink. I can help you with:\n\n• Medical information about Thalassemia\n• Blood donation guidance\n• Emergency assistance\n• Hospital locations\n• Health tips and support\n\nHow can I assist you today?",
      hi: "🩺 नमस्ते! मैं HopeLink का AI स्वास्थ्य सहायक हूं। मैं आपकी मदद कर सकता हूं:\n\n• थैलेसीमिया की चिकित्सा जानकारी\n• रक्तदान मार्गदर्शन\n• आपातकालीन सहायता\n• अस्पताल स्थान\n• स्वास्थ्य सुझाव और सहायता\n\nआज मैं आपकी कैसे सहायता कर सकता हूं?",
      mr: "🩺 नमस्कार! मी HopeLink चा AI आरोग्य सहाय्यक आहे। मी तुम्हाला मदत करू शकतो:\n\n• थॅलेसेमियाची वैद्यकीय माहिती\n• रक्तदान मार्गदर्शन\n• आपत्कालीन मदत\n• रुग्णालयाचे स्थान\n• आरोग्य सल्ले आणि सहाय्य\n\nआज मी तुमची कशी मदत करू शकतो?",
      ta: "🩺 வணக்கம்! நான் HopeLink இன் AI சுகாதார உதவியாளர். நான் உங்களுக்கு உதவ முடியும்:\n\n• தலசீமியா பற்றிய மருத்துவ தகவல்\n• இரத்த தான வழிகாட்டுதல்\n• அவசர உதவி\n• மருத்துவமனை இடங்கள்\n• சுகாதார ஆலோசனைகள் மற்றும் ஆதரவு\n\nஇன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      bn: "🩺 হ্যালো! আমি HopeLink এর AI স্বাস্থ্য সহায়ক। আমি আপনাকে সাহায্য করতে পারি:\n\n• থ্যালাসেমিয়া সম্পর্কে চিকিৎসা তথ্য\n• রক্তদান নির্দেশনা\n• জরুরি সহায়তা\n• হাসপাতালের অবস্থান\n• স্বাস্থ্য পরামর্শ এবং সহায়তা\n\nআজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    }
    return welcomeMessages[lang] || welcomeMessages.en
  }

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase()

    // Emergency responses
    if (
      message.includes("emergency") ||
      message.includes("urgent") ||
      message.includes("help") ||
      message.includes("pain")
    ) {
      return getEmergencyResponse(currentLanguage)
    }

    // Blood-related queries
    if (message.includes("blood") || message.includes("donation") || message.includes("donor")) {
      return getBloodResponse(currentLanguage)
    }

    // Thalassemia information
    if (message.includes("thalassemia") || message.includes("thalassaemia")) {
      return getThalassemiaResponse(currentLanguage)
    }

    // Hospital/location queries
    if (message.includes("hospital") || message.includes("location") || message.includes("near")) {
      return getHospitalResponse(currentLanguage)
    }

    // Symptoms
    if (
      message.includes("symptom") ||
      message.includes("fever") ||
      message.includes("tired") ||
      message.includes("weak")
    ) {
      return getSymptomResponse(currentLanguage)
    }

    // Default response
    return getDefaultResponse(currentLanguage)
  }

  const getEmergencyResponse = (lang: string): string => {
    const responses: { [key: string]: string } = {
      en: "🚨 EMERGENCY ALERT 🚨\n\nIf this is a medical emergency:\n• Call 108 (India) or your local emergency number immediately\n• For blood-related emergencies, contact the nearest hospital\n• Use our Emergency SOS feature in the app\n• Share your location with emergency contacts\n\nI can help you find the nearest hospital with blood availability. Would you like me to do that?",
      hi: "🚨 आपातकालीन चेतावनी 🚨\n\nयदि यह चिकित्सा आपातकाल है:\n• तुरंत 108 या अपना स्थानीय आपातकालीन नंबर कॉल करें\n• रक्त संबंधी आपातकाल के लिए, निकटतम अस्पताल से संपर्क करें\n• ऐप में हमारी Emergency SOS सुविधा का उपयोग करें\n• अपना स्थान आपातकालीन संपर्कों के साथ साझा करें\n\nमैं आपको रक्त उपलब्धता वाले निकटतम अस्पताल खोजने में मदद कर सकता हूं। क्या आप चाहते हैं कि मैं ऐसा करूं?",
    }
    return responses[lang] || responses.en
  }

  const getBloodResponse = (lang: string): string => {
    const responses: { [key: string]: string } = {
      en: "🩸 Blood Donation & Information:\n\n• You can donate blood every 56 days if healthy\n• Common blood types: A+, A-, B+, B-, AB+, AB-, O+, O-\n• O- is universal donor, AB+ is universal recipient\n• Thalassemia patients often need regular transfusions\n• Iron chelation therapy helps remove excess iron\n\nWould you like me to:\n1. Find nearby blood banks\n2. Check blood availability\n3. Schedule a donation appointment\n4. Provide more information about blood types?",
      hi: "🩸 रक्तदान और जानकारी:\n\n• यदि आप स्वस्थ हैं तो आप हर 56 दिन में रक्तदान कर सकते हैं\n• सामान्य रक्त समूह: A+, A-, B+, B-, AB+, AB-, O+, O-\n• O- सार्वभौमिक दाता है, AB+ सार्वभौमिक प्राप्तकर्ता है\n• थैलेसीमिया रोगियों को अक्सर नियमित रक्त चढ़ाने की आवश्यकता होती है\n• आयरन चेलेशन थेरेपी अतिरिक्त आयरन हटाने में मदद करती है\n\nक्या आप चाहते हैं कि मैं:\n1. नजदीकी ब्लड बैंक खोजूं\n2. रक्त उपलब्धता जांचूं\n3. दान की नियुक्ति निर्धारित करूं\n4. रक्त समूहों के बारे में अधिक जानकारी प्रदान करूं?",
    }
    return responses[lang] || responses.en
  }

  const getThalassemiaResponse = (lang: string): string => {
    const responses: { [key: string]: string } = {
      en: "🧬 Thalassemia Information:\n\nThalassemia is a genetic blood disorder affecting hemoglobin production.\n\n**Types:**\n• Alpha Thalassemia\n• Beta Thalassemia (Minor, Intermedia, Major)\n\n**Management:**\n• Regular blood transfusions\n• Iron chelation therapy\n• Folic acid supplements\n• Healthy diet and lifestyle\n• Regular medical monitoring\n\n**HopeLink helps with:**\n• Finding compatible donors\n• Scheduling transfusions\n• Connecting with specialists\n• Community support\n\nWould you like specific information about any aspect?",
      hi: "🧬 थैलेसीमिया जानकारी:\n\nथैलेसीमिया एक आनुवंशिक रक्त विकार है जो हीमोग्लोबिन उत्पादन को प्रभावित करता है।\n\n**प्रकार:**\n• अल्फा थैलेसीमिया\n• बीटा थैलेसीमिया (माइनर, इंटरमीडिया, मेजर)\n\n**प्रबंधन:**\n• नियमित रक्त चढ़ाना\n• आयरन चेलेशन थेरेपी\n• फोलिक एसिड सप्लीमेंट\n• स्वस्थ आहार और जीवनशैली\n• नियमित चिकित्सा निगरानी\n\n**HopeLink मदद करता है:**\n• संगत दाताओं को खोजने में\n• रक्त चढ़ाने का समय निर्धारण\n• विशेषज्ञों से जुड़ने में\n• सामुदायिक सहायता\n\nक्या आप किसी विशिष्ट पहलू के बारे में जानकारी चाहते हैं?",
    }
    return responses[lang] || responses.en
  }

  const getHospitalResponse = (lang: string): string => {
    const responses: { [key: string]: string } = {
      en: "🏥 Hospital & Location Services:\n\nI can help you find:\n• Nearby hospitals with blood banks\n• Thalassemia treatment centers\n• Emergency medical facilities\n• Specialist doctors (Hematologists)\n• Blood donation centers\n\n**Features:**\n• Real-time blood availability\n• Turn-by-turn navigation\n• Hospital contact information\n• Emergency services\n• Appointment booking\n\nWould you like me to find hospitals near your current location?",
      hi: "🏥 अस्पताल और स्थान सेवाएं:\n\nमैं आपको खोजने में मदद कर सकता हूं:\n• ब्लड बैंक वाले नजदीकी अस्पताल\n• थैलेसीमिया उपचार केंद्र\n• आपातकालीन चिकित्सा सुविधाएं\n• विशेषज्ञ डॉक्टर (हेमेटोलॉजिस्ट)\n• रक्तदान केंद्र\n\n**सुविधाएं:**\n• वास्तविक समय रक्त उपलब्धता\n• मोड़-दर-मोड़ नेवीगेशन\n• अस्पताल संपर्क जानकारी\n• आपातकालीन सेवाएं\n• अपॉइंटमेंट बुकिंग\n\nक्या आप चाहते हैं कि मैं आपके वर्तमान स्थान के पास अस्पताल खोजूं?",
    }
    return responses[lang] || responses.en
  }

  const getSymptomResponse = (lang: string): string => {
    const responses: { [key: string]: string } = {
      en: "⚕️ Symptom Assessment:\n\n**Common Thalassemia symptoms:**\n• Fatigue and weakness\n• Pale skin or jaundice\n• Slow growth (in children)\n• Abdominal swelling\n• Dark urine\n• Bone deformities\n\n**⚠️ Important:**\nI can provide general information, but for proper diagnosis and treatment, please consult with a healthcare professional immediately.\n\n**When to seek immediate help:**\n• Severe fatigue or weakness\n• Difficulty breathing\n• Chest pain\n• High fever\n• Severe abdominal pain\n\nWould you like me to help you find a nearby hospital or specialist?",
      hi: "⚕️ लक्षण मूल्यांकन:\n\n**सामान्य थैलेसीमिया लक्षण:**\n• थकान और कमजोरी\n• पीली त्वचा या पीलिया\n• धीमी वृद्धि (बच्चों में)\n• पेट में सूजन\n• गहरे रंग का मूत्र\n• हड्डी की विकृति\n\n**⚠️ महत्वपूर्ण:**\nमैं सामान्य जानकारी प्रदान कर सकता हूं, लेकिन उचित निदान और उपचार के लिए, कृपया तुरंत किसी स्वास्थ्य पेशेवर से सलाह लें।\n\n**तत्काल मदद कब लें:**\n• गंभीर थकान या कमजोरी\n• सांस लेने में कठिनाई\n• सीने में दर्द\n• तेज बुखार\n• गंभीर पेट दर्द\n\nक्या आप चाहते हैं कि मैं आपको नजदीकी अस्पताल या विशेषज्ञ खोजने में मदद करूं?",
    }
    return responses[lang] || responses.en
  }

  const getDefaultResponse = (lang: string): string => {
    const responses: { [key: string]: string } = {
      en: "I'm here to help with your health and medical questions related to Thalassemia and blood disorders. I can assist with:\n\n🩺 Medical information\n🩸 Blood donation guidance\n🏥 Hospital locations\n🚨 Emergency assistance\n💊 Treatment information\n👥 Community support\n\nPlease let me know what specific information you're looking for, and I'll do my best to help you!",
      hi: "मैं थैलेसीमिया और रक्त विकारों से संबंधित आपके स्वास्थ्य और चिकित्सा प्रश्नों में मदद के लिए यहां हूं। मैं सहायता कर सकता हूं:\n\n🩺 चिकित्सा जानकारी\n🩸 रक्तदान मार्गदर्शन\n🏥 अस्पताल स्थान\n🚨 आपातकालीन सहायता\n💊 उपचार जानकारी\n👥 सामुदायिक सहायता\n\nकृपया मुझे बताएं कि आप किस विशिष्ट जानकारी की तलाश कर रहे हैं, और मैं आपकी मदद करने की पूरी कोशिश करूंगा!",
    }
    return responses[lang] || responses.en
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

    // Simulate AI processing time
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

      // Auto-speak bot response if speech is enabled
      if (isSpeaking) {
        speakText(botResponse)
      }
    }, 1500)
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      try {
        recognitionRef.current.start()
      } catch (error) {
        setIsListening(false)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = getLanguageCode(currentLanguage)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleSpeech = () => {
    if (isSpeaking) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
      setIsSpeaking(false)
    } else {
      setIsSpeaking(true)
    }
  }

  const openChat = () => {
    setIsOpen(true)
    setHasNewMessage(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  // Floating button when chat is closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          className={`h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            hasNewMessage ? "animate-bounce" : ""
          }`}
        >
          <div className="relative">
            <MessageCircle className="h-8 w-8 text-white" />
            {hasNewMessage && (
              <div className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        </Button>

        {hasNewMessage && (
          <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs border-l-4 border-blue-500 animate-slide-up">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-800">New message from AI Assistant</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Chat interface when open
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      <Card className="h-full shadow-2xl border-2 border-blue-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="relative">
                <Heart className="h-5 w-5 text-red-300" />
                <div className="absolute inset-0 animate-ping">
                  <Heart className="h-5 w-5 text-red-300 opacity-75" />
                </div>
              </div>
              <span className="text-sm font-semibold">HopeLink AI Assistant</span>
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={closeChat}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex items-center justify-between mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online
                </div>
              </Badge>
              <div className="flex items-center gap-2">
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="text-xs bg-white/20 text-white border border-white/30 rounded px-2 py-1 backdrop-blur-sm"
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
                  className={`text-white hover:bg-white/20 h-8 w-8 p-0 ${isSpeaking ? "bg-white/20" : ""}`}
                >
                  {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex-1 flex flex-col p-0 h-full">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-900 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === "bot" && (
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <Bot className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        )}
                        {message.sender === "user" && (
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl p-3 max-w-[85%] border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
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

            <div className="p-4 border-t bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      currentLanguage === "hi"
                        ? "अपना स्वास्थ्य प्रश्न टाइप करें..."
                        : currentLanguage === "mr"
                          ? "तुमचा आरोग्य प्रश्न टाइप करा..."
                          : "Type your health question..."
                    }
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    className={`h-8 w-8 p-0 ${isListening ? "text-red-600 bg-red-50" : "text-gray-500 hover:text-gray-700"}`}
                    disabled={!recognitionRef.current}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
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
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
