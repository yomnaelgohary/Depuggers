import React, { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Bell, User, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import "./CompanyHeader.css"

function CompanyHeader({ 
  onNavigateBack, 
  onNavigateForward, 
  canGoBack, 
  canGoForward 
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])
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
    setShowUserDropdown(false)
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
    setShowNotifications(false)
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const handleLogout = () => {
    // Clear any stored user data/tokens
    localStorage.removeItem("userToken")
    sessionStorage.removeItem("userToken")
    
    // Navigate to login page
    navigate("/login")
  }

  return (
    <header className="company-header">
      <div className="header-left">
        <div className="navigation-buttons">
          <button 
            className={`nav-button ${!canGoBack ? "disabled" : ""}`}
            onClick={onNavigateBack}
            disabled={!canGoBack}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className={`nav-button ${!canGoForward ? "disabled" : ""}`}
            onClick={onNavigateForward}
            disabled={!canGoForward}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="header-right">
        <div className="notification-bell-container" ref={notificationRef}>
          <button className="icon-button" onClick={toggleNotifications}>
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-panel">
              <div className="notifications-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button className="clear-notifications" onClick={clearNotifications}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">
                    <p>No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                      <p className="notification-content">{notification.content}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="avatar-container" ref={userDropdownRef}>
          <button className="avatar-button" onClick={toggleUserDropdown}>
            <div className="avatar">
              <User size={16} />
            </div>
          </button>

          {showUserDropdown && (
            <div className="user-dropdown">
              <button className="logout-button" onClick={handleLogout}>
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