import { useEffect, useRef, useState } from "react"
import "./styles/Testimonials.css"

const testimonials = [
  {
    quote:
      "The colored stainless-steel finish added a distinctive finish to our spa. Beyond aesthetics, the durability is exactly what we needed for long-term, high-use environments.",
    name: "Lilly Nambiar",
    role: "Design Director, Indigo Spa",
  },
  {
    quote:
      "Working with Noble Nautica has been exceptional. Their attention to detail and commitment to quality shows in every aspect of their filtration systems.",
    name: "Sarah Chen",
    role: "Operations Manager, Azure Resort",
  },
  {
    quote:
      "Noble Nautica's filtration systems are in a league of their own. The performance is consistent, the design is sleek, and the maintenance is minimal. For any large-scale aquatic project, their products are our first choice.",
    name: "Daniel Wright",
    role: "Facility Manager, ClearHaven Wellness Spa (UK)",
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null)

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
  }

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAutoSlide()

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

    return () => {
      stopAutoSlide()
      observer.disconnect()
    }
  }, [])

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section
      className="testimonial-section"
      ref={sectionRef}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="testimonial-overlay" />

      <div className="testimonial-container">
        <span className="test-tag reveal delay-1">Testimonials</span>

        <div
          className="testimonial-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div className="testimonial-slide" key={i}>
              <span className="quote-mark">“</span>
              <p className="testimonial-quote">{t.quote}</p>
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-role">{t.role}</span>
            </div>
          ))}
        </div>

        <button className="testimonial-arrow left reveal delay-3" onClick={prev}>
          <svg viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button className="testimonial-arrow right reveal delay-3" onClick={next}>
          <svg viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
