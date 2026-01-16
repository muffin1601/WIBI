import { useEffect, useRef } from "react"
import "./styles/AboutSection2.css"
import { Waves, Cpu, Globe2, Target } from "lucide-react"

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
            About WIBI
          </span>

          <h2 className="about-title reveal delay-2">
            Premium Aquatic & <br />
            Wellness Infrastructure
          </h2>

          <p className="about-paragraph reveal delay-3">
            <Cpu size={22} className="inline-icon-2 pulse-soft" />
            WIBI delivers premium aquatic and wellness infrastructure for the
            world’s most ambitious projects. With a portfolio of over 5,600
            solutions — from AI-enabled systems to seamless glass-edge pools —
            we empower contractors, architects, and developers with
            precision-engineered, visually striking, and future-ready equipment.
          </p>

          <p className="about-paragraph reveal delay-4">
            <Globe2 size={22} className="inline-icon-2 pulse-delay" />
            Trusted across Europe, the USA, and rapidly growing markets such as
            the Indian subcontinent, China, and Southeast Asia, we bring proven
            expertise and a commitment to simplifying complexity — ensuring
            every project performs beautifully for years to come.
          </p>

          <div className="about-vision reveal delay-5">
            <h4 className="vision-heading">
              <Target size={22} className="vision-icon-2 float-soft" />
              Vision
            </h4>
            <p className="vision-description">
              To set the global standard in premium pool infrastructure — where
              innovation shapes possibility, elegance defines experience, and
              excellence is simply the baseline.
            </p>
          </div>
        </div>

        <div className="about-media reveal delay-3">
          <img
            src="/assets/about-img-2.webp"
            alt="WIBI Aquatic Innovation"
            className="about-media-image spin-slow"
          />
        </div>
      </div>

      {/* <div className="about-wave">
        <svg className="about-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,64 C120,96 240,32 360,42 C480,52 600,96 720,86 C840,76 960,32 1080,42 C1200,52 1320,96 1440,64 L1440,120 L0,120 Z"
            className="wave-shape wave-front"
          />
          <path
            d="M0,72 C160,88 320,48 480,58 C640,68 800,98 960,88 C1120,78 1280,48 1440,58 L1440,120 L0,120 Z"
            className="wave-shape wave-back"
          />
        </svg>
      </div> */}
    </section>
  )
}
