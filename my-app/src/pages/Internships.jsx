"use client"

import { useState } from "react"
import { Building, Clock, X, MapPin, Users } from "lucide-react" // Removed Eye, CheckCircle (from modal)

function Internships() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const [tempIndustry, setTempIndustry] = useState("All")
  const [tempDuration, setTempDuration] = useState("All")
  const [tempPayStatus, setTempPayStatus] = useState("All")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedPayStatus, setSelectedPayStatus] = useState("All")
  const [selectedInternship, setSelectedInternship] = useState(null) // Kept for potential future use or non-modal actions
  const [resetActive, setResetActive] = useState(false);
  const [tempLocation, setTempLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const companies = [
    { id: 1, name: "Dell Technologies", industry: "Technology" },
    { id: 2, name: "Vodafone", industry: "Telecommunications" },
    { id: 3, name: "Orange", industry: "Telecommunications" },
    { id: 4, name: "Microsoft", industry: "Technology" },
    { id: 5, name: "PwC", industry: "Professional Services" },
  ];

  const internships = [
    // Dell Technologies
    {
      id: 1,
      companyId: 1,
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
      description: "Work on backend systems and APIs for enterprise applications, focusing on scalability and performance. Involves Java, Spring Boot, and microservices.",
      skills: ["CODING SKILLS", "JAVA", "SPRING", "API DESIGN", "SQL"],
      companyName: "Dell Technologies",
      applications: 32
    },
    {
      id: 6,
      companyId: 1,
      jobTitle: "Cybersecurity Analyst Intern",
      duration: "3 MONTHS",
      isPaid: true,
      salary: "$105.00",
      hourlyRate: "$17.50/h",
      startDate: "Jul 01, 2025 - Sep 30, 2025",
      workHours: "9:00 - 17:00",
      workShift: "MORNING",
      hoursPerWeek: "Full-time (35-40 hours/week)",
      location: "Smart Village, Giza",
      description: "Assist in monitoring security alerts, investigating incidents, and contributing to vulnerability assessments. Learn about SIEM tools and threat intelligence.",
      skills: ["SECURITY ANALYSIS", "NETWORKING", "LINUX", "PYTHON SCRIPTING"],
      companyName: "Dell Technologies",
      applications: 22,
      learningOpportunity: true
    },
    {
      id: 11,
      companyId: 1,
      jobTitle: "Cloud Support Engineer Intern",
      duration: "6 MONTHS",
      isPaid: true,
      salary: "$110.00",
      hourlyRate: "$18.33/h",
      startDate: "Aug 15, 2025 - Feb 15, 2026",
      workHours: "Flexible Shifts",
      workShift: "ROTATING",
      hoursPerWeek: "25-30 hours/week",
      location: "N Teseen, New Cairo",
      description: "Provide technical support for Dell's cloud services customers, troubleshoot issues, and document solutions. Gain experience with various cloud platforms.",
      skills: ["AWS", "AZURE", "TROUBLESHOOTING", "CUSTOMER SERVICE", "VIRTUALIZATION"],
      companyName: "Dell Technologies",
      applications: 15
    },
    // Microsoft
    {
      id: 2,
      companyId: 4,
      jobTitle: "UI/UX Design Intern",
      duration: "3 MONTHS",
      isPaid: false,
      startDate: "May 15, 2025 - Aug 15, 2025",
      workHours: "10:00 - 16:00", // This won't show for unpaid in the right column based on current logic
      workShift: "FLEXIBLE",     // This won't show
      hoursPerWeek: "15-25 hours/week",
      location: "Smart Village, Giza",
      description: "Gain valuable experience with our design team on real-world projects. Focus on user research, wireframing, prototyping, and usability testing.",
      skills: ["JAVASCRIPT", "REACT", "FIGMA", "ADOBE XD", "USER RESEARCH"],
      companyName: "Microsoft",
      learningOpportunity: true,
      applications: 47
    },
    {
      id: 12,
      companyId: 4,
      jobTitle: "Software Engineer Intern (AI/ML)",
      duration: "4 MONTHS",
      isPaid: true,
      salary: "$130.00",
      hourlyRate: "$21.67/h",
      startDate: "Sep 01, 2025 - Dec 31, 2025",
      workHours: "9:30 - 18:00",
      workShift: "MORNING",
      hoursPerWeek: "Full-time (40 hours/week)",
      location: "Maadi Technology Park, Cairo",
      description: "Work on cutting-edge AI and Machine Learning projects. Develop and train models, process large datasets, and contribute to innovative solutions.",
      skills: ["PYTHON", "TENSORFLOW", "PYTORCH", "MACHINE LEARNING", "DATA ANALYSIS"],
      companyName: "Microsoft",
      applications: 55,
      learningOpportunity: true
    },
    {
      id: 13,
      companyId: 4,
      jobTitle: "Product Marketing Intern",
      duration: "2 MONTHS",
      isPaid: true,
      salary: "$90.00",
      hourlyRate: "$15.00/h",
      startDate: "Jun 10, 2025 - Aug 10, 2025",
      workHours: "10:00 - 17:00",
      workShift: "MORNING",
      hoursPerWeek: "20-25 hours/week",
      location: "Smart Village, Giza",
      description: "Support product marketing initiatives for a key Microsoft product. Assist with market research, content creation, and campaign analysis.",
      skills: ["MARKET RESEARCH", "CONTENT MARKETING", "ANALYTICS", "COMMUNICATION"],
      companyName: "Microsoft",
      applications: 30
    },
    // PwC
    {
      id: 5,
      companyId: 5,
      jobTitle: "Consulting Intern - Deals Advisory",
      duration: "3 MONTHS",
      isPaid: false,
      startDate: "Sep 01, 2025 - Nov 30, 2025",
      // workHours: "Flexible", // Not shown for unpaid
      // workShift: "PART-TIME", // Not shown for unpaid
      hoursPerWeek: "10-20 hours/week",
      location: "New Cairo Financial Hub",
      description: "Gain exposure to financial due diligence, market analysis, and M&A processes. Assist senior consultants with research and presentation preparation.",
      skills: ["FINANCIAL ANALYSIS", "ANALYTICAL SKILLS", "EXCEL", "POWERPOINT"],
      companyName: "PwC",
      learningOpportunity: true,
      applications: 30
    },
    {
      id: 14,
      companyId: 5,
      jobTitle: "Audit & Assurance Intern",
      duration: "2 MONTHS",
      isPaid: true,
      salary: "$85.00",
      hourlyRate: "$14.17/h",
      startDate: "Jul 15, 2025 - Sep 15, 2025",
      workHours: "9:00 - 17:30",
      workShift: "MORNING",
      hoursPerWeek: "Full-time (38 hours/week)",
      location: "Zamalek, Cairo",
      description: "Support audit teams in performing financial statement audits for various clients. Learn about audit methodologies and regulatory compliance.",
      skills: ["ACCOUNTING", "AUDITING", "IFRS", "ATTENTION TO DETAIL"],
      companyName: "PwC",
      applications: 28
    },
    {
      id: 15,
      companyId: 5,
      jobTitle: "Technology Consulting Intern",
      duration: "4 MONTHS",
      isPaid: true,
      salary: "$115.00",
      hourlyRate: "$19.17/h",
      startDate: "Oct 01, 2025 - Jan 31, 2026",
      workHours: "9:00 - 18:00",
      workShift: "MORNING",
      hoursPerWeek: "30-35 hours/week",
      location: "New Cairo Financial Hub",
      description: "Assist in advising clients on technology strategy, digital transformation, and IT infrastructure improvements. Participate in client workshops and solution design.",
      skills: ["IT STRATEGY", "PROJECT MANAGEMENT", "CLOUD COMPUTING", "DATA ANALYTICS"],
      companyName: "PwC",
      applications: 19,
      learningOpportunity: true
    },
    // Vodafone
    {
      id: 3,
      companyId: 2,
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
      description: "Assist in the design, implementation, and maintenance of Vodafone's core network infrastructure. Troubleshoot network issues and learn about telecom tech.",
      skills: ["CISCO", "TCP/IP", "NETWORKING", "PYTHON", "FIREWALLS"],
      companyName: "Vodafone",
      applications: 25
    },
    {
      id: 7,
      companyId: 2,
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
      description: "Support the HR team with daily operations, including recruitment assistance, employee onboarding, and maintaining HR records. Learn HR best practices.",
      skills: ["HRIS", "COMMUNICATION", "MS OFFICE", "ORGANIZATION"],
      companyName: "Vodafone",
      applications: 41
    },
    {
      id: 16,
      companyId: 2,
      jobTitle: "IoT Solutions Developer Intern",
      duration: "4 MONTHS",
      isPaid: true,
      salary: "$110.00",
      hourlyRate: "$18.33/h",
      startDate: "Jul 01, 2025 - Oct 31, 2025",
      workHours: "9:00 - 17:00",
      workShift: "MORNING",
      hoursPerWeek: "30-35 hours/week",
      location: "Maadi Technology Park, Cairo",
      description: "Contribute to the development of Internet of Things (IoT) solutions. Work with sensors, connectivity platforms, and data visualization tools.",
      skills: ["IOT", "EMBEDDED SYSTEMS", "MQTT", "JAVASCRIPT", "API INTEGRATION"],
      companyName: "Vodafone",
      applications: 18,
      learningOpportunity: true
    },
    // Orange
    {
      id: 4,
      companyId: 3,
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
      description: "Support the Orange digital marketing team in campaign execution, social media management, content creation, and performance analysis.",
      skills: ["SEO", "SEM", "SOCIAL MEDIA", "CONTENT WRITING", "GOOGLE ANALYTICS"],
      companyName: "Orange",
      applications: 58
    },
    {
      id: 17,
      companyId: 3,
      jobTitle: "Customer Experience Intern",
      duration: "3 MONTHS",
      isPaid: true,
      salary: "$80.00",
      hourlyRate: "$13.33/h",
      startDate: "Aug 01, 2025 - Oct 31, 2025",
      workHours: "9:00 - 17:00",
      workShift: "MORNING",
      hoursPerWeek: "Full-time (38 hours/week)",
      location: "Downtown Cairo",
      description: "Analyze customer feedback, identify pain points, and propose improvements to the customer journey. Work with CRM tools and survey data.",
      skills: ["CUSTOMER SERVICE", "DATA ANALYSIS", "CRM", "COMMUNICATION", "PROBLEM SOLVING"],
      companyName: "Orange",
      applications: 33
    },
     {
      id: 18,
      companyId: 3,
      jobTitle: "Fiber Optic Network Intern",
      duration: "6 MONTHS",
      isPaid: true,
      salary: "$115.00",
      hourlyRate: "$19.17/h",
      startDate: "Sep 10, 2025 - Mar 10, 2026",
      workHours: "8:30 - 17:00",
      workShift: "MORNING",
      hoursPerWeek: "Full-time (40 hours/week)",
      location: "6th of October City",
      description: "Assist with the planning, deployment, and maintenance of fiber optic networks. Gain hands-on experience with splicing, testing, and network documentation.",
      skills: ["FIBER OPTICS", "TELECOM INFRASTRUCTURE", "NETWORK TESTING", "AUTOCAD"],
      companyName: "Orange",
      applications: 20,
      learningOpportunity: true
    }
  ];


  const filteredInternships = internships.filter((internship) => {
    const company = companies.find((c) => c.id === internship.companyId);
    if (!company) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = internship.jobTitle.toLowerCase().includes(query);
      const matchesCompany = company.name.toLowerCase().includes(query);
      const matchesSkills = internship.skills.some(skill => skill.toLowerCase().includes(query));
      if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
    }
    if (selectedIndustry !== "All" && company.industry !== selectedIndustry) return false;
    if (selectedDuration !== "All" && internship.duration !== selectedDuration) return false;
    if (selectedPayStatus !== "All") {
      const isPaid = selectedPayStatus === "Paid";
      if (internship.isPaid !== isPaid) return false;
    }
    if (selectedLocation && selectedLocation !== "All" && internship.location.toLowerCase() !== selectedLocation.toLowerCase()) return false;
    return true;
  });

  const uniqueIndustries = ["All", ...new Set(companies.map((company) => company.industry))].sort();
  const uniqueDurations = ["All", ...new Set(internships.map((internship) => internship.duration))].sort();
  const uniqueLocations = ["All", ...new Set(internships.map(internship => internship.location))].sort();

  const handleInternshipClick = (internship) => {
      // This function currently only sets state.
      // If you want to navigate to a new page or show details in a different way (not a modal),
      // you would implement that logic here.
      console.log("Internship data selected (no modal for now):", internship);
      setSelectedInternship(internship);
  };

  const openFilterModal = () => {
    setTempIndustry(selectedIndustry);
    setTempDuration(selectedDuration);
    setTempPayStatus(selectedPayStatus);
    setTempLocation(selectedLocation);
    setShowFilters(true);
  };

  const closeFilterModal = () => setShowFilters(false);

  const applyFilters = () => {
    setSelectedIndustry(tempIndustry);
    setSelectedDuration(tempDuration);
    setSelectedPayStatus(tempPayStatus);
    setSelectedLocation(tempLocation);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setTempIndustry("All");
    setTempDuration("All");
    setTempPayStatus("All");
    setTempLocation("");
    setSelectedIndustry("All");
    setSelectedDuration("All");
    setSelectedPayStatus("All");
    setSelectedLocation("");
    setShowFilters(false);
    setResetActive(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedIndustry !== "All") count++;
    if (selectedDuration !== "All") count++;
    if (selectedPayStatus !== "All") count++;
    if (selectedLocation !== "" && selectedLocation !== "All") count++;
    return count;
  };
  const activeFilterCount = getActiveFilterCount();

  function InternshipCard({ internship }) {
    const company = companies.find(c => c.id === internship.companyId);

    return (
      <div className={`internship-display-card ${!internship.isPaid ? 'unpaid-internship-card' : ''}`}>
        {internship.isPaid && (internship.salary || internship.hourlyRate) && (
          <div className="internship-display-card-left">
            <div className="price-info">
              {internship.salary && <div className="salary-total">{internship.salary}</div>}
              {internship.hourlyRate && <div className="hourly-rate">{internship.hourlyRate}</div>}
            </div>
            <div className="price-separator-line"></div>
          </div>
        )}

        <div className="internship-display-card-center">
          <div className="internship-card-top-info">
            <div className="cs-company-name">{internship.companyName}</div>
            {company && <div className="internship-card-industry">{company.industry}</div>}
          </div>
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
          {internship.isPaid && internship.workHours && (
            <div className="work-time-info-list">
              <div className="work-time-list">{internship.workHours}</div>
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
      <div className="internships-section">
        <div className="internships-header">
          <h2>Internships</h2>
        </div>
        <div className="companies-filter-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <input
            type="text"
            className="minimal-search cs-search-input"
            placeholder="Search by title, company, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flexGrow: 1, maxWidth: '400px' }}
          />
          <button className="filters-button cs-filter-button" onClick={openFilterModal}>
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
                <div className="cs-filter-section">
                  <div className="cs-filter-section-title">PAYMENT</div>
                  <div className="cs-filter-options">
                    {["All", "Paid", "Unpaid"].map((payStatus) => (
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
                <div className="cs-filter-section">
                  <div className="cs-filter-section-title">DURATION</div>
                  <div className="cs-filter-options cs-filter-options-wrap">
                    {uniqueDurations.map((duration) => (
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
                <div className="cs-filter-section">
                  <div className="cs-filter-section-title">LOCATION</div>
                  <div className="cs-filter-options cs-filter-options-wrap">
                    {uniqueLocations.map((location) => (
                      <div
                        key={location}
                        className={`cs-filter-option${(tempLocation === location || (location === "All" && tempLocation === "")) ? " cs-selected" : ""}`}
                        onClick={() => setTempLocation(location === "All" ? "" : location)}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cs-filter-section">
                  <div className="cs-filter-section-title">INDUSTRY</div>
                  <div className="cs-filter-options cs-filter-options-wrap">
                    {uniqueIndustries.map((industry) => (
                      <div
                        key={industry}
                        className={`cs-filter-option${tempIndustry === industry ? " cs-selected" : ""}`}
                        onClick={() => setTempIndustry(industry)}
                      >
                        {industry}
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
                  Reset All
                </button>
                <button className="cs-apply-button" onClick={applyFilters}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* The detailed internship modal is intentionally NOT rendered here based on the request to remove popups for details */}
    </>
  )
}

export default Internships