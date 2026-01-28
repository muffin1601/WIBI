import { useEffect, useRef } from "react"
import "./styles/CtaSection.css"

export default function CtaSection() {
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
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-overlay" />

      <div className="cta-container cta-grid">
        <div className="cta-content">
          <span className="cta-tag reveal delay-1">
            Let’s Work Together
          </span>

          <h2 className="cta-heading reveal delay-2">
            Ready to Build Premium
            <br />
            Aquatic & Industrial Solutions?
          </h2>

          <p className="cta-text reveal delay-3">
            Speak with our experts to explore customized pool infrastructure,
            advanced filtration systems, and long-term performance solutions
            tailored to your project.
          </p>

          <div className="cta-actions reveal delay-4">
            <a href="/contact" className="cta-btn primary">
              Contact Our Experts
            </a>

            <a href="/categories" className="cta-btn secondary">
              Explore Products
            </a>
          </div>
        </div>

        <div className="cta-media reveal delay-3">
          <div className="cta-video-glow" />
          <video
            className="cta-video"
            src="https://www.pexels.com/download/video/16580831/"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </section>
  )
}
