"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import "./App.css"
import SCAD from "./SCAD" // Import the SCAD component
import Faculty from "./Faculty" // Import the Faculty component
import ReportView from "./report-view" // Import the ReportView component
import Company from "./Company"
import CompanyRegister from "./Companyregister"
import Student from "./Student" 
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
    } else if (email.toLowerCase() === "company" && password === "1234") {
      navigate("/company")
    }
    else if (email.toLowerCase() === "student" && password === "1234") {
      navigate("/student")
    }
     else {
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

export {LoginPage};

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
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-company" element={<CompanyRegister />} />
        <Route path="/dashboard/:role" element={<DashboardWrapper />} />
        <Route path="/SCAD" element={<SCAD />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/report-view/:studentId" element={<ReportView />} />
        <Route path="/company" element={<Company />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  )
}

export default App
