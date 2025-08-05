"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Heart,
  Activity,
  Calendar,
  Bell,
  Droplets,
  Shield,
  TrendingUp,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react"
import { PatientProfileForm } from "@/components/forms/patient-profile-form"
import { EnhancedTransfusionPredictor } from "@/components/ai-features/enhanced-transfusion-predictor"
import { HospitalMap } from "@/components/maps/hospital-map"
import { LocationTracker } from "@/components/location/location-tracker"
import { EnhancedChatbot } from "@/components/ai-features/enhanced-chatbot"

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [profileComplete, setProfileComplete] = useState(65)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>()

  // Mock patient data
  const patientData = {
    name: "John Doe",
    bloodType: "A+",
    age: 45,
    lastCheckup: "2024-01-15",
    riskLevel: "moderate",
    upcomingAppointments: 2,
    healthScore: 78,
    emergencyContacts: 2,
  }

  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", status: "normal", icon: Heart },
    { label: "Hemoglobin", value: "13.5 g/dL", status: "normal", icon: Droplets },
    { label: "Heart Rate", value: "72 bpm", status: "normal", icon: Activity },
    { label: "BMI", value: "24.1", status: "normal", icon: TrendingUp },
  ]

  const recentActivity = [
    { date: "2024-01-15", activity: "Health checkup completed", type: "checkup" },
    { date: "2024-01-10", activity: "Blood test results received", type: "results" },
    { date: "2024-01-05", activity: "Emergency contact updated", type: "profile" },
    { date: "2023-12-28", activity: "Transfusion risk assessment", type: "assessment" },
  ]

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {patientData.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Blood Type</p>
                      <p className="text-2xl font-bold text-gray-900">{patientData.bloodType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Health Score</p>
                      <p className="text-2xl font-bold text-gray-900">{patientData.healthScore}/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Appointments</p>
                      <p className="text-2xl font-bold text-gray-900">{patientData.upcomingAppointments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Risk Level</p>
                      <Badge variant={patientData.riskLevel === "low" ? "default" : "secondary"}>
                        {patientData.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Complete your profile to get better predictions</span>
                    <span className="text-sm text-gray-600">{profileComplete}%</span>
                  </div>
                  <Progress value={profileComplete} className="w-full" />
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("profile")}>
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Health Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {healthMetrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <Icon className="h-5 w-5 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                        <Badge variant={metric.status === "normal" ? "default" : "destructive"} className="mt-1">
                          {metric.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.activity}</p>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <PatientProfileForm />
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Monitoring</CardTitle>
                <p className="text-gray-600">Track your health metrics and get personalized insights</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Vital Signs</h3>
                    {healthMetrics.map((metric, index) => {
                      const Icon = metric.icon
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center">
                            <Icon className="h-5 w-5 text-gray-600 mr-3" />
                            <span>{metric.label}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{metric.value}</p>
                            <Badge variant={metric.status === "normal" ? "default" : "destructive"} className="text-xs">
                              {metric.status}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Health Trends</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Health trends chart would go here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hospitals">
            <div className="space-y-6">
              <LocationTracker onLocationUpdate={handleLocationUpdate} />
              <HospitalMap userLocation={userLocation} requiredBloodType={patientData.bloodType} />
            </div>
          </TabsContent>

          <TabsContent value="ai-tools">
            <EnhancedTransfusionPredictor />
          </TabsContent>

          <TabsContent value="support">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    AI Health Assistant
                  </CardTitle>
                  <p className="text-gray-600">Get instant answers to your health questions</p>
                </CardHeader>
                <CardContent>
                  <EnhancedChatbot />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Emergency Services</p>
                        <p className="text-sm text-gray-600">24/7 Emergency Response</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call 911
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">HopeLink Support</p>
                        <p className="text-sm text-gray-600">Technical and medical support</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
