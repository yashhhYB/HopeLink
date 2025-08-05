"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DnaIcon as DNA, Users, AlertTriangle, CheckCircle, Brain } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: { value: string; label: string; risk: number }[]
  category: "family" | "ethnicity" | "symptoms" | "medical"
}

interface RiskAssessment {
  overallRisk: "low" | "moderate" | "high" | "very-high"
  riskScore: number
  recommendations: string[]
  categories: {
    familyHistory: number
    ethnicity: number
    symptoms: number
    medical: number
  }
}

export function GeneticRiskQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Do you have any family members diagnosed with Thalassemia?",
      category: "family",
      options: [
        { value: "none", label: "No family history", risk: 0 },
        { value: "distant", label: "Distant relatives (cousins, etc.)", risk: 2 },
        { value: "close", label: "Close relatives (siblings, parents)", risk: 8 },
        { value: "multiple", label: "Multiple family members", risk: 12 },
      ],
    },
    {
      id: 2,
      question: "What is your ethnic background?",
      category: "ethnicity",
      options: [
        { value: "low-risk", label: "Northern European, African", risk: 1 },
        { value: "moderate", label: "Southern European, Middle Eastern", risk: 4 },
        { value: "high-risk", label: "Mediterranean, South Asian", risk: 8 },
        { value: "very-high", label: "Southeast Asian, Chinese", risk: 10 },
      ],
    },
    {
      id: 3,
      question: "Do you experience chronic fatigue or weakness?",
      category: "symptoms",
      options: [
        { value: "never", label: "Never", risk: 0 },
        { value: "rarely", label: "Rarely", risk: 1 },
        { value: "sometimes", label: "Sometimes", risk: 3 },
        { value: "frequently", label: "Frequently", risk: 6 },
      ],
    },
    {
      id: 4,
      question: "Have you been diagnosed with anemia?",
      category: "medical",
      options: [
        { value: "no", label: "No", risk: 0 },
        { value: "mild", label: "Mild anemia", risk: 3 },
        { value: "moderate", label: "Moderate anemia", risk: 6 },
        { value: "severe", label: "Severe anemia", risk: 10 },
      ],
    },
    {
      id: 5,
      question: "Do you have enlarged spleen or liver?",
      category: "medical",
      options: [
        { value: "no", label: "No", risk: 0 },
        { value: "suspected", label: "Suspected/unclear", risk: 2 },
        { value: "mild", label: "Mild enlargement", risk: 5 },
        { value: "significant", label: "Significant enlargement", risk: 8 },
      ],
    },
    {
      id: 6,
      question: "Are you planning to have children?",
      category: "family",
      options: [
        { value: "no", label: "No", risk: 0 },
        { value: "maybe", label: "Maybe in the future", risk: 1 },
        { value: "yes", label: "Yes, planning soon", risk: 2 },
        { value: "pregnant", label: "Currently pregnant/partner pregnant", risk: 3 },
      ],
    },
  ]

  const calculateRisk = () => {
    let totalRisk = 0
    const categoryRisks = {
      familyHistory: 0,
      ethnicity: 0,
      symptoms: 0,
      medical: 0,
    }

    questions.forEach((question) => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find((opt) => opt.value === answer)
        if (option) {
          totalRisk += option.risk
          categoryRisks[question.category] += option.risk
        }
      }
    })

    let overallRisk: "low" | "moderate" | "high" | "very-high" = "low"
    if (totalRisk >= 25) overallRisk = "very-high"
    else if (totalRisk >= 15) overallRisk = "high"
    else if (totalRisk >= 8) overallRisk = "moderate"

    const recommendations = []

    if (overallRisk === "very-high") {
      recommendations.push("Immediate genetic counseling recommended")
      recommendations.push("Blood test for Thalassemia screening")
      recommendations.push("Partner screening if planning pregnancy")
    } else if (overallRisk === "high") {
      recommendations.push("Genetic counseling recommended")
      recommendations.push("Consider Thalassemia screening")
      recommendations.push("Discuss with healthcare provider")
    } else if (overallRisk === "moderate") {
      recommendations.push("Monitor symptoms closely")
      recommendations.push("Annual blood work recommended")
      recommendations.push("Consider screening if symptoms worsen")
    } else {
      recommendations.push("Continue regular health checkups")
      recommendations.push("Stay informed about Thalassemia")
      recommendations.push("Maintain healthy lifestyle")
    }

    if (categoryRisks.familyHistory > 5) {
      recommendations.push("Family genetic counseling advised")
    }

    setRiskAssessment({
      overallRisk,
      riskScore: totalRisk,
      recommendations,
      categories: categoryRisks,
    })
    setShowResults(true)
  }

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value })

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateRisk()
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setRiskAssessment(null)
    setIsStarted(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "very-high":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="h-5 w-5" />
      case "moderate":
        return <AlertTriangle className="h-5 w-5" />
      case "high":
        return <AlertTriangle className="h-5 w-5" />
      case "very-high":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <CheckCircle className="h-5 w-5" />
    }
  }

  if (!isStarted) {
    return (
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <DNA className="h-5 w-5 mr-2" />
            Genetic Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <DNA className="h-16 w-16 text-purple-600 mx-auto" />
            <div>
              <h3 className="font-semibold mb-2">Thalassemia Risk Quiz</h3>
              <p className="text-sm text-gray-600 mb-4">
                Take our AI-powered assessment to understand your genetic risk for Thalassemia
              </p>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• 6 questions about family history and symptoms</p>
              <p>• Personalized risk assessment</p>
              <p>• Genetic counseling recommendations</p>
            </div>
            <Button onClick={() => setIsStarted(true)} className="w-full">
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showResults && riskAssessment) {
    return (
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-700">
            <Brain className="h-5 w-5 mr-2" />
            Your Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Risk */}
          <div className="text-center p-6 bg-white rounded-lg border">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full border ${getRiskColor(riskAssessment.overallRisk)} mb-4`}
            >
              {getRiskIcon(riskAssessment.overallRisk)}
              <span className="ml-2 font-semibold">
                {riskAssessment.overallRisk.toUpperCase().replace("-", " ")} RISK
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">Risk Score: {riskAssessment.riskScore}/30</div>
            <Progress value={(riskAssessment.riskScore / 30) * 100} className="mb-4" />
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded border text-center">
              <Users className="h-5 w-5 text-gray-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">Family History</div>
              <div className="text-xs text-gray-600">{riskAssessment.categories.familyHistory}/15</div>
            </div>
            <div className="p-3 bg-white rounded border text-center">
              <DNA className="h-5 w-5 text-gray-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">Ethnicity</div>
              <div className="text-xs text-gray-600">{riskAssessment.categories.ethnicity}/10</div>
            </div>
            <div className="p-3 bg-white rounded border text-center">
              <AlertTriangle className="h-5 w-5 text-gray-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">Symptoms</div>
              <div className="text-xs text-gray-600">{riskAssessment.categories.symptoms}/6</div>
            </div>
            <div className="p-3 bg-white rounded border text-center">
              <CheckCircle className="h-5 w-5 text-gray-600 mx-auto mb-1" />
              <div className="text-sm font-semibold">Medical</div>
              <div className="text-xs text-gray-600">{riskAssessment.categories.medical}/18</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-semibold mb-3 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Personalized Recommendations
            </h4>
            <ul className="space-y-2">
              {riskAssessment.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={resetQuiz} variant="outline" className="flex-1 bg-transparent">
              Retake Quiz
            </Button>
            <Button className="flex-1">Find Genetic Counselor</Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded border">
            <strong>Disclaimer:</strong> This assessment is for educational purposes only and does not replace
            professional medical advice. Please consult with a healthcare provider or genetic counselor for proper
            evaluation.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-700">
          <div className="flex items-center">
            <DNA className="h-5 w-5 mr-2" />
            Genetic Risk Quiz
          </div>
          <Badge variant="outline">
            {currentQuestion + 1}/{questions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} />
        </div>

        {/* Question */}
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto p-3 bg-transparent"
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button variant="outline" onClick={resetQuiz}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
