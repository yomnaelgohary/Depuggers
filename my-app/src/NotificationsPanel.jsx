"use client"

import { useNotifications } from "./NotificationsContext"
//import { formatDistanceToNow } from "date-fns"

const NotificationsPanel = () => {
  const { notifications, isOpen, markAsRead, clearNotifications, getNotificationIcon } = useNotifications()

  if (!isOpen) return null

  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  return (
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
          <div className="no-notifications">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.type} ${!notification.read ? "unread" : ""}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-icon">{getNotificationIcon(notification.type)}</div>
              <div className="notification-content">
                <p>
                  <strong>{notification.title}</strong>
                </p>
                <p>{notification.message}</p>
                <span className="notification-time">{formatTime(notification.timestamp)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationsPanel
