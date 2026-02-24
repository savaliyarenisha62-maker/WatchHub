import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductDetail.css";
import { FaChevronLeft, FaShoppingBag } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const foundItem = products.find((p) => p.id === parseInt(id));
    setItem(foundItem);
  }, [id]);

  const handleAddToCart = () => {
    if (!item || item.quantity <= 0) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedProducts = products.map((p) => {
      if (p.id === item.id) return { ...p, quantity: p.quantity - 1 };
      return p;
    });

    const existingInCart = cart.find((c) => c.id === item.id);
    let updatedCart;

    if (existingInCart) {
      updatedCart = cart.map((c) =>
        c.id === item.id ? { ...c, cartQty: (c.cartQty || 1) + 1 } : c
      );
    } else {
      updatedCart = [...cart, { ...item, cartQty: 1 }];
    }

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // TRIGER NAV REFRESH
    window.dispatchEvent(new Event("cartUpdated")); 

    setItem({ ...item, quantity: item.quantity - 1 });
    alert(`${item.name} has been added to your vault.`);
  };

  if (!item) return <div className="loader-container">Loading Vault...</div>;

  return (
    <div className="details-container">
      
      
      <div className="details-grid">
        <div className="details-image-section">
          <div className="details-image-wrapper">
             <img src={item.image} alt={item.name} />
          </div>
        </div>
        <div className="details-info">
          <header className="info-header">
            <span className="details-category-tag">{item.category}</span>
            <span className={`status-indicator ${item.quantity > 0 ? "in-stock" : "out-stock"}`}>
               {item.quantity > 0 ? `In Stock (${item.quantity})` : "Currently Unavailable"}
            </span>
          </header>
          <h1 className="product-title-refined">{item.name}</h1>
          <p className="details-price-refined">₹{Number(item.price).toLocaleString('en-IN')}</p>
          <div className="details-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>
          
          <button className="add-to-cart-btn-lux" onClick={handleAddToCart} disabled={item.quantity <= 0}>
            <FaShoppingBag className="btn-icon" /> {item.quantity > 0 ? "Add to Cart" : "Sold Out"}
          </button>
          <p className="shipping-note">Complimentary insured shipping included.</p>
        </div>
      </div>
    </div>
  );
}