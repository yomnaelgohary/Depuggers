"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, LogOut, Bell, ChevronLeft, ChevronRight, Users, BarChart2, AlignLeft } from 'lucide-react'
import "./Faculty.css"

function Faculty() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("students") // 'students' or 'statistics'
  const [showReportPreview, setShowReportPreview] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Mock student data with updated majors
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Omar Ahmed",
      major: "Engineering",
      status: "Accepted",
      comment: "",
      internshipTitle: "Software Engineering Intern",
      intro: "Working on backend development",
      relevantCourse: "Database Systems",
    },
    {
      id: 2,
      name: "Marawan Mahmoud",
      major: "Engineering",
      status: "Rejected",
      comment: "Missing required documents",
      internshipTitle: "Data Analyst Intern",
      intro: "Analyzing customer data",
      relevantCourse: "Data Mining",
    },
    {
      id: 3,
      name: "Zain Mohamed",
      major: "Business Informatics",
      status: "Pending",
      comment: "",
      internshipTitle: "Network Engineer Intern",
      intro: "Setting up network infrastructure",
      relevantCourse: "Computer Networks",
    },
    {
      id: 4,
      name: "Youmna Ali",
      major: "Business Informatics",
      status: "Flagged",
      comment: "Needs to update contact information",
      internshipTitle: "Business Analyst Intern",
      intro: "Analyzing business processes",
      relevantCourse: "Business Intelligence",
    },
    {
      id: 5,
      name: "Adham Ashraf",
      major: "Pharmacy",
      status: "Rejected",
      comment: "Incomplete application",
      internshipTitle: "Pharmaceutical Intern",
      intro: "Researching drug interactions",
      relevantCourse: "Pharmacology",
    },
    {
      id: 6,
      name: "Sara Hassan",
      major: "Engineering",
      status: "Pending",
      comment: "",
      internshipTitle: "Web Developer Intern",
      intro: "Building responsive web applications",
      relevantCourse: "Web Development",
    },
    {
      id: 7,
      name: "Ahmed Mahmoud",
      major: "Engineering",
      status: "Pending",
      comment: "",
      internshipTitle: "Mobile App Developer Intern",
      intro: "Developing cross-platform mobile apps",
      relevantCourse: "Mobile Computing",
    },
    {
      id: 8,
      name: "Laila Kamal",
      major: "Applied Arts",
      status: "Accepted",
      comment: "",
      internshipTitle: "Graphic Design Intern",
      intro: "Creating visual content for marketing",
      relevantCourse: "Digital Design",
    },
    {
      id: 9,
      name: "Karim Nader",
      major: "Business Informatics",
      status: "Flagged",
      comment: "Missing supervisor information",
      internshipTitle: "IT Support Intern",
      intro: "Providing technical support",
      relevantCourse: "IT Service Management",
    },
    {
      id: 10,
      name: "Nour Samy",
      major: "Engineering",
      status: "Pending",
      comment: "",
      internshipTitle: "Frontend Developer Intern",
      intro: "Building user interfaces",
      relevantCourse: "User Interface Design",
    },
  ])

  // Mock statistics data
  const [statistics, setStatistics] = useState({
    statusCounts: {
      accepted: 12,
      rejected: 5,
      flagged: 3,
      pending: 8,
    },
    averageReviewTime: "2.3 days",
    topCourses: [
      { name: "Database Systems", count: 15 },
      { name: "Software Engineering", count: 12 },
      { name: "Computer Networks", count: 10 },
      { name: "Data Structures", count: 8 },
      { name: "Algorithms", count: 7 },
    ],
    topRatedCompanies: [
      { name: "TechCorp", rating: 4.8 },
      { name: "InnovateSoft", rating: 4.7 },
      { name: "DataMinds", rating: 4.6 },
      { name: "CloudSphere", rating: 4.5 },
      { name: "CodeCraft", rating: 4.4 },
    ],
    topCompaniesByCount: [
      { name: "TechCorp", count: 8 },
      { name: "DataMinds", count: 7 },
      { name: "CloudSphere", count: 6 },
      { name: "InnovateSoft", count: 5 },
      { name: "CodeCraft", count: 4 },
    ],
  })

  // Extract unique majors and statuses
  const uniqueMajors = ["All Majors", ...new Set(students.map((student) => student.major))]
  const uniqueStatuses = ["All Statuses", ...new Set(students.map((student) => student.status))]

  const [selectedMajor, setSelectedMajor] = useState("All Majors")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [filteredStudents, setFilteredStudents] = useState(students)
  const reportType = "comprehensive"
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [generatedReport, setGeneratedReport] = useState(null)

  // Apply filters when selections or the base student list changes
  useEffect(() => {
    let result = [...students]

    if (selectedMajor !== "All Majors") {
      result = result.filter((student) => student.major === selectedMajor)
    }

    if (selectedStatus !== "All Statuses") {
      result = result.filter((student) => student.status === selectedStatus)
    }

    setFilteredStudents(result)
  }, [selectedMajor, selectedStatus, students])

  // Handle view button click
  const handleViewReport = (studentId) => {
    navigate(`/report-view/${studentId}`)
  }

  // Handle logout
  const handleLogout = () => {
    navigate("/login")
  }

  // Handle generate report
  const handleGenerateReport = () => {
    setIsGeneratingReport(true)

    // Simulate report generation
    setTimeout(() => {
      const currentDate = new Date().toLocaleDateString()

      // Create report data based on selected type
      const reportData = {
        title: "",
        date: currentDate,
        sections: [],
      }

      // Use data from state
      if (reportType === "status" || reportType === "comprehensive") {
        reportData.sections.push({
          title: "Status Distribution",
          data: [
            { label: "Accepted", value: statistics.statusCounts.accepted },
            { label: "Rejected", value: statistics.statusCounts.rejected },
            { label: "Flagged", value: statistics.statusCounts.flagged },
            { label: "Pending", value: statistics.statusCounts.pending },
          ],
        })
      }

      if (reportType === "courses" || reportType === "comprehensive") {
        reportData.sections.push({
          title: "Most Frequently Used Courses",
          data: statistics.topCourses.map((course) => ({
            label: course.name,
            value: `${course.count} internships`,
          })),
        })
      }

      if (reportType === "companies" || reportType === "comprehensive") {
        reportData.sections.push({
          title: "Top Rated Companies",
          data: statistics.topRatedCompanies.map((company) => ({
            label: company.name,
            value: `${company.rating}/5`,
          })),
        })
      }

      if (reportType === "internships" || reportType === "comprehensive") {
        reportData.sections.push({
          title: "Top Companies by Internship Count",
          data: statistics.topCompaniesByCount.map((company) => ({
            label: company.name,
            value: `${company.count} internships`,
          })),
        })
      }

      // Add average review time to all reports
      reportData.sections.push({
        title: "Average Review Time",
        data: [{ label: "Average Time", value: statistics.averageReviewTime }],
      })

      // Set report title based on type
      reportData.title = "Comprehensive Internship Statistics Report"

      setGeneratedReport(reportData)
      setIsGeneratingReport(false)
      setShowReportPreview(true)
    }, 1500)
  }

  // Handle download PDF
  const handleDownloadPDF = () => {
    alert("PDF download started. The file will be saved to your downloads folder.")

    // Simulate download delay
    setTimeout(() => {
      console.log("PDF downloaded")
    }, 1000)
  }

  // Close report preview
  const handleClosePreview = () => {
    setShowReportPreview(false)
    setGeneratedReport(null)
  }

  const handleBack = () => {
    console.log("Going back");
    window.history.back();
  };

  const handleNext = () => {
    console.log("Going forward");
    window.history.forward();
  };

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    major: "All Majors",
    status: "All Statuses"
  });

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo-text">Hello Dr. Milad</h2>
        </div>

        <div className="sidebar-content">
          <ul className="sidebar-nav">
            <li className={`sidebar-nav-item ${activeTab === "students" ? "active" : ""}`}>
              <a href="#" className="sidebar-nav-link" onClick={() => setActiveTab("students")}>
                <Users size={20} />
                <span>Students</span>
              </a>
            </li>
            <li className={`sidebar-nav-item ${activeTab === "statistics" ? "active" : ""}`}>
              <a href="#" className="sidebar-nav-link" onClick={() => setActiveTab("statistics")}>
                <BarChart2 size={20} />
                <span>Statistics</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-left">
            <div className="nav-buttons">
              <button className="nav-button" onClick={handleBack}>
                <ChevronLeft size={20} />
              </button>
              <button className="nav-button" onClick={handleNext}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="header-right">
            <div className="notification-container">
              <button className="notification-button" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} />
              </button>
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-item">
                    <p>No new notifications</p>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-container">
              <div className="profile-image" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <User size={20} />
              </div>

              {showProfileMenu && (
                <div className="profile-menu">
                  <button className="profile-menu-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="content-area">
          <div className="content-header">
            <h2 className="content-title">{activeTab === "statistics" ? "Real-time Statistics" : "Students"}</h2>
          </div>

          {activeTab === "students" ? (
            <>
              <div className="filters-section">
                <button
                  className={`filter-button-main ${showFilterModal ? 'active' : ''}`}
                  onClick={() => setShowFilterModal(!showFilterModal)}
                >
                  <AlignLeft size={18} />
                  <span>Filters</span>
                </button>
                <div className="students-count">
                  Showing {filteredStudents.length} of {students.length} students
                </div>
              </div>

              {showFilterModal && (
                <div className="filter-modal-overlay">
                  <div className="filter-modal">
                    <div className="filter-modal-header">
                      <h3>Filters</h3>
                      <button className="close-modal-button" onClick={() => setShowFilterModal(false)}>×</button>
                    </div>

                    <div className="filter-modal-content">
                      <div className="filter-section">
                        <h4>MAJOR</h4>
                        <div className="filter-options">
                          {uniqueMajors.map((major) => (
                            <button
                              key={major}
                              className={`filter-option ${selectedFilters.major === major ? 'active' : ''}`}
                              onClick={() => setSelectedFilters({ ...selectedFilters, major })}
                            >
                              {major}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="filter-section">
                        <h4>STATUS</h4>
                        <div className="filter-options">
                          {uniqueStatuses.map((status) => (
                            <button
                              key={status}
                              className={`filter-option ${selectedFilters.status === status ? 'active' : ''}`}
                              onClick={() => setSelectedFilters({ ...selectedFilters, status })}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="filter-modal-footer">
                      <button
                        className="reset-button"
                        onClick={() => {
                          setSelectedFilters({
                            major: "All Majors",
                            status: "All Statuses"
                          });
                        }}
                      >
                        Reset
                      </button>
                      <button
                        className="apply-button"
                        onClick={() => {
                          setSelectedMajor(selectedFilters.major);
                          setSelectedStatus(selectedFilters.status);
                          setShowFilterModal(false);
                        }}
                      >
                        Show {filteredStudents.length} students
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="students-table-container">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Major</th>
                      <th>Status</th>
                      <th>Comment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td className="major">{student.major}</td>
                          <td>
                            <span className={`status-pill ${student.status.toLowerCase()}`}>{student.status}</span>
                          </td>
                          <td className="comment">{student.comment || "-"}</td>
                          <td className="actions">
                            <button
                              className="action-button details-button"
                              onClick={() => handleViewReport(student.id)}
                            >
                              {student.status === "Pending" ? "Review" : "Details"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-results">
                          No students match the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="statistics-view">
              {statistics ? (
                <div className="statistics-content">
                  <div className="stat-section">
                    <h4 className="stat-title">Status Distribution</h4>
                    <div className="status-stats">
                      <div className="status-stat-item">
                        <div className="status-label">Accepted</div>
                        <div className="status-count accepted">{statistics.statusCounts?.accepted ?? 0}</div>
                      </div>
                      <div className="status-stat-item">
                        <div className="status-label">Rejected</div>
                        <div className="status-count rejected">{statistics.statusCounts?.rejected ?? 0}</div>
                      </div>
                      <div className="status-stat-item">
                        <div className="status-label">Flagged</div>
                        <div className="status-count flagged">{statistics.statusCounts?.flagged ?? 0}</div>
                      </div>
                      <div className="status-stat-item">
                        <div className="status-label">Pending</div>
                        <div className="status-count pending">{statistics.statusCounts?.pending ?? 0}</div>
                      </div>
                    </div>
                  </div>

                  <div className="stat-section">
                    <h4 className="stat-title">Average Review Time</h4>
                    <div className="avg-review-time">
                      <div className="time-value">{statistics.averageReviewTime || "N/A"}</div>
                    </div>
                  </div>

                  <div className="stat-section">
                    <h4 className="stat-title">Most Frequently Used Courses</h4>
                    <ul className="stat-list">
                      {(statistics.topCourses || []).map((course, index) => (
                        <li key={index} className="stat-list-item">
                          <span className="item-name">{course.name}</span>
                          <span className="item-value">{course.count} internships</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="stat-section">
                    <h4 className="stat-title">Top Rated Companies</h4>
                    <ul className="stat-list">
                      {(statistics.topRatedCompanies || []).map((company, index) => (
                        <li key={index} className="stat-list-item">
                          <span className="item-name">{company.name}</span>
                          <span className="item-value">{company.rating}/5</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="stat-section">
                    <h4 className="stat-title">Top Companies by Internship Count</h4>
                    <ul className="stat-list">
                      {(statistics.topCompaniesByCount || []).map((company, index) => (
                        <li key={index} className="stat-list-item">
                          <span className="item-name">{company.name}</span>
                          <span className="item-value">{company.count} internships</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>Loading statistics...</p>
              )}

              <div className="report-generation">
                <div className="report-form">
                  <button
                    className="generate-button"
                    onClick={handleGenerateReport}
                    disabled={isGeneratingReport || !statistics}
                  >
                    {isGeneratingReport ? "Generating..." : "Generate Comprehensive Report"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Report Preview Modal */}
          {showReportPreview && generatedReport && (
            <div className="report-preview-overlay">
              <div className="report-preview-container">
                <div className="report-preview-header">
                  <h2>{generatedReport.title}</h2>
                  <button className="close-preview-button" onClick={handleClosePreview} aria-label="Close preview">
                    ×
                  </button>
                </div>

                <div className="report-preview-content">
                  <div className="report-meta">
                    <p>Generated on: {generatedReport.date}</p>
                    <p>Generated by: Dr. Milad</p>
                  </div>

                  {generatedReport.sections.map((section, index) => (
                    <div key={index} className="report-section">
                      <h3>{section.title}</h3>
                      {section.data?.length > 0 ? (
                        <dl className="report-list">
                          {section.data.map((item, i) => (
                            <div key={i} className="report-list-item">
                              <dt className="report-item-label">{item.label}</dt>
                              <dd className="report-item-value">{item.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <p className="no-data">No data available for this section.</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="report-preview-footer">
                  <button className="download-pdf-button" onClick={handleDownloadPDF}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="download-icon"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download as PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Faculty
