import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { categoryImages } from "../data/categoryImages"
import "./styles/CategorySection.css"

export default function CategorySection({ categories }) {
  const sectionRef = useRef(null)
  const navigate = useNavigate()

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
  }, [])

  const handleClick = (cat) => {
    if (cat.subcategories?.length > 0) {
      navigate(`/categories/${cat.slug}`)
    } else {
      navigate(`/products/${cat.slug}`)
    }
  }

  return (
    <section className="categories-section" ref={sectionRef}>
      <div className="container">
        <div className="categories-grid">
          {categories.map((cat) => {
            const matchedImage = categoryImages.find(
              (img) => img.slug === cat.slug
            )

            return (
              <div
                key={cat._id || cat.slug}
                className="category-card reveal"
                onClick={() => handleClick(cat)}
              >
                <img
                  src={matchedImage?.image || "/images/categories/default.webp"}
                  alt={cat.name}
                />
                <div className="overlay" />
                <div className="card-content">
                  <h3>{cat.name}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
