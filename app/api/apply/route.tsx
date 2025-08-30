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

    if (!process.env.RESEND_API_KEY) {
      console.log("[v0] Missing RESEND_API_KEY")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const emailData: any = {
      from: "noreply@hatsgroupllc.com",
      to: ["applications@hatsgroupllc.com"],
      reply_to: [email], // Use reply_to instead of replyTo and wrap in array
      subject: `Job Application: ${role} - ${name}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${role}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Resume:</strong> ${resume ? "Attached" : "Not provided"}</p>
      `,
    }

    // Add resume attachment if provided
    if (resume) {
      const resumeBuffer = await resume.arrayBuffer()
      const resumeBase64 = Buffer.from(resumeBuffer).toString("base64")

      emailData.attachments = [
        {
          filename: resume.name,
          content: resumeBase64,
        },
      ]
    }

    console.log("[v0] Sending email with data:", {
      from: emailData.from,
      to: emailData.to,
      reply_to: emailData.reply_to,
      subject: emailData.subject,
    })

    const result = await resend.emails.send(emailData)

    console.log("[v0] Email sent successfully:", result)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
