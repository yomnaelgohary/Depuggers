"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Faculty.css"

function Faculty() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("students") // 'students' or 'statistics'
  const [showReportPreview, setShowReportPreview] = useState(false)

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
      name: "Adham ashraf",
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
  const reportType = "comprehensive" // Always generate comprehensive reports
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [generatedReport, setGeneratedReport] = useState(null)

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
      const currentDate = new Date().toLocaleDateString()

      // Create report data based on selected type
      const reportData = {
        title: "",
        date: currentDate,
        sections: [],
      }

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
      switch (reportType) {
        case "status":
          reportData.title = "Status Distribution Report"
          break
        case "courses":
          reportData.title = "Course Frequency Report"
          break
        case "companies":
          reportData.title = "Company Ratings Report"
          break
        case "internships":
          reportData.title = "Internship Counts Report"
          break
        case "comprehensive":
        default:
          reportData.title = "Comprehensive Internship Statistics Report"
          break
      }

      setGeneratedReport(reportData)
      setIsGeneratingReport(false)
      setShowReportPreview(true)
    }, 1500)
  }

  // Handle download PDF
  const handleDownloadPDF = () => {
    // In a real application, you would use a library like jsPDF or html2pdf
    // to generate a PDF from the report data
    // For this example, we'll simulate the download

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

        <div className="tab-navigation-container">
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
                          {student.status === "Pending" ? (
                            <button className="view-button" onClick={() => handleViewReport(student.id)}>
                              View
                            </button>
                          ) : (
                            <button className="details-button" onClick={() => handleViewReport(student.id)}>
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
              <div className="report-form">
                <button className="generate-button" onClick={handleGenerateReport} disabled={isGeneratingReport}>
                  {isGeneratingReport ? "Generating..." : "Generate Report"}
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
                <button className="close-preview-button" onClick={handleClosePreview}>
                  ×
                </button>
              </div>

              <div className="report-preview-content">
                <div className="report-meta">
                  <p>Generated on: {generatedReport.date}</p>
                  <p>Generated by: Dr. Yasmine</p>
                </div>

                {generatedReport.sections.map((section, index) => (
                  <div key={index} className="report-section">
                    <h3>{section.title}</h3>
                    <table className="report-table">
                      <tbody>
                        {section.data.map((item, i) => (
                          <tr key={i}>
                            <td className="report-item-label">{item.label}</td>
                            <td className="report-item-value">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              <div className="report-preview-footer">
                <button className="download-pdf-button" onClick={handleDownloadPDF}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="download-icon"
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
  )
}

export default Faculty
