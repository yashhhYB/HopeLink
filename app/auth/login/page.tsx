"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Users, Building2, Shield, Stethoscope, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState("patient")
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const router = useRouter()

  const demoCredentials = {
    patient: { email: "patient@demo.com", password: "demo123" },
    donor: { email: "donor@demo.com", password: "demo123" },
    hospital: { email: "hospital@demo.com", password: "demo123" },
    admin: { email: "admin@demo.com", password: "demo123" },
    healthcare: { email: "doctor@demo.com", password: "demo123" },
  }

  const roles = [
    {
      id: "patient",
      title: "Patient",
      icon: Heart,
      color: "text-red-600",
      description: "Access your health dashboard",
    },
    {
      id: "donor",
      title: "Blood Donor",
      icon: Users,
      color: "text-blue-600",
      description: "Track donations and earn rewards",
    },
    {
      id: "hospital",
      title: "Hospital/Blood Bank",
      icon: Building2,
      color: "text-green-600",
      description: "Manage inventory and campaigns",
    },
    {
      id: "admin",
      title: "Administrator",
      icon: Shield,
      color: "text-purple-600",
      description: "System administration",
    },
    {
      id: "healthcare",
      title: "Healthcare Professional",
      icon: Stethoscope,
      color: "text-orange-600",
      description: "Patient consultations",
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const demo = demoCredentials[selectedRole as keyof typeof demoCredentials]

    if (credentials.email === demo.email && credentials.password === demo.password) {
      // Store user session
      localStorage.setItem(
        "hopelink_user",
        JSON.stringify({
          role: selectedRole,
          email: credentials.email,
          loginTime: new Date().toISOString(),
        }),
      )

      // Redirect to appropriate dashboard
      router.push(`/dashboard/${selectedRole}`)
    } else {
      alert("Invalid credentials. Please use demo credentials.")
    }
  }

  const useDemoCredentials = () => {
    const demo = demoCredentials[selectedRole as keyof typeof demoCredentials]
    setCredentials({ email: demo.email, password: demo.password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              HopeLink
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Your Role</CardTitle>
              <CardDescription>Choose your account type to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roles.map((role) => {
                  const Icon = role.icon
                  return (
                    <div
                      key={role.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedRole === role.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${role.color}`} />
                        <div>
                          <h3 className="font-semibold">{role.title}</h3>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Sign In as {roles.find((r) => r.id === selectedRole)?.title}
                </Button>

                <Button type="button" variant="outline" className="w-full bg-transparent" onClick={useDemoCredentials}>
                  Use Demo Credentials
                </Button>
              </form>

              {/* Demo Credentials Display */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Demo Credentials:</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Email:</strong> {demoCredentials[selectedRole as keyof typeof demoCredentials].email}
                  </p>
                  <p>
                    <strong>Password:</strong> {demoCredentials[selectedRole as keyof typeof demoCredentials].password}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
