"use client"

import { useState, useEffect } from "react"
import "./Faculty.css"

function Faculty() {
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

  // Extract unique majors and statuses
  const uniqueMajors = ["All Majors", ...new Set(students.map((student) => student.major))]
  const uniqueStatuses = ["All Statuses", ...new Set(students.map((student) => student.status))]

  const [selectedMajor, setSelectedMajor] = useState("All Majors")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [filteredStudents, setFilteredStudents] = useState(students)

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

  return (
    <div className="faculty-container">
      <header className="faculty-header">
        <div className="header-title">
          <span className="back-icon">←</span>
          <h1>Internship Management</h1>
        </div>
        <div className="profile-image">
          <img src="/placeholder.svg?height=40&width=40" alt="Profile" />
        </div>
      </header>

      <main className="faculty-main">
        <h2 className="greeting">Hello Dr. Yasmine</h2>

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
                      <button className="view-button">View</button>
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
      </main>
    </div>
  )
}

export default Faculty
