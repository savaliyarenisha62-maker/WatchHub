import React from "react";
import "./About.css";
import workshopImg from "../assets/img/watch.jpg";

const About = () => {
  return (
    <div className="about-wrapper">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <span className="subtitle">CRAFTSMANSHIP SINCE 1972</span>
          <h1 className="reveal-text">
            Timeless Design <br /> <i>Crafted with Precision</i>
          </h1>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      {/* Story Section - Asymmetric Layout */}
      <section className="about-story">
        <div className="container">
          <div className="story-flex">
            <div className="story-image-box">
              <img src={workshopImg} alt="Watch craftsmanship" />
              <div className="experience-badge">50+ Years</div>
            </div>
            
            <div className="story-text">
              <span className="section-tag">OUR JOURNEY</span>
              <h2>The Art of Keeping Time</h2>
              <p>
                Our journey began with a simple belief — time deserves respect. 
                At <strong>WatchHub</strong>, we don’t just assemble parts; we curate mechanical 
                poetry. Each watch is balanced between ancestral tradition and 
                vanguard modern engineering.
              </p>
              <p className="quote">
                "We don’t just measure seconds. We create moments meant to last 
                a lifetime."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Minimalist Cards */}
      <section className="about-values">
        <div className="container">
          <div className="values-grid">
            <div className="value-item">
              <span className="number">01</span>
              <h3>Precision</h3>
              <p>Every gear and spring is engineered for chronometric reliability.</p>
            </div>
            <div className="value-item">
              <span className="number">02</span>
              <h3>Design</h3>
              <p>Achieving complexity through minimalist, architectural aesthetics.</p>
            </div>
            <div className="value-item">
              <span className="number">03</span>
              <h3>Legacy</h3>
              <p>Heirlooms designed to be worn, remembered, and passed on.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;