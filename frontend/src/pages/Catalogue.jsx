import TopBanner from "../components/TopBanner"
import NewsletterSection from "../sections/NewsletterSection"
import AboutSection2 from "../sections/AboutSection2"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"

export default function Catalogue() {
    const bannerBg =
        "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"

    return (
        <>
            <TopBanner
                title="CATALOGUE"
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
            <CatalogueSection />
            <Testimonials />
            <CtaSection />
            <NewsletterSection />

        </>
    )
}
