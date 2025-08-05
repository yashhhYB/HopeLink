"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  TrendingUp,
  Users,
  Building2,
  Heart,
  AlertTriangle,
  MapPin,
  Calendar,
  Award,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BloodDemandForecast } from "@/components/ai-features/blood-demand-forecast"

export default function AdminDashboard() {
  const [selectedRegion, setSelectedRegion] = useState("mumbai")
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("hopelink_user")
    if (!user) {
      router.push("/auth/login")
    }
  }, [])

  const systemStats = {
    totalPatients: 2847,
    totalDonors: 15632,
    totalHospitals: 89,
    totalTransfusions: 1247,
    activeRequests: 23,
    criticalShortages: 7,
  }

  const regionalData = {
    mumbai: { patients: 1200, donors: 6500, hospitals: 35, demand: 85 },
    delhi: { patients: 980, donors: 5200, hospitals: 28, demand: 78 },
    bangalore: { patients: 667, donors: 3932, hospitals: 26, demand: 92 },
  }

  const predictiveInsights = [
    {
      region: "Mumbai",
      bloodType: "O+",
      currentStock: 45,
      predictedDemand: 78,
      shortage: 33,
      timeframe: "7 days",
      severity: "high",
    },
    {
      region: "Delhi",
      bloodType: "B+",
      currentStock: 23,
      predictedDemand: 35,
      shortage: 12,
      timeframe: "14 days",
      severity: "medium",
    },
    {
      region: "Bangalore",
      bloodType: "A-",
      currentStock: 8,
      predictedDemand: 25,
      shortage: 17,
      timeframe: "10 days",
      severity: "critical",
    },
  ]

  const topDonors = [
    { name: "Rajesh Kumar", donations: 45, region: "Mumbai", points: 9000, badge: "Platinum" },
    { name: "Priya Sharma", donations: 38, region: "Delhi", points: 7600, badge: "Gold" },
    { name: "Amit Singh", donations: 32, region: "Bangalore", points: 6400, badge: "Gold" },
    { name: "Neha Gupta", donations: 28, region: "Mumbai", points: 5600, badge: "Silver" },
    { name: "Vikram Joshi", donations: 25, region: "Delhi", points: 5000, badge: "Silver" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Platinum":
        return "bg-purple-100 text-purple-700"
      case "Gold":
        return "bg-yellow-100 text-yellow-700"
      case "Silver":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold">HopeLink Admin</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-purple-100 text-purple-700">
                System Administrator
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">SA</span>
                </div>
                <span className="text-sm font-medium">System Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Administration</h1>
          <p className="text-gray-600">Monitor platform performance, analytics, and manage system-wide operations</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-blue-600">{systemStats.totalPatients.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">Patients</p>
                </CardContent>
              </Card>
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-green-600">{systemStats.totalDonors.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">Donors</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4 text-center">
                  <Building2 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-purple-600">{systemStats.totalHospitals}</div>
                  <p className="text-xs text-gray-600">Hospitals</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-orange-600">
                    {systemStats.totalTransfusions.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600">Transfusions</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-yellow-600">{systemStats.activeRequests}</div>
                  <p className="text-xs text-gray-600">Active Requests</p>
                </CardContent>
              </Card>
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-red-600">{systemStats.criticalShortages}</div>
                  <p className="text-xs text-gray-600">Critical Alerts</p>
                </CardContent>
              </Card>
            </div>

            {/* Regional Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Regional Overview
                </CardTitle>
                <CardDescription>System performance across major cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(regionalData).map(([city, data]) => (
                    <div key={city} className="p-4 border rounded-lg hover:bg-gray-50">
                      <h3 className="font-semibold text-lg capitalize mb-3">{city}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Patients:</span>
                          <span className="font-semibold">{data.patients.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Donors:</span>
                          <span className="font-semibold">{data.donors.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Hospitals:</span>
                          <span className="font-semibold">{data.hospitals}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Demand:</span>
                          <span className="font-semibold">{data.demand}%</span>
                        </div>
                        <Progress value={data.demand} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Predictive Blood Shortage Analysis
                </CardTitle>
                <CardDescription>AI-powered forecasting for next 30-90 days</CardDescription>
              </CardHeader>
              <CardContent>
                <BloodDemandForecast />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Donors Leaderboard
                </CardTitle>
                <CardDescription>Recognize and reward our blood heroes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDonors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{donor.name}</h4>
                          <p className="text-sm text-gray-600">{donor.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getBadgeColor(donor.badge)}>{donor.badge}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {donor.donations} donations • {donor.points} points
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Send Message
                        </Button>
                        <Button size="sm">Award Badge</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Chart: Monthly donation trends</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Blood Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Chart: Blood type availability</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reward Management</CardTitle>
                <CardDescription>Manage badges, certificates, and NFT rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col">
                    <Award className="h-6 w-6 mb-2" />
                    Create Badge
                  </Button>
                  <Button className="h-20 flex-col bg-transparent" variant="outline">
                    <Heart className="h-6 w-6 mb-2" />
                    Send Appreciation
                  </Button>
                  <Button className="h-20 flex-col bg-transparent" variant="outline">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Mint NFT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
