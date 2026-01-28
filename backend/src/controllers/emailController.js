import { Resend } from "resend"
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendCatalogueEmail = async (req, res) => {
  try {
    const { name, email, phone, location } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" })
    }

    // USER EMAIL
    await resend.emails.send({
      from: "Noble Nautica <no-reply@noblenautica.co.uk>",
      to: email,
      subject: "Thank You for Connecting with Noble Nautica 💙 - WIBI",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #222;">
          <h2>Hello ${name},</h2>

          <p>
            Thank you for sharing your details with <strong>Noble Nautica - WIBI</strong>!
            We truly appreciate your interest and the time you took to reach out.
          </p>

          <p>
            We’re passionate about delivering <strong>premium maritime-inspired products</strong>
            that combine quality, style, and durability — just like the heritage behind Noble Nautica.
          </p>

          <p>
            👉 <a href="https://github.com/muffin1601/noble-nautica-main-clean/releases/download/catalogue-v1/Noble.Nautica.Catlog.1.pdf" target="_blank" style="color:#0a5bd3; font-weight:600;">
              Browse our catalog & collections
            </a>
          </p>

          <p>
            Our team will review your request and be in touch soon.
            If you have any questions, just reply to this email.
          </p>

          <br/>
          <p>
            Warm regards,<br/>
            <strong>Team Noble Nautica - WIBI</strong><br/>
            <em>Crafted with Quality. Inspired by the Sea. 🌊</em>
          </p>
        </div>
      `,
    })

    // ADMIN EMAIL
    await resend.emails.send({
      from: "Noble Nautica <no-reply@noblenautica.co.uk>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Catalogue Request Received 📬- WIBI",
      html: `
        <h2>New Catalogue Request</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Product:</strong> Catalogue</p>
        <br/>
        <p>This enquiry was submitted from the website.</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Email error:", error)
    return res.status(500).json({ error: "Email sending failed" })
  }
}


export const sendEnquiryEmail = async (req, res) => {
  try {
    const { name, email, phone, location } = req.body

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" })
    }

    // USER EMAIL
    await resend.emails.send({
      from: "Noble Nautica - WIBI <no-reply@noblenautica.co.uk>",
      to: email,
      subject: "Thank You for Connecting with Noble Nautica 💙 - WIBI",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #222;">
          <h2>Hello ${name},</h2>

          <p>
            Thank you for sharing your details with <strong>Noble Nautica - WIBI</strong>!
            We truly appreciate your interest and the time you took to reach out.
          </p>

          <p>
            We’re passionate about delivering <strong>premium maritime-inspired products</strong>
            that combine quality, style, and durability — just like the heritage behind Noble Nautica.
          </p>

          <p>
            👉 <a href="https://github.com/muffin1601/noble-nautica-main-clean/releases/download/catalogue-v1/Noble.Nautica.Catlog.1.pdf" target="_blank" style="color:#0a5bd3; font-weight:600;">
              Browse our catalog & collections
            </a>
          </p>

          <p>
            Our team will be in touch soon.
            If you have any questions, just reply to this email.
          </p>

          <br/>
          <p>
            Warm regards,<br/>
            <strong>Team Noble Nautica - WIBI</strong><br/>
            <em>Crafted with Quality. Inspired by the Sea. 🌊</em>
          </p>
        </div>
      `,
    })

    // ADMIN EMAIL
    await resend.emails.send({
      from: "Noble Nautica - WIBI <no-reply@noblenautica.co.uk>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Enquiry Received 📬- WIBI",
      html: `
        <h2>New Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <br/>
        <p>This enquiry was submitted from the website - .</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Email error:", error)
    return res.status(500).json({ error: "Email sending failed" })
  }
}
