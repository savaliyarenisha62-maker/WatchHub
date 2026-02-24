import { useState } from "react";
import "./Registration.css";
import imgw from "../assets/img/watch.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.userName || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits 📱");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((u) => u.email === formData.email);
    if (emailExists) {
      toast.error("Email is already registered!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    toast.success("Registration Successful 🎉");

    setFormData({
      userName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000); 
  };

  return (
    <div className="page">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="form-wrapper">
        <div className="image-section">
          <img src={imgw} alt="watch" />
        </div>

        <div className="form-section">
          <h2>Create Account</h2>
          <p className="subtitle">Join us by creating your account</p>

          <div className="input-row">
            {/* User Name - Words only restricted */}
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={formData.userName}
              onChange={(e) => {
                // Allows only English letters and spaces
                const onlyWords = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setFormData({ ...formData, userName: onlyWords });
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              maxLength="10"
              value={formData.phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                setFormData({ ...formData, phone: onlyNums });
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          <button className="register-regbtn" onClick={handleSubmit}>
            REGISTER
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;