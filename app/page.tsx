"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Building2, Shield, Stethoscope, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "patient",
      title: "Patient",
      description: "Access your transfusion schedule, find blood availability, and connect with healthcare providers",
      icon: Heart,
      color: "bg-red-50 border-red-200 hover:bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: "donor",
      title: "Blood Donor",
      description: "Track your donations, earn rewards, and help save lives in your community",
      icon: Users,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "hospital",
      title: "Hospital/Blood Bank",
      description: "Manage inventory, organize donation drives, and monitor patient needs",
      icon: Building2,
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "admin",
      title: "Administrator",
      description: "System-wide analytics, predictive insights, and platform management",
      icon: Shield,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "healthcare",
      title: "Healthcare Professional",
      description: "Patient consultations, medical records, and treatment planning",
      icon: Stethoscope,
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                HopeLink
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
              <Button variant="outline">Emergency SOS</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Revolutionizing Thalassemia Care
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-driven, compassionate digital platform connecting patients, donors, hospitals, and healthcare
            professionals through intelligent matchmaking and predictive care models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Emergency SOS
            </Button>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-300 ${role.color} ${
                    selectedRole === role.id ? "ring-2 ring-blue-500 scale-105" : ""
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="text-center">
                    <Icon className={`h-12 w-12 mx-auto mb-4 ${role.iconColor}`} />
                    <CardTitle className="text-xl">{role.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-4">{role.description}</CardDescription>
                    <Link href={`/dashboard/${role.id}`}>
                      <Button className="w-full bg-transparent" variant="outline">
                        Access Dashboard
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AI-powered donor-patient matching based on location, blood type, and urgency
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Gamified Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Badges, leaderboards, and NFTs to motivate and reward blood donors
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Real-time Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Live blood stock tracking and automated alerts for hospitals</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">AI forecasting for blood demand and transfusion scheduling</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">HopeLink</span>
              </div>
              <p className="text-gray-400">Connecting hearts, saving lives through technology and compassion.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Emergency Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 1800-HOPELINK</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@hopelink.org</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HopeLink. All rights reserved. Built with ❤️ for Thalassemia warriors.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
