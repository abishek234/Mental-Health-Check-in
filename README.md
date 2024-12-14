# Mental Health Check-in Web Application

## Overview
This project involves developing a web application for daily mental health check-ins. The application allows users to log in, complete a form to track their mental well-being, and receive reminders if they miss a check-in. The project demonstrates full-stack development, data security, sentiment analysis, and deployment.

---

## Features
### 1. **Front-End (React)**
- **User Interface**:
  - Login page with secure authentication.
  - Daily check-in form with fields for:
    - **Mood Rating**: Slider (1 to 10).
    - **Stress Level**: Dropdown or numeric input.
    - **Feelings**: Text area for users to describe their feelings.
  - Responsive design to support multiple screen sizes (mobile, tablet, desktop).
  
- **Sentiment Analysis Integration**:
  - Sentiment of the user’s feelings text is analyzed using the Node.js Sentiment library.
  - The result is displayed to users (e.g., "Positive", "Neutral", or "Negative").

### 2. **Back-End (Node.js)**
- **RESTful API**:
  - Endpoints for user registration, login, and check-in data submission.
  - Includes sentiment analysis results in the data sent to the database.

- **Authentication**:
  - Secure login using JSON Web Tokens (JWT).
  - Authentication middleware ensures only logged-in users can access check-in endpoints.

- **Data Storage**:
  - MongoDB or PostgreSQL database to store user profiles and daily check-ins.
  - Structure includes:
    - User details (name, email, hashed password).
    - Check-in entries with date, mood rating, stress level, feelings text, sentiment analysis, and timestamp.

### 3. **Data Security**
- **Encryption**:
  - User passwords hashed with bcrypt before saving to the database.
  - Data encryption applied to sensitive check-in data before storage.

- **Secure Communication**:
  - HTTPS for encrypted communication between front-end and back-end.

### 4. **Email Reminders**
- **Automated Reminder System**:
  - Sends an email reminder at 10:00 PM if a user has not submitted their daily check-in.
  - Cron job (using Node.js) checks for missing entries and triggers emails via an email service like Nodemailer or SendGrid.

---

## Documentation

### Application Architecture
1. **Front-End**:
   - Built with React.js using functional components.
   - State management with Context API or Redux.

2. **Back-End**:
   - Node.js with Express.js for API routing.
   - Sentiment analysis library integrated into the backend API.

3. **Database**:
   - MongoDB/Atlas for storing user and check-in data.

4. **Reminder System**:
   - Scheduled with `node-cron`.
   - Emails sent using Nodemailer.

### Local Development Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/username/mental-health-checkin.git
   cd mental-health-checkin
   ```

2. Install dependencies for both front-end and back-end:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Start the database:
   ```bash
   docker-compose up
   ```

4. Start the backend and frontend servers:
   ```bash
   # In /backend
   npm run dev

   # In /frontend
   npm start
   ```

5. Access the application at `http://localhost:5173`.

### Challenges
- **Sentiment Analysis Accuracy**:
  - Tuned the sentiment library by analyzing user inputs to improve result reliability.

- **Reminder Efficiency**:
  - Optimized cron jobs to handle large user bases without performance degradation.

- **Deployment Security**:
  - Ensured secure environment variables and minimized vulnerabilities during deployment.

---

## Additional Notes
- The application ensures user data privacy and adheres to modern security best practices.
- Provides insightful sentiment analysis to users, promoting better mental health tracking and awareness.

---

### Future Enhancements
1. Add support for multi-language sentiment analysis.
2. Incorporate analytics dashboards for users to track long-term trends.
3. Enable push notifications for reminders in addition to email.

