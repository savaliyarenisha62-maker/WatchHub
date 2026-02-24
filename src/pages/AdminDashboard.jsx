import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; 
import { FaBoxes, FaTags, FaEnvelopeOpenText, FaShoppingCart, FaUsers } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    contacts: 0,
    orders: 0, 
    users:0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || []; 
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setStats({
      products: savedProducts.length,
      categories: savedCategories.length,
      contacts: savedContacts.length,
      orders: savedOrders.length,
      users:savedUsers.length,
    });
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Administrative Overview</h1>
        <p>Monitor your inventory, orders, and system status at a glance.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card" onClick={() => navigate("/product")}>
          <div className="stat-icon"><FaBoxes /></div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p className="stat-number">{stats.products}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/category")}>
          <div className="stat-icon"><FaTags /></div>
          <div className="stat-info">
            <h3>Active Categories</h3>
            <p className="stat-number">{stats.categories}</p>
          </div>
        </div>

         <div className="stat-card" onClick={() => navigate("/ManageUsers")}>
          <div className="stat-icon"><FaUsers /></div>
          <div className="stat-info">
            <h3>Manage Userss</h3>
            <p className="stat-number">{stats.users}</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => navigate("/contact")}>
          <div className="stat-icon"><FaEnvelopeOpenText /></div>
          <div className="stat-info">
            <h3>User Contacts</h3>
            <p className="stat-number">{stats.contacts}</p>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/orders")}>
          <div className="stat-icon"><FaShoppingCart /></div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-number">{stats.orders}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Management</h2>
        <div className="action-buttons">
          <button onClick={() => navigate("/category")}>Manage Categories</button>
          <button onClick={() => navigate("/product")}>Update Products</button>
          <button onClick={() => navigate("/contact")}>View Messages</button>
          <button onClick={() => navigate("/orders")}>View Orders</button>
          <button onClick={() => navigate("/ManageUsers")}>View Users</button> {/* New button */}

        </div>
      </div>
    </div>
  );
}
