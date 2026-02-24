import ConfirmationModal from "./ConfirmationModal";
import './Category.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Category() {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const role = localStorage.getItem("role");

    useEffect(() => {
        // SECURITY GATEKEEPER
        if (role !== "admin") {
            navigate("/"); 
            return;
        }

        const saved = JSON.parse(localStorage.getItem("categories")) || [];
        setCategories(saved);
    }, [role, navigate]);

    // Prevent rendering if not admin
    if (role !== "admin") return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return alert("Enter name");
        const updated = editId 
            ? categories.map(c => c.id === editId ? {...c, name: categoryName} : c)
            : [...categories, { id: Date.now(), name: categoryName }];
        
        setCategories(updated);
        localStorage.setItem("categories", JSON.stringify(updated));
        setCategoryName("");
        setShowForm(false);
        setEditId(null);
    };

    return (
        <div className="category-page">
            <div className="category-header"><h1>Manage Categories</h1></div>
            {!showForm && !editId ? (
                <button className="createform-btn" onClick={() => setShowForm(true)}>+ Add Category</button>
            ) : (
                <div className="admin-category-box">
                    <form onSubmit={handleSubmit} className="category-form-vertical">
                        <input 
                            className="category-input-field"
                            value={categoryName} 
                            onChange={(e) => setCategoryName(e.target.value)} 
                            placeholder="Category Name" 
                        />
                        <div className="category-form-actions">
                            <button type="submit" className="btn btn1-category">Add</button>
                            <button type="button" className="btn btn2-category" onClick={() => {setShowForm(false); setEditId(null);}}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <div className="category-container">
                {categories.map(cat => (
                    <div key={cat.id} className="category-item">
                        <span className="category-text">{cat.name}</span>
                        <div className="category-actions">
                            <button onClick={() => {setCategoryName(cat.name); setEditId(cat.id); setShowForm(true);}} className="action-btn edit">EDIT</button>
                            <button onClick={() => {setDeleteId(cat.id); setShowModal(true);}} className="action-btn delete">DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
    <ConfirmationModal 
        title="Delete Category?"
        desc="Are you sure you want to delete this category?"
        onClose={() => setShowModal(false)} 
        confirmBtnText="Delete"
        onConfirm={() => {
            // 1. Identify the category being deleted to get its name
            const categoryToDelete = categories.find(c => c.id === deleteId);
            
            if (categoryToDelete) {
                // 2. Filter out the category
                const updatedCategories = categories.filter(c => c.id !== deleteId);
                setCategories(updatedCategories);
                localStorage.setItem("categories", JSON.stringify(updatedCategories));

                // 3. Cascade Delete: Filter out all products belonging to this category
                const allProducts = JSON.parse(localStorage.getItem("products")) || [];
                const updatedProducts = allProducts.filter(
                    product => product.category !== categoryToDelete.name
                );
                
                // 4. Update products in localStorage
                localStorage.setItem("products", JSON.stringify(updatedProducts));
            }

            setShowModal(false);
            setDeleteId(null);
        }} 
    />
)}
        </div>
    );
}