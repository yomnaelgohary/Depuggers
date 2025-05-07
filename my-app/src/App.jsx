"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import "./App.css"
import SCAD from "./SCAD" // Import the SCAD component
import Faculty from "./Faculty" // Import the Faculty component

// LoginPage component
function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    // Check credentials and redirect accordingly
    if (email.toLowerCase() === "scad" && password === "1234") {
      navigate("/SCAD")
    } else if (email.toLowerCase() === "faculty" && password === "1234") {
      navigate("/faculty")
    } else {
      setError("Invalid credentials")
    }
  }

  const handleRegister = () => {
    // You would typically navigate to a registration page here
    console.log("Register button clicked for companies")
    // For now, let's just navigate to a placeholder or handle as needed
    navigate("/register-company")
  }

  return (
    <div className="app-container">
      <div className="welcome-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email (e.g. scad or faculty)"
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="cta-button" onClick={handleLogin}>
          Login
        </button>
        <button className="register-button" onClick={handleRegister}>
          Register Now (for Companies)
        </button>
      </div>
    </div>
  )
}

// GetStartedPage component
function GetStartedPage() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/login")
  }

  return (
    <div className="get-started-container">
      <div className="content-box">
        <h1>Welcome to the GUC Internship System</h1>
        <p>
          Manage your internships with ease. Students, faculty, and companies can access everything from applications to
          progress tracking—all in one place.
        </p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  )
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
  )
}

// Dashboard wrapper component to handle different role dashboards
function DashboardWrapper() {
  // This would normally check the user role and render the appropriate dashboard
  // For now, we'll just render a placeholder
  return (
    <div className="app-container">
      <div className="welcome-box">
        <h2>Dashboard</h2>
        <p>This is a placeholder for the role-specific dashboard.</p>
      </div>
    </div>
  )
}

// Main App component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-company" element={<CompanyRegistrationPage />} />
        <Route path="/dashboard/:role" element={<DashboardWrapper />} />
        <Route path="/SCAD" element={<SCAD />} />
        <Route path="/faculty" element={<Faculty />} />
      </Routes>
    </Router>
  )
}

export default App
