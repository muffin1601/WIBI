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

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Catalogues", href: "/catalogues" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        <div className="logo">
          <img src={logo} alt="WIBI Logo" />
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={active === item.name ? "active" : ""}
              onClick={() => setActive(item.name)}
            >
              {item.name}
              <span className="underline"></span>
            </a>
          ))}
        </nav>

        <button className="nav-btn">Get Quote</button>
      </div>
    </header>
  )
}
