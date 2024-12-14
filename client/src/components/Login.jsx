import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

import "./Auth.css"; 
import hero from '../assets/hero.jpg';  

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            onLogin(response.data.token); // Pass the token to the parent component
            navigate('/checkin');
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
                <div className="glassmorphism-card">
                    <h1>Log In</h1>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>EmailID</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter Email Address" 
                                required 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter Password" 
                                required 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                        </div>
                        <button type="submit">Log In</button>
                    </form>
                    <p>Need an account? <a href="/register">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

