"use client"

import { useState } from "react"
import "./company.css"

export default function Company() {
  const [activeTab, setActiveTab] = useState("posts")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [filters, setFilters] = useState({
    isPaid: null, // null = both, true = paid only, false = unpaid only
    duration: null, // null = all durations, 1, 3, 6, etc. (months)
    location: null, // null = all locations
    skills: [],
  })

  // Update the interns section to implement search, filtering, and evaluation functionality
  // Add these state variables at the top of the component:

  const [internSearch, setInternSearch] = useState("")
  const [internFilter, setInternFilter] = useState("")
  const [selectedIntern, setSelectedIntern] = useState(null)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [evaluationData, setEvaluationData] = useState({
    overallRating: 3,
    technicalSkills: 3,
    communicationSkills: 3,
    recommendForHire: true,
    comments: "",
  })

  // Available locations
  const locations = ["N Teseen, New Cairo", "Maadi, Cairo", "Smart Village, Giza", "Dokki, Giza", "Heliopolis, Cairo"]

  // Sample job listings data with consistent duration format and application counts
  const jobListings = [
    {
      id: 1,
      title: "Backend Developer Intern",
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
      title: "UI/UX Design Intern",
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
      id: 3,
      title: "DevOps Engineer Intern",
      salary: "$111.38",
      hourlyRate: "$14.85/h",
      requirements: ["CODING SKILLS", "DOCKER", "KUBERNETES"],
      location: "N Teseen, New Cairo",
      startDate: "May 09, 2025",
      endDate: "Nov 09, 2025",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Learn DevOps practices and help automate our deployment pipelines.",
      isPaid: true,
      isLearningOpportunity: false,
      applications: 28,
      workHours: "30-40 hours/week",
      timeSlot: "9:00 - 18:00",
      timeOfDay: "FULL DAY",
      status: "active",
    },
    {
      id: 4,
      title: "Data Science Intern",
      requirements: ["PYTHON", "DATA SCIENCE", "MACHINE LEARNING"],
      location: "N Teseen, New Cairo",
      startDate: "Jun 01, 2025",
      endDate: "Sep 30, 2025",
      duration: "4 MONTHS",
      durationMonths: 4,
      description: "Work on cutting-edge data science projects and build your portfolio with real-world experience.",
      isPaid: false,
      isLearningOpportunity: true,
      applications: 39,
      workHours: "20-30 hours/week",
      timeSlot: "13:00 - 19:00",
      timeOfDay: "AFTERNOON",
      status: "active",
    },
    {
      id: 5,
      title: "Mobile App Developer Intern",
      salary: "$95.25",
      hourlyRate: "$15.50/h",
      requirements: ["MOBILE DEV", "FLUTTER", "DART"],
      location: "N Teseen, New Cairo",
      startDate: "May 12, 2025",
      endDate: "Aug 12, 2025",
      duration: "3 MONTHS",
      durationMonths: 3,
      description: "Develop mobile applications for iOS and Android platforms.",
      isPaid: true,
      isLearningOpportunity: false,
      applications: 35,
      workHours: "25-35 hours/week",
      timeSlot: "10:00 - 18:00",
      timeOfDay: "FULL DAY",
      status: "active",
    },
    {
      id: 6,
      title: "Frontend Developer Intern",
      salary: "$92.40",
      hourlyRate: "$15.40/h",
      requirements: ["JAVASCRIPT", "REACT", "CSS"],
      location: "Maadi, Cairo",
      startDate: "Jun 15, 2025",
      endDate: "Dec 15, 2025",
      duration: "6 MONTHS",
      durationMonths: 6,
      description: "Join our frontend team to build responsive and accessible user interfaces.",
      isPaid: true,
      isLearningOpportunity: false,
      applications: 51,
      workHours: "30-40 hours/week",
      timeSlot: "9:00 - 17:00",
      timeOfDay: "MORNING",
      status: "active",
    },
    {
      id: 7,
      title: "Cybersecurity Intern",
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
      title: "Cloud Engineering Intern",
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
      title: "QA Testing Intern",
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
      title: "Product Management Intern",
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
      title: "Blockchain Developer Intern",
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
      title: "AI Research Intern",
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
      title: "Game Development Intern",
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
      title: "Technical Writer Intern",
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
      title: "Database Administrator Intern",
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
    // Completed internships (before May 2025)
    {
      id: 16,
      title: "Sales Assistant Intern",
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
      title: "Marketing Intern",
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
      title: "HR Assistant Intern",
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
  ]

  // Sample applications data with enhanced student information
  const applications = [
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
      status: "pending", // pending, accepted, rejected, finalized
      internshipStatus: null, // null, current, completed
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
    },
    {
      id: 3,
      postId: 2,
      postTitle: "UI/UX Design Intern",
      firstName: "Omar",
      lastName: "Mahmoud",
      applicantName: "Omar Mahmoud",
      applicantEmail: "omar.mahmoud@example.com",
      applicantPhone: "+20 123 456 7892",
      university: "German University in Cairo",
      major: "Design",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.5,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "As a passionate UI/UX designer with experience in Figma...",
      applicationDate: "Apr 10, 2025",
      availabilityHours: "20 hours/week",
      availableStartDate: "May 20, 2025",
      status: "finalized",
      internshipStatus: "completed",
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
      internshipStatus: null,
    },
    {
      id: 5,
      postId: 3,
      postTitle: "DevOps Engineer Intern",
      firstName: "Youssef",
      lastName: "Ahmed",
      applicantName: "Youssef Ahmed",
      applicantEmail: "youssef.ahmed@example.com",
      applicantPhone: "+20 123 456 7894",
      university: "Cairo University",
      major: "Information Technology",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.6,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "I am excited to apply for the DevOps Engineer Intern position...",
      applicationDate: "Apr 18, 2025",
      availabilityHours: "35 hours/week",
      availableStartDate: "May 10, 2025",
      status: "pending",
      internshipStatus: null,
    },
    {
      id: 6,
      postId: 4,
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
    },
    {
      id: 7,
      postId: 5,
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
      internshipStatus: null,
    },
    {
      id: 8,
      postId: 6,
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
      status: "finalized",
      internshipStatus: "completed",
    },
    {
      id: 9,
      postId: 7,
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
      internshipStatus: null,
    },
    {
      id: 10,
      postId: 8,
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
    },
    {
      id: 11,
      postId: 16,
      postTitle: "Sales Assistant Intern",
      firstName: "Mariam",
      lastName: "Khaled",
      applicantName: "Mariam Khaled",
      applicantEmail: "mariam.khaled@example.com",
      applicantPhone: "+20 123 456 7900",
      university: "Cairo University",
      major: "Business Administration",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.6,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "I am excited to apply for the Sales Assistant Intern position...",
      applicationDate: "Jan 05, 2025",
      availabilityHours: "30 hours/week",
      availableStartDate: "Jan 15, 2025",
      status: "finalized",
      internshipStatus: "completed",
    },
    {
      id: 12,
      postId: 17,
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
    },
    {
      id: 13,
      postId: 18,
      postTitle: "HR Assistant Intern",
      firstName: "Yasmin",
      lastName: "Adel",
      applicantName: "Yasmin Adel",
      applicantEmail: "yasmin.adel@example.com",
      applicantPhone: "+20 123 456 7902",
      university: "Ain Shams University",
      major: "Human Resources",
      currentEducation: "Bachelor's Degree, 3rd Year",
      gpa: 3.5,
      graduationYear: 2025,
      resumeUrl: "#",
      coverLetter: "I am excited to apply for the HR Assistant Intern position...",
      applicationDate: "Nov 20, 2024",
      availabilityHours: "20 hours/week",
      availableStartDate: "Dec 05, 2024",
      status: "finalized",
      internshipStatus: "completed",
    },
  ]

  // Available duration options for filtering
  const durationOptions = [
    { value: 1, label: "1 Month" },
    { value: 2, label: "2 Months" },
    { value: 3, label: "3 Months" },
    { value: 4, label: "4 Months" },
    { value: 6, label: "6 Months" },
    { value: 9, label: "9 Months" },
    { value: 12, label: "12 Months" },
  ]

  // Add these functions for intern functionality:

  const handleInternSearchChange = (e) => {
    setInternSearch(e.target.value)
  }

  const handleInternFilterChange = (e) => {
    setInternFilter(e.target.value)
  }

  const filteredInterns = applications
    .filter((app) => app.internshipStatus === "current" || app.internshipStatus === "completed")
    .filter((intern) => {
      // Filter by status if selected
      if (internFilter && intern.internshipStatus !== internFilter) {
        return false
      }

      // Filter by search term
      if (internSearch) {
        const searchTerm = internSearch.toLowerCase()
        return (
          intern.applicantName.toLowerCase().includes(searchTerm) || intern.postTitle.toLowerCase().includes(searchTerm)
        )
      }

      return true
    })

  const saveEvaluation = (evaluation) => {
    // In a real app, you would update the state or make an API call here
    console.log("Saving evaluation:", evaluation)
    setShowEvaluationModal(false)
    // Show success notification
    alert("Evaluation saved successfully")
  }

  const deleteEvaluation = (internId) => {
    if (confirm("Are you sure you want to delete this evaluation? This action cannot be undone.")) {
      // In a real app, you would update the state or make an API call here
      console.log("Deleting evaluation for intern:", internId)
      // Show success notification
      alert("Evaluation deleted successfully")
    }
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value,
    })
  }

  const handleSkillToggle = (skill) => {
    setFilters({
      ...filters,
      skills: filters.skills.includes(skill) ? filters.skills.filter((s) => s !== skill) : [...filters.skills, skill],
    })
  }

  const resetFilters = () => {
    setFilters({
      isPaid: null,
      duration: null,
      location: null,
      skills: [],
    })
  }

  const hasActiveFilters = () => {
    return (
      filters.isPaid !== null || filters.duration !== null || filters.location !== null || filters.skills.length > 0
    )
  }

  const applyFilters = () => {
    setShowFilters(false)
  }

  const filteredJobs = jobListings.filter((job) => {
    // Filter by search query
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by payment status
    if (filters.isPaid !== null && job.isPaid !== filters.isPaid) {
      return false
    }

    // Filter by duration
    if (filters.duration !== null && job.durationMonths !== filters.duration) {
      return false
    }

    // Filter by location
    if (filters.location !== null && job.location !== filters.location) {
      return false
    }

    // Filter by skills
    if (filters.skills.length > 0) {
      const hasRequiredSkill = job.requirements.some((req) =>
        filters.skills.some((skill) => req.toLowerCase().includes(skill.toLowerCase())),
      )
      if (!hasRequiredSkill) {
        return false
      }
    }

    return true
  })

  // Filter applications based on selected post
  const filteredApplications = selectedPost ? applications.filter((app) => app.postId === selectedPost) : applications

  // Update application status
  const updateApplicationStatus = (applicationId, status) => {
    const updatedApplications = applications.map((app) => {
      if (app.id === applicationId) {
        return { ...app, status }
      }
      return app
    })
    // In a real app, you would update the state or make an API call here
    console.log(`Updated application ${applicationId} status to ${status}`)
  }

  // Update internship status
  const updateInternshipStatus = (applicationId, internshipStatus) => {
    const updatedApplications = applications.map((app) => {
      if (app.id === applicationId) {
        return { ...app, internshipStatus }
      }
      return app
    })
    // In a real app, you would update the state or make an API call here
    console.log(`Updated application ${applicationId} internship status to ${internshipStatus}`)
  }

  const handleAddEvaluation = (intern) => {
    setSelectedIntern(intern)
    setEvaluationData({
      overallRating: 3,
      technicalSkills: 3,
      communicationSkills: 3,
      recommendForHire: true,
      comments: "",
    })
    setCurrentEvaluation(null)
    setShowEvaluationModal(true)
  }

  const handleEditEvaluation = (intern) => {
    setSelectedIntern(intern)
    setEvaluationData(intern.evaluation)
    setCurrentEvaluation(intern.evaluation)
    setShowEvaluationModal(true)
  }

  const handleDeleteEvaluation = (internId) => {
    if (confirm("Are you sure you want to delete this evaluation? This action cannot be undone.")) {
      // In a real app, you would update the state or make an API call here
      console.log("Deleting evaluation for intern:", internId)
      // Show success notification
      alert("Evaluation deleted successfully")
    }
  }

  const handleSaveEvaluation = () => {
    // Simulate saving the evaluation data
    const evaluationToSave = {
      ...evaluationData,
    }

    // In a real application, you would make an API call to save the evaluation
    console.log("Saving evaluation:", evaluationToSave)

    // Update the selected intern's evaluation (in the real app, this would be done on the server)
    const updatedApplications = applications.map((app) => {
      if (app.id === selectedIntern.id) {
        return { ...app, evaluation: evaluationToSave }
      }
      return app
    })

    // Update the applications state with the new evaluation
    // setApplications(updatedApplications);

    // Close the modal
    setShowEvaluationModal(false)
    setSelectedIntern({ ...selectedIntern, evaluation: evaluationToSave })

    // Show success notification
    alert("Evaluation saved successfully")
  }

  return (
    <div className="company-container">
      <header className="company-header">
        <div className="logo">Dell technologies</div>
        <div className="main-nav">
          <button className={`nav-tab ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>
            Posts
          </button>
          <button
            className={`nav-tab ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Create post
          </button>
          <button
            className={`nav-tab ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            Applications
          </button>
          <button
            className={`nav-tab ${activeTab === "interns" ? "active" : ""}`}
            onClick={() => setActiveTab("interns")}
          >
            Interns
          </button>
        </div>
        <div className="notification-bell">
          <span className="bell-icon">🔔</span>
          <span className="notification-count">3</span>
        </div>
      </header>

      <div className="content-container">
        {activeTab === "posts" && (
          <div className="post-section">
            <div className="filters">
              <button className="filter-button" onClick={toggleFilters}>
                <span className="filter-icon">≡</span> Filters
              </button>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search job title"
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <span className="search-icon">🔍</span>
                {searchQuery && (
                  <button className="clear-search" onClick={() => clearSearch()}>
                    ×
                  </button>
                )}
              </div>
            </div>

            {showFilters && (
              <div className="filter-modal-overlay">
                <div className="filter-modal">
                  <div className="filter-modal-header">
                    <h2>Filters</h2>
                    <button className="close-button" onClick={toggleFilters}>
                      ✕
                    </button>
                  </div>

                  <div className="filter-section">
                    <h3>DURATION</h3>
                    <div className="filter-options">
                      {durationOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`filter-option ${filters.duration === option.value ? "selected" : ""}`}
                          onClick={() => handleFilterChange("duration", option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>LOCATION</h3>
                    <div className="filter-options">
                      {locations.map((location, index) => (
                        <button
                          key={index}
                          className={`filter-option ${filters.location === location ? "selected" : ""}`}
                          onClick={() => handleFilterChange("location", location)}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>PAYMENT</h3>
                    <div className="filter-options">
                      <button
                        className={`filter-option ${filters.isPaid === true ? "selected" : ""}`}
                        onClick={() => handleFilterChange("isPaid", true)}
                      >
                        Paid
                      </button>
                      <button
                        className={`filter-option ${filters.isPaid === false ? "selected" : ""}`}
                        onClick={() => handleFilterChange("isPaid", false)}
                      >
                        Unpaid
                      </button>
                    </div>
                  </div>

                  <div className="filter-section">
                    <h3>SKILLS</h3>
                    <div className="filter-options">
                      {Array.from(new Set(jobListings.flatMap((job) => job.requirements))).map((skill, index) => (
                        <button
                          key={index}
                          className={`filter-option ${filters.skills.includes(skill) ? "selected" : ""}`}
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-actions">
                    <button className={`reset-button ${hasActiveFilters() ? "active" : ""}`} onClick={resetFilters}>
                      Reset
                    </button>
                    <button className="apply-button" onClick={applyFilters}>
                      Show {filteredJobs.length} jobs
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="search-results">
              {searchQuery && (
                <div className="results-count">
                  Found {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} matching "{searchQuery}"
                </div>
              )}
            </div>

            <div className="job-listings">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div className={`job-card ${job.status === "completed" ? "completed-job" : ""}`} key={job.id}>
                    {job.status === "completed" && <div className="completed-banner">INTERNSHIP COMPLETE</div>}

                    {job.salary && (
                      <div className="job-salary">
                        <div className="amount">{job.salary}</div>
                        <div className="hourly-rate">{job.hourlyRate}</div>
                      </div>
                    )}

                    <div className="job-details">
                      {job.isLearningOpportunity && <div className="learning-opportunity">LEARNING OPPORTUNITY</div>}

                      <h3 className="job-title">
                        {searchQuery ? <HighlightText text={job.title} highlight={searchQuery} /> : job.title}
                      </h3>

                      <div className="job-requirements">
                        <div className="requirement-label">REQUIRES:</div>
                        <div className="requirement-tags">
                          {job.requirements.map((req, index) => (
                            <span className="requirement-tag" key={index}>
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="job-location">
                        <span className="location-icon">◎</span>
                        <span>{job.location}</span>
                      </div>

                      <div className="job-duration">
                        <span className="calendar-icon">📅</span>
                        <div>
                          <div className="date-range">
                            {job.startDate} - {job.endDate}
                          </div>
                          <div className="duration">{job.duration}</div>
                        </div>
                        <div className="time-slot">
                          <div className="time">{job.timeSlot}</div>
                          <div className="time-of-day">{job.timeOfDay}</div>
                        </div>
                      </div>

                      <div className="job-work-hours">
                        <span className="work-hours-icon">⏱</span>
                        <span>{job.workHours}</span>
                      </div>

                      {job.description && <div className="job-description">{job.description}</div>}

                      <div className="job-applications">
                        <span className="applications-icon">👤</span>
                        <span className="applications-count">{job.applications} applications</span>
                      </div>
                    </div>

                    <div className={`job-status ${job.isPaid ? "paid" : "unpaid"}`}>
                      {job.isPaid ? "PAID" : "UNPAID"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No jobs found matching "{searchQuery}"</p>
                  <button className="reset-search" onClick={() => clearSearch()}>
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "create" && (
          <div className="create-post-section">
            <h2>Create Post</h2>

            <form className="create-post-form">
              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Internship Title</label>
                    <input type="text" placeholder="Enter title" className="form-input" />
                    <div className="form-help-text">Enter the title of the internship.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Duration (in months)</label>
                    <input type="number" placeholder="0" className="form-input" />
                    <div className="form-help-text">Enter the duration of the internship in months.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Salary (in USD)</label>
                    <input type="number" placeholder="0" className="form-input" />
                    <div className="form-help-text">Enter the salary of the internship in USD.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Hourly Rate (in USD)</label>
                    <input type="number" placeholder="0" className="form-input" />
                    <div className="form-help-text">Enter the hourly rate in USD.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Location</label>
                    <select className="form-select filter-styled">
                      <option value="">Select location</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <div className="form-help-text">Select the location of the internship.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Payment Type</label>
                    <select className="form-select filter-styled">
                      <option>Paid</option>
                      <option>Unpaid</option>
                    </select>
                    <div className="form-help-text">Select whether the internship is paid or unpaid.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" className="form-input" />
                    <div className="form-help-text">Select the start date of the internship.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="date" className="form-input" />
                    <div className="form-help-text">Select the end date of the internship.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Time Slot</label>
                    <select className="form-select filter-styled">
                      <option value="">Select time slot</option>
                      <option value="9:00 - 17:00">9:00 - 17:00 (MORNING)</option>
                      <option value="10:00 - 16:00">10:00 - 16:00 (MORNING)</option>
                      <option value="12:00 - 21:00">12:00 - 21:00 (AFTERNOON)</option>
                      <option value="13:00 - 19:00">13:00 - 19:00 (AFTERNOON)</option>
                    </select>
                    <div className="form-help-text">Select the time slot for the internship.</div>
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Required Skills</label>
                    <input type="text" placeholder="Enter skills (comma separated)" className="form-input" />
                    <div className="form-help-text">Enter the required skills, separated by commas.</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column">
                  <div className="form-group">
                    <label>Learning Opportunity</label>
                    <select className="form-select filter-styled">
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                    <div className="form-help-text">Is this a learning opportunity?</div>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-column full-width">
                  <div className="form-group">
                    <label>Description (min. 200 characters)</label>
                    <textarea placeholder="Enter description" className="form-textarea"></textarea>
                    <div className="form-help-text">Provide a detailed description of the internship.</div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="create-post-button">
                  <span className="plus-icon">+</span> Create Post
                </button>
              </div>
            </form>
          </div>
        )}
        {activeTab === "applications" && (
          <div className="applications-section">
            <h2>Applications</h2>

            {!selectedApplication ? (
              <>
                <div className="applications-filters">
                  <div className="filter-label">Filter by Post</div>
                  <select
                    className="form-select filter-styled"
                    value={selectedPost || ""}
                    onChange={(e) => setSelectedPost(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">All Posts</option>
                    {jobListings.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} ({job.applications} applications)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="applications-list">
                  <div className="applications-header">
                    <div className="application-header-item">Applicant</div>
                    <div className="application-header-item">Post</div>
                    <div className="application-header-item">Date</div>
                    <div className="application-header-item">Actions</div>
                  </div>

                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                      <div className="application-item" key={application.id}>
                        <div className="application-detail applicant-column">
                          <div className="applicant-name">{application.applicantName}</div>
                          <div className="applicant-university">{application.university}</div>
                        </div>
                        <div className="application-detail">{application.postTitle}</div>
                        <div className="application-detail">{application.applicationDate}</div>
                        <div className="application-actions">
                          <button
                            className="view-application-button"
                            onClick={() => setSelectedApplication(application)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-applications">
                      <p>No applications found</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="application-details">
                <div className="application-details-header">
                  <h3>Application Details</h3>
                  <button className="back-button" onClick={() => setSelectedApplication(null)}>
                    Back to Applications
                  </button>
                </div>

                <div className="application-details-content">
                  <div className="application-details-section">
                    <h4>Applicant Information</h4>
                    <div className="details-grid">
                      <div className="details-item">
                        <span className="details-label">First Name</span>
                        <span className="details-value">{selectedApplication.firstName}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Last Name</span>
                        <span className="details-value">{selectedApplication.lastName}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Email</span>
                        <span className="details-value">{selectedApplication.applicantEmail}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Phone</span>
                        <span className="details-value">{selectedApplication.applicantPhone}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">University</span>
                        <span className="details-value">{selectedApplication.university}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Major</span>
                        <span className="details-value">{selectedApplication.major}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Current Education</span>
                        <span className="details-value">{selectedApplication.currentEducation}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">GPA</span>
                        <span className="details-value">{selectedApplication.gpa}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Graduation Year</span>
                        <span className="details-value">{selectedApplication.graduationYear}</span>
                      </div>
                    </div>
                  </div>

                  <div className="application-details-section">
                    <h4>Application Information</h4>
                    <div className="details-grid">
                      <div className="details-item">
                        <span className="details-label">Post</span>
                        <span className="details-value">{selectedApplication.postTitle}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Application Date</span>
                        <span className="details-value">{selectedApplication.applicationDate}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Availability</span>
                        <span className="details-value">{selectedApplication.availabilityHours}</span>
                      </div>
                      <div className="details-item">
                        <span className="details-label">Available Start Date</span>
                        <span className="details-value">{selectedApplication.availableStartDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="application-details-section">
                    <h4>Cover Letter</h4>
                    <div className="cover-letter">{selectedApplication.coverLetter}</div>
                  </div>

                  <div className="application-details-section">
                    <h4>Resume</h4>
                    <a
                      href="/sample-resume.pdf"
                      className="resume-link"
                      target="_blank"
                      rel="noreferrer"
                      download="applicant-resume.pdf"
                    >
                      Download Resume (PDF)
                    </a>
                  </div>

                  <div className="application-details-section">
                    <h4>Application Status</h4>
                    <div className="status-actions">
                      <div className="status-buttons">
                        <button
                          className={`status-button ${selectedApplication.status === "pending" ? "active" : ""}`}
                          onClick={() => updateApplicationStatus(selectedApplication.id, "pending")}
                        >
                          Pending
                        </button>
                        <button
                          className={`status-button ${selectedApplication.status === "accepted" ? "active" : ""}`}
                          onClick={() => updateApplicationStatus(selectedApplication.id, "accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className={`status-button ${selectedApplication.status === "rejected" ? "active" : ""}`}
                          onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "interns" && (
          <div className="interns-section">
            <h2>Interns</h2>

            {!selectedIntern ? (
              <>
                <div className="interns-filters">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Search by name or job title"
                      value={internSearch}
                      onChange={handleInternSearchChange}
                      className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                  </div>
                  <div className="filter-container">
                    <span className="filter-label">Filter by Status:</span>
                    <select className="filter-select" value={internFilter} onChange={handleInternFilterChange}>
                      <option value="">All Interns</option>
                      <option value="current">Current Interns</option>
                      <option value="completed">Completed Internships</option>
                    </select>
                  </div>
                </div>

                <div className="interns-list">
                  <div className="interns-header">
                    <div className="intern-header-item">Intern</div>
                    <div className="intern-header-item">Position</div>
                    <div className="intern-header-item">Start Date</div>
                    <div className="intern-header-item">Status</div>
                    <div className="intern-header-item">Actions</div>
                  </div>

                  {filteredInterns.map((intern) => (
                    <div className="intern-item" key={intern.id}>
                      <div className="intern-detail">
                        <div className="intern-name">{intern.applicantName}</div>
                        <div className="intern-university">{intern.university}</div>
                      </div>
                      <div className="intern-detail">{intern.postTitle}</div>
                      <div className="intern-detail">{intern.availableStartDate}</div>
                      <div className="intern-detail">
                        <span
                          className={`status-badge ${intern.internshipStatus === "current" ? "status-current" : "status-completed"}`}
                        >
                          {intern.internshipStatus === "current" ? "Current" : "Completed"}
                        </span>
                      </div>
                      <div className="intern-actions">
                        <button className="view-details-button" onClick={() => setSelectedIntern(intern)}>
                          View Details
                        </button>
                        <button className="add-evaluation-button" onClick={() => handleAddEvaluation(intern)}>
                          {intern.evaluation ? "View Evaluation" : "Add Evaluation"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="intern-details">
                <div className="intern-details-header">
                  <h3>Intern Details</h3>
                  <button className="back-button" onClick={() => setSelectedIntern(null)}>
                    Back to Interns
                  </button>
                </div>

                <div className="intern-info-section">
                  <h4>Intern Information</h4>
                  <div className="info-grid">
                    <div className="info-row">
                      <div className="info-label">First Name</div>
                      <div className="info-value">{selectedIntern.firstName}</div>
                      <div className="info-label">Last Name</div>
                      <div className="info-value">{selectedIntern.lastName}</div>
                    </div>
                    <div className="info-row">
                      <div className="info-label">Email</div>
                      <div className="info-value">{selectedIntern.applicantEmail}</div>
                      <div className="info-label">Phone</div>
                      <div className="info-value">{selectedIntern.applicantPhone}</div>
                    </div>
                    <div className="info-row">
                      <div className="info-label">University</div>
                      <div className="info-value">{selectedIntern.university}</div>
                      <div className="info-label">Major</div>
                      <div className="info-value">{selectedIntern.major}</div>
                    </div>
                    <div className="info-row">
                      <div className="info-label">Current Education</div>
                      <div className="info-value">{selectedIntern.currentEducation}</div>
                      <div className="info-label">GPA</div>
                      <div className="info-value">{selectedIntern.gpa}</div>
                    </div>
                    <div className="info-row">
                      <div className="info-label">Graduation Year</div>
                      <div className="info-value">{selectedIntern.graduationYear}</div>
                    </div>
                  </div>
                </div>

                <div className="internship-info-section">
                  <h4>Internship Information</h4>
                  <div className="info-grid">
                    <div className="info-row">
                      <div className="info-label">Position</div>
                      <div className="info-value">{selectedIntern.postTitle}</div>
                      <div className="info-label">Start Date</div>
                      <div className="info-value">{selectedIntern.availableStartDate}</div>
                    </div>
                    <div className="info-row">
                      <div className="info-label">Status</div>
                      <div className="info-value">
                        <span
                          className={`status-badge ${selectedIntern.internshipStatus === "current" ? "status-current" : "status-completed"}`}
                        >
                          {selectedIntern.internshipStatus === "current" ? "Current" : "Completed"}
                        </span>
                      </div>
                      <div className="info-label">Availability</div>
                      <div className="info-value">{selectedIntern.availabilityHours}</div>
                    </div>
                  </div>
                </div>

                {selectedIntern.internshipStatus === "completed" && (
                  <div className="evaluation-section">
                    <div className="evaluation-header">
                      <h4>Evaluation</h4>
                      {selectedIntern.evaluation ? (
                        <div className="evaluation-actions">
                          <button className="edit-button" onClick={() => handleEditEvaluation(selectedIntern)}>
                            Edit
                          </button>
                          <button className="delete-button" onClick={() => handleDeleteEvaluation(selectedIntern.id)}>
                            Delete
                          </button>
                        </div>
                      ) : (
                        <button className="add-button" onClick={() => handleAddEvaluation(selectedIntern)}>
                          Add Evaluation
                        </button>
                      )}
                    </div>

                    {selectedIntern.evaluation ? (
                      <div className="evaluation-content">
                        <div className="rating-grid">
                          <div className="rating-item">
                            <span className="rating-label">Overall Performance:</span>
                            <span className="rating-value">{selectedIntern.evaluation.overallRating}/5</span>
                          </div>
                          <div className="rating-item">
                            <span className="rating-label">Technical Skills:</span>
                            <span className="rating-value">{selectedIntern.evaluation.technicalSkills}/5</span>
                          </div>
                          <div className="rating-item">
                            <span className="rating-label">Communication:</span>
                            <span className="rating-value">{selectedIntern.evaluation.communicationSkills}/5</span>
                          </div>
                          <div className="rating-item">
                            <span className="rating-label">Recommend for Hire:</span>
                            <span className="rating-value">
                              {selectedIntern.evaluation.recommendForHire ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                        <div className="evaluation-comments">
                          <h5>Comments</h5>
                          <p>{selectedIntern.evaluation.comments}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="no-evaluation">
                        <p>No evaluation has been submitted for this intern yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {showEvaluationModal && (
              <div className="evaluation-modal-overlay">
                <div className="evaluation-modal">
                  <div className="evaluation-modal-header">
                    <h3>{currentEvaluation ? "Edit Evaluation" : "New Evaluation"}</h3>
                    <button className="close-button" onClick={() => setShowEvaluationModal(false)}>
                      ×
                    </button>
                  </div>
                  <div className="evaluation-form">
                    <div className="rating-section">
                      <h4>Performance Ratings</h4>
                      <div className="rating-grid">
                        <div className="rating-item">
                          <label>Overall Performance:</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                className={`star-button ${evaluationData.overallRating >= star ? "active" : ""}`}
                                onClick={() => setEvaluationData({ ...evaluationData, overallRating: star })}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="rating-item">
                          <label>Technical Skills:</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                className={`star-button ${evaluationData.technicalSkills >= star ? "active" : ""}`}
                                onClick={() => setEvaluationData({ ...evaluationData, technicalSkills: star })}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="rating-item">
                          <label>Communication:</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                className={`star-button ${evaluationData.communicationSkills >= star ? "active" : ""}`}
                                onClick={() => setEvaluationData({ ...evaluationData, communicationSkills: star })}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="comments-section">
                      <h4>Comments</h4>
                      <textarea
                        value={evaluationData.comments}
                        onChange={(e) => setEvaluationData({ ...evaluationData, comments: e.target.value })}
                        placeholder="Enter your evaluation comments here..."
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="recommend-section">
                      <label>
                        <input
                          type="checkbox"
                          checked={evaluationData.recommendForHire}
                          onChange={(e) => setEvaluationData({ ...evaluationData, recommendForHire: e.target.checked })}
                        />
                        Recommend for future employment
                      </label>
                    </div>
                    <div className="modal-actions">
                      <button className="cancel-button" onClick={() => setShowEvaluationModal(false)}>
                        Cancel
                      </button>
                      <button className="save-button" onClick={handleSaveEvaluation}>
                        {currentEvaluation ? "Update" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Helper component to highlight search text
function HighlightText({ text, highlight }) {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="highlight">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  )
}
