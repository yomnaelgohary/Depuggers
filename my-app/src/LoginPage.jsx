"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logoImage from './assets/83827-200.png'
import "./LoginPage.css"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({})
  const [rememberMe, setRememberMe] = useState(false)
  const [showPasswordHint, setShowPasswordHint] = useState(false)
  const navigate = useNavigate()

  const validDomains = {
    scad: "scad.com",
    faculty: "faculty.com",
    student: "student.com",
    prostudent: "prostudent.com",
    company: "company.com"
  };

  const getRoleFromEmail = (email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return null;
    if (domain === validDomains.scad) return "scad";
    if (domain === validDomains.faculty) return "faculty";
    if (domain === validDomains.student) return "student";
    if (domain === validDomains.prostudent) return "prostudent";
    if (domain === validDomains.company) return "company";
    return null;
  };

  const handleLogin = () => {
    const newErrors = {}

    if (!username.trim()) {
      newErrors.username = "Please enter your email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
      newErrors.username = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Please enter your password"
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
      return
    }

    const emailLower = username.toLowerCase();
    const role = getRoleFromEmail(emailLower);

    if (!role) {
      setError({ username: "Email must be from @scad.com, @faculty.com, @student.com, @prostudent.com, or @company.com" })
    } else if (password !== "1234") {
      setError({ password: "Incorrect password" })
    } else {
      if (role === "scad") navigate("/SCAD")
      else if (role === "faculty") navigate("/faculty")
      else if (role === "student") navigate("/student")
      else if (role === "prostudent") navigate("/prostudent")
      else if (role === "company") navigate("/company")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  const handleRegister = () => {
    navigate("/register-company")
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setShowPasswordHint(true)
  }

  return (
    <div className="login-container">
      <div className="login-welcome-panel">
        <div className="welcome-content">
          <h1>Welcome to</h1>
          <h1 className="brand-name">DEPUGGERS</h1>
          <p className="welcome-subtitle">It's good to have you back! <br/>Please enter your credentials to login.</p>
        </div>
        <div className="background-patterns"></div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-container">
          <div className="logo-container">
            <img src={logoImage || "/placeholder.svg"} alt="Logo" style={{ width: '40px', height: 'auto' }} />
            <h3 className="logo-text">DEPUGGERS</h3>
          </div>

          <div className="login-form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input
                id="username"
                type="email"
                placeholder="Enter your institutional email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className={error.username ? "input-error" : ""}
              />
              {error.username && <div className="error-message">{error.username}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className={error.password ? "input-error" : ""}
              />
              {error.password && <div className="error-message">{error.password}</div>}
              {showPasswordHint && <div className="password-hint">Hint: Your password is 1234</div>}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password" onClick={handleForgotPassword}>
                Forgot your password?
              </a>
            </div>

            <button className="login-button" onClick={handleLogin}>
              Login to Account
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button className="register-button" onClick={handleRegister}>
              Register Now (for Companies)
            </button>
          </div>

          <div className="login-footer">
            <p>© Depuggers {new Date().getFullYear()}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
