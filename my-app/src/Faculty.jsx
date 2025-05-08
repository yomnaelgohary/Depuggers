"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Faculty.css"

function Faculty() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("students") // 'students' or 'statistics'

  const students = [
    {
      id: 1,
      name: "Omar Ahmed",
      major: "Mecha",
      status: "Accepted",
      comment: "",
    },
    {
      id: 2,
      name: "Marawan Mahmoud",
      major: "MET",
      status: "Rejected",
      comment: "Missing required documents",
    },
    {
      id: 3,
      name: "Zain Mohamed",
      major: "IET",
      status: "Pending",
      comment: "",
    },
    {
      id: 4,
      name: "Youmna Ali",
      major: "BI",
      status: "Flagged",
      comment: "Needs to update contact information",
    },
    {
      id: 5,
      name: "Adham Khaled",
      major: "Mecha",
      status: "Rejected",
      comment: "Incomplete application",
    },
  ]

  // Mock statistics data
  const statistics = {
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
  }

  // Extract unique majors and statuses
  const uniqueMajors = ["All Majors", ...new Set(students.map((student) => student.major))]
  const uniqueStatuses = ["All Statuses", ...new Set(students.map((student) => student.status))]

  const [selectedMajor, setSelectedMajor] = useState("All Majors")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [filteredStudents, setFilteredStudents] = useState(students)
  const [reportType, setReportType] = useState("status")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  // Apply filters when selections change
  useEffect(() => {
    let result = [...students]

    if (selectedMajor !== "All Majors") {
      result = result.filter((student) => student.major === selectedMajor)
    }

    if (selectedStatus !== "All Statuses") {
      result = result.filter((student) => student.status === selectedStatus)
    }

    setFilteredStudents(result)
  }, [selectedMajor, selectedStatus])

  // Handle view button click
  const handleViewReport = (studentId) => {
    navigate(`/report-view/${studentId}`)
  }

  // Handle generate report
  const handleGenerateReport = () => {
    setIsGeneratingReport(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false)
      alert(`Report on ${reportType} statistics has been generated and is ready for download.`)
    }, 1500)
  }

  return (
    <div className="faculty-container">
      <header className="faculty-header">
        <div className="header-title">
          <span className="back-icon" onClick={() => navigate("/")}>
            ←
          </span>
          <h1>Internship Management</h1>
        </div>
        <div className="profile-image">
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" />
        </div>
      </header>

      <main className="faculty-main">
        <h2 className="greeting">Hello Dr. Yasmine</h2>

        <div className="tab-navigation">
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

        {activeTab === "students" ? (
          <>
            <div className="filters-container">
              <div className="filter-section">
                <h3 className="filter-title">Majors</h3>
                <div className="filter-buttons">
                  {uniqueMajors.map((major) => (
                    <button
                      key={major}
                      className={`filter-button ${selectedMajor === major ? "active" : ""}`}
                      onClick={() => setSelectedMajor(major)}
                    >
                      {major}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3 className="filter-title">Status</h3>
                <div className="filter-buttons">
                  {uniqueStatuses.map((status) => (
                    <button
                      key={status}
                      className={`filter-button ${selectedStatus === status ? "active" : ""}`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="students-count">
              Showing {filteredStudents.length} of {students.length} students
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
                        <td className="comment">{student.comment}</td>
                        <td className="actions">
                          <button className="view-button" onClick={() => handleViewReport(student.id)}>
                            View
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
            <div className="statistics-header">
              <h3>Real-time Statistics</h3>
              <p>View key metrics and insights about internship reports</p>
            </div>

            <div className="statistics-grid">
              <div className="stat-card">
                <h4>Status Distribution</h4>
                <div className="status-stats">
                  <div className="status-stat-item">
                    <div className="status-label">Accepted</div>
                    <div className="status-count accepted">{statistics.statusCounts.accepted}</div>
                  </div>
                  <div className="status-stat-item">
                    <div className="status-label">Rejected</div>
                    <div className="status-count rejected">{statistics.statusCounts.rejected}</div>
                  </div>
                  <div className="status-stat-item">
                    <div className="status-label">Flagged</div>
                    <div className="status-count flagged">{statistics.statusCounts.flagged}</div>
                  </div>
                  <div className="status-stat-item">
                    <div className="status-label">Pending</div>
                    <div className="status-count pending">{statistics.statusCounts.pending}</div>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <h4>Average Review Time</h4>
                <div className="avg-review-time">
                  <div className="time-value">{statistics.averageReviewTime}</div>
                </div>
              </div>

              <div className="stat-card">
                <h4>Most Frequently Used Courses</h4>
                <ul className="stat-list">
                  {statistics.topCourses.map((course, index) => (
                    <li key={index} className="stat-list-item">
                      <span className="item-name">{course.name}</span>
                      <span className="item-value">{course.count} internships</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stat-card">
                <h4>Top Rated Companies</h4>
                <ul className="stat-list">
                  {statistics.topRatedCompanies.map((company, index) => (
                    <li key={index} className="stat-list-item">
                      <span className="item-name">{company.name}</span>
                      <span className="item-value">{company.rating}/5</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="stat-card">
                <h4>Top Companies by Internship Count</h4>
                <ul className="stat-list">
                  {statistics.topCompaniesByCount.map((company, index) => (
                    <li key={index} className="stat-list-item">
                      <span className="item-name">{company.name}</span>
                      <span className="item-value">{company.count} internships</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="report-generation">
              <h3>Generate Reports</h3>
              <div className="report-form">
                <div className="report-type-selector">
                  <label htmlFor="report-type">Report Type:</label>
                  <select
                    id="report-type"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="report-select"
                  >
                    <option value="status">Status Distribution</option>
                    <option value="courses">Course Frequency</option>
                    <option value="companies">Company Ratings</option>
                    <option value="internships">Internship Counts</option>
                    <option value="comprehensive">Comprehensive Report</option>
                  </select>
                </div>
                <button className="generate-button" onClick={handleGenerateReport} disabled={isGeneratingReport}>
                  {isGeneratingReport ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Faculty
