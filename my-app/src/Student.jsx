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

import Dashboard from "./student/Dashboard"
import Profile from "./student/Profile"
import Internships from "./student/Internships"
import Applications from "./student/Applications"
import Reports from "./student/Reports"
import { NotificationsProvider, useNotifications } from "./student/NotificationsContext"
import NotificationsPanel from "./student/NotificationsPanel"

import "./Student.css"

// Header component with notifications
const Header = () => {
  const { toggleNotifications, unreadCount } = useNotifications()

  return (
    <header className="content-header-unique10">
      <div className="nav-buttons-unique10">
        <button className="nav-button-unique10">
          <LeftOutlined />
        </button>
        <button className="nav-button-unique10">
          <RightOutlined />
        </button>
      </div>
      <div className="header-actions-unique10">
        <div className="notification-bell-container-unique10">
          <button className="action-button-unique10" onClick={toggleNotifications}>
            <BellOutlined />
            {unreadCount > 0 && <span className="notification-badge-unique10">{unreadCount}</span>}
          </button>
          <NotificationsPanel />
        </div>
        <button className="action-button-unique10">
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
    <div className="student-container-unique10">
      <div className="student-sidebar-unique10">
        <div className="sidebar-header-unique10">
          <div className="logo-container-unique10">
            <div className="logo-unique10">S</div>
            <h2>Student</h2>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={(e) => setActiveTab(e.key)}
          items={menuItems}
          className="ant-menu-unique10"
        />
      </div>
      <div className="student-content-unique10">
        <Header />
        <div className="content-body-unique10">{renderTabContent()}</div>
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