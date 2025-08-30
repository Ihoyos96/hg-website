"use client"

import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-6">
          <section className="py-24 md:py-32">
            <div className="space-y-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-wider mb-8">
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

              <div className="max-w-3xl mx-auto">
                <p
                  className="text-base md:text-lg lg:text-xl leading-loose text-balance font-light font-serif text-center tracking-wide"
                  style={{ color: "#e8e8e8" }}
                >
                  Hats Group is a technology firm dedicated to advancing innovation in artificial intelligence,
                  automation, and defense systems. We design and develop solutions that address complex challenges and
                  enable progress across critical industries.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
