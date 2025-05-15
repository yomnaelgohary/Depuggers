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

// Header component with notifications
const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const { unreadCount } = useNotifications()

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev)
  }

  return (
    <header className="content-header">
      <div className="nav-buttons">
        <button className="nav-button">
          <LeftOutlined />
        </button>
        <button className="nav-button">
          <RightOutlined />
        </button>
      </div>
      <div className="header-actions">
        <div className="notification-bell-container">
          <button className="action-button" onClick={toggleNotifications}>
            <BellOutlined />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        </div>
        <button className="action-button">
          <UserAddOutlined />
        </button>
      </div>
    </header>
  )
}

// Main Student component
function ProStudentContent() {
  const [activeTab, setActiveTab] = useState("dashboard")

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
    <div className="student-container">
      <div className="student-sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">S</div>
            <h2>Student</h2>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={(e) => setActiveTab(e.key)}
          items={menuItems}
        />
      </div>
      <div className="student-content">
        <Header />
        <div className="content-body">{renderTabContent()}</div>
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
