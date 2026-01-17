import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import "./styles/CategorySection.css" // reuse same styles

export default function ProductGrid({ products }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll(".category-card")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 120}ms`
            card.classList.add("in-view")
          })
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [products])

  // utility: limit description words
  const truncate = (text = "", words = 18) => {
    const arr = text.split(" ")
    return arr.length > words
      ? arr.slice(0, words).join(" ") + "..."
      : text
  }

  return (
    <section className="categories-section" ref={sectionRef}>
      <div className="container">
        <div className="categories-grid">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`} // single product page later
              className="category-card reveal"
            >
                  <img
                      src={
                          product.data.images?.length
                              ? product.data.images[0]
                              : "/images/products/default.webp"
                      }
                      alt={product.name}
                      loading="lazy"
                  />
              <div className="overlay"></div>

              <div className="card-content">
                <h3>{product.name}</h3>

                {product.description && (
                  <p className="card-description">
                    {truncate(product.description, 16)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
