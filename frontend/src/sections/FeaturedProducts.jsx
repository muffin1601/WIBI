import { useEffect, useRef, useState } from "react"
import "./styles/FeaturedProducts.css"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const products = [
  {
    title: "RADIAL FLOW GAS PUMP",
    slug: "radial-flow-gas-pump",
    description:
      "High-performance ring blower delivering consistent high-pressure airflow for demanding industrial applications.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755016467648-8d4bohmmucj.png",
  },
  {
    title: "NN-SPARROW",
    slug: "nn-sparrow",
    description:
      "AI-powered 5-in-1 robotic pool cleaner with intelligent navigation.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755017830507-hprkqfivjw.png",
  },
  {
    title: "NN-FTSC-TM",
    slug: "nn-ftsc-tm",
    description:
      "Top-mount filtration combo designed for easy domestic pool installation.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png",
  },
  {
    title: "NN-FTSC-SM",
    slug: "nn-ftsc-sm",
    description:
      "Side-mount filtration combo offering efficient performance.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png",
  },
  {
    title: "NN-FC-TM",
    slug: "nn-fc-tm",
    description:
      "Compact and cost-effective filtration system with integrated valve.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png",
  },
  {
    title: "NN-FC-TM-250",
    slug: "nn-fc-tm-250",
    description:
      "Advanced filtration combo series for long-term performance.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755016467648-8d4bohmmucj.png",
  },
]

export default function FeaturedProducts() {
  const trackRef = useRef(null)
  const positionRef = useRef(0)
  const rafRef = useRef(null)
  const [paused, setPaused] = useState(false)

  const speed = 0.4
  const cardWidth = 300

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = () => {
      if (!paused) {
        positionRef.current -= speed
        if (Math.abs(positionRef.current) >= track.scrollWidth / 2) {
          positionRef.current = 0
        }
        track.style.transform = `translateX(${positionRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused])

  const slideLeft = () => {
    setPaused(true)
    positionRef.current += cardWidth
    trackRef.current.style.transform = `translateX(${positionRef.current}px)`
  }

  const slideRight = () => {
    setPaused(true)
    positionRef.current -= cardWidth
    trackRef.current.style.transform = `translateX(${positionRef.current}px)`
  }

  return (
    <section className="featured-products">
      <div className="fp-container">
        <span className="fp-tag">Featured Products</span>

        <h2 className="fp-heading">
          Premium Pool & Industrial Solutions
        </h2>

        <p className="fp-subtext">
          Engineered for performance, reliability, and long-term efficiency.
        </p>

        <div
          className="fp-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="fp-arrow left" onClick={slideLeft}>
            <ChevronLeft size={22} />
          </button>

          <div className="fp-track" ref={trackRef}>
            {[...products, ...products].map((product, index) => (
              <Link
                to={`/products/${product.slug}`}
                className="fp-card"
                key={`${product.slug}-${index}`}
              >
                <div className="fp-image-wrap">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="fp-overlay" />

                <div className="fp-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <button className="fp-arrow right" onClick={slideRight}>
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
