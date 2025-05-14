"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, User, LogOut, X, Info, AlertTriangle, CheckCircle, ArrowLeft, ArrowRight, Phone } from "lucide-react"
import { useNotifications } from "./NotificationsContext"
import "./Header.css"

// Inline NotificationsPanel component
function NotificationsPanel({ onClose }) {
  const { notifications, clearNotifications, removeNotification } = useNotifications()

  // Dummy notifications data - empty array since we're using real notifications
  const dummyNotifications = []

  // Use notifications from context if available, otherwise use dummy notifications
  const displayNotifications = notifications.length > 0 ? notifications : dummyNotifications

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={14} className="notification-icon success" />
      case "warning":
        return <AlertTriangle size={14} className="notification-icon warning" />
      case "error":
        return <X size={14} className="notification-icon error" />
      case "call":
        return <Phone size={14} className="notification-icon call" />
      case "info":
      default:
        return <Info size={14} className="notification-icon info" />
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
        {displayNotifications.length === 0 ? (
          <div className="no-notifications">
            <Bell size={24} />
            <p>You have no new notifications at this time.</p>
          </div>
        ) : (
          displayNotifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.type}`}>
              {getNotificationIcon(notification.type)}
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
              </div>
              <button
                className="notification-dismiss"
                onClick={() =>
                  notification.id.toString().startsWith("dummy") ? null : removeNotification(notification.id)
                }
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {displayNotifications.length > 0 && (
        <div className="notifications-footer">
          <button className="clear-all-button" onClick={clearNotifications}>
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}

function Header({ onNavigateBack, onNavigateForward, canGoBack, canGoForward }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const { notifications } = useNotifications()

  // Dummy notifications data - empty array since we're using real notifications
  const dummyNotifications = []

  // Calculate notification count - use real notifications if available, otherwise use dummy count
  const notificationCount = notifications.length > 0 ? notifications.length : dummyNotifications.length

  const notificationRef = useRef(null)
  const userDropdownRef = useRef(null)

  // Handle click outside to close dropdowns
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

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="navigation-controls">
          {/* Simplified approach with explicit HTML for the arrows */}
          <button
            className={`nav-control-btn ${!canGoBack ? "disabled" : ""}`}
            onClick={canGoBack ? onNavigateBack : undefined}
            aria-disabled={!canGoBack}
            title={canGoBack ? "Go back" : "No previous page"}
          >
            {/* Use a span with a class for better styling control */}
            <span className="nav-arrow-icon">
              {/* Fallback to HTML entity if SVG doesn't work */}
              {/* Use both SVG and HTML entity for redundancy */}
              <ArrowLeft size={18} />
              <span style={{ display: "none" }}>&larr;</span>
            </span>
          </button>

          <button
            className={`nav-control-btn ${!canGoForward ? "disabled" : ""}`}
            onClick={canGoForward ? onNavigateForward : undefined}
            aria-disabled={!canGoForward}
            title={canGoForward ? "Go forward" : "No next page"}
          >
            <span className="nav-arrow-icon">
              <ArrowRight size={18} />
              <span style={{ display: "none" }}>&rarr;</span>
            </span>
          </button>
        </div>
      </div>

      <div className="header-right">
        <div className="notification-container" ref={notificationRef}>
          <button className="notification-button" onClick={toggleNotifications}>
            <div className="notification-icon">
              <Bell size={16} />
            </div>
            {notificationCount > 0 && <span className="notification-count">{notificationCount}</span>}
          </button>

          {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
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
