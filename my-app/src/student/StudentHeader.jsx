import React, { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Bell, User, LogOut } from "lucide-react"
import "./StudentHeader.css"

function StudentHeader({
  onNavigateBack,
  onNavigateForward,
  canGoBack,
  canGoForward
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, content: "New internship cycle begins on June 15th. Get ready!", time: "2m ago" },
    { id: 2, content: "Your internship report status has been set to 'Approved'.", time: "1h ago" },
  ])
  const notificationRef = useRef(null)
  const userDropdownRef = useRef(null)

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
    localStorage.removeItem("studentToken")
    sessionStorage.removeItem("studentToken")
    window.location.href = "/login"
  }

  const userData = {
    name: "Student User"
  }

  return (
    <header className="sh-student-header">
      <div className="sh-header-left">
        <div className="sh-navigation-buttons">
          <button
            className={`sh-nav-button ${!canGoBack ? "sh-disabled" : ""}`}
            onClick={onNavigateBack}
            disabled={!canGoBack}
            aria-label="Go back"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            className={`sh-nav-button ${!canGoForward ? "sh-disabled" : ""}`}
            onClick={onNavigateForward}
            disabled={!canGoForward}
            aria-label="Go forward"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="sh-header-right">
        <div className="sh-notification-bell-container" ref={notificationRef}>
          <button className="sh-icon-button" onClick={toggleNotifications} aria-label="Toggle notifications">
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="sh-notification-badge">{notifications.length}</span>
            )}
          </button>
          {showNotifications && (
            <div className="sh-notifications-panel">
              <div className="sh-notifications-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button className="sh-clear-notifications" onClick={clearNotifications}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="sh-notifications-list">
                {notifications.length === 0 ? (
                  <div className="sh-no-notifications">
                    <p>No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="sh-notification-item">
                      <p className="sh-notification-content">{notification.content}</p>
                      <span className="sh-notification-time">{notification.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="sh-avatar-container" ref={userDropdownRef}>
          <button className="sh-avatar-button" onClick={toggleUserDropdown} aria-label="Toggle user menu">
            <div className="sh-avatar">
              <User size={20} />
            </div>
          </button>
          {showUserDropdown && (
            <div className="sh-user-dropdown">
              <div className="sh-user-info">
                <p className="sh-user-name">{userData.name}</p>
              </div>
              <button className="sh-logout-button" onClick={handleLogout}>
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

export default StudentHeader 