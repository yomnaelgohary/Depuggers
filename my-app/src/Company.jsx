"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Company.css"

function Company() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  // Sample internship data
  const internships = [
    {
      id: 1,
      title: "Web Developer",
      startDate: "Immediately",
      duration: "3 Months",
      stipend: "Unpaid",
      lastDateToApply: "28-02-2024",
      company: "TBNSOFTWARESOLUTIONS & CONSULTANCY",
      location: "Work From Home",
    },
    {
      id: 2,
      title: "Hotel - Sales",
      startDate: "20-11-2023",
      duration: "6 Months",
      stipend: "",
      lastDateToApply: "18-11-2023",
      company: "PRASADS SP ENTERTAINMENT LLP",
      location: "Vijayawada",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      startDate: "30-11-2023",
      duration: "2 Months",
      stipend: "Unpaid",
      lastDateToApply: "29-11-2023",
      company: "TRK ADVISORS",
      location: "Work From Home",
    },
    {
      id: 4,
      title: "Marketing",
      startDate: "01-11-2023",
      duration: "6 Months",
      stipend: "",
      lastDateToApply: "31-10-2023",
      company: "ARRIBA LABS",
      location: "Pune",
    },
    {
      id: 5,
      title: "Sales / Business Development",
      startDate: "15-11-2023",
      duration: "6 Months",
      stipend: "",
      lastDateToApply: "14-11-2023",
      company: "NoBroker",
      location: "Bangalore",
    },
  ]

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    paidStatus: "",
    salary: "",
    skills: "",
    description: "",
  })

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({
      title: "",
      duration: "",
      paidStatus: "",
      salary: "",
      skills: "",
      description: "",
    })
  }

  // Filter internships based on search query
  const filteredInternships = internships.filter((internship) =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="company-container">
      <header className="company-header">
        <div className="header-logo">
          <div className="diamond-icon"></div>
          <h1>Company Portal</h1>
        </div>
        <div className="header-actions">
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
          </div>
          <div className="notification-icon"></div>
          <div className="profile-icon"></div>
        </div>
      </header>

      <main className="company-main">
        <div className="job-creation-section">
          <h2 className="section-title">Create New Job Post</h2>

          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-group">
              <label htmlFor="title">Internship Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                placeholder="Enter Duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="paidStatus">Paid/Unpaid</label>
              <input
                type="text"
                id="paidStatus"
                name="paidStatus"
                placeholder="Paid/Unpaid"
                value={formData.paidStatus}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salary">Expected Salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                placeholder="Enter Salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Required Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                placeholder="Enter Skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Job Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                rows={4}
              ></textarea>
            </div>

            <button type="submit" className="post-button">
              Post
            </button>
          </form>
        </div>

        <div className="job-listings-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Keywords UI/UX Designer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="keyword-search"
            />
          </div>

          <div className="results-count">Showing 1 to 10 of {filteredInternships.length} Internships</div>

          <div className="internship-listings">
            {filteredInternships.map((internship) => (
              <div key={internship.id} className="internship-card">
                <div className="internship-icon">
                  <div className="briefcase-icon"></div>
                </div>
                <div className="internship-details">
                  <h3 className="internship-title">{internship.title}</h3>
                  <div className="internship-info">
                    Start Date: {internship.startDate} · Duration: {internship.duration} · Stipend:{" "}
                    {internship.stipend || "Not specified"} · Last Date To Apply: {internship.lastDateToApply}
                  </div>
                  <div className="company-info">
                    @{internship.company} · {internship.location}
                  </div>
                </div>
                <div className="view-details">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button className="pagination-button prev-button">&lt;</button>
            <button className="pagination-button active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>
            <button className="pagination-button">Next</button>
            <button className="pagination-button">Last</button>
            <button className="pagination-button next-button">&gt;</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Company
