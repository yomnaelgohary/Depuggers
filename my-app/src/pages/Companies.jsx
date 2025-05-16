"use client"

import { useState, useEffect, useRef } from "react" // Added useRef
import { X, CheckCircle, XCircle, Download, Eye } from "lucide-react" // CheckCircle is imported but will be removed from rendering in filter
import { useNotifications } from "../components/NotificationsContext"

function Companies() {
  const [showFilters, setShowFilters] = useState(false)
  const [tempSelectedIndustries, setTempSelectedIndustries] = useState(["All Companies"])
  const [selectedIndustries, setSelectedIndustries] = useState(["All Companies"])

  const { addNotification } = useNotifications()
  const [jspdfLoaded, setJspdfLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)
  const [showCompanyModal, setShowCompanyModal] = useState(false)
  // Ref for the filter popup to handle click outside
  const filterPopupRef = useRef(null);

  const [resetActive, setResetActive] = useState(false);

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
  const uniqueIndustries = ["All Companies", ...new Set(initialCompanies.map((company) => company.industry))].sort((a, b) => {
    if (a === "All Companies") return -1;
    if (b === "All Companies") return 1;
    return a.localeCompare(b);
  });

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    script.async = true
    script.onload = () => {
      setJspdfLoaded(true)
    }
    document.body.appendChild(script)

    // Click outside listener for filter popup
    const handleClickOutside = (event) => {
        if (showFilters && filterPopupRef.current && !filterPopupRef.current.contains(event.target)) {
            // Check if the click target is the filter button itself
            const filterButton = document.querySelector(".filters-button"); // Adjust selector if needed
            if (filterButton && filterButton.contains(event.target)) {
                return; // Don't close if filter button was clicked
            }
            setShowFilters(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);


    return () => {
      if(document.body.contains(script)){ // Check if script exists before removing
        document.body.removeChild(script)
      }
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showFilters]) // Added showFilters to dependency array for the click outside listener

  useEffect(() => {
    let results = initialCompanies

    if (searchQuery) {
      results = results.filter((company) => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (!selectedIndustries.includes("All Companies")) {
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
    setSelectedCompanyId(null)
  }

  const handleSearchChange = (event) => setSearchQuery(event.target.value)

  const openFilterModal = () => {
    setTempSelectedIndustries([...selectedIndustries]) // Use spread to create a new array copy
    setShowFilters(true)
  }

  const closeFilterModal = () => {
    setShowFilters(false)
  }

  const toggleIndustrySelection = (industry) => {
    setTempSelectedIndustries((prev) => {
      if (industry === "All Companies") {
        return ["All Companies"]
      }
      const newSelection = prev.includes("All Companies") ? [industry] :
                           prev.includes(industry) ? prev.filter((i) => i !== industry) :
                           [...prev, industry];
      return newSelection.length === 0 ? ["All Companies"] : newSelection;
    })
  }

  const applyFilters = () => {
    setSelectedIndustries(tempSelectedIndustries)
    setShowFilters(false)
  }

  const resetFilters = () => {
    setTempSelectedIndustries(["All Companies"])
    setSelectedIndustries(["All Companies"]) // Also reset the applied filters
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
    doc.setFillColor(95, 40, 120)
    doc.rect(20, 30, 15, 15, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text(company.name.charAt(0).toUpperCase(), 27.5, 39, { align: "center" }) // Ensure first letter is uppercase
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
    // Here you would typically update the company's status in your state or backend
    // For now, we just show a notification and close the modal.
    setShowCompanyModal(false)
    setSelectedCompanyId(null)
    addNotification(`Company "${companyName}" accepted.`, "success")
  }

  const getFirstLetter = (name) => (name ? name.charAt(0).toUpperCase() : "")

  const selectedCompanyDetails = selectedCompanyId ? companyApplications[selectedCompanyId] : null
  const selectedCompany = selectedCompanyId
    ? initialCompanies.find((company) => company.id === selectedCompanyId)
    : null

  const getActiveFilterCount = () => {
    if (selectedIndustries.includes("All Companies") || selectedIndustries.length === 0) return 0 // Consider empty as 'All'
    return selectedIndustries.length
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="companies-section-container">
      <div className="companies-section">
        <div className="companies-header">
          <h2>Companies</h2>
        </div>
        <div className="companies-filter-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <input
            type="text"
            className="minimal-search cs-search-input"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: '250px' }}
          />
          <button className="filters-button cs-filter-button" onClick={openFilterModal} style={{ marginLeft: 'auto' }}>
            <span className="hamburger-icon">≡</span>
            Filters
            {selectedIndustries && selectedIndustries.length > 0 && !selectedIndustries.includes('All Companies') && (
              <span className="filter-badge">{selectedIndustries.length}</span>
            )}
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
                    <p className="company-industry-tag">{company.industry}</p> {/* Added class for styling */}
                  </div>
                  <button
                    className="view-profile-button"
                    onClick={() => handleCompanyClick(company.id)}
                    title={`View profile for ${company.name}`}
                  >
                    <Eye size={16} strokeWidth={2.5} /> {/* Slightly bolder icon */}
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
          <div className="cs-filter-modal-overlay" onClick={closeFilterModal}>
            <div className="cs-filter-modal" ref={filterPopupRef} onClick={(e) => e.stopPropagation()}>
              <div className="cs-filter-modal-header">
                <h2>Filter by Industry</h2>
                <button className="cs-close-button" onClick={closeFilterModal}>
                  <X size={18} />
                </button>
              </div>
              <div className="cs-filter-modal-content">
                <div className="cs-filter-section">
                  <div className="cs-filter-options">
                    {uniqueIndustries.map((industry) => (
                      <div
                        key={industry}
                        className={`cs-filter-option${tempSelectedIndustries.includes(industry) ? " cs-selected" : ""}`}
                        onClick={() => toggleIndustrySelection(industry)}
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
                  Reset
                </button>
                <button className="cs-apply-button" onClick={applyFilters}>
                  {`Show ${initialCompanies.filter(company => {
                    let matches = true;
                    if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase())) matches = false;
                    if (!tempSelectedIndustries.includes('All Companies') && !tempSelectedIndustries.includes(company.industry)) matches = false;
                    return matches;
                  }).length} Companies`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Company Details Modal */}
        {showCompanyModal && selectedCompany && selectedCompanyDetails && (
          <div className="company-modal-overlay" onClick={closeCompanyModal}>
            <div className="company-modal" onClick={(e) => e.stopPropagation()}>
              <div className="company-modal-header">
                <div className="company-modal-title">
                  <div className="company-modal-letter">{getFirstLetter(selectedCompany.name)}</div>
                  <h2>{selectedCompany.name}</h2>
                </div>
                <button className="modal-close-button" onClick={closeCompanyModal} title="Close modal">
                  <X size={22} /> {/* Slightly larger close icon */}
                </button>
              </div>
              <div className="company-modal-content">
                <div className="company-modal-info-grid"> {/* Changed for grid layout */}
                  <div className="info-group">
                    <h3>Industry</h3>
                    <p>{selectedCompany.industry}</p>
                  </div>
                  <div className="info-group">
                    <h3>Legitimacy Proof</h3>
                    <p>{selectedCompanyDetails.legitimacyProof}</p>
                  </div>
                  <div className="info-group full-width"> {/* Class for full width items */}
                    <h3>Description</h3>
                    <p>{selectedCompanyDetails.description}</p>
                  </div>
                </div>
              </div>
              <div className="company-modal-actions">
                <button
                  className="action-button download-button" // Added generic and specific class
                  onClick={() => handleDownloadPDF(selectedCompanyId)}
                  title="Download company details as PDF"
                >
                  <Download size={18} />
                  <span>Download</span>
                </button>
                <button
                  className="action-button accept-button" // Added generic and specific class
                  onClick={() => handleAcceptCompany(selectedCompanyId)}
                  title="Accept this company"
                >
                  <CheckCircle size={18} />
                  <span>Accept</span>
                </button>
                <button
                  className="action-button reject-button" // Added generic and specific class
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