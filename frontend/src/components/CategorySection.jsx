import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { categoryImages } from "../data/categoryImages"
import "./styles/CategorySection.css"

export default function CategorySection({ categories }) {
  const sectionRef = useRef(null)

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

  return (
    <section className="categories-section" ref={sectionRef}>
      <div className="container">
        {/* <h2 className="section-title reveal in-view">
          Explore Our Categories
        </h2> */}

        <div className="categories-grid">
          {categories.map((cat) => {
            const matchedImage = categoryImages.find(
              (img) => img.slug === cat.slug
            )

            return (
              <Link
                to={`/categories/${cat.slug}`}
                key={cat._id || cat.slug}
                className="category-card reveal"
              >
                <img
                  src={matchedImage?.image || "/images/categories/default.webp"}
                  alt={cat.name}
                />

                <div className="overlay"></div>

                <div className="card-content">
                  <h3>{cat.name}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
