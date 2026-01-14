import { useEffect, useRef } from "react"
import "./styles/CatalogueSection.css"

export default function CatalogueSection() {
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
    <section className="catalogue-section" ref={sectionRef}>
      <div className="catalogue-container">
        <div className="catalogue-card reveal delay-1">
          <div className="catalogue-content">
            <span className="catalogue-tag reveal delay-2">
              Product Catalogue
            </span>

            <h2 className="catalogue-heading reveal delay-3">
              Complete Pool & Industrial
              <br />
              Product Catalogue
            </h2>

            <p className="catalogue-text reveal delay-4">
              Explore our complete range of premium pool equipment, industrial
              systems, and advanced filtration solutions. Designed for
              architects, contractors, and engineers seeking reliability,
              performance, and long-term efficiency.
            </p>

            <div className="catalogue-actions reveal delay-5">
              <a
                href="/catalogues/WIBI_Product_Catalogue.pdf"
                download
                className="catalogue-btn primary"
              >
                Download Catalogue
              </a>

              <a href="/products" className="catalogue-btn secondary">
                Browse Products
              </a>
            </div>
          </div>

          <div className="catalogue-visual reveal delay-3">
            <div className="catalogue-glow" />
            <img
              src="https://images.pexels.com/photos/6420102/pexels-photo-6420102.jpeg"
              alt="WIBI Product Catalogue"
              className="catalogue-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
