import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./global.css"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Navbar from "./sections/Navbar"
import Footer from "./sections/Footer"
import About from "./pages/About"
import Catalogue from "./pages/Catalogue"
import Products from "./pages/Products"
import SingleProduct from "./pages/SingleProduct"

export default function App() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  )
}
