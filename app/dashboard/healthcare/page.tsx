"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Calendar, FileText, Video, Users, TrendingUp, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HealthcareDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("hopelink_user")
    if (!user) {
      router.push("/auth/login")
    }
  }, [])

  const assignedPatients = [
    {
      id: "1",
      name: "Arjun Patel",
      age: 28,
      bloodType: "B+",
      lastTransfusion: "2023-12-25",
      nextDue: "2024-01-15",
      hemoglobin: 8.2,
      status: "stable",
      urgency: "medium",
    },
    {
      id: "2",
      name: "Priya Sharma",
      age: 24,
      bloodType: "A+",
      lastTransfusion: "2023-12-20",
      nextDue: "2024-01-12",
      hemoglobin: 7.8,
      status: "needs_attention",
      urgency: "high",
    },
    {
      id: "3",
      name: "Rahul Kumar",
      age: 32,
      bloodType: "O+",
      lastTransfusion: "2024-01-02",
      nextDue: "2024-02-15",
      hemoglobin: 9.1,
      status: "stable",
      urgency: "low",
    },
  ]

  const upcomingAppointments = [
    {
      time: "10:00 AM",
      patient: "Arjun Patel",
      type: "Follow-up",
      mode: "Video Call",
      duration: "30 min",
    },
    {
      time: "2:30 PM",
      patient: "Priya Sharma",
      type: "Consultation",
      mode: "In-person",
      duration: "45 min",
    },
    {
      time: "4:00 PM",
      patient: "Rahul Kumar",
      type: "Check-up",
      mode: "Video Call",
      duration: "20 min",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "default"
      case "needs_attention":
        return "destructive"
      case "critical":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Stethoscope className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">HopeLink Healthcare</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-teal-100 text-teal-700">
                Dr. Sarah Johnson - Hematologist
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-teal-600">SJ</span>
                </div>
                <span className="text-sm font-medium">Dr. Johnson</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Healthcare Dashboard</h1>
          <p className="text-gray-600">Manage patient care, consultations, and treatment plans</p>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patients">My Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Assigned Patients ({assignedPatients.length})
                    </CardTitle>
                    <CardDescription>Monitor and manage your patient caseload</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignedPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedPatient === patient.id ? "border-teal-300 bg-teal-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedPatient(patient.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{patient.name}</h4>
                              <Badge variant="outline">{patient.bloodType}</Badge>
                              <Badge variant={getStatusColor(patient.status)}>{patient.status.replace("_", " ")}</Badge>
                            </div>
                            <Badge variant={getUrgencyColor(patient.urgency)}>{patient.urgency} priority</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Age:</span>
                              <span className="font-semibold ml-1">{patient.age}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Hb Level:</span>
                              <span
                                className={`font-semibold ml-1 ${
                                  patient.hemoglobin < 8
                                    ? "text-red-600"
                                    : patient.hemoglobin < 9
                                      ? "text-orange-600"
                                      : "text-green-600"
                                }`}
                              >
                                {patient.hemoglobin} g/dL
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Last Transfusion:</span>
                              <span className="font-semibold ml-1">{patient.lastTransfusion}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Next Due:</span>
                              <span className="font-semibold ml-1">{patient.nextDue}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              <FileText className="h-3 w-3 mr-1" />
                              Records
                            </Button>
                            <Button size="sm" variant="outline">
                              <Video className="h-3 w-3 mr-1" />
                              Consult
                            </Button>
                            <Button size="sm">Update Plan</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Patient Details Sidebar */}
              <div className="space-y-6">
                {selectedPatient ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Patient Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(() => {
                          const patient = assignedPatients.find((p) => p.id === selectedPatient)
                          if (!patient) return null
                          return (
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold text-lg">{patient.name}</h3>
                                <p className="text-gray-600">
                                  {patient.age} years old • {patient.bloodType}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Current Hb:</span>
                                  <span className="font-semibold">{patient.hemoglobin} g/dL</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Status:</span>
                                  <Badge variant={getStatusColor(patient.status)}>
                                    {patient.status.replace("_", " ")}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Next Transfusion:</span>
                                  <span className="font-semibold">{patient.nextDue}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Button className="w-full" size="sm">
                                  <Video className="h-4 w-4 mr-2" />
                                  Start Video Call
                                </Button>
                                <Button className="w-full bg-transparent" size="sm" variant="outline">
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Full Records
                                </Button>
                                <Button className="w-full bg-transparent" size="sm" variant="outline">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Schedule Appointment
                                </Button>
                              </div>
                            </div>
                          )
                        })()}
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200 bg-orange-50">
                      <CardHeader>
                        <CardTitle className="flex items-center text-orange-700">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          AI Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p>• Consider iron chelation therapy adjustment</p>
                          <p>• Schedule cardiac function assessment</p>
                          <p>• Monitor for signs of iron overload</p>
                          <p>• Recommend nutritional counseling</p>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a patient to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Appointments
                </CardTitle>
                <CardDescription>January 8, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <Clock className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                          <span className="text-sm font-semibold">{appointment.time}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{appointment.patient}</h4>
                          <p className="text-sm text-gray-600">
                            {appointment.type} • {appointment.duration}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {appointment.mode}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm">{appointment.mode === "Video Call" ? "Join Call" : "Start Session"}</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Virtual Consultation Room
                </CardTitle>
                <CardDescription>Secure video consultations with patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Consultations</h3>
                  <p className="text-gray-600 mb-4">Start a video call with your patients</p>
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Start New Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{assignedPatients.length}</div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-gray-600">This Week's Appointments</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Video className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-sm text-gray-600">Video Consultations</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-sm text-gray-600">Patient Satisfaction</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Patient Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Chart: Patient hemoglobin trends over time</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
