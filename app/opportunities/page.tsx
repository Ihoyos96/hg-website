"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { useState } from "react"

const roles = [
  {
    title: "Software Engineer III",
    compensation: "$100K - $160K + Performance Equity",
    location: "San Juan, PR",
    description:
      "Experienced software engineer skilled in AI/ML applications, real-time data operations, and cloud-scale system architecture, with a focus on building secure, resilient infrastructure.",
  },
  {
    title: "Software Engineer II",
    compensation: "$60K - $100K + Performance Equity",
    location: "San Juan, PR",
    description:
      "Proficient software engineer with hands-on experience in AI/ML applications, cloud infrastructure, and real-time data systems, contributing to the design and implementation of secure, scalable architectures.",
  },
]

export default function OpportunitiesPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const openApplicationForm = (roleTitle: string) => {
    setSelectedRole(roleTitle)
    setShowApplicationForm(true)
  }

  const closeApplicationForm = () => {
    setShowApplicationForm(false)
    setSelectedRole("")
    setFormData({ name: "", email: "", resume: null })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files && files[0] && files[0].type === "application/pdf") {
      setFormData({ ...formData, resume: files[0] })
    }
  }

  const handleFileInputClick = () => {
    const fileInput = document.getElementById("resume-upload") as HTMLInputElement
    fileInput?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("role", selectedRole)
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume)
      }

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        alert("Application submitted successfully!")
        closeApplicationForm()
      } else {
        alert("Failed to submit application. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-6">
          <section className="py-24 md:py-32">
            <div className="text-center mb-20">
              <h1
                className="font-serif text-xl md:text-2xl font-bold mb-12 bg-clip-text text-transparent transition-all duration-700 ease-out"
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
                Open Positions
              </h1>
            </div>

            <div className="grid gap-8">
              {roles.map((role, index) => (
                <div
                  key={role.title}
                  className="border border-opacity-20 rounded-lg p-8 transition-all duration-300 hover:border-opacity-30"
                  style={{ borderColor: "#666666" }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-serif text-lg font-medium" style={{ color: "#e8e8e8" }}>
                      {role.title}
                    </h3>
                    <button
                      onClick={() => openApplicationForm(role.title)}
                      className="px-4 py-2 border border-opacity-40 rounded font-serif text-sm transition-all duration-300 hover:border-opacity-60 hover:bg-opacity-5"
                      style={{
                        borderColor: "#666666",
                        color: "#e8e8e8",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(200, 200, 200, 0.1)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}
                    >
                      Apply Here
                    </button>
                  </div>

                  <p className="font-serif text-sm leading-relaxed mb-4" style={{ color: "#c0c0c0" }}>
                    {role.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-serif" style={{ color: "#d0d0d0" }}>
                        Compensation:{" "}
                      </span>
                      <span className="font-serif" style={{ color: "#e8e8e8" }}>
                        {role.compensation}
                      </span>
                    </div>
                    <div>
                      <span className="font-serif" style={{ color: "#d0d0d0" }}>
                        Location:{" "}
                      </span>
                      <span className="font-serif" style={{ color: "#e8e8e8" }}>
                        {role.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-12 border-t text-center" style={{ borderColor: "rgba(200, 200, 200, 0.3)" }}>
              <p className="font-serif text-sm leading-relaxed" style={{ color: "#c0c0c0" }}>
                Get in touch <span style={{ color: "#e8e8e8" }}>contact@hatsgroupllc.com</span>
              </p>
            </div>
          </section>
        </div>
      </main>

      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="max-w-md w-full rounded-lg p-8 relative"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(200, 200, 200, 0.3)" }}
          >
            <button
              onClick={closeApplicationForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-serif text-lg font-medium mb-6" style={{ color: "#e8e8e8" }}>
              Apply for {selectedRole}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-serif text-sm mb-2" style={{ color: "#e8e8e8" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-opacity-30 bg-transparent font-serif text-sm"
                  style={{ borderColor: "#666", color: "#e8e8e8" }}
                />
              </div>

              <div>
                <label className="block font-serif text-sm mb-2" style={{ color: "#e8e8e8" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-opacity-30 bg-transparent font-serif text-sm"
                  style={{ borderColor: "#666", color: "#e8e8e8" }}
                />
              </div>

              <div>
                <label className="block font-serif text-sm mb-2" style={{ color: "#e8e8e8" }}>
                  Resume (PDF)
                </label>
                <div
                  className={`w-full p-8 rounded border-2 border-dashed cursor-pointer transition-all duration-300 ${
                    isDragOver ? "border-opacity-60 bg-opacity-10" : "border-opacity-30"
                  }`}
                  style={{
                    borderColor: "#666",
                    backgroundColor: isDragOver ? "rgba(200, 200, 200, 0.1)" : "transparent",
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleFileInputClick}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-8 h-8 mb-3" fill="none" stroke="#c0c0c0" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {formData.resume ? (
                      <div>
                        <p className="font-serif text-sm" style={{ color: "#e8e8e8" }}>
                          {formData.resume.name}
                        </p>
                        <p className="font-serif text-xs mt-1" style={{ color: "#c0c0c0" }}>
                          Click to change file
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-serif text-sm" style={{ color: "#e8e8e8" }}>
                          Drop your resume here
                        </p>
                        <p className="font-serif text-xs mt-1" style={{ color: "#c0c0c0" }}>
                          or click to browse
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  required
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeApplicationForm}
                  className="flex-1 py-2 px-4 rounded border border-opacity-40 font-serif text-sm transition-all duration-300"
                  style={{ borderColor: "#666", color: "#c0c0c0" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 px-4 rounded border border-opacity-40 font-serif text-sm transition-all duration-300 hover:border-opacity-60"
                  style={{
                    borderColor: "#666666",
                    color: "#e8e8e8",
                    backgroundColor: isSubmitting ? "rgba(200, 200, 200, 0.1)" : "transparent",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
