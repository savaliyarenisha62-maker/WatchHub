import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaChevronLeft, FaRegCreditCard } from "react-icons/fa";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", address: "" });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    setTotal(savedCart.reduce((acc, item) => acc + item.price * item.cartQty, 0));

    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser.userName || currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "" 
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderDetails = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      orderDate: new Date().toLocaleString(),
      customer: formData,
      items: cartItems,
      totalAmount: total
    };
    localStorage.setItem("latestOrder", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/bill");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        
        {/* LEFT SECTION: FORM */}
        <div className="checkout-form-section">
          <button className="back-btn" onClick={() => navigate("/cart")}>
            <FaChevronLeft /> Return to Selection
          </button>
          
          <div className="checkout-header">
            <p className="step-label">Step 01 / 02</p>
            <h1>Shipping Details</h1>
          </div>

          <form onSubmit={handlePlaceOrder} className="noir-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Shipping Address</label>
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                rows="4" 
                required 
              />
            </div>

            <div className="payment-method-box">
               <div className="payment-header">
                 <FaRegCreditCard /> <span>Payment Method</span>
               </div>
               <p style={{margin: 0, fontSize: "14px", color: "var(--noir)"}}>
                 Cash on Delivery
               </p>
            </div>

            <button type="submit" className="place-order-btn">
              Complete Order <FaLock style={{marginLeft: '10px', fontSize: '12px'}}/>
            </button>
          </form>
        </div>

        {/* RIGHT SECTION: STICKY SIDEBAR */}
        <aside className="order-summary-section">
          <div className="summary-box-noir">
            <h3>Summary</h3>
            
            <div className="summary-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-img-mini">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="summary-details">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-qty">Qty: {item.cartQty}</p>
                  </div>
                  <span className="summary-item-price">
                    ₹{(item.price * item.cartQty).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="final-bill">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="bill-row">
                <span>Logistics</span>
                <span style={{fontWeight: 600, color: 'var(--noir)'}}>Gratis</span>
              </div>
              <div className="bill-total">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}