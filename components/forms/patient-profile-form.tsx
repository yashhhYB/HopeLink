"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Heart,
  Activity,
  Pill,
  AlertTriangle,
  FileText,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

interface PatientData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  bloodType: string
  phone: string
  email: string
  emergencyContact: string
  emergencyPhone: string

  // Medical History
  chronicConditions: string[]
  previousSurgeries: string[]
  allergies: string[]
  currentMedications: string[]

  // Blood-related Information
  previousTransfusions: string
  transfusionReactions: string
  lastBloodTest: string
  hemoglobinLevel: string

  // Lifestyle Factors
  smokingStatus: string
  alcoholConsumption: string
  exerciseFrequency: string
  dietaryRestrictions: string[]

  // Insurance & Consent
  insuranceProvider: string
  policyNumber: string
  consentGiven: boolean
  dataSharing: boolean
}

const initialData: PatientData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  bloodType: "",
  phone: "",
  email: "",
  emergencyContact: "",
  emergencyPhone: "",
  chronicConditions: [],
  previousSurgeries: [],
  allergies: [],
  currentMedications: [],
  previousTransfusions: "",
  transfusionReactions: "",
  lastBloodTest: "",
  hemoglobinLevel: "",
  smokingStatus: "",
  alcoholConsumption: "",
  exerciseFrequency: "",
  dietaryRestrictions: [],
  insuranceProvider: "",
  policyNumber: "",
  consentGiven: false,
  dataSharing: false,
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Medical History", icon: Heart },
  { id: 3, title: "Blood Information", icon: Activity },
  { id: 4, title: "Lifestyle", icon: Pill },
  { id: 5, title: "Emergency Contacts", icon: AlertTriangle },
  { id: 6, title: "Insurance", icon: Shield },
  { id: 7, title: "Consent", icon: FileText },
  { id: 8, title: "Review", icon: CheckCircle },
]

