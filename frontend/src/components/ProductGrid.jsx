import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "./styles/ProductGrid.css"

export default function ProductGrid({ products }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll(".product-grid-card")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 120}ms`
            card.classList.add("product-grid-in-view")
          })
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [products])

  return (
    <section className="product-grid-section" ref={sectionRef}>
      <div className="product-grid-container">
        <div className="product-grid-layout">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="product-grid-card"
            >
              <img
                src={
                  product.data?.images?.[0] ||
                  "/images/products/default.webp"
                }
                alt={product.name}
              />
              <div className="product-grid-overlay" />
              <div className="product-grid-content">
                <h3>{product.name}</h3>
                {product.description && <p>{product.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
