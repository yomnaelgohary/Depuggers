"use client"

import { useState } from "react"
import { Building, Briefcase, Users, FileText, PenToolIcon as Tool } from 'lucide-react'
import { useNotifications } from "../components/NotificationsContext"
import "./Dashboard.css"

// Replace the PerformanceChart component with this constant data version
function PerformanceChart() {
  // Constant data that won't change on re-renders
  const chartData = [
    { month: "Jan", students: 65, companies: 45 },
    { month: "Feb", students: 80, companies: 55 },
    { month: "Mar", students: 55, companies: 40 },
    { month: "Apr", students: 70, companies: 60 },
    { month: "May", students: 85, companies: 50 },
    { month: "Jun", students: 75, companies: 65 },
  ]

  return (
    <div className="chart-container">
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "#5f2878" }}></div>
          <span>Students</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: "#9d4edd" }}></div>
          <span>Companies</span>
        </div>
      </div>
      <div className="chart-bars">
        {chartData.map((data) => (
          <div className="chart-bar-group" key={data.month}>
            <div className="chart-bar-wrapper">
              <div className="chart-bar-with-value">
                <div className="chart-value">{data.students}</div>
                <div className="chart-bar primary" style={{ height: `${data.students}%` }}></div>
              </div>
              <div className="chart-bar-with-value">
                <div className="chart-value">{data.companies}</div>
                <div className="chart-bar secondary" style={{ height: `${data.companies}%` }}></div>
              </div>
            </div>
            <div className="chart-label">{data.month}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard({ activePage, onPageChange }) {
  const { addNotification } = useNotifications()
  const [showAllActivities, setShowAllActivities] = useState(false)

  // Static stats without animation
  const stats = {
    totalStudents: 10,
    totalProStudents: 13,
    totalCompanies: 10,
    activeInternships: 2,
  }

  // Quick action items with IDs matching sidebar navigation
  const quickActions = [
    { id: "companies", label: "Companies", description: "View all companies", icon: <Building size={20} /> },
    { id: "internships", label: "Internships", description: "View all internships", icon: <Briefcase size={20} /> },
    { id: "students", label: "Students", description: "View all students", icon: <Users size={20} /> },
    { id: "evaluations", label: "Evaluation", description: "View all evaluations", icon: <FileText size={20} /> },
    { id: "workshops", label: "Workshop", description: "View all workshops", icon: <Tool size={20} /> },
  ]

  const recentActivities = [
    { id: 1, type: "New student application", time: "1 minute ago", person: "John Doe", initials: "JD" },
    { id: 2, type: "Company partnership", time: "2 minutes ago", person: "Sarah Smith", initials: "SS" },
    { id: 3, type: "Internship posted", time: "3 minutes ago", person: "Michael Brown", initials: "MB" },
    { id: 4, type: "Workshop scheduled", time: "5 minutes ago", person: "Emily Johnson", initials: "EJ" },
    { id: 5, type: "Student evaluation", time: "10 minutes ago", person: "Robert Williams", initials: "RW" },
    { id: 6, type: "New course added", time: "15 minutes ago", person: "Linda Garcia", initials: "LG" },
    { id: 7, type: "Student profile updated", time: "20 minutes ago", person: "James Martinez", initials: "JM" },
    { id: 8, type: "Scholarship awarded", time: "25 minutes ago", person: "Patricia Taylor", initials: "PT" },
    { id: 9, type: "Event registration", time: "30 minutes ago", person: "Christopher Anderson", initials: "CA" },
    { id: 10, type: "Job fair announced", time: "35 minutes ago", person: "Barbara Lee", initials: "BL" },
  ]

  const displayedActivities = showAllActivities ? recentActivities : recentActivities.slice(0, 3)

  const handleViewAll = () => {
    setShowAllActivities(!showAllActivities)
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Welcome back, Admin</h1>
          <p className="dashboard-subtitle">Here's what's happening with your platform today.</p>
        </div>
        <div className="date-display">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Quick Actions - Using navigation pattern from Sidebar */}
      <div className="dashboard-card actions-card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="actions-container">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className={`action-card ${activePage === action.id ? "active" : ""}`}
              onClick={() => onPageChange(action.id)}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h3 className="action-title">{action.label}</h3>
                <p className="action-description">{action.description}</p>
              </div>
              {activePage === action.id && <span className="action-indicator"></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Total Students</span>
            <span className="stat-value">{stats.totalStudents}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Pro Students</span>
            <span className="stat-value">{stats.totalProStudents}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Building size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Companies</span>
            <span className="stat-value">{stats.totalCompanies}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Briefcase size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-title">Active Internships</span>
            <span className="stat-value">{stats.activeInternships}</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <div className="dashboard-card activity-card">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
            <button className="card-action" onClick={handleViewAll}>
              {showAllActivities ? "View Less" : "View All"}
            </button>
          </div>
          <div className="activity-list">
            {displayedActivities.map((activity, index) => (
              <div 
                className="activity-item" 
                key={activity.id}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationName: showAllActivities && index >= 3 ? 'fadeIn' : 'none'
                }}
              >
                <div className="activity-avatar">
                  <div className="avatar-initials-square">{activity.initials}</div>
                </div>
                <div className="activity-content">
                  <p className="activity-person">{activity.person}</p>
                  <p className="activity-type">{activity.type}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Overview - With Chart */}
        <div className="dashboard-card stats-card">
          <div className="card-header">
            <h2 className="card-title">Platform Overview</h2>
          </div>
          <div className="stats-chart">
            <PerformanceChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
