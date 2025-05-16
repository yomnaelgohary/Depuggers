"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, LogOut, Bell, ChevronLeft, ChevronRight, Users, BarChart2, AlignLeft, GraduationCap } from 'lucide-react'
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
    <div className="app-container-unique13">
      <div className="sidebar-unique13">
        <div className="sidebar-header-unique13">
          <div className="logo-container-unique13">
            <div className="logo-unique13">
              <div className="logo-icon-unique13">
                <GraduationCap size={24} color="white" />
              </div>
              <span className="logo-text-unique13">Dr. Milad</span>
            </div>
            <div className="header-underline-unique13"></div>
            <div className="main-label-unique13">MAIN</div>
          </div>
        </div>

        <div className="sidebar-content-unique13">
          <nav className="sidebar-nav-unique13">
            <button
              className={`sidebar-nav-item-unique13 ${activeTab === "students" ? "active" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              <Users size={20} />
              <span>Students</span>
              {activeTab === "students" && <span className="active-indicator-unique13"></span>}
            </button>
            <button
              className={`sidebar-nav-item-unique13 ${activeTab === "statistics" ? "active" : ""}`}
              onClick={() => setActiveTab("statistics")}
            >
              <BarChart2 size={20} />
              <span>Statistics</span>
              {activeTab === "statistics" && <span className="active-indicator-unique13"></span>}
            </button>
          </nav>
        </div>
      </div>

      <div className="main-content-unique13">
        <header className="main-header-unique13">
          <div className="header-left-unique13">
            <div className="nav-buttons-unique13">
              <button
                className={`nav-button-unique13 ${!window.history.length ? "disabled" : ""}`}
                onClick={handleBack}
                disabled={!window.history.length}
              >
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
              <button
                className={`nav-button-unique13 ${!window.history.length ? "disabled" : ""}`}
                onClick={handleNext}
                disabled={!window.history.length}
              >
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="header-right-unique13">
            <div className="notification-container-unique13">
              <button 
                className="notification-button-unique13" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={24} />
              </button>
              {showNotifications && (
                <div className="notifications-panel-unique13">
                  <div className="notifications-header-unique13">
                    <h3>Notifications</h3>
                  </div>
                  <div className="notifications-list-unique13">
                    <div className="no-notifications-unique13">
                      <p>No new notifications</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-container-unique13">
              <button 
                className="profile-button-unique13" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="profile-avatar-unique13">
                  <User size={20} />
                </div>
              </button>

              {showProfileMenu && (
                <div className="profile-menu-unique13">
                  <div className="profile-info-unique13">
                    <p className="profile-name-unique13">Dr. Milad</p>
                  </div>
                  <button className="logout-button-unique13" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content-area-unique13">
          <div className="content-header-unique13">
            {/* <h2 className="content-title-unique13">{activeTab === "statistics" ? "Real-time Statistics" : "Applicants"}</h2> */}
          </div>

          {activeTab === "students" ? (
            <>
              <div className="cs-filters">
                <button className="cs-filter-button" onClick={() => setShowFilterModal(!showFilterModal)}>
                  <span className="cs-filter-icon">≡</span> Filters
                </button>
              </div>

              {showFilterModal && (
                <div className="cs-filter-modal-overlay">
                  <div className="cs-filter-modal">
                    <div className="cs-filter-modal-header">
                      <h2>Filters</h2>
                      <button className="cs-close-button" onClick={() => setShowFilterModal(false)}>
                        ×
                      </button>
                    </div>
                    <div className="cs-filter-modal-content">
                      <div className="cs-filter-section">
                        <h3>MAJOR</h3>
                        <div className="cs-filter-options">
                          {uniqueMajors.map((major) => (
                            <button
                              key={major}
                              className={`cs-filter-option ${selectedFilters.major === major ? "cs-selected" : ""}`}
                              onClick={() => setSelectedFilters({ ...selectedFilters, major })}
                            >
                              {major}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="cs-filter-section">
                        <h3>STATUS</h3>
                        <div className="cs-filter-options">
                          {uniqueStatuses.map((status) => (
                            <button
                              key={status}
                              className={`cs-filter-option ${selectedFilters.status === status ? "cs-selected" : ""}`}
                              onClick={() => setSelectedFilters({ ...selectedFilters, status })}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="cs-filter-actions">
                      <button className="cs-reset-button" onClick={() => {
                        setSelectedFilters({ major: "All Majors", status: "All Statuses" });
                      }}>
                        Reset
                      </button>
                      <button className="cs-apply-button" onClick={() => {
                        setSelectedMajor(selectedFilters.major);
                        setSelectedStatus(selectedFilters.status);
                        setShowFilterModal(false);
                      }}>
                        Show {filteredStudents.length} students
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="students-table-container-unique13">
                <table className="students-table-unique13">
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
                          <td className="major-unique13">{student.major}</td>
                          <td>
                            <span className={`status-pill-unique13 ${student.status.toLowerCase()}-unique13`}>{student.status}</span>
                          </td>
                          <td className="comment-unique13">{student.comment || "-"}</td>
                          <td className="actions-unique13">
                            {student.status === "Pending" ? (
                              <button
                                className="review-button-unique13"
                                onClick={() => handleViewReport(student.id)}
                              >
                                Review
                              </button>
                            ) : (
                              <button
                                className="view-details-button-unique13"
                                onClick={() => handleViewReport(student.id)}
                              >
                                View Details
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-results-unique13">
                          No students match the selected filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="statistics-view-unique13">
              {statistics ? (
                <div className="statistics-content-unique13">
                  <div className="stat-section-unique13">
                    <h4 className="stat-title-unique13">Status Distribution</h4>
                    <div className="status-stats-unique13">
                      <div className="status-stat-item-unique13">
                        <div className="status-label-unique13">Accepted</div>
                        <div className="status-count-unique13 accepted-unique13">{statistics.statusCounts?.accepted ?? 0}</div>
                      </div>
                      <div className="status-stat-item-unique13">
                        <div className="status-label-unique13">Rejected</div>
                        <div className="status-count-unique13 rejected-unique13">{statistics.statusCounts?.rejected ?? 0}</div>
                      </div>
                      <div className="status-stat-item-unique13">
                        <div className="status-label-unique13">Flagged</div>
                        <div className="status-count-unique13 flagged-unique13">{statistics.statusCounts?.flagged ?? 0}</div>
                      </div>
                      <div className="status-stat-item-unique13">
                        <div className="status-label-unique13">Pending</div>
                        <div className="status-count-unique13 pending-unique13">{statistics.statusCounts?.pending ?? 0}</div>
                      </div>
                    </div>
                  </div>

                  <div className="stat-section-unique13">
                    <h4 className="stat-title-unique13">Average Review Time</h4>
                    <div className="avg-review-time-unique13">
                      <div className="time-value-unique13">{statistics.averageReviewTime || "N/A"}</div>
                    </div>
                  </div>

                  <div className="stat-section-unique13">
                    <h4 className="stat-title-unique13">Most Frequently Used Courses</h4>
                    <ul className="stat-list-unique13">
                      {(statistics.topCourses || []).map((course, index) => (
                        <li key={index} className="stat-list-item-unique13">
                          <span className="item-name-unique13">{course.name}</span>
                          <span className="item-value-unique13">{course.count} internships</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="stat-section-unique13">
                    <h4 className="stat-title-unique13">Top Rated Companies</h4>
                    <ul className="stat-list-unique13">
                      {(statistics.topRatedCompanies || []).map((company, index) => (
                        <li key={index} className="stat-list-item-unique13">
                          <span className="item-name-unique13">{company.name}</span>
                          <span className="item-value-unique13">{company.rating}/5</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="stat-section-unique13">
                    <h4 className="stat-title-unique13">Top Companies by Internship Count</h4>
                    <ul className="stat-list-unique13">
                      {(statistics.topCompaniesByCount || []).map((company, index) => (
                        <li key={index} className="stat-list-item-unique13">
                          <span className="item-name-unique13">{company.name}</span>
                          <span className="item-value-unique13">{company.count} internships</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="stat-section-unique13 stat-graph-unique13">
                    <div className="stat-graph-title-unique13">Internship Completion Rate</div>
                    <div className="stat-graph-bar-unique13"></div>
                    <div className="stat-graph-label-unique13">60% of students completed their internships</div>
                  </div>
                </div>
              ) : (
                <p>Loading statistics...</p>
              )}

              <div className="report-generation-unique13">
                <div className="report-form-unique13">
                  <button
                    className="generate-button-unique13"
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
            <div className="report-preview-overlay-unique13">
              <div className="report-preview-container-unique13">
                <div className="report-preview-header-unique13">
                  <h2>{generatedReport.title}</h2>
                  <button className="close-preview-button-unique13" onClick={handleClosePreview} aria-label="Close preview">
                    ×
                  </button>
                </div>

                <div className="report-preview-content-unique13">
                  <div className="report-meta-unique13">
                    <p>Generated on: {generatedReport.date}</p>
                    <p>Generated by: Dr. Milad</p>
                  </div>

                  {generatedReport.sections.map((section, index) => (
                    <div key={index} className="report-section-unique13">
                      <h3>{section.title}</h3>
                      {section.data?.length > 0 ? (
                        <dl className="report-list-unique13">
                          {section.data.map((item, i) => (
                            <div key={i} className="report-list-item-unique13">
                              <dt className="report-item-label-unique13">{item.label}</dt>
                              <dd className="report-item-value-unique13">{item.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <p className="no-data">No data available for this section.</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="report-preview-footer-unique13">
                  <button className="download-pdf-button-unique13" onClick={handleDownloadPDF}>
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
                      className="download-icon-unique13"
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