import TopBanner from "../components/TopBanner"
import ContactSection from "../sections/ContactSection"

import NewsletterSection from "../sections/NewsletterSection"
// import Testimonials from "../sections/Testimonials"
// import CtaSection from "../sections/CtaSection"
// import CatalogueSection from "../sections/CatalogueSection"


export default function Contact() {
  const bannerBg =
    "https://images.pexels.com/photos/751266/pexels-photo-751266.jpeg"

  return (
    <>
      <TopBanner
        title="CONTACT"
        description="Ready to transform your aquatic space? Let's discuss your project and find the perfect solutions."
        backgroundImage={bannerBg}
        gradientColors={[
          "rgba(56, 87, 133, 0.15)",
          "rgba(56, 87, 133, 0.45)",
          "rgba(56, 87, 133, 1)",
        ]}
        height="60vh"
      />

      <ContactSection />
      {/* <CatalogueSection /> */}
      {/* <Testimonials />
      <CtaSection /> */}
      <NewsletterSection />
    </>
  )
}
