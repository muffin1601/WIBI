import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./global.css"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Navbar from "./sections/Navbar"
import Footer from "./sections/Footer"
import About from "./pages/About"
import Catalogue from "./pages/Catalogue"

import SingleProduct from "./pages/SingleProduct"
import Categories from "./pages/Categories"
import ScrollToTop from "./utils/ScrollToTop"
import Subcategories from "./pages/Subcategories"
import Products from "./pages/Products"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<Subcategories />} />
        <Route path="/products/:slug" element={<SingleProduct />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/:category/:subcategory" element={<Products />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
