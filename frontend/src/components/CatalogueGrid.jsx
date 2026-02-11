import { useRef, useState } from "react"
import "./styles/CatalogueCategorySection.css"
import { Download } from "lucide-react"
import CatalogueLeadModal from "../components/CatalogueLeadModal"
import { categoryImages } from "../data/categoryImages"

export default function CatalogueGrid({ categories }) {
  const sectionRef = useRef(null)
  const [selected, setSelected] = useState(null)

  const downloadPDF = (url, name) => {
    if (!url) return
    const a = document.createElement("a")
    a.href = url
    a.target = "_blank"
    a.rel = "noopener noreferrer"
    a.download = `${name}-Catalogue.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <>
      <section className="catalogue-grid-section" ref={sectionRef}>
        <div className="catalogue-grid-layout">
          {categories.map((cat) => {
            const matchedImage = categoryImages.find(
              (img) => img.slug === cat.slug
            )

            return (
              <div
                key={cat.id || cat.slug}
                className={`catalogue-grid-card ${
                  !cat.catalogue_url
                    ? "catalogue-grid-card--disabled"
                    : ""
                }`}
                onClick={() =>
                  cat.catalogue_url ? setSelected(cat) : null
                }
              >
                <img
                  src={
                    matchedImage?.image ||
                    "/images/categories/default.webp"
                  }
                  alt={cat.name}
                  className="catalogue-grid-image"
                  loading="lazy"
                />

                <div className="catalogue-grid-overlay" />

                <div className="catalogue-grid-glass">
                  <h3>{cat.name}</h3>
                  <span className="catalogue-grid-action">
                    Download Catalogue
                    <Download size={18} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {selected && (
        <CatalogueLeadModal
          open={true}
          onClose={() => setSelected(null)}
          onSuccess={() =>
            downloadPDF(selected.catalogue_url, selected.name)
          }
        />
      )}
    </>
  )
}
