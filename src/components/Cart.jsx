import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaMinus, FaPlus, FaChevronLeft, FaTrash } from "react-icons/fa";
import "./Cart.css";
import ConfirmationModal from "./ConfirmationModal";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const cleanCart = savedCart.map(item => ({
      ...item,
      price: Number(item.price) || 0,
      stock: Number(item.stock) || Number(item.quantity) || 0,
      cartQty: Number(item.cartQty) || 1
    }));
    
    setCartItems(cleanCart);
  }, []);

  const updateQuantity = (id, change) => {
    const updated = cartItems.map((item) => {
      if (String(item.id) !== String(id)) return item;

      const currentQty = Number(item.cartQty) || 1;
      const maxAvailable = Number(item.stock) || 0;
      
      let newQty = currentQty + change;

      if (newQty < 1) newQty = 1;
      if (newQty > maxAvailable) newQty = maxAvailable;

      return { ...item, cartQty: newQty };
    });

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const confirmDelete = (id) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  };

  const removeItem = () => {
    const updated = cartItems.filter((item) => item.id !== selectedItemId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    setShowDeleteModal(false);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * item.cartQty),
    0
  );

  if (!cartItems.length) {
    return (
      <div className="empty-cart">
        <h2>Your Vault is Empty</h2>
        <Link to="/" className="shop-now-btn">Explore Watches</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <header className="cart-header">
        <div>
          <span className="subtitle">Curated</span>
          <h1>Your Selection</h1>
        </div>
        <button className="back-btn" onClick={() => navigate("/")}>
          <FaChevronLeft /> Back
        </button>
      </header>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item premium" key={item.id}>
              
              {/* --- START OF CLICKABLE AREA --- */}
              {/* We wrap the image and info but leave buttons outside */}
              <div 
                style={{ display: 'contents', cursor: 'pointer' }} 
                onClick={() => navigate(`/product-detail/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
              </div>
              {/* --- END OF CLICKABLE AREA --- */}

              <div className="item-actions">
                <div className="qty-box">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents navigating when clicking buttons
                      updateQuantity(item.id, -1);
                    }}
                    disabled={item.cartQty <= 1}
                  >
                    <FaMinus />
                  </button>

                  <span>{item.cartQty}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents navigating when clicking buttons
                      updateQuantity(item.id, 1);
                    }}
                    disabled={item.cartQty >= item.stock}
                  >
                    <FaPlus />
                  </button>
                </div>

                <button 
                  className="delete-btn" 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents navigating when clicking delete
                    confirmDelete(item.id);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="row">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <div className="row">
            <span>Delivery</span>
            <span className="free">FREE</span>
          </div>
          <div className="total">
            <span>Total</span>
            <h2>₹{total.toLocaleString("en-IN")}</h2>
          </div>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Secure Checkout
          </button>
        </aside>
      </div>

      {showDeleteModal && (
        <ConfirmationModal
          title="Remove Item?"
          desc="Are you sure you want to remove this watch from your selection?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={removeItem}
          confirmBtnText="Yes, Remove"
        />
      )}
    </div>
  );
}