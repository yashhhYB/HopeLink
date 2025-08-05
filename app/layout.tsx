import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FloatingChatbot } from "@/components/ai-features/floating-chatbot"
import { GoogleMapsProvider } from "@/components/maps/google-maps-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HopeLink - Revolutionizing Thalassemia Care",
  description:
    "AI-driven, compassionate digital platform connecting patients, donors, hospitals, and healthcare professionals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleMapsProvider>
          {children}
          <FloatingChatbot />
        </GoogleMapsProvider>
      </body>
    </html>
  )
}
