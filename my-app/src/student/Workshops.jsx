"use client"

import { useState, useEffect, useRef } from "react"
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StarOutlined,
  StarFilled,
  SendOutlined,
  FileTextOutlined,
  DownloadOutlined,
  MessageOutlined,
  BellOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  SaveOutlined,
  LinkOutlined,
  LeftOutlined,
} from "@ant-design/icons"
import "./Workshops.css"

const Workshops = () => {
  // State for workshops and UI
  const [workshops, setWorkshops] = useState([])
  const [filteredWorkshops, setFilteredWorkshops] = useState([])
  const [selectedWorkshop, setSelectedWorkshop] = useState(null)
  const [viewMode, setViewMode] = useState("list") // list, details, live, recorded
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [registeredWorkshops, setRegisteredWorkshops] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [videoProgress, setVideoProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [notes, setNotes] = useState("")
  const [savedNotes, setSavedNotes] = useState({})
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatMessage, setChatMessage] = useState("")
  const [showCertificate, setShowCertificate] = useState(false)
  const [attendees, setAttendees] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [sidebarTab, setSidebarTab] = useState("chat")

  const videoRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Sample workshop data
  useEffect(() => {
    const sampleWorkshops = [
      {
        id: 1,
        title: "Resume Building for Creative Professionals",
        description:
          "Learn how to craft a compelling resume that showcases your creative skills and experiences. This workshop will cover portfolio integration, highlighting relevant projects, and tailoring your resume for different creative industries.",
        category: "Career Development",
        date: "2023-06-15T14:00:00",
        duration: 90, // minutes
        speaker: {
          name: "Dr. Emily Chen",
          title: "Career Counselor & Former Creative Director",
          bio: "Dr. Chen has over 15 years of experience in creative industries and now helps students transition from education to professional careers. She has placed hundreds of graduates in top design firms and tech companies.",
          avatar: "EC",
        },
        status: "upcoming",
        registrationDeadline: "2023-06-14T23:59:59",
        maxAttendees: 50,
        currentAttendees: 32,
        type: "live",
        agenda: [
          "Introduction to creative resumes (15 min)",
          "Portfolio integration strategies (20 min)",
          "Industry-specific tailoring (20 min)",
          "Common mistakes to avoid (15 min)",
          "Q&A session (20 min)",
        ],
        materials: ["Resume templates", "Example portfolios", "Industry guides"],
        videoUrl: "https://example.com/workshops/resume-building",
        recordingAvailable: false,
      },
      {
        id: 2,
        title: "Networking in the Digital Age",
        description:
          "Discover effective strategies for building your professional network online. This workshop covers LinkedIn optimization, virtual networking events, and how to make meaningful connections in remote environments.",
        category: "Career Development",
        date: "2023-06-20T15:30:00",
        duration: 60, // minutes
        speaker: {
          name: "Marcus Johnson",
          title: "LinkedIn Top Voice & Networking Specialist",
          bio: "Marcus has built a following of over 500,000 professionals on LinkedIn and specializes in helping students and early-career professionals expand their networks strategically.",
          avatar: "MJ",
        },
        status: "upcoming",
        registrationDeadline: "2023-06-19T23:59:59",
        maxAttendees: 100,
        currentAttendees: 78,
        type: "live",
        agenda: [
          "LinkedIn profile optimization (15 min)",
          "Finding and joining virtual networking events (10 min)",
          "Making meaningful connections online (15 min)",
          "Following up and maintaining relationships (10 min)",
          "Q&A session (10 min)",
        ],
        materials: ["LinkedIn checklist", "Networking templates", "Follow-up scripts"],
        videoUrl: "https://example.com/workshops/digital-networking",
        recordingAvailable: false,
      },
      {
        id: 3,
        title: "Portfolio Development for Designers",
        description:
          "Build a standout design portfolio that will impress potential employers and clients. Learn how to select your best work, present it effectively, and tell compelling stories about your design process.",
        category: "Design",
        date: "2023-06-10T10:00:00",
        duration: 120, // minutes
        speaker: {
          name: "Sophia Rodriguez",
          title: "Senior UX Designer at Google",
          bio: "Sophia has reviewed thousands of portfolios as a hiring manager at Google and previously at Adobe. She specializes in helping designers showcase their process and impact through effective storytelling.",
          avatar: "SR",
        },
        status: "completed",
        registrationDeadline: "2023-06-09T23:59:59",
        maxAttendees: 75,
        currentAttendees: 75,
        type: "recorded",
        agenda: [
          "Portfolio fundamentals (20 min)",
          "Case study structure (30 min)",
          "Visual presentation tips (25 min)",
          "Online portfolio platforms comparison (15 min)",
          "Portfolio review examples (20 min)",
          "Q&A session (10 min)",
        ],
        materials: ["Portfolio checklist", "Case study template", "Example portfolios"],
        videoUrl: "https://example.com/workshops/portfolio-development",
        recordingAvailable: true,
      },
      {
        id: 4,
        title: "Interviewing Skills for Creative Roles",
        description:
          "Prepare for interviews in creative industries with confidence. This workshop covers common interview questions, portfolio presentations, and how to demonstrate both your technical and soft skills.",
        category: "Career Development",
        date: "2023-06-25T13:00:00",
        duration: 90, // minutes
        speaker: {
          name: "Alex Thompson",
          title: "Talent Acquisition Manager at Adobe",
          bio: "Alex has conducted over 500 interviews for creative positions and now leads the creative talent acquisition team at Adobe. He specializes in identifying candidates who can demonstrate both technical excellence and cultural fit.",
          avatar: "AT",
        },
        status: "upcoming",
        registrationDeadline: "2023-06-24T23:59:59",
        maxAttendees: 60,
        currentAttendees: 42,
        type: "live",
        agenda: [
          "Pre-interview preparation (15 min)",
          "Portfolio presentation techniques (20 min)",
          "Answering technical questions (15 min)",
          "Behavioral questions and storytelling (15 min)",
          "Mock interview demonstrations (15 min)",
          "Q&A session (10 min)",
        ],
        materials: ["Interview question bank", "Portfolio presentation guide", "Follow-up templates"],
        videoUrl: "https://example.com/workshops/interview-skills",
        recordingAvailable: false,
      },
      {
        id: 5,
        title: "Freelancing 101 for Creatives",
        description:
          "Learn the essentials of starting and managing a successful freelance career in creative fields. This workshop covers finding clients, setting rates, managing projects, and handling the business side of freelancing.",
        category: "Entrepreneurship",
        date: "2023-06-05T11:00:00",
        duration: 120, // minutes
        speaker: {
          name: "David Wilson",
          title: "Freelance Creative Director & Business Coach",
          bio: "David has maintained a successful freelance career for over a decade, working with clients like Nike, Apple, and Coca-Cola. He now mentors emerging freelancers on building sustainable creative businesses.",
          avatar: "DW",
        },
        status: "completed",
        registrationDeadline: "2023-06-04T23:59:59",
        maxAttendees: 80,
        currentAttendees: 65,
        type: "recorded",
        agenda: [
          "Freelance foundations (15 min)",
          "Finding and qualifying clients (25 min)",
          "Pricing strategies (20 min)",
          "Contracts and legal considerations (20 min)",
          "Project management for freelancers (15 min)",
          "Financial management (15 min)",
          "Q&A session (10 min)",
        ],
        materials: ["Contract templates", "Pricing calculator", "Client onboarding checklist"],
        videoUrl: "https://example.com/workshops/freelancing-101",
        recordingAvailable: true,
      },
      {
        id: 6,
        title: "Design Thinking for Problem Solving",
        description:
          "Apply design thinking methodology to solve complex problems in any field. This workshop introduces the design thinking process and provides hands-on experience with each stage through interactive exercises.",
        category: "Design",
        date: "2023-07-02T14:00:00",
        duration: 180, // minutes
        speaker: {
          name: "Dr. James Lee",
          title: "Design Thinking Professor at Stanford d.school",
          bio: "Dr. Lee has taught design thinking at Stanford for 12 years and has consulted with Fortune 500 companies on implementing design thinking processes. His approach combines academic rigor with practical application.",
          avatar: "JL",
        },
        status: "upcoming",
        registrationDeadline: "2023-07-01T23:59:59",
        maxAttendees: 40,
        currentAttendees: 28,
        type: "live",
        agenda: [
          "Introduction to design thinking (20 min)",
          "Empathize: User research techniques (30 min)",
          "Define: Problem framing (30 min)",
          "Ideate: Creative brainstorming (30 min)",
          "Prototype: Rapid visualization (30 min)",
          "Test: Feedback and iteration (30 min)",
          "Q&A session (10 min)",
        ],
        materials: ["Design thinking canvas", "User interview templates", "Prototyping toolkit"],
        videoUrl: "https://example.com/workshops/design-thinking",
        recordingAvailable: false,
      },
      {
        id: 7,
        title: "Advanced JavaScript Techniques",
        description:
          "Master advanced JavaScript concepts including closures, prototypes, async/await, and functional programming patterns. This workshop will help you write more efficient and maintainable code.",
        category: "Programming",
        date: "2023-05-20T13:00:00",
        duration: 120, // minutes
        speaker: {
          name: "Thomas Wright",
          title: "Senior JavaScript Developer at Netflix",
          bio: "Thomas has been working with JavaScript for over 10 years and specializes in performance optimization and modern JS patterns. He's contributed to several open-source projects and regularly speaks at tech conferences.",
          avatar: "TW",
        },
        status: "completed",
        registrationDeadline: "2023-05-19T23:59:59",
        maxAttendees: 60,
        currentAttendees: 58,
        type: "recorded",
        agenda: [
          "Modern JavaScript syntax (20 min)",
          "Closures and scope (25 min)",
          "Prototypal inheritance (25 min)",
          "Async patterns (30 min)",
          "Functional programming concepts (20 min)",
        ],
        materials: ["Code examples", "Cheat sheets", "Reference guide"],
        videoUrl: "https://example.com/workshops/advanced-javascript",
        recordingAvailable: true,
      },
      {
        id: 8,
        title: "Personal Branding for Tech Professionals",
        description:
          "Learn how to build a strong personal brand that will help you stand out in the competitive tech industry. This workshop covers online presence, networking strategies, and content creation.",
        category: "Career Development",
        date: "2023-05-15T10:00:00",
        duration: 90, // minutes
        speaker: {
          name: "Lisa Chen",
          title: "Personal Brand Strategist & Former Tech Recruiter",
          bio: "Lisa has helped hundreds of tech professionals build personal brands that attract opportunities. With a background in tech recruiting, she understands what companies look for beyond technical skills.",
          avatar: "LC",
        },
        status: "completed",
        registrationDeadline: "2023-05-14T23:59:59",
        maxAttendees: 75,
        currentAttendees: 70,
        type: "recorded",
        agenda: [
          "Why personal branding matters in tech (15 min)",
          "Defining your unique value proposition (20 min)",
          "Building your online presence (20 min)",
          "Content creation strategies (20 min)",
          "Networking effectively (15 min)",
        ],
        materials: ["Personal brand worksheet", "Content calendar template", "Platform guide"],
        videoUrl: "https://example.com/workshops/personal-branding",
        recordingAvailable: true,
      },
      {
        id: 9,
        title: "Introduction to Machine Learning",
        description:
          "Get started with machine learning fundamentals and practical applications. This workshop introduces key concepts, algorithms, and tools for beginners interested in AI and data science.",
        category: "Data Science",
        date: "2023-04-28T14:00:00",
        duration: 150, // minutes
        speaker: {
          name: "Dr. Priya Sharma",
          title: "AI Researcher & University Professor",
          bio: "Dr. Sharma leads AI research at a top university and has published numerous papers on machine learning applications. She specializes in making complex ML concepts accessible to beginners.",
          avatar: "PS",
        },
        status: "completed",
        registrationDeadline: "2023-04-27T23:59:59",
        maxAttendees: 50,
        currentAttendees: 48,
        type: "recorded",
        agenda: [
          "Machine learning fundamentals (30 min)",
          "Supervised vs. unsupervised learning (25 min)",
          "Common algorithms overview (30 min)",
          "Tools and frameworks (25 min)",
          "Building your first model (40 min)",
        ],
        materials: ["Jupyter notebooks", "Dataset examples", "Algorithm cheat sheet"],
        videoUrl: "https://example.com/workshops/intro-machine-learning",
        recordingAvailable: true,
      },
    ]

    setWorkshops(sampleWorkshops)
    setFilteredWorkshops(sampleWorkshops)

    // Sample registered workshops
    setRegisteredWorkshops([1, 4, 6, 3, 5, 7, 8, 9])

    // Sample notifications
    setNotifications([
      {
        id: 1,
        type: "reminder",
        message: "Design Thinking workshop starts in 2 days",
        workshopId: 6,
        timestamp: "2023-06-30T14:00:00",
        read: false,
      },
      {
        id: 2,
        type: "registration",
        message: "You've successfully registered for Interviewing Skills workshop",
        workshopId: 4,
        timestamp: "2023-06-20T09:15:00",
        read: true,
      },
      {
        id: 3,
        type: "chat",
        message: "New message in Design Thinking workshop chat",
        workshopId: 6,
        timestamp: "2023-06-29T16:30:00",
        read: false,
      },
    ])

    // Count unread notifications
    setUnreadNotifications(notifications.filter((notification) => !notification.read).length)

    // Sample chat messages for a workshop
    const sampleChatMessages = [
      {
        id: 1,
        userId: "user1",
        userName: "Jane Smith",
        message: "Hello everyone! Excited for this workshop!",
        timestamp: "2023-06-15T13:55:00",
      },
      {
        id: 2,
        userId: "user2",
        userName: "Michael Brown",
        message: "Me too! I've been looking forward to learning about design thinking.",
        timestamp: "2023-06-15T13:56:00",
      },
      {
        id: 3,
        userId: "speaker",
        userName: "Dr. James Lee",
        message:
          "Welcome everyone! We'll be starting in about 5 minutes. Feel free to introduce yourselves in the chat.",
        timestamp: "2023-06-15T13:57:00",
      },
      {
        id: 4,
        userId: "user3",
        userName: "Sarah Johnson",
        message: "Hi all! Sarah here from the graphic design program.",
        timestamp: "2023-06-15T13:58:00",
      },
      {
        id: 5,
        userId: "currentUser",
        userName: "You",
        message: "Hello everyone! Looking forward to the session.",
        timestamp: "2023-06-15T13:59:00",
      },
    ]
    setChatMessages(sampleChatMessages)

    // Sample attendees
    const sampleAttendees = [
      { id: "user1", name: "Jane Smith", role: "Student" },
      { id: "user2", name: "Michael Brown", role: "Student" },
      { id: "user3", name: "Sarah Johnson", role: "Student" },
      { id: "user4", name: "Robert Davis", role: "Student" },
      { id: "speaker", name: "Dr. James Lee", role: "Speaker" },
      { id: "currentUser", name: "You", role: "Student" },
    ]
    setAttendees(sampleAttendees)
  }, [])

  // Filter workshops based on search term and filters
  useEffect(() => {
    let filtered = [...workshops]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (workshop) =>
          workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.speaker.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((workshop) => workshop.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((workshop) => workshop.status === statusFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date)
      } else if (sortBy === "popularity") {
        return b.currentAttendees - a.currentAttendees
      } else if (sortBy === "duration") {
        return b.duration - a.duration
      }
      return 0
    })

    setFilteredWorkshops(filtered)
  }, [workshops, searchTerm, categoryFilter, statusFilter, sortBy])

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format time
  const formatTime = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true }
    return new Date(dateString).toLocaleTimeString(undefined, options)
  }

  // Check if a workshop is registered
  const isRegistered = (workshopId) => {
    return registeredWorkshops.includes(workshopId)
  }

  // Register for a workshop
  const registerForWorkshop = (workshopId) => {
    if (!isRegistered(workshopId)) {
      setRegisteredWorkshops([...registeredWorkshops, workshopId])

      // Add registration notification
      const workshop = workshops.find((w) => w.id === workshopId)
      addNotification({
        type: "registration",
        message: `You've successfully registered for ${workshop.title}`,
        workshopId: workshopId,
      })
    }
  }

  // Unregister from a workshop
  const unregisterFromWorkshop = (workshopId) => {
    setRegisteredWorkshops(registeredWorkshops.filter((id) => id !== workshopId))
  }

  // Add a notification
  const addNotification = (notification) => {
    const newNotification = {
      id: notifications.length + 1,
      ...notification,
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications([newNotification, ...notifications])
    setUnreadNotifications(unreadNotifications + 1)
  }

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId ? { ...notification, read: true } : notification,
    )
    setNotifications(updatedNotifications)
    setUnreadNotifications(updatedNotifications.filter((notification) => !notification.read).length)
  }

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({ ...notification, read: true }))
    setNotifications(updatedNotifications)
    setUnreadNotifications(0)
  }

  // Handle video play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Update video progress
  const updateVideoProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setVideoProgress(progress)
    }
  }

  // Seek video
  const seekVideo = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
      videoRef.current.currentTime = clickPosition * videoRef.current.duration
    }
  }

  // Save notes
  const saveNotes = () => {
    if (selectedWorkshop) {
      setSavedNotes({
        ...savedNotes,
        [selectedWorkshop.id]: notes,
      })
      // Show a temporary success message
      alert("Notes saved successfully!")
    }
  }

  // Submit feedback
  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        userId: "currentUser",
        userName: "You",
        message: chatMessage,
        timestamp: new Date().toISOString(),
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  // Format relative time for chat messages
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`
  }

  // View workshop details
  const viewWorkshopDetails = (workshop) => {
    setSelectedWorkshop(workshop)
    setViewMode("details")

    // Load saved notes if they exist
    if (savedNotes[workshop.id]) {
      setNotes(savedNotes[workshop.id])
    } else {
      setNotes("")
    }
  }

  // Join live workshop
  const joinLiveWorkshop = (workshop) => {
    setSelectedWorkshop(workshop)
    setViewMode("live")
  }

  // Watch recorded workshop
  const watchRecordedWorkshop = (workshop) => {
    setSelectedWorkshop(workshop)
    setViewMode("recorded")
    setIsPlaying(false)
    setVideoProgress(0)
  }

  // Generate certificate
  const generateCertificate = () => {
    // In a real app, you would verify completion status
    if (selectedWorkshop && selectedWorkshop.status === "completed") {
      setShowCertificate(true);
    } else {
      alert("You must complete the workshop to receive a certificate.");
    }
  }

  // Close certificate
  const closeCertificate = () => {
    setShowCertificate(false)
  }

  // Get unique categories for filter
  const categories = ["all", ...new Set(workshops.map((workshop) => workshop.category))]

  const submitFeedback = () => {
    if (selectedWorkshop && rating > 0) {
      // In a real app, you would send this to your backend
      console.log(`Feedback for workshop ${selectedWorkshop.id}:`, { rating, feedback });
      
      // Show success message and reset form
      setShowFeedbackForm(false);
      setRating(0);
      setFeedback("");
      
      // Add a notification about successful feedback submission
      addNotification({
        type: "feedback",
        message: `Thank you for rating "${selectedWorkshop.title}"`,
        workshopId: selectedWorkshop.id,
      });
      
      alert("Thank you for your feedback! Your input helps us improve our workshops.");
    } else {
      alert("Please provide a rating before submitting.");
    }
  }

  const handleVideoKeyControls = (e) => {
    if (videoRef.current) {
      // Space bar to play/pause
      if (e.keyCode === 32) {
        e.preventDefault();
        togglePlayPause();
      }
      
      // Left arrow to rewind 5 seconds
      if (e.keyCode === 37) {
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
      
      // Right arrow to forward 5 seconds
      if (e.keyCode === 39) {
        videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
      }
    }
  }

  useEffect(() => {
    if (viewMode === "recorded") {
      window.addEventListener('keydown', handleVideoKeyControls);
      
      return () => {
        window.removeEventListener('keydown', handleVideoKeyControls);
      };
    }
  }, [viewMode, isPlaying]);

  return (
    <div className="workshops-container">
      {/* Workshop List View */}
      {viewMode === "list" && (
        <>
          <div className="workshops-header">
            <div>
              <h1>Career Workshops</h1>
              <p>Enhance your skills and prepare for your career with our online workshops</p>
            </div>
            <div className="header-actions">
             
            </div>
          </div>

          <div className="workshops-tabs">
            <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
              All Workshops
            </button>
            <button
              className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed Workshops
            </button>
          </div>

          <div className="workshops-stats">
            <div className="stat-card">
              <h3>{workshops.filter((w) => w.status === "upcoming").length}</h3>
              <p>Upcoming Workshops</p>
            </div>
            <div className="stat-card">
              <h3>{registeredWorkshops.length}</h3>
              <p>Registered Workshops</p>
            </div>
            <div className="stat-card">
              <h3>{workshops.filter((w) => w.status === "completed" && w.recordingAvailable).length}</h3>
              <p>Available Recordings</p>
            </div>
          </div>

          {activeTab === "all" ? (
            <div className="workshops-list">
              {workshops.filter((w) => w.status === "upcoming").length > 0 ? (
                workshops
                  .filter((w) => w.status === "upcoming")
                  .map((workshop) => (
                    <div className="workshop-card" key={workshop.id}>
                      <div className="workshop-card-header">
                        <div className="workshop-type-badge">{workshop.type === "live" ? "Live" : "Recorded"}</div>
                        <h3>{workshop.title}</h3>
                      </div>
                      <div className="workshop-card-content">
                        <div className="workshop-meta">
                          <div className="workshop-date">
                            <CalendarOutlined /> {formatDate(workshop.date)}
                          </div>
                          <div className="workshop-time">
                            <ClockCircleOutlined /> {formatTime(workshop.date)} ({workshop.duration} min)
                          </div>
                          <div className="workshop-speaker">
                            <UserOutlined /> {workshop.speaker.name}
                          </div>
                          <div className="workshop-category">{workshop.category}</div>
                        </div>
                        <p className="workshop-description-preview">
                          {workshop.description.length > 150
                            ? `${workshop.description.substring(0, 150)}...`
                            : workshop.description}
                        </p>
                        <div className="workshop-attendance">
                          <div className="attendance-bar">
                            <div
                              className="attendance-progress"
                              style={{ width: `${(workshop.currentAttendees / workshop.maxAttendees) * 100}%` }}
                            ></div>
                          </div>
                          <span className="attendance-text">
                            {workshop.currentAttendees} / {workshop.maxAttendees} attendees
                          </span>
                        </div>
                      </div>
                      <div className="workshop-card-footer">
                        <div className="workshop-status">
                          <span className="status-badge upcoming">Upcoming</span>
                        </div>
                        <div className="workshop-actions">
                          <button className="view-details-btn" onClick={() => viewWorkshopDetails(workshop)}>
                            View Details
                          </button>
                          {isRegistered(workshop.id) ? (
                            <button
                              className="register-btn registered"
                              onClick={() => unregisterFromWorkshop(workshop.id)}
                            >
                              <CheckCircleOutlined /> Registered
                            </button>
                          ) : (
                            <button
                              className="register-btn"
                              onClick={() => registerForWorkshop(workshop.id)}
                              disabled={workshop.currentAttendees >= workshop.maxAttendees}
                            >
                              Register Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-workshops">
                  <p>No upcoming workshops available.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="workshops-list">
              {workshops.filter((workshop) => workshop.status === "completed" && registeredWorkshops.includes(workshop.id)).length > 0 ? (
                workshops
                  .filter((workshop) => workshop.status === "completed" && registeredWorkshops.includes(workshop.id))
                  .map((workshop) => (
                    <div className="workshop-card" key={workshop.id}>
                      <div className="workshop-card-header">
                        <div className="workshop-type-badge">{workshop.type === "live" ? "Live" : "Recorded"}</div>
                        <h3>{workshop.title}</h3>
                      </div>
                      <div className="workshop-card-content">
                        <div className="workshop-meta">
                          <div className="workshop-date">
                            <CalendarOutlined /> {formatDate(workshop.date)}
                          </div>
                          <div className="workshop-time">
                            <ClockCircleOutlined /> {formatTime(workshop.date)} ({workshop.duration} min)
                          </div>
                          <div className="workshop-speaker">
                            <UserOutlined /> {workshop.speaker.name}
                          </div>
                          <div className="workshop-category">{workshop.category}</div>
                        </div>
                        <p className="workshop-description-preview">
                          {workshop.description.length > 150
                            ? `${workshop.description.substring(0, 150)}...`
                            : workshop.description}
                        </p>
                      </div>
                      <div className="workshop-card-footer">
                        <div className="workshop-status">
                          <span className="status-badge completed">Completed</span>
                        </div>
                        <div className="workshop-actions">
                          <button className="view-details-btn" onClick={() => viewWorkshopDetails(workshop)}>
                            View Details
                          </button>
                          {workshop.recordingAvailable && (
                            <button className="watch-recording-btn" onClick={() => watchRecordedWorkshop(workshop)}>
                              <PlayCircleOutlined /> Watch Recording
                            </button>
                          )}
                          <button className="certificate-btn" onClick={() => generateCertificate()}>
                            <DownloadOutlined /> Certificate
                          </button>
                          <button className="rate-btn" onClick={() => setShowFeedbackForm(true)}>
                            <StarOutlined /> Rate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-workshops">
                  <p>You haven't completed any workshops yet.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Workshop Details View */}
      {viewMode === "details" && selectedWorkshop && (
        <div className="workshop-details-container">
          <div className="workshop-details-header">
            <button className="back-button" onClick={() => setViewMode("list")}>
              <LeftOutlined /> Back to Workshops
            </button>
            {selectedWorkshop.status === "upcoming" && isRegistered(selectedWorkshop.id) && (
              <div className="registered-badge">
                <CheckCircleOutlined /> You're Registered
              </div>
            )}
          </div>

          <div className="workshop-details-content">
            <h1>{selectedWorkshop.title}</h1>

            <div className="workshop-meta-details">
              <div className="workshop-meta-item">
                <CalendarOutlined /> {formatDate(selectedWorkshop.date)}
              </div>
              <div className="workshop-meta-item">
                <ClockCircleOutlined /> {formatTime(selectedWorkshop.date)} ({selectedWorkshop.duration} min)
              </div>
              <div className="workshop-meta-item">
                <TeamOutlined /> {selectedWorkshop.currentAttendees} attendees
              </div>
              <div className="workshop-meta-item workshop-category">{selectedWorkshop.category}</div>
              <div className="workshop-meta-item workshop-type">
                {selectedWorkshop.type === "live" ? <VideoCameraOutlined /> : <PlayCircleOutlined />}{" "}
                {selectedWorkshop.type === "live" ? "Live Workshop" : "Recorded Workshop"}
              </div>
            </div>

            <div className="workshop-description-section">
              <h2>About This Workshop</h2>
              <p>{selectedWorkshop.description}</p>
            </div>

            <div className="workshop-speaker-section">
              <h2>Speaker</h2>
              <div className="speaker-info">
                <div className="speaker-avatar">{selectedWorkshop.speaker.avatar}</div>
                <div className="speaker-details">
                  <h3>{selectedWorkshop.speaker.name}</h3>
                  <p className="speaker-title">{selectedWorkshop.speaker.title}</p>
                  <p className="speaker-bio">{selectedWorkshop.speaker.bio}</p>
                </div>
              </div>
            </div>

            <div className="workshop-agenda-section">
              <h2>Workshop Agenda</h2>
              <ul className="agenda-list">
                {selectedWorkshop.agenda.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="workshop-materials-section">
              <h2>Materials</h2>
              <ul className="materials-list">
                {selectedWorkshop.materials.map((item, index) => (
                  <li key={index}>
                    <FileTextOutlined /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="workshop-actions-section">
              {selectedWorkshop.status === "upcoming" && (
                <>
                  {isRegistered(selectedWorkshop.id) ? (
                    <div className="action-buttons">
                      <button className="unregister-btn" onClick={() => unregisterFromWorkshop(selectedWorkshop.id)}>
                        Cancel Registration
                      </button>
                      <button className="join-btn" onClick={() => joinLiveWorkshop(selectedWorkshop)}>
                        <VideoCameraOutlined /> Join Live Workshop
                      </button>
                    </div>
                  ) : (
                    <button
                      className="register-btn large"
                      onClick={() => registerForWorkshop(selectedWorkshop.id)}
                      disabled={selectedWorkshop.currentAttendees >= selectedWorkshop.maxAttendees}
                    >
                      Register for This Workshop
                    </button>
                  )}
                </>
              )}

              {selectedWorkshop.status === "completed" && selectedWorkshop.recordingAvailable && (
                <button className="watch-recording-btn large" onClick={() => watchRecordedWorkshop(selectedWorkshop)}>
                  <PlayCircleOutlined /> Watch Recording
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Live Workshop View */}
      {viewMode === "live" && selectedWorkshop && (
        <div className="live-workshop-container">
          <div className="live-workshop-header">
            <button className="back-button" onClick={() => setViewMode("details")}>
              <LeftOutlined /> Back to Details
            </button>
            <h2>{selectedWorkshop.title} (Live)</h2>
            <div className="live-indicator">
              <span className="live-dot"></span> LIVE
            </div>
          </div>

          <div className="live-workshop-content">
            <div className="video-section">
              <div className="video-container">
                <div className="video-placeholder">
                  <VideoCameraOutlined />
                  <p>Live video stream will appear here when the workshop begins</p>
                </div>
              </div>
            </div>

            <div className="live-workshop-sidebar">
              <div className="tabs">
                <button
                  className={`tab-button ${sidebarTab === "chat" ? "active" : ""}`}
                  onClick={() => setSidebarTab("chat")}
                >
                  Chat
                </button>
                <button
                  className={`tab-button ${sidebarTab === "notes" ? "active" : ""}`}
                  onClick={() => setSidebarTab("notes")}
                >
                  Notes
                </button>
                <button
                  className={`tab-button ${sidebarTab === "attendees" ? "active" : ""}`}
                  onClick={() => setSidebarTab("attendees")}
                >
                  Attendees
                </button>
              </div>

              <div className="tab-content">
                {sidebarTab === "chat" && (
                  <div className="chat-container">
                    <div className="chat-messages" ref={chatContainerRef}>
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`chat-message ${message.userId === "currentUser" ? "own-message" : ""} ${
                            message.userId === "speaker" ? "speaker-message" : ""
                          }`}
                        >
                          <div className="message-header">
                            <span className="message-sender">{message.userName}</span>
                            <span className="message-time">{formatRelativeTime(message.timestamp)}</span>
                          </div>
                          <div className="message-content">{message.message}</div>
                        </div>
                      ))}
                    </div>
                    <div className="chat-input-container">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                      />
                      <button onClick={sendChatMessage}>
                        <SendOutlined />
                      </button>
                    </div>
                  </div>
                )}

                {sidebarTab === "notes" && (
                  <div className="notes-container">
                    <textarea
                      placeholder="Take notes here..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                    <button className="save-notes-btn" onClick={saveNotes}>
                      <SaveOutlined /> Save Notes
                    </button>
                  </div>
                )}

                {sidebarTab === "attendees" && (
                  <div className="attendees-container">
                    <div className="attendees-list">
                      {attendees.map((attendee) => (
                        <div key={attendee.id} className="attendee-item">
                          <div className="attendee-avatar">{attendee.name.charAt(0)}</div>
                          <div className="attendee-info">
                            <div className="attendee-name">{attendee.name}</div>
                            <div className="attendee-role">{attendee.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="live-workshop-footer">
            <div className="workshop-info">
              <div className="speaker-info">
                <div className="speaker-avatar small">{selectedWorkshop.speaker.avatar}</div>
                <div className="speaker-name">{selectedWorkshop.speaker.name}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recorded Workshop View */}
      {viewMode === "recorded" && selectedWorkshop && (
        <div className="recorded-workshop-container">
          <div className="recorded-workshop-header">
            <button className="back-button" onClick={() => setViewMode("details")}>
              <LeftOutlined /> Back to Details
            </button>
            <h2>{selectedWorkshop.title} (Recording)</h2>
          </div>

          <div className="recorded-workshop-content">
            <div className="video-container">
              <video
                ref={videoRef}
                onTimeUpdate={updateVideoProgress}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-controls">
                <button className="play-pause-btn" onClick={togglePlayPause}>
                  {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                </button>
                <div className="progress-container" onClick={seekVideo}>
                  <div className="progress-bar" style={{ width: `${videoProgress}%` }}></div>
                </div>
                <div className="video-time">
                  {videoRef.current ? Math.floor(videoRef.current.currentTime / 60) + ':' + 
                    ('0' + Math.floor(videoRef.current.currentTime % 60)).slice(-2) : '0:00'} / 
                  {videoRef.current ? Math.floor(videoRef.current.duration / 60) + ':' + 
                    ('0' + Math.floor(videoRef.current.duration % 60)).slice(-2) : '0:00'}
                </div>
              </div>
            </div>

            <div className="recorded-workshop-sidebar">
              <div className="tabs">
                <button className="tab-button active">Notes</button>
                <button className="tab-button">Materials</button>
              </div>

              <div className="tab-content">
                <div className="notes-container">
                  <h3>Workshop Notes</h3>
                  <textarea
                    placeholder="Take notes while watching the workshop..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                  <button className="save-notes-btn" onClick={saveNotes}>
                    <SaveOutlined /> Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="recorded-workshop-footer">
            <div className="workshop-info">
              <div className="speaker-info">
                <div className="speaker-avatar small">{selectedWorkshop.speaker.avatar}</div>
                <div className="speaker-name">{selectedWorkshop.speaker.name}</div>
              </div>
            </div>
            {selectedWorkshop.status === "completed" && (
              <div className="workshop-actions">
                <button className="action-button" onClick={() => setShowFeedbackForm(true)}>
                  <StarOutlined /> Rate Workshop
                </button>
                <button className="action-button" onClick={generateCertificate}>
                  <DownloadOutlined /> Get Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback Form */}
      {showFeedbackForm && selectedWorkshop && (
        <div className="modal-overlay">
          <div className="feedback-form">
            <div className="feedback-header">
              <h2>Rate this Workshop</h2>
              <button className="close-button" onClick={() => setShowFeedbackForm(false)}>
                <CloseOutlined />
              </button>
            </div>
            <div className="feedback-content">
              <h3>{selectedWorkshop.title}</h3>
              <div className="rating-container">
                <p>How would you rate this workshop?</p>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} onClick={() => setRating(star)}>
                      {star <= rating ? <StarFilled /> : <StarOutlined />}
                    </span>
                  ))}
                </div>
              </div>
              <div className="feedback-text">
                <p>Share your thoughts about this workshop:</p>
                <textarea
                  placeholder="Your feedback helps us improve future workshops..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>
              <div className="feedback-actions">
                <button className="cancel-btn" onClick={() => setShowFeedbackForm(false)}>
                  Cancel
                </button>
                <button className="submit-btn" onClick={submitFeedback}>
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate */}
      {showCertificate && selectedWorkshop && (
        <div className="modal-overlay">
          <div className="certificate">
            <button className="close-button" onClick={closeCertificate}>
              <CloseOutlined />
            </button>
            <div className="certificate-content">
              <div className="certificate-header">
                <h2>Certificate of Completion</h2>
              </div>
              <div className="certificate-body">
                <p className="certificate-text">This is to certify that</p>
                <p className="certificate-name">Student Name</p>
                <p className="certificate-text">has successfully completed the workshop</p>
                <p className="certificate-course">{selectedWorkshop.title}</p>
                <p className="certificate-date">on {formatDate(selectedWorkshop.date)}</p>
                <div className="certificate-signature">
                  <div className="signature-line"></div>
                  <p>{selectedWorkshop.speaker.name}</p>
                  <p>{selectedWorkshop.speaker.title}</p>
                </div>
              </div>
              <div className="certificate-footer">
                <button className="download-certificate-btn">
                  <DownloadOutlined /> Download Certificate
                </button>
                <button className="share-certificate-btn">
                  <LinkOutlined /> Share Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Workshops
