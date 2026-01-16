import { useEffect, useRef, useState } from "react"
import "./styles/SingleProduct.css"
import { ArrowRight, CheckCircle, Download } from "lucide-react"
import { products } from "../data/productData"
import { useParams } from "react-router-dom"
import TopBanner from "../components/TopBanner"
import FeaturedProducts from "../sections/FeaturedProducts"
import CatalogueSection from "../sections/CatalogueSection"
import Testimonials from "../sections/Testimonials"
import CtaSection from "../sections/CtaSection"
import NewsletterSection from "../sections/NewsletterSection"
import EnquiryModal from "../components/EnquiryModal"

export default function SingleProduct() {
    const { slug } = useParams()
    const product = products.find(p => p.slug === slug)
    const [activeImage, setActiveImage] = useState(product?.images[0])
    const pageRef = useRef(null)
    const [openEnquiry, setOpenEnquiry] = useState(false)

    const bannerBg =
        "https://images.pexels.com/photos/14036485/pexels-photo-14036485.jpeg"

    useEffect(() => {
        const elements = pageRef.current?.querySelectorAll(".reveal")
        if (!elements) return

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add("in-view")
                })
            },
            { threshold: 0.15 }
        )

        elements.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    if (!product) return null

    return (
        <>
            <TopBanner
                title={product.title}
                subtitle={product.subtitle}
                description={product.description}
                backgroundImage={bannerBg}
                gradientColors={[
                    "rgba(56, 87, 133, 0.35)",
                    "rgba(56, 87, 133, 0.75)",
                    "rgba(56, 87, 133, 1)",
                ]}
                height="65vh"
            />

            <section className="single-product" ref={pageRef}>
                <div className="sp-container">

                    <div className="sp-gallery reveal">


                        <div className="sp-thumbs">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    className={`sp-thumb ${activeImage === img ? "active" : ""}`}
                                    onClick={() => setActiveImage(img)}
                                />
                            ))}
                        </div>
                        <img src={activeImage} className="sp-main-image" />
                    </div>

                    <div className="sp-content">
                        <span className="sp-tag reveal">Product Overview</span>

                        <h2 className="sp-title reveal">{product.title}</h2>

                        <p className="sp-subtitle reveal">{product.subtitle}</p>

                        <p className="sp-description reveal">{product.description}</p>

                        <div className="sp-features reveal">
                            <h3>Key Features</h3>
                            <ul>
                                {product.features.map((item, i) => (
                                    <li key={i}>
                                        <CheckCircle size={18} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="sp-cta reveal">
                            <button className="primary-btn"
                                onClick={() => setOpenEnquiry(true)}>
                                Request Quote
                                <ArrowRight size={18} className="btn-icon" />
                            </button>

                            <a
                                href={product.catalogue}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="secondary-btn"
                            >
                                Download Catalogue
                                <Download size={18} className="btn-icon" />
                            </a>
                        </div>
                    </div>

                </div>
            </section>
            <FeaturedProducts />
            <CatalogueSection />
            <Testimonials />
            <CtaSection />
            <NewsletterSection />
            <EnquiryModal
                open={openEnquiry}
                onClose={() => setOpenEnquiry(false)}
            />
        </>
    )
}
