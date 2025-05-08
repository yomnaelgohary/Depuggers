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
    major: "Computer Science",
    company: "CalmTech",
    supervisor: "Alex Johnson",
    dates: "June 21 - September 10, 2023",
  })

  // In a real app, you would fetch the student data based on the studentId
  useEffect(() => {
    // Simulating data fetch based on studentId
    console.log(`Fetching data for student ID: ${studentId}`)

    // This would be replaced with an actual API call
    // For now, we'll just use the default data
  }, [studentId])

  const handleStatusChange = (newStatus) => {
    if (newStatus === "Rejected" || newStatus === "Flagged") {
      setStatus(newStatus)
      setShowCommentPopup(true)
    } else {
      setStatus(newStatus)
      setComment("") // Clear comment if status is Accepted
    }
  }

  const handleSaveStatus = () => {
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

  const handleViewEvaluation = () => {
    // Implement view evaluation functionality
    console.log("Viewing evaluation")
  }

  const handleDownloadPDF = () => {
    // Implement PDF download functionality
    console.log("Downloading PDF")
  }

  const handleBackClick = () => {
    navigate(-1) // Go back to the previous page
  }

  return (
    <div className="report-container">
      <div className="back-link">
        <button className="back-button" onClick={handleBackClick}>
          ← Back
        </button>
      </div>
      
      <h1 className="report-title">View Report</h1>

      {/* Report Information Card */}
      <div className="report-card">
        <h2 className="card-title">Report Information</h2>

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
          </div>
        </div>
      </div>

      {/* Set Status Card */}
      <div className="report-card">
        <h2 className="card-title">Set Status</h2>

        <div className="status-options">
          <label className="status-option">
            <input
              type="radio"
              name="status"
              checked={status === "Accepted"}
              onChange={() => handleStatusChange("Accepted")}
            />
            <span className="status-text">Accepted</span>
          </label>

          <label className="status-option">
            <input
              type="radio"
              name="status"
              checked={status === "Rejected"}
              onChange={() => handleStatusChange("Rejected")}
            />
            <span className="status-text">Rejected</span>
          </label>

          <label className="status-option">
            <input
              type="radio"
              name="status"
              checked={status === "Flagged"}
              onChange={() => handleStatusChange("Flagged")}
            />
            <span className="status-text">Flagged</span>
          </label>
        </div>

        {/* Display comment if one exists and status is Rejected or Flagged */}
        {comment && (status === "Rejected" || status === "Flagged") && (
          <div className="comment-display">
            <h3>Comment:</h3>
            <p>{comment}</p>
            <button className="edit-comment-button" onClick={() => setShowCommentPopup(true)}>
              Edit Comment
            </button>
          </div>
        )}

        <button className="save-status-button" onClick={handleSaveStatus}>
          Save Status
        </button>
      </div>

      {/* Related Evaluations Card */}
      <div className="report-card">
        <h2 className="card-title">Related Student Company Evaluations</h2>

        <div className="evaluation-item">
          <div className="evaluation-info">
            <div className="evaluation-icon">
              <span className="document-icon"></span>
            </div>
            <div className="evaluation-details">
              <div className="evaluation-title">Evaluation #1</div>
              <div className="evaluation-date">July 1, 2023</div>
            </div>
          </div>

          <button className="view-button" onClick={handleViewEvaluation}>
            View
          </button>
        </div>

        <button className="download-button" onClick={handleDownloadPDF}>
          <span className="download-icon"></span>
          Download PDF
        </button>
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
  )
}

export default ReportView
