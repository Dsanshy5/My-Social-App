import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Loader from "../components/loader";

function LoginScreen({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        setLoading(true);
        setApiError("");
        setSuccessMessage("");

        // The API call now uses a relative path, which will be handled by the proxy.
        const result = await axios.post(
          "https://socially-backend-3btp.onrender.com/api/users/login", // <-- CORRECTED LINE
          formData
        );

        console.log("Login successful:", result.data);
        localStorage.setItem("currentUser", JSON.stringify(result.data));
        setUser(result.data);
        setSuccessMessage("Login successful! Redirecting...");
        setFormData({ email: "", password: "" });

        const from = location.state?.from || "/home";
        if (result.data.isAdmin) {
          navigate("/admin");
        } else {
          navigate(from);
        }
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response) {
          if (error.response.status === 400) { // Changed 401 to 400 to match backend
            setApiError("Invalid email or password.");
          } else {
            setApiError("Something went wrong. Please try again later.");
          }
        } else if (error.request) {
            // This now correctly identifies when the server is not responding
            setApiError("Cannot connect to the server. Please ensure it is running.");
        } else {
          setApiError("Login failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <div className="register-box">
          <h1>Login</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                  {errors.password}
                </p>
              )}
            </div>
            {apiError && (
              <p style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {apiError}
              </p>
            )}
            {successMessage && (
              <p style={{ color: "green", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {successMessage}
              </p>
            )}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;