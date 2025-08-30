import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API route called")

    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const role = formData.get("role") as string
    const resume = formData.get("resume") as File

    console.log("[v0] Application received:", { name, email, role, resumeName: resume?.name })

    if (!name || !email || !role) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Convert resume to base64 for attachment
    let resumeAttachment = null
    if (resume && resume.size > 0) {
      const resumeBuffer = await resume.arrayBuffer()
      const resumeBase64 = Buffer.from(resumeBuffer).toString("base64")
      resumeAttachment = {
        filename: resume.name,
        content: resumeBase64,
      }
      console.log("[v0] Resume processed:", resume.name)
    }

    console.log("[v0] Preparing email...")

    const emailData = {
      from: "noreply@hatsgroupllc.com",
      to: ["applications@hatsgroupllc.com"],
      subject: `Job Application: ${role} - ${name}`,
      headers: {
        "Reply-To": email,
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Job Application</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Position:</strong> ${role}</p>
            <p><strong>Applicant Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          
          <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Note:</strong> Reply to this email to respond directly to the applicant at ${email}
            </p>
          </div>
          
          ${resume ? "<p><strong>Resume:</strong> See attached file</p>" : "<p><em>No resume attached</em></p>"}
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #888;">
            This application was submitted through the Hats Group website.
          </p>
        </div>
      `,
      ...(resumeAttachment && { attachments: [resumeAttachment] }),
    }

    console.log("[v0] Sending email...")
    const result = await resend.emails.send(emailData)
    console.log("[v0] Email sent successfully:", result)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send application", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
