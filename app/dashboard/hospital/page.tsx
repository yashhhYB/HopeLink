"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Building2, Droplets, AlertTriangle, Users, Calendar, TrendingUp, Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HospitalDashboard() {
  const [bloodInventory, setBloodInventory] = useState({
    "A+": { current: 15, minimum: 20, status: "low" },
    "A-": { current: 8, minimum: 10, status: "low" },
    "B+": { current: 25, minimum: 15, status: "good" },
    "B-": { current: 5, minimum: 8, status: "critical" },
    "AB+": { current: 12, minimum: 10, status: "good" },
    "AB-": { current: 3, minimum: 5, status: "low" },
    "O+": { current: 30, minimum: 25, status: "good" },
    "O-": { current: 18, minimum: 20, status: "low" },
  })

  const upcomingCampaigns = [
    {
      name: "City Mall Blood Drive",
      date: "2024-01-20",
      location: "Phoenix Mall",
      expectedDonors: 150,
      registered: 89,
      status: "active",
    },
    {
      name: "Corporate Partnership",
      date: "2024-01-25",
      location: "Tech Park",
      expectedDonors: 200,
      registered: 45,
      status: "planning",
    },
  ]

  const patientRequests = [
    {
      id: "REQ001",
      patient: "Arjun Patel",
      bloodType: "B+",
      units: 2,
      urgency: "High",
      scheduledDate: "2024-01-15",
      status: "pending",
    },
    {
      id: "REQ002",
      patient: "Sarah Johnson",
      bloodType: "O-",
      units: 1,
      urgency: "Medium",
      scheduledDate: "2024-01-16",
      status: "confirmed",
    },
    {
      id: "REQ003",
      patient: "Emergency Case",
      bloodType: "A+",
      units: 3,
      urgency: "Critical",
      scheduledDate: "Immediate",
      status: "urgent",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-700 border-green-200"
      case "low":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const router = useRouter()
  useEffect(() => {
    const user = localStorage.getItem("hopelink_user")
    if (!user) {
      router.push("/auth/login")
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold">HopeLink Hospital</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-100 text-green-700">
                City General Hospital
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">CG</span>
                </div>
                <span className="text-sm font-medium">Dr. Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Hospital Dashboard</h1>
          <p className="text-gray-600">Manage blood inventory, campaigns, and patient requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-blue-600">116</div>
                  <p className="text-xs text-gray-600">Total Units</p>
                </CardContent>
              </Card>
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-red-600">4</div>
                  <p className="text-xs text-gray-600">Low Stock</p>
                </CardContent>
              </Card>
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-green-600">134</div>
                  <p className="text-xs text-gray-600">Registered Donors</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-purple-600">3</div>
                  <p className="text-xs text-gray-600">Pending Requests</p>
                </CardContent>
              </Card>
            </div>

            {/* Blood Inventory */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Droplets className="h-5 w-5 mr-2" />
                    Blood Inventory
                  </CardTitle>
                  <CardDescription>Real-time blood stock levels</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Update Stock
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(bloodInventory).map(([bloodType, data]) => (
                    <div key={bloodType} className={`p-4 rounded-lg border ${getStatusColor(data.status)}`}>
                      <div className="text-center">
                        <h3 className="font-bold text-lg">{bloodType}</h3>
                        <div className="text-2xl font-bold my-2">{data.current}</div>
                        <p className="text-xs">Min: {data.minimum}</p>
                        <Progress value={(data.current / (data.minimum * 1.5)) * 100} className="mt-2 h-2" />
                        <Badge variant="outline" className="mt-2 text-xs">
                          {data.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Requests */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Patient Requests</CardTitle>
                  <CardDescription>Manage transfusion requests</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{request.patient}</h4>
                          <Badge variant={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Blood Type: {request.bloodType} • Units: {request.units}
                        </p>
                        <p className="text-sm text-blue-600">Scheduled: {request.scheduledDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          {request.status === "urgent" ? "Process Now" : "Confirm"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donation Campaigns */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Donation Campaigns
                  </CardTitle>
                  <CardDescription>Organize and manage blood drives</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingCampaigns.map((campaign, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">
                          {campaign.location} • {campaign.date}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">
                            Registered: {campaign.registered}/{campaign.expectedDonors}
                          </span>
                          <Progress
                            value={(campaign.registered / campaign.expectedDonors) * 100}
                            className="w-24 h-2"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Alerts */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Emergency Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border border-red-200">
                    <p className="text-sm font-semibold text-red-700">B- Critical Low</p>
                    <p className="text-xs text-gray-600">Only 5 units remaining</p>
                  </div>
                  <div className="p-3 bg-white rounded border border-yellow-200">
                    <p className="text-sm font-semibold text-yellow-700">A+ Low Stock</p>
                    <p className="text-xs text-gray-600">Below minimum threshold</p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4" variant="destructive">
                  Send Donor Alert
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Blood Units
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Register Donor
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Campaign
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>5 units O+ received</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>New donor registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Emergency request fulfilled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Campaign scheduled</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Emergency Services */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-700">Emergency Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-transparent" variant="outline">
                    Contact Blood Bank Network
                  </Button>
                  <Button size="sm" className="w-full bg-transparent" variant="outline">
                    Emergency Donor Alert
                  </Button>
                  <Button size="sm" className="w-full bg-transparent" variant="outline">
                    Inter-Hospital Transfer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
