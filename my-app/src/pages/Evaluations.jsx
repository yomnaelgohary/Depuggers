"use client"

import { useState, useRef, useEffect } from "react"
import { X, AlertTriangle, Edit, Save, Download, Search } from "lucide-react"

function Evaluations() {
  const [jspdfLoaded, setJspdfLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMajor, setSelectedMajor] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedReport, setSelectedReport] = useState(null)
  const [reportType, setReportType] = useState(null)
  const [editingClarification, setEditingClarification] = useState(false)
  const [clarificationText, setClarificationText] = useState("")
  const clarificationTextareaRef = useRef(null)

  const [reports, setReports] = useState([
    {
      id: 1,
      type: "internship",
      title: "Software Engineering Internship Report",
      studentName: "Alice Smith",
      studentId: 101,
      major: "Computer Science",
      company: "Dell Technologies",
      supervisor: "John Will",
      supervisorPosition: "Software Engineer",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      submissionDate: "2023-09-15",
      status: "accepted",
      content: "This report details my experience as a Software Engineering Intern at Dell Technologies...",
      tasks: [
        "Developed new features for the customer portal",
        "Fixed bugs in the existing codebase",
        "Participated in code reviews and team meetings",
      ],
      skills: ["Java", "Spring Boot", "Git", "Agile"],
      challenges: "The biggest challenge was understanding the large codebase and the company's development workflow.",
      learnings: "I learned how to work in a large team, how to communicate effectively, and how to manage my time.",
      feedback: "The internship was a great learning experience. I would recommend it to other students.",
    },
    {
      id: 2,
      type: "evaluation",
      title: "Data Science Internship Evaluation",
      studentName: "Bob Johnson",
      studentId: 102,
      major: "Data Science",
      company: "IBM",
      supervisor: "John Smith",
      supervisorPosition: "Senior Data Scientist",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      submissionDate: "2023-09-05",
      status: "pending",
      performance: {
        technical: 4.5,
        communication: 4.0,
        teamwork: 4.2,
        problemSolving: 4.8,
        overall: 4.4,
      },
      strengths: "Strong analytical skills and quick learner",
      areasForImprovement: "Could improve documentation practices",
      comments: "Bob was an excellent intern who contributed significantly to our team's projects.",
    },
    {
      id: 3,
      type: "internship",
      title: "UX Design Internship Report",
      studentName: "Diana Lee",
      studentId: 104,
      major: "Design",
      company: "Microsoft",
      supervisor: "John Smith",
      supervisorPosition: "Senior Data Scientist",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      submissionDate: "2023-08-20",
      status: "flagged",
      clarification:
        "The report lacks detailed examples of your design process and user research methods. Please provide more specific information about the methodologies used and include visual examples of your work.",
      content: "This report summarizes my experience as a UX Design Intern at Microsoft...",
      tasks: [
        "Designed user interfaces for mobile applications",
        "Conducted user research and usability testing",
        "Created wireframes and prototypes",
      ],
      skills: ["Figma", "User Research", "Prototyping", "UI/UX"],
      challenges: "The main challenge was adapting to the fast-paced environment and tight deadlines.",
      learnings: "I learned how to work efficiently under pressure and how to take constructive criticism.",
      feedback: "The internship provided valuable industry experience and helped me grow as a designer.",
    },
    // More reports...
  ])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    script.async = true
    script.onload = () => {
      setJspdfLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const filteredReports = reports.filter((report) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = report.title.toLowerCase().includes(query)
      const matchesStudent = report.studentName.toLowerCase().includes(query)
      const matchesCompany = report.company.toLowerCase().includes(query)
      if (!matchesTitle && !matchesStudent && !matchesCompany) return false
    }
    if (selectedMajor !== "All" && report.major !== selectedMajor) return false
    if (selectedStatus !== "All" && report.status !== selectedStatus) return false
    return true
  })

  const uniqueMajors = ["All", ...new Set(reports.map((report) => report.major).filter(Boolean))].sort()

  const handleReportClick = (report) => {
    setSelectedReport(report)
    setReportType(report.type)
    setClarificationText(report.clarification || "")
    setEditingClarification(false)
  }

  const closeReportDetails = () => {
    setSelectedReport(null)
    setReportType(null)
    setEditingClarification(false)
  }

  const updateReportStatus = (reportId, newStatus) => {
    const updatedReports = reports.map((report) => (report.id === reportId ? { ...report, status: newStatus } : report))
    setReports(updatedReports)
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, status: newStatus })
    }
  }

  const handleEditClarification = () => {
    setEditingClarification(true)
    setTimeout(() => {
      if (clarificationTextareaRef.current) clarificationTextareaRef.current.focus()
    }, 0)
  }

  const handleSaveClarification = (reportId) => {
    const updatedReports = reports.map((report) =>
      report.id === reportId ? { ...report, clarification: clarificationText } : report,
    )
    setReports(updatedReports)
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, clarification: clarificationText })
    }
    setEditingClarification(false)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-badge pending"
      case "flagged":
        return "status-badge flagged"
      case "rejected":
        return "status-badge rejected"
      case "accepted":
        return "status-badge accepted"
      default:
        return "status-badge"
    }
  }

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < fullStars)
        stars.push(
          <span key={i} className="star full">
            ★
          </span>,
        )
      else if (i === fullStars && hasHalfStar)
        stars.push(
          <span key={i} className="star half">
            ★
          </span>,
        )
      else
        stars.push(
          <span key={i} className="star empty">
            ☆
          </span>,
        )
    }
    return (
      <div className="rating-stars">
        {stars} <span className="rating-value">({rating.toFixed(1)})</span>
      </div>
    )
  }

  const generateReportPDF = (report) => {
    if (!jspdfLoaded || !window.jspdf) {
      console.error("jsPDF library is not loaded.")
      return
    }
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text(`${report.title}`, 105, 20, { align: "center" })
    doc.setFillColor(195, 20, 50)
    doc.rect(20, 30, 15, 15, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text("SC", 27.5, 39, { align: "center" })
    doc.setTextColor(0, 0, 0)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Report Information", 20, 60)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.text(`Student: ${report.studentName} (ID: ${report.studentId})`, 20, 70)
    doc.text(`Major: ${report.major}`, 20, 80)
    doc.text(`Company: ${report.company}`, 20, 90)
    doc.text(`Status: ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}`, 20, 100)
    doc.text(`Submission Date: ${report.submissionDate}`, 20, 110)

    let yPosition = 120
    if (report.supervisor) {
      doc.text(`Supervisor: ${report.supervisor} (${report.supervisorPosition})`, 20, yPosition)
      yPosition += 10
    }

    if ((report.status === "flagged" || report.status === "rejected") && report.clarification) {
      doc.setFont("helvetica", "bold")
      doc.setFontSize(14)
      doc.text("Clarification", 20, yPosition)
      yPosition += 10
      doc.setFont("helvetica", "normal")
      doc.setFontSize(12)
      const clarificationLines = doc.splitTextToSize(report.clarification, 170)
      doc.text(clarificationLines, 20, yPosition)
      yPosition += clarificationLines.length * 7 + 10
    }
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("Generated by SCAD Office", 105, 280, { align: "center" })
    doc.text(new Date().toLocaleDateString(), 105, 285, { align: "center" })
    const reportTypeString = report.type === "internship" ? "Internship_Report" : "Evaluation_Report"
    doc.save(`${reportTypeString}_${report.studentName.replace(/\s+/g, "_")}.pdf`)
  }

  const renderInternshipReport = (report) => {
    return (
      <div className="report-details">
        <div className="report-details-header">
          <h2>{report.title}</h2>
          <div className="report-status-controls">
            <span className={getStatusBadgeClass(report.status)}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </span>
            <div className="status-actions">
              <button
                className={`status-button flagged ${report.status === "flagged" ? "active" : ""}`}
                onClick={() => updateReportStatus(report.id, "flagged")}
              >
                Flag
              </button>
              <button
                className={`status-button rejected ${report.status === "rejected" ? "active" : ""}`}
                onClick={() => updateReportStatus(report.id, "rejected")}
              >
                Reject
              </button>
              <button
                className={`status-button accepted ${report.status === "accepted" ? "active" : ""}`}
                onClick={() => updateReportStatus(report.id, "accepted")}
              >
                Accept
              </button>
            </div>
          </div>
          <div className="report-actions">
            <button className="download-pdf-button" onClick={() => generateReportPDF(report)}>
              <Download size={16} /> Download PDF
            </button>
            <button className="modal-close-button" onClick={closeReportDetails}>
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="report-details-content">
          {(report.status === "flagged" || report.status === "rejected") && (
            <div className="clarification-section">
              <div className="clarification-header">
                <h3>
                  <AlertTriangle size={18} className="clarification-icon" /> Clarification for{" "}
                  {report.status === "flagged" ? "Flag" : "Rejection"}
                </h3>
                {!editingClarification ? (
                  <button className="edit-clarification-button" onClick={handleEditClarification}>
                    <Edit size={16} /> Edit
                  </button>
                ) : (
                  <button className="save-clarification-button" onClick={() => handleSaveClarification(report.id)}>
                    <Save size={16} /> Save Clarification
                  </button>
                )}
              </div>
              {!editingClarification ? (
                <div className="clarification-text">{report.clarification || "No clarification provided."}</div>
              ) : (
                <textarea
                  ref={clarificationTextareaRef}
                  className="clarification-textarea"
                  value={clarificationText}
                  onChange={(e) => setClarificationText(e.target.value)}
                  placeholder="Enter clarification reason here..."
                />
              )}
            </div>
          )}
          <div className="report-meta">
            <div className="meta-item">
              <h4>Student</h4>
              <p>
                {report.studentName} (ID: {report.studentId})
              </p>
            </div>
            <div className="meta-item">
              <h4>Major</h4>
              <p>{report.major}</p>
            </div>
            <div className="meta-item">
              <h4>Company</h4>
              <p>{report.company}</p>
            </div>
            <div className="meta-item">
              <h4>Submission Date</h4>
              <p>{report.submissionDate}</p>
            </div>
          </div>
          <div className="report-section">
            <h3>Report Content</h3>
            <p>{report.content}</p>
          </div>
          <div className="report-section">
            <h3>Tasks Performed</h3>
            <ul className="tasks-list">
              {report.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
          <div className="report-section">
            <h3>Skills Developed</h3>
            <div className="skills-list">
              {report.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="report-section">
            <h3>Challenges</h3>
            <p>{report.challenges}</p>
          </div>
          <div className="report-section">
            <h3>Learnings</h3>
            <p>{report.learnings}</p>
          </div>
          <div className="report-section">
            <h3>Feedback</h3>
            <p>{report.feedback}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderEvaluationReport = (report) => {
    return (
      <div className="report-details">
        <div className="report-details-header">
          <h2>{report.title}</h2>
          <div className="report-status-controls">
            <span className={getStatusBadgeClass(report.status)}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </span>
            <div className="status-actions">
              <button
                className={`status-button flagged ${report.status === "flagged" ? "active" : ""}`}
                onClick={() => updateReportStatus(report.id, "flagged")}
              >
                Flag
              </button>
              <button
                className={`status-button rejected ${report.status === "rejected" ? "active" : ""}`}
                onClick={() => updateReportStatus(report.id, "rejected")}
              >
                Reject
              </button>
              <button
                className={`status-button accepted ${report.status === "accepted" ? "active" : ""}`}
                onClick={() => updateReportStatus(report.id, "accepted")}
              >
                Accept
              </button>
            </div>
          </div>
          <div className="report-actions">
            <button className="download-pdf-button" onClick={() => generateReportPDF(report)}>
              <Download size={16} /> Download PDF
            </button>
            <button className="modal-close-button" onClick={closeReportDetails}>
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="report-details-content">
          {(report.status === "flagged" || report.status === "rejected") && (
            <div className="clarification-section">
              <div className="clarification-header">
                <h3>
                  <AlertTriangle size={18} className="clarification-icon" /> Clarification for{" "}
                  {report.status === "flagged" ? "Flag" : "Rejection"}
                </h3>
                {!editingClarification ? (
                  <button className="edit-clarification-button" onClick={handleEditClarification}>
                    <Edit size={16} /> Edit
                  </button>
                ) : (
                  <button className="save-clarification-button" onClick={() => handleSaveClarification(report.id)}>
                    <Save size={16} /> Save Clarification
                  </button>
                )}
              </div>
              {!editingClarification ? (
                <div className="clarification-text">{report.clarification || "No clarification provided."}</div>
              ) : (
                <textarea
                  ref={clarificationTextareaRef}
                  className="clarification-textarea"
                  value={clarificationText}
                  onChange={(e) => setClarificationText(e.target.value)}
                  placeholder="Enter clarification reason here..."
                />
              )}
            </div>
          )}
          <div className="report-meta">
            <div className="meta-item">
              <h4>Student</h4>
              <p>
                {report.studentName} (ID: {report.studentId})
              </p>
            </div>
            <div className="meta-item">
              <h4>Major</h4>
              <p>{report.major}</p>
            </div>
            <div className="meta-item">
              <h4>Company</h4>
              <p>{report.company}</p>
            </div>
            <div className="meta-item">
              <h4>Supervisor</h4>
              <p>
                {report.supervisor} ({report.supervisorPosition})
              </p>
            </div>
          </div>
          <div className="internship-period">
            <div className="period-item">
              <h4>Start Date</h4>
              <p>{report.startDate}</p>
            </div>
            <div className="period-item">
              <h4>End Date</h4>
              <p>{report.endDate}</p>
            </div>
            <div className="period-item">
              <h4>Submission Date</h4>
              <p>{report.submissionDate}</p>
            </div>
          </div>
          <div className="report-section">
            <h3>Performance Evaluation</h3>
            <div className="performance-grid">
              <div className="performance-item">
                <h4>Technical Skills</h4>
                {renderRatingStars(report.performance.technical)}
              </div>
              <div className="performance-item">
                <h4>Communication</h4>
                {renderRatingStars(report.performance.communication)}
              </div>
              <div className="performance-item">
                <h4>Teamwork</h4>
                {renderRatingStars(report.performance.teamwork)}
              </div>
              <div className="performance-item">
                <h4>Problem Solving</h4>
                {renderRatingStars(report.performance.problemSolving)}
              </div>
              <div className="performance-item overall">
                <h4>Overall Performance</h4>
                {renderRatingStars(report.performance.overall)}
              </div>
            </div>
          </div>
          <div className="report-section">
            <h3>Strengths</h3>
            <p>{report.strengths}</p>
          </div>
          <div className="report-section">
            <h3>Areas for Improvement</h3>
            <p>{report.areasForImprovement}</p>
          </div>
          <div className="report-section">
            <h3>Supervisor Comments</h3>
            <p>{report.comments}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {!selectedReport ? (
        <div className="evaluations-section">
          <div className="evaluations-header">
            <h2>Evaluations & Reports</h2>
          </div>
          <div className="evaluations-search">
            <div className="search-input">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by title, student name, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="evaluations-filters">
            <div className="filter-group">
              <label htmlFor="major">Major:</label>
              <select id="major" value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
                {uniqueMajors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="status">Status:</label>
              <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>
          </div>
          <div className="reports-list">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div key={report.id} className="report-card" onClick={() => handleReportClick(report)}>
                  <div className="report-card-header">
                    <h3>{report.title}</h3>
                    <span className={getStatusBadgeClass(report.status)}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  <div className="report-card-content">
                    <p>
                      <strong>Type:</strong> {report.type === "internship" ? "Internship Report" : "Evaluation Report"}
                    </p>
                    <p>
                      <strong>Student:</strong> {report.studentName}
                    </p>
                    <p>
                      <strong>Company:</strong> {report.company}
                    </p>
                    <p>
                      <strong>Submitted:</strong> {report.submissionDate}
                    </p>
                    {(report.status === "flagged" || report.status === "rejected") && report.clarification && (
                      <p className="report-clarification-preview">
                        <strong>Clarification:</strong> {report.clarification.substring(0, 60)}
                        {report.clarification.length > 60 ? "..." : ""}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No reports found matching your criteria.</div>
            )}
          </div>
        </div>
      ) : reportType === "internship" ? (
        renderInternshipReport(selectedReport)
      ) : (
        renderEvaluationReport(selectedReport)
      )}
    </>
  )
}

export default Evaluations
