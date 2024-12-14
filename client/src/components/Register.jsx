import React, { useState } from 'react';
import { registerUser } from '../api'; 
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero.jpg';
import "./Auth.css"; 

const Register = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cpassword: '',
        location: '',
        phoneno: '' // Added phoneno to the initial state
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Regex patterns
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email pattern
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password must be at least 8 characters long and contain letters and numbers
        const phonePattern = /^\d{10}$/; // Phone number must be exactly 10 digits

        if (!emailPattern.test(formData.email)) {
            return "Please enter a valid email address.";
        }
        if (!passwordPattern.test(formData.password)) {
            return "Password must be at least 8 characters long and contain at least one letter and one number.";
        }
        if (formData.password !== formData.cpassword) {
            return "Passwords do not match.";
        }
        if (!phonePattern.test(formData.phoneno)) {
            return "Phone number must be exactly 10 digits.";
        }
        
        return null; // No errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return; // Stop submission if there are validation errors
        }
        console.log(formData);
        try {
            await registerUser(formData);
            onRegister(); // Callback to update state in parent component after successful registration
            navigate('/login');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="image-section">
                <img src={hero} alt="Background" />
            </div>
            <div className="form-section">
                <div className="glassmorphism-card-register">
                    {error && <p className="error-message">{error}</p>}
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group-row">
                            <div className="input-group">
                                <label>First Name</label>
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    placeholder="Enter First Name" 
                                    value={formData.firstname} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label>Last Name</label>
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    placeholder="Enter Last Name" 
                                    value={formData.lastname} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="input-group-row">
                            <div className="input-group">
                                <label>EmailID</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter EmailID" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <label>Location</label>
                                <input 
                                    type="text" 
                                    name="location" 
                                    placeholder="Enter Location" 
                                    value={formData.location} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Phone Number</label>
                            <input 
                                type="text" // Changed to text to allow handling of leading zeros
                                name="phoneno" 
                                placeholder="Enter Phone Number"
                                value={formData.phoneno} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                name="cpassword" 
                                placeholder="Enter Password Again" 
                                value={formData.cpassword} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <a href="/">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;