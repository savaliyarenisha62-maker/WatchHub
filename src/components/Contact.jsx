import React, { useState, useEffect } from "react";
import { FaTrash, FaEnvelope, FaChevronLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "./Contact.css";

const Contact = () => {
  const [role] = useState(localStorage.getItem("role"));
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // --- INITIALIZATION ---
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && role !== "admin") {
      setFormData((prev) => ({
        ...prev,
        firstName: user.userName || "",
        email: user.email || "",
      }));
    }

    if (role === "admin") {
      const savedMessages = JSON.parse(localStorage.getItem("contacts")) || [];
      setMessages(savedMessages);
    }
  }, [role]);

  // --- USER LOGIC: Handle Form Submission ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return toast.error("Please enter a message");

    const existingMessages = JSON.parse(localStorage.getItem("contacts")) || [];
    const newMessage = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("contacts", JSON.stringify([newMessage, ...existingMessages]));
    toast.success("Message sent successfully! 🚀");
    setFormData({ ...formData, message: "" });
  };

  // --- ADMIN LOGIC: Handle Message Deletion ---
  const deleteMessage = (id) => {
    if (window.confirm("Delete this inquiry?")) {
      const updated = messages.filter((m) => m.id !== id);
      setMessages(updated);
      localStorage.setItem("contacts", JSON.stringify(updated));
      toast.info("Message removed.");
    }
  };

  // --- RENDER ADMIN VIEW ---
  if (role === "admin") {
    return (
      <div className="admin-container">
        <header className="admin-header">
          <div className="title-section">
            <h2>User Inquiries</h2>
            <p>Review and manage client communications.</p>
          </div>
        </header>

        <div className="message-list-grid">
          {messages.length > 0 ? (
            messages.map((m) => (
              <div key={m.id} className="luxury-card message-card-admin">
                <div className="message-header">
                  <div className="user-meta">
                    <FaEnvelope className="icon-msg" />
                    <div>
                      <h4>{m.firstName} {m.lastName}</h4>
                      <small>{m.date}</small>
                    </div>
                  </div>
                  <button onClick={() => deleteMessage(m.id)} className="delete-lux-btn">
                    <FaTrash />
                  </button>
                </div>
                <div className="message-content-admin">
                  <p className="msg-email"><strong>From:</strong> {m.email}</p>
                  <p className="msg-text">"{m.message}"</p>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-msg">No messages in the vault.</p>
          )}
        </div>
      </div>
    );
  }

  // --- RENDER USER VIEW ---
  return (
    <div className="contact">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="contact-wrapper">
        <div className="contact-info">
          <span className="tag">CONTACT</span>
          <h1>Let’s Talk.</h1>
          <p>Tell us what you’re looking for and we’ll get back to you shortly.</p>
          <div className="info">
            <div><h4>Email</h4><p>watchHub@gmail.com</p></div>
            <div><h4>Phone</h4><p>+91 80055 50199</p></div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input type="text" name="firstName" value={formData.firstName} readOnly />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            </div>
            <input type="email" name="email" value={formData.email} readOnly className="readonly-input" />
            <textarea name="message" placeholder="Your message" value={formData.message} onChange={handleChange}></textarea>
            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;