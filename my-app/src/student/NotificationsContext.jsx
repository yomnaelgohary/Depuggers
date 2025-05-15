"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { Check, Info, Phone, X } from "lucide-react"

// Create the context
const NotificationsContext = createContext()

// Custom hook to use the notifications context
export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Remove a notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([])
  }

  // Toggle the notifications panel
  const toggleNotifications = () => {
    setIsOpen((prev) => !prev)
  }

  // Get the icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5" />
      case "error":
        return <X className="h-5 w-5" />
      case "call":
        return <Phone className="h-5 w-5" />
      case "info":
      default:
        return <Info className="h-5 w-5" />
    }
  }

  // Get unread count
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Sample notifications for demonstration
  useEffect(() => {
    // Add some sample notifications
    const sampleNotifications = [
      {
        id: 1,
        type: "info",
        title: "New internship opportunity",
        message: "A new internship at Google has been posted.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
      },
      {
        id: 2,
        type: "success",
        title: "Application submitted",
        message: "Your application to Microsoft has been submitted successfully.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
      },
      {
        id: 3,
        type: "info",
        title: "Profile update reminder",
        message: "Please update your profile with your latest skills.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: false,
      },
    ]
    setNotifications(sampleNotifications)
  }, [])

  const value = {
    notifications,
    isOpen,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    toggleNotifications,
    getNotificationIcon,
  }

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

export default NotificationsContext
