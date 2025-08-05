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
import { User, Heart, Activity, Shield, FileText, CheckCircle, ArrowLeft, ArrowRight, Droplets } from "lucide-react"

interface DonorData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  bloodType: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string

  // Health Information
  weight: string
  height: string
  chronicConditions: string[]
  medications: string[]
  allergies: string[]
  recentIllness: string

  // Donation History
  previousDonations: string
  lastDonationDate: string
  donationFrequency: string
  donationReactions: string

  // Lifestyle
  smokingStatus: string
  alcoholConsumption: string
  recentTravel: string[]
  riskFactors: string[]

  // Availability
  preferredDonationTimes: string[]
  availableDays: string[]
  emergencyAvailability: boolean

  // Consent
  consentGiven: boolean
  dataSharing: boolean
  emergencyContact: boolean
}

const initialData: DonorData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  bloodType: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  weight: "",
  height: "",
  chronicConditions: [],
  medications: [],
  allergies: [],
  recentIllness: "",
  previousDonations: "",
  lastDonationDate: "",
  donationFrequency: "",
  donationReactions: "",
  smokingStatus: "",
  alcoholConsumption: "",
  recentTravel: [],
  riskFactors: [],
  preferredDonationTimes: [],
  availableDays: [],
  emergencyAvailability: false,
  consentGiven: false,
  dataSharing: false,
  emergencyContact: false,
}

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Health Status", icon: Heart },
  { id: 3, title: "Donation History", icon: Droplets },
  { id: 4, title: "Lifestyle", icon: Activity },
  { id: 5, title: "Availability", icon: Shield },
  { id: 6, title: "Consent", icon: FileText },
  { id: 7, title: "Review", icon: CheckCircle },
]

