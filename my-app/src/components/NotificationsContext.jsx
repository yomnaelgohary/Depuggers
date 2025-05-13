"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the context
const NotificationsContext = createContext()

// Custom hook to use the notifications context
export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

// Provider component
export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  // Add a new notification
  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(), // Use timestamp as unique ID
      message,
      type, // success, info, warning, error, call
      timestamp: new Date().toISOString(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Log for debugging
    console.log("Added notification:", newNotification)

    return newNotification.id // Return the ID so it can be referenced later
  }

  // Remove a notification by ID
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  // Auto-remove notifications after a delay (optional)
  useEffect(() => {
    const autoRemoveTimer = setTimeout(
      () => {
        // Remove notifications older than 1 hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
        setNotifications((prev) => prev.filter((notification) => notification.timestamp > oneHourAgo))
      },
      60 * 60 * 1000,
    ) // Check every hour

    return () => clearTimeout(autoRemoveTimer)
  }, [notifications])

  // The value that will be provided to consumers of this context
  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}
