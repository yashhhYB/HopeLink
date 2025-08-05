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
  Droplets,
  MapPin,
  Calendar,
  Bell,
  Award,
  TrendingUp,
  Phone,
  MessageCircle,
  Shield,
  Star,
} from "lucide-react"
import { DonorProfileForm } from "@/components/forms/donor-profile-form"
import { HospitalMap } from "@/components/maps/hospital-map"
import { LocationTracker } from "@/components/location/location-tracker"
import { EnhancedChatbot } from "@/components/ai-features/enhanced-chatbot"

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [profileComplete, setProfileComplete] = useState(80)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>()

  // Mock donor data
  const donorData = {
    name: "Sarah Johnson",
    bloodType: "O-",
    totalDonations: 24,
    lastDonation: "2023-11-15",
    nextEligible: "2024-02-15",
    donorLevel: "Gold",
    livesImpacted: 72,
    emergencyAvailable: true,
  }

  const donationHistory = [
    { date: "2023-11-15", location: "City Blood Center", type: "Whole Blood", status: "completed" },
    { date: "2023-08-10", location: "Metro Hospital", type: "Platelets", status: "completed" },
    { date: "2023-05-22", location: "Community Center", type: "Whole Blood", status: "completed" },
    { date: "2023-02-18", location: "City Blood Center", type: "Plasma", status: "completed" },
  ]

  const upcomingOpportunities = [
    { date: "2024-02-20", location: "City Blood Center", type: "Whole Blood", urgency: "high" },
    { date: "2024-02-25", location: "Metro Hospital", type: "Platelets", urgency: "medium" },
    { date: "2024-03-01", location: "Community Drive", type: "Whole Blood", urgency: "low" },
  ]

  const achievements = [
    { title: "Life Saver", description: "Donated 20+ times", icon: Heart, earned: true },
    { title: "Emergency Hero", description: "Available for emergencies", icon: Shield, earned: true },
    { title: "Consistent Donor", description: "Donated 4 times this year", icon: Calendar, earned: true },
    { title: "Community Champion", description: "Referred 5+ donors", icon: Star, earned: false },
  ]

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
  }

  const getDonorLevelColor = (level: string) => {
    switch (level) {
      case "Gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Silver":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Bronze":
        return "bg-orange-100 text-orange-800 border-orange-300"
      default:
        return "bg-blue-100 text-blue-800 border-blue-300"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {donorData.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getDonorLevelColor(donorData.donorLevel)}>{donorData.donorLevel} Donor</Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Droplets className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Blood Type</p>
                      <p className="text-2xl font-bold text-gray-900">{donorData.bloodType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Donations</p>
                      <p className="text-2xl font-bold text-gray-900">{donorData.totalDonations}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Lives Impacted</p>
                      <p className="text-2xl font-bold text-gray-900">{donorData.livesImpacted}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Next Eligible</p>
                      <p className="text-lg font-bold text-gray-900">{donorData.nextEligible}</p>
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
                  Profile Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile completion helps us match you better</span>
                    <span className="text-sm text-gray-600">{profileComplete}%</span>
                  </div>
                  <Progress value={profileComplete} className="w-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={donorData.emergencyAvailable ? "default" : "secondary"}>
                        {donorData.emergencyAvailable ? "Emergency Available" : "Regular Only"}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("profile")}>
                      Update Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="h-5 w-5 mr-2" />
                  Recent Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.slice(0, 3).map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{donation.type}</p>
                        <p className="text-sm text-gray-600">
                          {donation.location} • {donation.date}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {donation.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setActiveTab("donations")}>
                    View All Donations
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingOpportunities.slice(0, 2).map((opportunity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{opportunity.type}</p>
                        <p className="text-sm text-gray-600">
                          {opportunity.location} • {opportunity.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getUrgencyColor(opportunity.urgency)}>{opportunity.urgency} priority</Badge>
                        <Button size="sm">Book</Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setActiveTab("opportunities")}
                  >
                    View All Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <DonorProfileForm />
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <p className="text-gray-600">Your complete donation record</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Droplets className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-gray-900">{donation.type}</p>
                            <p className="text-sm text-gray-600">{donation.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{donation.date}</p>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {donation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">{donorData.totalDonations}</div>
                    <p className="text-gray-600">Total Donations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{donorData.livesImpacted}</div>
                    <p className="text-gray-600">Lives Impacted</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                    <p className="text-gray-600">This Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities">
            <div className="space-y-6">
              <LocationTracker onLocationUpdate={handleLocationUpdate} />
              <HospitalMap userLocation={userLocation} />

              <Card>
                <CardHeader>
                  <CardTitle>Available Donation Opportunities</CardTitle>
                  <p className="text-gray-600">Find donation drives and appointments near you</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingOpportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{opportunity.type} Donation</p>
                              <p className="text-sm text-gray-600">{opportunity.location}</p>
                              <p className="text-sm text-gray-500">{opportunity.date}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getUrgencyColor(opportunity.urgency)}>{opportunity.urgency} priority</Badge>
                          <Button size="sm">Book Appointment</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Your Achievements
                </CardTitle>
                <p className="text-gray-600">Celebrate your donation milestones</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <div
                        key={index}
                        className={`p-6 border rounded-lg ${
                          achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center mb-4">
                          <Icon className={`h-8 w-8 mr-3 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} />
                          <div>
                            <h3 className={`font-semibold ${achievement.earned ? "text-green-900" : "text-gray-600"}`}>
                              {achievement.title}
                            </h3>
                            <p className={`text-sm ${achievement.earned ? "text-green-700" : "text-gray-500"}`}>
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant={achievement.earned ? "default" : "secondary"}>
                          {achievement.earned ? "Earned" : "In Progress"}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-red-600">{donorData.livesImpacted}</div>
                  <p className="text-xl text-gray-700">Lives potentially saved through your donations</p>
                  <p className="text-gray-600">
                    Each donation can help save up to 3 lives. Your {donorData.totalDonations} donations have made a
                    significant impact in your community.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    AI Donation Assistant
                  </CardTitle>
                  <p className="text-gray-600">Get answers about donation eligibility and process</p>
                </CardHeader>
                <CardContent>
                  <EnhancedChatbot />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Donation Support Line</p>
                        <p className="text-sm text-gray-600">Questions about donation process</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Support
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Medical Questions</p>
                        <p className="text-sm text-gray-600">Speak with a medical professional</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Medical Line
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Emergency Donations</p>
                        <p className="text-sm text-gray-600">Urgent donation requests</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Emergency Line
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
