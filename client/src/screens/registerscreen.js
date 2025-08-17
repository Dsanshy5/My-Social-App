import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/loader";
import Error from "../components/error";
import Success from "../components/success";

function Registerscreen() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "Male", // Default value
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!formData.dateOfBirth || !formData.gender) {
            setError("All fields are required.");
            return;
        }

        try {
            setLoading(true);
            const { confirmPassword, ...postData } = formData;
            await axios.post("https://socially-backend-3btp.onrender.com/api/users/register", postData);
            
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <div className="register-box">
                    <h1>Register</h1>

                    {loading && <Loader />}
                    {error && <Error message={error} />}
                    {success && <Success message="Registration successful! Please log in." />}

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>Date of Birth:</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                            </div>
                            {/* --- NEW GENDER FIELD --- */}
                            <div className="col-md-6 form-group">
                                <label>Gender:</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-control" required>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other / Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
                        </div>
                        
                        <button type="submit" className="register-button" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                    <p className="mt-3">
                        Already have an account? <Link to="/login">Login here</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Registerscreen;
