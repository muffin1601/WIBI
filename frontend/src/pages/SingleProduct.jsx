import { useEffect, useRef, useState } from "react"
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
import { fetchProductById } from "../api/productApi"

export default function SingleProduct() {
  const { p_id } = useParams()
  const pageRef = useRef(null)

  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openEnquiry, setOpenEnquiry] = useState(false)

  const bannerBg =
    "https://images.pexels.com/photos/14036485/pexels-photo-14036485.jpeg"

  useEffect(() => {
  if (!p_id) {
    console.error("❌ p_id missing")
    return
  }

  console.log("➡️ Fetching product with id:", p_id)

  fetchProductById(p_id)
    .then((res) => {
      console.log("✅ API response:", res)
      setProduct(res)
      setActiveImage(res?.data?.images?.[0] || null)
      setLoading(false)
    })
    .catch((err) => {
      console.error("❌ API error:", err)
      setError("Product not found")
      setLoading(false)
    })
}, [p_id])

console.log("images:", product?.data?.images)
console.log("features:", product?.data?.features)
console.log("catalogues:", product?.data?.catalogues)

  useEffect(() => {
    if (!pageRef.current || !product) return

    const elements = pageRef.current.querySelectorAll(".reveal")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view")
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [product])

  if (loading) {
    return <p style={{ textAlign: "center", padding: "80px" }}>Loading...</p>
  }

  if (error || !product) {
    return <p style={{ textAlign: "center", padding: "80px" }}>{error}</p>
  }

  const images = product.data?.images || []
  const features = product.data?.features || []
  const catalogues = product.data?.catalogues || []

  return (
    <>
      <TopBanner
        title={product.name}
        // description={product.description}
        backgroundImage={bannerBg}
        gradientColors={[
          "rgba(56, 87, 133, 0.35)",
          "rgba(56, 87, 133, 0.75)",
          "rgba(56, 87, 133, 1)",
        ]}
        height="65vh"
      />

      <section className="single-product" ref={pageRef}>
        <div className="sp-container">
          {/* GALLERY */}
          <div className="sp-gallery reveal">
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

            {product.data?.images?.length > 0 && (
  <img
    src={activeImage || product.data.images[0]}
    alt={product.name}
    className="sp-main-image"
  />
)}
          </div>

          {/* CONTENT */}
          <div className="sp-content">
            <span className="sp-tag reveal">Product Overview</span>

            <h2 className="sp-title reveal">{product.name}</h2>

            <p className="sp-description reveal">{product.description}</p>

            {features.length > 0 && (
              <div className="sp-features reveal">
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

            <div className="sp-cta reveal">
              <button
                className="primary-btn"
                onClick={() => setOpenEnquiry(true)}
              >
                Request Quote
                <ArrowRight size={18} />
              </button>

              {catalogues.length > 0 && (
                <a
                  href={catalogues[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-btn"
                >
                  Download Catalogue
                  <Download size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

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
