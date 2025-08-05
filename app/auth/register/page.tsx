"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, Users, Building2, Stethoscope, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState("")
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Patient Specific
    bloodType: "",
    thalassemiaType: "",
    diagnosisDate: "",
    currentHemoglobin: "",
    lastTransfusion: "",
    transfusionFrequency: "",
    ironChelation: "",
    complications: "",
    emergencyContact: "",

    // Donor Specific
    weight: "",
    height: "",
    lastDonation: "",
    medicalConditions: "",
    medications: "",

    // Hospital Specific
    hospitalName: "",
    licenseNumber: "",
    hospitalType: "",
    bedCapacity: "",
    bloodBankCapacity: "",

    // Healthcare Professional
    specialization: "",
    licenseNo: "",
    experience: "",
    qualifications: "",
  })

  const router = useRouter()

  const roles = [
    {
      id: "patient",
      title: "Patient",
      icon: Heart,
      color: "text-red-600",
      description: "I need blood transfusions for Thalassemia",
    },
    {
      id: "donor",
      title: "Blood Donor",
      icon: Users,
      color: "text-blue-600",
      description: "I want to donate blood and help patients",
    },
    {
      id: "hospital",
      title: "Hospital/Blood Bank",
      icon: Building2,
      color: "text-green-600",
      description: "We manage blood inventory and patient care",
    },
    {
      id: "healthcare",
      title: "Healthcare Professional",
      icon: Stethoscope,
      color: "text-orange-600",
      description: "I provide medical care to patients",
    },
  ]

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send data to your backend
    console.log("Registration data:", { role: selectedRole, ...formData })

    // For demo, redirect to login
    alert("Registration successful! Please login with demo credentials.")
    router.push("/auth/login")
  }

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Role</h2>
        <p className="text-gray-600">Select the option that best describes you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <div
              key={role.id}
              className={`p-6 border rounded-lg cursor-pointer transition-all ${
                selectedRole === role.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="text-center">
                <Icon className={`h-12 w-12 mx-auto mb-4 ${role.color}`} />
                <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Gender *</Label>
          <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )

  const renderRoleSpecificInfo = () => {
    if (selectedRole === "patient") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Medical Information</h2>
            <p className="text-gray-600">Help us understand your condition better</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type *</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thalassemiaType">Thalassemia Type *</Label>
              <Select
                value={formData.thalassemiaType}
                onValueChange={(value) => setFormData({ ...formData, thalassemiaType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beta-major">Beta Thalassemia Major</SelectItem>
                  <SelectItem value="beta-intermedia">Beta Thalassemia Intermedia</SelectItem>
                  <SelectItem value="alpha-major">Alpha Thalassemia Major</SelectItem>
                  <SelectItem value="alpha-minor">Alpha Thalassemia Minor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosisDate">Diagnosis Date</Label>
              <Input
                id="diagnosisDate"
                type="date"
                value={formData.diagnosisDate}
                onChange={(e) => setFormData({ ...formData, diagnosisDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentHemoglobin">Current Hemoglobin Level (g/dL)</Label>
              <Input
                id="currentHemoglobin"
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                value={formData.currentHemoglobin}
                onChange={(e) => setFormData({ ...formData, currentHemoglobin: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastTransfusion">Last Transfusion Date</Label>
              <Input
                id="lastTransfusion"
                type="date"
                value={formData.lastTransfusion}
                onChange={(e) => setFormData({ ...formData, lastTransfusion: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transfusionFrequency">Transfusion Frequency</Label>
              <Select
                value={formData.transfusionFrequency}
                onValueChange={(value) => setFormData({ ...formData, transfusionFrequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="bi-weekly">Every 2 weeks</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="bi-monthly">Every 2 months</SelectItem>
                  <SelectItem value="quarterly">Every 3 months</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ironChelation">Iron Chelation Therapy</Label>
              <Select
                value={formData.ironChelation}
                onValueChange={(value) => setFormData({ ...formData, ironChelation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select therapy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deferasirox">Deferasirox (Exjade)</SelectItem>
                  <SelectItem value="deferoxamine">Deferoxamine (Desferal)</SelectItem>
                  <SelectItem value="deferiprone">Deferiprone (Ferriprox)</SelectItem>
                  <SelectItem value="combination">Combination Therapy</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                placeholder="Name and phone number"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complications">Complications or Additional Notes</Label>
            <Textarea
              id="complications"
              placeholder="Any complications, allergies, or additional medical information..."
              value={formData.complications}
              onChange={(e) => setFormData({ ...formData, complications: e.target.value })}
            />
          </div>
        </div>
      )
    }

    if (selectedRole === "donor") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Donor Information</h2>
            <p className="text-gray-600">Help us ensure safe donation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type *</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg) *</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 65"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 170"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastDonation">Last Donation Date</Label>
              <Input
                id="lastDonation"
                type="date"
                value={formData.lastDonation}
                onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalConditions">Medical Conditions</Label>
            <Textarea
              id="medicalConditions"
              placeholder="Any medical conditions, allergies, or health issues..."
              value={formData.medicalConditions}
              onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medications">Current Medications</Label>
            <Textarea
              id="medications"
              placeholder="List any medications you're currently taking..."
              value={formData.medications}
              onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
            />
          </div>
        </div>
      )
    }

    if (selectedRole === "hospital") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Hospital Information</h2>
            <p className="text-gray-600">Provide your facility details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalName">Hospital/Blood Bank Name *</Label>
              <Input
                id="hospitalName"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospitalType">Facility Type</Label>
              <Select
                value={formData.hospitalType}
                onValueChange={(value) => setFormData({ ...formData, hospitalType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government Hospital</SelectItem>
                  <SelectItem value="private">Private Hospital</SelectItem>
                  <SelectItem value="blood-bank">Blood Bank</SelectItem>
                  <SelectItem value="clinic">Clinic</SelectItem>
                  <SelectItem value="research">Research Center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedCapacity">Bed Capacity</Label>
              <Input
                id="bedCapacity"
                type="number"
                placeholder="e.g., 200"
                value={formData.bedCapacity}
                onChange={(e) => setFormData({ ...formData, bedCapacity: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodBankCapacity">Blood Bank Capacity (units)</Label>
              <Input
                id="bloodBankCapacity"
                type="number"
                placeholder="e.g., 500"
                value={formData.bloodBankCapacity}
                onChange={(e) => setFormData({ ...formData, bloodBankCapacity: e.target.value })}
              />
            </div>
          </div>
        </div>
      )
    }

    if (selectedRole === "healthcare") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Professional Information</h2>
            <p className="text-gray-600">Tell us about your medical expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization *</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => setFormData({ ...formData, specialization: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hematology">Hematology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="general-practice">General Practice</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNo">Medical License Number *</Label>
              <Input
                id="licenseNo"
                value={formData.licenseNo}
                onChange={(e) => setFormData({ ...formData, licenseNo: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g., 10"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Input
                id="qualifications"
                placeholder="e.g., MBBS, MD"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              />
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              HopeLink
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join our community and make a difference</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-16 h-1 mx-2 ${currentStep > step ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderRoleSelection()}
              {currentStep === 2 && renderBasicInfo()}
              {currentStep === 3 && renderRoleSpecificInfo()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext} disabled={currentStep === 1 && !selectedRole}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit">Create Account</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
