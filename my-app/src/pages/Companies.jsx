"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, XCircle, Download } from "lucide-react"
import { useNotifications } from "../components/NotificationsContext"

function Companies() {
  const { addNotification } = useNotifications()
  const [jspdfLoaded, setJspdfLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)
  const [showPdfViewer, setShowPdfViewer] = useState(false)

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
    if (searchQuery)
      results = results.filter((company) => company.name.toLowerCase().includes(searchQuery.toLowerCase()))
    if (selectedIndustry !== "All") results = results.filter((company) => company.industry === selectedIndustry)
    setFilteredCompanies(results)
  }, [searchQuery, selectedIndustry, initialCompanies])

  const handleCompanyClick = (companyId) => {
    setSelectedCompanyId(companyId)
  }

  const handleSearchChange = (event) => setSearchQuery(event.target.value)
  const handleIndustryChange = (event) => setSelectedIndustry(event.target.value)

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
      return
    }

    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text(`${company.name}`, 105, 20, { align: "center" })
    doc.setFillColor(195, 20, 50)
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
  }

  const handleRejectCompany = (companyId) => {
    setInitialCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId))
    setSelectedCompanyId(null)
    setShowPdfViewer(false)
    addNotification(`Company ${companyId} rejected and removed`, "error")
  }

  const handleAcceptCompany = (companyId) => {
    setShowPdfViewer(false)
    setSelectedCompanyId(null)
    addNotification(`Company ${companyId} accepted`, "success")
  }

  const getFirstLetter = (name) => (name ? name.charAt(0) : "")

  const selectedCompanyDetails = selectedCompanyId ? companyApplications[selectedCompanyId] : null
  const selectedCompany = selectedCompanyId
    ? initialCompanies.find((company) => company.id === selectedCompanyId)
    : null

  return (
    <div className="companies-section h-full flex flex-col overflow-hidden">
      <div className="companies-header">
        <h2>Available Companies</h2>
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
      <div className="companies-list flex-1 overflow-auto">
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
              <Download size={16} />
            </button>
            <button className="accept-button" onClick={() => handleAcceptCompany(selectedCompanyId)}>
              <CheckCircle size={16} />
            </button>
            <button className="reject-button" onClick={() => handleRejectCompany(selectedCompanyId)}>
              <XCircle size={16} />
            </button>
          </div>
        </div>
      )}

      {showPdfViewer && selectedCompany && selectedCompanyDetails && (
        <div className="pdf-viewer-overlay">
          <div className="pdf-viewer">
            <div className="pdf-header">
              <h2>{selectedCompany.name} - Details</h2>
              <button className="modal-close-button" onClick={() => setShowPdfViewer(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="pdf-content">
              <p>Industry: {selectedCompany.industry}</p>
              <p>Legitimacy Proof: {selectedCompanyDetails.legitimacyProof}</p>
              <p>Description: {selectedCompanyDetails.description}</p>
            </div>
            <div className="pdf-actions">
              <button className="accept-button" onClick={() => handleAcceptCompany(selectedCompanyId)}>
                <CheckCircle size={16} /> Accept
              </button>
              <button className="reject-button" onClick={() => handleRejectCompany(selectedCompanyId)}>
                <XCircle size={16} /> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Companies
