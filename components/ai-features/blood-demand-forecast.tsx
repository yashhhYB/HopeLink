"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Calendar, MapPin } from "lucide-react"

interface ForecastData {
  region: string
  bloodType: string
  currentStock: number
  predictedDemand: number
  forecastPeriod: string
  trend: "increasing" | "decreasing" | "stable"
  confidence: number
  factors: string[]
  recommendations: string[]
}

interface RegionForecast {
  regionName: string
  forecasts: ForecastData[]
  overallRisk: "low" | "medium" | "high"
}

export function BloodDemandForecast() {
  const [selectedRegion, setSelectedRegion] = useState("mumbai")
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [forecast, setForecast] = useState<RegionForecast | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const regions = [
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
  ]

  const periods = [
    { value: "30", label: "Next 30 Days" },
    { value: "60", label: "Next 60 Days" },
    { value: "90", label: "Next 90 Days" },
  ]

  const generateForecast = async () => {
    setIsLoading(true)

    // Simulate AI forecasting
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // AI-powered demand forecasting algorithm
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    const forecasts: ForecastData[] = []

    bloodTypes.forEach((bloodType) => {
      // Base demand calculation
      let baseDemand = Math.floor(Math.random() * 100) + 50

      // Seasonal adjustments
      const currentMonth = new Date().getMonth()
      if (currentMonth >= 10 || currentMonth <= 2) {
        // Winter months
        baseDemand *= 1.2 // Higher demand in winter
      }

      // Regional adjustments
      const regionMultipliers: Record<string, number> = {
        mumbai: 1.3,
        delhi: 1.2,
        bangalore: 1.1,
        chennai: 1.0,
        kolkata: 0.9,
      }

      baseDemand *= regionMultipliers[selectedRegion] || 1.0

      // Blood type specific adjustments
      const bloodTypeMultipliers: Record<string, number> = {
        "O+": 1.4,
        "A+": 1.2,
        "B+": 1.1,
        "AB+": 0.8,
        "O-": 0.7,
        "A-": 0.6,
        "B-": 0.5,
        "AB-": 0.4,
      }

      baseDemand *= bloodTypeMultipliers[bloodType] || 1.0

      // Current stock simulation
      const currentStock = Math.floor(Math.random() * 80) + 20

      // Trend calculation
      const trendValue = Math.random()
      let trend: "increasing" | "decreasing" | "stable" = "stable"
      if (trendValue > 0.6) trend = "increasing"
      else if (trendValue < 0.4) trend = "decreasing"

      // Adjust demand based on trend
      if (trend === "increasing") baseDemand *= 1.15
      else if (trend === "decreasing") baseDemand *= 0.85

      // Factors affecting demand
      const factors = []
      if (currentMonth >= 10 || currentMonth <= 2) factors.push("Winter season increase")
      if (selectedRegion === "mumbai") factors.push("High population density")
      if (bloodType.includes("O")) factors.push("Universal donor demand")
      if (trend === "increasing") factors.push("Rising healthcare utilization")

      // Generate recommendations
      const recommendations = []
      const shortage = Math.max(0, baseDemand - currentStock)

      if (shortage > 50) {
        recommendations.push("Urgent: Organize multiple donation drives")
        recommendations.push("Contact neighboring regions for support")
      } else if (shortage > 20) {
        recommendations.push("Schedule donation campaigns")
        recommendations.push("Alert regular donors")
      } else if (shortage > 0) {
        recommendations.push("Monitor stock levels closely")
        recommendations.push("Prepare contingency plans")
      } else {
        recommendations.push("Maintain current stock levels")
      }

      forecasts.push({
        region: selectedRegion,
        bloodType,
        currentStock,
        predictedDemand: Math.round(baseDemand),
        forecastPeriod: `${selectedPeriod} days`,
        trend,
        confidence: Math.floor(Math.random() * 20) + 75, // 75-95% confidence
        factors,
        recommendations,
      })
    })

    // Calculate overall risk
    const totalShortage = forecasts.reduce((sum, f) => sum + Math.max(0, f.predictedDemand - f.currentStock), 0)
    let overallRisk: "low" | "medium" | "high" = "low"

    if (totalShortage > 200) overallRisk = "high"
    else if (totalShortage > 100) overallRisk = "medium"

    setForecast({
      regionName: regions.find((r) => r.value === selectedRegion)?.label || selectedRegion,
      forecasts: forecasts.sort((a, b) => b.predictedDemand - b.currentStock - (a.predictedDemand - a.currentStock)),
      overallRisk,
    })

    setIsLoading(false)
  }

  useEffect(() => {
    generateForecast()
  }, [selectedRegion, selectedPeriod])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-600" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center text-orange-700">
          <BarChart3 className="h-5 w-5 mr-2" />
          AI Blood Demand Forecasting
        </CardTitle>
        <CardDescription>Predictive analytics for blood supply planning and shortage prevention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {region.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Forecast Period</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {period.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Analyzing demand patterns...</p>
          </div>
        ) : forecast ? (
          <div className="space-y-6">
            {/* Overall Risk Assessment */}
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Overall Risk Assessment - {forecast.regionName}</h4>
                <Badge variant={getRiskColor(forecast.overallRisk)}>{forecast.overallRisk.toUpperCase()} RISK</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {forecast.forecasts.reduce((sum, f) => sum + f.currentStock, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Current Total Stock</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {forecast.forecasts.reduce((sum, f) => sum + f.predictedDemand, 0)}
                  </div>
                  <p className="text-sm text-gray-600">Predicted Demand</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {forecast.forecasts.reduce((sum, f) => sum + Math.max(0, f.predictedDemand - f.currentStock), 0)}
                  </div>
                  <p className="text-sm text-gray-600">Projected Shortage</p>
                </div>
              </div>
            </div>

            {/* Blood Type Forecasts */}
            <div className="space-y-4">
              <h4 className="font-semibold">Blood Type Forecasts</h4>
              {forecast.forecasts.map((item, index) => {
                const shortage = Math.max(0, item.predictedDemand - item.currentStock)
                const isShortage = shortage > 0

                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${isShortage ? "border-red-200 bg-red-50" : "bg-white"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-bold">
                          {item.bloodType}
                        </Badge>
                        {getTrendIcon(item.trend)}
                        <span className="text-sm text-gray-600 capitalize">{item.trend}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Confidence: {item.confidence}%</div>
                        {isShortage && (
                          <Badge variant="destructive" className="mt-1">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Shortage: {shortage} units
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Current Stock:</span>
                        <span className="font-semibold ml-2">{item.currentStock} units</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Predicted Demand:</span>
                        <span className="font-semibold ml-2">{item.predictedDemand} units</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Period:</span>
                        <span className="font-semibold ml-2">{item.forecastPeriod}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Trend:</span>
                        <span className="font-semibold ml-2 capitalize">{item.trend}</span>
                      </div>
                    </div>

                    {item.factors.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm font-medium">Key Factors: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.factors.map((factor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.recommendations.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">Recommendations:</span>
                        <ul className="mt-1 space-y-1">
                          {item.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm flex items-start">
                              <span className="text-orange-600 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex gap-2">
              <Button onClick={generateForecast} variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Refresh Forecast
              </Button>
              <Button>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Create Action Plan
              </Button>
              <Button variant="outline">Export Report</Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
