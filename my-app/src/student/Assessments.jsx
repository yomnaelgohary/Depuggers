"use client"

import { useState } from "react"
import {
  FileTextOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  StarFilled,
  SearchOutlined,
  FilterOutlined,
  LockOutlined,
  UnlockOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import "./Assessments.css"

const Assessments = () => {
  const [activeTab, setActiveTab] = useState("available")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [score, setScore] = useState(null)
  const [sharedOnProfile, setSharedOnProfile] = useState([])

  // Sample data for available assessments
  const availableAssessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      category: "Programming",
      difficulty: "Beginner",
      estimatedTime: "30 min",
      questions: 20,
      popularity: 95,
      description: "Test your knowledge of JavaScript basics including variables, functions, and control flow.",
      icon: "JS",
      color: "#F7DF1E",
      questions: [
        {
          id: 1,
          question: "Which of the following is a primitive data type in JavaScript?",
          options: ["Array", "Object", "String", "Function"],
          correctAnswer: "String",
        },
        {
          id: 2,
          question: "What does the '===' operator do in JavaScript?",
          options: [
            "Checks for equality with type conversion",
            "Checks for equality without type conversion",
            "Assigns a value",
            "Checks if a variable is defined",
          ],
          correctAnswer: "Checks for equality without type conversion",
        },
        {
          id: 3,
          question: "Which method adds an element to the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: "push()",
        },
      ],
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      category: "Design",
      difficulty: "Intermediate",
      estimatedTime: "45 min",
      questions: 25,
      popularity: 88,
      description: "Evaluate your understanding of user interface and experience design principles.",
      icon: "UI",
      color: "#FF6B6B",
      questions: [
        {
          id: 1,
          question: "What is the primary goal of UX design?",
          options: [
            "Making interfaces visually appealing",
            "Enhancing user satisfaction by improving usability",
            "Creating complex interactions",
            "Implementing the latest design trends",
          ],
          correctAnswer: "Enhancing user satisfaction by improving usability",
        },
        {
          id: 2,
          question: "Which of these is NOT a principle of visual hierarchy?",
          options: ["Size", "Color", "Alignment", "Randomization"],
          correctAnswer: "Randomization",
        },
        {
          id: 3,
          question: "What does the term 'affordance' refer to in UI design?",
          options: [
            "The cost of implementing a design",
            "The visual clues that indicate how an object should be used",
            "The time it takes to implement a feature",
            "The number of elements on a screen",
          ],
          correctAnswer: "The visual clues that indicate how an object should be used",
        },
      ],
    },
    {
      id: 3,
      title: "Adobe Photoshop Skills",
      category: "Design",
      difficulty: "Advanced",
      estimatedTime: "60 min",
      questions: 30,
      popularity: 82,
      description: "Test your proficiency with Adobe Photoshop tools, techniques, and workflows.",
      icon: "PS",
      color: "#31A8FF",
      questions: [
        {
          id: 1,
          question: "Which tool would you use to remove small imperfections from an image?",
          options: ["Clone Stamp Tool", "Healing Brush Tool", "Eraser Tool", "Blur Tool"],
          correctAnswer: "Healing Brush Tool",
        },
        {
          id: 2,
          question: "What does the 'Curves' adjustment primarily control?",
          options: ["Color balance", "Tonal range and contrast", "Saturation", "Sharpness"],
          correctAnswer: "Tonal range and contrast",
        },
        {
          id: 3,
          question: "Which file format best preserves layers in a Photoshop document?",
          options: ["JPEG", "PNG", "PSD", "GIF"],
          correctAnswer: "PSD",
        },
      ],
    },
    {
      id: 4,
      title: "Digital Marketing Fundamentals",
      category: "Marketing",
      difficulty: "Beginner",
      estimatedTime: "40 min",
      questions: 25,
      popularity: 90,
      description: "Assess your knowledge of digital marketing concepts, channels, and strategies.",
      icon: "DM",
      color: "#6C63FF",
      questions: [
        {
          id: 1,
          question: "What does SEO stand for?",
          options: [
            "Search Engine Optimization",
            "Social Engagement Opportunities",
            "Search Experience Optimization",
            "Social Engine Optimization",
          ],
          correctAnswer: "Search Engine Optimization",
        },
        {
          id: 2,
          question: "Which metric measures the percentage of website visitors who leave after viewing only one page?",
          options: ["Conversion rate", "Bounce rate", "Click-through rate", "Impression share"],
          correctAnswer: "Bounce rate",
        },
        {
          id: 3,
          question: "Which of these is NOT a common social media marketing objective?",
          options: ["Brand awareness", "Lead generation", "Website traffic", "Server maintenance"],
          correctAnswer: "Server maintenance",
        },
      ],
    },
    {
      id: 5,
      title: "3D Modeling Basics",
      category: "Animation",
      difficulty: "Intermediate",
      estimatedTime: "50 min",
      questions: 20,
      popularity: 75,
      description: "Test your understanding of 3D modeling concepts, tools, and techniques.",
      icon: "3D",
      color: "#00C853",
      questions: [
        {
          id: 1,
          question: "What is a polygon in 3D modeling?",
          options: [
            "A two-dimensional shape",
            "A three-dimensional primitive",
            "A type of texture",
            "A rendering technique",
          ],
          correctAnswer: "A two-dimensional shape",
        },
        {
          id: 2,
          question: "Which of these is NOT a common 3D modeling technique?",
          options: ["Box modeling", "NURBS modeling", "Sculpting", "Vector tracing"],
          correctAnswer: "Vector tracing",
        },
        {
          id: 3,
          question: "What does 'topology' refer to in 3D modeling?",
          options: [
            "The arrangement of polygons on a 3D model",
            "The color of a model",
            "The rendering speed",
            "The file size of a model",
          ],
          correctAnswer: "The arrangement of polygons on a 3D model",
        },
      ],
    },
  ]

  // Sample data for completed assessments
  const [completedAssessments, setCompletedAssessments] = useState([
    {
      id: 1,
      title: "HTML & CSS Basics",
      category: "Programming",
      completedDate: "2023-04-15T14:30:00",
      score: 85,
      maxScore: 100,
      sharedOnProfile: true,
      icon: "HC",
      color: "#E44D26",
    },
    {
      id: 2,
      title: "Typography Fundamentals",
      category: "Design",
      completedDate: "2023-04-10T09:45:00",
      score: 92,
      maxScore: 100,
      sharedOnProfile: false,
      icon: "TF",
      color: "#9C27B0",
    },
  ])

  // Format date to relative time
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

  // Filter assessments based on search term and filters
  const filteredAssessments = availableAssessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || assessment.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || assessment.difficulty === difficultyFilter

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Sort assessments based on selected sort option
  const sortedAssessments = [...filteredAssessments].sort((a, b) => {
    if (sortBy === "popular") {
      return b.popularity - a.popularity
    } else if (sortBy === "newest") {
      return new Date(b.id) - new Date(a.id) // Using id as a proxy for date in this example
    } else if (sortBy === "difficulty") {
      const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 }
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    }
    return 0
  })

  // Start an assessment
  const startAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setUserAnswers({})
    setAssessmentCompleted(false)
    setScore(null)
  }

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    })
  }

  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestion < selectedAssessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      let correctAnswers = 0
      selectedAssessment.questions.forEach((question) => {
        if (userAnswers[question.id] === question.correctAnswer) {
          correctAnswers++
        }
      })

      const calculatedScore = Math.round((correctAnswers / selectedAssessment.questions.length) * 100)
      setScore(calculatedScore)
      setAssessmentCompleted(true)

      // Add to completed assessments
      const newCompletedAssessment = {
        id: selectedAssessment.id,
        title: selectedAssessment.title,
        category: selectedAssessment.category,
        completedDate: new Date().toISOString(),
        score: calculatedScore,
        maxScore: 100,
        sharedOnProfile: false,
        icon: selectedAssessment.icon,
        color: selectedAssessment.color,
      }

      // Check if assessment already exists in completed list
      const existingIndex = completedAssessments.findIndex((a) => a.id === selectedAssessment.id)
      if (existingIndex >= 0) {
        const updatedCompletedAssessments = [...completedAssessments]
        updatedCompletedAssessments[existingIndex] = newCompletedAssessment
        setCompletedAssessments(updatedCompletedAssessments)
      } else {
        setCompletedAssessments([...completedAssessments, newCompletedAssessment])
      }
    }
  }

  // Navigate to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Close assessment
  const closeAssessment = () => {
    setSelectedAssessment(null)
    setCurrentQuestion(0)
    setUserAnswers({})
    setAssessmentCompleted(false)
    setScore(null)
  }

  // Toggle sharing assessment on profile
  const toggleShareOnProfile = (assessmentId) => {
    const updatedAssessments = completedAssessments.map((assessment) =>
      assessment.id === assessmentId
        ? { ...assessment, sharedOnProfile: !assessment.sharedOnProfile }
        : assessment
    )
    setCompletedAssessments(updatedAssessments)
  }

  return (
    <div className="assessments-container">
      {selectedAssessment ? (
        <div className="assessment-taking-container">
          <div className="assessment-taking-header">
            <h2>{selectedAssessment.title}</h2>
            <button className="close-assessment-button" onClick={closeAssessment}>
              <CloseOutlined />
            </button>
          </div>

          {assessmentCompleted ? (
            <div className="assessment-results">
              <div className="score-display">
                <div className="score-circle" style={{ "--score-percentage": `${score}%` }}>
                  <span className="score-value">{score}%</span>
                </div>
                <h3>Assessment Complete!</h3>
                <p>
                  You scored {score} out of 100 on the {selectedAssessment.title} assessment.
                </p>
              </div>

              <div className="results-actions">
                <button className="primary-button" onClick={closeAssessment}>
                  Back to Assessments
                </button>
                <button
                  className={`secondary-button ${
                    completedAssessments.find((a) => a.id === selectedAssessment.id)?.sharedOnProfile
                      ? "shared-button"
                      : ""
                  }`}
                  onClick={() => toggleShareOnProfile(selectedAssessment.id)}
                >
                  {completedAssessments.find((a) => a.id === selectedAssessment.id)?.sharedOnProfile ? (
                    <>
                      <CheckCircleOutlined /> Shared on Profile
                    </>
                  ) : (
                    <>
                      <TrophyOutlined /> Share on Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="question-container">
              <div className="question-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${((currentQuestion + 1) / selectedAssessment.questions.length) * 100}%`,
                  }}
                ></div>
                <span className="progress-text">
                  Question {currentQuestion + 1} of {selectedAssessment.questions.length}
                </span>
              </div>

              <div className="question">
                <h3>{selectedAssessment.questions[currentQuestion].question}</h3>
                <div className="options">
                  {selectedAssessment.questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className={`option ${
                        userAnswers[selectedAssessment.questions[currentQuestion].id] === option ? "selected" : ""
                      }`}
                      onClick={() => handleAnswerSelect(selectedAssessment.questions[currentQuestion].id, option)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="question-navigation">
                <button
                  className="nav-button"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestion === 0}
                >
                  <LeftOutlined /> Previous
                </button>
                <button
                  className="nav-button primary"
                  onClick={goToNextQuestion}
                  disabled={!userAnswers[selectedAssessment.questions[currentQuestion].id]}
                >
                  {currentQuestion === selectedAssessment.questions.length - 1 ? "Finish" : "Next"}{" "}
                  <RightOutlined />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="assessments-header">
            <h1>Online Assessments</h1>
            <p>Take assessments to showcase your skills and improve your profile</p>
          </div>

          <div className="assessments-tabs">
            <button
              className={`tab-button ${activeTab === "available" ? "active" : ""}`}
              onClick={() => setActiveTab("available")}
            >
              Available Assessments
            </button>
            <button
              className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              My Results
            </button>
          </div>

          {activeTab === "available" && (
            <>
              <div className="assessments-actions">
                <div className="search-container">
                  <SearchOutlined className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search assessments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

            
              </div>

              <div className="assessments-stats">
                <div className="stat-card">
                  <h3>{availableAssessments.length}</h3>
                  <p>Available Assessments</p>
                </div>
                <div className="stat-card">
                  <h3>{completedAssessments.length}</h3>
                  <p>Completed Assessments</p>
                </div>
                <div className="stat-card">
                  <h3>{completedAssessments.filter((a) => a.sharedOnProfile).length}</h3>
                  <p>Shared on Profile</p>
                </div>
              </div>

              <div className="assessments-list">
                {sortedAssessments.length > 0 ? (
                  sortedAssessments.map((assessment) => {
                    const isCompleted = completedAssessments.some((a) => a.id === assessment.id)
                    return (
                      <div className="assessment-card" key={assessment.id}>
                        <div className="assessment-icon" style={{ backgroundColor: assessment.color }}>
                          {assessment.icon}
                        </div>
                        <div className="assessment-info">
                          <div className="assessment-header">
                            <h3>{assessment.title}</h3>
                            {isCompleted && (
                              <span className="completed-badge">
                                <CheckCircleOutlined /> Completed
                              </span>
                            )}
                          </div>
                          <p className="assessment-description">{assessment.description}</p>
                          <div className="assessment-meta">
                            <span className="assessment-category">{assessment.category}</span>
                            <span className="assessment-difficulty">{assessment.difficulty}</span>
                            <span className="assessment-time">
                              <ClockCircleOutlined /> {assessment.estimatedTime}
                            </span>
                            <span className="assessment-questions">
                              <FileTextOutlined /> {assessment.questions.length} questions
                            </span>
                          </div>
                        </div>
                        <div className="assessment-actions">
                          <button className="take-assessment-button" onClick={() => startAssessment(assessment)}>
                            {isCompleted ? "Retake Assessment" : "Start Assessment"}
                          </button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="no-results">
                    <p>No assessments match your search criteria.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "completed" && (
            <div className="completed-assessments">
              {completedAssessments.length > 0 ? (
                <>
                  <div className="completed-stats">
                    <div className="stat-card">
                      <h3>
                        {completedAssessments.reduce((sum, assessment) => sum + assessment.score, 0) /
                          completedAssessments.length}
                        %
                      </h3>
                      <p>Average Score</p>
                    </div>
                    <div className="stat-card">
                      <h3>{completedAssessments.length}</h3>
                      <p>Assessments Taken</p>
                    </div>
                    <div className="stat-card">
                      <h3>{completedAssessments.filter((a) => a.sharedOnProfile).length}</h3>
                      <p>Shared on Profile</p>
                    </div>
                  </div>

                  <div className="results-list">
                    {completedAssessments.map((assessment) => (
                      <div className="result-card" key={assessment.id}>
                        <div className="result-icon" style={{ backgroundColor: assessment.color }}>
                          {assessment.icon}
                        </div>
                        <div className="result-info">
                          <h3>{assessment.title}</h3>
                          <div className="result-meta">
                            <span className="result-category">{assessment.category}</span>
                            <span className="result-date">
                              <ClockCircleOutlined /> {formatRelativeTime(assessment.completedDate)}
                            </span>
                          </div>
                        </div>
                        <div className="result-score">
                          <div className="score-circle" style={{ "--score-percentage": `${assessment.score}%` }}>
                            <span className="score-value">{assessment.score}%</span>
                          </div>
                        </div>
                        <div className="result-actions">
                          <button
                            className={`share-button ${assessment.sharedOnProfile ? "shared" : ""}`}
                            onClick={() => toggleShareOnProfile(assessment.id)}
                          >
                            {assessment.sharedOnProfile ? (
                              <>
                                <UnlockOutlined /> Public
                              </>
                            ) : (
                              <>
                                <LockOutlined /> Private
                              </>
                            )}
                          </button>
                          <button
                            className="retake-button"
                            onClick={() => startAssessment(availableAssessments.find((a) => a.id === assessment.id))}
                          >
                            Retake
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-results">
                  <p>You haven't completed any assessments yet.</p>
                  <button className="primary-button" onClick={() => setActiveTab("available")}>
                    Browse Available Assessments
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Assessments
