import React from "react";
import "./CompanySidebar.css";
import {
  FileText,
  FilePlus,
  Users,
  GraduationCap
} from "lucide-react";

export default function CompanySidebar({ activePage, onPageChange }) {
  const menuItems = [
    { section: "MAIN", items: [
      { id: "posts", label: "Posts", icon: <FileText size={20} /> },
      { id: "create", label: "Create Post", icon: <FilePlus size={20} /> },
      { id: "applicants", label: "Applicants", icon: <Users size={20} /> },
      { id: "interns", label: "Interns", icon: <GraduationCap size={20} /> }
    ]}
  ];

  return (
    <aside className="company-sidebar">
      <div className="sidebar-header">
        <h1 className="company-title">Dell Technologies</h1>
      </div>

      <div className="sidebar-content">
        {menuItems.map((section) => (
          <div key={section.section} className="sidebar-section">
            <div className="sidebar-section-title">{section.section}</div>
            <nav className="sidebar-menu">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={`sidebar-menu-item ${activePage === item.id ? "active" : ""}`}
                  onClick={() => onPageChange(item.id)}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                  {activePage === item.id && <span className="active-indicator"></span>}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
} 