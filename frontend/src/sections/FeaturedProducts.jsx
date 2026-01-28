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
    { title: "NN-CFTS", id: "93", description: "The Noble Nautica NN-CFTS SERIES filters are the heart of advanced water purification systems, offering exceptional strength and superior debris capture. These filters are engineered for longevity and ease of maintenance, making them an excellent choice for demanding filtration tasks.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754233110060-1lz5jq5waib.png" },
    { title: "NN-FT-FG-TM", id: "75", description: "High Performance sand Filters are manufactured with polyester and glass fiber winding for dependable, durable and all weather operation. They are economic, high performance filters for private, fish pool, Jacuzzi and public pools. We present an extensive range of filters manufactured with polyester and glassfiber winding for high resistance and high quality of water filtration. NN-FT-FG-TM series filters are used for private, fish pool, Jacuzzi and public pools.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754229430965-t77hf9ju6se.png" },
    { title: "NN-FTS-22-C", id: "68", description: "The Noble Nautica NN-FTS-22-C is a highly efficient, skid-mounted cartridge filtration unit designed for applications that require excellent water clarity and a substantial flow rate, such as large residential pools, smaller commercial aquatic facilities, or specialized industrial processes. Pre-assembled on a rugged pallet, this system offers a compact, plug-and-play solution.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1754228243664-auwdspbf6zs.png" },
    { title: "NN-QRP-S3", id: "101", description: "Whisper-quiet, single-stage centrifugal pumps featuring a built-in prefilter for efficient debris capture and reliable performance. Field of application: Engineered for the recirculation and filtration of water in medium to large commercial swimming pools, maintaining optimal water clarity and hygiene.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755018873635-xt3u4abwxys.png" },
    { title: "NN-VSP-PP", id: "97", description: "Reduced Energy Consumption-At low speeds, compared to a traditional pool pump, energy use is significantly lower. Dynamic System Management- Due to the operating principles of a centrifugal pump, reducing the rotational speed lowers the power drawn from the network. By adapting the pump’s speed—through the NN-ADECL Control System—to match the system’s real-time requirements, the motor consumes only the minimum power needed to achieve the desired performance, delivering substantial energy savings.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755018938509-mb84ua08oq.png" },
    { title: "NN-SPARROW", id: "41", description: "The NN-SPARROW from Noble Nautica is engineered for those who demand unmatched pool cleaning performance. Equipped with advanced AI navigation, this revolutionary 5-in-1 robotic cleaner scrubs, vacuums, filters, and polishes your pool with flawless precision — while adapting intelligently to any shape or size. Whether it’s leaves, fine dust, algae, or stubborn debris, the NN-SPARROW ensures your pool remains crystal-clear and swim-ready, every single day.", image: "https://yedfsfzvnrnboxhpndjd.supabase.co/storage/v1/object/public/product-images/1755017830507-hprkqfivjw.png" },
  ]

  const limitWords = (text, limit = 18) => {
  if (!text) return ""
  const words = text.split(" ")
  return words.length > limit
    ? words.slice(0, limit).join(" ") + "..."
    : text
}


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
                <Link key={`${product.id}-${index}`} to={`/product/${product.id}`} className="fp-card">
                  <div className="fp-card-inner">
                    <div className="fp-image-wrap">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="fp-overlay" />
                    <div className="fp-content">
                      <h3>{product.title}</h3>
                      <p>{limitWords(product.description, 12)}</p>
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
          <Link to="/categories" className="primary-btn">
            View All Products
            <ArrowRight size={18} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  )
}
