"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Clock, Heart, Users, Building2 } from "lucide-react"
import Link from "next/link"
import { EmergencyLocation } from "@/components/emergency/emergency-location"

export default function EmergencyPage() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    if (isEmergencyActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isEmergencyActive, countdown])

  const activateEmergency = () => {
    setIsEmergencyActive(true)
    setCountdown(300) // 5 minutes
  }

  const emergencyContacts = [
    { name: "Emergency Services", number: "108", type: "primary" },
    { name: "HopeLink Emergency", number: "1800-HOPE-LINK", type: "secondary" },
    { name: "Blood Bank Network", number: "+91-22-BLOOD-24", type: "secondary" },
  ]

  const handleLocationShare = (location: { lat: number; lng: number }) => {
    setUserLocation(location)
    // In real app, this would send location to emergency services
    console.log("Emergency location shared:", location)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-100">
      {/* Header */}
      <header className="bg-red-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="text-xl font-bold">Emergency SOS</span>
            </Link>
            <div className="flex items-center space-x-4">
              {isEmergencyActive && (
                <Badge variant="destructive" className="animate-pulse">
                  <Clock className="h-3 w-3 mr-1" />
                  Active: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                </Badge>
              )}
              <Button variant="secondary" size="sm" onClick={() => setIsEmergencyActive(false)}>
                Cancel Emergency
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isEmergencyActive ? (
          // Emergency Activation Screen
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <AlertTriangle className="h-24 w-24 text-red-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-red-600 mb-4">Emergency SOS</h1>
              <p className="text-lg text-gray-600 mb-8">
                Activate emergency mode to immediately notify nearby hospitals and donors about your urgent blood
                requirement.
              </p>
            </div>

            <Card className="border-red-200 bg-red-50 mb-8">
              <CardHeader>
                <CardTitle className="text-red-700">Before You Activate</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Ensure this is a genuine medical emergency</li>
                  <li>• Have your medical records and ID ready</li>
                  <li>• Someone should accompany you to the hospital</li>
                  <li>• Call 108 for immediate ambulance service</li>
                </ul>
              </CardContent>
            </Card>

            <Button
              onClick={activateEmergency}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-bold animate-pulse"
            >
              <AlertTriangle className="h-6 w-6 mr-2" />
              ACTIVATE EMERGENCY SOS
            </Button>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className={contact.type === "primary" ? "border-red-300 bg-red-50" : ""}>
                  <CardContent className="p-4 text-center">
                    <Phone className="h-6 w-6 mx-auto mb-2 text-red-600" />
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-lg font-bold text-red-600">{contact.number}</p>
                    <Button size="sm" className="mt-2 w-full" onClick={() => window.open(`tel:${contact.number}`)}>
                      Call Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Active Emergency Screen
          <div className="space-y-6">
            <Card className="border-red-300 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <AlertTriangle className="h-6 w-6 mr-2 animate-pulse" />
                  Emergency SOS Active
                </CardTitle>
                <CardDescription>
                  Your emergency alert has been sent to nearby hospitals and eligible donors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <Building2 className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">5</div>
                    <p className="text-sm text-gray-600">Hospitals Notified</p>
                  </div>
                  <div>
                    <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">23</div>
                    <p className="text-sm text-gray-600">Donors Alerted</p>
                  </div>
                  <div>
                    <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <p className="text-sm text-gray-600">Responses Received</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Location Component */}
            <EmergencyLocation
              isEmergencyActive={isEmergencyActive}
              patientBloodType="B+"
              onLocationShare={handleLocationShare}
            />

            {/* Real-time Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Real-time Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-semibold text-green-700">Donor Response</p>
                      <p className="text-sm text-gray-600">Rajesh K. is heading to City General Hospital</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700">Hospital Confirmed</p>
                      <p className="text-sm text-gray-600">Metro Blood Bank has 3 units of B+ ready</p>
                      <p className="text-xs text-gray-500">3 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-semibold text-orange-700">Ambulance Dispatched</p>
                      <p className="text-sm text-gray-600">Emergency services en route to your location</p>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
