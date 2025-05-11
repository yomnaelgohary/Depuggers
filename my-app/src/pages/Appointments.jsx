"use client"

import { useState } from "react"
import { X, Send } from "lucide-react" // X might not be needed anymore unless for a different purpose
import { useNotifications } from "../components/NotificationsContext"
// Import a CSS file for this page if you don't have one already
// import "./AppointmentsPage.css" // Example: Create and use this for page-specific styles

function Appointments({ onNavigateBack }) { // Renamed onClose to onNavigateBack for clarity
  const { addNotification } = useNotifications()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    reason: "Career Guidance",
    reportDetails: "",
    preferredTime: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const message = `Thank you, ${formData.name}! Your request for "${formData.reason}" has been received. We will contact you at ${formData.email} regarding your preferred time: ${formData.preferredTime}.`
    setConfirmationMessage(message)
    setIsConfirmed(true)
    setIsSubmitting(false)

    addNotification("Appointment request submitted successfully", "success")
  }

  // This function might be used by a "Cancel" button if you add one,
  // or if you implement unsaved changes warnings before navigating away.
  // For now, it's simplified as the primary "close" action is on the confirmation.
  const handleCancelOrGoBack = () => {
    if (!isConfirmed && (formData.name || formData.email || formData.preferredTime)) { // Check if form has data
      if (window.confirm("Are you sure you want to discard your changes and go back?")) {
        onNavigateBack() // Call the navigation function passed as a prop
      }
    } else {
      onNavigateBack() // Call the navigation function
    }
  }


  return (
    // Main container for the page
    <div className="appointments-page-container">
      {!isConfirmed ? (
        <div className="appointment-form-section">
          <div className="page-header">
            {/* You might want a back button here if onNavigateBack is provided */}
            {/* Example:
            {onNavigateBack && (
              <button onClick={handleCancelOrGoBack} className="back-button">
                ← Back
              </button>
            )}
            */}
            <h2>Request an Appointment</h2>
            {/* Removed modal X close button */}
          </div>
          <p className="page-subtitle">
            Request a video call for career guidance or report clarifications.
          </p>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="studentId">Student ID (Optional)</label>
              <input type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason for Appointment</label>
              <select id="reason" name="reason" value={formData.reason} onChange={handleChange} required>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Report Clarification">Report Clarification</option>
                <option value="Internship Search Support">Internship Search Support</option>
                <option value="CV/Resume Review">CV/Resume Review</option>
                <option value="Mock Interview">Mock Interview</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.reason === "Report Clarification" && (
              <div className="form-group">
                <label htmlFor="reportDetails">Report ID/Title (if applicable)</label>
                <input
                  type="text"
                  id="reportDetails"
                  name="reportDetails"
                  value={formData.reportDetails}
                  onChange={handleChange}
                  placeholder="e.g., Report ID 3 or 'UX Design Internship Report'"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Date/Time Slots</label>
              <input
                type="text"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                placeholder="e.g., Next Monday afternoon, or Wed 10 AM - 12 PM"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Brief Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <div className="form-actions"> {/* Wrapper for buttons */}
              <button type="submit" className="submit-appointment-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send size={16} /> Submit Request
                  </>
                )}
              </button>
              {/* Optional: Add a cancel button that uses onNavigateBack */}
              {onNavigateBack && !isSubmitting && (
                 <button type="button" onClick={handleCancelOrGoBack} className="cancel-button">
                   Cancel
                 </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="appointment-confirmation-section">
          <div className="confirmation-icon-success">✓</div>
          <h3>Appointment Request Sent!</h3>
          <p>{confirmationMessage}</p>
          <button onClick={onNavigateBack} className="submit-appointment-button">
            {/* Changed from "Close" to something more page-appropriate like "Go Back" or "Done" */}
            Done
          </button>
        </div>
      )}
    </div>
  )
}

export default Appointments