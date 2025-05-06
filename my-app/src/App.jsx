import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Dummy users
const dummyUsers = {
  omar: { password: '1234', role: 'student' },
  company: { password: '1234', role: 'company' },
  pro: { password: '1234', role: 'pro-student' },
  scad: { password: '1234', role: 'scad-office' },
  faculty: { password: '1234', role: 'faculty-member' },
};

// LoginPage component
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = dummyUsers[email.toLowerCase()];
    if (user && user.password === password) {
      navigate(`/dashboard/${user.role}`);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleRegister = () => {
    // You would typically navigate to a registration page here
    console.log('Register button clicked for companies');
    // For now, let's just navigate to a placeholder or handle as needed
    navigate('/register-company');
  };

  return (
    <div className="app-container">
      <div className="welcome-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email (e.g. omar)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password (e.g. 1234)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="cta-button" onClick={handleLogin}>
          Login
        </button>
        <button className="register-button" onClick={handleRegister}>
          Register Now (for Companies)
        </button>
      </div>
    </div>
  );
}

// GetStartedPage component
function GetStartedPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="get-started-container">
      <div className="content-box">
        <h1>Welcome to the GUC Internship System</h1>
        <p>
          Manage your internships with ease. Students, faculty, and companies can access everything from applications to progress tracking—all in one place.
        </p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

// Placeholder for a company registration page
function CompanyRegistrationPage() {
  return (
    <div className="app-container">
      <div className="welcome-box">
        <h2>Company Registration</h2>
        <p>This is a placeholder for the company registration page.</p>
        {/* Add your registration form here */}
      </div>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;