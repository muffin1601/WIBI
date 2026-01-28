import { NavLink, useNavigate } from "react-router-dom"
import { X, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import "./styles/Sidebar.css"
import logo from "/logo (2).webp"
import EnquiryModal from "../components/EnquiryModal"


export default function Sidebar({ open, onClose, categories }) {
  const navigate = useNavigate()
  const [productsOpen, setProductsOpen] = useState(false)
  const [openEnquiry, setOpenEnquiry] = useState(false)

  const handleCategoryClick = (cat) => {
    onClose()
    navigate(`/products/${cat.slug}`)
  }

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`sidebar-overlay ${open ? "sidebar-overlay--show" : ""}`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        {/* HEADER */}
        <div className="sidebar-header">
                  <div className="sidebar-brand">
                      <img
                          src={logo}
                          alt="Logo"
                          className="sidebar-logo"
                      />
                      {/* <h3 className="sidebar-title">Menu</h3> */}
                  </div>

          <button
            className="sidebar-close-btn"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="sidebar-body">
          <nav className="sidebar-nav">
            <NavLink className="sidebar-link" to="/" onClick={onClose}>
              Home
            </NavLink>

            <NavLink className="sidebar-link" to="/about" onClick={onClose}>
              About
            </NavLink>

            {/* PRODUCTS TOGGLE */}
            <button
              className="sidebar-products-toggle"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              <span className="sidebar-products-text">Products</span>

              <ChevronDown
                size={18}
                className={`sidebar-products-icon ${
                  productsOpen ? "sidebar-products-icon--open" : ""
                }`}
              />
            </button>

            {/* PRODUCTS DROPDOWN */}
            <div
              className={`sidebar-products ${
                productsOpen ? "sidebar-products--open" : ""
              }`}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="sidebar-category"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <span className="sidebar-category-text">
                    {cat.name}
                  </span>

                  <ChevronRight
                    size={16}
                    className="sidebar-category-icon"
                  />
                </button>
              ))}
            </div>

            <NavLink
              className="sidebar-link"
              to="/catalogue"
              onClick={onClose}
            >
              Catalogue
            </NavLink>

            <NavLink
              className="sidebar-link"
              to="/contact"
              onClick={onClose}
            >
              Contact
            </NavLink>
          </nav>
        </div>

        {/* FOOTER CTA */}
        <div className="sidebar-footer">
          <button
            className="sidebar-cta"
            onClick={() => {
              setOpenEnquiry(true);
              onClose();
            }}
          >
            Get Quote
          </button>
        </div>
      </aside>
      <EnquiryModal
              open={openEnquiry}
              onClose={() => setOpenEnquiry(false)}
            />
    </>
  )
}
