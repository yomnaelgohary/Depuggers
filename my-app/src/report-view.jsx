"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./report-view.css"

function ReportView() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState("Accepted")
  const [comment, setComment] = useState("")
  const [showCommentPopup, setShowCommentPopup] = useState(false)
  const [studentData, setStudentData] = useState({
    name: "Katherine F.",
    major: "Engineering",
    company: "CalmTech",
    supervisor: "Alex Johnson",
    dates: "June 21 - September 10, 2023",
    status: "Accepted",
    internshipTitle: "Software Engineering Intern",
    intro: "Working on backend development",
    relevantCourse: "Database Systems",
  })
  const [canEdit, setCanEdit] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // In a real app, you would fetch the student data based on the studentId
  useEffect(() => {
    // Simulating data fetch based on studentId
    console.log(`Fetching data for student ID: ${studentId}`)

    // Mock data for different students
    const mockStudents = {
      1: {
        name: "Omar Ahmed",
        major: "Engineering",
        company: "TechCorp",
        supervisor: "Sarah Williams",
        dates: "May 15 - August 10, 2023",
        status: "Accepted",
        internshipTitle: "Mechanical Design Intern",
        intro: "Working on CAD designs for new products",
        relevantCourse: "Mechanical Design",
      },
      2: {
        name: "Marawan Mahmoud",
        major: "Engineering",
        company: "DataMinds",
        supervisor: "John Davis",
        dates: "June 1 - August 30, 2023",
        status: "Rejected",
        internshipTitle: "Backend Developer Intern",
        intro: "Developing APIs and database solutions",
        relevantCourse: "Database Systems",
      },
      3: {
        name: "Zain Mohamed",
        major: "Business Informatics",
        company: "CloudSphere",
        supervisor: "Emily Chen",
        dates: "May 20 - August 15, 2023",
        status: "Pending",
        internshipTitle: "Network Engineer Intern",
        intro: "Setting up and maintaining network infrastructure",
        relevantCourse: "Computer Networks",
      },
      4: {
        name: "Youmna Ali",
        major: "Business Informatics",
        company: "InnovateSoft",
        supervisor: "Michael Brown",
        dates: "June 10 - September 5, 2023",
        status: "Flagged",
        internshipTitle: "Business Analyst Intern",
        intro: "Analyzing business processes and suggesting improvements",
        relevantCourse: "Business Intelligence",
      },
      5: {
        name: "Adham Ashraf",
        major: "Pharmacy",
        company: "CodeCraft",
        supervisor: "Jessica Lee",
        dates: "May 25 - August 20, 2023",
        status: "Rejected",
        internshipTitle: "Pharmaceutical Researcher Intern",
        intro: "Researching drug interactions and effects",
        relevantCourse: "Pharmacology",
      },
      6: {
        name: "Sara Hassan",
        major: "Engineering",
        company: "TechCorp",
        supervisor: "David Wilson",
        dates: "June 5 - August 25, 2023",
        status: "Pending",
        internshipTitle: "Web Developer Intern",
        intro: "Building responsive web applications",
        relevantCourse: "Web Development",
      },
      7: {
        name: "Ahmed Mahmoud",
        major: "Engineering",
        company: "DataMinds",
        supervisor: "Lisa Johnson",
        dates: "May 15 - August 10, 2023",
        status: "Pending",
        internshipTitle: "Mobile App Developer Intern",
        intro: "Developing cross-platform mobile applications",
        relevantCourse: "Mobile Computing",
      },
    }

    // Get student data if it exists
    if (mockStudents[studentId]) {
      const student = mockStudents[studentId]
      setStudentData(student)
      setStatus(student.status)

      // Only allow editing for Engineering students with Pending status
      if (student.major === "Engineering" && student.status === "Pending") {
        setCanEdit(true)
        setErrorMessage("")
      } else if (student.status === "Pending") {
        setCanEdit(false)
        setErrorMessage("Dr. Milad can only review pending students in the Engineering major.")
      } else {
        setCanEdit(false)
        setErrorMessage("")
      }
    }
  }, [studentId])

  const handleStatusChange = (newStatus) => {
    if (!canEdit) return

    if (newStatus === "Rejected" || newStatus === "Flagged") {
      setStatus(newStatus)
      setShowCommentPopup(true)
    } else {
      setStatus(newStatus)
      setComment("") // Clear comment if status is Accepted
    }
  }

  const handleSaveStatus = () => {
    if (!canEdit) {
      alert("You can only change the status of pending Engineering students.")
      return
    }

    // Check if comment is required but empty
    if ((status === "Rejected" || status === "Flagged") && !comment.trim()) {
      alert("Please provide a comment for the " + status + " status.")
      setShowCommentPopup(true)
      return
    }

    // Implement save functionality here
    console.log(`Status saved: ${status} for student ID: ${studentId}`)
    console.log(`Comment: ${comment}`)

    // You could show a success message here
    alert("Status updated successfully!")

    // Update the student data
    setStudentData({
      ...studentData,
      status: status,
    })

    // After saving, the student is no longer pending
    setCanEdit(false)
  }

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      alert("Please enter a comment")
      return
    }
    setShowCommentPopup(false)
  }

  const handleCommentCancel = () => {
    // If they cancel, revert to Accepted status
    setStatus("Accepted")
    setComment("")
    setShowCommentPopup(false)
  }

  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    console.log("Downloading PDF")
  }

  const handleBackClick = () => {
    navigate(-1) // Go back to the previous page
  }

  return (
    <div className="page-container">
      <div className="report-container">
        <div className="back-link">
          <button className="back-button" onClick={handleBackClick}>
            ← Back
          </button>
        </div>

        <h1 className="report-title">View Report</h1>

        {/* Report Information Card */}
        <div className="report-card">
          <h2 className="card-title">Evaluation Report</h2>

          <div className="info-grid">
            <div className="info-column">
              <div className="info-item">
                <div className="info-label">Student</div>
                <div className="info-value">{studentData.name}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Major</div>
                <div className="info-value">{studentData.major}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Company</div>
                <div className="info-value">{studentData.company}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Internship Title</div>
                <div className="info-value">{studentData.internshipTitle}</div>
              </div>
            </div>

            <div className="info-column">
              <div className="info-item">
                <div className="info-label">Main Supervisor</div>
                <div className="info-value">{studentData.supervisor}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Internship Dates</div>
                <div className="info-value">{studentData.dates}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Introduction</div>
                <div className="info-value">{studentData.intro}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Relevant Course</div>
                <div className="info-value">{studentData.relevantCourse}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Report Body</div>
                <div className="info-value">
                  This report evaluates the performance and learning outcomes of the internship. The student has
                  demonstrated
                  {studentData.status === "Accepted"
                    ? " excellent"
                    : studentData.status === "Pending"
                      ? " satisfactory"
                      : studentData.status === "Flagged"
                        ? " concerning"
                        : " insufficient"}
                  progress throughout the internship period. The student has successfully applied knowledge from their
                  coursework to real-world scenarios.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Set Status Card */}
        <div className="report-card">
          <h2 className="card-title">Set Status</h2>

          <div className={`status-options ${!canEdit ? "disabled" : ""}`}>
            <label className="status-option">
              <input
                type="radio"
                name="status"
                checked={status === "Accepted"}
                onChange={() => handleStatusChange("Accepted")}
                disabled={!canEdit}
              />
              <span className="status-text">Accepted</span>
            </label>

            <label className="status-option">
              <input
                type="radio"
                name="status"
                checked={status === "Rejected"}
                onChange={() => handleStatusChange("Rejected")}
                disabled={!canEdit}
              />
              <span className="status-text">Rejected</span>
            </label>

            <label className="status-option">
              <input
                type="radio"
                name="status"
                checked={status === "Flagged"}
                onChange={() => handleStatusChange("Flagged")}
                disabled={!canEdit}
              />
              <span className="status-text">Flagged</span>
            </label>
          </div>

          {errorMessage && (
            <div className="edit-restriction-message">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Display comment if one exists and status is Rejected or Flagged */}
          {comment && (status === "Rejected" || status === "Flagged") && (
            <div className="comment-display">
              <h3>Comment:</h3>
              <p>{comment}</p>
              {canEdit && (
                <button className="edit-comment-button" onClick={() => setShowCommentPopup(true)}>
                  Edit Comment
                </button>
              )}
            </div>
          )}

          <button
            className={`save-status-button ${!canEdit ? "disabled" : ""}`}
            onClick={handleSaveStatus}
            disabled={!canEdit}
          >
            Save Status
          </button>
        </div>

        {/* Download Button */}
        <div className="report-card">
          <div className="download-button-container">
            <button className="download-button" onClick={handleDownloadPDF}>
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
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </button>
          </div>
        </div>

        {/* Comment Popup */}
        {showCommentPopup && (
          <div className="popup-overlay">
            <div className="comment-popup">
              <h2>Comment Required</h2>
              <p>Please provide a reason for {status.toLowerCase()} this report:</p>
              <textarea
                className="comment-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment here..."
                rows={4}
              ></textarea>
              <div className="popup-buttons">
                <button className="cancel-button" onClick={handleCommentCancel}>
                  Cancel
                </button>
                <button className="submit-button" onClick={handleCommentSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportView
