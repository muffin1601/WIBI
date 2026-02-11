
import Hero from "../sections/Hero"
import AboutSection from "../sections/AboutSection"
import "./styles/Home.css"
import FeaturedProducts from "../sections/FeaturedProducts"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import NewsletterSection from "../sections/NewsletterSection"


export default function Home() {
  return (
    <>
     

      <main className="home-wrapper">
        <Hero />
        <AboutSection />
        <FeaturedProducts />
        <CatalogueSection />
        <Testimonials />
        <CtaSection />
        <NewsletterSection />
        
      </main>

    </>
  )
}
