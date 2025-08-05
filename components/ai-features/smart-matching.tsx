"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, Clock, Zap, Brain, Star } from "lucide-react"

interface DonorMatch {
  id: string
  name: string
  bloodType: string
  distance: number
  availability: "available" | "busy" | "unavailable"
  matchScore: number
  lastDonation: string
  totalDonations: number
  responseTime: string
  specialNotes?: string
}

interface MatchingCriteria {
  urgency: "low" | "medium" | "high" | "critical"
  bloodType: string
  location: { lat: number; lng: number }
  requiredUnits: number
  patientAge: number
  medicalConditions: string[]
}

export function SmartMatching({ criteria }: { criteria: MatchingCriteria }) {
  const [matches, setMatches] = useState<DonorMatch[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)

  const findMatches = async () => {
    setIsLoading(true)

    // Simulate AI matching algorithm
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // AI-powered matching logic
    const potentialDonors: DonorMatch[] = [
      {
        id: "1",
        name: "Rajesh Kumar",
        bloodType: criteria.bloodType,
        distance: 1.2,
        availability: "available",
        matchScore: 0,
        lastDonation: "2023-10-15",
        totalDonations: 45,
        responseTime: "< 30 min",
        specialNotes: "Regular donor, excellent health record",
      },
      {
        id: "2",
        name: "Priya Sharma",
        bloodType: criteria.bloodType,
        distance: 2.8,
        availability: "available",
        matchScore: 0,
        lastDonation: "2023-11-20",
        totalDonations: 32,
        responseTime: "< 45 min",
        specialNotes: "Emergency response volunteer",
      },
      {
        id: "3",
        name: "Amit Singh",
        bloodType: criteria.bloodType,
        distance: 4.1,
        availability: "busy",
        matchScore: 0,
        lastDonation: "2023-12-01",
        totalDonations: 28,
        responseTime: "2-3 hours",
      },
      {
        id: "4",
        name: "Neha Gupta",
        bloodType: criteria.bloodType,
        distance: 3.5,
        availability: "available",
        matchScore: 0,
        lastDonation: "2023-09-30",
        totalDonations: 38,
        responseTime: "< 1 hour",
        specialNotes: "Pediatric donation specialist",
      },
    ]

    // AI scoring algorithm
    const scoredMatches = potentialDonors.map((donor) => {
      let score = 100 // Base score

      // Distance factor (closer is better)
      score -= donor.distance * 5

      // Availability factor
      if (donor.availability === "available") score += 20
      else if (donor.availability === "busy") score -= 10
      else score -= 30

      // Experience factor
      score += Math.min(donor.totalDonations * 0.5, 20)

      // Recency factor (more recent donations are better)
      const daysSinceLastDonation = Math.floor(
        (Date.now() - new Date(donor.lastDonation).getTime()) / (1000 * 60 * 60 * 24),
      )
      if (daysSinceLastDonation > 56)
        score += 15 // Eligible to donate
      else score -= 20 // Too recent

      // Urgency factor
      if (criteria.urgency === "critical") {
        score += donor.availability === "available" ? 30 : -20
        score -= donor.distance * 3 // Distance matters more in critical cases
      }

      // Special conditions
      if (criteria.patientAge < 18 && donor.specialNotes?.includes("Pediatric")) {
        score += 25
      }

      return { ...donor, matchScore: Math.max(0, Math.round(score)) }
    })

    // Sort by match score
    const sortedMatches = scoredMatches.sort((a, b) => b.matchScore - a.matchScore)

    setMatches(sortedMatches)
    setIsLoading(false)
  }

  useEffect(() => {
    findMatches()
  }, [criteria])

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-700"
      case "busy":
        return "bg-yellow-100 text-yellow-700"
      case "unavailable":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center text-green-700">
          <Brain className="h-5 w-5 mr-2" />
          AI Smart Donor Matching
        </CardTitle>
        <CardDescription>
          Advanced algorithm matching based on urgency, location, and donor compatibility
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Matching Criteria Display */}
        <div className="mb-6 p-4 bg-white rounded-lg border">
          <h4 className="font-semibold mb-3">Current Request</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Blood Type:</span>
              <Badge variant="outline" className="ml-2">
                {criteria.bloodType}
              </Badge>
            </div>
            <div>
              <span className="text-gray-600">Urgency:</span>
              <Badge variant={getUrgencyColor(criteria.urgency)} className="ml-2">
                {criteria.urgency.toUpperCase()}
              </Badge>
            </div>
            <div>
              <span className="text-gray-600">Units Needed:</span>
              <span className="font-semibold ml-2">{criteria.requiredUnits}</span>
            </div>
            <div>
              <span className="text-gray-600">Patient Age:</span>
              <span className="font-semibold ml-2">{criteria.patientAge} years</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Finding best donor matches...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Top Matches ({matches.length})</h4>
              <Button size="sm" onClick={findMatches} variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Refresh Matches
              </Button>
            </div>

            {matches.map((match, index) => (
              <div
                key={match.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedMatch === match.id
                    ? "border-green-500 bg-white ring-2 ring-green-200"
                    : "bg-white hover:border-gray-300"
                }`}
                onClick={() => setSelectedMatch(match.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <h5 className="font-semibold">{match.name}</h5>
                      <p className="text-sm text-gray-600">{match.totalDonations} donations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold text-green-600">{match.matchScore}%</span>
                    </div>
                    <Badge className={getAvailabilityColor(match.availability)}>{match.availability}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{match.distance} km away</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span>ETA: {match.responseTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span>Last: {new Date(match.lastDonation).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <Badge variant="outline">{match.bloodType}</Badge>
                  </div>
                </div>

                {match.specialNotes && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                    <span className="text-blue-700">💡 {match.specialNotes}</span>
                  </div>
                )}

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Match Score</span>
                    <span>{match.matchScore}%</span>
                  </div>
                  <Progress value={match.matchScore} className="h-2" />
                </div>

                {selectedMatch === match.id && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Send Request
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      Message
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {matches.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No suitable donors found. Try adjusting criteria.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
