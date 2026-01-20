import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./styles/Navbar.css"
import logo from "/logo (3).webp"
import EnquiryModal from "../components/EnquiryModal"
import { fetchCategories } from "../api/categoryApi"
import { ChevronDown } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [openEnquiry, setOpenEnquiry] = useState(false)
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(console.error)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "Contact", href: "/contact" },
  ]

  // ✅ SAME LOGIC AS CategorySection
  const handleCategoryClick = (cat) => {
    setIsMegaOpen(false)

    if (cat.subcategories?.length > 0) {
      navigate(`/categories/${cat.slug}`)
    } else {
      navigate(`/products/${cat.slug}`)
    }
  }

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <nav className="nav-links">
            {navItems.map((item) =>
              item.name === "Products" ? (
                <div
                  className="nav-item mega-wrapper"
                  key={item.name}
                  onMouseEnter={() => setIsMegaOpen(true)}
                  onMouseLeave={() => setIsMegaOpen(false)}
                >
                  <button
                    type="button"
                    className={`products-link ${isMegaOpen ? "active" : ""}`}
                  >
                    Products
                    <ChevronDown size={16} className="dropdown-arrow" />
                    <span className="underline"></span>
                  </button>

                  {/* MEGA MENU */}
                  {isMegaOpen && (
                    <div className="mega-menu">
                      <div className="mega-grid">
                        {categories.map((cat) => (
                          <button
                            key={cat._id}
                            type="button"
                            className="mega-card"
                            onClick={() => handleCategoryClick(cat)}
                          >
                            <h4>{cat.name}</h4>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >
                  {item.name}
                  <span className="underline"></span>
                </NavLink>
              )
            )}
          </nav>

          <button className="nav-btn" onClick={() => setOpenEnquiry(true)}>
            Get Quote
          </button>
        </div>
      </header>

      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
      />
    </>
  )
}
