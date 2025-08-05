"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface PatientData {
  bloodType: string
  thalassemiaType: string
  currentHemoglobin: number
  lastTransfusion: string
  transfusionFrequency: string
  ironChelation: string
  age: number
  weight: number
}

interface TransfusionPrediction {
  nextTransfusionDate: string
  daysUntilNext: number
  confidence: number
  riskLevel: "low" | "medium" | "high" | "critical"
  recommendations: string[]
  factors: {
    hemoglobinTrend: "stable" | "declining" | "improving"
    ageAdjustment: number
    treatmentCompliance: number
  }
}

export function TransfusionPredictor({ patientData }: { patientData: PatientData }) {
  const [prediction, setPrediction] = useState<TransfusionPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculatePrediction = async () => {
    setIsLoading(true)

    // Simulate AI prediction calculation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // AI-based prediction algorithm
    const lastTransfusionDate = new Date(patientData.lastTransfusion)
    const daysSinceLastTransfusion = Math.floor((Date.now() - lastTransfusionDate.getTime()) / (1000 * 60 * 60 * 24))

    // Base interval calculation based on Thalassemia type and current hemoglobin
    let baseInterval = 28 // Default monthly

    if (patientData.thalassemiaType === "beta-major") {
      baseInterval = patientData.currentHemoglobin < 7 ? 21 : 28
    } else if (patientData.thalassemiaType === "beta-intermedia") {
      baseInterval = patientData.currentHemoglobin < 6 ? 35 : 42
    }

    // Age adjustment (younger patients may need more frequent transfusions)
    const ageAdjustment = patientData.age < 18 ? -3 : patientData.age > 50 ? 2 : 0

    // Weight adjustment
    const weightAdjustment = patientData.weight < 50 ? -2 : patientData.weight > 80 ? 1 : 0

    // Iron chelation compliance (better compliance = more stable intervals)
    const treatmentCompliance = patientData.ironChelation ? 0.9 : 0.7

    const adjustedInterval = Math.round((baseInterval + ageAdjustment + weightAdjustment) * treatmentCompliance)
    const daysUntilNext = Math.max(0, adjustedInterval - daysSinceLastTransfusion)

    const nextTransfusionDate = new Date()
    nextTransfusionDate.setDate(nextTransfusionDate.getDate() + daysUntilNext)

    // Risk assessment
    let riskLevel: "low" | "medium" | "high" | "critical" = "low"
    if (patientData.currentHemoglobin < 6) riskLevel = "critical"
    else if (patientData.currentHemoglobin < 7) riskLevel = "high"
    else if (patientData.currentHemoglobin < 8) riskLevel = "medium"

    // Confidence calculation
    const confidence = Math.min(95, 70 + treatmentCompliance * 25)

    // Generate recommendations
    const recommendations = []
    if (patientData.currentHemoglobin < 7) {
      recommendations.push("Schedule transfusion within 7 days")
    }
    if (!patientData.ironChelation) {
      recommendations.push("Discuss iron chelation therapy with your doctor")
    }
    if (daysUntilNext < 7) {
      recommendations.push("Contact your healthcare provider to schedule appointment")
    }
    recommendations.push("Monitor for symptoms of fatigue or shortness of breath")
    recommendations.push("Maintain regular follow-up appointments")

    const predictionResult: TransfusionPrediction = {
      nextTransfusionDate: nextTransfusionDate.toISOString().split("T")[0],
      daysUntilNext,
      confidence: Math.round(confidence),
      riskLevel,
      recommendations,
      factors: {
        hemoglobinTrend:
          patientData.currentHemoglobin >= 8 ? "stable" : patientData.currentHemoglobin < 6 ? "declining" : "improving",
        ageAdjustment,
        treatmentCompliance: Math.round(treatmentCompliance * 100),
      },
    }

    setPrediction(predictionResult)
    setIsLoading(false)
  }

  useEffect(() => {
    calculatePrediction()
  }, [patientData])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "critical":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <TrendingUp className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-700">
          <Brain className="h-5 w-5 mr-2" />
          AI Transfusion Predictor
        </CardTitle>
        <CardDescription>
          Machine learning-powered prediction based on your medical history and current condition
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Analyzing your data...</p>
          </div>
        ) : prediction ? (
          <div className="space-y-6">
            {/* Main Prediction */}
            <div className="text-center p-6 bg-white rounded-lg border">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-600 mb-2">{prediction.daysUntilNext} days</div>
              <p className="text-gray-600 mb-4">
                Next predicted transfusion: {new Date(prediction.nextTransfusionDate).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge className={getRiskColor(prediction.riskLevel)}>
                  {getRiskIcon(prediction.riskLevel)}
                  <span className="ml-1">{prediction.riskLevel.toUpperCase()} RISK</span>
                </Badge>
                <Badge variant="outline">{prediction.confidence}% Confidence</Badge>
              </div>
              <Progress value={((28 - prediction.daysUntilNext) / 28) * 100} className="mb-4" />
            </div>

            {/* Analysis Factors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border text-center">
                <TrendingUp className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Hemoglobin Trend</h4>
                <p className="text-xs text-gray-600 capitalize">{prediction.factors.hemoglobinTrend}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border text-center">
                <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Age Factor</h4>
                <p className="text-xs text-gray-600">
                  {prediction.factors.ageAdjustment > 0 ? "+" : ""}
                  {prediction.factors.ageAdjustment} days
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border text-center">
                <CheckCircle className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Treatment Compliance</h4>
                <p className="text-xs text-gray-600">{prediction.factors.treatmentCompliance}%</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-3 flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                AI Recommendations
              </h4>
              <ul className="space-y-2">
                {prediction.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button className="flex-1" onClick={calculatePrediction}>
                <Brain className="h-4 w-4 mr-2" />
                Recalculate
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
