import React from "react"
import "./Sidebar.css"
import { Home, Building2, GraduationCap, Briefcase, Calendar, ClipboardCheck, BarChart2, BookOpen, Clock, ListTodo } from 'lucide-react'

function Sidebar({ activePage, onPageChange }) {
  // Menu items with icons
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "companies", label: "Companies", icon: <Building2 size={20} /> },
    { id: "students", label: "Students", icon: <GraduationCap size={20} /> },
    { id: "internships", label: "Internships", icon: <Briefcase size={20} /> },
    { id: "workshops", label: "Workshops", icon: <BookOpen size={20} /> },
    { id: "evaluations", label: "Evaluations", icon: <ClipboardCheck size={20} /> },
    { id: "statistics", label: "Statistics", icon: <BarChart2 size={20} /> },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <GraduationCap size={24} />
          </div>
          <span className="sidebar-logo-text">SCAD</span>
        </div>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="sidebar-section-title">Main</div>
          <nav className="sidebar-menu">
            {menuItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                className={`sidebar-menu-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onPageChange(item.id)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
                {activePage === item.id && <span className="active-indicator"></span>}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="sidebar-section">
          <div className="sidebar-section-title">Analytics</div>
          <nav className="sidebar-menu">
            {menuItems.slice(5).map((item) => (
              <button
                key={item.id}
                className={`sidebar-menu-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => onPageChange(item.id)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
                {activePage === item.id && <span className="active-indicator"></span>}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="sidebar-section-title">Quick Access</div>
        <div className="sidebar-footer-menu">
          <button 
            className={`sidebar-menu-item ${activePage === "appointments" ? 'active' : ''}`}
            onClick={() => onPageChange("appointments")}
          >
            <span className="sidebar-icon"><Clock size={20} /></span>
            <span className="sidebar-label">Request Appointment</span>
            {activePage === "appointments" && <span className="active-indicator"></span>}
          </button>
          <button 
            className={`sidebar-menu-item ${activePage === "my-appointments" ? 'active' : ''}`}
            onClick={() => onPageChange("my-appointments")}
          >
            <span className="sidebar-icon"><ListTodo size={20} /></span>
            <span className="sidebar-label">My Appointments</span>
            {activePage === "my-appointments" && <span className="active-indicator"></span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar