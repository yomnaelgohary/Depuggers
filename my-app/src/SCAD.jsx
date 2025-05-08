// SCAD.jsx
"use client"

import { useState, useEffect, useRef, useMemo } from "react"
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
  CheckCircle, // Keep this
  XCircle,
  Download,
  Search,
  Clock,
  DollarSign,
  CalendarIcon,
  Tag,
  ChevronLeft,
  GraduationCap,
  BarChart2,
  Edit,
  Save,
  AlertTriangle,
  Info,
  Award,
  TrendingUp,
  Star,
  BookOpen,
  PieChart,
  Send, // Added for submit button
} from "lucide-react"

// New Modal Component for Appointment Request
function AppointmentRequestModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "", // Optional
    reason: "Career Guidance", // Default reason
    reportDetails: "", // For report clarification
    preferredTime: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    onSubmit(formData); // Pass data to parent
    // Parent will handle closing and confirmation
    setIsSubmitting(false); 
  };

  return (
    <div className="appointment-modal-overlay">
      <div className="appointment-modal">
        <div className="appointment-modal-header">
          <h2>Request an Appointment</h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="appointment-form">
          <p className="appointment-modal-subtitle">
            Request a video call for career guidance or report clarifications.
          </p>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
           <div className="form-group">
            <label htmlFor="studentId">Student ID (Optional)</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason for Appointment</label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            >
              <option value="Career Guidance">Career Guidance</option>
              <option value="Report Clarification">Report Clarification</option>
              <option value="Internship Search Support">Internship Search Support</option>
              <option value="CV/Resume Review">CV/Resume Review</option>
              <option value="Mock Interview">Mock Interview</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.reason === "Report Clarification" && (
            <div className="form-group">
              <label htmlFor="reportDetails">Report ID/Title (if applicable)</label>
              <input
                type="text"
                id="reportDetails"
                name="reportDetails"
                value={formData.reportDetails}
                onChange={handleChange}
                placeholder="e.g., Report ID 3 or 'UX Design Internship Report'"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="preferredTime">Preferred Date/Time Slots</label>
            <input
              type="text"
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              placeholder="e.g., Next Monday afternoon, or Wed 10 AM - 12 PM"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Brief Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="submit-appointment-button" disabled={isSubmitting}>
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send size={16} /> Submit Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


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
    totalStudents: "10",
    totalProStudents: "13",
    totalCompanies: "10",
  })

  const recentActivities = [
    { id: 1, type: "New student application", time: "1 minute ago", person: "John Doe" },
    { id: 2, type: "New student application", time: "2 minutes ago", person: "Sarah Smith" },
    { id: 3, type: "New student application", time: "3 minutes ago", person: "Michael Brown" },
    { id: 4, type: "New student application", time: "4 minutes ago", person: "Emma Wilson" },
    { id: 5, type: "New student application", time: "5 minutes ago", person: "David Lee" },
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
    { id: 101, name: "Alice Smith", internshipStatus: "Ongoing", company: "Dell Technologies", major: "Computer Science" },
    { id: 102, name: "Bob Johnson", internshipStatus: "Not Started", major: "Data Science" },
    { id: 103, name: "Charlie Brown", internshipStatus: "Completed", company: "IBM", major: "Business Administration" },
    { id: 104, name: "Diana Lee", internshipStatus: "Ongoing", company: "Microsoft", major: "Design" },
    { id: 105, name: "Ethan Williams", internshipStatus: "Not Started", major: "Computer Science" },
    { id: 106, name: "Fiona Green", internshipStatus: "Completed", company: "Amazon", major: "Marketing" },
    { id: 107, name: "George Harris", internshipStatus: "Ongoing", company: "PwC", major: "Business Administration" },
    { id: 108, name: "Hannah Clark", internshipStatus: "Not Started", major: "Design" },
    { id: 109, name: "Ian Davis", internshipStatus: "Completed", company: "Oracle", major: "Data Science" },
    { id: 110, name: "Jane Miller", internshipStatus: "Ongoing", company: "Vodafone", major: "Marketing" },
  ])

  const [reports, setReports] = useState([
    // ... (your existing reports data)
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
      challenges:
        "The biggest challenge was understanding the large codebase and the company's development workflow.",
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
      supervisor: "John Smith",
      supervisorPosition: "Senior Data Scientist",
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
      type: "evaluation",
      title: "Business Analyst Internship Evaluation",
      studentName: "George Harris",
      studentId: 107,
      major: "Business Administration",
      company: "PwC",
      supervisor: "Sarah Johnson",
      supervisorPosition: "Senior Consultant",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      submissionDate: "2023-10-10",
      status: "rejected",
      clarification:
        "This evaluation was rejected due to consistently poor performance metrics and failure to meet project deadlines. The intern demonstrated inadequate communication skills and did not show improvement despite multiple feedback sessions.",
      performance: {
        technical: 3.0,
        communication: 2.5,
        teamwork: 3.2,
        problemSolving: 2.8,
        overall: 2.9,
      },
      strengths: "Good analytical thinking",
      areasForImprovement: "Needs to improve communication skills and meeting deadlines",
      comments:
        "George showed potential but needs more professional development before taking on client-facing roles.",
    },
    {
      id: 5,
      type: "internship",
      title: "Marketing Internship Report",
      studentName: "Fiona Green",
      studentId: 106,
      major: "Marketing",
      company: "Amazon",
      submissionDate: "2023-09-25",
      status: "accepted",
      content: "This report details my experience as a Marketing Intern at Amazon...",
      tasks: [
        "Assisted in developing marketing campaigns",
        "Analyzed customer data and market trends",
        "Created content for social media platforms",
      ],
      skills: ["Market Research", "Social Media Marketing", "Content Creation", "Analytics"],
      challenges: "The biggest challenge was understanding the complex marketing ecosystem at Amazon.",
      learnings: "I learned how data-driven marketing decisions are made in a large corporation.",
      feedback: "The internship was challenging but rewarding. I gained valuable skills and insights.",
    },
     { 
      id: 6, type: "internship", title: "Backend Development Report", studentName: "Kevin Martin", studentId: 111,
      major: "Computer Science", company: "Oracle", submissionDate: "2023-10-01", status: "accepted",
      content: "Report on backend tasks at Oracle.", tasks: [], skills: [], challenges: "", learnings: "", feedback: ""
    },
    {
      id: 7, type: "evaluation", title: "Consulting Internship Evaulation", studentName: "Laura White", studentId: 112,
      major: "Business Administration", company: "Deloitte", submissionDate: "2023-09-20", status: "accepted",
      performance: { technical: 4.0, communication: 4.5, teamwork: 4.0, problemSolving: 4.2, overall: 4.2 },
      strengths: "", areasForImprovement: "", comments: ""
    }
  ]);


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
  const [showEvaluations, setShowEvaluations] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)

  // New state for appointment modal
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentConfirmation, setAppointmentConfirmation] = useState("");


  const getInitials = (name) => {
    // ... (keep existing implementation)
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
  }

  const handleCompanyClick = (companyId) => {
    // ... (keep existing implementation)
    setSelectedCompanyId(companyId)
    console.log(`Showing accept/reject options for company ID: ${companyId}`)
  }

  const handleDownloadPDF = (companyId) => {
    // ... (keep existing implementation)
    const company = initialCompanies.find((c) => c.id === companyId)
    const companyDetails = companyApplications[companyId]

    if (company && companyDetails) {
      generateCompanyPDF(company, companyDetails)
    }
  }

  const generateCompanyPDF = (company, companyDetails) => {
    // ... (keep existing implementation)
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

  function EvaluationsView({ onBack, reportsData, setReportsData, jspdfLoadedProp }) {
    // ... (keep existing implementation)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedMajor, setSelectedMajor] = useState("All")
    const [selectedStatus, setSelectedStatus] = useState("All")
    const [selectedReport, setSelectedReport] = useState(null)
    const [reportType, setReportType] = useState(null)
    const [editingClarification, setEditingClarification] = useState(false)
    const [clarificationText, setClarificationText] = useState("")
    const clarificationTextareaRef = useRef(null)

    const filteredReports = reportsData.filter((report) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = report.title.toLowerCase().includes(query)
        const matchesStudent = report.studentName.toLowerCase().includes(query)
        const matchesCompany = report.company.toLowerCase().includes(query)
        if (!matchesTitle && !matchesStudent && !matchesCompany) return false
      }
      if (selectedMajor !== "All" && report.major !== selectedMajor) return false
      if (selectedStatus !== "All" && report.status !== selectedStatus) return false
      return true
    })

    const uniqueMajors = ["All", ...new Set(reportsData.map((report) => report.major).filter(Boolean))].sort()

    const handleReportClick = (report) => {
      setSelectedReport(report)
      setReportType(report.type)
      setClarificationText(report.clarification || "")
      setEditingClarification(false)
    }

    const closeReportDetails = () => {
      setSelectedReport(null)
      setReportType(null)
      setEditingClarification(false)
    }

    const updateReportStatus = (reportId, newStatus) => {
      const updatedReports = reportsData.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
      setReportsData(updatedReports)
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
      const updatedReports = reportsData.map((report) =>
        report.id === reportId ? { ...report, clarification: clarificationText } : report
      )
      setReportsData(updatedReports)
      if (selectedReport && selectedReport.id === reportId) {
        setSelectedReport({ ...selectedReport, clarification: clarificationText })
      }
      setEditingClarification(false)
    }

    const getStatusBadgeClass = (status) => {
      switch (status) {
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
       return <div className="rating-stars">{stars} <span className="rating-value">({rating.toFixed(1)})</span></div>;
    }

    const generateReportPDF = (report) => {
      if (!jspdfLoadedProp || !window.jspdf) {
        console.error("jsPDF library is not loaded.")
        return
      }
      const { jsPDF } = window.jspdf
      const doc = new jsPDF()
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text(`${report.title}`, 105, 20, { align: "center" });
        doc.setFillColor(195, 20, 50);
        doc.rect(20, 30, 15, 15, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text("SC", 27.5, 39, { align: "center" });
        doc.setTextColor(0, 0, 0);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Report Information", 20, 60);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Student: ${report.studentName} (ID: ${report.studentId})`, 20, 70);
        doc.text(`Major: ${report.major}`, 20, 80);
        doc.text(`Company: ${report.company}`, 20, 90);
        doc.text(`Status: ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}`, 20, 100);
        doc.text(`Submission Date: ${report.submissionDate}`, 20, 110);

        let yPosition = 120;
        if (report.supervisor) {
            doc.text(`Supervisor: ${report.supervisor} (${report.supervisorPosition})`, 20, yPosition);
            yPosition += 10;
        }

        if ((report.status === "flagged" || report.status === "rejected") && report.clarification) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Clarification", 20, yPosition);
            yPosition += 10;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            const clarificationLines = doc.splitTextToSize(report.clarification, 170);
            doc.text(clarificationLines, 20, yPosition);
            yPosition += clarificationLines.length * 7 + 10;
        }
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Generated by SCAD Office", 105, 280, { align: "center" });
        doc.text(new Date().toLocaleDateString(), 105, 285, { align: "center" });
        const reportTypeString = report.type === "internship" ? "Internship_Report" : "Evaluation_Report";
        doc.save(`${reportTypeString}_${report.studentName.replace(/\s+/g, "_")}.pdf`);
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
                <button className={`status-button flagged ${report.status === "flagged" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "flagged")}>Flag</button>
                <button className={`status-button rejected ${report.status === "rejected" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "rejected")}>Reject</button>
                <button className={`status-button accepted ${report.status === "accepted" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "accepted")}>Accept</button>
              </div>
            </div>
            <div className="report-actions">
              <button className="download-pdf-button" onClick={() => generateReportPDF(report)}><Download size={16} /> Download PDF</button>
              <button className="modal-close-button" onClick={closeReportDetails}><X size={20} /></button>
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
              <div className="meta-item"><h4>Submission Date</h4><p>{report.submissionDate}</p></div>
            </div>
            <div className="report-section"><h3>Report Content</h3><p>{report.content}</p></div>
            <div className="report-section"><h3>Tasks Performed</h3><ul className="tasks-list">{report.tasks.map((task, index) => (<li key={index}>{task}</li>))}</ul></div>
            <div className="report-section"><h3>Skills Developed</h3><div className="skills-list">{report.skills.map((skill, index) => (<span key={index} className="skill-tag">{skill}</span>))}</div></div>
            <div className="report-section"><h3>Challenges</h3><p>{report.challenges}</p></div>
            <div className="report-section"><h3>Learnings</h3><p>{report.learnings}</p></div>
            <div className="report-section"><h3>Feedback</h3><p>{report.feedback}</p></div>
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
              <span className={getStatusBadgeClass(report.status)}>{report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span>
              <div className="status-actions">
                <button className={`status-button flagged ${report.status === "flagged" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "flagged")}>Flag</button>
                <button className={`status-button rejected ${report.status === "rejected" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "rejected")}>Reject</button>
                <button className={`status-button accepted ${report.status === "accepted" ? "active" : ""}`} onClick={() => updateReportStatus(report.id, "accepted")}>Accept</button>
              </div>
            </div>
            <div className="report-actions">
              <button className="download-pdf-button" onClick={() => generateReportPDF(report)}><Download size={16} /> Download PDF</button>
              <button className="modal-close-button" onClick={closeReportDetails}><X size={20} /></button>
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
        </div>
      )
    }

    return (
      <div className="evaluations-section-overlay">
        {!selectedReport ? (
          <div className="evaluations-section">
            <div className="evaluations-header">
              <h2>Evaluations & Reports</h2>
              <button className="modal-close-button" onClick={onBack}><X size={20} /></button>
            </div>
            <div className="evaluations-search">
              <div className="search-input">
                <Search size={16} />
                <input type="text" placeholder="Search by title, student name, or company..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
            <div className="evaluations-filters">
              <div className="filter-group">
                <label htmlFor="major">Major:</label>
                <select id="major" value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
                  {uniqueMajors.map((major) => (<option key={major} value={major}>{major}</option>))}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="status">Status:</label>
                <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option value="All">All</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>
            </div>
            <div className="reports-list">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div key={report.id} className="report-card" onClick={() => handleReportClick(report)}>
                    <div className="report-card-header">
                      <h3>{report.title}</h3>
                      <span className={getStatusBadgeClass(report.status)}>{report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span>
                    </div>
                    <div className="report-card-content">
                      <p><strong>Type:</strong> {report.type === "internship" ? "Internship Report" : "Evaluation Report"}</p>
                      <p><strong>Student:</strong> {report.studentName}</p>
                      <p><strong>Company:</strong> {report.company}</p>
                      <p><strong>Submitted:</strong> {report.submissionDate}</p>
                      {(report.status === "flagged" || report.status === "rejected") && report.clarification && (
                        <p className="report-clarification-preview"><strong>Clarification:</strong> {report.clarification.substring(0, 60)}{report.clarification.length > 60 ? "..." : ""}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (<div className="no-results">No reports found matching your criteria.</div>)}
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

  function StatisticsView({ onBack, reportsData, allStudents, allCompanies, jspdfLoadedProp }) {
    // ... (keep existing implementation)
    const reportStats = useMemo(() => {
      const currentCycle = { accepted: 0, rejected: 0, flagged: 0, pending: 0, total: 0 };
      if (reportsData && reportsData.length > 0) {
        reportsData.forEach(report => {
          currentCycle.total++;
          if (report.status === 'accepted') currentCycle.accepted++;
          else if (report.status === 'rejected') currentCycle.rejected++;
          else if (report.status === 'flagged') currentCycle.flagged++;
          else if (report.status === 'pending') currentCycle.pending++;
        });
      }
      return {
        currentCycle,
        previousCycle: { accepted: 38, rejected: 10, flagged: 9, pending: 0, total: 57 }, 
        reviewTime: { average: 3.2, min: 1, max: 7 }, 
      };
    }, [reportsData]);

    const topCourses = useMemo(() => {
      if (!reportsData || reportsData.length === 0) return [];
      const courseCounts = {};
      reportsData.forEach(report => {
        if (report.major) {
          courseCounts[report.major] = (courseCounts[report.major] || 0) + 1;
        }
      });
      return Object.entries(courseCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    }, [reportsData]);
    
    const topCompaniesByInternships = useMemo(() => {
        if (!reportsData || reportsData.length === 0) return [];
        const companyCounts = {};
        reportsData.forEach(report => {
            if (report.company) {
                companyCounts[report.company] = (companyCounts[report.company] || 0) +1;
            }
        });
        return Object.entries(companyCounts)
        .map(([name, count]) => ({name, count}))
        .sort((a,b) => b.count - a.count)
        .slice(0,5);
    }, [reportsData]);

    const topRatedCompanies = [
      { name: "Microsoft", rating: 4.8 },
      { name: "IBM", rating: 4.6 },
      { name: "Dell Technologies", rating: 4.5 },
      { name: "Amazon", rating: 4.3 },
      { name: "Oracle", rating: 4.2 },
    ];

    const generateStatisticsPDF = () => {
        if (!jspdfLoadedProp || !window.jspdf) {
          console.error("jsPDF library is not loaded for Statistics PDF.");
          alert("PDF library not loaded. Please try again later.");
          return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let yPos = 20;
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("Internship Statistics Report", 105, yPos, { align: "center" });
        yPos += 15;
  
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });
        yPos += 15;
        doc.setTextColor(0);
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Report Status (Current Cycle)", 20, yPos);
        yPos += 10;
  
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Total Reports Submitted: ${reportStats.currentCycle.total}`, 25, yPos); yPos += 7;
        doc.text(`Accepted: ${reportStats.currentCycle.accepted}`, 25, yPos); yPos += 7;
        doc.text(`Rejected: ${reportStats.currentCycle.rejected}`, 25, yPos); yPos += 7;
        doc.text(`Flagged: ${reportStats.currentCycle.flagged}`, 25, yPos); yPos += 7;
        doc.text(`Pending: ${reportStats.currentCycle.pending}`, 25, yPos); yPos += 10;
  
        const completed = reportStats.currentCycle.accepted + reportStats.currentCycle.rejected + reportStats.currentCycle.flagged;
        const completionRate = reportStats.currentCycle.total > 0 ? Math.round((completed / reportStats.currentCycle.total) * 100) : 0;
        const acceptanceRate = completed > 0 ? Math.round((reportStats.currentCycle.accepted / completed) * 100) : 0;
        doc.text(`Completion Rate (Accepted/Rejected/Flagged of Total): ${completionRate}%`, 25, yPos); yPos += 7;
        doc.text(`Acceptance Rate (Accepted of Completed): ${acceptanceRate}%`, 25, yPos); yPos += 15;
  
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Average Review Time (Sample Data)", 20, yPos);
        yPos += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Average: ${reportStats.reviewTime.average} days`, 25, yPos); yPos += 7;
        doc.text(`Minimum: ${reportStats.reviewTime.min} days`, 25, yPos); yPos += 7;
        doc.text(`Maximum: ${reportStats.reviewTime.max} days`, 25, yPos); yPos += 15;
  
        if (yPos > 250) { doc.addPage(); yPos = 20; } 
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Most Popular Courses in Internships", 20, yPos);
        yPos += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        if (topCourses.length > 0) {
          topCourses.forEach(course => {
            doc.text(`- ${course.name}: ${course.count} reports`, 25, yPos); yPos += 7;
          });
        } else {
          doc.text("No course data available.", 25, yPos); yPos += 7;
        }
        yPos += 10;

        if (yPos > 250) { doc.addPage(); yPos = 20; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Top Companies by Internship Report Count", 20, yPos);
        yPos += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        if (topCompaniesByInternships.length > 0) {
            topCompaniesByInternships.forEach(company => {
                doc.text(`- ${company.name}: ${company.count} reports`, 25, yPos); yPos +=7;
            });
        } else {
            doc.text("No company internship data available from reports.", 25, yPos); yPos +=7;
        }
        yPos += 10;

        if (yPos > 250) { doc.addPage(); yPos = 20; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Top Rated Companies (Sample Data)", 20, yPos);
        yPos += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        topRatedCompanies.forEach(company => {
          doc.text(`- ${company.name}: Rating ${company.rating.toFixed(1)}/5.0`, 25, yPos); yPos += 7;
        });
        yPos += 10;
  
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("Generated by SCAD Office", 105, 280, { align: "center" });
            doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: "center" });
        }
  
        doc.save("Internship_Statistics_Report.pdf");
      };

    const renderBarChart = (data, valueKey, labelKey, maxValue, colorClass) => {
      if (!data || data.length === 0) return <p>No data available for this chart.</p>;
      const maxVal = maxValue || Math.max(...data.map(item => item[valueKey]), 0);
      if (maxVal === 0) return <p>No data to display in chart.</p>;

      return (
        <div className="bar-chart">
          {data.map((item, index) => (
            <div key={index} className="bar-chart-item">
              <div className="bar-chart-label">{item[labelKey]}</div>
              <div className="bar-chart-bar-container">
                <div
                  className={`bar-chart-bar ${colorClass}`}
                  style={{ width: `${(item[valueKey] / maxVal) * 100}%` }}
                >
                  <span className="bar-chart-value">{item[valueKey]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    const renderPieChart = (data) => {
      if (!data || !data.currentCycle || data.currentCycle.total === 0) {
        return (
            <div className="pie-chart-container">
                <div className="pie-chart-placeholder"><PieChart size={80} /></div>
                <p>No report data for pie chart.</p>
            </div>
        );
      }
      const total = data.currentCycle.total;
      const segments = [
        { label: "Accepted", value: data.currentCycle.accepted, color: "#4caf50", percentage: total > 0 ? Math.round((data.currentCycle.accepted / total) * 100) : 0 },
        { label: "Rejected", value: data.currentCycle.rejected, color: "#f44336", percentage: total > 0 ? Math.round((data.currentCycle.rejected / total) * 100) : 0 },
        { label: "Flagged", value: data.currentCycle.flagged, color: "#ff9800", percentage: total > 0 ? Math.round((data.currentCycle.flagged / total) * 100) : 0 },
        { label: "Pending", value: data.currentCycle.pending, color: "#2196f3", percentage: total > 0 ? Math.round((data.currentCycle.pending / total) * 100) : 0 },
      ];
      return (
        <div className="pie-chart-container">
          <div className="pie-chart">
            <div className="pie-chart-visualization"><div className="pie-chart-placeholder"><PieChart size={80} /></div></div>
            <div className="pie-chart-legend">
              {segments.map((segment, index) => (
                <div key={index} className="pie-chart-legend-item">
                  <div className="pie-chart-legend-color" style={{ backgroundColor: segment.color }}></div>
                  <div className="pie-chart-legend-label">{segment.label}: {segment.value} ({segment.percentage}%)</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    const renderStarRating = (rating) => {
      const stars = []; const fullStars = Math.floor(rating); const hasHalfStar = rating % 1 >= 0.5;
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) stars.push(<Star key={i} size={16} className="star-filled" />);
        else if (i === fullStars && hasHalfStar) stars.push(<Star key={i} size={16} className="star-half" />);
        else stars.push(<Star key={i} size={16} className="star-empty" />);
      }
      return <div className="star-rating">{stars} <span className="rating-value">({rating.toFixed(1)})</span></div>;
    }

    const currentCycleCompletionRate = reportStats.currentCycle.total > 0 ?
        Math.round(
            ((reportStats.currentCycle.accepted + reportStats.currentCycle.rejected + reportStats.currentCycle.flagged) /
            reportStats.currentCycle.total) * 100
        ) : 0;

    const currentCycleAcceptanceRate = (reportStats.currentCycle.accepted + reportStats.currentCycle.rejected + reportStats.currentCycle.flagged) > 0 ?
        Math.round(
            (reportStats.currentCycle.accepted /
            (reportStats.currentCycle.accepted + reportStats.currentCycle.rejected + reportStats.currentCycle.flagged)) * 100
        ) : 0;

    return (
      <div className="statistics-section-overlay">
        <div className="statistics-section">
          <div className="statistics-header">
            <h2>Internship Statistics</h2>
            <button className="download-stats-button" onClick={generateStatisticsPDF} disabled={!jspdfLoadedProp}>
                <Download size={16} /> Download Statistics Report
            </button>
            <button className="modal-close-button" onClick={onBack}><X size={20} /></button>
          </div>
          <div className="statistics-content">
            <div className="statistics-card">
              <div className="statistics-card-header"><h3><BarChart2 size={18} /> Reports Status (Current Cycle)</h3></div>
              <div className="statistics-card-content">
                {renderPieChart(reportStats)}
                <div className="statistics-summary">
                  <div className="summary-item"><div className="summary-label">Total Reports</div><div className="summary-value">{reportStats.currentCycle.total}</div></div>
                  <div className="summary-item"><div className="summary-label">Completion Rate</div><div className="summary-value">{currentCycleCompletionRate}%</div></div>
                  <div className="summary-item"><div className="summary-label">Acceptance Rate</div><div className="summary-value">{currentCycleAcceptanceRate}%</div></div>
                </div>
              </div>
            </div>
            <div className="statistics-card">
              <div className="statistics-card-header"><h3><Clock size={18} /> Average Review Time (Sample)</h3></div>
              <div className="statistics-card-content">
                <div className="review-time-stats">
                  <div className="review-time-item"><div className="review-time-value">{reportStats.reviewTime.average}</div><div className="review-time-label">Average Days</div></div>
                  <div className="review-time-item"><div className="review-time-value">{reportStats.reviewTime.min}</div><div className="review-time-label">Minimum Days</div></div>
                  <div className="review-time-item"><div className="review-time-value">{reportStats.reviewTime.max}</div><div className="review-time-label">Maximum Days</div></div>
                </div>
                <div className="review-time-note"><Info size={16} /><span>Review time is calculated from submission date to final decision (sample data shown).</span></div>
              </div>
            </div>
            <div className="statistics-card">
              <div className="statistics-card-header"><h3><BookOpen size={18} /> Most Popular Courses in Internships</h3></div>
              <div className="statistics-card-content">
                {renderBarChart(topCourses, "count", "name", undefined, "course-bar")}
              </div>
            </div>
            <div className="statistics-card">
              <div className="statistics-card-header"><h3><TrendingUp size={18} /> Top Companies by Internship Report Count</h3></div>
              <div className="statistics-card-content">
                {renderBarChart(topCompaniesByInternships, "count", "name", undefined, "company-bar")}
              </div>
            </div>
            <div className="statistics-card">
              <div className="statistics-card-header"><h3><Award size={18} /> Top Rated Companies (Sample)</h3></div>
              <div className="statistics-card-content">
                <div className="top-rated-companies">
                  {topRatedCompanies.map((company, index) => (
                    <div key={index} className="top-rated-company">
                      <div className="company-rank">{index + 1}</div>
                      <div className="company-info"><div className="company-name">{company.name}</div>{renderStarRating(company.rating)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleActionClick = (actionName) => {
    // ... (keep existing implementation)
    setActiveAction(actionName);
    setShowCompanies(false);
    setShowStudents(false);
    setShowInternships(false);
    setSelectedStudentProfile(null);
    setShowCalendar(false);
    setShowPdfViewer(false);
    setShowEvaluations(false);
    setShowStatistics(false);
    // Do not reset appointment modal here, it's handled separately

    if (actionName === "Companies") setShowCompanies(true);
    else if (actionName === "Students") setShowStudents(true);
    else if (actionName === "Internships") setShowInternships(true);
    else if (actionName === "Internship Cycle") setShowCalendar(true);
    else if (actionName === "Evaluation") setShowEvaluations(true);
    else if (actionName === "Statistics") setShowStatistics(true); 
    else {
        console.log(`${actionName} action clicked`);
    }

    setTimeout(() => {
        setActiveAction(null);
    }, 300);
  }

  const handleStatisticsClick = () => {
    // ... (keep existing implementation)
    setShowStatistics(true)
    setShowEvaluations(false)
    setShowCalendar(false)
    setShowCompanies(false)
    setShowStudents(false)
    setShowInternships(false)
    setSelectedStudentProfile(null)
    setShowPdfViewer(false)
  }

  // New handler for appointment submission
  const handleAppointmentSubmit = (formData) => {
    console.log("Appointment Request Submitted:", formData);
    // Here you would typically send the formData to a backend API
    // e.g., fetch('/api/appointments', { method: 'POST', body: JSON.stringify(formData) ... })

    setAppointmentConfirmation(
        `Thank you, ${formData.name}! Your request for "${formData.reason}" has been received. We will contact you at ${formData.email} regarding your preferred time: ${formData.preferredTime}.`
    );
    // The modal will be closed by the confirmation dialog's close button
  };


  const isActionActive = (actionName) => activeAction === actionName ? "action-card active" : "action-card";
  const closeCompaniesSection = () => { setShowCompanies(false); setSearchQuery(""); setSelectedIndustry("All"); setSelectedCompanyId(null); setShowPdfViewer(false); };
  const closeInternshipsSection = () => setShowInternships(false);
  const closePdfViewer = () => { setShowPdfViewer(false); setSelectedCompanyId(null); };
  const closeStudentsSection = () => { setShowStudents(false); setSelectedStudentProfile(null); };
  const closeEvaluationsSection = () => setShowEvaluations(false);
  const closeStatisticsSection = () => setShowStatistics(false);
  const getFirstLetter = (name) => name ? name.charAt(0) : "";
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleIndustryChange = (event) => setSelectedIndustry(event.target.value);

  const handleRejectCompany = (companyId) => {
    // ... (keep existing implementation)
    setStats((prevStats) => ({ ...prevStats, totalCompanies: (Number.parseInt(prevStats.totalCompanies) - 1).toString() }));
    setInitialCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId));
    setSelectedCompanyId(null);
    setShowPdfViewer(false);
    console.log(`Company ${companyId} rejected and removed`);
  }

  const handleAcceptCompany = (companyId) => {
    // ... (keep existing implementation)
    setShowPdfViewer(false);
    setSelectedCompanyId(null);
    console.log(`Company ${companyId} accepted`);
  }

  const selectedCompanyDetails = selectedCompanyId ? companyApplications[selectedCompanyId] : null;
  const selectedCompany = selectedCompanyId ? initialCompanies.find((company) => company.id === selectedCompanyId) : null;

  useEffect(() => {
    // ... (keep existing implementation)
    let results = initialCompanies;
    if (searchQuery) results = results.filter((company) => company.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedIndustry !== "All") results = results.filter((company) => company.industry === selectedIndustry);
    setFilteredCompanies(results);
  }, [searchQuery, selectedIndustry, initialCompanies]);

  const uniqueIndustries = ["All", ...new Set(initialCompanies.map((company) => company.industry))].sort();
  const currentYear = new Date().getFullYear();
  const cycleHighlightedDays = useMemo(() => {
    // ... (keep existing implementation)
    const days = []; const startMonth = 6; const endMonth = 8; const year = new Date().getFullYear();
    for (let month = startMonth; month <= endMonth; month++) {
      const lastDay = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= lastDay; day++) days.push(new Date(year, month, day));
    }
    return days;
  }, []);

  const goToStudentProfile = (studentId) => {
    // ... (keep existing implementation)
    const student = initialStudents.find((s) => s.id === studentId);
    setSelectedStudentProfile(student);
    setShowStudents(false);
  }
  const closeStudentProfile = () => { setSelectedStudentProfile(null); setShowStudents(true); }

  const getStudentInternshipSubmissions = (studentId) => {
    // ... (keep existing implementation)
    if (studentId === 101) return [{ id: 1, company: "Google", status: "Applied", submissionDate: "2024-08-15" }, { id: 2, company: "Meta", status: "Interviewed", submissionDate: "2024-09-01" }];
    if (studentId === 103) return [{ id: 3, company: "Amazon", status: "Accepted", submissionDate: "2024-10-20" }];
    return [];
  }
  
  function Calendar({ highlightedDays, onClose }) {
    // ... (keep existing implementation)
    const [currentView, setCurrentView] = useState("overview") 
    const [selectedMonth, setSelectedMonth] = useState(null)
    const currentYear = new Date().getFullYear()
    const months = useMemo(() => {
        const m = [];
        for (let i = 0; i < 12; i++) {
          const monthDate = new Date(currentYear, i, 1);
          const monthName = monthDate.toLocaleString("default", { month: "long" });
          const highlightedInMonth = highlightedDays.filter(day => day.getMonth() === i && day.getFullYear() === currentYear).length;
          const isActiveMonth = i >= 6 && i <= 8;
          m.push({ index: i, name: monthName, highlightedDays: isActiveMonth ? highlightedInMonth : 0, daysInMonth: new Date(currentYear, i + 1, 0).getDate(), isActive: isActiveMonth });
        }
        return m;
    }, [currentYear, highlightedDays]);

    const handleMonthClick = (monthIndex) => { setSelectedMonth(monthIndex); setCurrentView("month"); };
    const goBackToOverview = () => setCurrentView("overview");

    const renderMonthView = () => {
      const month = selectedMonth; const year = currentYear;
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" });
      const days = [];
      for (let i = 0; i < firstDayOfMonth; i++) days.push(<td key={`empty-${i}`} className="empty-day"></td>);
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isHighlighted = highlightedDays.some(highlightedDay => highlightedDay.toDateString() === date.toDateString());
        const isToday = new Date().toDateString() === date.toDateString();
        days.push(
          <td key={day} className={`calendar-day ${isHighlighted ? "highlighted" : ""} ${isToday ? "today" : ""}`}>
            <div className="day-content"><span className="day-number">{day}</span>{isHighlighted && <div className="day-indicator"></div>}</div>
          </td>
        );
      }
      const weeks = []; for (let i = 0; i < days.length; i += 7) weeks.push(<tr key={`week-${i / 7}`}>{days.slice(i, i + 7)}</tr>);
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return (
        <div className="month-view">
          <div className="month-header">
            <button className="back-button" onClick={goBackToOverview}><ChevronLeft size={20} /><span>Back</span></button>
            <h2>{monthName} {year}</h2>
          </div>
          <table className="month-calendar"><thead><tr>{dayNames.map((day) => <th key={day}>{day}</th>)}</tr></thead><tbody>{weeks}</tbody></table>
          <div className="calendar-legend">
            <div className="legend-item"><div className="legend-indicator highlighted"></div><span>Internship Cycle Day</span></div>
            <div className="legend-item"><div className="legend-indicator today"></div><span>Today</span></div>
          </div>
        </div>
      );
    };
    const renderOverview = () => (
      <div className="calendar-overview">
        <h2>Internship Cycle Calendar</h2><p className="cycle-dates">July 1st - October 1st, {currentYear}</p>
        <div className="months-grid">{months.map((month) => (<div key={month.index} className={`month-card ${month.isActive ? "active-month" : "inactive-month"}`} onClick={() => handleMonthClick(month.index)}><h3>{month.name}</h3><div className="month-stats"><div className="month-progress">{month.isActive && (<div className="progress-bar" style={{ width: `${(month.highlightedDays / month.daysInMonth) * 100}%` }}></div>)}</div><p>{month.highlightedDays} active days</p></div></div>))}</div>
        <div className="calendar-summary">
          <div className="summary-item"><CalendarIcon size={20} /><div><h4>Total Duration</h4><p>3 months</p></div></div>
          <div className="summary-item"><Clock size={20} /><div><h4>Active Days</h4><p>{highlightedDays.length} days</p></div></div>
        </div>
      </div>
    );
    return <div className="calendar-container"><button className="modal-close-button calendar-close" onClick={onClose}><X size={20} /></button>{currentView === "overview" ? renderOverview() : renderMonthView()}</div>;
  }

  function StudentsView({ students, onBack, onGoToProfile }) {
    // ... (keep existing implementation)
    const [filterStatus, setFilterStatus] = useState("All");
    const [filteredStudents, setFilteredStudents] = useState(students);
    useEffect(() => {
      if (filterStatus === "All") setFilteredStudents(students);
      else setFilteredStudents(students.filter((student) => student.internshipStatus === filterStatus));
    }, [students, filterStatus]);
    const handleFilterChange = (event) => setFilterStatus(event.target.value);
    const handleProfileClick = (studentId) => { if (onGoToProfile) onGoToProfile(studentId); else console.log(`Go to profile for student ID: ${studentId}`); };
    return (
      <div className="students-section-overlay">
        <div className="students-view">
          <div className="students-header"><h2>Students List</h2><button className="modal-close-button" onClick={onBack}><X size={20} /></button></div>
          <div className="students-filter"><label htmlFor="internshipStatus">Filter by Internship Status:</label><select id="internshipStatus" value={filterStatus} onChange={handleFilterChange}><option value="All">All</option><option value="Not Started">Not Started</option><option value="Ongoing">Ongoing</option><option value="Completed">Completed</option></select></div>
          <ul className="students-list">
            {filteredStudents.map((student) => (<li key={student.id} className="student-card"><div className="profile-circle" onClick={() => handleProfileClick(student.id)}>{getInitials(student.name)}</div><div className="student-info"><h3>{student.name}</h3><p>ID: {student.id}</p><p>Internship Status: {student.internshipStatus}</p>{student.company && <p>Company: {student.company}</p>}</div></li>))}
            {filteredStudents.length === 0 && <p>No students found with the selected filter.</p>}
          </ul>
        </div>
      </div>
    );
  }
  function CompanyPdfViewer({ companyId, companyName, companyIndustry, companyDetails, onAccept, onReject, onClose }) { 
    // ... (keep existing implementation)
    return (
      <div className="pdf-viewer-overlay">
        <div className="pdf-viewer">
          <div className="pdf-header"><h2>{companyName} - Details</h2><button className="modal-close-button" onClick={onClose}><X size={20} /></button></div>
          <div className="pdf-content"><p>Industry: {companyIndustry}</p><p>Legitimacy Proof: {companyDetails.legitimacyProof}</p><p>Description: {companyDetails.description}</p></div>
          <div className="pdf-actions">
            <button className="accept-button" onClick={() => onAccept(companyId)}><CheckCircle size={16} /> Accept</button>
            <button className="reject-button" onClick={() => onReject(companyId)}><XCircle size={16} /> Reject</button>
          </div>
        </div>
      </div>
    );
  }
  function InternshipCard({ internship, company, onClick }) { 
    // ... (keep existing implementation)
    return (
      <div className="internship-card" onClick={onClick}>
        <div className="internship-header"><h3>{internship.jobTitle}</h3><span className={`payment-badge ${internship.isPaid ? "paid" : "unpaid"}`}>{internship.isPaid ? "Paid" : "Unpaid"}</span></div>
        <div className="internship-company"><Building size={16} /><span>{company.name}</span></div>
        <div className="internship-duration"><Clock size={16} /><span>{internship.duration}</span></div>
      </div>
    );
  }
  function InternshipsView({ onBack }) { 
    // ... (keep existing implementation)
    const [searchQuery, setSearchQuery] = useState(""); const [selectedIndustry, setSelectedIndustry] = useState("All"); const [selectedDuration, setSelectedDuration] = useState("All"); const [selectedPayStatus, setSelectedPayStatus] = useState("All"); const [selectedInternship, setSelectedInternship] = useState(null);
    const companies = [ { id: 1, name: "Dell Technologies", industry: "Technology" }, { id: 2, name: "IBM", industry: "Technology" }, { id: 3, name: "PwC", industry: "Consulting" }, { id: 4, name: "Microsoft", industry: "Technology" }, { id: 5, name: "Amazon", industry: "E-commerce" }, ];
    const internships = [ { id: 1, companyId: 1, jobTitle: "Software Engineering Intern", duration: "3 months", isPaid: true, salary: 1500, startDate: "June 1, 2024", description: "Join Dell Technologies as a Software Engineering Intern to work on cutting-edge projects.", skills: ["Java", "Python", "Git", "Agile"], }, { id: 2, companyId: 2, jobTitle: "Data Science Intern", duration: "6 months", isPaid: true, salary: 2000, startDate: "July 15, 2024", description: "IBM is looking for a Data Science Intern to join our AI research team.", skills: ["Python", "Machine Learning", "Statistics", "SQL"], }, { id: 3, companyId: 3, jobTitle: "Business Analyst Intern", duration: "3 months", isPaid: true, salary: 1200, startDate: "June 15, 2024", description: "PwC is seeking a Business Analyst Intern to support our consulting team.", skills: ["Excel", "Data Analysis", "Business Process Modeling", "Communication"], }, { id: 4, companyId: 4, jobTitle: "UX Design Intern", duration: "4 months", isPaid: true, salary: 1800, startDate: "August 1, 2024", description: "Microsoft is looking for a UX Design Intern to join our product team.", skills: ["Figma", "UI/UX", "Prototyping", "User Research"], }, { id: 5, companyId: 5, jobTitle: "Operations Intern", duration: "3 months", isPaid: false, startDate: "July 1, 2024", description: "Amazon is seeking an Operations Intern to support our logistics team.", skills: ["Supply Chain", "Logistics", "Process Improvement", "Analytics"], }, ];
    const filteredInternships = internships.filter((internship) => { const company = companies.find((c) => c.id === internship.companyId); if (searchQuery) { const query = searchQuery.toLowerCase(); const matchesTitle = internship.jobTitle.toLowerCase().includes(query); const matchesCompany = company.name.toLowerCase().includes(query); if (!matchesTitle && !matchesCompany) return false; } if (selectedIndustry !== "All" && company.industry !== selectedIndustry) return false; if (selectedDuration !== "All" && internship.duration !== selectedDuration) return false; if (selectedPayStatus !== "All") { const isPaid = selectedPayStatus === "Paid"; if (internship.isPaid !== isPaid) return false; } return true; });
    const uniqueIndustries = ["All", ...new Set(companies.map((company) => company.industry))].sort(); const uniqueDurations = ["All", ...new Set(internships.map((internship) => internship.duration))].sort();
    const handleInternshipClick = (internship) => setSelectedInternship(internship); const closeInternshipDetails = () => setSelectedInternship(null);
    return (
      <div className="internships-section-overlay">
        {!selectedInternship ? ( <div className="internships-section"> <div className="internships-header"><h2>Available Internships</h2><button className="modal-close-button" onClick={onBack}><X size={20} /></button></div> <div className="internships-search"><div className="search-input"><Search size={16} /><input type="text" placeholder="Search by job title or company name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/></div></div> <div className="internships-filters"><div className="filter-group"><label htmlFor="industry">Industry:</label><select id="industry" value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>{uniqueIndustries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}</select></div><div className="filter-group"><label htmlFor="duration">Duration:</label><select id="duration" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>{uniqueDurations.map((duration) => (<option key={duration} value={duration}>{duration}</option>))}</select></div><div className="filter-group"><label htmlFor="payStatus">Payment:</label><select id="payStatus" value={selectedPayStatus} onChange={(e) => setSelectedPayStatus(e.target.value)}><option value="All">All</option><option value="Paid">Paid</option><option value="Unpaid">Unpaid</option></select></div></div> <div className="internships-list">{filteredInternships.length > 0 ? ( filteredInternships.map((internship) => { const company = companies.find((c) => c.id === internship.companyId); return (<InternshipCard key={internship.id} internship={internship} company={company} onClick={() => handleInternshipClick(internship)}/> ); }) ) : ( <div className="no-results">No internships found matching your criteria.</div> )}</div></div> ) : ( <div className="internship-details"><div className="internship-details-header"><h2>{selectedInternship.jobTitle}</h2><button className="modal-close-button" onClick={closeInternshipDetails}><X size={20} /></button></div><div className="internship-details-content"><div className="internship-company-info"><h3><Building size={18} />{companies.find((c) => c.id === selectedInternship.companyId).name}</h3><p className="industry-tag"><Tag size={14} />{companies.find((c) => c.id === selectedInternship.companyId).industry}</p></div><div className="internship-info-grid"><div className="info-item"><Clock size={18} /><div><h4>Duration</h4><p>{selectedInternship.duration}</p></div></div><div className="info-item"><DollarSign size={18} /><div><h4>Payment</h4><p>{selectedInternship.isPaid ? "Paid" : "Unpaid"}</p>{selectedInternship.isPaid && selectedInternship.salary && (<p className="salary">${selectedInternship.salary}/month</p>)}</div></div><div className="info-item"><CalendarIcon size={18} /><div><h4>Start Date</h4><p>{selectedInternship.startDate || "Flexible"}</p></div></div></div><div className="internship-description"><h3>Job Description</h3><p>{selectedInternship.description}</p></div><div className="internship-skills"><h3>Required Skills</h3><div className="skills-list">{selectedInternship.skills.map((skill, index) => (<span key={index} className="skill-tag">{skill}</span>))}</div></div></div></div>)}
      </div>
    );
  }

  return (
    <div className="scad-container">
      <header className="scad-header">
        <div className="header-left">
          <div className="logo">
            <div className="scad-logo"><GraduationCap size={24} /><span>SC</span></div>
            <h1>SCAD Office</h1>
          </div>
        </div>
        <div className="header-center">
          <nav className="main-nav">
            <ul>
              <li><button onClick={() => handleActionClick("Internship Cycle")} className="nav-link">Internship Cycle</button></li>
              <li><button onClick={handleStatisticsClick} className="nav-link">Statistics</button></li>
              <li>
                {/* Modified Request Appointment link */}
                <button 
                  onClick={() => {
                    setShowAppointmentModal(true);
                    setAppointmentConfirmation(""); // Clear previous confirmation
                  }} 
                  className="nav-link"
                >
                  Request Appointment
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <button className="icon-button" onClick={() => alert("Notifications")}><Bell size={20} /></button>
            <button className="icon-button" onClick={() => alert("Incoming Calls")}><Phone size={20} /></button>
            <button className="icon-button" onClick={() => alert("Outcoming Calls")}><MessageCircle size={20} /></button>
          </div>
          <div className="profile-avatar"><img src="/placeholder.svg?height=40&width=40" alt="Profile" /></div>
        </div>
      </header>

      <main className="scad-main">
        <section className="welcome-section"><h1>Welcome back</h1><p>Here's a quick overview of your day</p></section>
        <section className="stats-section">
          <div className="stat-card"><h3>Total students</h3><p className="stat-number">{stats.totalStudents}</p></div>
          <div className="stat-card"><h3>Total Pro Students</h3><p className="stat-number">{stats.totalProStudents}</p></div>
          <div className="stat-card"><h3>Total Companies</h3><p className="stat-number">{stats.totalCompanies}</p></div>
        </section>
        <section className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <div className={isActionActive("Companies")} onClick={() => handleActionClick("Companies")}><Building size={24} /><h3>Companies</h3><p>View all companies</p></div>
            <div className={isActionActive("Internships")} onClick={() => handleActionClick("Internships")}><Briefcase size={24} /><h3>Internships</h3><p>View all internships</p></div>
            <div className={isActionActive("Students")} onClick={() => handleActionClick("Students")}><Users size={24} /><h3>Students</h3><p>View all students</p></div>
            <div className={isActionActive("Evaluation")} onClick={() => handleActionClick("Evaluation")}><FileText size={24} /><h3>Evaluation & Reports</h3><p>View all evaluations and reports</p></div>
            <div className={isActionActive("Workshop")} onClick={() => handleActionClick("Workshop")}><Tool size={24} /><h3>Workshop</h3><p>View all workshops</p></div>
          </div>
        </section>
        <section className="recent-activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-timeline">
            {recentActivities.map((activity) => (
              <div className="activity-item" key={activity.id}>
                <div className="activity-avatar"><div className="activity-character-logo">{getInitials(activity.person)}</div></div>
                <div className="activity-content"><p className="activity-person">{activity.person}</p><p className="activity-type">{activity.type}</p><p className="activity-time">{activity.time}</p></div>
              </div>
            ))}
          </div>
        </section>

        {showCalendar && <div className="calendar-overlay"><Calendar highlightedDays={cycleHighlightedDays} onClose={() => setShowCalendar(false)} /></div>}
        {showCompanies && (
          <div className="companies-section-overlay">
            <div className="companies-section">
              <div className="companies-header"><h2>Available Companies</h2><button className="modal-close-button" onClick={closeCompaniesSection}><X size={20} /></button></div>
              <div className="companies-filter-controls"><div className="search-input"><input type="text" placeholder="Search by company name..." value={searchQuery} onChange={handleSearchChange}/></div><div className="industry-filter"><label htmlFor="industry">Filter by Industry:</label><select id="industry" value={selectedIndustry} onChange={handleIndustryChange}>{uniqueIndustries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}</select></div></div>
              <div className="companies-list">
                {filteredCompanies.map((company) => (<div className={`company-card ${selectedCompanyId === company.id ? "selected" : ""}`} key={company.id} onClick={() => handleCompanyClick(company.id)}><div className="company-letter">{getFirstLetter(company.name)}</div><div className="company-info"><h3 className="company-name">{company.name}</h3><p>{company.industry}</p></div></div>))}
              </div>
              {selectedCompanyId && (<div className="company-details"><h3>{initialCompanies.find((c) => c.id === selectedCompanyId)?.name} - Company Details</h3><div className="action-buttons"><button className="download-button" onClick={() => handleDownloadPDF(selectedCompanyId)}><Download size={16} /> Download PDF</button><button className="accept-button" onClick={() => handleAcceptCompany(selectedCompanyId)}><CheckCircle size={16} /> Accept</button><button className="reject-button" onClick={() => handleRejectCompany(selectedCompanyId)}><XCircle size={16} /> Reject</button></div></div>)}
            </div>
          </div>
        )}
        {showInternships && <InternshipsView onBack={closeInternshipsSection} />}
        {showPdfViewer && selectedCompany && selectedCompanyDetails && <CompanyPdfViewer companyId={selectedCompanyId} companyName={selectedCompany.name} companyIndustry={selectedCompany.industry} companyDetails={selectedCompanyDetails} onAccept={handleAcceptCompany} onReject={handleRejectCompany} onClose={closePdfViewer}/>}
        {showStudents && <StudentsView students={initialStudents} onBack={closeStudentsSection} onGoToProfile={goToStudentProfile} />}
        {selectedStudentProfile && (
          <div className="student-profile-overlay">
            <div className="student-profile">
              <div className="profile-header"><h2>{selectedStudentProfile.name}'s Profile</h2><button className="modal-close-button" onClick={closeStudentProfile}><X size={20} /></button></div>
              <div className="profile-details">
                <p>ID: {selectedStudentProfile.id}</p><p>Internship Status: {selectedStudentProfile.internshipStatus}</p>{selectedStudentProfile.company && <p>Current Company: {selectedStudentProfile.company}</p>}
                <h3>Previous Internship Submissions</h3>
                {getStudentInternshipSubmissions(selectedStudentProfile.id).length > 0 ? (<ul>{getStudentInternshipSubmissions(selectedStudentProfile.id).map((submission) => (<li key={submission.id}>Company: {submission.company}, Status: {submission.status}, Submitted: {submission.submissionDate}</li>))}</ul>) : (<p>No previous internship submissions found.</p>)}
              </div>
            </div>
          </div>
        )}
        {showEvaluations && <EvaluationsView onBack={closeEvaluationsSection} reportsData={reports} setReportsData={setReports} jspdfLoadedProp={jspdfLoaded} />}
        {showStatistics && <StatisticsView onBack={closeStatisticsSection} reportsData={reports} allStudents={initialStudents} allCompanies={initialCompanies} jspdfLoadedProp={jspdfLoaded} />}

        {/* Appointment Modal and Confirmation Dialog */}
        {showAppointmentModal && !appointmentConfirmation && (
          <AppointmentRequestModal
            onClose={() => setShowAppointmentModal(false)}
            onSubmit={handleAppointmentSubmit}
          />
        )}
        {appointmentConfirmation && (
          <div className="appointment-modal-overlay"> {/* Re-use overlay style */}
            <div className="appointment-confirmation-dialog">
              <CheckCircle size={48} className="confirmation-icon-success" />
              <h3>Appointment Request Sent!</h3>
              <p>{appointmentConfirmation}</p>
              <button 
                onClick={() => {
                  setAppointmentConfirmation(""); // Clear confirmation
                  setShowAppointmentModal(false); // Ensure modal is also marked as closed
                }} 
                className="submit-appointment-button" // Re-use button style
              >
                Close
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default SCAD