"use client"

import { useState } from "react"
import "./company.css"

export default function Company() {
  const [activeTab, setActiveTab] = useState("post")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample job listings data
  const jobListings = [
    {
      id: 1,
      title: "Backend Developer Intern",
      salary: "€89.10",
      hourlyRate: "€14.85/h",
      requirements: ["CODING SKILLS"],
      location: "N Teseen, New Cairo 1",
      date: "Friday 09 May",
      time: "08:00 - 14:00",
      timeOfDay: "MORNING",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 2,
      title: "UI/UX Design Intern",
      requirements: ["JAVASCRIPT", "REACT"],
      location: "N Teseen, New Cairo 1",
      startDate: "May 15",
      endDate: "Aug 15, 2025",
      duration: "3 MONTHS",
      description: "Gain valuable experience working with our development team on real-world projects.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 3,
      title: "DevOps Engineer Intern",
      salary: "€111.38",
      hourlyRate: "€14.85/h",
      requirements: ["CODING SKILLS"],
      location: "N Teseen, New Cairo 1",
      date: "Friday 09 May",
      time: "15:00 - 22:00",
      timeOfDay: "EVENING",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 4,
      title: "Data Science Intern",
      requirements: ["PYTHON", "DATA SCIENCE"],
      location: "N Teseen, New Cairo 1",
      startDate: "Jun 1",
      endDate: "Sep 30, 2025",
      duration: "4 MONTHS",
      description: "Work on cutting-edge data science projects and build your portfolio with real-world experience.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 5,
      title: "Mobile App Developer Intern",
      salary: "€95.25",
      hourlyRate: "€15.50/h",
      requirements: ["MOBILE DEV", "FLUTTER"],
      location: "N Teseen, New Cairo 1",
      date: "Monday 12 May",
      time: "09:00 - 17:00",
      timeOfDay: "FULL DAY",
      isPaid: true,
      isLearningOpportunity: false,
    },
  ]

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Filter job listings based on search query
  const filteredJobs = jobListings.filter((job) => job.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="company-container">
      <header className="company-header">
        <div className="logo">Dell technologies</div>
        <nav className="main-nav">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Tasks</a>
            </li>
            <li>
              <a href="#">My Jobs</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="content-container">
        <div className="tabs">
          <button className={`tab ${activeTab === "post" ? "active" : ""}`} onClick={() => setActiveTab("post")}>
            Post
          </button>
          <button className={`tab ${activeTab === "create" ? "active" : ""}`} onClick={() => setActiveTab("create")}>
            Create post
          </button>
        </div>

        {activeTab === "post" && (
          <div className="post-section">
            <div className="filters">
              <button className="filter-button">
                <span className="filter-icon">≡</span> Filters
              </button>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search job title"
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <span className="search-icon">🔍</span>
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery("")}>
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="search-results">
              {searchQuery && (
                <div className="results-count">
                  Found {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} matching "{searchQuery}"
                </div>
              )}
            </div>

            <div className="job-listings">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div className="job-card" key={job.id}>
                    {job.salary && (
                      <div className="job-salary">
                        <div className="amount">{job.salary}</div>
                        <div className="hourly-rate">{job.hourlyRate}</div>
                      </div>
                    )}

                    <div className="job-details">
                      {job.isLearningOpportunity && <div className="learning-opportunity">LEARNING OPPORTUNITY</div>}

                      <h3 className="job-title">
                        {searchQuery ? <HighlightText text={job.title} highlight={searchQuery} /> : job.title}
                      </h3>

                      <div className="job-requirements">
                        <div className="requirement-label">REQUIRES:</div>
                        <div className="requirement-tags">
                          {job.requirements.map((req, index) => (
                            <span className="requirement-tag" key={index}>
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="job-location">
                        <span className="location-icon">◎</span>
                        <span>{job.location}</span>
                      </div>

                      {job.startDate ? (
                        <div className="job-duration">
                          <span className="calendar-icon">📅</span>
                          <div>
                            <div className="date-range">
                              {job.startDate} - {job.endDate}
                            </div>
                            <div className="duration">{job.duration}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="job-time">
                          <span className="calendar-icon">📅</span>
                          <div>
                            <div className="date">{job.date}</div>
                            <div className="today">TODAY</div>
                          </div>
                          <div className="time-slot">
                            <div>{job.time}</div>
                            <div className="time-of-day">{job.timeOfDay}</div>
                          </div>
                        </div>
                      )}

                      {job.description && <div className="job-description">{job.description}</div>}
                    </div>

                    <div className={`job-status ${job.isPaid ? "paid" : "unpaid"}`}>
                      {job.isPaid ? "PAID" : "UNPAID"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No jobs found matching "{searchQuery}"</p>
                  <button className="reset-search" onClick={() => setSearchQuery("")}>
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="create-post-section">
            <h2>Create New Job Post</h2>

            <form className="job-form">
              <div className="form-group">
                <label>Internship Title</label>
                <input type="text" placeholder="Enter Title" className="form-input" />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input type="text" placeholder="Enter Duration" className="form-input" />
              </div>

              <div className="form-group">
                <label>Paid/Unpaid</label>
                <select className="form-select">
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>

              <div className="form-group">
                <label>Expected Salary</label>
                <input type="text" placeholder="Enter Salary" className="form-input" />
              </div>

              <div className="form-group">
                <label>Required Skills</label>
                <input type="text" placeholder="Enter Skills" className="form-input" />
              </div>

              <div className="form-group">
                <label>Job Description</label>
                <textarea placeholder="Enter Description" className="form-textarea"></textarea>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper component to highlight search text
function HighlightText({ text, highlight }) {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="highlight">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  )
}
