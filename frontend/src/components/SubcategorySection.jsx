import { useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import "./styles/CategorySection.css"

export default function SubcategorySection({ subcategories }) {
  const sectionRef = useRef(null)
  const { slug } = useParams()

  useEffect(() => {
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
  }, [subcategories])

  return (
    <section className="categories-section" ref={sectionRef}>
      <div className="container">
        <div className="categories-grid">
          {subcategories.map((sub) => (
            <Link
              key={sub._id || sub.slug}
              to={`/products/${slug}/${sub.slug}`}
              className="category-card reveal"
            >
              <img
                src={sub.image || "/images/categories/default.webp"}
                alt={sub.name}
              />
              <div className="overlay" />
              <div className="card-content">
                <h3>{sub.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
