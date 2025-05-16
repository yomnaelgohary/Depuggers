"use client"

import { useState } from "react"
// CheckCircle is still imported, but we won't render it for the filter options
import { Building, Clock, X, CheckCircle, MapPin, Users } from "lucide-react"

function Internships() {
  // ... (rest of your existing state and functions) ...

  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const [tempIndustry, setTempIndustry] = useState("All")
  const [tempDuration, setTempDuration] = useState("All")
  const [tempPayStatus, setTempPayStatus] = useState("All")

  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedPayStatus, setSelectedPayStatus] = useState("All")
  const [selectedInternship, setSelectedInternship] = useState(null)

  const [resetActive, setResetActive] = useState(false);

  const [tempLocation, setTempLocation] = useState("");
  const [tempSkill, setTempSkill] = useState("");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  // ... (companies and internships data) ...
  const companies = [
    { id: 1, name: "Dell Technologies", industry: "Technology" },
    { id: 2, name: "Vodafone", industry: "Telecommunications" },
    { id: 3, name: "Orange", industry: "Telecommunications" },
    { id: 4, name: "Microsoft", industry: "Technology" },
    { id: 5, name: "PwC", industry: "Professional Services" },
  ];

  // In internships.jsx

  // ... (other state and company definitions) ...

  const internships = [
    {
      id: 1,
      companyId: 1, // Dell Technologies
      jobTitle: "Backend Developer Intern",
      duration: "1 MONTH",
      isPaid: true,
      salary: "$89.10",
      hourlyRate: "$14.85/h",
      startDate: "May 09, 2025 - Jun 09, 2025",
      workHours: "9:00 - 17:00",
      workShift: "MORNING",
      hoursPerWeek: "20-30 hours/week",
      location: "N Teseen, New Cairo",
      description: "Work on backend systems and APIs for our enterprise applications, contributing to scalable solutions. This role involves collaborating with senior developers, participating in code reviews, and learning about microservices architecture.",
      skills: ["CODING SKILLS", "JAVA", "SPRING", "API DESIGN"],
      companyName: "Dell Technologies",
      applications: 32
    },
    {
      id: 2,
      companyId: 4, // Microsoft
      jobTitle: "UI/UX Design Intern",
      duration: "3 MONTHS",
      isPaid: false,
      startDate: "May 15, 2025 - Aug 15, 2025",
      hoursPerWeek: "15-25 hours/week",
      location: "Smart Village, Giza",
      description: "Gain valuable experience working with our design team on real-world projects. Focus on user research, wireframing, prototyping, and usability testing for new product features.",
      skills: ["JAVASCRIPT", "REACT", "FIGMA", "ADOBE XD", "USER RESEARCH"],
      companyName: "Microsoft",
      learningOpportunity: true,
      applications: 47
    },
    {
      id: 3,
      companyId: 2, // Vodafone
      jobTitle: "Network Engineering Intern",
      duration: "6 MONTHS",
      isPaid: true,
      salary: "$120.00",
      hourlyRate: "$20.00/h",
      startDate: "Jun 01, 2025 - Dec 01, 2025",
      workHours: "9:30 - 17:30",
      workShift: "FULL-DAY",
      hoursPerWeek: "Full-time (40 hours/week)",
      location: "Maadi Technology Park, Cairo",
      description: "Assist in the design, implementation, and maintenance of Vodafone's core network infrastructure. Troubleshoot network issues and learn about cutting-edge telecom technologies.",
      skills: ["CISCO", "TCP/IP", "NETWORKING", "PYTHON", "FIREWALLS"],
      companyName: "Vodafone",
      applications: 25
    },
    {
      id: 4,
      companyId: 3, // Orange
      jobTitle: "Digital Marketing Intern",
      duration: "2 MONTHS",
      isPaid: true,
      salary: "$75.50",
      hourlyRate: "$12.58/h",
      startDate: "Jul 01, 2025 - Aug 31, 2025",
      workHours: "10:00 - 18:00",
      workShift: "MORNING",
      hoursPerWeek: "25-35 hours/week",
      location: "Zamalek, Cairo",
      description: "Support the Orange digital marketing team in campaign execution, social media management, content creation, and performance analysis. A great opportunity to learn about digital strategy in a fast-paced environment.",
      skills: ["SEO", "SEM", "SOCIAL MEDIA", "CONTENT WRITING", "GOOGLE ANALYTICS"],
      companyName: "Orange",
      applications: 58
    },
    {
      id: 5,
      companyId: 5, // PwC
      jobTitle: "Consulting Intern - Deals Advisory",
      duration: "3 MONTHS",
      isPaid: false,
      startDate: "Sep 01, 2025 - Nov 30, 2025",
      hoursPerWeek: "10-20 hours/week",
      location: "New Cairo Financial Hub",
      description: "Gain exposure to financial due diligence, market analysis, and M&A processes. Assist senior consultants with research, data analysis, and presentation preparation for client engagements at a leading professional services firm.",
      skills: ["FINANCIAL ANALYSIS", "ANALYTICAL SKILLS", "EXCEL", "POWERPOINT"],
      companyName: "PwC",
      learningOpportunity: true,
      applications: 30
    },
    {
      id: 6,
      companyId: 1, // Dell Technologies (another one)
      jobTitle: "Software QA Intern",
      duration: "4 MONTHS",
      isPaid: true,
      salary: "$95.00",
      hourlyRate: "$15.83/h",
      startDate: "Aug 01, 2025 - Nov 30, 2025",
      workHours: "09:00 - 17:00",
      workShift: "MORNING",
      hoursPerWeek: "30 hours/week",
      location: "N Teseen, New Cairo",
      description: "Participate in software testing cycles for Dell's enterprise solutions. Responsibilities include writing test cases, executing manual and automated tests, and reporting bugs using JIRA.",
      skills: ["QA", "TESTING", "JIRA", "SELENIUM BASICS"],
      companyName: "Dell Technologies",
      applications: 18
    },
    {
      id: 7,
      companyId: 2, // Vodafone (another one)
      jobTitle: "HR Operations Intern",
      duration: "3 MONTHS",
      isPaid: true,
      salary: "$70.00",
      hourlyRate: "$11.67/h",
      startDate: "Jun 15, 2025 - Sep 15, 2025",
      workHours: "10:00 - 16:00",
      workShift: "MORNING",
      hoursPerWeek: "20 hours/week",
      location: "Smart Village, Giza",
      description: "Support the HR team with daily operations, including recruitment assistance, employee onboarding, and maintaining HR records. Learn about HR best practices in a large organization.",
      skills: ["HRIS", "COMMUNICATION", "MS OFFICE", "ORGANIZATION"],
      companyName: "Vodafone",
      applications: 41
    }
  ];

  // ... (rest of your component)


  const filteredInternships = internships.filter((internship) => {
    const company = companies.find((c) => c.id === internship.companyId);
    if (!company) return false;
    // Only filter if a filter is selected
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = internship.jobTitle.toLowerCase().includes(query);
      const matchesCompany = company.name.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCompany) return false;
    }
    if (selectedIndustry !== "All" && company.industry !== selectedIndustry) return false;
    if (selectedDuration !== "All" && internship.duration !== selectedDuration) return false;
    if (selectedPayStatus !== "All") {
      const isPaid = selectedPayStatus === "Paid";
      if (internship.isPaid !== isPaid) return false;
    }
    if (selectedLocation && internship.location !== selectedLocation) return false;
    if (selectedSkill && !internship.skills.includes(selectedSkill)) return false;
    return true;
  });

  const uniqueIndustries = ["All", ...new Set(companies.map((company) => company.industry))].sort()
  const uniqueDurations = ["All", ...new Set(internships.map((internship) => internship.duration))].sort()

  const handleInternshipClick = (internship) => setSelectedInternship(internship)
  const closeInternshipDetails = () => setSelectedInternship(null)

  const openFilterModal = () => {
    setTempIndustry(selectedIndustry)
    setTempDuration(selectedDuration)
    setTempPayStatus(selectedPayStatus)
    setTempLocation(selectedLocation)
    setTempSkill(selectedSkill)
    setShowFilters(true)
  }

  const closeFilterModal = () => {
    setShowFilters(false)
  }

  const applyFilters = () => {
    setSelectedIndustry(tempIndustry)
    setSelectedDuration(tempDuration)
    setSelectedPayStatus(tempPayStatus)
    setSelectedLocation(tempLocation)
    setSelectedSkill(tempSkill)
    setShowFilters(false)
  }

  const resetFilters = () => {
    setTempIndustry("All")
    setTempDuration("All")
    setTempPayStatus("All")
    setTempLocation("")
    setTempSkill("")
    setSelectedIndustry("All")
    setSelectedDuration("All")
    setSelectedPayStatus("All")
    setSelectedLocation("")
    setSelectedSkill("")
    setShowFilters(false)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (selectedIndustry !== "All") count++
    if (selectedDuration !== "All") count++
    if (selectedPayStatus !== "All") count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  // ... (InternshipCard component remains the same) ...
  function InternshipCard({ internship, onClick }) {
    return (
      <div className="internship-display-card" onClick={onClick}>
        <div className="internship-display-card-left">
          {(internship.salary || internship.hourlyRate) && (
            <>
              <div className="price-info">
                {internship.salary && <div className="salary-total">{internship.salary}</div>}
                {internship.hourlyRate && <div className="hourly-rate">{internship.hourlyRate}</div>}
              </div>
              <div className="price-separator-line"></div>
            </>
          )}
        </div>
  
        <div className="internship-display-card-center">
          <div className="company-name-list">{internship.companyName}</div>
          <h3 className="job-title-list">{internship.jobTitle}</h3>
          {internship.learningOpportunity && (
            <span className="learning-opportunity-badge-list">LEARNING OPPORTUNITY</span>
          )}
          <div className="skills-required-list">
            <span>REQUIRES:</span>
            {internship.skills.map((skill, index) => (
              <span key={index} className="skill-tag-list-item">{skill}</span>
            ))}
          </div>
          <div className="detail-item-list location-list">
            <MapPin size={14} className="detail-icon" />
            <span>{internship.location}</span>
          </div>
          <div className="detail-item-list dates-list">{internship.startDate}</div>
          <div className="detail-item-list duration-list">{internship.duration}</div>
          <div className="detail-item-list hours-per-week-list">
            <Clock size={14} className="detail-icon" />
            <span>{internship.hoursPerWeek}</span>
          </div>
          <p className="description-preview-list">{internship.description}</p>
          {internship.applications !== undefined && (
             <div className="applications-count-list">
                <Users size={14} className="detail-icon" />
                <span>{internship.applications} applications</span>
            </div>
          )}
        </div>
  
        <div className={`internship-display-card-right ${internship.isPaid ? 'paid-bg' : 'unpaid-bg'}`}>
          {internship.isPaid && ( 
            <div className="work-time-info-list">
              {internship.workHours && <div className="work-time-list">{internship.workHours}</div>}
              {internship.workShift && <div className="work-shift-list">{internship.workShift}</div>}
            </div>
          )}
          <div className="payment-status-text-list">
            {internship.isPaid ? "PAID" : "UNPAID"}
          </div>
        </div>
      </div>
    );
  }


  return (
    <>
      {!selectedInternship ? (
        <div className="internships-section">
          <div className="internships-header">
            <h2>Internships</h2>
          </div>
          <div className="companies-filter-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <input
              type="text"
              className="minimal-search cs-search-input"
              placeholder="Search internship by title or company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '320px' }}
            />
            <button className="filters-button cs-filter-button" onClick={openFilterModal} style={{ marginLeft: 'auto' }}>
              <span className="hamburger-icon">≡</span>
              Filters
              {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
            </button>
          </div>
          <div className="internships-list">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  onClick={() => handleInternshipClick(internship)}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>No Internships Found</h3>
                <p>Try adjusting your search query or filters.</p>
              </div>
            )}
          </div>


          {showFilters && (
            <div className="cs-filter-modal-overlay" onClick={closeFilterModal}>
              <div className="cs-filter-modal" onClick={e => e.stopPropagation()}>
                <div className="cs-filter-modal-header">
                  <h2 style={{ fontWeight: 700, textTransform: 'capitalize' }}>Filters</h2>
                  <button className="cs-close-button" onClick={closeFilterModal}>
                    <X size={18} />
                  </button>
                </div>
                <div className="cs-filter-modal-content">
                  {/* PAYMENT */}
                  <div className="cs-filter-section">
                    <div style={{ fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', fontSize: 15 }}>PAYMENT</div>
                    <div className="cs-filter-options">
                      {["Paid", "Unpaid"].map((payStatus) => (
                        <div
                          key={payStatus}
                          className={`cs-filter-option${tempPayStatus === payStatus ? " cs-selected" : ""}`}
                          onClick={() => setTempPayStatus(payStatus)}
                        >
                          {payStatus}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* DURATION */}
                  <div className="cs-filter-section">
                    <div style={{ fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', fontSize: 15 }}>DURATION</div>
                    <div className="cs-filter-options" style={{ flexWrap: 'wrap' }}>
                      {uniqueDurations.filter(d => d !== 'All').map((duration) => (
                        <div
                          key={duration}
                          className={`cs-filter-option${tempDuration === duration ? " cs-selected" : ""}`}
                          onClick={() => setTempDuration(duration)}
                        >
                          {duration}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* LOCATION */}
                  <div className="cs-filter-section">
                    <div style={{ fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', fontSize: 15 }}>LOCATION</div>
                    <div className="cs-filter-options" style={{ flexWrap: 'wrap' }}>
                      {[...new Set(internships.map(i => i.location))].map((location) => (
                        <div
                          key={location}
                          className={`cs-filter-option${tempLocation === location ? " cs-selected" : ""}`}
                          onClick={() => setTempLocation(location)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* SKILLS */}
                  <div className="cs-filter-section">
                    <div style={{ fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', fontSize: 15 }}>SKILLS</div>
                    <div className="cs-filter-options" style={{ flexWrap: 'wrap' }}>
                      {[...new Set(internships.flatMap(i => i.skills))].map((skill) => (
                        <div
                          key={skill}
                          className={`cs-filter-option${tempSkill === skill ? " cs-selected" : ""}`}
                          onClick={() => setTempSkill(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="cs-filter-actions">
                  <button
                    className={`cs-reset-button${resetActive ? " cs-active" : ""}`}
                    onClick={resetFilters}
                    onMouseDown={() => setResetActive(true)}
                    onMouseUp={() => setResetActive(false)}
                    onMouseLeave={() => setResetActive(false)}
                  >
                    Reset
                  </button>
                  <button className="cs-apply-button" onClick={applyFilters}>
                    {`Show ${internships.filter((internship) => {
                      const company = companies.find((c) => c.id === internship.companyId);
                      if (!company) return false;
                      if (searchQuery) {
                        const query = searchQuery.toLowerCase();
                        const matchesTitle = internship.jobTitle.toLowerCase().includes(query);
                        const matchesCompany = company.name.toLowerCase().includes(query);
                        if (!matchesTitle && !matchesCompany) return false;
                      }
                      if (tempPayStatus && tempPayStatus !== 'All' && internship.isPaid !== (tempPayStatus === 'Paid')) return false;
                      if (tempDuration && tempDuration !== 'All' && internship.duration !== tempDuration) return false;
                      if (tempLocation && tempLocation !== '' && internship.location !== tempLocation) return false;
                      if (tempSkill && tempSkill !== '' && !internship.skills.includes(tempSkill)) return false;
                      return true;
                    }).length} Internships`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // ... (Internship Details Modal JSX remains the same) ...
        <div className="internship-details-modal-overlay" onClick={closeInternshipDetails}>
          <div className="internship-details-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="internship-details-modal-header">
              <h2>{selectedInternship.jobTitle}</h2>
              <button className="modal-close-button-enhanced" onClick={closeInternshipDetails}>
                <X size={24} />
              </button>
            </div>

            <div className="internship-details-modal-body">
              <div className="modal-company-section">
                <div className="modal-company-info">
                  <Building size={20} className="modal-icon" />
                  <span className="modal-company-name">{companies.find((c) => c.id === selectedInternship.companyId).name}</span>
                </div>
                <span className="modal-industry-tag">{companies.find((c) => c.id === selectedInternship.companyId).industry}</span>
              </div>

              {selectedInternship.learningOpportunity && (
                <div className="modal-learning-opportunity">
                  <CheckCircle size={16} className="modal-icon modal-icon-success" />
                  <span>This is a valuable learning opportunity.</span>
                </div>
              )}

              <div className="modal-key-info-grid">
                <div className="modal-info-item">
                  <Clock size={18} className="modal-icon" />
                  <div>
                    <p className="modal-info-label">Duration</p>
                    <p className="modal-info-value">{selectedInternship.duration}</p>
                  </div>
                </div>
                <div className="modal-info-item">
                  <CheckCircle size={18} className={`modal-icon ${selectedInternship.isPaid ? 'modal-icon-paid' : 'modal-icon-unpaid'}`} />
                  <div>
                    <p className="modal-info-label">Payment</p>
                    <p className={`modal-info-value ${selectedInternship.isPaid ? 'paid-text' : 'unpaid-text'}`}>
                      {selectedInternship.isPaid ? "Paid" : "Unpaid"}
                    </p>
                    {selectedInternship.isPaid && selectedInternship.salary && (
                      <p className="modal-salary-detail">{selectedInternship.salary} ({selectedInternship.hourlyRate})</p>
                    )}
                  </div>
                </div>
                <div className="modal-info-item">
                  <MapPin size={18} className="modal-icon" />
                  <div>
                    <p className="modal-info-label">Location</p>
                    <p className="modal-info-value">{selectedInternship.location}</p>
                  </div>
                </div>
                <div className="modal-info-item">
                  <Clock size={18} className="modal-icon" />
                  <div>
                    <p className="modal-info-label">Schedule</p>
                    <p className="modal-info-value">{selectedInternship.startDate}</p>
                    {selectedInternship.workHours && selectedInternship.isPaid && <p className="modal-info-detail">{selectedInternship.workHours} ({selectedInternship.workShift})</p>}
                    {selectedInternship.hoursPerWeek && <p className="modal-info-detail">{selectedInternship.hoursPerWeek}</p>}
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">Job Description</h3>
                <p className="modal-description-text">{selectedInternship.description}</p>
              </div>

              <div className="modal-section">
                <h3 className="modal-section-title">Required Skills</h3>
                <div className="modal-skills-list">
                  {selectedInternship.skills.map((skill, index) => (
                    <span key={index} className="modal-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {selectedInternship.applications !== undefined && (
                <div className="modal-section modal-applications-info">
                    <Users size={18} className="modal-icon"/>
                    <p className="modal-info-value">{selectedInternship.applications} people have applied for this opportunity.</p>
                </div>
              )}

            </div>
            <div className="internship-details-modal-footer">
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Internships