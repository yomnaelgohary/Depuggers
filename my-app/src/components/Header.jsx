"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, User, LogOut, X, Info, AlertTriangle, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import "./Header.css"

// Inline NotificationsPanel component
function NotificationsPanel({ onClose, notifications, clearNotifications, removeNotification }) {
  // Dummy notifications to use if no real notifications exist
  const dummyNotifications = [
    {
      id: 1,
      message: "Your appointment with Dr. Smith has been confirmed",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      id: 2,
      message: "New internship cycle has started",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 3,
      message: "Your appointment request is pending approval",
      type: "error",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
  ]

  // Use notifications from context if available, otherwise use dummy notifications
  const displayNotifications = notifications && notifications.length > 0 ? notifications : dummyNotifications

  const handleClearAll = () => {
    if (clearNotifications) {
      clearNotifications()
    }
    // Don't close the panel after clearing
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={8} className="notification-icon success" />
      case "warning":
        return <AlertTriangle size={8} className="notification-icon warning" />
      case "error":
        return <X size={8} className="notification-icon error" />
      case "info":
      default:
        return <Info size={8} className="notification-icon info" />
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="close-button" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="notifications-content">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <Bell size={24} />
            <p>You have no new notifications at this time.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.type}`}>
              {getNotificationIcon(notification.type)}
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
              </div>
              <button
                className="notification-dismiss"
                onClick={() => removeNotification(notification.id)}
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="notifications-footer">
          <button className="clear-all-button" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}

function Header({
  onRequestAppointment,
  onShowMyAppointments,
  onInternshipCycleClick,
  onStatisticsClick,
  onNavigateBack,
  onNavigateForward,
  canGoBack,
  canGoForward,
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)

  // Dummy notifications data
  const dummyNotifications = [
    {
      id: 1,
      message: "Your appointment with Dr. Smith has been confirmed",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      id: 2,
      message: "New internship cycle has started",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 3,
      message: "Your appointment request is declined",
      type: "error",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
  ]

  // Initialize with dummy notifications
  useEffect(() => {
    setNotifications(dummyNotifications)
    setNotificationCount(dummyNotifications.length)
  }, [])

  const notificationRef = useRef(null)
  const userDropdownRef = useRef(null)

  // Restore click-outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      // Close notifications panel if clicked outside
      if (showNotifications && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }

      // Close user dropdown if clicked outside
      if (showUserDropdown && userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside)

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications, showUserDropdown])

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  // Notification management functions
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    setNotificationCount((prev) => prev - 1)
  }

  const clearNotifications = () => {
    setNotifications([])
    setNotificationCount(0)
    // Don't close the panel
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="navigation-controls">
          <button
            className={`nav-control-btn ${!canGoBack ? "disabled" : ""}`}
            onClick={canGoBack ? onNavigateBack : undefined}
            aria-disabled={!canGoBack}
            title={canGoBack ? "Go back" : "No previous page"}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className={`nav-control-btn ${!canGoForward ? "disabled" : ""}`}
            onClick={canGoForward ? onNavigateForward : undefined}
            aria-disabled={!canGoForward}
            title={canGoForward ? "Go forward" : "No next page"}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="header-center">
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button onClick={onInternshipCycleClick} className="nav-button">
                Internship Cycle
              </button>
            </li>
            <li className="nav-item">
              <button onClick={onStatisticsClick} className="nav-button">
                Statistics
              </button>
            </li>
            <li className="nav-item">
              <button onClick={onShowMyAppointments} className="nav-button">
                My Appointments
              </button>
            </li>
            <li className="nav-item">
              <button onClick={onRequestAppointment} className="nav-button">
                Request Appointment
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header-right">
        <div className="notification-container" ref={notificationRef}>
          <button className="notification-button" onClick={toggleNotifications}>
            <div className="notification-icon">
              <Bell size={16} />
            </div>
            {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
          </button>

          {showNotifications && (
            <NotificationsPanel
              onClose={() => setShowNotifications(false)}
              notifications={notifications}
              removeNotification={removeNotification}
              clearNotifications={clearNotifications}
            />
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
              <div className="user-info">
                <p className="user-name">SCAD ADMIN</p>
                <p className="user-email">admin@scad.guc.edu.eg</p>
              </div>
              <div className="dropdown-divider"></div>
              <button className="logout-button" onClick={() => console.log("Logging out...")}>
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

export default Header
