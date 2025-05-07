// SCAD.jsx
"use client";

import { useState, useEffect } from "react";
import "./SCAD.css";
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
  Eye,
} from "lucide-react";

function Calendar({ highlightedDays, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isHighlighted = highlightedDays.some(
        (highlightedDay) => highlightedDay.toDateString() === date.toDateString()
      );
      days.push(
        <td key={day} className={isHighlighted ? "highlighted" : ""}>
          {day}
        </td>
      );
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={`week-${i / 7}`}>{days.slice(i, i + 7)}</tr>);
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>&lt;</button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
        <table>
          <thead>
            <tr>
              {dayNames.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
        <button onClick={onClose} className="close-calendar-button">
          Close Calendar
        </button>
      </div>
    );
  };

  return renderCalendar();
}

function StudentsView({ students, onBack, onGoToProfile }) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) => student.internshipStatus === filterStatus)
      );
    }
  }, [students, filterStatus]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleProfileClick = (studentId) => {
    if (onGoToProfile) {
      onGoToProfile(studentId);
    } else {
      console.log(`Go to profile for student ID: ${studentId}`);
    }
  };

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
          <select
            id="internshipStatus"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Not Started">Not Started</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <ul className="students-list">
          {filteredStudents.map((student) => (
            <li key={student.id} className="student-card">
              <div
                className="profile-circle"
                onClick={() => handleProfileClick(student.id)}
              >
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
          {filteredStudents.length === 0 && (
            <p>No students found with the selected filter.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

function SCAD() {
  const [stats, setStats] = useState({
    totalStudents: "8,432",
    totalProStudents: "2,345",
    totalCompanies: "10",
  });
  const recentActivities = [
    { id: 1, type: "New student application", time: "1 minute ago" },
    { id: 2, type: "New student application", time: "2 minutes ago" },
    { id: 3, type: "New student application", time: "3 minutes ago" },
    { id: 4, type: "New student application", time: "4 minutes ago" },
    { id: 5, type: "New student application", time: "5 minutes ago" },
  ];
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
  ]);
  const companyApplications = {
    1: { legitimacyProof: "ISO 9001 Certification", description: "Global leader in computer technology." },
    2: { legitimacyProof: "Publicly Traded Company", description: "Multinational technology corporation." },
    3: { legitimacyProof: "BBB Accreditation", description: "Leading professional services network." },
    4: { legitimacyProof: "Fortune 500 Company", description: "Technology company focused on software and cloud services." },
    5: { legitimacyProof: "SEC Filings Available", description: "Largest online retailer." },
    6: { legitimacyProof: "Global Consulting Firm", description: "Multinational professional services network." },
    7: { legitimacyProof: "NYSE Listed", description: "Leading provider of enterprise software." },
    8: { legitimacyProof: "FTSE 100 Company", description: "Multinational telecommunications company." },
    9: { legitimacyProof: "Global Management Consulting", description: "Professional services company." },
    10: { legitimacyProof: "Public Automotive Company", description: "Manufacturer of electric vehicles and clean energy." },
  };
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
  ]);
  const [activeAction, setActiveAction] = useState(null);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStudentProfile, setSelectedStudentProfile] = useState(null);

  const handleViewDetailsClick = (companyId, event) => {
    event.stopPropagation();
    setSelectedCompanyId(companyId);
  };

  const handleActionClick = (actionName) => {
    setActiveAction(actionName);
    if (actionName === "Companies") {
      setShowCompanies(true);
      setShowStudents(false);
      setSelectedStudentProfile(null);
      setShowCalendar(false);
    } else if (actionName === "Students") {
      setShowStudents(true);
      setShowCompanies(false);
      setSelectedStudentProfile(null);
      setShowCalendar(false);
    } else if (actionName === "Internship Cycle") {
      setShowCalendar(true);
      setShowCompanies(false);
      setShowStudents(false);
      setSelectedStudentProfile(null);
    } else {
      setShowCompanies(false);
      setShowStudents(false);
      setSelectedStudentProfile(null);
      setShowCalendar(false);
      console.log(`${actionName} action clicked`);
    }
    setTimeout(() => {
      setActiveAction(null);
    }, 300);
  };

  const isActionActive = (actionName) => {
    return activeAction === actionName ? "action-card active" : "action-card";
  };

  const closeCompaniesSection = () => {
    setShowCompanies(false);
    setSearchQuery("");
    setSelectedIndustry("All");
    setSelectedCompanyId(null);
  };

  const closeStudentsSection = () => {
    setShowStudents(false);
    setSelectedStudentProfile(null);
  };

  const getFirstLetter = (name) => {
    return name.charAt(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleRejectCompany = (companyId) => {
    setStats((prevStats) => ({ ...prevStats, totalCompanies: parseInt(prevStats.totalCompanies) - 1 }));
    setInitialCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId));
    setSelectedCompanyId(null);
  };

  const handleAcceptCompany = (companyId) => {
    setSelectedCompanyId(null);
    console.log(`Company ${companyId} accepted`);
  };

  const selectedCompanyDetails = selectedCompanyId ? companyApplications[selectedCompanyId] : null;

  useEffect(() => {
    let results = initialCompanies;
    if (searchQuery) {
      results = results.filter((company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedIndustry !== "All") {
      results = results.filter((company) => company.industry === selectedIndustry);
    }
    setFilteredCompanies(results);
  }, [searchQuery, selectedIndustry, initialCompanies]);

  const uniqueIndustries = ["All", ...new Set(initialCompanies.map((company) => company.industry))].sort();

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 6, 1);
  const endDate = new Date(currentYear, 9, 1);
  const highlightedDays = [];
  let currentDateIterator = startDate;
  while (currentDateIterator < endDate) {
    highlightedDays.push(new Date(currentDateIterator));
    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }

  const goToStudentProfile = (studentId) => {
    const student = initialStudents.find((s) => s.id === studentId);
    setSelectedStudentProfile(student);
    setShowStudents(false);
  };

  const closeStudentProfile = () => {
    setSelectedStudentProfile(null);
    setShowStudents(true);
  };

  const getStudentInternshipSubmissions = (studentId) => {
    if (studentId === 101) {
      return [
        { id: 1, company: "Google", status: "Applied", submissionDate: "2024-08-15" },
        { id: 2, company: "Meta", status: "Interviewed", submissionDate: "2024-09-01" },
      ];
    }
    if (studentId === 103) {
      return [
        { id: 3, company: "Amazon", status: "Accepted", submissionDate: "2024-10-20" },
      ];
    }
    return [];
  };

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
          <Calendar highlightedDays={highlightedDays} onClose={() => setShowCalendar(false)} />
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
                  className={`company-card`}
                  key={company.id}
                >
                  <div className="company-letter">{getFirstLetter(company.name)}</div>
                  <div className="company-info">
                    <h3>{company.name}</h3>
                    <p>{company.industry}</p>
                  </div>
                  <button
                    className="view-details-button"
                    onClick={(event) => handleViewDetailsClick(company.id, event)}
                  >
                    <Eye size={16} /> View
                  </button>
                </div>
              ))}
            </div>

            {selectedCompanyDetails && (
              <div className="company-details">
                <h3>Company Application Details</h3>
                <div className="detail-item">
                  <h4>Legitimacy Proof:</h4>
                  <p>{selectedCompanyDetails.legitimacyProof}</p>
                </div>
                <div className="detail-item">
                  <h4>Company Description:</h4>
                  <p>{selectedCompanyDetails.description}</p>
                </div>
                <div className="action-buttons">
                  <button className="accept-button" onClick={() => handleAcceptCompany(selectedCompanyId)}>
                    <CheckCircle size={20} /> Accept
                  </button>
                  <button className="reject-button" onClick={() => handleRejectCompany(selectedCompanyId)}>
                    <XCircle size={20} /> Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showStudents && (
        <StudentsView
          students={initialStudents}
          onBack={closeStudentsSection}
          onGoToProfile={goToStudentProfile}
        />
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
              {selectedStudentProfile.company && (
                <p>Current Company: {selectedStudentProfile.company}</p>
              )}

              <h3>Previous Internship Submissions</h3>
              {getStudentInternshipSubmissions(selectedStudentProfile.id).length > 0 ? (
                <ul>
                  {getStudentInternshipSubmissions(selectedStudentProfile.id).map((submission) => (
                    <li key={submission.id}>
                      Company: {submission.company}, Status: {submission.status},
                      Submitted: {submission.submissionDate}
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
);
}

export default SCAD;