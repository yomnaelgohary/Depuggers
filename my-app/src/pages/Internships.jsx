"use client"

import { useState } from "react"
import { Building, Clock, X, CheckCircle } from "lucide-react"

function Internships() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Temporary states for the filter popup
  const [tempIndustry, setTempIndustry] = useState("All")
  const [tempDuration, setTempDuration] = useState("All")
  const [tempPayStatus, setTempPayStatus] = useState("All")

  // Actual filter states
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedPayStatus, setSelectedPayStatus] = useState("All")
  const [selectedInternship, setSelectedInternship] = useState(null)

  const companies = [
    { id: 1, name: "Dell Technologies", industry: "Technology" },
    { id: 2, name: "IBM", industry: "Technology" },
    { id: 3, name: "PwC", industry: "Consulting" },
    { id: 4, name: "Microsoft", industry: "Technology" },
    { id: 5, name: "Amazon", industry: "E-commerce" },
  ]

  const internships = [
    {
      id: 1,
      companyId: 1,
      jobTitle: "Software Engineering Intern",
      duration: "3 months",
      isPaid: true,
      salary: 1500,
      startDate: "June 1, 2024",
      description: "Join Dell Technologies as a Software Engineering Intern to work on cutting-edge projects.",
      skills: ["Java", "Python", "Git", "Agile"],
    },
    {
      id: 2,
      companyId: 2,
      jobTitle: "Data Science Intern",
      duration: "6 months",
      isPaid: true,
      salary: 2000,
      startDate: "July 15, 2024",
      description: "IBM is looking for a Data Science Intern to join our AI research team.",
      skills: ["Python", "Machine Learning", "Statistics", "SQL"],
    },
    {
      id: 3,
      companyId: 3,
      jobTitle: "Business Analyst Intern",
      duration: "3 months",
      isPaid: true,
      salary: 1200,
      startDate: "June 15, 2024",
      description: "PwC is seeking a Business Analyst Intern to support our consulting team.",
      skills: ["Excel", "Data Analysis", "Business Process Modeling", "Communication"],
    },
    {
      id: 4,
      companyId: 4,
      jobTitle: "UX Design Intern",
      duration: "4 months",
      isPaid: true,
      salary: 1800,
      startDate: "August 1, 2024",
      description: "Microsoft is looking for a UX Design Intern to join our product team.",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
    },
    {
      id: 5,
      companyId: 5,
      jobTitle: "Operations Intern",
      duration: "3 months",
      isPaid: false,
      startDate: "July 1, 2024",
      description: "Amazon is seeking an Operations Intern to support our logistics team.",
      skills: ["Supply Chain", "Logistics", "Process Improvement", "Analytics"],
    },
  ]

  const filteredInternships = internships.filter((internship) => {
    const company = companies.find((c) => c.id === internship.companyId)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = internship.jobTitle.toLowerCase().includes(query)
      const matchesCompany = company.name.toLowerCase().includes(query)
      if (!matchesTitle && !matchesCompany) return false
    }
    if (selectedIndustry !== "All" && company.industry !== selectedIndustry) return false
    if (selectedDuration !== "All" && internship.duration !== selectedDuration) return false
    if (selectedPayStatus !== "All") {
      const isPaid = selectedPayStatus === "Paid"
      if (internship.isPaid !== isPaid) return false
    }
    return true
  })

  const uniqueIndustries = ["All", ...new Set(companies.map((company) => company.industry))].sort()
  const uniqueDurations = ["All", ...new Set(internships.map((internship) => internship.duration))].sort()

  const handleInternshipClick = (internship) => setSelectedInternship(internship)
  const closeInternshipDetails = () => setSelectedInternship(null)

  const openFilterModal = () => {
    // Initialize temp states with current filter values
    setTempIndustry(selectedIndustry)
    setTempDuration(selectedDuration)
    setTempPayStatus(selectedPayStatus)
    setShowFilters(true)
  }

  const closeFilterModal = () => {
    setShowFilters(false)
  }

  const applyFilters = () => {
    setSelectedIndustry(tempIndustry)
    setSelectedDuration(tempDuration)
    setSelectedPayStatus(tempPayStatus)
    setShowFilters(false)
  }

  const resetFilters = () => {
    setTempIndustry("All")
    setTempDuration("All")
    setTempPayStatus("All")
    setSelectedIndustry("All")
    setSelectedDuration("All")
    setSelectedPayStatus("All")
    setShowFilters(false)
  }

  // Get active filter count for display
  const getActiveFilterCount = () => {
    let count = 0
    if (selectedIndustry !== "All") count++
    if (selectedDuration !== "All") count++
    if (selectedPayStatus !== "All") count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  function InternshipCard({ internship, company, onClick }) {
    return (
      <div className="internship-card" onClick={onClick}>
        <div className="internship-header">
          <h3>{internship.jobTitle}</h3>
          <span className={`payment-badge ${internship.isPaid ? "paid" : "unpaid"}`}>
            {internship.isPaid ? "Paid" : "Unpaid"}
          </span>
        </div>
        <div className="internship-company">
          <Building size={16} />
          <span>{company.name}</span>
        </div>
        <div className="internship-duration">
          <Clock size={16} />
          <span>{internship.duration}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {!selectedInternship ? (
        <div className="internships-section">
          <div className="internships-header">
            <h2>Available Internships</h2>
          </div>
          <div className="search-filter-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search internship"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="filters-button" onClick={openFilterModal}>
              <span className="hamburger-icon">≡</span> Filters
              {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
            </button>
          </div>
          <div className="internships-list">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => {
                const company = companies.find((c) => c.id === internship.companyId)
                return (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    company={company}
                    onClick={() => handleInternshipClick(internship)}
                  />
                )
              })
            ) : (
              <div className="no-results">No internships found matching your criteria.</div>
            )}
          </div>

          {/* Filter Modal */}
          {showFilters && (
            <div className="filter-popup-overlay" onClick={closeFilterModal}>
              <div className="filter-popup" onClick={(e) => e.stopPropagation()}>
                <div className="filter-popup-header">
                  <h3>Filter Internships</h3>
                  <button onClick={closeFilterModal}>
                    <X size={18} />
                  </button>
                </div>

                <div className="filter-popup-content">
                  {/* Industry Filter Section */}
                  <div className="filter-section">
                    <h4>Industry</h4>
                    <div className="filter-options">
                      {uniqueIndustries.map((industry) => (
                        <div
                          key={industry}
                          className={`filter-option ${tempIndustry === industry ? "selected" : ""}`}
                          onClick={() => setTempIndustry(industry)}
                        >
                          {industry}
                          {tempIndustry === industry && <CheckCircle size={16} className="check-icon" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter Section */}
                  <div className="filter-section">
                    <h4>Duration</h4>
                    <div className="filter-options">
                      {uniqueDurations.map((duration) => (
                        <div
                          key={duration}
                          className={`filter-option ${tempDuration === duration ? "selected" : ""}`}
                          onClick={() => setTempDuration(duration)}
                        >
                          {duration}
                          {tempDuration === duration && <CheckCircle size={16} className="check-icon" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Filter Section */}
                  <div className="filter-section">
                    <h4>Payment</h4>
                    <div className="filter-options">
                      {["All", "Paid", "Unpaid"].map((payStatus) => (
                        <div
                          key={payStatus}
                          className={`filter-option ${tempPayStatus === payStatus ? "selected" : ""}`}
                          onClick={() => setTempPayStatus(payStatus)}
                        >
                          {payStatus}
                          {tempPayStatus === payStatus && <CheckCircle size={16} className="check-icon" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="filter-popup-footer">
                  <button className="reset-button" onClick={resetFilters}>
                    Reset
                  </button>
                  <button className="apply-button" onClick={applyFilters}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="internship-details">
          <div className="internship-details-header">
            <h2>{selectedInternship.jobTitle}</h2>
            <button className="modal-close-button" onClick={closeInternshipDetails}>
              <X size={20} />
            </button>
          </div>
          <div className="internship-details-content">
            <div className="internship-company-info">
              <h3>
                <Building size={18} />
                {companies.find((c) => c.id === selectedInternship.companyId).name}
              </h3>
              <p className="industry-tag">{companies.find((c) => c.id === selectedInternship.companyId).industry}</p>
            </div>
            <div className="internship-info-grid">
              <div className="info-item">
                <Clock size={18} />
                <div>
                  <h4>Duration</h4>
                  <p>{selectedInternship.duration}</p>
                </div>
              </div>
              <div className="info-item">
                <div>
                  <h4>Payment</h4>
                  <p>{selectedInternship.isPaid ? "Paid" : "Unpaid"}</p>
                  {selectedInternship.isPaid && selectedInternship.salary && (
                    <p className="salary">${selectedInternship.salary}/month</p>
                  )}
                </div>
              </div>
              <div className="info-item">
                <div>
                  <h4>Start Date</h4>
                  <p>{selectedInternship.startDate || "Flexible"}</p>
                </div>
              </div>
            </div>
            <div className="internship-description">
              <h3>Job Description</h3>
              <p>{selectedInternship.description}</p>
            </div>
            <div className="internship-skills">
              <h3>Required Skills</h3>
              <div className="skills-list">
                {selectedInternship.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Internships
