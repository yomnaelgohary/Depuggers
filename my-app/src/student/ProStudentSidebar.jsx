import React from "react";
import "../ProStudent.css";
import {
  PieChartOutlined,
  UserOutlined,
  FileSearchOutlined,
  SolutionOutlined,
  FileTextOutlined,
  EyeOutlined,
  TrophyOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { ListChecks, GraduationCap } from "lucide-react";

export default function ProStudentSidebar({ activePage, onPageChange }) {
  const menuItems = [
    {
      section: "MAIN",
      items: [
        { id: "dashboard", label: "Dashboard", icon: <PieChartOutlined /> },
        { id: "profile", label: "Profile", icon: <UserOutlined /> },
        { id: "internships", label: "Internships", icon: <FileSearchOutlined /> },
        { id: "applications", label: "Applications", icon: <SolutionOutlined /> },
        { id: "reports", label: "My Internships", icon: <FileTextOutlined /> },
        { id: "viewedprofile", label: "Viewed My Profile", icon: <EyeOutlined /> },
        { id: "assessments", label: "Assessments", icon: <TrophyOutlined /> },
        { id: "workshops", label: "Workshops", icon: <VideoCameraOutlined /> },
        { id: "appointments", label: "Appointments", icon: <CalendarOutlined /> },
        { id: "myappointments", label: "My Appointments", icon: <ListChecks size={16} /> },
      ],
    },
  ];

  return (
    <aside className="unique11-student-sidebar">
      <div className="unique11-sidebar-header">
        <div className="unique11-logo-container">
          <div className="unique11-logo">
            <GraduationCap size={24} color="white" />
          </div>
          <h2>Pro Student</h2>
        </div>
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