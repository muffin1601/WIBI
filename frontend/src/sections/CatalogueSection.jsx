import { useEffect, useRef, useState } from "react"
import "./styles/CatalogueSection.css"
import { Download, ArrowRight } from "lucide-react"
import CatalogueLeadModal from "../components/CatalogueLeadModal"

export default function CatalogueSection() {
  const sectionRef = useRef(null)
  const [openCatalogue, setOpenCatalogue] = useState(false)

  const CATALOGUE_DOWNLOAD_URL =
    "https://github.com/muffin1601/noble-nautica-main-clean/releases/download/catalogue-v1/Noble.Nautica.Catlog.1.pdf"

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


  const downloadPDF = (url) => {
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
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
                <button
                  type="button"
                  className="catalogue-btn primary"
                  onClick={() => setOpenCatalogue(true)}
                >
                  Download Catalogue
                  <Download size={18} />
                </button>

                <a href="/categories" className="catalogue-btn secondary">
                  Browse Products
                  <ArrowRight size={18} />
                </a>
              </div>

              <p className="catalogue-help-text reveal delay-6">
                📄 Catalogue size: <strong>266 MB</strong>.
                {/* Please use a stable internet connection for uninterrupted download. */}
              </p>
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
      <CatalogueLeadModal
        open={openCatalogue}
        onClose={() => setOpenCatalogue(false)}
        onSuccess={() => downloadPDF(CATALOGUE_DOWNLOAD_URL)}
      />
    </>
  )
}
