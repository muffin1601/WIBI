import "./styles/Footer.css"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h4>Address</h4>
          <p>9 Hill Lane</p>
          <p>Ruislip, HA4 7JJ</p>
          <p>United Kingdom</p>
        </div>

        <div className="footer-center">
          <img
            src="https://noblenautica.co.uk/icon.svg"
            alt="WIBI"
            className="footer-logo"
          />

          {/* <div className="footer-socials">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
          </div> */}
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Email:</p>
          <p>noblenautica13@gmail.com</p>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        © {new Date().getFullYear()} WIBI. All rights reserved.
      </div>
    </footer>
  )
}
