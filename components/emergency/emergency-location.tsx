"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Phone, Navigation, Clock, Zap } from "lucide-react"
import { LocationTracker } from "../location/location-tracker"
import { HospitalMap } from "../maps/hospital-map"

interface EmergencyLocationProps {
  isEmergencyActive: boolean
  patientBloodType: string
  onLocationShare?: (location: { lat: number; lng: number }) => void
}

export function EmergencyLocation({ isEmergencyActive, patientBloodType, onLocationShare }: EmergencyLocationProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Emergency Services", number: "108", type: "primary" },
    { name: "HopeLink Emergency", number: "1800-HOPE-LINK", type: "secondary" },
    { name: "Blood Bank Network", number: "+91-22-BLOOD-24", type: "secondary" },
  ])

  const handleLocationUpdate = (location: any) => {
    const coords = { lat: location.latitude, lng: location.longitude }
    setUserLocation(coords)
    onLocationShare?.(coords)
  }

  const shareLocationViaWhatsApp = () => {
    if (!userLocation) return

    const message = `🚨 EMERGENCY BLOOD NEEDED 🚨
    
Patient Blood Type: ${patientBloodType}
Location: https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}
Time: ${new Date().toLocaleString()}

This is an emergency request through HopeLink. Please respond if you can help.`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const shareLocationViaSMS = () => {
    if (!userLocation) return

    const message = `EMERGENCY: Blood needed (${patientBloodType}) at https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng} - HopeLink`
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`
    window.open(smsUrl)
  }

  const callEmergencyServices = (number: string) => {
    window.open(`tel:${number}`)
  }

  return (
    <div className="space-y-6">
      {/* Emergency Status */}
      {isEmergencyActive && (
        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="h-6 w-6 mr-2 animate-pulse" />
              Emergency Mode Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <Button
                  key={index}
                  onClick={() => callEmergencyServices(contact.number)}
                  className={`h-16 flex-col ${
                    contact.type === "primary" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  <Phone className="h-5 w-5 mb-1" />
                  <span className="text-xs">{contact.name}</span>
                  <span className="text-sm font-bold">{contact.number}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Location Tracker */}
      <LocationTracker onLocationUpdate={handleLocationUpdate} autoTrack={isEmergencyActive} showAddress={true} />

      {/* Location Sharing */}
      {userLocation && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Zap className="h-5 w-5 mr-2" />
              Share Your Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Share your exact location with emergency contacts and nearby donors to get help faster.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button onClick={shareLocationViaWhatsApp} className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
                <Button onClick={shareLocationViaSMS} variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Share via SMS
                </Button>
                <Button
                  onClick={() => {
                    const coords = `${userLocation.lat},${userLocation.lng}`
                    navigator.clipboard.writeText(coords)
                  }}
                  variant="outline"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Copy Coordinates
                </Button>
                <Button
                  onClick={() => {
                    const url = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`
                    window.open(url, "_blank")
                  }}
                  variant="outline"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Open in Maps
                </Button>
              </div>

              {/* Live Location Display */}
              <div className="p-3 bg-white border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-700">Live Location</span>
                  <Badge variant="outline" className="text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Active
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Lat: {userLocation.lat.toFixed(6)}</div>
                  <div>Lng: {userLocation.lng.toFixed(6)}</div>
                  <div>Updated: {new Date().toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hospital Map */}
      {userLocation && (
        <HospitalMap
          userLocation={userLocation}
          requiredBloodType={patientBloodType}
          onHospitalSelect={(hospital) => {
            console.log("Selected hospital:", hospital)
          }}
        />
      )}

      {/* Emergency Instructions */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-700">
            <Clock className="h-5 w-5 mr-2" />
            Emergency Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-bold text-orange-700 mr-2">1.</span>
              <span>Call emergency services (108) immediately if this is life-threatening</span>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-orange-700 mr-2">2.</span>
              <span>Share your location with family members and emergency contacts</span>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-orange-700 mr-2">3.</span>
              <span>Navigate to the nearest hospital with available blood</span>
            </div>
            <div className="flex items-start">
              <span className="font-bold text-orange-700 mr-2">4.</span>
              <span>Keep your medical records and ID ready</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
