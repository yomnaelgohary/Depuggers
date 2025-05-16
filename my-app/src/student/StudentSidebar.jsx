import React from "react";
import "./StudentSidebar.css";
import {
  PieChart,
  User,
  FileSearch,
  FileText,
  GraduationCap
} from "lucide-react";

export default function StudentSidebar({ activePage, onPageChange }) {
  const menuItems = [
    {
      section: "MAIN",
      items: [
        { id: "dashboard", label: "Dashboard", icon: <PieChart size={20} /> },
        { id: "profile", label: "Profile", icon: <User size={20} /> },
        { id: "internships", label: "Internships", icon: <FileSearch size={20} /> },
        { id: "applications", label: "Applications", icon: <FileText size={20} /> },
        { id: "reports", label: "My Internships", icon: <GraduationCap size={20} /> }
      ]
    }
  ];

  return (
    <aside className="ssb-student-sidebar">
      <div className="ssb-sidebar-header">
        <div className="ssb-student-logo">
          <GraduationCap size={24} color="white" />
        </div>
        <h1 className="ssb-student-title">Student</h1>
      </div>
      <div className="ssb-sidebar-content">
        {menuItems.map((section) => (
          <div key={section.section} className="ssb-sidebar-section">
            <div className="ssb-sidebar-section-title">{section.section}</div>
            <nav className="ssb-sidebar-menu">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={`ssb-sidebar-menu-item ${activePage === item.id ? "ssb-active" : ""}`}
                  onClick={() => onPageChange(item.id)}
                  aria-current={activePage === item.id ? "page" : undefined}
                  title={item.label}
                >
                  <span className="ssb-sidebar-icon">{item.icon}</span>
                  <span className="ssb-sidebar-label">{item.label}</span>
                  {activePage === item.id && <span className="ssb-active-indicator"></span>}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
} 