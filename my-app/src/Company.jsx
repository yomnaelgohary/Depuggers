"use client"

import React, { useState } from "react"
import "./company.css"
import CompanyHeader from "./components/CompanyHeader"
import CompanySidebar from "./components/CompanySidebar"
import { Users } from "lucide-react"

export default function Company() {
  const [activePage, setActivePage] = useState("posts")
  const [navigationHistory, setNavigationHistory] = useState(["posts"])
  const [historyPosition, setHistoryPosition] = useState(0)
  // const [activeTab, setActiveTab] = useState("posts") // activeTab seems unused, consider removing
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [filters, setFilters] = useState({
    isPaid: null,
    duration: null,
    location: null,
    industry: null,
  })

  const [internSearch, setInternSearch] = useState("")
  const [internFilter, setInternFilter] = useState("")
  const [selectedIntern, setSelectedIntern] = useState(null)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)
  const [currentEvaluation, setCurrentEvaluation] = useState(null) // This seems to be used to check if editing or adding new
  const [evaluationData, setEvaluationData] = useState({
    professionalAppearance: "",
    professionalConfidence: "",
    professionalDemeanor: "",
    trustworthiness: "",
    ethicalBehavior: "",
    punctuality: ""
  })

  const [notifications, setNotifications] = useState([
    {
      message: "Ahmed Hassan has applied to Backend Developer Intern",
      time: "5 min ago",
    },
    {
      message: "Your application for UI/UX Design Intern has been accepted",
      time: "1 hour ago",
    },
    {
      message: "New evaluation added for Fatima Ali",
      time: "2 hours ago",
    },
  ])
  // const [showNotifications, setShowNotifications] = useState(false) // showNotifications seems unused, used directly in CompanyHeader presumably

  const addNotification = (message) => {
    const newNotification = {
      message,
      time: "Just now",
    }
    setNotifications([newNotification, ...notifications])
  }

  const locations = ["N Teseen, New Cairo", "Maadi, Cairo", "Smart Village, Giza", "Dokki, Giza", "Heliopolis, Cairo"]

  const [jobListings, setJobListings] = useState([
    {
      id: 1,
      companyName: "Dell Technologies",
      title: "Backend Developer Intern",
      industry: "Technology",
      salary: "$89.10",
      hourlyRate: "$14.85/h",
      requirements: ["CODING SKILLS", "JAVA", "SPRING"],
      location: "N Teseen, New Cairo",
      startDate: "May 09, 2025",
      endDate: "Jun 09, 2025",
      duration: "1 MONTH",
      durationMonths: 1,
      description: "Work on backend systems and APIs for our enterprise applications.",
      isPaid: true,
      isLearningOpportunity: false,
      applications: 32,
      workHours: "20-30 hours/week",
      timeSlot: "9:00 - 17:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 2,
      companyName: "Microsoft",
      title: "UI/UX Design Intern",
      industry: "Design",
      requirements: ["JAVASCRIPT", "REACT", "FIGMA"],
      location: "N Teseen, New Cairo",
      startDate: "May 15, 2025",
      endDate: "Aug 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Gain valuable experience working with our development team on real-world projects.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 47,
      workHours: "15-25 hours/week",
      timeSlot: "10:00 - 16:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 19,
      companyName: "Google",
      title: "Software Engineering Intern",
      industry: "Technology",
      salary: "$125.00",
      hourlyRate: "$25.00/h",
      requirements: ["ALGORITHMS", "DATA STRUCTURES", "PYTHON"],
      location: "Smart Village, Giza",
      startDate: "Jun 01, 2025",
      endDate: "Sep 01, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Join Google's engineering team to work on cutting-edge projects.",
      isPaid: true,
      isLearningOpportunity: true,
      applications: 85,
      workHours: "30-40 hours/week",
      timeSlot: "9:00 - 17:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 20,
      companyName: "Amazon",
      title: "Cloud Solutions Intern",
      industry: "E-Commerce",
      salary: "$115.00",
      hourlyRate: "$23.00/h",
      requirements: ["AWS", "CLOUD COMPUTING", "PYTHON"],
      location: "N Teseen, New Cairo",
      startDate: "Jul 01, 2025",
      endDate: "Dec 31, 2025",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Work with AWS services and help build scalable cloud solutions.",
      isPaid: true,
      isLearningOpportunity: true,
      applications: 62,
      workHours: "30-40 hours/week",
      timeSlot: "9:00 - 17:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 21,
      companyName: "Meta",
      title: "Machine Learning Intern",
      industry: "Technology",
      salary: "$120.00",
      hourlyRate: "$24.00/h",
      requirements: ["MACHINE LEARNING", "PYTHON", "DEEP LEARNING"],
      location: "Smart Village, Giza",
      startDate: "Jun 15, 2025",
      endDate: "Sep 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Join Meta's AI team to work on innovative machine learning projects.",
      isPaid: true,
      isLearningOpportunity: true,
      applications: 73,
      workHours: "25-35 hours/week",
      timeSlot: "10:00 - 18:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 7,
      companyName: "Dell Technologies",
      title: "Cybersecurity Intern",
      industry: "Cybersecurity",
      requirements: ["NETWORK SECURITY", "PENETRATION TESTING"],
      location: "Smart Village, Giza",
      startDate: "Jul 01, 2025",
      endDate: "Jul 01, 2026",
      duration: "12 MONTHS",
      durationMonths: 12,
      description: "Learn about cybersecurity practices and help secure our infrastructure.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 27,
      workHours: "20-30 hours/week",
      timeSlot: "10:00 - 16:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 8,
      companyName: "Dell Technologies",
      title: "Cloud Engineering Intern",
      industry: "Cloud Computing",
      salary: "$105.60",
      hourlyRate: "$16.50/h",
      requirements: ["AWS", "AZURE", "CLOUD COMPUTING"],
      location: "N Teseen, New Cairo",
      startDate: "Aug 01, 2025",
      endDate: "Feb 01, 2026",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Work with our cloud team to design and implement scalable cloud solutions.",
      isPaid: true,
      isLearningOpportunity: true,
      applications: 31,
      workHours: "30-40 hours/week",
      timeSlot: "9:00 - 17:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 9,
      companyName: "Dell Technologies",
      title: "QA Testing Intern",
      industry: "Quality Assurance",
      requirements: ["TESTING", "SELENIUM", "QUALITY ASSURANCE"],
      location: "Dokki, Giza",
      startDate: "Jun 15, 2025",
      endDate: "Aug 15, 2025",
      duration: "2 MONTHS",
      durationMonths: 2,
      description: "Learn software testing methodologies and help ensure product quality.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 34,
      workHours: "15-25 hours/week",
      timeSlot: "13:00 - 19:00",
      timeOfDay: "AFTERNOON",
      status: "active",
    },
    {
      id: 10,
      companyName: "Dell Technologies",
      title: "Product Management Intern",
      industry: "Product Management",
      salary: "$88.00",
      hourlyRate: "$14.67/h",
      requirements: ["PRODUCT MANAGEMENT", "AGILE"],
      location: "N Teseen, New Cairo",
      startDate: "Jul 01, 2025",
      endDate: "Oct 01, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Gain hands-on experience in product management and agile methodologies.",
      isPaid: true,
      isLearningOpportunity: false,
      applications: 42,
      workHours: "20-30 hours/week",
      timeSlot: "9:00 - 15:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 11,
      companyName: "Dell Technologies",
      title: "Blockchain Developer Intern",
      industry: "Blockchain",
      requirements: ["BLOCKCHAIN", "SOLIDITY", "WEB3"],
      location: "Heliopolis, Cairo",
      startDate: "Sep 01, 2025",
      endDate: "Mar 01, 2026",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Work on blockchain projects and learn about decentralized applications.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 25,
      workHours: "20-30 hours/week",
      timeSlot: "10:00 - 16:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 12,
      companyName: "Dell Technologies",
      title: "AI Research Intern",
      industry: "Artificial Intelligence",
      salary: "$120.00",
      hourlyRate: "$20.00/h",
      requirements: ["ARTIFICIAL INTELLIGENCE", "PYTHON", "DEEP LEARNING"],
      location: "Smart Village, Giza",
      startDate: "Aug 15, 2025",
      endDate: "May 15, 2026",
      duration: "9 MONTHS",
      durationMonths: 9,
      description: "Participate in cutting-edge AI research and development projects.",
      isPaid: true,
      isLearningOpportunity: true,
      applications: 38,
      workHours: "30-40 hours/week",
      timeSlot: "9:00 - 17:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 13,
      companyName: "Dell Technologies",
      title: "Game Development Intern",
      industry: "Game Development",
      requirements: ["UNITY", "C#", "GAME DESIGN"],
      location: "Maadi, Cairo",
      startDate: "Jul 15, 2025",
      endDate: "Oct 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Learn game development and contribute to our upcoming mobile game.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 36,
      workHours: "20-30 hours/week",
      timeSlot: "10:00 - 16:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 14,
      companyName: "Dell Technologies",
      title: "Technical Writer Intern",
      industry: "Technical Writing",
      requirements: ["TECHNICAL WRITING", "DOCUMENTATION"],
      location: "N Teseen, New Cairo",
      startDate: "Jun 01, 2025",
      endDate: "Jul 01, 2025",
      duration: "1 MONTH",
      durationMonths: 1,
      description: "Create technical documentation for our software products and APIs.",
      isPaid: true,
      isLearningOpportunity: false,
      applications: 29,
      workHours: "15-25 hours/week",
      timeSlot: "9:00 - 15:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 15,
      companyName: "Dell Technologies",
      title: "Database Administrator Intern",
      industry: "Database Administration",
      requirements: ["SQL", "DATABASE MANAGEMENT", "MYSQL"],
      location: "N Teseen, New Cairo",
      startDate: "Sep 15, 2025",
      endDate: "Dec 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Learn database administration and help optimize our database systems.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 33,
      workHours: "20-30 hours/week",
      timeSlot: "10:00 - 16:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 16,
      companyName: "Dell Technologies",
      title: "Sales Assistant Intern",
      industry: "Sales",
      salary: "$123.51",
      hourlyRate: "$14.53/h",
      requirements: ["SALES", "CUSTOMER SERVICE", "RETAIL"],
      location: "Maadi, Cairo",
      startDate: "Jan 15, 2025",
      endDate: "Apr 15, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Assist with sales operations and customer service in our retail department.",
      isPaid: true,
      isLearningOpportunity: false,
      applications: 45,
      workHours: "25-35 hours/week",
      timeSlot: "12:00 - 21:00",
      timeOfDay: "AFTERNOON",
      status: "completed",
    },
    {
      id: 17,
      companyName: "Dell Technologies",
      title: "Marketing Intern",
      industry: "Marketing",
      salary: "$95.40",
      hourlyRate: "$15.90/h",
      requirements: ["DIGITAL MARKETING", "SOCIAL MEDIA", "CONTENT CREATION"],
      location: "Smart Village, Giza",
      startDate: "Feb 01, 2025",
      endDate: "Apr 30, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Support our marketing team with digital campaigns and content creation.",
      isPaid: true,
      isLearningOpportunity: true,
      applications: 52,
      workHours: "20-30 hours/week",
      timeSlot: "9:00 - 17:00",
      timeOfDay: "MORNING",
      status: "completed",
    },
    {
      id: 18,
      companyName: "Dell Technologies",
      title: "HR Assistant Intern",
      industry: "Human Resources",
      requirements: ["HUMAN RESOURCES", "RECRUITMENT", "ADMINISTRATION"],
      location: "Heliopolis, Cairo",
      startDate: "Dec 01, 2024",
      endDate: "Mar 01, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Assist the HR department with recruitment, onboarding, and administrative tasks.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 38,
      workHours: "15-25 hours/week",
      timeSlot: "10:00 - 16:00",
      timeOfDay: "MORNING",
      status: "completed",
    },
  ]);

  const [applications, setApplications] = useState([ // Make applications a state variable
    {
      id: 1,
      postId: 1,
      postTitle: "Backend Developer Intern",
      firstName: "Ahmed",
      lastName: "Hassan",
      applicantName: "Ahmed Hassan",
      applicantEmail: "ahmed.hassan@example.com",
      applicantPhone: "+20 123 456 7890",
      university: "Cairo University",
      major: "Computer Science",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.7,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "I am excited to apply for the Backend Developer Intern position...",
      applicationDate: "Apr 15, 2025",
      availabilityHours: "30 hours/week",
      availableStartDate: "May 10, 2025",
      status: "pending",
      internshipStatus: "current",
      evaluation: null,
    },
    {
      id: 2,
      postId: 1,
      postTitle: "Backend Developer Intern",
      firstName: "Fatima",
      lastName: "Ali",
      applicantName: "Fatima Ali",
      applicantEmail: "fatima.ali@example.com",
      applicantPhone: "+20 123 456 7891",
      university: "Ain Shams University",
      major: "Computer Engineering",
      currentEducation: "Bachelor's Degree, 4th Year",
      gpa: 3.9,
      graduationYear: 2024,
      resumeUrl: "#",
      coverLetter: "I believe my experience with Java and Spring makes me a strong candidate...",
      applicationDate: "Apr 16, 2025",
      availabilityHours: "25 hours/week",
      availableStartDate: "May 15, 2025",
      status: "accepted",
      internshipStatus: "current",
      evaluation: null,
    },
    {
      id: 3,
      postId: 3, // Assuming postId 3 exists in jobListings or this is for another company
      postTitle: "Frontend Developer Intern",
      firstName: "Zainab",
      lastName: "Mahmoud",
      applicantName: "Zainab Mahmoud",
      applicantEmail: "zainab.m@example.com",
      applicantPhone: "+20 123 456 7892",
      university: "German University in Cairo",
      major: "Computer Science",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.8,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "Passionate about creating user-friendly interfaces...",
      applicationDate: "Apr 18, 2025",
      availabilityHours: "25 hours/week",
      availableStartDate: "May 20, 2025",
      status: "accepted",
      internshipStatus: "completed",
      evaluation: { professionalAppearance: "5", professionalConfidence: "4", professionalDemeanor: "5", trustworthiness: "5", ethicalBehavior: "5", punctuality: "4" },
    },
    {
      id: 4,
      postId: 2,
      postTitle: "UI/UX Design Intern",
      firstName: "Nour",
      lastName: "Ibrahim",
      applicantName: "Nour Ibrahim",
      applicantEmail: "nour.ibrahim@example.com",
      applicantPhone: "+20 123 456 7893",
      university: "American University in Cairo",
      major: "Graphic Design",
      currentEducation: "Bachelor's Degree, 4th Year",
      gpa: 3.8,
      graduationYear: 2024,
      resumeUrl: "#",
      coverLetter: "I am writing to express my interest in the UI/UX Design Intern position...",
      applicationDate: "Apr 12, 2025",
      availabilityHours: "25 hours/week",
      availableStartDate: "May 16, 2025",
      status: "rejected",
      internshipStatus: "completed", // If rejected, internshipStatus might be null or 'not_started'
      evaluation: null,
    },
    {
      id: 5,
      postId: 4, // Assuming postId 4 exists
      postTitle: "Data Science Intern",
      firstName: "Laila",
      lastName: "Mohamed",
      applicantName: "Laila Mohamed",
      applicantEmail: "laila.mohamed@example.com",
      applicantPhone: "+20 123 456 7895",
      university: "Alexandria University",
      major: "Statistics",
      currentEducation: "Master's Degree, 1st Year",
      gpa: 4.0,
      graduationYear: 2024,
      resumeUrl: "#",
      coverLetter: "With my strong background in statistics and machine learning...",
      applicationDate: "Apr 20, 2025",
      availabilityHours: "30 hours/week",
      availableStartDate: "Jun 05, 2025",
      status: "accepted",
      internshipStatus: "current",
      evaluation: null,
    },
    {
      id: 6,
      postId: 5, // Assuming postId 5 exists
      postTitle: "Mobile App Developer Intern",
      firstName: "Karim",
      lastName: "Salah",
      applicantName: "Karim Salah",
      applicantEmail: "karim.salah@example.com",
      applicantPhone: "+20 123 456 7896",
      university: "Helwan University",
      major: "Computer Science",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.4,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "I am writing to express my interest in the Mobile App Developer Intern position...",
      applicationDate: "Apr 22, 2025",
      availabilityHours: "25 hours/week",
      availableStartDate: "May 15, 2025",
      status: "pending",
      internshipStatus: "current",
      evaluation: null,
    },
    {
      id: 7,
      postId: 6, // Assuming postId 6 exists
      postTitle: "Frontend Developer Intern",
      firstName: "Hana",
      lastName: "Mahmoud",
      applicantName: "Hana Mahmoud",
      applicantEmail: "hana.mahmoud@example.com",
      applicantPhone: "+20 123 456 7897",
      university: "Cairo University",
      major: "Computer Engineering",
      currentEducation: "Bachelor's Degree, 4th Year",
      gpa: 3.7,
      graduationYear: 2024,
      resumeUrl: "#",
      coverLetter: "As a passionate frontend developer with experience in React...",
      applicationDate: "Apr 25, 2025",
      availabilityHours: "35 hours/week",
      availableStartDate: "Jun 16, 2025",
      status: "finalized", // "finalized" often means hired/completed paperwork
      internshipStatus: "completed",
      evaluation: { professionalAppearance: "4", professionalConfidence: "3", professionalDemeanor: "4", trustworthiness: "5", ethicalBehavior: "4", punctuality: "5" },
    },
    {
      id: 8,
      postId: 7, // Corresponds to Cybersecurity Intern
      postTitle: "Cybersecurity Intern",
      firstName: "Amr",
      lastName: "Hassan",
      applicantName: "Amr Hassan",
      applicantEmail: "amr.hassan@example.com",
      applicantPhone: "+20 123 456 7898",
      university: "Ain Shams University",
      major: "Information Security",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.9,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "I am excited to apply for the Cybersecurity Intern position...",
      applicationDate: "Apr 28, 2025",
      availabilityHours: "25 hours/week",
      availableStartDate: "Jul 05, 2025",
      status: "pending",
      internshipStatus: null, // Not yet an intern
      evaluation: null,
    },
    {
      id: 9,
      postId: 8, // Corresponds to Cloud Engineering Intern
      postTitle: "Cloud Engineering Intern",
      firstName: "Sara",
      lastName: "Ahmed",
      applicantName: "Sara Ahmed",
      applicantEmail: "sara.ahmed@example.com",
      applicantPhone: "+20 123 456 7899",
      university: "German University in Cairo",
      major: "Computer Science",
      currentEducation: "Bachelor's Degree, 4th Year",
      gpa: 3.8,
      graduationYear: 2024,
      resumeUrl: "#",
      coverLetter: "With my experience in AWS and cloud computing...",
      applicationDate: "Apr 30, 2025",
      availabilityHours: "35 hours/week",
      availableStartDate: "Aug 05, 2025",
      status: "accepted",
      internshipStatus: "current",
      evaluation: null,
    },
    {
      id: 10,
      postId: 17, // Corresponds to Marketing Intern (completed)
      postTitle: "Marketing Intern",
      firstName: "Tarek",
      lastName: "Samir",
      applicantName: "Tarek Samir",
      applicantEmail: "tarek.samir@example.com",
      applicantPhone: "+20 123 456 7901",
      university: "American University in Cairo",
      major: "Marketing",
      currentEducation: "Bachelor's Degree, 4th Year",
      gpa: 3.7,
      graduationYear: 2024,
      resumeUrl: "#",
      coverLetter: "I am writing to express my interest in the Marketing Intern position...",
      applicationDate: "Jan 25, 2025",
      availabilityHours: "25 hours/week",
      availableStartDate: "Feb 05, 2025",
      status: "finalized",
      internshipStatus: "completed",
      evaluation: { professionalAppearance: "5", professionalConfidence: "5", professionalDemeanor: "4", trustworthiness: "5", ethicalBehavior: "5", punctuality: "5" },
    },
  ]);

  const durationOptions = [
    { value: 1, label: "1 Month" },
    { value: 2, label: "2 Months" },
    { value: 3, label: "3 Months" },
    { value: 4, label: "4 Months" },
    { value: 6, label: "6 Months" },
    { value: 9, label: "9 Months" },
    { value: 12, label: "12 Months" },
  ];

  const handleInternSearchChange = (e) => {
    setInternSearch(e.target.value);
  };

  // const handleInternFilterChange = (e) => { // This was unused
  //   setInternFilter(e.target.value);
  // };

  const filteredInterns = applications
    .filter((app) => app.internshipStatus === "current" || app.internshipStatus === "completed")
    .filter((intern) => {
      if (internFilter && intern.internshipStatus !== internFilter) {
        return false;
      }
      if (internSearch) {
        const searchTerm = internSearch.toLowerCase();
        return (
          intern.applicantName.toLowerCase().includes(searchTerm) ||
          intern.postTitle.toLowerCase().includes(searchTerm)
        );
      }
      return true;
    });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    resetFilters();
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type] === value ? null : value, // Toggle behavior for single select options
    }));
  };
  
  const handleSkillToggle = (skill) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      skills: prevFilters.skills.includes(skill)
        ? prevFilters.skills.filter((s) => s !== skill)
        : [...prevFilters.skills, skill],
    }));
  };

  const resetFilters = () => {
    setFilters({
      isPaid: null,
      duration: null,
      location: null,
      industry: null,
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.isPaid !== null || filters.duration !== null || filters.location !== null || filters.industry !== null
    );
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  const filteredJobs = jobListings.filter((job) => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.isPaid !== null && job.isPaid !== filters.isPaid) {
      return false;
    }
    if (filters.duration !== null && job.durationMonths !== filters.duration) {
      return false;
    }
    if (filters.location !== null && job.location !== filters.location) {
      return false;
    }
    if (filters.industry && getIndustry(job) !== filters.industry) {
      return false;
    }
    return true;
  });

  const filteredApplications = selectedPost
    ? applications.filter((app) => app.postId === selectedPost)
    : applications;

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) => {
        if (app.id === applicationId) {
          return { ...app, status: newStatus };
        }
        return app;
      })
    );
    const app = applications.find((a) => a.id === applicationId);
    if (app) {
        addNotification(`${app.applicantName}'s application status changed to ${newStatus}`);
    }

    // Show save indication
    const buttons = document.querySelectorAll(`.cs-status-button`);
    buttons.forEach(btn => btn.classList.remove('cs-saved')); // Remove from all first

    const button = document.querySelector(`.cs-status-button[data-status="${newStatus}"]`);
    if (button) {
      button.classList.add('cs-saved');
      setTimeout(() => button.classList.remove('cs-saved'), 2000);
    }
  };
  
  const handleAddEvaluation = (intern) => {
    setSelectedIntern(intern);
    setEvaluationData({ // Reset evaluation data for new entry
      professionalAppearance: "",
      professionalConfidence: "",
      professionalDemeanor: "",
      trustworthiness: "",
      ethicalBehavior: "",
      punctuality: ""
    });
    setCurrentEvaluation(null); // Explicitly null for new evaluation
    setShowEvaluationModal(true);
  };

  const handleEditEvaluation = (intern) => {
    setSelectedIntern(intern);
    // Ensure evaluation object exists and populate fields, otherwise use defaults
    const existingEval = intern.evaluation || {
      professionalAppearance: "",
      professionalConfidence: "",
      professionalDemeanor: "",
      trustworthiness: "",
      ethicalBehavior: "",
      punctuality: ""
    };
    setEvaluationData(existingEval);
    setCurrentEvaluation(existingEval); // Set currentEvaluation to the existing one
    setShowEvaluationModal(true);
  };
  
  const handleSaveEvaluation = () => {
    setApplications((prevApplications) =>
      prevApplications.map((app) => {
        if (app.id === selectedIntern.id) {
          return { ...app, evaluation: evaluationData };
        }
        return app;
      })
    );
    setShowEvaluationModal(false);
    // Update selectedIntern state as well to reflect changes if viewed again immediately
    setSelectedIntern(prev => ({...prev, evaluation: evaluationData})); 
    addNotification(`Evaluation for ${selectedIntern.applicantName} has been saved.`);
    alert("Evaluation saved successfully");
  };
  

  const handlePageChange = (page) => {
    const newHistory = navigationHistory.slice(0, historyPosition + 1);
    setNavigationHistory([...newHistory, page]);
    setHistoryPosition(newHistory.length);
    setActivePage(page);
  };

  const handleNavigateBack = () => {
    if (historyPosition > 0) {
      const newPosition = historyPosition - 1;
      setActivePage(navigationHistory[newPosition]);
      setHistoryPosition(newPosition);
    }
  };

  const handleNavigateForward = () => {
    if (historyPosition < navigationHistory.length - 1) {
      const newPosition = historyPosition + 1;
      setActivePage(navigationHistory[newPosition]);
      setHistoryPosition(newPosition);
    }
  };

  const handleStatusChange = (internId, currentStatus) => {
    const newStatus = currentStatus === "current" ? "completed" : "current";
    setApplications((prevApplications) =>
      prevApplications.map((app) => {
        if (app.id === internId) {
          return { ...app, internshipStatus: newStatus };
        }
        return app;
      })
    );
    const intern = applications.find(app => app.id === internId);
    if (intern) {
        addNotification(`${intern.applicantName}'s internship status changed to ${newStatus}.`);
    }
  };

  // Filter Dell posts for My Posts section (assuming this is still needed)
  const myPosts = jobListings.filter(job => job.companyName === "Dell Technologies");
  const filteredMyPosts = myPosts.filter((job) => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.isPaid !== null && job.isPaid !== filters.isPaid) {
      return false;
    }
    if (filters.duration !== null && job.durationMonths !== filters.duration) {
      return false;
    }
    if (filters.location !== null && job.location !== filters.location) {
      return false;
    }
    if (filters.industry && getIndustry(job) !== filters.industry) {
      return false;
    }
    return true;
  });

  // Helper to get industry for a job
  function getIndustry(job) {
    const companyIndustryMap = {
      "Dell Technologies": "Technology",
      "Microsoft": "Technology",
      "Google": "Technology",
      "Amazon": "E-Commerce",
      "Meta": "Technology",
    };
    return job.industry || companyIndustryMap[job.companyName] || "Other";
  }

  return (
    <div className="cs-company-container">
      <CompanySidebar activePage={activePage} onPageChange={handlePageChange} />
      <div className="cs-company-content">
        <CompanyHeader
          onNavigateBack={handleNavigateBack}
          onNavigateForward={handleNavigateForward}
          canGoBack={historyPosition > 0}
          canGoForward={historyPosition < navigationHistory.length - 1}
          // Pass notifications related state and functions if CompanyHeader handles them
          notifications={notifications}
          // clearAllNotifications={clearAllNotifications} // If implemented in CompanyHeader
          // showNotifications={showNotifications} // If implemented in CompanyHeader
          // setShowNotifications={setShowNotifications} // If implemented in CompanyHeader
        />
        <main className="cs-company-main">
          {activePage === "posts" && (
            <div className="cs-post-section"> {/* Assuming cs-post-section is a general wrapper */}
              <h2>Posts</h2>
              <div className="cs-job-listings">
                {jobListings.map((job) => (
                  <div className={`cs-job-card ${job.status === "completed" ? "cs-completed-job" : ""}`} key={job.id}>
                    {job.status === "completed" && <div className="cs-completed-banner">INTERNSHIP COMPLETE</div>}

                    {job.salary && (
                      <div className="cs-job-salary">
                        <div className="cs-amount">{job.salary}</div>
                        <div className="cs-hourly-rate">{job.hourlyRate}</div>
                      </div>
                    )}

                    <div className="cs-job-details">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <div className="cs-company-name">{job.companyName}</div>
                        <span className="cs-industry-badge">{getIndustry(job)}</span>
                      </div>
                      {job.isLearningOpportunity && <div className="cs-learning-opportunity">LEARNING OPPORTUNITY</div>}

                      <h3 className="cs-job-title">{searchQuery ? <HighlightText text={job.title} highlight={searchQuery} /> : job.title}</h3>

                      <div className="cs-job-requirements">
                        <div className="cs-requirement-label">REQUIRES:</div>
                        <div className="cs-requirement-tags">
                          {job.requirements.map((req, index) => (
                            <span className="cs-requirement-tag" key={index}>
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="cs-job-location">
                        <span className="cs-location-icon">◎</span> {/* Assuming cs-location-icon for styling */}
                        <span>{job.location}</span>
                      </div>

                      <div className="cs-job-duration">
                        <div>
                          <div className="cs-date-range">
                            {job.startDate} - {job.endDate}
                          </div>
                          <div className="cs-duration">{job.duration}</div>
                        </div>
                        <div className="cs-time-slot">
                          <div className="cs-time">{job.timeSlot}</div> {/* Assuming cs-time for styling */}
                          <div className="cs-time-of-day">{job.timeOfDay}</div>
                        </div>
                      </div>

                      <div className="cs-job-work-hours">
                        <span className="cs-work-hours-icon">⏱</span> {/* Assuming cs-work-hours-icon for styling */}
                        <span>{job.workHours}</span>
                      </div>

                      {job.description && <div className="cs-job-description">{job.description}</div>}

                      <div className="cs-job-applications">
                        <Users size={16} className="cs-applications-icon" />
                        <span className="cs-applications-count">{job.applications} applications</span> {/* Assuming cs-applications-count */}
                      </div>
                    </div>

                    <div className={`cs-job-status ${job.isPaid ? "cs-paid" : "cs-unpaid"}`}>
                      {job.isPaid ? "PAID" : "UNPAID"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePage === "myposts" && (
            <div className="cs-post-section">  {/* Assuming cs-post-section is a general wrapper */}
              <h2>My Posts</h2>
              <div className="cs-filters">
                <button className="cs-filter-button" onClick={toggleFilters}>
                  <span className="cs-filter-icon">≡</span> Filters {/* Assuming cs-filter-icon for styling */}
                </button>
                <div className="cs-search-container">
                  <input
                    type="text"
                    placeholder="Search job title"
                    className="cs-search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <button className="cs-clear-search" onClick={() => clearSearch()}>
                      ×
                    </button>
                  )}
                </div>
              </div>

              {showFilters && (
                <div className="cs-filter-modal-overlay">
                  <div className="cs-filter-modal">
                    <div className="cs-filter-modal-header">
                      <h2>Filters</h2>
                      <button className="cs-close-button" onClick={toggleFilters}>
                        ✕
                      </button>
                    </div>

                    <div className="cs-filter-modal-content">
                      <div className="cs-filter-section">
                        <h3>PAYMENT</h3>
                        <div className="cs-filter-options">
                          <button
                            className={`cs-filter-option ${filters.isPaid === true ? "cs-selected" : ""}`}
                            onClick={() => handleFilterChange("isPaid", true)}
                          >
                            Paid
                          </button>
                          <button
                            className={`cs-filter-option ${filters.isPaid === false ? "cs-selected" : ""}`}
                            onClick={() => handleFilterChange("isPaid", false)}
                          >
                            Unpaid
                          </button>
                        </div>
                      </div>

                      <div className="cs-filter-section">
                        <h3>DURATION</h3>
                        <div className="cs-filter-options">
                          {durationOptions.map((option) => (
                            <button
                              key={option.value}
                              className={`cs-filter-option ${filters.duration === option.value ? "cs-selected" : ""}`}
                              onClick={() => handleFilterChange("duration", option.value)}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="cs-filter-section">
                        <h3>LOCATION</h3>
                        <div className="cs-filter-options">
                          {locations.map((location, index) => (
                            <button
                              key={index}
                              className={`cs-filter-option ${filters.location === location ? "cs-selected" : ""}`}
                              onClick={() => handleFilterChange("location", location)}
                            >
                              {location}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="cs-filter-section">
                        <h3>INDUSTRY</h3>
                        <div className="cs-filter-options">
                          {Array.from(new Set(jobListings.map((job) => getIndustry(job)))).map((industry, index) => (
                            <button
                              key={index}
                              className={`cs-filter-option ${filters.industry === industry ? "cs-selected" : ""}`}
                              onClick={() => handleFilterChange("industry", industry)}
                            >
                              {industry}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="cs-filter-actions">
                      <button className={`cs-reset-button ${hasActiveFilters() ? "cs-active" : ""}`} onClick={resetFilters}>
                        Reset
                      </button>
                      <button className="cs-apply-button" onClick={applyFilters}>
                        Show {filteredJobs.length} Posts
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="cs-search-results">
                {searchQuery && (
                  <div className="cs-results-count">
                    Found {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} matching "{searchQuery}"
                  </div>
                )}
              </div>

              <div className="cs-job-listings">
                {filteredMyPosts.map((job) => (
                  <div className={`cs-job-card ${job.status === "completed" ? "cs-completed-job" : ""}`} key={job.id}>
                    {job.status === "completed" && <div className="cs-completed-banner">INTERNSHIP COMPLETE</div>}

                    {job.salary && (
                      <div className="cs-job-salary">
                        <div className="cs-amount">{job.salary}</div>
                        <div className="cs-hourly-rate">{job.hourlyRate}</div>
                      </div>
                    )}

                    <div className="cs-job-details">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <div className="cs-company-name">{job.companyName}</div>
                        <span className="cs-industry-badge">{getIndustry(job)}</span>
                      </div>
                      {job.isLearningOpportunity && <div className="cs-learning-opportunity">LEARNING OPPORTUNITY</div>}

                      <h3 className="cs-job-title">
                        {searchQuery ? <HighlightText text={job.title} highlight={searchQuery} /> : job.title}
                      </h3>

                      <div className="cs-job-requirements">
                        <div className="cs-requirement-label">REQUIRES:</div>
                        <div className="cs-requirement-tags">
                          {job.requirements.map((req, index) => (
                            <span className="cs-requirement-tag" key={index}>
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="cs-job-location">
                        <span className="cs-location-icon">◎</span>
                        <span>{job.location}</span>
                      </div>

                      <div className="cs-job-duration">
                        <div>
                          <div className="cs-date-range">
                            {job.startDate} - {job.endDate}
                          </div>
                          <div className="cs-duration">{job.duration}</div>
                        </div>
                        <div className="cs-time-slot">
                          <div className="cs-time">{job.timeSlot}</div>
                          <div className="cs-time-of-day">{job.timeOfDay}</div>
                        </div>
                      </div>

                      <div className="cs-job-work-hours">
                        <span className="cs-work-hours-icon">⏱</span>
                        <span>{job.workHours}</span>
                      </div>

                      {job.description && <div className="cs-job-description">{job.description}</div>}

                      <div className="cs-job-applications">
                        <Users size={16} className="cs-applications-icon" />
                        <span className="cs-applications-count">{job.applications} applications</span>
                      </div>
                    </div>

                    <div className={`cs-job-status ${job.isPaid ? "cs-paid" : "cs-unpaid"}`}>
                      {job.isPaid ? "PAID" : "UNPAID"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activePage === "create" && (
            <div className="cs-create-post-section">
              <h2>Create Post</h2>
              {/* <div className="cs-create-post-breadcrumb">Company / Create Post</div> */}

              <form className="cs-create-post-form">
                <div className="cs-form-row">
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Internship Title</label>
                      <input type="text" placeholder="Enter title" className="cs-form-input" />
                      <div className="cs-form-help-text">Enter the title of the internship.</div>
                    </div>
                  </div>
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Duration (in months)</label>
                      <input type="number" placeholder="0" className="cs-form-input" />
                      <div className="cs-form-help-text">Enter the duration of the internship in months.</div>
                    </div>
                  </div>
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Salary (in USD)</label>
                      <input type="number" placeholder="0" className="cs-form-input" />
                      <div className="cs-form-help-text">Enter the salary of the internship in USD.</div>
                    </div>
                  </div>
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Hourly Rate (in USD)</label>
                      <input type="number" placeholder="0" className="cs-form-input" />
                      <div className="cs-form-help-text">Enter the hourly rate in USD.</div>
                    </div>
                  </div>
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Location</label>
                      <select className="cs-form-select cs-filter-styled">
                        <option value="">Select location</option>
                        {locations.map((location, index) => (
                          <option key={index} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      <div className="cs-form-help-text">Select the location of the internship.</div>
                    </div>
                  </div>
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Payment Type</label>
                      <select className="cs-form-select cs-filter-styled">
                        <option>Paid</option>
                        <option>Unpaid</option>
                      </select>
                      <div className="cs-form-help-text">Select whether the internship is paid or unpaid.</div>
                    </div>
                  </div>
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Start Date</label>
                      <input type="date" className="cs-form-input" />
                      <div className="cs-form-help-text">Select the start date of the internship.</div>
                    </div>
                  </div>
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>End Date</label>
                      <input type="date" className="cs-form-input" />
                      <div className="cs-form-help-text">Select the end date of the internship.</div>
                    </div>
                  </div>
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Time Slot</label>
                      <select className="cs-form-select cs-filter-styled">
                        <option value="">Select time slot</option>
                        <option value="9:00 - 17:00">9:00 - 17:00 (MORNING)</option>
                        <option value="10:00 - 16:00">10:00 - 16:00 (MORNING)</option>
                        <option value="12:00 - 21:00">12:00 - 21:00 (AFTERNOON)</option>
                        <option value="13:00 - 19:00">13:00 - 19:00 (AFTERNOON)</option>
                      </select>
                      <div className="cs-form-help-text">Select the time slot for the internship.</div>
                    </div>
                  </div>
                  <div className="cs-form-column">
                    <div className="cs-form-group">
                      <label>Required Skills</label>
                      <input type="text" placeholder="Enter skills (comma separated)" className="cs-form-input" />
                      <div className="cs-form-help-text">Enter the required skills, separated by commas.</div>
                    </div>
                  </div>
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-column"> {/* This was not full-width before, making it consistent with other single-column rows */}
                    <div className="cs-form-group">
                      <label>Learning Opportunity</label>
                      <select className="cs-form-select cs-filter-styled">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                      <div className="cs-form-help-text">Is this a learning opportunity?</div>
                    </div>
                  </div>
                </div>

                <div className="cs-form-row">
                  <div className="cs-form-column cs-full-width">
                    <div className="cs-form-group">
                      <label>Description (min. 200 characters)</label>
                      <textarea placeholder="Enter description" className="cs-form-textarea"></textarea>
                      <div className="cs-form-help-text">Provide a detailed description of the internship.</div>
                    </div>
                  </div>
                </div>

                <div className="cs-form-actions">
                  <button type="submit" className="cs-create-post-button">
                    <span className="cs-plus-icon">+</span> Create Post
                  </button>
                </div>
              </form>
            </div>
          )}
          {activePage === "interns" && (
            <div className="cs-interns-section">
              <h2>Interns</h2>
              {!selectedIntern ? (
                <>
                  <div className="cs-filters cs-interns-filters"> {/* Added cs-interns-filters for specific styling if needed */}
                    <button className="cs-filter-button" onClick={toggleFilters}>
                      <span className="cs-filter-icon">≡</span> Filters
                    </button>
                    <div className="cs-search-container"> {/* Re-used cs-search-container */}
                      <input
                        type="text"
                        placeholder="Search by name or position"
                        className="cs-search-input"
                        value={internSearch}
                        onChange={handleInternSearchChange}
                      />
                      {internSearch && (
                        <button className="cs-clear-search" onClick={() => setInternSearch("")}>
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  {showFilters && (
                    <div className="cs-filter-modal-overlay">
                      <div className="cs-filter-modal">
                        <div className="cs-filter-modal-header">
                          <h2>Filters</h2>
                          <button className="cs-close-button" onClick={toggleFilters}>
                            ✕
                          </button>
                        </div>

                        <div className="cs-filter-modal-content">
                          <div className="cs-filter-section">
                            <h3>STATUS</h3>
                            <div className="cs-filter-options">
                              <button
                                className={`cs-filter-option ${internFilter === "current" ? "cs-selected" : ""}`}
                                onClick={() => setInternFilter(internFilter === "current" ? "" : "current")}
                              >
                                Current Interns
                              </button>
                              <button
                                className={`cs-filter-option ${internFilter === "completed" ? "cs-selected" : ""}`}
                                onClick={() => setInternFilter(internFilter === "completed" ? "" : "completed")}
                              >
                                Completed Internships
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="cs-filter-actions">
                          <button
                            className={`cs-reset-button ${internFilter ? "cs-active" : ""}`}
                            onClick={() => setInternFilter("")}
                          >
                            Reset
                          </button>
                          <button className="cs-apply-button" onClick={toggleFilters}>
                            Show {filteredInterns.length} interns
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="cs-interns-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Intern</th>
                          <th>Position</th>
                          <th>Start Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInterns.map((intern) => (
                          <tr key={intern.id}>
                            <td>
                              <div className="cs-intern-name">{intern.applicantName}</div>
                              <div className="cs-intern-university">{intern.university}</div>
                            </td>
                            <td>{intern.postTitle}</td>
                            <td>{intern.availableStartDate}</td>
                            <td>
                              <span 
                                className={`cs-status-badge ${intern.internshipStatus === "current" ? "cs-status-current" : "cs-status-completed"}`}
                                onClick={() => handleStatusChange(intern.id, intern.internshipStatus)} // Added onClick for status change
                                style={{cursor: 'pointer'}} // Make it look clickable
                              >
                                {intern.internshipStatus === "current" ? "Current" : "Completed"}
                              </span>
                            </td>
                            <td>
                              <div className="cs-action-buttons">
                                <button className="cs-view-details-button" onClick={() => setSelectedIntern(intern)}>
                                  View Details
                                </button>
                                {intern.internshipStatus === "completed" && (
                                  <button 
                                    className={`cs-evaluation-button ${intern.evaluation ? "cs-view-evaluation" : "cs-add-evaluation"}`}
                                    onClick={() => intern.evaluation ? handleEditEvaluation(intern) : handleAddEvaluation(intern)}
                                  >
                                    {intern.evaluation ? "View Evaluation" : "Add Evaluation"}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="cs-intern-details"> {/* This class was used for application details too, can be generic */}
                  <div className="cs-intern-details-header">
                    <h3>Intern Details</h3>
                    <button className="cs-back-button" onClick={() => setSelectedIntern(null)}>
                      Back to Interns
                    </button>
                  </div>

                  <div className="cs-details-section">
                    <h4>Intern Information</h4>
                    <div className="cs-info-grid">
                      <div className="cs-info-row">
                        <div className="cs-info-group">
                          <label>First Name</label>
                          <div>{selectedIntern.firstName}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Last Name</label>
                          <div>{selectedIntern.lastName}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Email</label>
                          <div>{selectedIntern.applicantEmail}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Phone</label>
                          <div>{selectedIntern.applicantPhone}</div>
                        </div>
                      </div>
                      <div className="cs-info-row">
                        <div className="cs-info-group">
                          <label>University</label>
                          <div>{selectedIntern.university}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Major</label>
                          <div>{selectedIntern.major}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Current Education</label>
                          <div>{selectedIntern.currentEducation}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>GPA</label>
                          <div>{selectedIntern.gpa}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cs-details-section">
                    <h4>Internship Information</h4>
                    <div className="cs-info-grid">
                      <div className="cs-info-row">
                        <div className="cs-info-group">
                          <label>Position</label>
                          <div>{selectedIntern.postTitle}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Start Date</label>
                          <div>{selectedIntern.availableStartDate}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Status</label>
                          <div>
                            <span className={`cs-status-badge ${selectedIntern.internshipStatus === "current" ? "cs-status-current" : "cs-status-completed"}`}>
                              {selectedIntern.internshipStatus === "current" ? "Current" : "Completed"}
                            </span>
                          </div>
                        </div>
                        <div className="cs-info-group">
                          <label>Availability</label>
                          <div>{selectedIntern.availabilityHours}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Evaluation Section */}
                  <div className="cs-details-section">
                    <div className="cs-evaluation-header">
                      <h4>Evaluation</h4>
                      {selectedIntern.internshipStatus === "completed" && !selectedIntern.evaluation && (
                        <button 
                          className="cs-evaluation-button cs-add-evaluation"
                          onClick={() => handleAddEvaluation(selectedIntern)}
                        >
                          Add Evaluation
                        </button>
                      )}
                      {selectedIntern.evaluation && (
                        <div className="cs-evaluation-actions">
                          <button 
                            className="cs-edit-evaluation-button"
                            onClick={() => handleEditEvaluation(selectedIntern)}
                          >
                            Edit Evaluation
                          </button>
                          <button 
                            className="cs-delete-evaluation-button"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this evaluation?')) {
                                setApplications(prevApplications =>
                                  prevApplications.map(app =>
                                    app.id === selectedIntern.id
                                      ? { ...app, evaluation: null }
                                      : app
                                  )
                                );
                                setSelectedIntern({ ...selectedIntern, evaluation: null });
                                addNotification(`Evaluation for ${selectedIntern.applicantName} has been deleted.`);
                              }
                            }}
                          >
                            Delete Evaluation
                          </button>
                        </div>
                      )}
                    </div>

                    {selectedIntern.evaluation ? (
                      <div className="cs-evaluation-summary">
                        <div className="cs-evaluation-ratings">
                          <div className="cs-rating-item">
                            <span className="cs-rating-label">Professional Appearance</span>
                            <span className="cs-rating-value">{selectedIntern.evaluation.professionalAppearance}/5</span>
                          </div>
                          <div className="cs-rating-item">
                            <span className="cs-rating-label">Professional Confidence</span>
                            <span className="cs-rating-value">{selectedIntern.evaluation.professionalConfidence}/5</span>
                          </div>
                          <div className="cs-rating-item">
                            <span className="cs-rating-label">Professional Demeanor</span>
                            <span className="cs-rating-value">{selectedIntern.evaluation.professionalDemeanor}/5</span>
                          </div>
                          <div className="cs-rating-item">
                            <span className="cs-rating-label">Trustworthiness</span>
                            <span className="cs-rating-value">{selectedIntern.evaluation.trustworthiness}/5</span>
                          </div>
                          <div className="cs-rating-item">
                            <span className="cs-rating-label">Ethical Behavior</span>
                            <span className="cs-rating-value">{selectedIntern.evaluation.ethicalBehavior}/5</span>
                          </div>
                          <div className="cs-rating-item">
                            <span className="cs-rating-label">Punctuality</span>
                            <span className="cs-rating-value">{selectedIntern.evaluation.punctuality}/5</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      selectedIntern.internshipStatus === "completed" ? (
                        <div className="cs-no-evaluation">
                          <p>No evaluation has been added yet.</p>
                        </div>
                      ) : (
                        <div className="cs-no-evaluation">
                          <p>Evaluation can be added once the internship is completed.</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {showEvaluationModal && selectedIntern && ( // Ensure selectedIntern is not null
                <div className="cs-evaluation-modal-overlay">
                  <div className="cs-evaluation-modal">
                    <div className="cs-evaluation-modal-header">
                      <h3>{currentEvaluation ? "View/Edit Evaluation" : "Add Evaluation"} for {selectedIntern.applicantName}</h3>
                      <button className="cs-close-button" onClick={() => setShowEvaluationModal(false)}>✕</button>
                    </div>
                    <div className="cs-evaluation-form">
                      <div className="cs-evaluation-section">
                        <div className="cs-evaluation-field">
                          <label>Practices professional appearance and conduct:</label>
                          <select 
                            value={evaluationData.professionalAppearance || ""}
                            onChange={(e) => setEvaluationData({ ...evaluationData, professionalAppearance: e.target.value })}
                          >
                            <option value="">Please Select</option>
                            <option value="1">Strongly Disagree</option>
                            <option value="2">Disagree</option>
                            <option value="3">Neutral</option>
                            <option value="4">Agree</option>
                            <option value="5">Strongly Agree</option>
                          </select>
                        </div>
                        <div className="cs-evaluation-field">
                          <label>Demonstrates professional confidence:</label>
                          <select 
                            value={evaluationData.professionalConfidence || ""}
                            onChange={(e) => setEvaluationData({ ...evaluationData, professionalConfidence: e.target.value })}
                          >
                            <option value="">Please Select</option>
                            <option value="1">Strongly Disagree</option>
                            <option value="2">Disagree</option>
                            <option value="3">Neutral</option>
                            <option value="4">Agree</option>
                            <option value="5">Strongly Agree</option>
                          </select>
                        </div>
                        <div className="cs-evaluation-field">
                          <label>Demonstrates professional demeanor when dealing with internal or external clients, co-workers, and/or superiors:</label>
                          <select 
                            value={evaluationData.professionalDemeanor || ""}
                            onChange={(e) => setEvaluationData({ ...evaluationData, professionalDemeanor: e.target.value })}
                          >
                           <option value="">Please Select</option>
                            <option value="1">Strongly Disagree</option>
                            <option value="2">Disagree</option>
                            <option value="3">Neutral</option>
                            <option value="4">Agree</option>
                            <option value="5">Strongly Agree</option>
                          </select>
                        </div>
                        <div className="cs-evaluation-field">
                          <label>Shows trustworthiness and confidentiality:</label>
                          <select 
                            value={evaluationData.trustworthiness || ""}
                            onChange={(e) => setEvaluationData({ ...evaluationData, trustworthiness: e.target.value })}
                          >
                            <option value="">Please Select</option>
                            <option value="1">Strongly Disagree</option>
                            <option value="2">Disagree</option>
                            <option value="3">Neutral</option>
                            <option value="4">Agree</option>
                            <option value="5">Strongly Agree</option>
                          </select>
                        </div>
                        <div className="cs-evaluation-field">
                          <label>Demonstrates/practices ethical behavior:</label>
                          <select 
                            value={evaluationData.ethicalBehavior || ""}
                            onChange={(e) => setEvaluationData({ ...evaluationData, ethicalBehavior: e.target.value })}
                          >
                            <option value="">Please Select</option>
                            <option value="1">Strongly Disagree</option>
                            <option value="2">Disagree</option>
                            <option value="3">Neutral</option>
                            <option value="4">Agree</option>
                            <option value="5">Strongly Agree</option>
                          </select>
                        </div>
                        <div className="cs-evaluation-field">
                          <label>Regularly on time and maintains agreeable schedule/hours:</label>
                          <select 
                            value={evaluationData.punctuality || ""}
                            onChange={(e) => setEvaluationData({ ...evaluationData, punctuality: e.target.value })}
                          >
                            <option value="">Please Select</option>
                            <option value="1">Strongly Disagree</option>
                            <option value="2">Disagree</option>
                            <option value="3">Neutral</option>
                            <option value="4">Agree</option>
                            <option value="5">Strongly Agree</option>
                          </select>
                        </div>
                      </div>
                      <div className="cs-evaluation-modal-actions">
                        <button className="cs-cancel-button" onClick={() => setShowEvaluationModal(false)}>
                          Cancel
                        </button>
                        <button className="cs-save-button" onClick={handleSaveEvaluation}>
                          Save Evaluation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activePage === "applicants" && (
            <div className="cs-applications-section">
              <h2>Applications</h2>
              {!selectedApplication ? (
                <>
                  <div className="cs-filters">
                    <button className="cs-filter-button" onClick={toggleFilters}>
                      <span className="cs-filter-icon">≡</span> Filters
                    </button>
                  </div>

                  {showFilters && (
                    <div className="cs-filter-modal-overlay">
                      <div className="cs-filter-modal">
                        <div className="cs-filter-modal-header">
                          <h2>Filters</h2>
                          <button className="cs-close-button" onClick={toggleFilters}>
                            ✕
                          </button>
                        </div>

                        <div className="cs-filter-modal-content">
                          <div className="cs-filter-section">
                            <h3>POST</h3>
                            <div className="cs-filter-options">
                              {jobListings.map((job) => ( // Make sure jobListings is available or filter from a relevant source
                                <button
                                  key={job.id}
                                  className={`cs-filter-option ${selectedPost === job.id ? "cs-selected" : ""}`}
                                  onClick={() => setSelectedPost(selectedPost === job.id ? null : job.id)}
                                >
                                  {job.title}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="cs-filter-actions">
                          <button
                            className={`cs-reset-button ${selectedPost ? "cs-active" : ""}`}
                            onClick={() => setSelectedPost(null)}
                          >
                            Reset
                          </button>
                          <button className="cs-apply-button" onClick={toggleFilters}>
                            Show {filteredApplications.length} applications
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="cs-applications-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Post</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((application) => (
                          <tr key={application.id}>
                            <td>
                              <div className="cs-applicant-name">{application.applicantName}</div>
                              <div className="cs-applicant-university">{application.university}</div>
                            </td>
                            <td>{application.postTitle}</td>
                            <td>{application.applicationDate}</td>
                            <td>
                              <div className="cs-action-button-container">
                                <button 
                                  className="cs-view-details-button"
                                  onClick={() => setSelectedApplication(application)}
                                >
                                  View Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="cs-application-details">
                  <div className="cs-application-details-header">
                    <h3>Application Details</h3>
                    <button 
                      className="cs-back-button"
                      onClick={() => setSelectedApplication(null)}
                    >
                      Back to Applications
                    </button>
                  </div>

                  <div className="cs-details-section">
                    <h4>Applicant Information</h4>
                    <div className="cs-info-grid">
                      <div className="cs-info-row">
                        <div className="cs-info-group">
                          <label>First Name</label>
                          <div>{selectedApplication.firstName}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Last Name</label>
                          <div>{selectedApplication.lastName}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Email</label>
                          <div>{selectedApplication.applicantEmail}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Phone</label>
                          <div>{selectedApplication.applicantPhone}</div>
                        </div>
                      </div>
                      <div className="cs-info-row">
                        <div className="cs-info-group">
                          <label>University</label>
                          <div>{selectedApplication.university}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Major</label>
                          <div>{selectedApplication.major}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Current Education</label>
                          <div>{selectedApplication.currentEducation}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>GPA</label>
                          <div>{selectedApplication.gpa}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cs-details-section">
                    <h4>Application Information</h4>
                    <div className="cs-info-grid">
                      <div className="cs-info-row">
                        <div className="cs-info-group">
                          <label>Position</label>
                          <div>{selectedApplication.postTitle}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Application Date</label>
                          <div>{selectedApplication.applicationDate}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Availability</label>
                          <div>{selectedApplication.availabilityHours}</div>
                        </div>
                        <div className="cs-info-group">
                          <label>Start Date</label>
                          <div>{selectedApplication.availableStartDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cs-details-section">
                    <h4>Cover Letter</h4>
                    <div className="cs-cover-letter-text">
                      {selectedApplication.coverLetter}
                    </div>
                  </div>

                  <div className="cs-details-section">
                    <h4>Resume</h4>
                    <div className="cs-download-buttons">
                      <button className="cs-download-button"> {/* Use cs-download-button from above */}
                        Download Resume
                      </button>
                    </div>
                  </div>

                  <div className="cs-details-section">
                    <h4>Application Status</h4>
                    <div className="cs-status-buttons">
                      <button 
                        className={`cs-status-button ${selectedApplication.status === 'pending' ? 'cs-active' : ''}`}
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'pending')}
                        data-status="pending"
                      >
                        Pending
                      </button>
                      <button 
                        className={`cs-status-button ${selectedApplication.status === 'accepted' ? 'cs-active' : ''}`}
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'accepted')}
                        data-status="accepted"
                      >
                        Accept
                      </button>
                      <button 
                        className={`cs-status-button ${selectedApplication.status === 'rejected' ? 'cs-active' : ''}`}
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                        data-status="rejected"
                      >
                        Reject
                      </button>
                    </div>
                    <div className="cs-download-buttons">
                      <button className="cs-download-button"> {/* Use cs-download-button from above */}
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// Helper component to highlight search text
function HighlightText({ text, highlight }) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="cs-highlight"> {/* Updated class name */}
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

