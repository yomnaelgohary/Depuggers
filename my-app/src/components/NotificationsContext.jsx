"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the context
const NotificationsContext = createContext()

// Create a provider component
export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [notificationCount, setNotificationCount] = useState(0)

  // Update notification count whenever notifications change
  useEffect(() => {
    setNotificationCount(notifications.length)
  }, [notifications])

  // Add a new notification
  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  // Remove a notification by id
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        notificationCount,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

// Custom hook to use the notifications context
export function useNotifications() {
  return useContext(NotificationsContext)
}
