import { useEffect, useRef, useState } from "react"
import { supabase } from "../lib/supabase"
import "./styles/NewsletterSection.css"

export default function NewsletterSection() {
  const sectionRef = useRef(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    const { error } = await supabase
      .from("newsletter_emails")
      .insert([{ email }])

    if (error) {
      if (error.code === "23505") {
        setError("This email is already subscribed.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } else {
      setSuccess(true)
      setEmail("")
    }

    setLoading(false)
  }

  return (
    <section className="newsletter-section" ref={sectionRef}>
      <div className="newsletter-overlay" />

      <div className="newsletter-container">
        <span className="newsletter-tag reveal delay-1">
          Stay in the Loop
        </span>

        <h2 className="newsletter-heading reveal delay-2">
          Stay Ahead with Our Latest
          <br />
          Products & Exclusive Offers
        </h2>

        <p className="newsletter-text reveal delay-3">
          Making better things takes time. Drop us your email to stay in the
          know as we work to reduce our environmental impact.
        </p>

        <form
          className="newsletter-form reveal delay-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {success && (
          <p className="newsletter-success">
           Thanks for subscribing!
          </p>
        )}

        {error && (
          <p className="newsletter-error">
           {error}
          </p>
        )}

        <label className="newsletter-consent reveal delay-5">
          <input type="checkbox" defaultChecked />
          Keep me updated on new products and exclusive offers
        </label>
      </div>
    </section>
  )
}
