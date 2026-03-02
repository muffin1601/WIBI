import { useEffect, useRef } from "react"
import "./styles/AboutSection.css"
import { Globe2, Target } from "lucide-react"

export default function AboutSection() {
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
    <section className="about-section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">

          <span className="about-tag reveal delay-1">
            <Globe2 size={16} className="about-icon subtle-float" />
            Global Pool Solutions
          </span>

          
          <h1 className="about-heading reveal delay-2">
            Global Swimming Pool Equipment Manufacturers & Suppliers – Complete Pool Solutions
          </h1>

          <p className="about-text reveal delay-3">
            We are a globally trusted swimming pool equipment manufacturer and
            supplier, delivering advanced pool technology, premium-quality
            components, and complete swimming pool solutions worldwide.
          </p>

          <p className="about-text reveal delay-4">
            Inspired by international engineering standards, we supply
            high-performance filtration systems, energy-efficient pumps,
            intelligent automation, LED lighting, heating systems, and advanced
            water treatment solutions for luxury residential, hospitality, and
            large commercial swimming pool projects.
          </p>

          <div className="vision-box reveal delay-5">
            <h4 className="vision-title">
              <Target size={22} className="vision-icon subtle-float" />
              Our Mission
            </h4>
            <p className="vision-text">
              To deliver reliable, sustainable, and innovative swimming pool
              equipment solutions that ensure safety, durability, energy
              efficiency, and superior user experience across global markets.
            </p>
          </div>

        </div>

        <div className="about-visual reveal delay-3">
          <img
            src="/assets/about-img-2.webp"
            alt="Global Swimming Pool Equipment Manufacturer"
            className="about-image rotate-animation w-100"
          />
        </div>
      </div>

      <div className="wave-divider">
        <svg
          className="wave-svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C120,96 240,32 360,42 C480,52 600,96 720,86 C840,76 960,32 1080,42 C1200,52 1320,96 1440,64 L1440,120 L0,120 Z"
            className="wave-path wave-path-1"
          />
          <path
            d="M0,72 C160,88 320,48 480,58 C640,68 800,98 960,88 C1120,78 1280,48 1440,58 L1440,120 L0,120 Z"
            className="wave-path wave-path-2"
          />
        </svg>
      </div>
    </section>
  )
}