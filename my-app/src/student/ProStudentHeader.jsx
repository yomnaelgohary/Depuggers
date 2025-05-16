import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Bell, User, LogOut } from 'lucide-react';
import "./ProStudentHeader.css";

export default function ProStudentHeader({
  onNavigateBack,
  onNavigateForward,
  canGoBack,
  canGoForward
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, content: "New assessment available!", time: "2m ago" },
    { id: 2, content: "Your profile was viewed.", time: "1h ago" },
    { id: 3, content: "New internship cycle begins on June 15th. Get ready!", time: "3h ago" },
    { id: 4, content: "Reminder: Summer internship cycle is about to begin in 3 days.", time: "5h ago" },
    { id: 5, content: "Your internship report status has been set to 'Approved'.", time: "Yesterday" },
    { id: 6, content: "SCAD Officer Ahmed has accepted your appointment for tomorrow at 2:00 PM.", time: "Yesterday" },
    { id: 7, content: "Incoming call from Dr. Sarah Mohamed.", time: "2 days ago" },
    { id: 8, content: "Upcoming Workshop: 'Resume Building' starts in 1 hour. Room 302.", time: "2 days ago" },
    { id: 9, content: "Mohamed from your project group sent you a message: 'Can we meet today?'", time: "3 days ago" },
    { id: 10, content: "Your internship report status has been set to 'Needs Revision'.", time: "4 days ago" },
  ]);
  const notificationRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowNotifications(false);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("proStudentToken");
    sessionStorage.removeItem("proStudentToken");
    window.location.href = "/login";
  };

  const userData = {
    name: "Pro Student"
  };

  return (
    <header className="psh-student-header">
      <div className="psh-header-left">
        <div className="psh-navigation-buttons">
          <button
            className={`psh-nav-button ${!canGoBack ? "psh-disabled" : ""}`}
            onClick={onNavigateBack}
            disabled={!canGoBack}
            aria-label="Go back"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            className={`psh-nav-button ${!canGoForward ? "psh-disabled" : ""}`}
            onClick={onNavigateForward}
            disabled={!canGoForward}
            aria-label="Go forward"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div className="psh-header-right">
        <div className="psh-notification-bell-container" ref={notificationRef}>
          <button className="psh-icon-button" onClick={toggleNotifications} aria-label="Toggle notifications">
            <Bell size={24} />
            {notifications.length > 0 && (
              <span className="psh-notification-badge">{notifications.length}</span>
            )}
          </button>
          {showNotifications && (
            <div className="psh-notifications-panel">
              <div className="psh-notifications-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button className="psh-clear-notifications" onClick={clearNotifications}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="psh-notifications-list">
                {notifications.length === 0 ? (
                  <div className="psh-no-notifications">
                    <p>No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="psh-notification-item">
                      <p className="psh-notification-content">{notification.content}</p>
                      <span className="psh-notification-time">{notification.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="psh-avatar-container" ref={userDropdownRef}>
          <button className="psh-avatar-button" onClick={toggleUserDropdown} aria-label="Toggle user menu">
            <div className="psh-avatar">
              <User size={20} />
            </div>
          </button>
          {showUserDropdown && (
            <div className="psh-user-dropdown">
              <div className="psh-user-info">
                <p className="psh-user-name">{userData.name}</p>
              </div>
              <button className="psh-logout-button" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}