import { useEffect, useState } from "react"
import "./styles/EnquiryModal.css"
import { User, Mail, Phone, MapPin } from "lucide-react"
import { supabase } from "../lib/supabase"
import api from "../api/axios"


export default function CatalogueLeadModal({
  open,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  })
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [open])

  if (!open) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const sendCatalogueEmail = async () => {
  return api.post("/email/send-catalogue-email", {
    name: form.name,
    email: form.email,
    phone: form.phone,
    location: form.location
  })
}


const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  const { error } = await supabase
    .from("catalogue_requests")
    .insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        location: form.location
      }
    ])

  if (error) {
    console.error("Lead capture failed:", error.message)
    alert("Something went wrong. Please try again.")
    setLoading(false)
    return
  }

  try {
    await sendCatalogueEmail()
    console.log("Email sent successfully")
  } catch (err) {
    console.error(
      "Email failed:",
      err.response?.data || err.message
    )
   
  }

  setLoading(false)

  if (onSuccess) {
    onSuccess()
  }

  onClose()
}



  return (
    <div className="enquiryModal-overlay" onClick={onClose}>
      <div
        className="enquiryModal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="enquiryModal-title">Download Catalogue</h3>

        <p className="enquiryModal-subtitle">
          Share your details to receive the catalogue.
        </p>

        <form className="enquiryModal-form" onSubmit={handleSubmit}>
          <div className="enquiryModal-grid">
            <div className="enquiryModal-field">
              <User className="enquiryModal-icon float-soft" size={18} />
              <input
                className="enquiryModal-input"
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="enquiryModal-field">
              <Mail className="enquiryModal-icon pulse-soft" size={18} />
              <input
                className="enquiryModal-input"
                name="email"
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="enquiryModal-field">
              <Phone className="enquiryModal-icon float-soft" size={18} />
              <input
                className="enquiryModal-input"
                name="phone"
                placeholder="Phone Number"
                required
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="enquiryModal-field">
              <MapPin className="enquiryModal-icon pulse-delay" size={18} />
              <input
                className="enquiryModal-input"
                name="location"
                placeholder="City / Location"
                value={form.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="enquiryModal-button" type="submit" disabled={loading}>
             {loading ? "Downloading..." : "DOWNLOAD CATALOGUE"}
          </button>
        </form>
      </div>
    </div>
  )
}
