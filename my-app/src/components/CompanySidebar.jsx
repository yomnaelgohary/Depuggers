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
    { id: "posts", label: "Posts", icon: <FileText size={20} /> },
    { id: "create", label: "Create Post", icon: <FilePlus size={20} /> },
    { id: "applicants", label: "Applicants", icon: <Users size={20} /> },
    { id: "interns", label: "Interns", icon: <GraduationCap size={20} /> }
  ];

  return (
    <aside className="company-sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => onPageChange(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
} 