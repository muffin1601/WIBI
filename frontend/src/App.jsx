import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./utils/ScrollToTop"

import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Catalogue from "./pages/Catalogue"
import Categories from "./pages/Categories"
import Subcategories from "./pages/Subcategories"
import Products from "./pages/Products"
import SingleProduct from "./pages/SingleProduct"
import "./global.css"

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

        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/:category/:subcategory" element={<Products />} />

        <Route path="/product/:p_id" element={<SingleProduct />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
