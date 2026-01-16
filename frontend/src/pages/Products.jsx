import TopBanner from "../components/TopBanner"
import NewsletterSection from "../sections/NewsletterSection"
// import AboutSection2 from "../sections/AboutSection2"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import FeaturedProducts from "../sections/FeaturedProducts"

export default function Products() {
    const bannerBg =
        "https://images.pexels.com/photos/751343/pexels-photo-751343.jpeg"

    return (
        <>
            <TopBanner
                title="PRODUCTS"
                description="Explore our range of premium pool and wellness products—engineered for performance, crafted with precision, and designed to deliver lasting beauty in every aquatic space."
                backgroundImage={bannerBg}
                gradientColors={[
                    "rgba(56, 87, 133, 0.15)",
                    "rgba(56, 87, 133, 0.45)",
                    "rgba(56, 87, 133, 1)",
                ]}
                height="60vh"
            />

            {/* <AboutSection2 /> */}
            <FeaturedProducts />
            <CatalogueSection />
            <Testimonials />
            <CtaSection />
            <NewsletterSection />

        </>
    )
}
