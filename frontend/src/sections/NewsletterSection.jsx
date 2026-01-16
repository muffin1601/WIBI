import { useEffect, useRef } from "react"
import "./styles/NewsletterSection.css"

export default function NewsletterSection() {
  const sectionRef = useRef(null)

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
          know as we work to reduce our environmental impact. We’ll also share
          exciting updates and exclusive offers.
        </p>

        <form className="newsletter-form reveal delay-4">
          <input
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button type="submit">Subscribe</button>
        </form>

        <label className="newsletter-consent reveal delay-5">
          <input type="checkbox" id="checkbox-news" defaultChecked />
          Keep me updated on new products and exclusive offers
        </label>
      </div>
    </section>
  )
}
