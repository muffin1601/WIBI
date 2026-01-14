import "./styles/Hero.css"
import {
  Waves,
  Droplets,
  Globe,
  ArrowRight,
  Mail
} from "lucide-react"

export default function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        src="/assets/hero.mp4"
      />

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-tag">
          <Waves size={16} className="icon subtle-float" />
          Premium Water Solutions
        </p>

        <h1>
          Advanced Pool & <br />
          Water Body Equipment
        </h1>

        <p className="hero-subtext">
          Supplying world-class swimming pool systems, filtration,
          fountains, and aquatic infrastructure for commercial
          and residential projects.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">
            Explore Products
            <ArrowRight size={18} className="btn-icon" />
          </button>

          <button className="secondary-btn">
            <Mail size={16} className="btn-icon" />
            Contact Us
          </button>
        </div>
      </div>

      <div className="hero-info">
        <div>
          <Droplets size={22} className="info-icon pulse" />
          <h3>25+</h3>
          <span>Years Experience</span>
        </div>

        <div>
          <Waves size={22} className="info-icon pulse-delay" />
          <h3>500+</h3>
          <span>Products Delivered</span>
        </div>

        <div>
          <Globe size={22} className="info-icon pulse-slow" />
          <h3>Global</h3>
          <span>Supplier Network</span>
        </div>
      </div>
    </section>
  )
}
