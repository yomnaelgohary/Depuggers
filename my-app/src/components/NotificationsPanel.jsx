import React from "react"
import { CheckCircle, XCircle, Info, Phone } from 'lucide-react'
import { useNotifications } from "../components/NotificationsContext"

function NotificationsPanel({ onClose }) {
  const { notifications, clearAllNotifications, markNotificationAsRead } = useNotifications()

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="clear-notifications" onClick={clearAllNotifications}>
          Clear All
        </button>
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? "read" : "unread"} ${notification.type}`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="notification-icon">
                {notification.type === "success" && <CheckCircle size={8} />}
                {notification.type === "error" && <XCircle size={8} />}
                {notification.type === "info" && <Info size={8} />}
                {notification.type === "call" && <Phone size={8} />}
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time">{notification.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationsPanel
