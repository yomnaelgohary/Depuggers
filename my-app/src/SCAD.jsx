// SCAD.jsx
"use client"

import { useState, useEffect } from "react"
import "./SCAD.css"
import {
  Building,
  Briefcase,
  Users,
  FileText,
  PenToolIcon as Tool,
  Bell,
  Phone,
  MessageCircle,
  X,
  CheckCircle,
  XCircle,
  Download,
  Search,
  Clock,
  DollarSign,
  CalendarIcon,
  Tag,
  ChevronLeft,
} from "lucide-react"

// Add jsPDF library
function SCAD() {
  const [jspdfLoaded, setJspdfLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    script.async = true
    script.onload = () => {
      setJspdfLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const [stats, setStats] = useState({
    totalStudents: "8,432",
    totalProStudents: "2,345",
    totalCompanies: "10",
  })

  const recentActivities = [
    { id: 1, type: "New student application", time: "1 minute ago" },
    { id: 2, type: "New student application", time: "2 minutes ago" },
    { id: 3, type: "New student application", time: "3 minutes ago" },
    { id: 4, type: "New student application", time: "4 minutes ago" },
    { id: 5, type: "New student application", time: "5 minutes ago" },
  ]

  const [initialCompanies, setInitialCompanies] = useState([
    { id: 1, name: "Dell Technologies", industry: "Technology" },
    { id: 2, name: "IBM", industry: "Technology" },
    { id: 3, name: "PwC", industry: "Consulting" },
    { id: 4, name: "Microsoft", industry: "Technology" },
    { id: 5, name: "Amazon", industry: "E-commerce" },
    { id: 6, name: "Deloitte", industry: "Consulting" },
    { id: 7, name: "Oracle", industry: "Technology" },
    { id: 8, name: "Vodafone", industry: "Telecommunications" },
    { id: 9, name: "Accenture", industry: "Consulting" },
    { id: 10, name: "Tesla", industry: "Automotive" },
  ])

  const companyApplications = {
    1: { legitimacyProof: "ISO 9001 Certification", description: "Global leader in computer technology." },
    2: { legitimacyProof: "Publicly Traded Company", description: "Multinational technology corporation." },
    3: { legitimacyProof: "BBB Accreditation", description: "Leading professional services network." },
    4: {
      legitimacyProof: "Fortune 500 Company",
      description: "Technology company focused on software and cloud services.",
    },
    5: { legitimacyProof: "SEC Filings Available", description: "Largest online retailer." },
    6: { legitimacyProof: "Global Consulting Firm", description: "Multinational professional services network." },
    7: { legitimacyProof: "NYSE Listed", description: "Leading provider of enterprise software." },
    8: { legitimacyProof: "FTSE 100 Company", description: "Multinational telecommunications company." },
    9: { legitimacyProof: "Global Management Consulting", description: "Professional services company." },
    10: {
      legitimacyProof: "Public Automotive Company",
      description: "Manufacturer of electric vehicles and clean energy.",
    },
  }

  const [initialStudents, setInitialStudents] = useState([
    { id: 101, name: "Alice Smith", internshipStatus: "Ongoing", company: "Dell Technologies" },
    { id: 102, name: "Bob Johnson", internshipStatus: "Not Started" },
    { id: 103, name: "Charlie Brown", internshipStatus: "Completed", company: "IBM" },
    { id: 104, name: "Diana Lee", internshipStatus: "Ongoing", company: "Microsoft" },
    { id: 105, name: "Ethan Williams", internshipStatus: "Not Started" },
    { id: 106, name: "Fiona Green", internshipStatus: "Completed", company: "Amazon" },
    { id: 107, name: "George Harris", internshipStatus: "Ongoing", company: "PwC" },
    { id: 108, name: "Hannah Clark", internshipStatus: "Not Started" },
    { id: 109, name: "Ian Davis", internshipStatus: "Completed", company: "Oracle" },
    { id: 110, name: "Jane Miller", internshipStatus: "Ongoing", company: "Vodafone" },
  ])

  const [activeAction, setActiveAction] = useState(null)
  const [showCompanies, setShowCompanies] = useState(false)
  const [showStudents, setShowStudents] = useState(false)
  const [showInternships, setShowInternships] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies)
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null)
  const [showPdfViewer, setShowPdfViewer] = useState(false)

  const handleCompanyClick = (companyId) => {
    setSelectedCompanyId(companyId)
    console.log(`Showing accept/reject options for company ID: ${companyId}`)
  }

  const handleDownloadPDF = (companyId) => {
    const company = initialCompanies.find((c) => c.id === companyId)
    const companyDetails = companyApplications[companyId]

    if (company && companyDetails) {
      // Generate PDF content
      generateCompanyPDF(company, companyDetails)
    }
  }

  // Function to generate and download the PDF
  const generateCompanyPDF = (company, companyDetails) => {
    // Create a new jsPDF instance
    if (!jspdfLoaded || !window.jspdf) {
      console.error("jsPDF library is not loaded.")
      return
    }

    const { jsPDF } = window.jspdf
    const doc = new jsPDF()

    // Set font styles
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)

    // Add company name as title
    doc.text(`${company.name}`, 105, 20, { align: "center" })

    // Add company logo/letter
    doc.setFillColor(195, 20, 50) // #c31432 color
    doc.rect(20, 30, 15, 15, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text(company.name.charAt(0), 27.5, 39, { align: "center" })

    // Reset text color
    doc.setTextColor(0, 0, 0)

    // Add company details
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Company Information", 20, 60)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.text(`Industry: ${company.industry}`, 20, 70)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Legitimacy Proof", 20, 85)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.text(companyDetails.legitimacyProof, 20, 95)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text("Company Description", 20, 110)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)

    // Handle long descriptions with text wrapping
    const splitDescription = doc.splitTextToSize(companyDetails.description, 170)
    doc.text(splitDescription, 20, 120)

    // Add SCAD Office footer
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("Generated by SCAD Office", 105, 280, { align: "center" })
    doc.text(new Date().toLocaleDateString(), 105, 285, { align: "center" })

    // Save the PDF
    doc.save(`${company.name.replace(/\s+/g, "_")}_Details.pdf`)
  }

  const handleActionClick = (actionName) => {
    setActiveAction(actionName)
    if (actionName === "Companies") {
      setShowCompanies(true)
      setShowStudents(false)
      setShowInternships(false)
      setSelectedStudentProfile(null)
      setShowCalendar(false)
      setShowPdfViewer(false)
    } else if (actionName === "Students") {
      setShowStudents(true)
      setShowCompanies(false)
      setShowInternships(false)
      setSelectedStudentProfile(null)
      setShowCalendar(false)
      setShowPdfViewer(false)
    } else if (actionName === "Internships") {
      setShowInternships(true)
      setShowCompanies(false)
      setShowStudents(false)
      setSelectedStudentProfile(null)
      setShowCalendar(false)
      setShowPdfViewer(false)
    } else if (actionName === "Internship Cycle") {
      setShowCalendar(true)
      setShowCompanies(false)
      setShowStudents(false)
      setShowInternships(false)
      setSelectedStudentProfile(null)
      setShowPdfViewer(false)
    } else {
      setShowCompanies(false)
      setShowStudents(false)
      setShowInternships(false)
      setSelectedStudentProfile(null)
      setShowCalendar(false)
      setShowPdfViewer(false)
      console.log(`${actionName} action clicked`)
    }
    setTimeout(() => {
      setActiveAction(null)
    }, 300)
  }

  const isActionActive = (actionName) => {
    return activeAction === actionName ? "action-card active" : "action-card"
  }

  const closeCompaniesSection = () => {
    setShowCompanies(false)
    setSearchQuery("")
    setSelectedIndustry("All")
    setSelectedCompanyId(null)
    setShowPdfViewer(false)
  }

  const closeInternshipsSection = () => {
    setShowInternships(false)
  }

  const closePdfViewer = () => {
    setShowPdfViewer(false)
    setSelectedCompanyId(null)
  }

  const closeStudentsSection = () => {
    setShowStudents(false)
    setSelectedStudentProfile(null)
  }

  const getFirstLetter = (name) => {
    return name.charAt(0)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value)
  }

  const handleRejectCompany = (companyId) => {
    // Update the total companies count
    setStats((prevStats) => ({
      ...prevStats,
      totalCompanies: (Number.parseInt(prevStats.totalCompanies) - 1).toString(),
    }))

    // Remove the company from the list
    setInitialCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId))

    // Clear the selected company
    setSelectedCompanyId(null)
    setShowPdfViewer(false)

    console.log(`Company ${companyId} rejected and removed`)
  }

  const handleAcceptCompany = (companyId) => {
    setShowPdfViewer(false)
    setSelectedCompanyId(null)
    console.log(`Company ${companyId} accepted`)
  }

  const selectedCompanyDetails = selectedCompanyId ? companyApplications[selectedCompanyId] : null
  const selectedCompany = selectedCompanyId
    ? initialCompanies.find((company) => company.id === selectedCompanyId)
    : null

  useEffect(() => {
    let results = initialCompanies
    if (searchQuery) {
      results = results.filter((company) => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (selectedIndustry !== "All") {
      results = results.filter((company) => company.industry === selectedIndustry)
    }
    setFilteredCompanies(results)
  }, [searchQuery, selectedIndustry, initialCompanies])

  const uniqueIndustries = ["All", ...new Set(initialCompanies.map((company) => company.industry))].sort()

  // Generate highlighted days for the internship cycle (July 1st to October 1st)
  const currentYear = new Date().getFullYear()
  const startDate = new Date(currentYear, 6, 1) // July 1st
  const endDate = new Date(currentYear, 9, 1) // October 1st (exclusive)

  const goToStudentProfile = (studentId) => {
    const student = initialStudents.find((s) => s.id === studentId)
    setSelectedStudentProfile(student)
    setShowStudents(false)
  }

  const closeStudentProfile = () => {
    setSelectedStudentProfile(null)
    setShowStudents(true)
  }

  const getStudentInternshipSubmissions = (studentId) => {
    if (studentId === 101) {
      return [
        { id: 1, company: "Google", status: "Applied", submissionDate: "2024-08-15" },
        { id: 2, company: "Meta", status: "Interviewed", submissionDate: "2024-09-01" },
      ]
    }
    if (studentId === 103) {
      return [{ id: 3, company: "Amazon", status: "Accepted", submissionDate: "2024-10-20" }]
    }
    return []
  }

  // Generate highlighted days for the internship cycle (July 1st to September 30th)
  const cycleHighlightedDays = []
  const startMonth = 6 // July (0-indexed)
  const endMonth = 8 // September
  const year = new Date().getFullYear()

  for (let month = startMonth; month <= endMonth; month++) {
    const lastDay = new Date(year, month + 1, 0).getDate() // Get last day of the month
    for (let day = 1; day <= lastDay; day++) {
      cycleHighlightedDays.push(new Date(year, month, day))
    }
  }

  // Update the Calendar component to show all months but only highlight July-September
  function Calendar({ highlightedDays, onClose }) {
    const [currentView, setCurrentView] = useState("overview") // "overview" or "month"
    const [selectedMonth, setSelectedMonth] = useState(null)

    // Get current year
    const currentYear = new Date().getFullYear()

    // Generate months data for the overview - now showing all months
    const months = []
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentYear, i, 1)
      const monthName = monthDate.toLocaleString("default", { month: "long" })

      // Count highlighted days in this month
      const highlightedInMonth = highlightedDays.filter(
        (day) => day.getMonth() === i && day.getFullYear() === currentYear,
      ).length

      // Only July (6), August (7), and September (8) should have active days
      const isActiveMonth = i >= 6 && i <= 8

      months.push({
        index: i,
        name: monthName,
        highlightedDays: isActiveMonth ? highlightedInMonth : 0,
        daysInMonth: new Date(currentYear, i + 1, 0).getDate(),
        isActive: isActiveMonth,
      })
    }

    const handleMonthClick = (monthIndex) => {
      setSelectedMonth(monthIndex)
      setCurrentView("month")
    }

    const goBackToOverview = () => {
      setCurrentView("overview")
    }

    const renderMonthView = () => {
      const month = selectedMonth
      const year = currentYear
      const firstDayOfMonth = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" })

      const days = []

      // Empty cells for days before the 1st of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<td key={`empty-${i}`} className="empty-day"></td>)
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const isHighlighted = highlightedDays.some(
          (highlightedDay) => highlightedDay.toDateString() === date.toDateString(),
        )
        const isToday = new Date().toDateString() === date.toDateString()

        days.push(
          <td key={day} className={`calendar-day ${isHighlighted ? "highlighted" : ""} ${isToday ? "today" : ""}`}>
            <div className="day-content">
              <span className="day-number">{day}</span>
              {isHighlighted && <div className="day-indicator"></div>}
            </div>
          </td>,
        )
      }

      // Group days into weeks
      const weeks = []
      for (let i = 0; i < days.length; i += 7) {
        weeks.push(<tr key={`week-${i / 7}`}>{days.slice(i, i + 7)}</tr>)
      }

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

      return (
        <div className="month-view">
          <div className="month-header">
            <button className="back-button" onClick={goBackToOverview}>
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
            <h2>
              {monthName} {year}
            </h2>
          </div>

          <table className="month-calendar">
            <thead>
              <tr>
                {dayNames.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>{weeks}</tbody>
          </table>

          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-indicator highlighted"></div>
              <span>Internship Cycle Day</span>
            </div>
            <div className="legend-item">
              <div className="legend-indicator today"></div>
              <span>Today</span>
            </div>
          </div>
        </div>
      )
    }

    const renderOverview = () => {
      return (
        <div className="calendar-overview">
          <h2>Internship Cycle Calendar</h2>
          <p className="cycle-dates">July 1st - October 1st, {currentYear}</p>

          <div className="months-grid">
            {months.map((month) => (
              <div
                key={month.index}
                className={`month-card ${month.isActive ? "active-month" : "inactive-month"}`}
                onClick={() => handleMonthClick(month.index)}
              >
                <h3>{month.name}</h3>
                <div className="month-stats">
                  <div className="month-progress">
                    {month.isActive && (
                      <div
                        className="progress-bar"
                        style={{ width: `${(month.highlightedDays / month.daysInMonth) * 100}%` }}
                      ></div>
                    )}
                  </div>
                  <p>{month.highlightedDays} active days</p>
                </div>
              </div>
            ))}
          </div>

          <div className="calendar-summary">
            <div className="summary-item">
              <CalendarIcon size={20} />
              <div>
                <h4>Total Duration</h4>
                <p>3 months</p>
              </div>
            </div>
            <div className="summary-item">
              <Clock size={20} />
              <div>
                <h4>Active Days</h4>
                <p>{highlightedDays.length} days</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="calendar-container">
        <button className="modal-close-button calendar-close" onClick={onClose}>
          <X size={20} />
        </button>

        {currentView === "overview" ? renderOverview() : renderMonthView()}
      </div>
    )
  }

  function StudentsView({ students, onBack, onGoToProfile }) {
    const [filterStatus, setFilterStatus] = useState("All")
    const [filteredStudents, setFilteredStudents] = useState(students)

    useEffect(() => {
      if (filterStatus === "All") {
        setFilteredStudents(students)
      } else {
        setFilteredStudents(students.filter((student) => student.internshipStatus === filterStatus))
      }
    }, [students, filterStatus])

    const handleFilterChange = (event) => {
      setFilterStatus(event.target.value)
    }

    const handleProfileClick = (studentId) => {
      if (onGoToProfile) {
        onGoToProfile(studentId)
      } else {
        console.log(`Go to profile for student ID: ${studentId}`)
      }
    }

    return (
      <div className="students-section-overlay">
        <div className="students-view">
          <div className="students-header">
            <h2>Students List</h2>
            <button className="modal-close-button" onClick={onBack}>
              <X size={20} />
            </button>
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
                  {student.name.charAt(0).toUpperCase()}
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
      </div>
    )
  }

  function CompanyPdfViewer({ companyId, companyName, companyIndustry, companyDetails, onAccept, onReject, onClose }) {
    return (
      <div className="pdf-viewer-overlay">
        <div className="pdf-viewer">
          <div className="pdf-header">
            <h2>{companyName} - Details</h2>
            <button className="modal-close-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className="pdf-content">
            <p>Industry: {companyIndustry}</p>
            <p>Legitimacy Proof: {companyDetails.legitimacyProof}</p>
            <p>Description: {companyDetails.description}</p>
          </div>
          <div className="pdf-actions">
            <button className="accept-button" onClick={() => onAccept(companyId)}>
              <CheckCircle size={16} /> Accept
            </button>
            <button className="reject-button" onClick={() => onReject(companyId)}>
              <XCircle size={16} /> Reject
            </button>
          </div>
        </div>
      </div>
    )
  }

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

  function InternshipsView({ onBack }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedIndustry, setSelectedIndustry] = useState("All")
    const [selectedDuration, setSelectedDuration] = useState("All")
    const [selectedPayStatus, setSelectedPayStatus] = useState("All")
    const [selectedInternship, setSelectedInternship] = useState(null)

    // Sample internship data
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

    // Filter internships based on search and filter criteria
    const filteredInternships = internships.filter((internship) => {
      const company = companies.find((c) => c.id === internship.companyId)

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = internship.jobTitle.toLowerCase().includes(query)
        const matchesCompany = company.name.toLowerCase().includes(query)
        if (!matchesTitle && !matchesCompany) return false
      }

      // Industry filter
      if (selectedIndustry !== "All" && company.industry !== selectedIndustry) {
        return false
      }

      // Duration filter
      if (selectedDuration !== "All" && internship.duration !== selectedDuration) {
        return false
      }

      // Payment filter
      if (selectedPayStatus !== "All") {
        const isPaid = selectedPayStatus === "Paid"
        if (internship.isPaid !== isPaid) return false
      }

      return true
    })

    // Get unique industries and durations for filters
    const uniqueIndustries = ["All", ...new Set(companies.map((company) => company.industry))].sort()
    const uniqueDurations = ["All", ...new Set(internships.map((internship) => internship.duration))].sort()

    const handleInternshipClick = (internship) => {
      setSelectedInternship(internship)
    }

    const closeInternshipDetails = () => {
      setSelectedInternship(null)
    }

    return (
      <div className="internships-section-overlay">
        {!selectedInternship ? (
          <div className="internships-section">
            <div className="internships-header">
              <h2>Available Internships</h2>
              <button className="modal-close-button" onClick={onBack}>
                <X size={20} />
              </button>
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
                <p className="industry-tag">
                  <Tag size={14} />
                  {companies.find((c) => c.id === selectedInternship.companyId).industry}
                </p>
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
                  <DollarSign size={18} />
                  <div>
                    <h4>Payment</h4>
                    <p>{selectedInternship.isPaid ? "Paid" : "Unpaid"}</p>
                    {selectedInternship.isPaid && selectedInternship.salary && (
                      <p className="salary">${selectedInternship.salary}/month</p>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <CalendarIcon size={18} />
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
      </div>
    )
  }
  return (
    <div className="scad-container">
      <header className="scad-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon"></span>
            <h1>SCAD Office</h1>
          </div>
        </div>
        <div className="header-center">
          <nav className="main-nav">
            <ul>
              <li>
                <button onClick={() => handleActionClick("Internship Cycle")} className="nav-link">
                  Internship Cycle
                </button>
              </li>
              <li>
                <a href="#statistics" className="nav-link">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#request-appointment" className="nav-link">
                  Request Appointment
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <button className="icon-button" onClick={() => alert("Notifications")}>
              <Bell size={20} />
            </button>
            <button className="icon-button" onClick={() => alert("Incoming Calls")}>
              <Phone size={20} />
            </button>
            <button className="icon-button" onClick={() => alert("Outcoming Calls")}>
              <MessageCircle size={20} />
            </button>
          </div>
          <div className="profile-avatar">
            <img src="/placeholder.svg?height=40&width=40" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="scad-main">
        <section className="welcome-section">
          <h1>Welcome back</h1>
          <p>Here's a quick overview of your day</p>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <h3>Total students</h3>
            <p className="stat-number">{stats.totalStudents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Pro Students</h3>
            <p className="stat-number">{stats.totalProStudents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Companies</h3>
            <p className="stat-number">{stats.totalCompanies}</p>
          </div>
        </section>

        <section className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <div className={isActionActive("Companies")} onClick={() => handleActionClick("Companies")}>
              <Building size={24} />
              <h3>Companies</h3>
              <p>View all companies</p>
            </div>
            <div className={isActionActive("Internships")} onClick={() => handleActionClick("Internships")}>
              <Briefcase size={24} />
              <h3>Internships</h3>
              <p>View all internships</p>
            </div>
            <div className={isActionActive("Students")} onClick={() => handleActionClick("Students")}>
              <Users size={24} />
              <h3>Students</h3>
              <p>View all students</p>
            </div>
            <div className={isActionActive("Evaluation")} onClick={() => handleActionClick("Evaluation")}>
              <FileText size={24} />
              <h3>Evaluation & Reports</h3>
              <p>View all evaluations and reports</p>
            </div>
            <div className={isActionActive("Workshop")} onClick={() => handleActionClick("Workshop")}>
              <Tool size={24} />
              <h3>Workshop</h3>
              <p>View all workshops</p>
            </div>
          </div>
        </section>

        <section className="recent-activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-timeline">
            {recentActivities.map((activity) => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-avatar">
                  <img src="/placeholder.svg?height=32&width=32" alt="User" />
                </div>
                <div className="activity-content">
                  <p className="activity-type">{activity.type}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showCalendar && (
          <div className="calendar-overlay">
            <Calendar highlightedDays={cycleHighlightedDays} onClose={() => setShowCalendar(false)} />
          </div>
        )}

        {showCompanies && (
          <div className="companies-section-overlay">
            <div className="companies-section">
              <div className="companies-header">
                <h2>Available Companies</h2>
                <button className="modal-close-button" onClick={closeCompaniesSection}>
                  <X size={20} />
                </button>
              </div>
              <div className="companies-filter-controls">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Search by company name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="industry-filter">
                  <label htmlFor="industry">Filter by Industry:</label>
                  <select id="industry" value={selectedIndustry} onChange={handleIndustryChange}>
                    {uniqueIndustries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="companies-list">
                {filteredCompanies.map((company) => (
                  <div
                    className={`company-card ${selectedCompanyId === company.id ? "selected" : ""}`}
                    key={company.id}
                    onClick={() => handleCompanyClick(company.id)}
                  >
                    <div className="company-letter">{getFirstLetter(company.name)}</div>
                    <div className="company-info">
                      <h3 className="company-name">{company.name}</h3>
                      <p>{company.industry}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedCompanyId && (
                <div className="company-details">
                  <h3>{initialCompanies.find((c) => c.id === selectedCompanyId)?.name} - Company Details</h3>
                  <div className="action-buttons">
                    <button className="download-button" onClick={() => handleDownloadPDF(selectedCompanyId)}>
                      <Download size={16} /> Download PDF
                    </button>
                    <button className="accept-button" onClick={() => handleAcceptCompany(selectedCompanyId)}>
                      <CheckCircle size={16} /> Accept
                    </button>
                    <button className="reject-button" onClick={() => handleRejectCompany(selectedCompanyId)}>
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {showInternships && <InternshipsView onBack={closeInternshipsSection} />}

        {showPdfViewer && selectedCompany && selectedCompanyDetails && (
          <CompanyPdfViewer
            companyId={selectedCompanyId}
            companyName={selectedCompany.name}
            companyIndustry={selectedCompany.industry}
            companyDetails={selectedCompanyDetails}
            onAccept={handleAcceptCompany}
            onReject={handleRejectCompany}
            onClose={closePdfViewer}
          />
        )}

        {showStudents && (
          <StudentsView students={initialStudents} onBack={closeStudentsSection} onGoToProfile={goToStudentProfile} />
        )}

        {selectedStudentProfile && (
          <div className="student-profile-overlay">
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
                        Company: {submission.company}, Status: {submission.status}, Submitted:{" "}
                        {submission.submissionDate}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No previous internship submissions found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default SCAD
