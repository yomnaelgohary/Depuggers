"use client"

import { useState, useRef, useEffect } from "react"
import { X, AlertTriangle, Edit, Save, Download, Menu } from "lucide-react"

function Evaluations() {
  const [jspdfLoaded, setJspdfLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMajor, setSelectedMajor] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedReport, setSelectedReport] = useState(null)
  const [reportType, setReportType] = useState(null) // To store 'internship' or 'evaluation'
  const [editingClarification, setEditingClarification] = useState(false)
  const [clarificationText, setClarificationText] = useState("")
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const filterPopupRef = useRef(null)
  const clarificationTextareaRef = useRef(null); // Ref for the textarea

  const [reports, setReports] = useState([
    {
      id: 1,
      type: "internship",
      title: "Software Engineering Internship Report",
      studentName: "Alice Smith",
      studentId: 101,
      major: "Computer Science",
      company: "Dell Technologies",
      supervisor: "John Will",
      supervisorPosition: "Software Engineer",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      submissionDate: "2023-09-15",
      status: "accepted",
      content: "This report details my experience as a Software Engineering Intern at Dell Technologies...",
      tasks: [
        "Developed new features for the customer portal",
        "Fixed bugs in the existing codebase",
        "Participated in code reviews and team meetings",
      ],
      skills: ["Java", "Spring Boot", "Git", "Agile"],
      challenges: "The biggest challenge was understanding the large codebase and the company's development workflow.",
      learnings: "I learned how to work in a large team, how to communicate effectively, and how to manage my time.",
      feedback: "The internship was a great learning experience. I would recommend it to other students.",
    },
    {
      id: 2,
      type: "evaluation",
      title: "Data Science Internship Evaluation",
      studentName: "Bob Johnson",
      studentId: 102,
      major: "Data Science",
      company: "IBM",
      supervisor: "John Smith",
      supervisorPosition: "Senior Data Scientist",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      submissionDate: "2023-09-05",
      status: "pending",
      performance: {
        technical: 4.5,
        communication: 4.0,
        teamwork: 4.2,
        problemSolving: 4.8,
        overall: 4.4,
      },
      strengths: "Strong analytical skills and quick learner",
      areasForImprovement: "Could improve documentation practices",
      comments: "Bob was an excellent intern who contributed significantly to our team's projects.",
    },
    {
      id: 3,
      type: "internship",
      title: "UX Design Internship Report",
      studentName: "Diana Lee",
      studentId: 104,
      major: "Design",
      company: "Microsoft",
      supervisor: "Emily Parker",
      supervisorPosition: "UX Design Lead",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      submissionDate: "2023-08-20",
      status: "flagged",
      clarification:
        "The report lacks detailed examples of your design process and user research methods. Please provide more specific information about the methodologies used and include visual examples of your work.",
      content: "This report summarizes my experience as a UX Design Intern at Microsoft...",
      tasks: [
        "Designed user interfaces for mobile applications",
        "Conducted user research and usability testing",
        "Created wireframes and prototypes",
      ],
      skills: ["Figma", "User Research", "Prototyping", "UI/UX"],
      challenges: "The main challenge was adapting to the fast-paced environment and tight deadlines.",
      learnings: "I learned how to work efficiently under pressure and how to take constructive criticism.",
      feedback: "The internship provided valuable industry experience and helped me grow as a designer.",
    },
    {
      id: 4,
      type: "internship",
      title: "Cloud Engineering Internship Report",
      studentName: "Michael Chen",
      studentId: 105,
      major: "Computer Engineering",
      company: "Amazon",
      supervisor: "Sarah Johnson",
      supervisorPosition: "Cloud Solutions Architect",
      startDate: "2023-05-15",
      endDate: "2023-08-15",
      submissionDate: "2023-09-01",
      status: "rejected",
      clarification:
        "The report does not meet our documentation standards. The technical implementation details are insufficient, and there is no evidence of the claimed AWS architecture you worked on. Please revise with proper technical documentation and include diagrams of your infrastructure design.",
      content: "This report covers my internship experience in the Cloud Engineering team at Amazon...",
      tasks: [
        "Designed and implemented serverless architectures",
        "Optimized cloud resource utilization",
        "Automated deployment pipelines",
        "Participated in on-call rotations",
      ],
      skills: ["AWS", "Terraform", "Python", "CI/CD", "Docker"],
      challenges:
        "The most significant challenge was understanding the scale and complexity of Amazon's infrastructure and ensuring my solutions were scalable and resilient.",
      learnings:
        "I gained deep knowledge of cloud architecture principles, cost optimization strategies, and DevOps practices in a large-scale environment.",
      feedback: "The internship was challenging but rewarding. I would have appreciated more structured mentorship.",
    },
    {
      id: 5,
      type: "evaluation",
      title: "Business Consulting Internship Evaluation",
      studentName: "Emily Rodriguez",
      studentId: 106,
      major: "Business Administration",
      company: "Deloitte",
      supervisor: "Michael Thompson",
      supervisorPosition: "Senior Consultant",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      submissionDate: "2023-09-10",
      status: "accepted",
      performance: {
        technical: 4.2,
        communication: 4.7,
        teamwork: 4.5,
        problemSolving: 4.3,
        overall: 4.4,
      },
      strengths:
        "Exceptional communication skills and ability to present complex ideas clearly to clients. Strong analytical thinking and attention to detail.",
      areasForImprovement:
        "Could benefit from developing deeper technical knowledge in data analysis tools and financial modeling.",
      comments:
        "Emily was an outstanding intern who quickly adapted to our fast-paced environment. She demonstrated remarkable professionalism and contributed valuable insights to client projects.",
    },
    {
      id: 6,
      type: "evaluation",
      title: "Automotive Engineering Internship Evaluation",
      studentName: "James Wilson",
      studentId: 107,
      major: "Mechanical Engineering",
      company: "Tesla",
      supervisor: "Elena Vasquez",
      supervisorPosition: "Lead Engineer",
      startDate: "2023-05-01",
      endDate: "2023-08-15",
      submissionDate: "2023-08-30",
      status: "pending",
      performance: {
        technical: 4.8,
        communication: 3.9,
        teamwork: 4.0,
        problemSolving: 4.9,
        overall: 4.5,
      },
      strengths:
        "Exceptional technical skills and innovative problem-solving approach. Demonstrated deep understanding of mechanical systems and manufacturing processes.",
      areasForImprovement:
        "Should work on communication skills, particularly when explaining technical concepts to non-technical team members.",
      comments:
        "James showed remarkable talent in engineering design and optimization. His prototype modifications resulted in a 15% efficiency improvement that will be implemented in future models.",
    },
  ])

  useEffect(() => {
    const updatedReports = reports.map((report) => {
      const updatedReport = { ...report }
      if ((report.status === "flagged" || report.status === "rejected") && !report.clarification) {
        updatedReport.clarification = "Additional information or corrections are needed for this report. Please review and resubmit."
      }
      return updatedReport
    });
    if (JSON.stringify(reports) !== JSON.stringify(updatedReports)) { // Prevent infinite loop
        setReports(updatedReports);
    }

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    script.async = true
    script.onload = () => setJspdfLoaded(true)
    document.body.appendChild(script)

    const handleClickOutside = (event) => {
      if (showFilterPopup && filterPopupRef.current && !filterPopupRef.current.contains(event.target)) {
        // Check if the click is on the filter button itself to prevent immediate closing
        const filterButton = document.querySelector(".filter-button"); // Be more specific if needed
        if (filterButton && filterButton.contains(event.target)) {
            return;
        }
        setShowFilterPopup(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showFilterPopup) setShowFilterPopup(false)
      if (event.key === "Enter" && showFilterPopup) handleApplyFilters()
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [reports, showFilterPopup]) // Added reports to dependency array for initial clarification update

  const filteredReports = reports.filter((report) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTitle = report.title.toLowerCase().includes(query)
      const matchesStudent = report.studentName.toLowerCase().includes(query)
      const matchesCompany = report.company.toLowerCase().includes(query)
      if (!matchesTitle && !matchesStudent && !matchesCompany) return false
    }
    if (selectedMajor !== "All" && report.major !== selectedMajor) return false
    if (selectedStatus !== "All" && report.status.toLowerCase() !== selectedStatus.toLowerCase()) return false
    return true
  })

  const uniqueMajors = ["All", ...new Set(reports.map((report) => report.major).filter(Boolean))].sort()
  const statusOptions = ["All", "Accepted", "Pending", "Flagged", "Rejected"]

  const handleReportClick = (report) => {
    setSelectedReport(report)
    setReportType(report.type) // Set the report type
    setClarificationText(report.clarification || "")
    setEditingClarification(false)
  }

  const closeReportDetails = () => {
    setSelectedReport(null)
    setReportType(null)
    setEditingClarification(false)
  }

  const updateReportStatus = (reportId, newStatus) => {
    const updatedReports = reports.map((report) => (report.id === reportId ? { ...report, status: newStatus } : report))
    setReports(updatedReports)
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, status: newStatus })
    }
  }

  const handleEditClarification = () => {
    setEditingClarification(true)
    setTimeout(() => {
      if (clarificationTextareaRef.current) clarificationTextareaRef.current.focus()
    }, 0)
  }

  const handleSaveClarification = (reportId) => {
    const updatedReports = reports.map((report) =>
      report.id === reportId ? { ...report, clarification: clarificationText } : report,
    )
    setReports(updatedReports)
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, clarification: clarificationText })
    }
    setEditingClarification(false)
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending": return "status-badge pending"
      case "flagged": return "status-badge flagged"
      case "rejected": return "status-badge rejected"
      case "accepted": return "status-badge accepted"
      default: return "status-badge"
    }
  }

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<span key={i} className="star full">★</span>)
      else if (i === fullStars && hasHalfStar) stars.push(<span key={i} className="star half">★</span>)
      else stars.push(<span key={i} className="star empty">☆</span>)
    }
    return (
      <div className="rating-stars">
        {stars} <span className="rating-value">({rating.toFixed(1)})</span>
      </div>
    )
  }

  const generateReportPDF = (report) => {
    if (!jspdfLoaded || !window.jspdf) {
      console.error("jsPDF library is not loaded.")
      alert("PDF generation library is not yet loaded. Please try again in a moment.");
      return
    }
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text(`${report.title}`, 105, 20, { align: "center" })

    // SCAD Logo Placeholder
    doc.setFillColor(95, 40, 120); // SCAD Purple
    doc.rect(15, 25, 15, 15, "F"); // x, y, width, height
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("SCAD", 22.5, 34, { align: "center" }); // Adjust text position
    doc.setTextColor(0, 0, 0); // Reset text color

    let yPosition = 55; // Start Y position lower
    const leftMargin = 20;
    const contentWidth = 170;

    const addSection = (title, content, isList = false) => {
        if (yPosition > 260) { // Check for page break
            doc.addPage();
            yPosition = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(title, leftMargin, yPosition);
        yPosition += 8;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        if (isList && Array.isArray(content)) {
            content.forEach(item => {
                if (yPosition > 270) { doc.addPage(); yPosition = 20; }
                const itemLines = doc.splitTextToSize(`• ${item}`, contentWidth - 5);
                doc.text(itemLines, leftMargin + 5, yPosition);
                yPosition += itemLines.length * 7;
            });
        } else if (typeof content === 'string') {
            const lines = doc.splitTextToSize(content, contentWidth);
            if (yPosition + lines.length * 7 > 270) { doc.addPage(); yPosition = 20;}
            doc.text(lines, leftMargin, yPosition);
            yPosition += lines.length * 7;
        }
        yPosition += 5; // Spacing after section
    };


    addSection("Student Information", `Name: ${report.studentName} (ID: ${report.studentId})\nMajor: ${report.major}\nCompany: ${report.company}\nSupervisor: ${report.supervisor} (${report.supervisorPosition})\nInternship Period: ${report.startDate} to ${report.endDate}\nSubmission Date: ${report.submissionDate}\nStatus: ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}`);

    if ((report.status === "flagged" || report.status === "rejected") && report.clarification) {
        addSection("Clarification Needed", report.clarification);
    }

    if (report.type === "internship") {
        addSection("Report Content Summary", report.content);
        addSection("Tasks Performed", report.tasks, true);
        addSection("Skills Developed/Used", report.skills.join(', '));
        addSection("Challenges Faced", report.challenges);
        addSection("Key Learnings", report.learnings);
        addSection("Student Feedback", report.feedback);
    } else if (report.type === "evaluation") {
        let performanceDetails = `Technical Skills: ${report.performance.technical.toFixed(1)}/5.0
Communication: ${report.performance.communication.toFixed(1)}/5.0
Teamwork: ${report.performance.teamwork.toFixed(1)}/5.0
Problem Solving: ${report.performance.problemSolving.toFixed(1)}/5.0
Overall: ${report.performance.overall.toFixed(1)}/5.0`;
        addSection("Performance Evaluation", performanceDetails);
        addSection("Strengths", report.strengths);
        addSection("Areas for Improvement", report.areasForImprovement);
        addSection("Supervisor Comments", report.comments);
    }


    // Footer on each page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);
        doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: "center" });
        doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 290, {align: "center"});
    }

    const reportTypeString = report.type === "internship" ? "Internship_Report" : "Evaluation_Report"
    doc.save(`${reportTypeString}_${report.studentName.replace(/\s+/g, "_")}_${report.id}.pdf`)
  }

  const handleResetFilters = () => {
    setSelectedMajor("All")
    setSelectedStatus("All")
    // setSearchQuery(""); // Optionally reset search query
  }

  const handleApplyFilters = () => {
    setShowFilterPopup(false) // Close popup when applying
  }

  const renderInternshipReport = (report) => {
    return (
      <div className="report-details">
        <div className="report-details-header">
          <h2>{report.title}</h2>
          <div className="report-status-controls">
            <span className={getStatusBadgeClass(report.status)}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </span>
            <div className="status-actions">
              <button className={`status-button pending ${report.status === "pending" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "pending")}>Pending</button>
              <button className={`status-button flagged ${report.status === "flagged" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "flagged")}>Flag</button>
              <button className={`status-button rejected ${report.status === "rejected" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "rejected")}>Reject</button>
              <button className={`status-button accepted ${report.status === "accepted" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "accepted")}>Accept</button>
            </div>
          </div>
          <div className="report-actions">
            <button className="modal-close-button" onClick={closeReportDetails}>
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="report-details-content">
          {(report.status === "flagged" || report.status === "rejected") && (
            <div className="clarification-section">
              <div className="clarification-header">
                <h3><AlertTriangle size={18} className="clarification-icon" /> Clarification for {report.status === "flagged" ? "Flag" : "Rejection"}</h3>
                {!editingClarification ? (
                  <button className="edit-clarification-button" onClick={handleEditClarification}><Edit size={16} /> Edit</button>
                ) : (
                  <button className="save-clarification-button" onClick={() => handleSaveClarification(report.id)}><Save size={16} /> Save Clarification</button>
                )}
              </div>
              {!editingClarification ? (
                <div className="clarification-text">{report.clarification || "No clarification provided."}</div>
              ) : (
                <textarea ref={clarificationTextareaRef} className="clarification-textarea" value={clarificationText} onChange={(e) => setClarificationText(e.target.value)} placeholder="Enter clarification reason here..." />
              )}
            </div>
          )}
          <div className="report-meta">
            <div className="meta-item"><h4>Student</h4><p>{report.studentName} (ID: {report.studentId})</p></div>
            <div className="meta-item"><h4>Major</h4><p>{report.major}</p></div>
            <div className="meta-item"><h4>Company</h4><p>{report.company}</p></div>
            <div className="meta-item"><h4>Supervisor</h4><p>{report.supervisor} ({report.supervisorPosition})</p></div>
          </div>
          <div className="internship-period">
            <div className="period-item"><h4>Start Date</h4><p>{report.startDate}</p></div>
            <div className="period-item"><h4>End Date</h4><p>{report.endDate}</p></div>
            <div className="period-item"><h4>Submission Date</h4><p>{report.submissionDate}</p></div>
          </div>
          <div className="report-section"><h3>Report Content</h3><p>{report.content}</p></div>
          <div className="report-section"><h3>Tasks Performed</h3><ul className="tasks-list">{report.tasks.map((task, index) => (<li key={index}>{task}</li>))}</ul></div>
          <div className="report-section"><h3>Skills Developed</h3><div className="skills-list">{report.skills.map((skill, index) => (<span key={index} className="skill-tag">{skill}</span>))}</div></div>
          <div className="report-section"><h3>Challenges</h3><p>{report.challenges}</p></div>
          <div className="report-section"><h3>Learnings</h3><p>{report.learnings}</p></div>
          <div className="report-section"><h3>Feedback</h3><p>{report.feedback}</p></div>
        </div>
        <div className="report-details-footer">
            <button className="download-pdf-button-footer" onClick={() => generateReportPDF(report)}>
                <Download size={16} /> Download PDF
            </button>
        </div>
      </div>
    )
  }

  const renderEvaluationReport = (report) => {
    return (
      <div className="report-details">
        <div className="report-details-header">
          <h2>{report.title}</h2>
          <div className="report-status-controls">
            <span className={getStatusBadgeClass(report.status)}>
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </span>
            <div className="status-actions">
                <button className={`status-button pending ${report.status === "pending" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "pending")}>Pending</button>
                <button className={`status-button flagged ${report.status === "flagged" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "flagged")}>Flag</button>
                <button className={`status-button rejected ${report.status === "rejected" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "rejected")}>Reject</button>
                <button className={`status-button accepted ${report.status === "accepted" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "accepted")}>Accept</button>
            </div>
          </div>
          <div className="report-actions">
            <button className="modal-close-button" onClick={closeReportDetails}>
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="report-details-content">
          {(report.status === "flagged" || report.status === "rejected") && (
            <div className="clarification-section">
              <div className="clarification-header">
                <h3><AlertTriangle size={18} className="clarification-icon" /> Clarification for {report.status === "flagged" ? "Flag" : "Rejection"}</h3>
                {!editingClarification ? (
                  <button className="edit-clarification-button" onClick={handleEditClarification}><Edit size={16} /> Edit</button>
                ) : (
                  <button className="save-clarification-button" onClick={() => handleSaveClarification(report.id)}><Save size={16} /> Save Clarification</button>
                )}
              </div>
              {!editingClarification ? (
                <div className="clarification-text">{report.clarification || "No clarification provided."}</div>
              ) : (
                <textarea ref={clarificationTextareaRef} className="clarification-textarea" value={clarificationText} onChange={(e) => setClarificationText(e.target.value)} placeholder="Enter clarification reason here..." />
              )}
            </div>
          )}
          <div className="report-meta">
            <div className="meta-item"><h4>Student</h4><p>{report.studentName} (ID: {report.studentId})</p></div>
            <div className="meta-item"><h4>Major</h4><p>{report.major}</p></div>
            <div className="meta-item"><h4>Company</h4><p>{report.company}</p></div>
            <div className="meta-item"><h4>Supervisor</h4><p>{report.supervisor} ({report.supervisorPosition})</p></div>
          </div>
          <div className="internship-period">
            <div className="period-item"><h4>Start Date</h4><p>{report.startDate}</p></div>
            <div className="period-item"><h4>End Date</h4><p>{report.endDate}</p></div>
            <div className="period-item"><h4>Submission Date</h4><p>{report.submissionDate}</p></div>
          </div>
          <div className="report-section"><h3>Performance Evaluation</h3>
            <div className="performance-grid">
              <div className="performance-item"><h4>Technical Skills</h4>{renderRatingStars(report.performance.technical)}</div>
              <div className="performance-item"><h4>Communication</h4>{renderRatingStars(report.performance.communication)}</div>
              <div className="performance-item"><h4>Teamwork</h4>{renderRatingStars(report.performance.teamwork)}</div>
              <div className="performance-item"><h4>Problem Solving</h4>{renderRatingStars(report.performance.problemSolving)}</div>
              <div className="performance-item overall"><h4>Overall Performance</h4>{renderRatingStars(report.performance.overall)}</div>
            </div>
          </div>
          <div className="report-section"><h3>Strengths</h3><p>{report.strengths}</p></div>
          <div className="report-section"><h3>Areas for Improvement</h3><p>{report.areasForImprovement}</p></div>
          <div className="report-section"><h3>Supervisor Comments</h3><p>{report.comments}</p></div>
        </div>
        <div className="report-details-footer">
            <button className="download-pdf-button-footer" onClick={() => generateReportPDF(report)}>
                <Download size={16} /> Download PDF
            </button>
        </div>
      </div>
    )
  }

  const formatReportType = (type, reportType) => { // reportType seems to be the title here, rename for clarity
    if (type === "internship") return "Internship Report";
    if (type === "evaluation") return "Evaluation Report";
    return reportType; // Fallback to title if type is unknown
  };


  return (
    <div className="container">
      {!selectedReport ? (
        <div className="evaluations-section">
          <div className="evaluations-header">
            <h2>Evaluations & Reports</h2>
          </div>
          <div className="search-filter-container">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by title, student name, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <button className="filter-button" onClick={() => setShowFilterPopup(!showFilterPopup)}>
                <Menu size={16} /> Filters
              </button>
              {showFilterPopup && (
                <div className="filter-overlay" onClick={() => setShowFilterPopup(false)}> {/* Allow closing by clicking overlay */}
                  <div className="filter-popup" ref={filterPopupRef} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside popup */}
                    <div className="filter-popup-header">
                      <h3>Filter Reports</h3>
                      <button className="close-popup-button" onClick={() => setShowFilterPopup(false)}>
                        <X size={16} />
                      </button>
                    </div>
                    <div className="filter-content">
                      <div className="filter-section">
                        <h4>Status</h4>
                        <div className="filter-options">
                          {statusOptions.map((status) => (
                            <div
                              key={status}
                              className={`filter-option ${selectedStatus === status ? "selected" : ""}`}
                              onClick={() => setSelectedStatus(status)}
                            >
                              {status}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="filter-section">
                        <h4>Major</h4>
                        <div className="filter-options">
                          {uniqueMajors.map((major) => (
                            <div
                              key={major}
                              className={`filter-option ${selectedMajor === major ? "selected" : ""}`}
                              onClick={() => setSelectedMajor(major)}
                            >
                              {major}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="filter-actions">
                      <button className="reset-button" onClick={handleResetFilters}>Reset</button>
                      <button className="apply-button" onClick={handleApplyFilters}>Apply</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="reports-list">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div key={report.id} className="report-card" onClick={() => handleReportClick(report)}>
                  <div className="report-card-header">
                    <h3>{report.title}</h3>
                    <span className={getStatusBadgeClass(report.status)}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  <div className="report-card-content">
                    <p><strong>Type:</strong> {formatReportType(report.type, report.title)}</p>
                    <p><strong>Student:</strong> {report.studentName}</p>
                    <p><strong>Company:</strong> {report.company}</p>
                    <p><strong>Supervisor:</strong> {report.supervisor}</p>
                    <p><strong>Submitted:</strong> {report.submissionDate}</p>
                    {(report.status === "flagged" || report.status === "rejected") && report.clarification && (
                      <p className="report-clarification-preview">
                        <strong>Clarification:</strong> {report.clarification.substring(0, 60)}
                        {report.clarification.length > 60 ? "..." : ""}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No reports found matching your criteria.</div>
            )}
          </div>
        </div>
      ) : reportType === "internship" ? (
        renderInternshipReport(selectedReport)
      ) : (
        renderEvaluationReport(selectedReport)
      )}
    </div>
  )
}

export default Evaluations