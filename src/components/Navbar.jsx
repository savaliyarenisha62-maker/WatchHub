import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo1 from "../assets/img/logo3.png";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

export default function Navbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0); 
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    // 1. Load dynamic categories
    const savedCats = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(savedCats);

    // 2. Updated Cart Badge Logic
    const updateCartBadge = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // FIX: Counting unique items (array length) instead of summing quantities
      const uniqueItems = savedCart.length; 
      setCartCount(uniqueItems);
    };

    updateCartBadge();

    window.addEventListener("storage", updateCartBadge);
    window.addEventListener("cartUpdated", updateCartBadge);

    return () => {
      window.removeEventListener("storage", updateCartBadge);
      window.removeEventListener("cartUpdated", updateCartBadge);
    };
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("loggedInUser");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/"><img src={logo1} alt="WatchHub" className="nav-logo" /></Link>
        </div>

        <ul className="nav-menu">
          <li>
            <Link 
              to={role === "admin" ? "/admin" : "/"} 
              className={(location.pathname === "/" || location.pathname === "/admin") ? "active" : ""}
            >
              Home
            </Link>
          </li>          
          
          {role === "admin" ? (
            <>
              <li><Link to="/category" className={location.pathname === "/category" ? "active" : ""}>Category</Link></li>
              <li><Link to="/product" className={location.pathname === "/product" ? "active" : ""}>Product</Link></li>
              <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contacts</Link></li>
              <li><Link to="/orders" className={location.pathname === "/orders" ? "active" : ""}>Orders</Link></li>
              <li><Link to="/ManageUsers" className={location.pathname === "/ManageUsers" ? "active" : ""}>Users</Link></li>
            </>
          ) : (
            <>
              <li className="nav-dropdown">
                <span className="dropdown-label">Categories</span>
                <ul className="dropdown-content">
                  {categories.length > 0 ? (
                    categories.map(cat => (
                      <li key={cat.id} onClick={() => navigate(`/product?cat=${cat.name}`)}>{cat.name}</li>
                    ))
                  ) : (
                    <li>No Categories</li>
                  )}
                </ul>
              </li>
              <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
              <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
            </>
          )}
        </ul>

        <div className="nav-right">
          <div className="user-profile">
            <FaUserCircle className="user-icon" />
            <span className="display-name">
              {user?.userName || user?.name || (role === "admin" ? "Admin" : "Guest")}
            </span>
          </div>

          {user && role !== "admin" && (
            <div className="cart-wrapper" onClick={() => navigate("/cart")}>
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          )}
          
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>Logout</button>
        </div>
      </nav>

      {showLogoutModal && (
        <ConfirmationModal
          title="Logout?"
          desc="Are you sure you want to Logout?"
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          confirmBtnText="Logout"
        />
      )}
    </>
  );
}