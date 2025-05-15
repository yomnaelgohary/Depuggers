"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, XCircle, Download, Eye } from "lucide-react"
import { useNotifications } from "../components/NotificationsContext"

function Companies() {
  const [showFilters, setShowFilters] = useState(false)
  const [tempSelectedIndustries, setTempSelectedIndustries] = useState(["All"])
  const [selectedIndustries, setSelectedIndustries] = useState(["All"])

  const { addNotification } = useNotifications()
  const [jspdfLoaded, setJspdfLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)
  const [showCompanyModal, setShowCompanyModal] = useState(false)

  const [initialCompanies, setInitialCompanies] = useState([
    { id: 1, name: "Dell Technologies", industry: "Technology" },
    { id: 2, name: "IBM", industry: "Technology" },
    { id: 3, name: "PwC", industry: "Consulting" },
    { id: 4, name: "Microsoft", industry: "Technology" },
    { id: 5, name: "Amazon", industry: "E-commerce" },
    { id: 6, name: "Deloitte", industry: "Consulting" },
    { id: 7, name: "Oracle", industry: "Technology" },
    { id: 8, name: "Vodafone", industry: "Telecom" },
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

  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies)
  const uniqueIndustries = ["All", ...new Set(initialCompanies.map((company) => company.industry))].sort()

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

  useEffect(() => {
    let results = initialCompanies

    if (searchQuery) {
      results = results.filter((company) => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (!selectedIndustries.includes("All")) {
      results = results.filter((company) => selectedIndustries.includes(company.industry))
    }

    setFilteredCompanies(results)
  }, [searchQuery, selectedIndustries, initialCompanies])

  const handleCompanyClick = (companyId) => {
    setSelectedCompanyId(companyId)
    setShowCompanyModal(true)
  }

  const closeCompanyModal = () => {
    setShowCompanyModal(false)
    setSelectedCompanyId(null) // Also clear selectedCompanyId when closing modal
  }

  const handleSearchChange = (event) => setSearchQuery(event.target.value)

  const openFilterModal = () => {
    setTempSelectedIndustries([...selectedIndustries])
    setShowFilters(true)
  }

  const closeFilterModal = () => {
    setShowFilters(false)
  }

  const toggleIndustrySelection = (industry) => {
    setTempSelectedIndustries((prev) => {
      // If "All" is clicked
      if (industry === "All") {
        return ["All"]
      }

      // If another option is clicked while "All" is selected, remove "All"
      if (prev.includes("All")) {
        return [industry]
      }

      // Toggle the selected industry
      if (prev.includes(industry)) {
        const newSelection = prev.filter((i) => i !== industry)
        // If nothing is selected, default to "All"
        return newSelection.length === 0 ? ["All"] : newSelection
      } else {
        return [...prev, industry]
      }
    })
  }

  const applyFilters = () => {
    setSelectedIndustries(tempSelectedIndustries)
    setShowFilters(false)
  }

  const resetFilters = () => {
    setTempSelectedIndustries(["All"])
    setSelectedIndustries(["All"])
    setShowFilters(false)
  }

  const handleDownloadPDF = (companyId) => {
    const company = initialCompanies.find((c) => c.id === companyId)
    const companyDetails = companyApplications[companyId]

    if (company && companyDetails) {
      generateCompanyPDF(company, companyDetails)
    }
  }

  const generateCompanyPDF = (company, companyDetails) => {
    if (!jspdfLoaded || !window.jspdf) {
      console.error("jsPDF library is not loaded.")
      addNotification("Error generating PDF: jsPDF not loaded.", "error")
      return
    }

    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text(`${company.name}`, 105, 20, { align: "center" })
    doc.setFillColor(95, 40, 120) // Purple
    doc.rect(20, 30, 15, 15, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text(company.name.charAt(0), 27.5, 39, { align: "center" })
    doc.setTextColor(0, 0, 0)
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
    const splitDescription = doc.splitTextToSize(companyDetails.description, 170)
    doc.text(splitDescription, 20, 120)
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text("Generated by SCAD Office", 105, 280, { align: "center" })
    doc.text(new Date().toLocaleDateString(), 105, 285, { align: "center" })
    doc.save(`${company.name.replace(/\s+/g, "_")}_Details.pdf`)
    addNotification(`PDF for ${company.name} downloaded.`, "success")
  }

  const handleRejectCompany = (companyId) => {
    const companyName = initialCompanies.find((c) => c.id === companyId)?.name || `ID ${companyId}`
    setInitialCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId))
    setShowCompanyModal(false)
    setSelectedCompanyId(null)
    addNotification(`Company "${companyName}" rejected and removed.`, "error")
  }

  const handleAcceptCompany = (companyId) => {
    const companyName = initialCompanies.find((c) => c.id === companyId)?.name || `ID ${companyId}`
    setShowCompanyModal(false)
    setSelectedCompanyId(null)
    addNotification(`Company "${companyName}" accepted.`, "success")
  }

  const getFirstLetter = (name) => (name ? name.charAt(0).toUpperCase() : "")

  const selectedCompanyDetails = selectedCompanyId ? companyApplications[selectedCompanyId] : null
  const selectedCompany = selectedCompanyId
    ? initialCompanies.find((company) => company.id === selectedCompanyId)
    : null

  // Get active filter count for display
  const getActiveFilterCount = () => {
    if (selectedIndustries.includes("All")) return 0
    return selectedIndustries.length
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="companies-section-container">
      <div className="companies-section">
        <div className="companies-header">
          <h2>Companies</h2>
        </div>
        <div className="companies-filter-controls">
          <input
            type="text"
            className="minimal-search"
            placeholder="Search internship"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <button className="filters-button" onClick={openFilterModal}>
            <span className="hamburger-icon">≡</span>
            Filters
            {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
          </button>
        </div>

        <div className="companies-list">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div className={`company-card ${selectedCompanyId === company.id ? "selected" : ""}`} key={company.id}>
                <div className="company-letter">{getFirstLetter(company.name)}</div>
                <div className="company-info">
                  <div className="company-text-details">
                    <h3 className="company-name">{company.name}</h3>
                    <p>{company.industry}</p>
                  </div>
                  <button
                    className="view-profile-button"
                    onClick={() => handleCompanyClick(company.id)}
                    title={`View profile for ${company.name}`}
                  >
                    <Eye size={16} strokeWidth={2} />
                    <span>View details</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-companies-message">No companies match your current filters.</p>
          )}
        </div>

        {/* Filter Modal */}
        {showFilters && (
          <div className="filter-popup-overlay" onClick={closeFilterModal}>
            <div className="filter-popup" onClick={(e) => e.stopPropagation()}>
              <div className="filter-popup-header">
                <h3>Filter by Industry</h3>
                <button onClick={closeFilterModal}>
                  <X size={18} />
                </button>
              </div>
              <div className="filter-options">
                {uniqueIndustries.map((industry) => (
                  <div
                    key={industry}
                    className={`filter-option ${tempSelectedIndustries.includes(industry) ? "selected" : ""}`}
                    onClick={() => toggleIndustrySelection(industry)}
                  >
                    {industry}
                    {tempSelectedIndustries.includes(industry) && <CheckCircle size={16} className="check-icon" />}
                  </div>
                ))}
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

        {/* Company Details Modal */}
        {showCompanyModal && selectedCompany && selectedCompanyDetails && (
          <div className="company-modal-overlay">
            <div className="company-modal">
              <div className="company-modal-header">
                <div className="company-modal-title">
                  <div className="company-modal-letter">{getFirstLetter(selectedCompany.name)}</div>
                  <h2>{selectedCompany.name}</h2>
                </div>
                <button className="modal-close-button" onClick={closeCompanyModal} title="Close modal">
                  <X size={20} />
                </button>
              </div>
              <div className="company-modal-content">
                <div className="company-modal-info">
                  <div className="info-group">
                    <h3>Industry</h3>
                    <p>{selectedCompany.industry}</p>
                  </div>
                  <div className="info-group">
                    <h3>Legitimacy Proof</h3>
                    <p>{selectedCompanyDetails.legitimacyProof}</p>
                  </div>
                  <div className="info-group">
                    <h3>Description</h3>
                    <p>{selectedCompanyDetails.description}</p>
                  </div>
                </div>
              </div>
              <div className="company-modal-actions">
                <button
                  className="download-button"
                  onClick={() => handleDownloadPDF(selectedCompanyId)}
                  title="Download company details as PDF"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
                <button
                  className="accept-button"
                  onClick={() => handleAcceptCompany(selectedCompanyId)}
                  title="Accept this company"
                >
                  <CheckCircle size={18} />
                  <span>Accept</span>
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleRejectCompany(selectedCompanyId)}
                  title="Reject this company"
                >
                  <XCircle size={18} />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Companies
