import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import AboutSection from "../components/AboutSection"
import "./styles/Home.css"
import FeaturedProducts from "../components/FeaturedProducts"
import CatalogueSection from "../components/CatalogueSection"
import Testimonials from "../components/Testimonials"
import CtaSection from "../components/CtaSection"
import NewsletterSection from "../components/NewsletterSection"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home-wrapper">
        <Hero />
        <AboutSection />
        <FeaturedProducts />
        <CatalogueSection />
        <Testimonials />
        <CtaSection />
        <NewsletterSection />
        <Footer />
      </main>

    </>
  )
}
