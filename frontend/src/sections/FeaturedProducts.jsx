import { useEffect, useRef, useState } from "react"
import "./styles/FeaturedProducts.css"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function FeaturedProducts() {
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const positionRef = useRef(0)
  const isAnimatingRef = useRef(false)

  const speed = 0.35
  const cardWidth = 320

  const products = [
    { title: "RADIAL FLOW GAS PUMP", slug: "radial-flow-gas-pump", description: "High-performance ring blower delivering consistent high-pressure airflow for demanding industrial applications.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755016467648-8d4bohmmucj.png" },
    { title: "NN-SPARROW", slug: "nn-sparrow", description: "AI-powered 5-in-1 robotic pool cleaner with intelligent navigation.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755017830507-hprkqfivjw.png" },
    { title: "NN-FTSC-TM", slug: "nn-ftsc-tm", description: "Top-mount filtration combo designed for easy domestic pool installation.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png" },
    { title: "NN-FTSC-SM", slug: "nn-ftsc-sm", description: "Side-mount filtration combo offering efficient performance.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png" },
    { title: "NN-FC-TM", slug: "nn-fc-tm", description: "Compact and cost-effective filtration system with integrated valve.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png" },
    { title: "NN-FC-TM-250", slug: "nn-fc-tm-250", description: "Advanced filtration combo series for long-term performance.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755016467648-8d4bohmmucj.png" },
  ]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2

    const animate = () => {
      if (!isAnimatingRef.current) {
        positionRef.current -= speed
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = 0
        }
        track.style.transform = `translate3d(${positionRef.current}px,0,0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const slide = (direction) => {
    if (isAnimatingRef.current) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth / 2

    isAnimatingRef.current = true
    track.style.transition = "transform 0.45s ease"

    positionRef.current += direction * cardWidth
    track.style.transform = `translate3d(${positionRef.current}px,0,0)`

    setTimeout(() => {
      track.style.transition = "none"

      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0
      }

      track.style.transform = `translate3d(${positionRef.current}px,0,0)`
      isAnimatingRef.current = false
    }, 460)
  }

  return (
    <section className="featured-products">
      <div className="fp-container">
        <span className="fp-tag">Featured Products</span>
        <h2 className="fp-heading">Premium Pool & Industrial Solutions</h2>
        <p className="fp-subtext">Engineered for performance, reliability, and long-term efficiency.</p>

        <div className="fp-carousel">
          <button className="fp-arrow fp-arrow-left" onClick={() => slide(1)}>
            <ChevronLeft size={22} />
          </button>

          <div className="fp-viewport">
            <div className="fp-track" ref={trackRef}>
              {[...products, ...products].map((product, index) => (
                <Link key={`${product.slug}-${index}`} to={`/products/${product.slug}`} className="fp-card">
                  <div className="fp-card-inner">
                    <div className="fp-image-wrap">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="fp-overlay" />
                    <div className="fp-content">
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button className="fp-arrow fp-arrow-right" onClick={() => slide(-1)}>
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="fp-cta-wrap">
          <Link to="/products" className="primary-btn">
            View All Products
            <ArrowRight size={18} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  )
}
