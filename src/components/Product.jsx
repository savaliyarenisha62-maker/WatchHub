import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import "./Product.css";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaEye } from "react-icons/fa";
import Pagination from "./Pagination";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  
  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6); // Set to 6 cards per page

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedCategory = searchParams.get("cat");
  const role = localStorage.getItem("role");

  const [product, setProduct] = useState({
    name: "", description: "", quantity: "", price: "", category: "", image: "",
  });

  useEffect(() => {
    const savedCats = JSON.parse(localStorage.getItem("categories")) || [];
    setAvailableCategories(savedCats);
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  // Reset to page 1 whenever category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredProducts = products.filter((item) => {
    if (role === "admin") return true;
    return item.category === selectedCategory;
  });

  // --- PAGINATION LOGIC ---
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentItems = filteredProducts.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(filteredProducts.length / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (role !== "admin" && !selectedCategory) {
    return (
      <div className="no-selection-container">
        <div className="no-selection-box">
          <h2>Luxury Awaits</h2>
          <p>Please select a specific collection from the Categories menu to begin your experience.</p>
          <Link to="/" className="submit-btn" style={{textDecoration: 'none', display: 'inline-block', width: 'auto'}}>Return Home</Link>
        </div>
      </div>
    );
  }

  // ... (handleChange, handleSubmit, handleDelete, handleEdit remain the same)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => { setProduct({ ...product, image: reader.result }); };
      reader.readAsDataURL(files[0]);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, quantity, price, category } = product;
    if (!name || !description || !quantity || !price || !category) return alert("Please fill all fields");

    let updatedProducts;
    if (editId) {
      updatedProducts = products.map((p) => (p.id === editId ? { ...product, id: editId } : p));
      setEditId(null);
    } else {
      updatedProducts = [{ ...product, id: Date.now() }, ...products];
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProduct({ name: "", description: "", quantity: "", price: "", category: "", image: "" });
    setShowForm(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Remove this timepiece?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
    }
  };

  const handleEdit = (e, p) => {
    e.stopPropagation();
    setProduct(p);
    setEditId(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`admin-container ${role === 'admin' ? 'admin-view' : 'user-view'}`}>
      <div className="admin-header">
        <div className="title-section">
          <h2>{selectedCategory ? `${selectedCategory} Collection` : "All Watches"}</h2>
          <p>{role === "admin" ? "Manage your store items." : "Explore our premium watches."}</p>
          {role === "admin" && (
            <p style={{ fontSize: '12px', color: '#888' }}>Total items found: {filteredProducts.length}</p>
          )}
          {role === "admin" && (
            <button className={`toggle-form-btn ${showForm ? 'active' : ''}`} onClick={() => setShowForm(!showForm)}>
              {showForm ? <><FaTimes /> Close</> : <><FaPlus /> Add Product</>}
            </button>
          )}
        </div>
      </div>

      {showForm && role === "admin" && (
        <div className="form-overlay-center">
            {/* ... (Your existing form code) */}
            <div className="admin-box compact-centered">
            <h3>{editId ? "Update Asset" : "New Entry"}</h3>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="input-group"><label>Product Name</label><input type="text" name="name" value={product.name} onChange={handleChange} /></div>
                <div className="input-group"><label>Stock</label><input type="number" name="quantity" value={product.quantity} onChange={handleChange} /></div>
              </div>
              <div className="form-row">
                <div className="input-group"><label>Price (₹)</label><input type="number" name="price" value={product.price} onChange={handleChange} /></div>
                <div className="input-group">
                  <label>Collection</label>
                  <select name="category" value={product.category} onChange={handleChange}>
                    <option value="">Select</option>
                    {availableCategories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-group"><label>Description</label><textarea name="description" value={product.description} onChange={handleChange} /></div>
              <div className="input-group"><label>Image</label>
               {product.image && (
                <div >
 <img src={product.image} alt="Preview" className="product-image-preview" />
                </div>
              )}<input type="file" name="image" onChange={handleChange} /></div>
              
              <div className="form-actions-row">
                <button type="submit" className="submit-btn">{editId ? "Update Product" : "Add Product"}</button>
                <button type="button" className="close-btn-text" onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setProduct({ name: "", description: "", quantity: "", price: "", category: "", image: "" });
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="product-list-section">
        <div className="product-grid-3">
          {/* MAP THROUGH currentItems INSTEAD OF filteredProducts */}
          {currentItems.map((item) => (
            <div 
              key={item.id} 
              className="luxury-card"
              onClick={() => { if (role !== "admin") navigate(`/product-detail/${item.id}`); }}
              style={{ cursor: role === "admin" ? "default" : "pointer" }}
            >
              {role !== "admin" && (
                <div className="quick-view-overlay"><FaEye /> Quick View</div>
              )}
              <div className="card-img-container">
                <img src={item.image || 'https://via.placeholder.com/300'} alt={item.name} />
              </div>
              <div className="card-body">
                <div className="card-badge">{item.category}</div>
                <h4>{item.name}</h4>
                <div className="card-footer">
                  <span className="price-tag">₹{Number(item.price).toLocaleString('en-IN')}</span>
                  <span className="stock-tag">Stock: {item.quantity}</span>
                </div>
              </div>
              {role === "admin" && (
                <div className="card-actions-wrapper">
                  <button className="action-btn-lux edit-lux" onClick={(e) => handleEdit(e, item)}>EDIT</button>
                  <button className="action-btn-lux delete-lux" onClick={(e) => handleDelete(e, item.id)}>DELETE</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- PAGINATION COMPONENT --- */}
        {filteredProducts.length > postsPerPage && (
          <Pagination 
            currentPage={currentPage}
            totalPage={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {filteredProducts.length === 0 && <p className="empty-msg">No watches currently in this collection.</p>}
      </div>
    </div>
  );
}