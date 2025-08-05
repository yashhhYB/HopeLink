"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation, Phone, Clock, Star, Search } from "lucide-react"
import { useGoogleMaps } from "./google-maps-provider"

interface Hospital {
  id: string
  name: string
  address: string
  phone: string
  bloodTypes: string[]
  distance: number
  duration: string
  rating: number
  isOpen: boolean
  lat: number
  lng: number
  emergencyServices: boolean
  thalassemiaCenter: boolean
}

interface HospitalMapProps {
  userLocation?: { lat: number; lng: number }
  onHospitalSelect?: (hospital: Hospital) => void
}

export function HospitalMap({ userLocation, onHospitalSelect }: HospitalMapProps) {
  const { isLoaded, loadError } = useGoogleMaps()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const directionsRendererRef = useRef<any>(null)

  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "emergency" | "thalassemia">("all")
  const [isLoadingDirections, setIsLoadingDirections] = useState(false)

  // Sample hospital data
  const sampleHospitals: Hospital[] = [
    {
      id: "1",
      name: "Apollo Hospital",
      address: "123 Health Street, Medical District",
      phone: "+91-11-2345-6789",
      bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
      distance: 2.5,
      duration: "8 mins",
      rating: 4.8,
      isOpen: true,
      lat: 28.6139 + (Math.random() - 0.5) * 0.01,
      lng: 77.209 + (Math.random() - 0.5) * 0.01,
      emergencyServices: true,
      thalassemiaCenter: true,
    },
    {
      id: "2",
      name: "Fortis Healthcare",
      address: "456 Care Avenue, Health Zone",
      phone: "+91-11-3456-7890",
      bloodTypes: ["A+", "B+", "O+", "AB+", "O-"],
      distance: 3.2,
      duration: "12 mins",
      rating: 4.6,
      isOpen: true,
      lat: 28.6139 + (Math.random() - 0.5) * 0.01,
      lng: 77.209 + (Math.random() - 0.5) * 0.01,
      emergencyServices: true,
      thalassemiaCenter: false,
    },
    {
      id: "3",
      name: "Max Super Speciality Hospital",
      address: "789 Wellness Road, Medical Hub",
      phone: "+91-11-4567-8901",
      bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-"],
      distance: 4.1,
      duration: "15 mins",
      rating: 4.7,
      isOpen: false,
      lat: 28.6139 + (Math.random() - 0.5) * 0.01,
      lng: 77.209 + (Math.random() - 0.5) * 0.01,
      emergencyServices: true,
      thalassemiaCenter: true,
    },
    {
      id: "4",
      name: "AIIMS Delhi",
      address: "Ansari Nagar, New Delhi",
      phone: "+91-11-2658-8500",
      bloodTypes: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"],
      distance: 5.8,
      duration: "22 mins",
      rating: 4.9,
      isOpen: true,
      lat: 28.6139 + (Math.random() - 0.5) * 0.01,
      lng: 77.209 + (Math.random() - 0.5) * 0.01,
      emergencyServices: true,
      thalassemiaCenter: true,
    },
  ]

  // Calculate distance using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Estimate duration based on distance
  const estimateDuration = (distance: number): string => {
    const avgSpeed = 25 // km/h average city speed
    const hours = distance / avgSpeed
    const minutes = Math.round(hours * 60)
    return `${minutes} mins`
  }

  // Initialize hospitals with calculated distances
  useEffect(() => {
    if (userLocation) {
      const hospitalsWithDistance = sampleHospitals.map((hospital) => ({
        ...hospital,
        distance: calculateDistance(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng),
        duration: estimateDuration(calculateDistance(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng)),
      }))

      // Sort by distance
      hospitalsWithDistance.sort((a, b) => a.distance - b.distance)
      setHospitals(hospitalsWithDistance)
    } else {
      setHospitals(sampleHospitals)
    }
  }, [userLocation])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return

    const defaultCenter = userLocation || { lat: 28.6139, lng: 77.209 }

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      styles: [
        {
          featureType: "poi.medical",
          elementType: "geometry",
          stylers: [{ color: "#ffeaa7" }],
        },
      ],
    })

    // Add user location marker if available
    if (userLocation) {
      new window.google.maps.Marker({
        position: userLocation,
        map: mapInstanceRef.current,
        title: "Your Location",
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 24),
        },
      })
    }

    // Initialize directions renderer
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: "#3B82F6",
        strokeWeight: 4,
      },
    })
    directionsRendererRef.current.setMap(mapInstanceRef.current)
  }, [isLoaded, userLocation])

  // Add hospital markers
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // Add new markers
    hospitals.forEach((hospital) => {
      const marker = new window.google.maps.Marker({
        position: { lat: hospital.lat, lng: hospital.lng },
        map: mapInstanceRef.current,
        title: hospital.name,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="${hospital.isOpen ? "#10B981" : "#EF4444"}" stroke="#FFFFFF" strokeWidth="2"/>
              <path d="M16 8v16M8 16h16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
        },
      })

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">${hospital.name}</h3>
            <p class="text-xs text-gray-600">${hospital.address}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs ${hospital.isOpen ? "text-green-600" : "text-red-600"}">
                ${hospital.isOpen ? "Open" : "Closed"}
              </span>
              <span class="text-xs text-gray-500">${hospital.distance.toFixed(1)} km</span>
            </div>
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(mapInstanceRef.current, marker)
        setSelectedHospital(hospital)
        onHospitalSelect?.(hospital)
      })

      markersRef.current.push(marker)
    })
  }, [hospitals, onHospitalSelect])

  const getDirections = async (hospital: Hospital) => {
    if (!userLocation || !window.google || !mapInstanceRef.current) return

    setIsLoadingDirections(true)

    const directionsService = new window.google.maps.DirectionsService()

    try {
      const result = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: userLocation,
            destination: { lat: hospital.lat, lng: hospital.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result: any, status: any) => {
            if (status === "OK") {
              resolve(result)
            } else {
              reject(new Error(`Directions request failed: ${status}`))
            }
          },
        )
      })

      directionsRendererRef.current.setDirections(result)
      setSelectedHospital(hospital)
    } catch (error) {
      console.error("Error getting directions:", error)
    } finally {
      setIsLoadingDirections(false)
    }
  }

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterType === "all" ||
      (filterType === "emergency" && hospital.emergencyServices) ||
      (filterType === "thalassemia" && hospital.thalassemiaCenter)

    return matchesSearch && matchesFilter
  })

  if (loadError) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-red-600">Failed to load Google Maps. Please check your internet connection.</p>
        </CardContent>
      </Card>
    )
  }

  if (!isLoaded) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading map...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Hospital Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={mapRef} className="w-full h-96 rounded-lg" />
          </CardContent>
        </Card>
      </div>

      {/* Hospital List */}
      <div className="space-y-4">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={filterType === "emergency" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("emergency")}
                className="flex-1"
              >
                Emergency
              </Button>
              <Button
                variant={filterType === "thalassemia" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("thalassemia")}
                className="flex-1"
              >
                Thalassemia
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hospital Cards */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredHospitals.map((hospital) => (
            <Card
              key={hospital.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedHospital?.id === hospital.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedHospital(hospital)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm">{hospital.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{hospital.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600">{hospital.address}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={hospital.isOpen ? "default" : "destructive"} className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {hospital.isOpen ? "Open" : "Closed"}
                    </Badge>
                    {hospital.emergencyServices && (
                      <Badge variant="outline" className="text-xs">
                        Emergency
                      </Badge>
                    )}
                    {hospital.thalassemiaCenter && (
                      <Badge variant="secondary" className="text-xs">
                        Thalassemia Center
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{hospital.distance.toFixed(1)} km away</span>
                    <span>{hospital.duration}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`tel:${hospital.phone}`, "_self")
                      }}
                      className="flex-1"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        getDirections(hospital)
                      }}
                      disabled={!userLocation || isLoadingDirections}
                      className="flex-1"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      {isLoadingDirections ? "Loading..." : "Directions"}
                    </Button>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-1">Available Blood Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.bloodTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
