"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, User, LogOut, X, Info, AlertTriangle, CheckCircle, ArrowLeft, ArrowRight, Phone } from "lucide-react"
import { useNotifications } from "./NotificationsContext"
import "./Header.css"

// ... (NotificationsPanel component - assuming it's correct from previous versions) ...
function NotificationsPanel({ onClose, isOpen }) {
  const { notifications, clearNotifications, removeNotification } = useNotifications()
  const displayNotifications = notifications.length > 0 ? notifications : []

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} className="notification-icon-type success" />
      case "warning":
        return <AlertTriangle size={16} className="notification-icon-type warning" />
      case "error":
        return <X size={16} className="notification-icon-type error" />
      case "call":
        return <Phone size={16} className="notification-icon-type call" />
      case "info":
      default:
        return <Info size={16} className="notification-icon-type info" />
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }

  return (
    <div className={`notifications-panel ${isOpen ? 'open' : ''}`}>
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="panel-close-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className="notifications-list-content">
        {displayNotifications.length === 0 ? (
          <div className="no-notifications">
            <Bell size={32} />
            <p>You're all caught up!</p>
          </div>
        ) : (
          displayNotifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.type}`}>
              <div className="notification-item-icon-wrapper">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-item-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{formatTimestamp(notification.timestamp)}</span>
              </div>
              <button
                className="notification-dismiss"
                onClick={() => removeNotification(notification.id)}
                aria-label="Dismiss notification"
              >
                <X size={16} />
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
  const notificationCount = notifications.length

  const notificationsPanelRef = useRef(null);
  const userDropdownRef = useRef(null)
  const notificationButtonRef = useRef(null);
  const avatarButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showNotifications &&
        notificationsPanelRef.current && !notificationsPanelRef.current.contains(event.target) &&
        notificationButtonRef.current && !notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotifications(false)
      }
      if (
        showUserDropdown &&
        userDropdownRef.current && !userDropdownRef.current.contains(event.target) &&
        avatarButtonRef.current && !avatarButtonRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications, showUserDropdown])

  const toggleNotifications = () => {
    if (showUserDropdown) setShowUserDropdown(false);
    setShowNotifications(!showNotifications)
  }

  const toggleUserDropdown = () => {
    if (showNotifications) setShowNotifications(false);
    setShowUserDropdown(!showUserDropdown)
  }

  const handleLogout = () => {
    console.log("Logging out...");
    setShowUserDropdown(false);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="navigation-controls">
          {/* REVERTED TO YOUR ORIGINAL STRUCTURE FOR ARROW BUTTONS if it was working */}
          <button
            className={`nav-control-btn ${!canGoBack ? "disabled" : ""}`}
            onClick={onNavigateBack}
            disabled={!canGoBack}
            title={canGoBack ? "Go back" : "No previous page"}
          >
            <span className="nav-arrow-icon"> {/* Keep span if you style icon via this class */}
              <ArrowLeft size={14} /> {/* Set size directly on Lucide icon */}
            </span>
          </button>

          <button
            className={`nav-control-btn ${!canGoForward ? "disabled" : ""}`}
            onClick={onNavigateForward}
            disabled={!canGoForward}
            title={canGoForward ? "Go forward" : "No next page"}
          >
            <span className="nav-arrow-icon"> {/* Keep span if you style icon via this class */}
              <ArrowRight size={14} /> {/* Set size directly on Lucide icon */}
            </span>
          </button>
        </div>
      </div>

      <div className="header-right">
        <div className="notification-container">
          <button
            className="header-icon-button"
            onClick={toggleNotifications}
            ref={notificationButtonRef}
            aria-label="Toggle notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="notification-count">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div ref={notificationsPanelRef}>
              <NotificationsPanel
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>
          )}
        </div>

        <div className="avatar-container">
          <button
            className="header-icon-button avatar-button-override"
            onClick={toggleUserDropdown}
            ref={avatarButtonRef}
            aria-label="Toggle user menu"
            aria-expanded={showUserDropdown}
          >
            <User size={20} />
          </button>
          {showUserDropdown && (
            <div
              className={`user-dropdown ${showUserDropdown ? 'open' : ''}`}
              ref={userDropdownRef}
            >
              <div className="user-dropdown-info">
                <div className="dropdown-avatar-placeholder">
                    <User size={22} />
                </div>
                <div className="user-details">
                    <p className="user-name">SCAD ADMIN</p>
                    <p className="user-email">admin@scad.guc.edu.eg</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-button-item" onClick={handleLogout}>
                <LogOut size={18} />
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