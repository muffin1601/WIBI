import { useEffect, useState } from "react"
import TopBanner from "../components/TopBanner"
import NewsletterSection from "../sections/NewsletterSection"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import FeaturedProducts from "../sections/FeaturedProducts"
import CategorySection from "../components/CategorySection"
import { fetchCategories } from "../api/categoryApi"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const bannerBg =
    "https://images.pexels.com/photos/31484542/pexels-photo-31484542.jpeg"

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load categories")
        setLoading(false)
      })
  }, [])

  return (
    <>
      <TopBanner
        title="CATEGORIES"
        description="Explore our range of premium pool and wellness products—engineered for performance, crafted with precision, and designed to deliver lasting beauty in every aquatic space."
        backgroundImage={bannerBg}
        gradientColors={[
          "rgba(56, 87, 133, 0.15)",
          "rgba(56, 87, 133, 0.45)",
          "rgba(56, 87, 133, 1)",
        ]}
        height="60vh"
      />

      {/* CATEGORY DISPLAY */}
      {loading && <p style={{ textAlign: "center" }}>Loading categories...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {!loading && !error && (
        <CategorySection categories={categories} />
      )}

      <FeaturedProducts />
      <CatalogueSection />
      <Testimonials />
      <CtaSection />
      <NewsletterSection />
    </>
  )
}
