import TopBanner from "../components/TopBanner"
import  {useEffect, useState} from "react"
import NewsletterSection from "../sections/NewsletterSection"
// import AboutSection2 from "../sections/AboutSection2"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import CatalogueGrid from "../components/CatalogueGrid"
import { fetchCategories } from "../api/categoryApi"


export default function Catalogue() {
    const [categories, setCategories] = useState([])
      const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


    const bannerBg =
        "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"

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
                title="CATALOGUES"
                description="Discover our complete product catalogues—premium pool and wellness solutions engineered with innovation, performance, and timeless design, built to elevate every aquatic project."
                backgroundImage={bannerBg}
                gradientColors={[
                    "rgba(56, 87, 133, 0.15)",
                    "rgba(56, 87, 133, 0.45)",
                    "rgba(56, 87, 133, 1)",
                ]}
                height="60vh"
            />

            {/* <AboutSection2 /> */}
            {!loading && !error && (
                    <CatalogueGrid categories={categories} />
                  )}
            {/* <CatalogueSection /> */}
            <Testimonials />
            <CtaSection />
            <NewsletterSection />

        </>
    )
}
