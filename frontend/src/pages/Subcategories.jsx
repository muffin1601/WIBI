import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import TopBanner from "../components/TopBanner"
import SubcategorySection from "../components/SubcategorySection"
import FeaturedProducts from "../sections/FeaturedProducts"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import NewsletterSection from "../sections/NewsletterSection"

import { fetchSubcategoriesByCategory } from "../api/subcategoryApi"

export default function Subcategories() {
    const { slug } = useParams()

    const [subcategories, setSubcategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const bannerBg =
        "https://images.pexels.com/photos/31484542/pexels-photo-31484542.jpeg"

    useEffect(() => {
        setLoading(true)

        fetchSubcategoriesByCategory(slug)
            .then((data) => {
                setSubcategories(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setError("Failed to load subcategories")
                setLoading(false)
            })
    }, [slug])

    return (
        <>
            <TopBanner
                title={slug.replace(/-/g, " ").toUpperCase()}
                description="Explore subcategories crafted for precision, performance, and premium aquatic experiences."
                backgroundImage={bannerBg}
                gradientColors={[
                    "rgba(56, 87, 133, 0.15)",
                    "rgba(56, 87, 133, 0.45)",
                    "rgba(56, 87, 133, 1)",
                ]}
                height="60vh"
            />

            {loading && <p style={{ textAlign: "center" }}>Loading subcategories...</p>}
            {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}


            {!loading && !error && (
                <SubcategorySection subcategories={subcategories} />
            )}

            <FeaturedProducts />
            <CatalogueSection />
            <Testimonials />
            <CtaSection />
            <NewsletterSection />
        </>
    )
}
