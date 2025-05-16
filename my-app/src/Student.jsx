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
import StudentHeader from "./student/StudentHeader"
import StudentSidebar from "./student/StudentSidebar"

import "./Student.css"

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
    <div className="cs-company-container">
      <StudentSidebar activePage={activeTab} onPageChange={setActiveTab} />
      <div className="cs-company-content">
        <StudentHeader />
        <main className="cs-company-main">
          {renderTabContent()}
        </main>
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