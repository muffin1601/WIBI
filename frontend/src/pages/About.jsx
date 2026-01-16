import TopBanner from "../components/TopBanner"
import NewsletterSection from "../sections/NewsletterSection"
import AboutSection2 from "../sections/AboutSection2"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"

export default function Contact() {
  const bannerBg =
    "https://images.pexels.com/photos/9330675/pexels-photo-9330675.jpeg"

  return (
    <>
      <TopBanner
        title="ABOUT"
        description="Ready to transform your aquatic space? We partner with you to design and deliver premium pool and wellness solutions that balance innovation, performance, and timeless aesthetics—built to last and inspire."
        backgroundImage={bannerBg}
        gradientColors={[
          "rgba(56, 87, 133, 0.15)",
          "rgba(56, 87, 133, 0.45)",
          "rgba(56, 87, 133, 1)",
        ]}
        height="60vh"
      />

      <AboutSection2 />
      <CatalogueSection />
              <Testimonials />
              <CtaSection />
              <NewsletterSection />
   
    </>
  )
}
