"use client"

import { useState, useRef, useEffect } from "react"
import { X, AlertTriangle, Edit, Save, Download, Menu, ArrowLeft } from "lucide-react" // Added ArrowLeft

function Evaluations() {
  const [jspdfLoaded, setJspdfLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMajorFilter, setSelectedMajorFilter] = useState("All")
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")
  const [selectedReport, setSelectedReport] = useState(null)
  const [editingClarification, setEditingClarification] = useState(false)
  const [clarificationText, setClarificationText] = useState("")
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const filterPopupRef = useRef(null)
  const clarificationTextareaRef = useRef(null);
  const [currentSelectedStatusInDetail, setCurrentSelectedStatusInDetail] = useState("");

  const [reports, setReports] = useState([
    {
      id: 1, type: "evaluation", title: "Omar Ahmed - Q1 Evaluation", studentName: "Omar Ahmed", studentId: "S001", major: "Engineering", company: "TechCorp", supervisor: "Sarah Williams", supervisorPosition: "Main Supervisor", startDate: "2023-05-15", endDate: "2023-08-10", submissionDate: "2023-08-15", status: "accepted",
      contentBody: "This report evaluates the performance and learning outcomes of the internship. The student has demonstrated excellent progress throughout the internship period. The student has successfully applied knowledge from their coursework to real-world scenarios.", performance: { technical: 4.5, communication: 4.0, teamwork: 4.2, problemSolving: 4.8, overall: 4.4 }, strengths: "Proactive, quick learner.", areasForImprovement: "Time management.", comments: "-"
    },
    {
      id: 2, type: "internship", title: "Marawan Mahmoud - Internship Report", studentName: "Marawan Mahmoud", studentId: "S002", major: "Engineering", company: "BuildIt Ltd.", supervisor: "Ali Hassan", supervisorPosition: "Project Lead", startDate: "2023-06-01", endDate: "2023-09-01", submissionDate: "2023-09-10", status: "rejected", clarification: "Missing required documents: Supervisor signature and weekly logs.",
      contentBody: "Detailed my activities and projects during the internship at BuildIt Ltd.", tasks: ["Site supervision", "Blueprint analysis"], skills: ["AutoCAD", "Project Planning"], challenges: "Coordination with multiple teams.", learnings: "Practical application of engineering principles.", feedback: "Good effort.", comments: "Missing required documents"
    },
    {
      id: 3, type: "evaluation", title: "Zain Mohamed - Mid-term Eval", studentName: "Zain Mohamed", studentId: "S003", major: "Business Informatics", company: "FinanceLLC", supervisor: "Layla Adel", supervisorPosition: "Finance Manager", startDate: "2023-07-01", endDate: "2023-10-01", submissionDate: "2023-08-15", status: "pending",
      contentBody: "Mid-term evaluation focusing on data analysis skills and business process understanding.", performance: { technical: 4.0, communication: 4.2, teamwork: 4.5, problemSolving: 3.9, overall: 4.1 }, strengths: "Good data interpretation.", areasForImprovement: "Presentation skills.", comments: "-"
    },
    {
      id: 4, type: "internship", title: "Youmna Ali - Design Portfolio", studentName: "Youmna Ali", studentId: "S004", major: "Business Informatics", company: "Creative Solutions", supervisor: "Nadia Gamal", supervisorPosition: "Art Director", startDate: "2023-05-20", endDate: "2023-08-20", submissionDate: "2023-08-25", status: "flagged", clarification: "Needs to update contact information on the report cover page.",
      contentBody: "A collection of UI/UX projects developed for Creative Solutions.", tasks: ["User personas", "Wireframing"], skills: ["Figma", "Adobe XD"], challenges: "Balancing user needs with business goals.", learnings: "Iterative design process.", feedback: "Visually appealing work.", comments: "Needs to update contact information"
    },
    {
      id: 5, studentName: "Adham Ashraf", studentId: "S005", major: "Pharmacy", status: "rejected", comments: "Incomplete application" , type: "evaluation", title: "Adham Ashraf - Pharmacy Eval", company: "PharmaCo", supervisor: "Dr. Ezzat", supervisorPosition: "Head Pharmacist", startDate: "2023-01-01", endDate: "2023-03-31", submissionDate: "2023-04-05", contentBody: "Evaluation of practical skills in a pharmacy setting.", performance: { technical: 3.5, communication: 4.0, teamwork: 3.8, problemSolving: 3.2, overall: 3.6 }, clarification: "Application form incomplete."
    },
    {
      id: 6, studentName: "Sara Hassan", studentId: "S006", major: "Engineering", status: "pending", comments: "-", type: "internship", title: "Sara Hassan - Civil Eng Report", company: "ConstructX", supervisor: "Eng. Tarek", supervisorPosition: "Site Manager", startDate: "2023-02-15", endDate: "2023-05-15", submissionDate: "2023-05-20", contentBody: "Report on civil engineering project X."
    },
    {
      id: 7, studentName: "Ahmed Mahmoud", studentId: "S007", major: "Engineering", status: "pending", comments: "-", type: "evaluation", title: "Ahmed Mahmoud - Eval", company: "Innovatech", supervisor: "Dr. Mona", supervisorPosition: "R&D Lead", startDate: "2023-03-01", endDate: "2023-06-01", submissionDate: "2023-06-15", contentBody: "Assessment of research capabilities.", performance: { technical: 4.1, communication: 4.3, teamwork: 4.0, problemSolving: 4.5, overall: 4.2 }
    },
    {
      id: 8, studentName: "Laila Kamal", studentId: "S008", major: "Applied Arts", status: "accepted", comments: "-", type: "internship", title: "Laila Kamal - Portfolio", company: "Artisan Studio", supervisor: "Ms. Dina", supervisorPosition: "Studio Head", startDate: "2023-04-01", endDate: "2023-07-01", submissionDate: "2023-07-10", contentBody: "Showcase of applied arts projects."
    },
    {
      id: 9, studentName: "Karim Nader", studentId: "S009", major: "Business Informatics", status: "flagged", comments: "Missing supervisor information", type: "evaluation", title: "Karim Nader - BI Eval", company: "Data Driven Inc.", supervisor: "Mr. Omar", supervisorPosition: "Analytics Manager", startDate: "2023-05-01", endDate: "2023-08-01", submissionDate: "2023-08-15", contentBody: "Review of BI project contribution.", clarification: "Supervisor signature missing on page 3.", performance: { technical: 4.6, communication: 4.1, teamwork: 4.4, problemSolving: 4.7, overall: 4.45 }
    },
    {
      id: 10, studentName: "Nour Samy", studentId: "S010", major: "Engineering", status: "pending", comments: "-", type: "internship", title: "Nour Samy - Eng. Report", company: "Mech Solutions", supervisor: "Eng. Farid", supervisorPosition: "Lead Mechanical Eng.", startDate: "2023-06-01", endDate: "2023-09-01", submissionDate: "2023-09-15", contentBody: "Report on mechanical design project."
    }
  ])

  useEffect(() => {
    const updatedReports = reports.map((report) => {
      if ((report.status === "flagged" || report.status === "rejected") && !report.clarification) {
        return { ...report, clarification: "Additional information or corrections are required for this submission. Please review." };
      }
      return report;
    });
    if (JSON.stringify(reports) !== JSON.stringify(updatedReports)) {
        setReports(updatedReports);
    }

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    script.async = true
    script.onload = () => setJspdfLoaded(true)
    document.body.appendChild(script)

    const handleClickOutside = (event) => {
      if (showFilterPopup && filterPopupRef.current && !filterPopupRef.current.contains(event.target)) {
        const filterButton = document.querySelector(".evaluations-filter-button");
        if (filterButton && filterButton.contains(event.target)) return;
        setShowFilterPopup(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [reports, showFilterPopup]);

  const filteredReports = reports.filter((report) => {
    const lowerSearchQuery = searchQuery.toLowerCase();
    if (searchQuery &&
        !report.studentName.toLowerCase().includes(lowerSearchQuery) &&
        !report.major.toLowerCase().includes(lowerSearchQuery) &&
        !(report.title && report.title.toLowerCase().includes(lowerSearchQuery)) &&
        !(report.company && report.company.toLowerCase().includes(lowerSearchQuery)) &&
        !(report.comments && report.comments.toLowerCase().includes(lowerSearchQuery))) {
        return false;
    }
    if (selectedMajorFilter !== "All" && report.major !== selectedMajorFilter) return false
    if (selectedStatusFilter !== "All" && report.status.toLowerCase() !== selectedStatusFilter.toLowerCase()) return false
    return true
  })

  const uniqueMajors = ["All", ...new Set(reports.map((report) => report.major).filter(Boolean))].sort()
  const statusOptionsForFilter = ["All", "Accepted", "Pending", "Flagged", "Rejected"]
  const statusOptionsForDetail = ["Accepted", "Rejected", "Flagged", "Pending"];


  const handleViewDetailsClick = (report) => {
    setSelectedReport(report);
    setCurrentSelectedStatusInDetail(report.status);
    setClarificationText(report.clarification || "");
    setEditingClarification(false);
  }

  const handleBackToList = () => {
    setSelectedReport(null);
  }

  const handleSaveStatusInDetail = () => {
    if (!selectedReport || !currentSelectedStatusInDetail) return;
    const needsClarification = currentSelectedStatusInDetail === 'flagged' || currentSelectedStatusInDetail === 'rejected';

    const updatedReports = reports.map((r) =>
      r.id === selectedReport.id ? {
        ...r,
        status: currentSelectedStatusInDetail,
        clarification: needsClarification ? clarificationText : (r.status === 'flagged' || r.status === 'rejected' ? r.clarification : "")
      } : r
    );
    setReports(updatedReports);
    setSelectedReport(prev => ({
        ...prev,
        status: currentSelectedStatusInDetail,
        clarification: needsClarification ? clarificationText : (prev.status === 'flagged' || prev.status === 'rejected' ? prev.clarification : "")
    }));
    console.log(`Status for ${selectedReport.studentName} updated to ${currentSelectedStatusInDetail}`);
  };


  const handleEditClarification = () => {
    setEditingClarification(true);
    setTimeout(() => {
      clarificationTextareaRef.current?.focus();
    }, 0);
  };

  const handleSaveClarificationDirectly = () => {
    if (!selectedReport) return;
    const updatedReports = reports.map((r) =>
      r.id === selectedReport.id ? { ...r, clarification: clarificationText } : r
    );
    setReports(updatedReports);
    setSelectedReport(prev => ({ ...prev, clarification: clarificationText }));
    setEditingClarification(false);
    console.log(`Clarification for ${selectedReport.studentName} saved.`);
  };


  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "status-badge pending";
      case "flagged": return "status-badge flagged";
      case "rejected": return "status-badge rejected";
      case "accepted": return "status-badge accepted";
      default: return "status-badge";
    }
  }

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<span key={i} className="star full">★</span>);
      else if (i === fullStars && hasHalfStar) stars.push(<span key={i} className="star half">★</span>);
      else stars.push(<span key={i} className="star empty">☆</span>);
    }
    return <div className="rating-stars">{stars} <span className="rating-value">({rating?.toFixed(1) || 'N/A'})</span></div>;
  };

  const generateReportPDF = (report) => {
    if (!jspdfLoaded || !window.jspdf) {
      alert("PDF generation library is not yet loaded. Please try again in a moment.");
      return
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const leftMargin = 15;
    const contentWidth = doc.internal.pageSize.getWidth() - 2 * leftMargin;
    let yPos = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(report.title || "Report/Evaluation", doc.internal.pageSize.getWidth() / 2, yPos, { align: "center" });
    yPos += 15;

    doc.setFillColor(95, 40, 120);
    doc.rect(leftMargin, yPos - 5, 10, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("SCAD", leftMargin + 5, yPos, { align: "center" });
    doc.setTextColor(0, 0, 0);
    yPos += 15;


    const addDetailPair = (label, value) => {
      if (yPos > 270) { doc.addPage(); yPos = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(label, leftMargin, yPos);
      doc.setFont("helvetica", "normal");
      const valueLines = doc.splitTextToSize(String(value || "-"), contentWidth - 30);
      doc.text(valueLines, leftMargin + 35, yPos);
      yPos += (valueLines.length * 6) + 2;
    };

    const addSectionTitle = (title) => {
      if (yPos > 265) { doc.addPage(); yPos = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title, leftMargin, yPos);
      yPos += 7;
    };

    const addParagraph = (text) => {
      if (!text) return;
      if (yPos > 260) { doc.addPage(); yPos = 20; }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, leftMargin, yPos);
      yPos += lines.length * 6 + 4;
    };

    addSectionTitle("General Information");
    addDetailPair("Student Name:", report.studentName);
    addDetailPair("Student ID:", report.studentId);
    addDetailPair("Major:", report.major);
    addDetailPair("Company:", report.company);
    addDetailPair("Supervisor:", `${report.supervisor} (${report.supervisorPosition || 'N/A'})`);
    addDetailPair("Internship Dates:", `${report.startDate} to ${report.endDate}`);
    addDetailPair("Submission Date:", report.submissionDate);
    addDetailPair("Status:", report.status.charAt(0).toUpperCase() + report.status.slice(1));
    yPos += 5;

    if ((report.status === "flagged" || report.status === "rejected") && report.clarification) {
      addSectionTitle("Clarification Provided/Needed");
      addParagraph(report.clarification);
    }

    if (report.type === "internship") {
      addSectionTitle("Internship Report Details");
      addParagraph(`Content Summary: ${report.contentBody || report.content || "-"}`);
      if (report.tasks && report.tasks.length > 0) {
        addParagraph(`Tasks Performed: \n${report.tasks.map(t => `  • ${t}`).join('\n')}`);
      }
      if (report.skills && report.skills.length > 0) {
        addParagraph(`Skills Developed/Used: ${report.skills.join(', ')}`);
      }
      addParagraph(`Challenges: ${report.challenges || "-"}`);
      addParagraph(`Learnings: ${report.learnings || "-"}`);
      addParagraph(`Student Feedback: ${report.feedback || "-"}`);
    } else if (report.type === "evaluation" && report.performance) {
      addSectionTitle("Performance Evaluation");
      Object.entries(report.performance).forEach(([key, value]) => {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        addDetailPair(`${formattedKey}:`, `${value?.toFixed(1) || 'N/A'} / 5.0`);
      });
      yPos -= 2;
      addParagraph(`Strengths: ${report.strengths || "-"}`);
      addParagraph(`Areas for Improvement: ${report.areasForImprovement || "-"}`);
      addParagraph(`Supervisor Comments: ${report.comments || "-"}`);
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() / 2, 287, { align: "center" });
        doc.text(`Generated by SCAD Internship Portal | ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 292, {align: "center"});
    }

    doc.save(`${report.type}_${report.studentName.replace(/\s+/g, "_")}_${report.id}.pdf`);
  };


  const handleResetFilters = () => {
    setSelectedMajorFilter("All");
    setSelectedStatusFilter("All");
  };
  const handleApplyFilters = () => {
    setShowFilterPopup(false);
  };


  if (selectedReport) {
    const reportTitle = selectedReport.type === "evaluation" ? "Evaluation Report" : "Internship Report";
    return (
      <div className="view-report-container">
        <button onClick={handleBackToList} className="back-button">
          <ArrowLeft size={18} strokeWidth={2.5}/> Back to List
        </button>
        <h1 className="view-report-title">{`View ${reportTitle}`}</h1>

        <div className="report-card-detailed">
          <h2 className="report-card-detailed-title">{reportTitle}</h2>
          <div className="report-card-detailed-grid">
            <div><p className="detail-label">Student</p><p className="detail-value">{selectedReport.studentName} ({selectedReport.studentId})</p></div>
            <div><p className="detail-label">Main Supervisor</p><p className="detail-value">{selectedReport.supervisor} ({selectedReport.supervisorPosition || 'N/A'})</p></div>
            <div><p className="detail-label">Major</p><p className="detail-value">{selectedReport.major}</p></div>
            <div><p className="detail-label">Internship Dates</p><p className="detail-value">{selectedReport.startDate} - {selectedReport.endDate}</p></div>
            <div><p className="detail-label">Company</p><p className="detail-value">{selectedReport.company}</p></div>
            <div><p className="detail-label">Submission Date</p><p className="detail-value">{selectedReport.submissionDate}</p></div>
          </div>
          <div className="report-card-detailed-body-section">
            <h3 className="body-title">Body / Summary</h3>
            <p className="body-content">
              {selectedReport.contentBody || selectedReport.content || "No detailed content provided."}
            </p>
          </div>

          {selectedReport.type === "internship" && (
            <>
              {selectedReport.tasks && selectedReport.tasks.length > 0 && (
                <div className="report-card-detailed-body-section"><h3 className="body-title">Tasks Performed</h3><ul className="tasks-list-detail">{selectedReport.tasks.map((t, i) => <li key={i}>{t}</li>)}</ul></div>
              )}
              {selectedReport.skills && selectedReport.skills.length > 0 && (
                <div className="report-card-detailed-body-section"><h3 className="body-title">Skills Developed/Used</h3><p className="body-content">{selectedReport.skills.join(', ')}</p></div>
              )}
               {selectedReport.challenges && <div className="report-card-detailed-body-section"><h3 className="body-title">Challenges</h3><p className="body-content">{selectedReport.challenges}</p></div>}
               {selectedReport.learnings && <div className="report-card-detailed-body-section"><h3 className="body-title">Key Learnings</h3><p className="body-content">{selectedReport.learnings}</p></div>}
               {selectedReport.feedback && <div className="report-card-detailed-body-section"><h3 className="body-title">Student Feedback</h3><p className="body-content">{selectedReport.feedback}</p></div>}
            </>
          )}

          {selectedReport.type === "evaluation" && selectedReport.performance && (
            <div className="report-card-detailed-body-section">
              <h3 className="body-title">Performance Ratings</h3>
              <div className="performance-grid-detail">
                {Object.entries(selectedReport.performance).map(([key, value]) => (
                  <div key={key} className="performance-item-detail-card">
                    <span className="performance-key-detail">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                    {renderRatingStars(value)}
                  </div>
                ))}
              </div>
              {selectedReport.strengths && <><h4 className="sub-body-title">Strengths:</h4><p className="body-content">{selectedReport.strengths}</p></>}
              {selectedReport.areasForImprovement && <><h4 className="sub-body-title">Areas for Improvement:</h4><p className="body-content">{selectedReport.areasForImprovement}</p></>}
              {selectedReport.comments && <><h4 className="sub-body-title">Overall Supervisor Comments:</h4><p className="body-content">{selectedReport.comments}</p></>}
            </div>
          )}
        </div>

        {(selectedReport.status === "flagged" || selectedReport.status === "rejected") && (
            <div className="report-card-detailed clarification-module">
                <div className="clarification-module-header">
                    <h3 className="body-title">Clarification for {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)} Status</h3>
                    {!editingClarification ? (
                        <button className="edit-clarification-btn-detail" onClick={handleEditClarification}>
                            <Edit size={16} /> Edit Clarification
                        </button>
                    ) : (
                        <button className="save-clarification-btn-detail" onClick={handleSaveClarificationDirectly}>
                            <Save size={16} /> Save Clarification
                        </button>
                    )}
                </div>
                {!editingClarification ? (
                    <p className="clarification-text-detail">{clarificationText || "No clarification provided yet. Click 'Edit' to add."}</p>
                ) : (
                    <textarea
                        ref={clarificationTextareaRef}
                        className="clarification-textarea-detail"
                        value={clarificationText}
                        onChange={(e) => setClarificationText(e.target.value)}
                        placeholder="Enter clarification or reason for the current status..."
                    />
                )}
            </div>
        )}

        <div className="report-card-detailed set-status-module">
          <h2 className="report-card-detailed-title">Set Status</h2>
          <div className="status-options-detail">
            {statusOptionsForDetail.map((statusVal) => (
              <label key={statusVal} className={`status-radio-label ${currentSelectedStatusInDetail === statusVal.toLowerCase() ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="reportStatusDetail"
                  value={statusVal.toLowerCase()}
                  checked={currentSelectedStatusInDetail === statusVal.toLowerCase()}
                  onChange={(e) => setCurrentSelectedStatusInDetail(e.target.value)}
                />
                <span className="status-radio-text">{statusVal}</span>
              </label>
            ))}
          </div>
          <button onClick={handleSaveStatusInDetail} className="save-status-button">
            Save Status
          </button>
        </div>
        <div className="report-details-page-footer">
            <button className="download-pdf-button-page-footer" onClick={() => generateReportPDF(selectedReport)}>
                <Download size={16} /> Download as PDF
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluations-container-list">
        <div className="evaluations-header-list">
            <h2>Evaluations & Reports</h2>
            <button className="evaluations-filter-button" onClick={() => setShowFilterPopup(true)}>
                <Menu size={18} /> Filters
            </button>
        </div>

        {showFilterPopup && (
            <div className="cs-filter-modal-overlay" onClick={() => setShowFilterPopup(false)}>
                <div className="cs-filter-modal" ref={filterPopupRef} onClick={e => e.stopPropagation()}>
                    <div className="cs-filter-modal-header">
                        <h2>Filters</h2>
                        <button className="cs-close-button" onClick={() => setShowFilterPopup(false)}>
                            <X size={18} />
                        </button>
                    </div>
                    <div className="cs-filter-modal-content">
                        <div className="cs-filter-section">
                            <h3>Status</h3>
                            <div className="cs-filter-options">
                                {statusOptionsForFilter.map((status) => (
                                    <button
                                        key={status}
                                        className={`cs-filter-option${selectedStatusFilter === status ? " cs-selected" : ""}`}
                                        onClick={() => setSelectedStatusFilter(status)}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="cs-filter-section">
                            <h3>Major</h3>
                            <div className="cs-filter-options">
                                {uniqueMajors.map((major) => (
                                    <button
                                        key={major}
                                        className={`cs-filter-option${selectedMajorFilter === major ? " cs-selected" : ""}`}
                                        onClick={() => setSelectedMajorFilter(major)}
                                    >
                                        {major}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="cs-filter-actions">
                        <button className={`cs-reset-button`} onClick={handleResetFilters}>
                            Reset
                        </button>
                        <button className="cs-apply-button" onClick={handleApplyFilters}>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="evaluations-table-container">
            <table className="evaluations-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Major</th>
                        <th>Status</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.studentName}</td>
                                <td>{report.major}</td>
                                <td>
                                    <span className={getStatusBadgeClass(report.status)}>
                                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                    </span>
                                </td>
                                <td className="comment-cell">{report.comments || "-"}</td>
                                <td>
                                    {report.status === "pending" ? (
                                        <button
                                            className="action-button review-button" // Correct class for "Review"
                                            onClick={() => handleViewDetailsClick(report)}
                                        >
                                            Review
                                        </button>
                                    ) : (
                                        <button
                                            className="action-button view-details-button" // Correct class for "View Details"
                                            onClick={() => handleViewDetailsClick(report)}
                                        >
                                            View Details
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-results-table">No reports found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Evaluations