import React from "react";
import "./CompanySidebar.css"; // This import remains the same
import {
  FileText,
  FilePlus,
  Users,
  GraduationCap
} from "lucide-react";

export default function CompanySidebar({ activePage, onPageChange }) {
  const menuItems = [
    {
      section: "MAIN", // Section title can remain as is for logic
      items: [
        { id: "posts", label: "Posts", icon: <FileText size={20} /> },
        { id: "myposts", label: "My Posts", icon: <FileText size={20} /> },
        { id: "create", label: "Create Post", icon: <FilePlus size={20} /> },
        { id: "applicants", label: "Applicants", icon: <Users size={20} /> },
        { id: "interns", label: "Interns", icon: <GraduationCap size={20} /> }
      ]
    }
    // You can add more sections here if needed
    // { section: "SETTINGS", items: [...] }
  ];

  return (
    <aside className="csb-company-sidebar">
      <div className="csb-sidebar-header">
        <h1 className="csb-company-title">Dell Technologies</h1>
      </div>

      <div className="csb-sidebar-content">
        {menuItems.map((section) => (
          <div key={section.section} className="csb-sidebar-section">
            <div className="csb-sidebar-section-title">{section.section}</div>
            <nav className="csb-sidebar-menu">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={`csb-sidebar-menu-item ${activePage === item.id ? "csb-active" : ""}`}
                  onClick={() => onPageChange(item.id)}
                  aria-current={activePage === item.id ? "page" : undefined} // For accessibility
                  title={item.label} // Tooltip for collapsed sidebar
                >
                  <span className="csb-sidebar-icon">{item.icon}</span>
                  <span className="csb-sidebar-label">{item.label}</span>
                  {activePage === item.id && <span className="csb-active-indicator"></span>}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}