import { useEffect, useState } from "react"
import "./styles/Navbar.css"
import logo from "/logo (3).webp"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("Home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        
        <div className="logo">
          <img src={logo} alt="WIBI Logo" />
        </div>

        <nav className="nav-links">
          {["Home", "About", "Products", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
            >
              {item}
              <span className="underline"></span>
            </a>
          ))}
        </nav>

        <button className="nav-btn">Get Quote</button>
      </div>
    </header>
  )
}
