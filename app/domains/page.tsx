"use client"

import { Navigation } from "@/components/navigation"
import { useState } from "react"

const domains = [
  {
    name: "AI & Automation",
    description: "Systems that think faster, respond better, and adapt autonomously.",
  },
  {
    name: "Defense",
    description: "Software, infrastructure, and edge capabilities designed for resilience.",
  },
  {
    name: "Strategic Capital & Acquisitions",
    description: "We identify, acquire, and scale ventures positioned at inflection points.",
  },
]

export default function DomainsPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-6">
          <section className="py-24 md:py-32">
            <div className="text-center mb-16">
              <h1
                className="font-serif text-xl md:text-2xl font-bold mb-8 bg-clip-text text-transparent transition-all duration-700 ease-out"
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
                Core Domains
              </h1>
            </div>

            <div className="space-y-8">
              {domains.map((domain, index) => (
                <div key={domain.name} className="space-y-3">
                  <button
                    onClick={() => toggleItem(index)}
                    className="text-left w-full group flex items-center justify-between"
                  >
                    <div
                      className="font-serif text-base md:text-lg font-medium transition-all duration-300 cursor-pointer tracking-wider"
                      style={{
                        color: "#d1d5db",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#f3f4f6"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#d1d5db"
                      }}
                    >
                      {index + 1}. {domain.name}
                    </div>

                    <div
                      className="transition-transform duration-300 ease-out"
                      style={{
                        transform: openItems.includes(index) ? "rotate(90deg)" : "rotate(0deg)",
                        color: "#d1d5db",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </div>
                  </button>

                  {openItems.includes(index) && (
                    <div className="pl-6 pt-2 animate-in slide-in-from-top-2 duration-500 ease-out">
                      <p
                        className="leading-relaxed text-balance font-serif text-sm md:text-base opacity-90"
                        style={{
                          color: "#c0c0c0",
                        }}
                      >
                        {domain.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
