"use client"

import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-wider">
            <span
              className="bg-clip-text text-transparent hover:scale-105 transition-all duration-700 ease-out inline-block"
              style={{
                backgroundImage: "linear-gradient(to bottom right, #faefc2, #cdb47b)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = "linear-gradient(to bottom right, #fcf2c9, #d4bb82)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage = "linear-gradient(to bottom right, #faefc2, #cdb47b)"
              }}
            >
              H | G
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
