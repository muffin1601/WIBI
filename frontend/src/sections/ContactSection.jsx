import { useEffect } from "react"
import "./styles/ContactSection.css"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
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
            our experts are here to help you create a safe, beautiful,
            and long-lasting aquatic space.
          </p>

          <div className="contact-cards">
            <div className="contact-card reveal delay-1">
              <div className="icon-box icon-float">
                <MapPin size={22} />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">Our Location</h4>
                <p className="contact-card-desc">
                  9 Hill Lane, Ruislip, HA4 7JJ, United Kingdom
                </p>
              </div>
            </div>

            <div className="contact-card reveal delay-2">
              <div className="icon-box icon-pulse">
                <Mail size={22} />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">Send Email</h4>
                <p className="contact-card-desc">
                  noblenautica13@gmail.com
                </p>
              </div>
            </div>

            <div className="contact-card reveal delay-3">
              <div className="icon-box icon-float">
                <Phone size={22} />
              </div>
              <div className="contact-card-text">
                <h4 className="contact-card-title">Call Us</h4>
                <p className="contact-card-desc">
                  +44 1234 567 890
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-box reveal delay-2">
          <h3 className="contact-form-title">Request a Consultation</h3>

          <p className="contact-form-desc">
            Tell us about your project and our team will get back to you
            with expert guidance and a customized solution.
          </p>

          <form className="contact-form">
            <div className="form-grid">
              <input className="form-input" type="text" placeholder="Your Full Name" />
              <input className="form-input" type="email" placeholder="Email Address" />
              <input className="form-input" type="tel" placeholder="Phone Number" />
              <input className="form-input" type="text" placeholder="City / Location" />
            </div>

            <textarea
              className="form-textarea"
              rows="4"
              placeholder="Describe your pool requirements"
            />

            <button className="form-button" type="submit">
              SEND ENQUIRY
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
