"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface GoogleMapsContextType {
  isLoaded: boolean
  loadError: Error | null
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: null,
})

export const useGoogleMaps = () => useContext(GoogleMapsContext)

interface GoogleMapsProviderProps {
  children: React.ReactNode
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<Error | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true)
      return
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      setLoadError(new Error("Failed to load Google Maps"))
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>{children}</GoogleMapsContext.Provider>
}
