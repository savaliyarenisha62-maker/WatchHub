import { useEffect, useState } from "react";
import "./HeroSlider.css";
import watch1 from "../assets/img/watch1.png";
import watch2 from "../assets/img/watch2.png";

const slides = [
  {
    title: "THE HERITAGE",
    tag: "EST. 2026",
    desc: "A timeless masterpiece designed for the modern collector. Precision in every second.",
    image: watch1,
  },
  {
    title: "THE ESSENCE",
    tag: "COLLECTION II",
    desc: "Elegance redefined through Swiss craftsmanship and minimalist architecture.",
    image: watch2,
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div key={`progress-${index}`} className="nav-timer" />

      <div className="hero-inner">
        {/* Left: Content Area */}
        <div className="content-box" key={`text-${index}`}>
          <div className="meta-info">
            <span className="meta-tag">{slides[index].tag}</span>
          </div>
          <h1 className="hero-heading">{slides[index].title}</h1>
          <p className="hero-subtext">{slides[index].desc}</p>
          <div className="action-area">
            <button className="btn-luxury">Discover More</button>
           
          </div>
        </div>

        {/* Right: Product Display */}
        <div className="product-display">
          <div className="glow-backdrop"></div>
          <img
            key={slides[index].image}
            src={slides[index].image}
            alt="luxury timepiece"
            className="hero-product-img"
          />
        </div>
      </div>
    </section>
  );
}