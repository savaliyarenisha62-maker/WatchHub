import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import watch1 from "../assets/img/watch1.png";
import watch2 from "../assets/img/watch2.png";
import { FaEye } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin");
    }

    // Load and shuffle 6 random products from localStorage
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    setFeatured(shuffled.slice(0, 6));
  }, [role, navigate]);

  return (
    <div className="home-wrapper">
      <HeroSlider />

      {/* --- CATEGORY SECTION --- */}
      <section className="category-section">
        <div className="section-title">
          <span>OUR COLLECTIONS</span>
          <h2>Shop by Category</h2>
        </div>

        <div className="category-grid">
          <div className="category-box" onClick={() => navigate("/product?cat=Men")}>
            <img src={watch1} alt="Men" />
            <div className="category-overlay">
              <div className="category-text">
                <h3>FOR HIM</h3>
                <button className="shop-btn">Explore</button>
              </div>
            </div>
          </div>

          <div className="category-box" onClick={() => navigate("/product?cat=Women")}>
            <img src={watch2} alt="Women" />
            <div className="category-overlay">
              <div className="category-text">
                <h3>FOR HER</h3>
                <button className="shop-btn">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED SECTION (Direct Redirect) --- */}
      <section className="featured-section">
        <div className="section-title">
          <span>SELECTED FOR YOU</span>
          <h2>Featured Timepieces</h2>
        </div>

        <div className="product-grid-3">
          {featured.map((item) => (
            <div 
              key={item.id} 
              className="luxury-card"
              onClick={() => navigate(`/product-detail/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
         
                              <div className="quick-view-overlay"><FaEye/> Quick View</div>
                            
              <div className="card-img-container">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="card-body">
                <span className="category-tag">{item.category}</span>
                <h4>{item.name}</h4>
                <p className="price-tag">₹{Number(item.price).toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;