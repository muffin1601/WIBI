import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./global.css"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Navbar from "./sections/Navbar"
import Footer from "./sections/Footer"
import About from "./pages/About"

export default function App() {
  return (
    <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  )
}
