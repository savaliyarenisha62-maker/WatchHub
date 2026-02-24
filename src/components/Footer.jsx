import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ABOUT */}
        <div className="footer-about">
          <h3>WatchHub</h3>
          <p>
            Your destination for timeless elegance and luxury watches.
            Quality crafted for every occasion.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>

        {/* CONTACT + SOCIAL */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@watchhub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Luxury Ave, New York, NY</p>

          {/* 🔹 SOCIAL ICONS */}
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          &copy; {currentYear}{" "}
          <span className="brand-accent">WatchHub</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}