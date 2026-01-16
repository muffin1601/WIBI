import { useEffect, useRef } from "react"
import "./styles/TopBanner.css"

export default function TopBanner({
  title = "CONTACT",
  subtitle = "",
  description = "",
  backgroundImage,
  gradientColors = ["#0b032d", "#2a0f5c", "#12002b"],
  height = "70vh",
}) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          leftRef.current.classList.add("in-view")
          rightRef.current.classList.add("in-view")
        }
      },
      { threshold: 0.3 }
    )

    if (leftRef.current) observer.observe(leftRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="top-banner"
      style={{
        height,
        backgroundImage: `
          linear-gradient(
            120deg,
            ${gradientColors[0]} 0%,
            ${gradientColors[1]} 45%,
            ${gradientColors[2]} 100%
          ),
          url(${backgroundImage})
        `,
      }}
    >
      {/* Decorative glow overlay */}
      <div className="top-banner__overlay" />

      <div className="top-banner__content">
        
        {/* LEFT TEXT */}
        <div ref={leftRef} className="top-banner__left reveal">
          <h1>{title}</h1>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>

        {/* RIGHT DESCRIPTION */}
        <div ref={rightRef} className="top-banner__right reveal delay-2">
          <p>{description}</p>
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
