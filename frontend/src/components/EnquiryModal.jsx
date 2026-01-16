import { useEffect } from "react"
import "./styles/EnquiryModal.css"
import { User, Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function EnquiryModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [open])

  if (!open) return null

  return (
    <div className="enquiryModal-overlay" onClick={onClose}>
      <div
        className="enquiryModal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="enquiryModal-title">Send an Enquiry</h3>

        <p className="enquiryModal-subtitle">
          Tell us about your project and we’ll get back to you shortly.
        </p>

        <form className="enquiryModal-form">
          <div className="enquiryModal-grid">
            <div className="enquiryModal-field">
              <User className="enquiryModal-icon float-soft" size={18} />
              <input className="enquiryModal-input" placeholder="Full Name" />
            </div>

            <div className="enquiryModal-field">
              <Mail className="enquiryModal-icon pulse-soft" size={18} />
              <input className="enquiryModal-input" placeholder="Email Address" />
            </div>

            <div className="enquiryModal-field">
              <Phone className="enquiryModal-icon float-soft" size={18} />
              <input className="enquiryModal-input" placeholder="Phone Number" />
            </div>

            <div className="enquiryModal-field">
              <MapPin className="enquiryModal-icon pulse-delay" size={18} />
              <input className="enquiryModal-input" placeholder="City / Location" />
            </div>
          </div>

          <div className="enquiryModal-field enquiryModal-textarea-wrap">
            <MessageSquare className="enquiryModal-icon float-soft" size={18} />
            <textarea
              className="enquiryModal-textarea"
              rows="4"
              placeholder="Describe your requirements"
            />
          </div>

          <button className="enquiryModal-button" type="submit">
            SUBMIT ENQUIRY
          </button>
        </form>
      </div>
    </div>
  )
}
