"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
  address?: string
}

interface LocationTrackerProps {
  onLocationUpdate?: (location: LocationData) => void
  autoTrack?: boolean
  showAddress?: boolean
}

export function LocationTracker({ onLocationUpdate, autoTrack = false, showAddress = true }: LocationTrackerProps) {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt" | "unknown">("unknown")
  const [watchId, setWatchId] = useState<number | null>(null)

  useEffect(() => {
    checkPermissionStatus()
    if (autoTrack) {
      startTracking()
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [autoTrack])

  const checkPermissionStatus = async () => {
    if (!navigator.permissions) {
      setPermissionStatus("unknown")
      return
    }

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" })
      setPermissionStatus(permission.state)

      permission.addEventListener("change", () => {
        setPermissionStatus(permission.state)
      })
    } catch (error) {
      setPermissionStatus("unknown")
    }
  }

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"))
        return
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000, // Cache for 1 minute
      })
    })
  }

  const reverseGeocode = async (lat: number, lng: number): Promise<string | undefined> => {
    if (!showAddress) return undefined

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      )
      const data = await response.json()

      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error)
    }

    return undefined
  }

  const updateLocation = async (position: GeolocationPosition) => {
    const locationData: LocationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    }

    if (showAddress) {
      locationData.address = await reverseGeocode(locationData.latitude, locationData.longitude)
    }

    setLocation(locationData)
    onLocationUpdate?.(locationData)
    setError(null)
  }

  const handleLocationError = (error: GeolocationPositionError) => {
    let errorMessage = "Unknown location error"

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "Location access denied by user"
        setPermissionStatus("denied")
        break
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Location information unavailable"
        break
      case error.TIMEOUT:
        errorMessage = "Location request timed out"
        break
    }

    setError(errorMessage)
    setIsTracking(false)
  }

  const startTracking = async () => {
    setIsTracking(true)
    setError(null)

    try {
      // Get initial position
      const position = await getCurrentPosition()
      await updateLocation(position)

      // Start watching position changes
      const id = navigator.geolocation.watchPosition(updateLocation, handleLocationError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000, // Cache for 30 seconds
      })

      setWatchId(id)
      setPermissionStatus("granted")
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        handleLocationError(error)
      } else {
        setError("Failed to get location")
        setIsTracking(false)
      }
    }
  }

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
    setIsTracking(false)
  }

  const getOneTimeLocation = async () => {
    setError(null)
    try {
      const position = await getCurrentPosition()
      await updateLocation(position)
      setPermissionStatus("granted")
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        handleLocationError(error)
      } else {
        setError("Failed to get location")
      }
    }
  }

  const getPermissionStatusColor = () => {
    switch (permissionStatus) {
      case "granted":
        return "bg-green-100 text-green-700"
      case "denied":
        return "bg-red-100 text-red-700"
      case "prompt":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getAccuracyLevel = (accuracy: number) => {
    if (accuracy <= 10) return { level: "High", color: "text-green-600" }
    if (accuracy <= 50) return { level: "Medium", color: "text-yellow-600" }
    return { level: "Low", color: "text-red-600" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location Tracking
          </div>
          <Badge className={getPermissionStatusColor()}>
            {permissionStatus === "granted" && <CheckCircle className="h-3 w-3 mr-1" />}
            {permissionStatus === "denied" && <AlertTriangle className="h-3 w-3 mr-1" />}
            {permissionStatus.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Control Buttons */}
        <div className="flex gap-2">
          {!isTracking ? (
            <>
              <Button onClick={startTracking} className="bg-blue-600 hover:bg-blue-700">
                <Navigation className="h-4 w-4 mr-2" />
                Start Tracking
              </Button>
              <Button onClick={getOneTimeLocation} variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Get Location
              </Button>
            </>
          ) : (
            <Button onClick={stopTracking} variant="destructive">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Stop Tracking
            </Button>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
            {permissionStatus === "denied" && (
              <p className="text-xs text-red-600 mt-2">
                Please enable location permissions in your browser settings and refresh the page.
              </p>
            )}
          </div>
        )}

        {/* Location Information */}
        {location && (
          <div className="space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Current Location</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Latitude:</span>
                  <span className="font-mono ml-2">{location.latitude.toFixed(6)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Longitude:</span>
                  <span className="font-mono ml-2">{location.longitude.toFixed(6)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Accuracy:</span>
                  <span className={`ml-2 ${getAccuracyLevel(location.accuracy).color}`}>
                    ±{location.accuracy.toFixed(0)}m ({getAccuracyLevel(location.accuracy).level})
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Updated:</span>
                  <span className="ml-2">{new Date(location.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              {location.address && (
                <div className="mt-3 pt-3 border-t border-green-300">
                  <span className="text-gray-600">Address:</span>
                  <p className="text-sm mt-1">{location.address}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const coords = `${location.latitude},${location.longitude}`
                  navigator.clipboard.writeText(coords)
                }}
              >
                Copy Coordinates
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
                  window.open(url, "_blank")
                }}
              >
                View on Maps
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (location.address) {
                    navigator.clipboard.writeText(location.address)
                  }
                }}
                disabled={!location.address}
              >
                Copy Address
              </Button>
            </div>
          </div>
        )}

        {/* Tracking Status */}
        {isTracking && (
          <div className="flex items-center justify-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Loader2 className="h-4 w-4 text-blue-600 mr-2 animate-spin" />
            <span className="text-blue-700 text-sm">Tracking your location...</span>
          </div>
        )}

        {/* Permission Help */}
        {permissionStatus === "prompt" && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700 text-sm">
              Please allow location access when prompted to use location-based features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