export function PatientProfileForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<PatientData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = (currentStep / steps.length) * 100

  const updateFormData = (field: keyof PatientData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayUpdate = (field: keyof PatientData, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[]
      if (checked) {
        return { ...prev, [field]: [...currentArray, value] }
      } else {
        return { ...prev, [field]: currentArray.filter((item) => item !== value) }
      }
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Patient profile created successfully!")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => updateFormData("bloodType", value)}>
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
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Chronic Conditions</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Diabetes",
                  "Hypertension",
                  "Heart Disease",
                  "Kidney Disease",
                  "Liver Disease",
                  "Cancer",
                  "Autoimmune Disorders",
                  "Blood Disorders",
                  "None",
                ].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.chronicConditions.includes(condition)}
                      onCheckedChange={(checked) =>
                        handleArrayUpdate("chronicConditions", condition, checked as boolean)
                      }
                    />
                    <Label htmlFor={condition} className="text-sm">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Previous Surgeries</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Cardiac Surgery",
                  "Orthopedic Surgery",
                  "Abdominal Surgery",
                  "Brain Surgery",
                  "Transplant Surgery",
                  "Emergency Surgery",
                  "Elective Surgery",
                  "None",
                ].map((surgery) => (
                  <div key={surgery} className="flex items-center space-x-2">
                    <Checkbox
                      id={surgery}
                      checked={formData.previousSurgeries.includes(surgery)}
                      onCheckedChange={(checked) => handleArrayUpdate("previousSurgeries", surgery, checked as boolean)}
                    />
                    <Label htmlFor={surgery} className="text-sm">
                      {surgery}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Known Allergies</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Penicillin",
                  "Aspirin",
                  "Latex",
                  "Food Allergies",
                  "Environmental",
                  "Blood Products",
                  "Anesthesia",
                  "None",
                ].map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox
                      id={allergy}
                      checked={formData.allergies.includes(allergy)}
                      onCheckedChange={(checked) => handleArrayUpdate("allergies", allergy, checked as boolean)}
                    />
                    <Label htmlFor={allergy} className="text-sm">
                      {allergy}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="currentMedications">Current Medications</Label>
              <Textarea
                id="currentMedications"
                value={formData.currentMedications.join(", ")}
                onChange={(e) => updateFormData("currentMedications", e.target.value.split(", ").filter(Boolean))}
                placeholder="List your current medications, separated by commas"
                rows={3}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="previousTransfusions">Previous Blood Transfusions</Label>
              <Select
                value={formData.previousTransfusions}
                onValueChange={(value) => updateFormData("previousTransfusions", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Have you had blood transfusions before?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="once">Once</SelectItem>
                  <SelectItem value="2-5">2-5 times</SelectItem>
                  <SelectItem value="more-than-5">More than 5 times</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transfusionReactions">Transfusion Reactions</Label>
              <Select
                value={formData.transfusionReactions}
                onValueChange={(value) => updateFormData("transfusionReactions", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any reactions to previous transfusions?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No reactions</SelectItem>
                  <SelectItem value="mild">Mild reactions (fever, chills)</SelectItem>
                  <SelectItem value="moderate">Moderate reactions</SelectItem>
                  <SelectItem value="severe">Severe reactions</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                  <SelectItem value="not-applicable">Not applicable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastBloodTest">Last Blood Test Date</Label>
                <Input
                  id="lastBloodTest"
                  type="date"
                  value={formData.lastBloodTest}
                  onChange={(e) => updateFormData("lastBloodTest", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hemoglobinLevel">Recent Hemoglobin Level (g/dL)</Label>
                <Input
                  id="hemoglobinLevel"
                  type="number"
                  step="0.1"
                  value={formData.hemoglobinLevel}
                  onChange={(e) => updateFormData("hemoglobinLevel", e.target.value)}
                  placeholder="e.g., 12.5"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="smokingStatus">Smoking Status</Label>
              <Select value={formData.smokingStatus} onValueChange={(value) => updateFormData("smokingStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select smoking status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never smoked</SelectItem>
                  <SelectItem value="former">Former smoker</SelectItem>
                  <SelectItem value="current">Current smoker</SelectItem>
                  <SelectItem value="occasional">Occasional smoker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
              <Select
                value={formData.alcoholConsumption}
                onValueChange={(value) => updateFormData("alcoholConsumption", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alcohol consumption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="occasional">Occasional (1-2 drinks/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (3-7 drinks/week)</SelectItem>
                  <SelectItem value="heavy">Heavy (8+ drinks/week)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
              <Select
                value={formData.exerciseFrequency}
                onValueChange={(value) => updateFormData("exerciseFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often do you exercise?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No regular exercise</SelectItem>
                  <SelectItem value="1-2">1-2 times per week</SelectItem>
                  <SelectItem value="3-4">3-4 times per week</SelectItem>
                  <SelectItem value="5+">5+ times per week</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-semibold">Dietary Restrictions</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Vegetarian",
                  "Vegan",
                  "Gluten-free",
                  "Dairy-free",
                  "Nut allergies",
                  "Religious restrictions",
                  "Low sodium",
                  "None",
                ].map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox
                      id={restriction}
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onCheckedChange={(checked) =>
                        handleArrayUpdate("dietaryRestrictions", restriction, checked as boolean)
                      }
                    />
                    <Label htmlFor={restriction} className="text-sm">
                      {restriction}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                  placeholder="Full name of emergency contact"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => updateFormData("emergencyPhone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={(e) => updateFormData("insuranceProvider", e.target.value)}
                placeholder="e.g., Blue Cross Blue Shield"
              />
            </div>
            <div>
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                value={formData.policyNumber}
                onChange={(e) => updateFormData("policyNumber", e.target.value)}
                placeholder="Your insurance policy number"
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consentGiven"
                checked={formData.consentGiven}
                onCheckedChange={(checked) => updateFormData("consentGiven", checked)}
              />
              <div>
                <Label htmlFor="consentGiven" className="text-base font-semibold">
                  Medical Treatment Consent
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  I consent to receive medical treatment including blood transfusions if medically necessary. I
                  understand the risks and benefits associated with blood transfusions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="dataSharing"
                checked={formData.dataSharing}
                onCheckedChange={(checked) => updateFormData("dataSharing", checked)}
              />
              <div>
                <Label htmlFor="dataSharing" className="text-base font-semibold">
                  Data Sharing Agreement
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  I agree to share my anonymized medical data for research purposes to improve blood transfusion
                  outcomes and patient care.
                </p>
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Review Your Information</h3>
              <p className="text-gray-600">Please review all information before submitting</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {formData.dateOfBirth}
                  </p>
                  <p>
                    <strong>Gender:</strong> {formData.gender}
                  </p>
                  <p>
                    <strong>Blood Type:</strong> {formData.bloodType}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Chronic Conditions:</strong>{" "}
                    {formData.chronicConditions.length > 0 ? formData.chronicConditions.join(", ") : "None"}
                  </p>
                  <p>
                    <strong>Allergies:</strong> {formData.allergies.length > 0 ? formData.allergies.join(", ") : "None"}
                  </p>
                  <p>
                    <strong>Previous Transfusions:</strong> {formData.previousTransfusions}
                  </p>
                  <p>
                    <strong>Hemoglobin Level:</strong> {formData.hemoglobinLevel || "Not provided"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Name:</strong> {formData.emergencyContact}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.emergencyPhone}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Consent Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant={formData.consentGiven ? "default" : "destructive"}>
                      {formData.consentGiven ? "✓ Consent Given" : "✗ Consent Required"}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={formData.dataSharing ? "default" : "secondary"}>
                      {formData.dataSharing ? "✓ Data Sharing Agreed" : "✗ Data Sharing Declined"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Patient Profile Registration</CardTitle>
            <Badge variant="outline">
              {currentStep} of {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent>
          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                    currentStep === step.id
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : currentStep > step.id
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-gray-100 text-gray-600 border border-gray-300"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {step.title}
                </div>
              )
            })}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{steps[currentStep - 1].title}</h3>
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                disabled={!formData.consentGiven || isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Profile"}
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
