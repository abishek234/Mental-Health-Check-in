import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import CheckInForm from './components/checkForm'; 
import './App.css';

const App = () => {
    const [token, setToken] = useState(() => {
        // Retrieve token from localStorage if it exists
        return localStorage.getItem('token') || null;
    });

    const handleLogin = (token) => {
        setToken(token);
        // Store token in localStorage
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setToken(null);
        // Remove token from localStorage
        localStorage.removeItem('token');
    };

    const handleRegister = () => {
        alert('Registration successful! You can now log in.');
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {!token ? (
                        <>
                            <Route path="/register" element={<Register onRegister={handleRegister} />} />
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            {/* Redirect to login as default */}
                            <Route path="/" element={<Navigate to="/login" />} />
                        </>
                    ) : (
                        <>
                            {/* Show check-in form when logged in */}
                            <Route path="/checkin" element={<CheckInForm token={token} onLogout={handleLogout} />} />
                            
                            {/* Redirect to check-in form if user tries to access root */}
                            <Route path="/" element={<Navigate to="/checkin" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;