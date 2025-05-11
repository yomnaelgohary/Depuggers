"use client"

import { useState } from "react"
import "./faculty.css"

export default function Faculty() {
  const [activeTab, setActiveTab] = useState("students")
  const [selectedMajor, setSelectedMajor] = useState("All Majors")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [showReportView, setShowReportView] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Initial students data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Omar Ahmed",
      major: "Mecha",
      status: "Accepted",
      comment: "",
      supervisor: "Alex Johnson",
      company: "TechCorp",
      startDate: "June 21, 2023",
      endDate: "September 10, 2023",
    },
    {
      id: 2,
      name: "Marwan Mahmoud",
      major: "MET",
      status: "Rejected",
      comment: "Missing required documents",
      supervisor: "Sarah Williams",
      company: "DataMinds",
      startDate: "May 15, 2023",
      endDate: "August 30, 2023",
    },
    {
      id: 3,
      name: "Zain Mohamed",
      major: "IET",
      status: "Pending",
      comment: "",
      supervisor: "David Chen",
      company: "CloudSphere",
      startDate: "July 1, 2023",
      endDate: "October 15, 2023",
    },
    {
      id: 4,
      name: "Younes Ali",
      major: "BI",
      status: "Flagged",
      comment: "Need to update contact information",
      supervisor: "Emily Rodriguez",
      company: "InnovateSoft",
      startDate: "June 10, 2023",
      endDate: "September 5, 2023",
    },
    {
      id: 5,
      name: "Adham ashraf",
      major: "Mecha",
      status: "Rejected",
      comment: "Incomplete application",
      supervisor: "Michael Brown",
      company: "CodeCraft",
      startDate: "May 20, 2023",
      endDate: "August 20, 2023",
    },
    {
      id: 6,
      name: "Katherine F.",
      major: "Computer Science",
      status: "Pending",
      comment: "",
      supervisor: "Alex Johnson",
      company: "CalmTech",
      startDate: "June 21, 2023",
      endDate: "September 10, 2023",
    },
  ])

  // Statistics data
  const statisticsData = {
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
      { name: "TechCorp", rating: 4.85 },
      { name: "InnovateSoft", rating: 4.75 },
      { name: "DataMinds", rating: 4.65 },
      { name: "CloudSphere", rating: 4.55 },
      { name: "CodeCraft", rating: 4.45 },
    ],
    topCompaniesByCount: [
      { name: "TechCorp", count: 8 },
      { name: "DataMinds", count: 7 },
      { name: "CloudSphere", count: 6 },
      { name: "InnovateSoft", count: 5 },
      { name: "CodeCraft", count: 4 },
    ],
  }

  // Available majors and statuses
  const majors = ["All Majors", "Mecha", "MET", "IET", "BI"]
  const statuses = ["All Statuses", "Accepted", "Rejected", "Pending", "Flagged"]

  // Filter students based on selected major and status
  const filteredStudents = students.filter((student) => {
    const majorMatch = selectedMajor === "All Majors" || student.major === selectedMajor
    const statusMatch = selectedStatus === "All Statuses" || student.status === selectedStatus
    return majorMatch && statusMatch
  })

  // Handle status change
  const handleStatusChange = (studentId, newStatus, comment = "") => {
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            status: newStatus,
            comment: comment || student.comment,
          }
        }
        return student
      }),
    )
    setShowReportView(false)
  }

  // Open report view for a student
  const openReportView = (student) => {
    setSelectedStudent(student)
    setShowReportView(true)
  }

  // Go back from report view
  const goBackFromReport = () => {
    setShowReportView(false)
    setSelectedStudent(null)
  }

  // Generate report
  const handleGenerateReport = () => {
    alert("Report generation started. The file will be saved to your downloads folder.")
  }

  return (
    <div className="faculty-container">
      <header className="faculty-header">
        <h1>Internship Management</h1>
        <div className="header-actions">
          <button className="settings-button">
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
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          <button className="profile-button">Profile</button>
        </div>
      </header>

      <main className="faculty-main">
        {!showReportView ? (
          <>
            <div className="greeting-section">
              <h2>Hello Dr. Yasmine</h2>
            </div>

            <div className="tabs-container">
              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === "students" ? "active" : ""}`}
                  onClick={() => setActiveTab("students")}
                >
                  Students
                </button>
                <button
                  className={`tab-button ${activeTab === "statistics" ? "active" : ""}`}
                  onClick={() => setActiveTab("statistics")}
                >
                  Statistics
                </button>
              </div>
            </div>

            {activeTab === "students" && (
              <div className="students-section">
                <div className="filter-section">
                  <div className="filter-row">
                    {majors.map((major) => (
                      <button
                        key={major}
                        className={`filter-pill ${selectedMajor === major ? "active" : ""}`}
                        onClick={() => setSelectedMajor(major)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        {major}
                      </button>
                    ))}
                  </div>
                  <div className="filter-row">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        className={`filter-pill ${selectedStatus === status ? "active" : ""}`}
                        onClick={() => setSelectedStatus(status)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

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
                              {student.status === "Pending" ? (
                                <button className="action-button" onClick={() => openReportView(student)}>
                                  Review
                                </button>
                              ) : (
                                <button className="details-button" onClick={() => openReportView(student)}>
                                  Details
                                </button>
                              )}
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
              </div>
            )}

            {activeTab === "statistics" && (
              <div className="statistics-section">
                <div className="statistics-header">
                  <h3>Real-time Statistics</h3>
                  <p>View key metrics and insights about internship reports</p>
                </div>

                <div className="statistics-grid">
                  <div className="stat-card">
                    <h4>Status Distribution</h4>
                    <div className="status-circles">
                      <div className="status-column">
                        <div className="status-label">Accepted</div>
                        <div className="status-circle accepted">
                          <span>{statisticsData.statusCounts.accepted}</span>
                        </div>
                      </div>
                      <div className="status-column">
                        <div className="status-label">Rejected</div>
                        <div className="status-circle rejected">
                          <span>{statisticsData.statusCounts.rejected}</span>
                        </div>
                      </div>
                      <div className="status-column">
                        <div className="status-label">Flagged</div>
                        <div className="status-circle flagged">
                          <span>{statisticsData.statusCounts.flagged}</span>
                        </div>
                      </div>
                      <div className="status-column">
                        <div className="status-label">Pending</div>
                        <div className="status-circle pending">
                          <span>{statisticsData.statusCounts.pending}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="stat-card review-time">
                    <h4>Average Review Time</h4>
                    <div className="time-value">{statisticsData.averageReviewTime}</div>
                  </div>

                  <div className="stat-card">
                    <h4>Most Frequently Used Courses</h4>
                    <table className="stat-table">
                      <tbody>
                        {statisticsData.topCourses.map((course, index) => (
                          <tr key={index}>
                            <td>{course.name}</td>
                            <td className="count">{course.count} internships</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="stat-card">
                    <h4>Top Rated Companies</h4>
                    <table className="stat-table">
                      <tbody>
                        {statisticsData.topRatedCompanies.map((company, index) => (
                          <tr key={index}>
                            <td>{company.name}</td>
                            <td className="rating">{company.rating}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="stat-card">
                    <h4>Top Companies by Internship Count</h4>
                    <table className="stat-table">
                      <tbody>
                        {statisticsData.topCompaniesByCount.map((company, index) => (
                          <tr key={index}>
                            <td>{company.name}</td>
                            <td className="count">{company.count} internships</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="generate-report-container">
                  <button className="generate-report-button" onClick={handleGenerateReport}>
                    Generate Report
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="report-view">
            <div className="report-header">
              <button className="back-button" onClick={goBackFromReport}>
                ← Back
              </button>
              <h2>View Report</h2>
            </div>

            <div className="report-card">
              <h3>Report Information</h3>
              <div className="report-info-grid">
                <div className="report-info-column">
                  <div className="report-info-row">
                    <div className="info-label">Student</div>
                    <div className="info-value">{selectedStudent.name}</div>
                  </div>
                  <div className="report-info-row">
                    <div className="info-label">Major</div>
                    <div className="info-value">{selectedStudent.major}</div>
                  </div>
                  <div className="report-info-row">
                    <div className="info-label">Company</div>
                    <div className="info-value">{selectedStudent.company}</div>
                  </div>
                </div>
                <div className="report-info-column">
                  <div className="report-info-row">
                    <div className="info-label">Main Supervisor</div>
                    <div className="info-value">{selectedStudent.supervisor}</div>
                  </div>
                  <div className="report-info-row">
                    <div className="info-label">Internship Dates</div>
                    <div className="info-value">
                      {selectedStudent.startDate} - {selectedStudent.endDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedStudent.status === "Pending" && (
              <div className="report-card">
                <h3>Set Status</h3>
                <div className="status-options">
                  <label className="status-option">
                    <input type="radio" name="status" value="Accepted" defaultChecked />
                    <span>Accepted</span>
                  </label>
                  <label className="status-option">
                    <input type="radio" name="status" value="Rejected" />
                    <span>Rejected</span>
                  </label>
                  <label className="status-option">
                    <input type="radio" name="status" value="Flagged" />
                    <span>Flagged</span>
                  </label>
                </div>
                <button
                  className="save-status-button"
                  onClick={() => {
                    const selectedStatus = document.querySelector('input[name="status"]:checked').value
                    handleStatusChange(selectedStudent.id, selectedStatus)
                  }}
                >
                  Save Status
                </button>
              </div>
            )}

            <div className="report-card">
              <h3>Related Student Company Evaluations</h3>
              <div className="evaluations-list">
                <div className="evaluation-item">
                  <div className="evaluation-info">
                    <div className="evaluation-title">Evaluation #1</div>
                    <div className="evaluation-date">July 1, 2023</div>
                  </div>
                  <button className="view-evaluation-button">View</button>
                </div>
              </div>
              <div className="download-container">
                <button className="download-pdf-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
//zain