import { useEffect, useState } from "react"
import "./styles/SingleProduct.css"
import { ArrowRight, CheckCircle, Download } from "lucide-react"
import { useParams } from "react-router-dom"

import TopBanner from "../components/TopBanner"
import FeaturedProducts from "../sections/FeaturedProducts"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import NewsletterSection from "../sections/NewsletterSection"
import EnquiryModal from "../components/EnquiryModal"
import CatalogueLeadModal from "../components/CatalogueLeadModal"
import { fetchProductById } from "../api/productApi"
import { fetchCategoryBySlug } from "../api/categoryApi"

export default function SingleProduct() {
  const { p_id } = useParams()

  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const [catalogueUrl, setCatalogueUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openEnquiry, setOpenEnquiry] = useState(false)
  const [openCatalogue, setOpenCatalogue] = useState(false)

  const bannerBg =
    "https://images.pexels.com/photos/14036485/pexels-photo-14036485.jpeg"


  useEffect(() => {
    if (!p_id) return

    setLoading(true)

    fetchProductById(p_id)
      .then(async (res) => {
        setProduct(res)
        setActiveImage(res?.data?.images?.[0] || null)

        // fetch category catalogue
        if (res?.category) {
          const category = await fetchCategoryBySlug(res.category)
          setCatalogueUrl(category?.catalogue_url || null)
        }

        setLoading(false)
      })
      .catch((err) => {
        console.error("❌ Product fetch error:", err)
        setError("Product not found")
        setLoading(false)
      })
  }, [p_id])

  if (loading) {
    return <p style={{ textAlign: "center", padding: "80px" }}>Loading...</p>
  }

  if (error || !product) {
    return <p style={{ textAlign: "center", padding: "80px" }}>{error}</p>
  }

  const images = product.data?.images || []
  const features = product.data?.features || []

  const downloadPDF = async (url) => {
  const response = await fetch(url)
  const blob = await response.blob()

  const fileURL = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = fileURL
  a.download = "WIBI-ProductCatalogue.pdf"
  document.body.appendChild(a)
  a.click()
  a.remove()

  window.URL.revokeObjectURL(fileURL)
}

  return (
    <>
      <TopBanner
        title={product.name}
        backgroundImage={bannerBg}
        gradientColors={[
          "rgba(56, 87, 133, 0.35)",
          "rgba(56, 87, 133, 0.75)",
          "rgba(56, 87, 133, 1)",
        ]}
        height="65vh"
      />

      <section className="single-product">
        <div className="sp-container">
          {/* GALLERY */}
          <div className="sp-gallery">
            <div className="sp-thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.name}
                  className={`sp-thumb ${activeImage === img ? "active" : ""}`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>

            {images.length > 0 && (
              <img
                src={activeImage || images[0]}
                alt={product.name}
                className="sp-main-image"
              />
            )}
          </div>

          {/* CONTENT */}
          <div className="sp-content">
            <span className="sp-tag">Product Overview</span>

            <h2 className="sp-title">{product.name}</h2>

            <p className="sp-description">{product.description}</p>

            {features.length > 0 && (
              <div className="sp-features">
                <h3>Key Features</h3>
                <ul>
                  {features.map((item, i) => (
                    <li key={i}>
                      <CheckCircle size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="sp-cta">
              <button
                className="primary-btn"
                onClick={() => setOpenEnquiry(true)}
              >
                Request Quote
                <ArrowRight size={18} />
              </button>

              {catalogueUrl && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setOpenCatalogue(true)}
                >
                  Download Catalogue
                  <Download size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <CatalogueLeadModal
        open={openCatalogue}
        onClose={() => setOpenCatalogue(false)}
        // catalogueUrl={catalogueUrl}
        onSuccess={() => downloadPDF(catalogueUrl)}
      />

      <FeaturedProducts />
      <CatalogueSection />
      <Testimonials />
      <CtaSection />
      <NewsletterSection />

      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
      />
    </>
  )
}
