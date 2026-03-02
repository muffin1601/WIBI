import { useEffect, useRef } from "react"
import "./styles/AboutSection2.css"
import { Waves, Target } from "lucide-react"

export default function AboutSection2() {
  const aboutRef = useRef(null)

  useEffect(() => {
    const elements = aboutRef.current.querySelectorAll(".reveal")

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
    <section className="about-root" ref={aboutRef}>
      <div className="about-layout">

        <div className="about-text-wrap">

          <span className="about-label reveal delay-1">
            <Waves size={16} className="about-label-icon-2 float-soft" />
            Global Equipment Range
          </span>

          {/* ✅ H2 for SEO hierarchy */}
          <h2 className="about-title reveal delay-2">
            Our Global Swimming Pool Equipment Range
          </h2>

          <p className="about-paragraph reveal delay-3">
            We manufacture and supply high-performance swimming pool
            filtration and circulation systems including high-rate sand
            filters, cartridge and media filters, automatic backwash
            systems, and multiport valve assemblies engineered for
            long-term operational efficiency.
          </p>

          <p className="about-paragraph reveal delay-4">
            Our product portfolio also includes energy-efficient variable
            speed swimming pool pumps, commercial-grade filtration pumps,
            automatic chlorination systems, salt chlorinators, UV
            disinfection units, ozone treatment systems, and intelligent
            pool automation solutions for seamless performance control.
          </p>

          <div className="about-vision reveal delay-5">
            <h4 className="vision-heading">
              <Target size={22} className="vision-icon-2 float-soft" />
              Engineering Excellence
            </h4>
            <p className="vision-description">
              From LED underwater lighting and architectural RGB systems
              to heat pumps, solar heating solutions, smart pool
              controllers, and advanced water treatment technologies,
              our integrated approach ensures reliability, sustainability,
              and performance across residential, hospitality, and
              commercial aquatic environments worldwide.
            </p>
          </div>

        </div>

        <div className="about-media reveal delay-3">
          <img
            src="/assets/about-img-2.webp"
            alt="Swimming Pool Filtration and Automation Systems"
            className="about-media-image spin-slow"
          />
        </div>

      </div>
    </section>
  )
}