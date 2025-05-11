"use client"

import { useState } from "react"
import { Building, Clock, Search, X } from "lucide-react"

function Internships() {
  const [searchQuery, setSearchQuery] = useState("")
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
          <div className="internships-search">
            <div className="search-input">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by job title or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="internships-filters">
            <div className="filter-group">
              <label htmlFor="industry">Industry:</label>
              <select id="industry" value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
                {uniqueIndustries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="duration">Duration:</label>
              <select id="duration" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
                {uniqueDurations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="payStatus">Payment:</label>
              <select id="payStatus" value={selectedPayStatus} onChange={(e) => setSelectedPayStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
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
