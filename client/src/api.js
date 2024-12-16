import axios from 'axios';

const API_URL = 'https://mental-health-check-in-1.onrender.com/api'; 

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/login`, userData);
};

export const submitCheckIn = async (checkInData, token) => {
    return await axios.post(`${API_URL}/checkins`, checkInData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getMoodAnalysis = async (token) => {
    return await axios.get(`${API_URL}/checkins`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};