export function DonorProfileForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<DonorData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = (currentStep / steps.length) * 100

  const updateFormData = (field: keyof DonorData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayUpdate = (field: keyof DonorData, value: string, checked: boolean) => {
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
    alert("Donor profile created successfully!")
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </SelectContent>
                </Select>
              </div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
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

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  placeholder="12345"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                  placeholder="150"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateFormData("height", e.target.value)}
                  placeholder="70"
                />
              </div>
            </div>

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
                  "HIV/AIDS",
                  "Hepatitis",
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
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications.join(", ")}
                onChange={(e) => updateFormData("medications", e.target.value.split(", ").filter(Boolean))}
                placeholder="List your current medications, separated by commas"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-semibold">Known Allergies</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Penicillin", "Aspirin", "Latex", "Food Allergies", "Environmental", "None"].map((allergy) => (
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
              <Label htmlFor="recentIllness">Recent Illness or Surgery</Label>
              <Select value={formData.recentIllness} onValueChange={(value) => updateFormData("recentIllness", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any recent illness or surgery?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="cold-flu">Cold/Flu (within 2 weeks)</SelectItem>
                  <SelectItem value="surgery">Surgery (within 6 months)</SelectItem>
                  <SelectItem value="dental">Dental work (within 3 days)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="previousDonations">Previous Blood Donations</Label>
              <Select
                value={formData.previousDonations}
                onValueChange={(value) => updateFormData("previousDonations", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Have you donated blood before?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="1-5">1-5 times</SelectItem>
                  <SelectItem value="6-20">6-20 times</SelectItem>
                  <SelectItem value="21-50">21-50 times</SelectItem>
                  <SelectItem value="50+">More than 50 times</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="lastDonationDate">Last Donation Date</Label>
              <Input
                id="lastDonationDate"
                type="date"
                value={formData.lastDonationDate}
                onChange={(e) => updateFormData("lastDonationDate", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="donationFrequency">Preferred Donation Frequency</Label>
              <Select
                value={formData.donationFrequency}
                onValueChange={(value) => updateFormData("donationFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How often would you like to donate?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="as-needed">As needed (emergency only)</SelectItem>
                  <SelectItem value="quarterly">Every 3 months</SelectItem>
                  <SelectItem value="biannually">Every 6 months</SelectItem>
                  <SelectItem value="annually">Once a year</SelectItem>
                  <SelectItem value="maximum">Maximum allowed frequency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="donationReactions">Previous Donation Reactions</Label>
              <Select
                value={formData.donationReactions}
                onValueChange={(value) => updateFormData("donationReactions", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any reactions to previous donations?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No reactions</SelectItem>
                  <SelectItem value="mild">Mild (dizziness, fatigue)</SelectItem>
                  <SelectItem value="moderate">Moderate reactions</SelectItem>
                  <SelectItem value="severe">Severe reactions</SelectItem>
                  <SelectItem value="not-applicable">Not applicable</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="former">Former smoker (quit 1+ years ago)</SelectItem>
                  <SelectItem value="recent-former">Recent former smoker (quit within 1 year)</SelectItem>
                  <SelectItem value="current">Current smoker</SelectItem>
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
              <Label className="text-base font-semibold">Recent Travel (within 3 years)</Label>
              <p className="text-sm text-gray-600 mb-3">Select all countries/regions visited</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Europe",
                  "Asia",
                  "Africa",
                  "South America",
                  "Central America",
                  "Caribbean",
                  "Middle East",
                  "Australia/Oceania",
                  "None",
                ].map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={region}
                      checked={formData.recentTravel.includes(region)}
                      onCheckedChange={(checked) => handleArrayUpdate("recentTravel", region, checked as boolean)}
                    />
                    <Label htmlFor={region} className="text-sm">
                      {region}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Risk Factors</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that apply (confidential)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "IV drug use",
                  "Multiple sexual partners",
                  "Recent tattoo/piercing",
                  "Blood transfusion received",
                  "Organ transplant",
                  "None",
                ].map((factor) => (
                  <div key={factor} className="flex items-center space-x-2">
                    <Checkbox
                      id={factor}
                      checked={formData.riskFactors.includes(factor)}
                      onCheckedChange={(checked) => handleArrayUpdate("riskFactors", factor, checked as boolean)}
                    />
                    <Label htmlFor={factor} className="text-sm">
                      {factor}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Preferred Donation Times</Label>
              <p className="text-sm text-gray-600 mb-3">Select all that work for you</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Early Morning (6-9 AM)", "Morning (9-12 PM)", "Afternoon (12-5 PM)", "Evening (5-8 PM)"].map(
                  (time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={formData.preferredDonationTimes.includes(time)}
                        onCheckedChange={(checked) =>
                          handleArrayUpdate("preferredDonationTimes", time, checked as boolean)
                        }
                      />
                      <Label htmlFor={time} className="text-sm">
                        {time}
                      </Label>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Available Days</Label>
              <p className="text-sm text-gray-600 mb-3">Select all days you're typically available</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.availableDays.includes(day)}
                      onCheckedChange={(checked) => handleArrayUpdate("availableDays", day, checked as boolean)}
                    />
                    <Label htmlFor={day} className="text-sm">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="emergencyAvailability"
                checked={formData.emergencyAvailability}
                onCheckedChange={(checked) => updateFormData("emergencyAvailability", checked)}
              />
              <div>
                <Label htmlFor="emergencyAvailability" className="text-base font-semibold">
                  Emergency Availability
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  I am willing to be contacted for emergency blood donations outside of my normal availability.
                </p>
              </div>
            </div>
          </div>
        )

      case 6:
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
                  Blood Donation Consent
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  I consent to donate blood and understand the donation process, potential risks, and benefits. I
                  confirm that all information provided is accurate to the best of my knowledge.
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
                  I agree to share my anonymized donation data for research purposes to improve blood donation processes
                  and patient outcomes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="emergencyContact"
                checked={formData.emergencyContact}
                onCheckedChange={(checked) => updateFormData("emergencyContact", checked)}
              />
              <div>
                <Label htmlFor="emergencyContact" className="text-base font-semibold">
                  Emergency Contact Permission
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  I authorize HopeLink to contact me via phone, email, or SMS for urgent blood donation requests that
                  match my blood type and availability.
                </p>
              </div>
            </div>
          </div>
        )

      case 7:
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
                  <p>
                    <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Health Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Weight:</strong> {formData.weight} lbs
                  </p>
                  <p>
                    <strong>Height:</strong> {formData.height} inches
                  </p>
                  <p>
                    <strong>Chronic Conditions:</strong>{" "}
                    {formData.chronicConditions.length > 0 ? formData.chronicConditions.join(", ") : "None"}
                  </p>
                  <p>
                    <strong>Allergies:</strong> {formData.allergies.length > 0 ? formData.allergies.join(", ") : "None"}
                  </p>
                  <p>
                    <strong>Recent Illness:</strong> {formData.recentIllness || "None"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Donation History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Previous Donations:</strong> {formData.previousDonations}
                  </p>
                  <p>
                    <strong>Last Donation:</strong> {formData.lastDonationDate || "Never"}
                  </p>
                  <p>
                    <strong>Preferred Frequency:</strong> {formData.donationFrequency}
                  </p>
                  <p>
                    <strong>Previous Reactions:</strong> {formData.donationReactions}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <strong>Preferred Times:</strong>{" "}
                    {formData.preferredDonationTimes.length > 0
                      ? formData.preferredDonationTimes.join(", ")
                      : "Not specified"}
                  </p>
                  <p>
                    <strong>Available Days:</strong>{" "}
                    {formData.availableDays.length > 0 ? formData.availableDays.join(", ") : "Not specified"}
                  </p>
                  <div className="flex items-center">
                    <Badge variant={formData.emergencyAvailability ? "default" : "secondary"}>
                      {formData.emergencyAvailability ? "✓ Emergency Available" : "✗ Regular Only"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Consent Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Badge variant={formData.consentGiven ? "default" : "destructive"}>
                      {formData.consentGiven ? "✓ Donation Consent Given" : "✗ Consent Required"}
                    </Badge>
                    <Badge variant={formData.dataSharing ? "default" : "secondary"}>
                      {formData.dataSharing ? "✓ Data Sharing Agreed" : "✗ Data Sharing Declined"}
                    </Badge>
                    <Badge variant={formData.emergencyContact ? "default" : "secondary"}>
                      {formData.emergencyContact ? "✓ Emergency Contact OK" : "✗ No Emergency Contact"}
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
            <CardTitle className="text-2xl">Blood Donor Registration</CardTitle>
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
