"use client"

import { useState } from "react"
import "./company.css"

export default function Company() {
  const [activeTab, setActiveTab] = useState("post")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    isPaid: null, // null = both, true = paid only, false = unpaid only
    duration: null, // null = all durations, 1, 3, 6, etc. (months)
    location: null, // null = all locations
    skills: [],
  })

  // Available locations
  const locations = [
    "N Teseen, New Cairo",
    "Maadi, Cairo",
    "Smart Village, Giza",
    "Dokki, Giza",
    "Heliopolis, Cairo"
  ]

  // Sample job listings data with consistent duration format
  const jobListings = [
    {
      id: 1,
      title: "Backend Developer Intern",
      salary: "$89.10",
      hourlyRate: "$14.85/h",
      requirements: ["CODING SKILLS", "JAVA", "SPRING"],
      location: "N Teseen, New Cairo",
      startDate: "May 09, 2025",
      endDate: "Jun 09, 2025",
      duration: "1 MONTH",
      durationMonths: 1,
      description: "Work on backend systems and APIs for our enterprise applications.",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 2,
      title: "UI/UX Design Intern",
      requirements: ["JAVASCRIPT", "REACT", "FIGMA"],
      location: "N Teseen, New Cairo",
      startDate: "May 15, 2025",
      endDate: "Aug 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Gain valuable experience working with our development team on real-world projects.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 3,
      title: "DevOps Engineer Intern",
      salary: "$111.38",
      hourlyRate: "$14.85/h",
      requirements: ["CODING SKILLS", "DOCKER", "KUBERNETES"],
      location: "N Teseen, New Cairo",
      startDate: "May 09, 2025",
      endDate: "Nov 09, 2025",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Learn DevOps practices and help automate our deployment pipelines.",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 4,
      title: "Data Science Intern",
      requirements: ["PYTHON", "DATA SCIENCE", "MACHINE LEARNING"],
      location: "N Teseen, New Cairo",
      startDate: "Jun 01, 2025",
      endDate: "Sep 30, 2025",
      duration: "4 MONTHS",
      durationMonths: 4,
      description: "Work on cutting-edge data science projects and build your portfolio with real-world experience.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 5,
      title: "Mobile App Developer Intern",
      salary: "$95.25",
      hourlyRate: "$15.50/h",
      requirements: ["MOBILE DEV", "FLUTTER", "DART"],
      location: "N Teseen, New Cairo",
      startDate: "May 12, 2025",
      endDate: "Aug 12, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Develop mobile applications for iOS and Android platforms.",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 6,
      title: "Frontend Developer Intern",
      salary: "$92.40",
      hourlyRate: "$15.40/h",
      requirements: ["JAVASCRIPT", "REACT", "CSS"],
      location: "Maadi, Cairo",
      startDate: "Jun 15, 2025",
      endDate: "Dec 15, 2025",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Join our frontend team to build responsive and accessible user interfaces.",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 7,
      title: "Cybersecurity Intern",
      requirements: ["NETWORK SECURITY", "PENETRATION TESTING"],
      location: "Smart Village, Giza",
      startDate: "Jul 01, 2025",
      endDate: "Jul 01, 2026",
      duration: "12 MONTHS",
      durationMonths: 12,
      description: "Learn about cybersecurity practices and help secure our infrastructure.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 8,
      title: "Cloud Engineering Intern",
      salary: "$105.60",
      hourlyRate: "$16.50/h",
      requirements: ["AWS", "AZURE", "CLOUD COMPUTING"],
      location: "N Teseen, New Cairo",
      startDate: "Aug 01, 2025",
      endDate: "Feb 01, 2026",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Work with our cloud team to design and implement scalable cloud solutions.",
      isPaid: true,
      isLearningOpportunity: true,
    },
    {
      id: 9,
      title: "QA Testing Intern",
      requirements: ["TESTING", "SELENIUM", "QUALITY ASSURANCE"],
      location: "Dokki, Giza",
      startDate: "Jun 15, 2025",
      endDate: "Aug 15, 2025",
      duration: "2 MONTHS",
      durationMonths: 2,
      description: "Learn software testing methodologies and help ensure product quality.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 10,
      title: "Product Management Intern",
      salary: "$88.00",
      hourlyRate: "$14.67/h",
      requirements: ["PRODUCT MANAGEMENT", "AGILE"],
      location: "N Teseen, New Cairo",
      startDate: "Jul 01, 2025",
      endDate: "Oct 01, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Gain hands-on experience in product management and agile methodologies.",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 11,
      title: "Blockchain Developer Intern",
      requirements: ["BLOCKCHAIN", "SOLIDITY", "WEB3"],
      location: "Heliopolis, Cairo",
      startDate: "Sep 01, 2025",
      endDate: "Mar 01, 2026",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Work on blockchain projects and learn about decentralized applications.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 12,
      title: "AI Research Intern",
      salary: "$120.00",
      hourlyRate: "$20.00/h",
      requirements: ["ARTIFICIAL INTELLIGENCE", "PYTHON", "DEEP LEARNING"],
      location: "Smart Village, Giza",
      startDate: "Aug 15, 2025",
      endDate: "May 15, 2026",
      duration: "9 MONTHS",
      durationMonths: 9,
      description: "Participate in cutting-edge AI research and development projects.",
      isPaid: true,
      isLearningOpportunity: true,
    },
    {
      id: 13,
      title: "Game Development Intern",
      requirements: ["UNITY", "C#", "GAME DESIGN"],
      location: "Maadi, Cairo",
      startDate: "Jul 15, 2025",
      endDate: "Oct 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Learn game development and contribute to our upcoming mobile game.",
      isPaid: false,
      isLearningOpportunity: true,
    },
    {
      id: 14,
      title: "Technical Writer Intern",
      salary: "$85.20",
      hourlyRate: "$14.20/h",
      requirements: ["TECHNICAL WRITING", "DOCUMENTATION"],
      location: "N Teseen, New Cairo",
      startDate: "Jun 01, 2025",
      endDate: "Jul 01, 2025",
      duration: "1 MONTH",
      durationMonths: 1,
      description: "Create technical documentation for our software products and APIs.",
      isPaid: true,
      isLearningOpportunity: false,
    },
    {
      id: 15,
      title: "Database Administrator Intern",
      requirements: ["SQL", "DATABASE MANAGEMENT", "MYSQL"],
      location: "N Teseen, New Cairo",
      startDate: "Sep 15, 2025",
      endDate: "Dec 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Learn database administration and help optimize our database systems.",
      isPaid: false,
      isLearningOpportunity: true,
    },
  ]

  // Available duration options for filtering
  const durationOptions = [
    { value: 1, label: "1 Month" },
    { value: 2, label: "2 Months" },
    { value: 3, label: "3 Months" },
    { value: 4, label: "4 Months" },
    { value: 6, label: "6 Months" },
    { value: 9, label: "9 Months" },
    { value: 12, label: "12 Months" },
  ]

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value,
    })
  }

  const handleSkillToggle = (skill) => {
    setFilters({
      ...filters,
      skills: filters.skills.includes(skill) ? filters.skills.filter((s) => s !== skill) : [...filters.skills, skill],
    })
  }

  const resetFilters = () => {
    setFilters({
      isPaid: null,
      duration: null,
      location: null,
      skills: [],
    })
  }

  const hasActiveFilters = () => {
    return filters.isPaid !== null || filters.duration !== null || filters.location !== null || filters.skills.length > 0
  }

  const applyFilters = () => {
    setShowFilters(false)
  }

  const filteredJobs = jobListings.filter((job) => {
    // Filter by search query
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by payment status
    if (filters.isPaid !== null && job.isPaid !== filters.isPaid) {
      return false
    }

    // Filter by duration
    if (filters.duration !== null && job.durationMonths !== filters.duration) {
      return false
    }

    // Filter by location
    if (filters.location !== null && job.location !== filters.location) {
      return false
    }

    // Filter by skills
    if (filters.skills.length > 0) {
      const hasRequiredSkill = job.requirements.some((req) =>
        filters.skills.some((skill) => req.toLowerCase().includes(skill.toLowerCase())),
      )
      if (!hasRequiredSkill) {
        return false
      }
    }

    return true
  })

  return (
    <div className="company-container">
      <header className="company-header">
        <div className="logo">Dell technologies</div>
        <div></div>
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
              <button className="filter-button" onClick={toggleFilters}>
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

            {showFilters && (
              <div className="filter-modal-overlay">
                <div className="filter-modal">
                  <div className="filter-modal-header">
                    <h2>Filters</h2>
                    <button className="close-button" onClick={toggleFilters}>
                      ✕
                    </button>
                  </div>

                  <div className="filter-section">
                    <h3>DURATION</h3>
                    <div className="filter-options">
                      {durationOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`filter-option ${filters.duration === option.value ? "selected" : ""}`}
                          onClick={() => handleFilterChange("duration", option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>LOCATION</h3>
                    <div className="filter-options">
                      {locations.map((location, index) => (
                        <button
                          key={index}
                          className={`filter-option ${filters.location === location ? "selected" : ""}`}
                          onClick={() => handleFilterChange("location", location)}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>PAYMENT</h3>
                    <div className="filter-options">
                      <button
                        className={`filter-option ${filters.isPaid === true ? "selected" : ""}`}
                        onClick={() => handleFilterChange("isPaid", true)}
                      >
                        Paid
                      </button>
                      <button
                        className={`filter-option ${filters.isPaid === false ? "selected" : ""}`}
                        onClick={() => handleFilterChange("isPaid", false)}
                      >
                        Unpaid
                      </button>
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>SKILLS</h3>
                    <div className="filter-options">
                      {Array.from(new Set(jobListings.flatMap((job) => job.requirements))).map((skill, index) => (
                        <button
                          key={index}
                          className={`filter-option ${filters.skills.includes(skill) ? "selected" : ""}`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-actions">
                    <button className={`reset-button ${hasActiveFilters() ? "active" : ""}`} onClick={resetFilters}>
                      Reset
                    </button>
                    <button className="apply-button" onClick={applyFilters}>
                      Show {filteredJobs.length} jobs
                    </button>
                  </div>
                </div>
              </div>
            )}

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

                      <div className="job-duration">
                        <span className="calendar-icon">📅</span>
                        <div>
                          <div className="date-range">
                            {job.startDate} - {job.endDate}
                          </div>
                          <div className="duration">{job.duration}</div>
                        </div>
                      </div>

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
            <h2>Create Post</h2>
            <div className="create-post-breadcrumb">Post / Create Post</div>

            <form className="create-post-form">
              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Internship Title</label>
                    <input type="text" placeholder="Enter title" className="form-input" />
                    <div className="form-help-text">Enter the title of the internship.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Duration (in months)</label>
                    <input type="number" placeholder="0" className="form-input" />
                    <div className="form-help-text">Enter the duration of the internship in months.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Salary (in USD)</label>
                    <input type="number" placeholder="0" className="form-input" />
                    <div className="form-help-text">Enter the salary of the internship in USD.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Location</label>
                    <select className="form-select">
                      <option value="">Select location</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                    <div className="form-help-text">Select the location of the internship.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Payment Type</label>
                    <select className="form-select">
                      <option>Paid</option>
                      <option>Unpaid</option>
                    </select>
                    <div className="form-help-text">Select whether the internship is paid or unpaid.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Required Skills</label>
                    <input type="text" placeholder="Enter skills (comma separated)" className="form-input" />
                    <div className="form-help-text">Enter the required skills, separated by commas.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column full-width">
                  <div className="form-group">
                    <label>Description (min. 200 characters)</label>
                    <textarea placeholder="Enter description" className="form-textarea"></textarea>
                    <div className="form-help-text">Provide a detailed description of the internship.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column full-width">
                  <div className="form-group">
                    <label>Internship Pictures</label>
                    <div className="file-upload">
                      <button type="button" className="file-upload-button">Choose Files</button>
                      <span className="file-upload-text">No file chosen</span>
                    </div>
                    <div className="form-help-text">Upload pictures related to the internship.</div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="create-post-button">
                  <span className="plus-icon">+</span> Create Post
                </button>
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
