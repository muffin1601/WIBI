import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import TopBanner from "../components/TopBanner"
import ProductGrid from "../components/ProductGrid"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import NewsletterSection from "../sections/NewsletterSection"

import { fetchProducts } from "../api/productApi"

export default function Products() {
  const { category, subcategory } = useParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const bannerBg =
    "https://images.pexels.com/photos/31484542/pexels-photo-31484542.jpeg"

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchProducts(category, subcategory)
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load products")
        setLoading(false)
      })
  }, [category, subcategory])

  const pageTitle = (subcategory || category)
    ?.replace(/-/g, " ")
    .toUpperCase()

  return (
    <>
      <TopBanner
        title={pageTitle}
        description="Explore high-performance products crafted for reliability, precision, and premium results."
        backgroundImage={bannerBg}
        gradientColors={[
          "rgba(56, 87, 133, 0.15)",
          "rgba(56, 87, 133, 0.45)",
          "rgba(56, 87, 133, 1)",
        ]}
        height="60vh"
      />

      {/* STATES */}
      {loading && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          Loading products...
        </p>
      )}

      {error && (
        <p style={{ textAlign: "center", color: "red", marginTop: "40px" }}>
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No products available in this category.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} />
      )}

      <CatalogueSection />
      <Testimonials />
      <CtaSection />
      <NewsletterSection />
    </>
  )
}
