import { useEffect, useRef } from "react"
import "./styles/FeaturedProducts.css"
import { ArrowRight } from "lucide-react"

const products = [
  {
    title: "RADIAL FLOW GAS PUMP",
    description:
      "High-performance ring blower delivering consistent high-pressure airflow for demanding industrial applications.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755016467648-8d4bohmmucj.png",
  },
  {
    title: "NN-SPARROW",
    description:
      "AI-powered 5-in-1 robotic pool cleaner with intelligent navigation.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755017830507-hprkqfivjw.png",
  },
  {
    title: "NN-FTSC-TM",
    description:
      "Top-mount filtration combo designed for easy domestic pool installation.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png",
  },
  {
    title: "NN-FTSC-SM",
    description:
      "Side-mount filtration combo offering efficient performance.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png",
  },
  {
    title: "NN-FC-TM",
    description:
      "Compact and cost-effective filtration system with integrated valve.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754219624969-wbp1apzru7.png",
  },
  {
    title: "NN-FC-TM-250",
    description:
      "Advanced filtration combo series for long-term performance.",
    image:
      "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755016467648-8d4bohmmucj.png",
  },
]

export default function FeaturedProducts() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".reveal")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="featured-products" ref={sectionRef}>
      <div className="fp-container">
        <span className="fp-tag reveal delay-1">Featured Products</span>

        <h2 className="fp-heading reveal delay-2">
          Premium Pool & Industrial Solutions
        </h2>

        <p className="fp-subtext reveal delay-3">
          Engineered for performance, reliability, and long-term efficiency.
        </p>

        <div className="fp-grid">
          {products.map((product, index) => (
            <a
              href="#"
              className="fp-card reveal"
              style={{ transitionDelay: `${0.15 * index}s` }}
              key={index}
            >
              <div className="fp-image-wrap">
                <img src={product.image} alt={product.title} />
              </div>

              <div className="fp-overlay" />

              <div className="fp-content">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="fp-cta-wrap reveal delay-4">
          <button className="primary-btn">
            View All Products
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}
