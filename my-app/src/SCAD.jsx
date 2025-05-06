"use client"

import { useState } from "react"
import "./SCAD.css"
import { Building, Briefcase, Users, FileText, PenToolIcon as Tool, Bell, Phone, MessageCircle } from "lucide-react"

function SCAD() {
  // Sample data for the dashboard
  const stats = {
    totalStudents: "8,432",
    totalProStudents: "2,345",
    totalCompanies: "1,234",
  }

  const recentActivities = [
    { id: 1, type: "New student application", time: "1 minute ago" },
    { id: 2, type: "New student application", time: "2 minutes ago" },
    { id: 3, type: "New student application", time: "3 minutes ago" },
    { id: 4, type: "New student application", time: "4 minutes ago" },
    { id: 5, type: "New student application", time: "5 minutes ago" },
  ]

  // State to track which action card is active
  const [activeAction, setActiveAction] = useState(null)

  // Function to handle action card clicks
  const handleActionClick = (actionName) => {
    setActiveAction(actionName)
    // You can add additional functionality here like navigation or showing modals
    console.log(`${actionName} action clicked`)

    // Reset the active state after a short delay to create a "pressed" effect
    setTimeout(() => {
      setActiveAction(null)
    }, 300)
  }

  // Function to determine if an action card is active
  const isActionActive = (actionName) => {
    return activeAction === actionName ? "action-card active" : "action-card"
  }

  return (
    <div className="scad-container">
      {/* Header */}
      <header className="scad-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"></span>
            <h1>SCAD Office</h1>
          </div>
        </div>
        <div className="header-center">
          <nav className="main-nav">
            <ul>
              <li>
                <a href="#internship-cycle" className="nav-link">
                  Internship Cycle
                </a>
              </li>
              <li>
                <a href="#statistics" className="nav-link">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#request-appointment" className="nav-link">
                  Request Appointment
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <button className="icon-button" onClick={() => alert("Notifications")}>
              <Bell size={20} />
            </button>
            <button className="icon-button" onClick={() => alert("Phone")}>
              <Phone size={20} />
            </button>
            <button className="icon-button" onClick={() => alert("Messages")}>
              <MessageCircle size={20} />
            </button>
          </div>
          <div className="profile-avatar">
            <img src="/placeholder.svg?height=40&width=40" alt="Profile" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="scad-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1>Welcome back</h1>
          <p>Here's a quick overview of your day</p>
        </section>

        {/* Stats Cards */}
        <section className="stats-section">
          <div className="stat-card" onClick={() => alert("Total Students Details")}>
            <h3>Total students</h3>
            <p className="stat-number">{stats.totalStudents}</p>
          </div>
          <div className="stat-card" onClick={() => alert("Pro Students Details")}>
            <h3>Total Pro Students</h3>
            <p className="stat-number">{stats.totalProStudents}</p>
          </div>
          <div className="stat-card" onClick={() => alert("Companies Details")}>
            <h3>Total Companies</h3>
            <p className="stat-number">{stats.totalCompanies}</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <div className={isActionActive("Companies")} onClick={() => handleActionClick("Companies")}>
              <Building size={24} />
              <h3>Companies</h3>
              <p>View all companies</p>
            </div>
            <div className={isActionActive("Internships")} onClick={() => handleActionClick("Internships")}>
              <Briefcase size={24} />
              <h3>Internships</h3>
              <p>View all internships</p>
            </div>
            <div className={isActionActive("Students")} onClick={() => handleActionClick("Students")}>
              <Users size={24} />
              <h3>Students</h3>
              <p>View all students</p>
            </div>
            <div className={isActionActive("Evaluation")} onClick={() => handleActionClick("Evaluation")}>
              <FileText size={24} />
              <h3>Evaluation & Reports</h3>
              <p>View all evaluations and reports</p>
            </div>
            <div className={isActionActive("Workshop")} onClick={() => handleActionClick("Workshop")}>
              <Tool size={24} />
              <h3>Workshop</h3>
              <p>View all workshops</p>
            </div>
          </div>
        </section>

        {/* Recent Activity - No longer clickable */}
        <section className="recent-activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-timeline">
            {recentActivities.map((activity) => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-avatar">
                  <img src="/placeholder.svg?height=32&width=32" alt="User" />
                </div>
                <div className="activity-content">
                  <p className="activity-type">{activity.type}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default SCAD
