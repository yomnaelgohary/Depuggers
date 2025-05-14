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
} from "@ant-design/icons"

import Dashboard from "./Dashboard"
import Profile from "./Profile"
import Internships from "./Internships"
import Applications from "./Applications"
import Reports from "./Reports"
import { NotificationsProvider, useNotifications } from "./NotificationsContext"
import NotificationsPanel from "./NotificationsPanel"

import "./Student.css"

// Header component with notifications
const Header = () => {
  const { toggleNotifications, unreadCount } = useNotifications()

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
          <NotificationsPanel />
        </div>
        <button className="action-button">
          <UserAddOutlined />
        </button>
      </div>
    </header>
  )
}

// Main Student component
function StudentContent() {
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
      default:
        return <Dashboard />
    }
  }

  const menuItems = [
    {
      key: "dashboard",
      icon: <PieChartOutlined />,
      label: "Dashboard",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "internships",
      icon: <FileSearchOutlined />,
      label: "Internships",
    },
    {
      key: "applications",
      icon: <SolutionOutlined />,
      label: "Applications",
    },
    {
      key: "reports",
      icon: <FileTextOutlined />,
      label: "My Internships",
    },
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
export default function Student() {
  return (
    <NotificationsProvider>
      <StudentContent />
    </NotificationsProvider>
  )
}
