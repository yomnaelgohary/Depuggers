"use client"

import { useState } from "react"
import { Menu } from "antd"
import {
  PieChartOutlined,
  UserOutlined,
  FileSearchOutlined,
  SolutionOutlined,
  FileTextOutlined,
  BellOutlined,
  UserAddOutlined,
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
  EyeOutlined,
  TrophyOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { ListChecks } from "lucide-react"
import Dashboard from "./student/Dashboard"
import Profile from "./student/Profile"
import Internships from "./student/Internships"
import Applications from "./student/Applications"
import Reports from "./student/Reports"
import Appointments from "./pages/Appointments"
import MyAppointments from "./pages/MyAppointments"
import ViewedMyProfile from "./student/ViewedMyProfile"
import Assessments from "./student/Assessments"
import Workshops from "./student/Workshops"
import "./ProStudent.css"
import { NotificationsProvider, useNotifications } from "./components/NotificationsContext"
import NotificationsPanel from "./components/NotificationsPanel"
import ProStudentSidebar from "./student/ProStudentSidebar"
import ProStudentHeader from "./student/ProStudentHeader"

// Header component with notifications
const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const { unreadCount } = useNotifications()

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev)
  }

  return (
    <header className="unique11-content-header">
      <div className="unique11-nav-buttons">
        <button className="unique11-nav-button">
          <LeftOutlined />
        </button>
        <button className="unique11-nav-button">
          <RightOutlined />
        </button>
      </div>
      <div className="unique11-header-actions">
        <div className="unique11-notification-bell-container">
          <button className="unique11-action-button" onClick={toggleNotifications}>
            <BellOutlined />
            {unreadCount > 0 && <span className="unique11-notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        </div>
        <button className="unique11-action-button">
          <UserAddOutlined />
        </button>
      </div>
    </header>
  )
}

// Main Student component
function ProStudentContent() {
  const [activeTab, setActiveTab] = useState("dashboard")
  // Navigation history state
  const [navigationHistory, setNavigationHistory] = useState(["dashboard"])
  const [historyPosition, setHistoryPosition] = useState(0)

  const handlePageChange = (page) => {
    if (historyPosition < navigationHistory.length - 1) {
      const newHistory = navigationHistory.slice(0, historyPosition + 1)
      setNavigationHistory([...newHistory, page])
    } else {
      setNavigationHistory((prevHistory) => [...prevHistory, page])
    }
    setHistoryPosition((prev) => prev + 1)
    setActiveTab(page)
  }

  const canGoBack = historyPosition > 0
  const canGoForward = historyPosition < navigationHistory.length - 1

  const handleNavigateBack = () => {
    if (canGoBack) {
      setHistoryPosition((prev) => prev - 1)
      setActiveTab(navigationHistory[historyPosition - 1])
    }
  }

  const handleNavigateForward = () => {
    if (canGoForward) {
      setHistoryPosition((prev) => prev + 1)
      setActiveTab(navigationHistory[historyPosition + 1])
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "profile":
        return <Profile />
      case "internships":
        return <Internships />
      case "applications":
        return <Applications />
      case "reports":
        return <Reports />
      case "appointments":
        return <Appointments onNavigateBack={() => setActiveTab("dashboard")} />
      case "myappointments":
        return <MyAppointments onClose={() => setActiveTab("dashboard")} />
      case "viewedprofile":
        return <ViewedMyProfile />
      case "assessments":
        return <Assessments />
      case "workshops":
        return <Workshops />
      default:
        return <Dashboard />
    }
  }

  const menuItems = [
    { key: "dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
    { key: "internships", icon: <FileSearchOutlined />, label: "Internships" },
    { key: "applications", icon: <SolutionOutlined />, label: "Applications" },
    { key: "reports", icon: <FileTextOutlined />, label: "My Internships" },
    { key: "viewedprofile", icon: <EyeOutlined />, label: "Viewed My Profile" },
    { key: "assessments", icon: <TrophyOutlined />, label: "Assessments" },
    { key: "workshops", icon: <VideoCameraOutlined />, label: "Workshops" },
    { key: "appointments", icon: <CalendarOutlined />, label: "Appointments" },
    { key: "myappointments", icon: <ListChecks size={16} />, label: "My Appointments" },
  ]

  return (
    <div className="unique11-student-container">
      <ProStudentSidebar activePage={activeTab} onPageChange={handlePageChange} />
      <div className="unique11-student-content">
        <ProStudentHeader
          onNavigateBack={handleNavigateBack}
          onNavigateForward={handleNavigateForward}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
        />
        <div className="unique11-content-body">{renderTabContent()}</div>
      </div>
    </div>
  )
}

// Wrap the component with NotificationsProvider
export default function ProStudent() {
  return (
    <NotificationsProvider>
      <ProStudentContent />
    </NotificationsProvider>
  )
}