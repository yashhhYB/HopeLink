"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Activity, Brain, Heart, TrendingUp, AlertTriangle, CheckCircle, Clock, Droplets } from "lucide-react"

interface PredictionData {
  age: string
  gender: string
  bloodType: string
  hemoglobin: string
  hematocrit: string
  plateletCount: string
  surgeryType: string
  medicalCondition: string
  currentMedications: string
  previousTransfusions: string
  bodyWeight: string
  surgeryDuration: string
}

interface PredictionResult {
  riskLevel: "low" | "moderate" | "high" | "critical"
  probability: number
  unitsNeeded: number
  timeframe: string
  riskFactors: string[]
  recommendations: string[]
  confidence: number
}

const initialData: PredictionData = {
  age: "",
  gender: "",
  bloodType: "",
  hemoglobin: "",
  hematocrit: "",
  plateletCount: "",
  surgeryType: "",
  medicalCondition: "",
  currentMedications: "",
  previousTransfusions: "",
  bodyWeight: "",
  surgeryDuration: "",
}

export function EnhancedTransfusionPredictor() {
  const [formData, setFormData] = useState<PredictionData>(initialData)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const updateFormData = (field: keyof PredictionData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculatePrediction = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock AI prediction logic
    const age = Number.parseInt(formData.age) || 0
    const hemoglobin = Number.parseFloat(formData.hemoglobin) || 0
    const hematocrit = Number.parseFloat(formData.hematocrit) || 0
    const platelets = Number.parseInt(formData.plateletCount) || 0
    const weight = Number.parseFloat(formData.bodyWeight) || 0

    // Risk calculation based on multiple factors
    let riskScore = 0
    const riskFactors: string[] = []
    const recommendations: string[] = []

    // Age factor
    if (age > 65) {
      riskScore += 20
      riskFactors.push("Advanced age (>65)")
    } else if (age < 18) {
      riskScore += 15
      riskFactors.push("Pediatric patient")
    }

    // Hemoglobin levels
    if (hemoglobin < 8) {
      riskScore += 40
      riskFactors.push("Severe anemia (Hb < 8 g/dL)")
      recommendations.push("Immediate blood typing and crossmatching")
    } else if (hemoglobin < 10) {
      riskScore += 25
      riskFactors.push("Moderate anemia (Hb < 10 g/dL)")
    }

    // Hematocrit levels
    if (hematocrit < 24) {
      riskScore += 30
      riskFactors.push("Low hematocrit (<24%)")
    }

    // Platelet count
    if (platelets < 50000) {
      riskScore += 35
      riskFactors.push("Severe thrombocytopenia")
      recommendations.push("Consider platelet transfusion")
    } else if (platelets < 100000) {
      riskScore += 20
      riskFactors.push("Mild thrombocytopenia")
    }

    // Surgery type
    if (formData.surgeryType === "cardiac" || formData.surgeryType === "major-orthopedic") {
      riskScore += 30
      riskFactors.push("High-risk surgery type")
    } else if (formData.surgeryType === "abdominal" || formData.surgeryType === "vascular") {
      riskScore += 20
      riskFactors.push("Moderate-risk surgery")
    }

    // Medical conditions
    if (formData.medicalCondition === "bleeding-disorder") {
      riskScore += 40
      riskFactors.push("Known bleeding disorder")
      recommendations.push("Hematology consultation recommended")
    } else if (formData.medicalCondition === "kidney-disease") {
      riskScore += 25
      riskFactors.push("Chronic kidney disease")
    }

    // Previous transfusions
    if (formData.previousTransfusions === "multiple") {
      riskScore += 15
      riskFactors.push("Multiple previous transfusions")
      recommendations.push("Extended crossmatching may be required")
    }

    // Body weight
    if (weight < 50) {
      riskScore += 10
      riskFactors.push("Low body weight")
    }

    // Surgery duration
    if (formData.surgeryDuration === "long") {
      riskScore += 15
      riskFactors.push("Extended surgery duration")
    }

    // Determine risk level and probability
    let riskLevel: "low" | "moderate" | "high" | "critical"
    let probability: number
    let unitsNeeded: number

    if (riskScore >= 80) {
      riskLevel = "critical"
      probability = Math.min(95, 70 + (riskScore - 80) * 0.5)
      unitsNeeded = Math.ceil(4 + (riskScore - 80) * 0.1)
    } else if (riskScore >= 50) {
      riskLevel = "high"
      probability = 40 + (riskScore - 50) * 1.0
      unitsNeeded = Math.ceil(2 + (riskScore - 50) * 0.067)
    } else if (riskScore >= 25) {
      riskLevel = "moderate"
      probability = 15 + (riskScore - 25) * 1.0
      unitsNeeded = Math.ceil(1 + (riskScore - 25) * 0.04)
    } else {
      riskLevel = "low"
      probability = Math.max(5, riskScore * 0.6)
      unitsNeeded = riskScore > 15 ? 1 : 0
    }

    // Add general recommendations
    if (riskLevel === "critical") {
      recommendations.push("Immediate blood bank notification")
      recommendations.push("Consider pre-operative transfusion")
      recommendations.push("ICU monitoring post-operatively")
    } else if (riskLevel === "high") {
      recommendations.push("Type and crossmatch 4-6 units")
      recommendations.push("Blood bank standby notification")
    } else if (riskLevel === "moderate") {
      recommendations.push("Type and screen")
      recommendations.push("Blood bank awareness")
    } else {
      recommendations.push("Standard pre-operative workup")
    }

    const result: PredictionResult = {
      riskLevel,
      probability: Math.round(probability),
      unitsNeeded,
      timeframe: riskLevel === "critical" ? "Immediate" : riskLevel === "high" ? "Within 2 hours" : "Within 24 hours",
      riskFactors,
      recommendations,
      confidence: Math.round(85 + Math.random() * 10), // Simulated confidence score
    }

    setPrediction(result)
    setIsAnalyzing(false)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-700 bg-green-100 border-green-300"
      case "moderate":
        return "text-yellow-700 bg-yellow-100 border-yellow-300"
      case "high":
        return "text-orange-700 bg-orange-100 border-orange-300"
      case "critical":
        return "text-red-700 bg-red-100 border-red-300"
      default:
        return "text-gray-700 bg-gray-100 border-gray-300"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-5 w-5" />
      case "moderate":
        return <Clock className="h-5 w-5" />
      case "high":
        return <AlertTriangle className="h-5 w-5" />
      case "critical":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Brain className="h-6 w-6 mr-2" />
            AI-Powered Transfusion Predictor
          </CardTitle>
          <p className="text-gray-600">Advanced machine learning analysis to predict blood transfusion requirements</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                  placeholder="Years"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => updateFormData("bloodType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bodyWeight">Body Weight (kg)</Label>
                <Input
                  id="bodyWeight"
                  type="number"
                  value={formData.bodyWeight}
                  onChange={(e) => updateFormData("bodyWeight", e.target.value)}
                  placeholder="kg"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                <Input
                  id="hemoglobin"
                  type="number"
                  step="0.1"
                  value={formData.hemoglobin}
                  onChange={(e) => updateFormData("hemoglobin", e.target.value)}
                  placeholder="g/dL"
                />
              </div>
              <div>
                <Label htmlFor="hematocrit">Hematocrit (%)</Label>
                <Input
                  id="hematocrit"
                  type="number"
                  step="0.1"
                  value={formData.hematocrit}
                  onChange={(e) => updateFormData("hematocrit", e.target.value)}
                  placeholder="%"
                />
              </div>
              <div>
                <Label htmlFor="plateletCount">Platelets (/μL)</Label>
                <Input
                  id="plateletCount"
                  type="number"
                  value={formData.plateletCount}
                  onChange={(e) => updateFormData("plateletCount", e.target.value)}
                  placeholder="/μL"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="surgeryType">Surgery Type</Label>
              <Select value={formData.surgeryType} onValueChange={(value) => updateFormData("surgeryType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select surgery type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiac">Cardiac Surgery</SelectItem>
                  <SelectItem value="major-orthopedic">Major Orthopedic</SelectItem>
                  <SelectItem value="abdominal">Abdominal Surgery</SelectItem>
                  <SelectItem value="vascular">Vascular Surgery</SelectItem>
                  <SelectItem value="neurosurgery">Neurosurgery</SelectItem>
                  <SelectItem value="minor">Minor Surgery</SelectItem>
                  <SelectItem value="emergency">Emergency Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="medicalCondition">Primary Medical Condition</Label>
              <Select
                value={formData.medicalCondition}
                onValueChange={(value) => updateFormData("medicalCondition", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="bleeding-disorder">Bleeding Disorder</SelectItem>
                  <SelectItem value="kidney-disease">Kidney Disease</SelectItem>
                  <SelectItem value="liver-disease">Liver Disease</SelectItem>
                  <SelectItem value="heart-disease">Heart Disease</SelectItem>
                  <SelectItem value="cancer">Cancer</SelectItem>
                  <SelectItem value="anemia">Chronic Anemia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousTransfusions">Previous Transfusions</Label>
                <Select
                  value={formData.previousTransfusions}
                  onValueChange={(value) => updateFormData("previousTransfusions", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select history" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="multiple">Multiple</SelectItem>
                    <SelectItem value="recent">Recent (within 3 months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="surgeryDuration">Expected Surgery Duration</Label>
                <Select
                  value={formData.surgeryDuration}
                  onValueChange={(value) => updateFormData("surgeryDuration", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (&lt; 2 hours)</SelectItem>
                    <SelectItem value="medium">Medium (2-4 hours)</SelectItem>
                    <SelectItem value="long">Long (&gt; 4 hours)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={calculatePrediction}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isAnalyzing || !formData.age || !formData.hemoglobin}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Transfusion Risk
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">AI is analyzing patient data...</p>
                <Progress value={33} className="w-full mt-4" />
              </div>
            ) : prediction ? (
              <div className="space-y-6">
                {/* Risk Level */}
                <Alert className={`border-2 ${getRiskColor(prediction.riskLevel)}`}>
                  <div className="flex items-center">
                    {getRiskIcon(prediction.riskLevel)}
                    <AlertDescription className="ml-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-lg">{prediction.riskLevel.toUpperCase()} RISK</strong>
                          <p className="text-sm mt-1">
                            {prediction.probability}% probability of transfusion requirement
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                    </AlertDescription>
                  </div>
                </Alert>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Droplets className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600">{prediction.unitsNeeded}</div>
                      <p className="text-sm text-gray-600">Units Predicted</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg font-bold text-blue-600">{prediction.timeframe}</div>
                      <p className="text-sm text-gray-600">Timeframe</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Risk Factors */}
                {prediction.riskFactors.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Risk Factors Identified
                    </h4>
                    <div className="space-y-2">
                      {prediction.riskFactors.map((factor, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 bg-orange-50 rounded border border-orange-200"
                        >
                          <AlertTriangle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0" />
                          <span className="text-sm text-orange-800">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Heart className="h-4 w-4 mr-2" />
                    Clinical Recommendations
                  </h4>
                  <div className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center p-2 bg-blue-50 rounded border border-blue-200">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter patient information to generate AI prediction</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
