import { useEffect, useState } from "react"
import "./styles/ContactSection.css"
import { Mail, Phone, MapPin } from "lucide-react"
import { supabase } from "../lib/supabase"
import api from "../api/axios"

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const sendEnquiryEmail = async () => {
    return api.post("/email/send-enquiry", {
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      message: form.message
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from("catalogue_requests")
      .insert([{
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location,
        
      }])

    if (error) {
      console.error("Enquiry save failed:", error)
      alert("Something went wrong. Please try again.")
      setLoading(false)
      return
    }

    try {
      await sendEnquiryEmail()
      console.log("Enquiry email sent")
    } catch (err) {
      console.error("Enquiry email failed:", err.response?.data || err.message)
      // Do NOT block user
    }

    setLoading(false)
    alert("Thank you! We’ll get back to you shortly.")

    // Reset form
    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      message: ""
    })
  }

  return (
    <section className="contact-dark">
      <div className="contact-wrapper">

        <div className="contact-left reveal">
          <span className="contact-tag">[ Get In Touch ]</span>

          <h2 className="contact-heading">
            Let’s build your <br /> <span className="contact-highlight">perfect pool.</span>
          </h2>

          <p className="contact-desc">
            From pool design and installation to maintenance and upgrades,
            our experts are here to help you.
          </p>

          <div className="contact-cards">
            <div className="contact-card reveal delay-1">
              <div className="icon-box icon-float">
                <MapPin size={22} />
              </div>
              <div className="contact-card-text">
                <h4>Our Location</h4>
                <p>9 Hill Lane, Ruislip, HA4 7JJ, United Kingdom</p>
              </div>
            </div>

            <div className="contact-card reveal delay-2">
              <div className="icon-box icon-pulse">
                <Mail size={22} />
              </div>
              <div>
                <h4>Email</h4>
                <p>noblenautica13@gmail.com</p>
              </div>
            </div>

            <div className="contact-card reveal delay-3">
              <div className="icon-box icon-float">
                <Phone size={22} />
              </div>
              <div>
                <h4>Call Us</h4>
                <p>+44 1234 567 890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-box reveal delay-2">
          <h3 className="contact-form-title">Request a Consultation</h3>

          <p className="contact-form-desc">
            Tell us about your project and our team will get back to you.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                className="form-input"
                name="name"
                placeholder="Your Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="form-input"
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="form-input"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                className="form-input"
                name="location"
                placeholder="City / Location"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <textarea
              className="form-textarea"
              name="message"
              rows="4"
              placeholder="Describe your pool requirements"
              value={form.message}
              onChange={handleChange}
            />

            <button className="form-button" type="submit" disabled={loading}>
              {loading ? "Sending..." : "SEND ENQUIRY"}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
