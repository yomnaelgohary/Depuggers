"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

function Students() {
  const [initialStudents, setInitialStudents] = useState([
    {
      id: 101,
      name: "Alice Smith",
      internshipStatus: "Ongoing",
      company: "Dell Technologies",
      major: "Computer Science",
    },
    { id: 102, name: "Bob Johnson", internshipStatus: "Not Started", major: "Data Science" },
    { id: 103, name: "Charlie Brown", internshipStatus: "Completed", company: "IBM", major: "Business Administration" },
    { id: 104, name: "Diana Lee", internshipStatus: "Ongoing", company: "Microsoft", major: "Design" },
    { id: 105, name: "Ethan Williams", internshipStatus: "Not Started", major: "Computer Science" },
    { id: 106, name: "Fiona Green", internshipStatus: "Completed", company: "Amazon", major: "Marketing" },
    { id: 107, name: "George Harris", internshipStatus: "Ongoing", company: "PwC", major: "Business Administration" },
    { id: 108, name: "Hannah Clark", internshipStatus: "Not Started", major: "Design" },
    { id: 109, name: "Ian Davis", internshipStatus: "Completed", company: "Oracle", major: "Data Science" },
    { id: 110, name: "Jane Miller", internshipStatus: "Ongoing", company: "Vodafone", major: "Marketing" },
  ])

  const [filterStatus, setFilterStatus] = useState("All")
  const [filteredStudents, setFilteredStudents] = useState(initialStudents)
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null)

  useEffect(() => {
    if (filterStatus === "All") setFilteredStudents(initialStudents)
    else setFilteredStudents(initialStudents.filter((student) => student.internshipStatus === filterStatus))
  }, [initialStudents, filterStatus])

  const handleFilterChange = (event) => setFilterStatus(event.target.value)

  const handleProfileClick = (studentId) => {
    const student = initialStudents.find((s) => s.id === studentId)
    setSelectedStudentProfile(student)
  }

  const closeStudentProfile = () => {
    setSelectedStudentProfile(null)
  }

  const getInitials = (name) => {
    if (!name) return ""
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
  }

  const getStudentInternshipSubmissions = (studentId) => {
    if (studentId === 101)
      return [
        { id: 1, company: "Google", status: "Applied", submissionDate: "2024-08-15" },
        { id: 2, company: "Meta", status: "Interviewed", submissionDate: "2024-09-01" },
      ]
    if (studentId === 103) return [{ id: 3, company: "Amazon", status: "Accepted", submissionDate: "2024-10-20" }]
    return []
  }

  return (
    <>
      {!selectedStudentProfile ? (
        <div className="students-view">
          <div className="students-header">
            <h2>Students List</h2>
          </div>
          <div className="students-filter">
            <label htmlFor="internshipStatus">Filter by Internship Status:</label>
            <select id="internshipStatus" value={filterStatus} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Not Started">Not Started</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <ul className="students-list">
            {filteredStudents.map((student) => (
              <li key={student.id} className="student-card">
                <div className="profile-circle" onClick={() => handleProfileClick(student.id)}>
                  {getInitials(student.name)}
                </div>
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p>ID: {student.id}</p>
                  <p>Internship Status: {student.internshipStatus}</p>
                  {student.company && <p>Company: {student.company}</p>}
                </div>
              </li>
            ))}
            {filteredStudents.length === 0 && <p>No students found with the selected filter.</p>}
          </ul>
        </div>
      ) : (
        <div className="student-profile">
          <div className="profile-header">
            <h2>{selectedStudentProfile.name}'s Profile</h2>
            <button className="modal-close-button" onClick={closeStudentProfile}>
              <X size={20} />
            </button>
          </div>
          <div className="profile-details">
            <p>ID: {selectedStudentProfile.id}</p>
            <p>Internship Status: {selectedStudentProfile.internshipStatus}</p>
            {selectedStudentProfile.company && <p>Current Company: {selectedStudentProfile.company}</p>}
            <h3>Previous Internship Submissions</h3>
            {getStudentInternshipSubmissions(selectedStudentProfile.id).length > 0 ? (
              <ul>
                {getStudentInternshipSubmissions(selectedStudentProfile.id).map((submission) => (
                  <li key={submission.id}>
                    Company: {submission.company}, Status: {submission.status}, Submitted: {submission.submissionDate}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No previous internship submissions found.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Students
