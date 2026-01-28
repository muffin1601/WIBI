import { Link } from "react-router-dom"
import "./styles/ProductGrid.css"

export default function ProductGrid({ products }) {
  const limitWords = (text, limit = 12) => {
    if (!text) return ""
    const words = text.split(" ")
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text
  }

  return (
    <section className="pg-section">
      <div className="pg-container">
        <div className="pg-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${String(product.id)}`}
              className="pg-card"
            >
              <div className="pg-image-wrapper">
                <img
                  className="pg-image"
                  src={
                    product.data?.images?.[0] ||
                    "/images/products/default.webp"
                  }
                  alt={product.name}
                />
                <div className="pg-overlay" />
              </div>

              <div className="pg-content">
                <h3 className="pg-title">{product.name}</h3>
                {product.description && (
                  <p className="pg-description">
                    {limitWords(product.description, 12)}
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
