import "./styles/Hero.css"
import {
  Waves,
  ArrowRight,
  Mail,
  ShieldCheck,
  Settings,
  Award
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

        <h1 className="hero-title">
          Advanced Pool & <br />
          Water Body Equipment
        </h1>

        <p className="hero-subtext">
          Supplying world-class swimming pool systems, filtration,
          fountains, and aquatic infrastructure for commercial
          and residential projects.
        </p>

        <div className="hero-actions">
          <button onClick={() => window.location.href = "/categories"} className="primary-btn">
            Explore Products
            <ArrowRight size={18} className="btn-icon" />
          </button>

          <button onClick={() => window.location.href = "mailto:contact@wibi.com"} className="secondary-btn">
            <Mail size={16} className="btn-icon" />
            Contact Us
          </button>
        </div>

        <p className="hero-cta-note">
          Engineered for performance • Trusted by professionals worldwide
        </p>

        <div className="hero-highlights">
          <div className="highlight-chip">
            <ShieldCheck size={18} />
            Certified Quality
          </div>
          <div className="highlight-chip">
            <Settings size={18} />
            Precision Engineered
          </div>
          <div className="highlight-chip">
            <Award size={18} />
            Global Standards
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <ArrowRight size={22} className="scroll-arrow" />
      </div>
    </section>
  )
}
