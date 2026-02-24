import { useState } from "react";
import "./Login.css";
import imgw from "../assets/img/watch.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    // ✅ 1. Check for Admin first
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ userName: "Admin", email }));
      toast.success("Admin Login Successful");
      navigate("/admin"); 
      return;
    }

    // ✅ 2. If not Admin, check the "users" array for regular users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      localStorage.setItem("role", "user");
      toast.success("Login Successful");
      navigate("/"); // Navigate to user home
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="page">
      <ToastContainer />
      <div className="form-wrapper">
        <div className="image-section">
          <img src={imgw} alt="watch" />
        </div>

        <div className="form-section">
          <h2>Welcome Back</h2>
          <p className="subtitle">Please login to your account</p>

          <div className="input-row">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-row">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Select removed from here */}

          <button className="login-btn" onClick={handleLogin}>
            LOGIN
          </button>

          <p className="register-text">
            Not registered yet? <Link to="/registration">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;