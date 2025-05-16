import React, { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Bell, User, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import "./CompanyHeader.css" // This import remains the same

function CompanyHeader({
  onNavigateBack,
  onNavigateForward,
  canGoBack,
  canGoForward
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [notifications, setNotifications] = useState([
    // Example notifications, you might fetch these or pass them as props
    { id: 1, content: "New application for UI/UX Intern.", time: "2m ago" },
    { id: 2, content: "Your post 'Backend Developer' has 5 new views.", time: "1h ago" },
  ]);
  const notificationRef = useRef(null)
  const userDropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowUserDropdown(false) // Close user dropdown when opening notifications
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
    setShowNotifications(false) // Close notifications when opening user dropdown
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const handleLogout = () => {
    // Clear any stored user data/tokens
    localStorage.removeItem("userToken") // Example
    sessionStorage.removeItem("userToken") // Example
    
    // Navigate to login page or home page after logout
    navigate("/login") // Adjust to your login route
  }

  // Placeholder user data - in a real app, this would come from context, props, or a store
  const userData = {
    name: "Dell Technologies" // Example
  };


  return (
    <header className="ch-company-header">
      <div className="ch-header-left">
        {/* <div className="ch-logo">
          <img src="/path-to-your-logo.svg" alt="Company Logo" /> // Example logo
          <h1>Company Portal</h1>
        </div> */}
        <div className="ch-navigation-buttons">
          <button
            className={`ch-nav-button ${!canGoBack ? "ch-disabled" : ""}`}
            onClick={onNavigateBack}
            disabled={!canGoBack}
            aria-label="Go back"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            className={`ch-nav-button ${!canGoForward ? "ch-disabled" : ""}`}
            onClick={onNavigateForward}
            disabled={!canGoForward}
            aria-label="Go forward"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="ch-header-right">
        <div className="ch-notification-bell-container" ref={notificationRef}>
          <button className="ch-icon-button" onClick={toggleNotifications} aria-label="Toggle notifications">
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="ch-notification-badge">{notifications.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="ch-notifications-panel">
              <div className="ch-notifications-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button className="ch-clear-notifications" onClick={clearNotifications}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="ch-notifications-list">
                {notifications.length === 0 ? (
                  <div className="ch-no-notifications">
                    <p>No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => ( // Changed index to notification.id for key
                    <div key={notification.id} className="ch-notification-item">
                      <p className="ch-notification-content">{notification.content}</p>
                      <span className="ch-notification-time">{notification.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="ch-avatar-container" ref={userDropdownRef}>
          <button className="ch-avatar-button" onClick={toggleUserDropdown} aria-label="Toggle user menu">
            <div className="ch-avatar">
              <User size={20} />
            </div>
          </button>

          {showUserDropdown && (
            <div className="ch-user-dropdown">
              <div className="ch-user-info">
                <p className="ch-user-name">{userData.name}</p>
              </div>
              <button className="ch-logout-button" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default CompanyHeader