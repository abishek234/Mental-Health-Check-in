import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitCheckIn } from '../api';
import './CheckInForm.css'; 

const CheckInForm = ({ token,onLogout }) => {
    const [checkInData, setCheckInData] = useState({
        moodRating: 5,
        stressLevel: 5,
        feelings: ''
    });
    const [moodAnalysis, setMoodAnalysis] = useState(null); // State to hold mood analysis
    const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCheckInData({ ...checkInData, [e.target.name]: e.target.value });
    };
    
    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Submit check-in and get response
            const response = await submitCheckIn(checkInData, token);
            const data = response.data; // Assuming response structure is correct

            // Set mood analysis from response
            setMoodAnalysis(data.moodanalysis); 
            setShowOverlay(true); // Show the overlay

            // Reset form
            setCheckInData({ moodRating: 5, stressLevel: 5, feelings: '' });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    // Function to get emoji based on mood rating
    const getEmojiForMood = (mood) => {
        if (mood === "Good Mood") return '😄'; // Happy
        if (mood === "Neutral Mood") return '😐'; // Neutral
        if (mood === "Bad Mood") return '😞'; // Sad
        return '🤔'; // Default for unknown mood
    };

    return (
     
        <div className="checkin-container">
            <h2>Daily Check-In</h2>
            <form onSubmit={handleSubmit} className="checkin-form">
                <div className="form-group">
                    <label>Mood Rating (1-10):</label>
                    <input 
                        type="range"
                        min="1"
                        max="10"
                        name="moodRating"
                        value={checkInData.moodRating}
                        onChange={handleChange}
                    />
                    <span>{checkInData.moodRating}</span>
                </div>
                <div className="form-group">
                    <label>Stress Level (1-10):</label>
                    <input 
                        type="number"
                        min="1"
                        max="10"
                        name="stressLevel"
                        value={checkInData.stressLevel}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        name="feelings"
                        placeholder="How are you feeling today?"
                        value={checkInData.feelings}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Submit Check-In</button>
                
                <button type="button" className="submit-button" onClick={handleLogout}>Logout</button>
            </form>

            {/* Overlay Card for Mood Analysis */}
            {showOverlay && (
                <div className="overlay-card">
                    <div className="overlay-content">
                        <h3>Mood Analysis</h3>
                        <p>Your mood is: {moodAnalysis ? moodAnalysis : 'N/A'}</p>
                        <p>{getEmojiForMood(moodAnalysis)}</p>
                        <button onClick={closeOverlay} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default CheckInForm;