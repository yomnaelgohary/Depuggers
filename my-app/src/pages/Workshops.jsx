"use client"

import { useState } from "react"
import { X, Edit, Plus, CalendarIcon, User } from "lucide-react"

function Workshops() {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      name: "Resume Building Masterclass",
      startDate: "2024-09-15",
      startTime: "10:00",
      endDate: "2024-09-15",
      endTime: "12:00",
      description:
        "Learn how to create a professional resume that stands out to employers and highlights your skills and experiences effectively.",
      speaker: {
        name: "Dr. Jennifer Adams",
        title: "Career Development Specialist",
        bio: "Dr. Adams has over 15 years of experience in career counseling and has helped thousands of students secure internships and jobs at top companies.",
      },
      agenda: [
        "Introduction to resume formats",
        "Tailoring your resume for different industries",
        "Highlighting key achievements",
        "Common resume mistakes to avoid",
        "Q&A session",
      ],
    },
    {
      id: 2,
      name: "Interview Skills Workshop",
      startDate: "2024-09-20",
      startTime: "14:00",
      endDate: "2024-09-20",
      endTime: "16:30",
      description:
        "Prepare for job interviews with confidence. This workshop covers common interview questions, techniques for answering effectively, and strategies for making a great impression.",
      speaker: {
        name: "Michael Chen",
        title: "HR Director, Tech Innovations Inc.",
        bio: "Michael has conducted over 500 interviews for various positions and specializes in helping candidates showcase their potential during the interview process.",
      },
      agenda: [
        "Understanding different interview formats",
        "Preparing for behavioral questions",
        "Technical interview strategies",
        "Body language and communication skills",
        "Mock interview practice",
        "Follow-up etiquette",
      ],
    },
    {
      id: 3,
      name: "Networking in the Digital Age",
      startDate: "2024-10-05",
      startTime: "11:00",
      endDate: "2024-10-05",
      endTime: "13:00",
      description:
        "Discover effective strategies for building and maintaining professional relationships online. Learn how to leverage social media platforms for career advancement.",
      speaker: {
        name: "Sophia Rodriguez",
        title: "Professional Networking Coach",
        bio: "Sophia is a certified networking coach who specializes in helping professionals build meaningful connections in the digital space.",
      },
      agenda: [
        "LinkedIn profile optimization",
        "Effective online communication",
        "Virtual networking events",
        "Building your personal brand",
        "Maintaining professional relationships",
        "Interactive networking exercise",
      ],
    },
    {
      id: 4,
      name: "Personal Branding for Tech Professionals",
      startDate: "2024-10-12",
      startTime: "13:00",
      endDate: "2024-10-12",
      endTime: "15:00",
      description:
        "Learn how to build a strong personal brand that will help you stand out in the competitive tech industry. This workshop covers online presence, networking strategies, and content creation.",
      speaker: {
        name: "Lisa Chen",
        title: "Personal Brand Strategist & Former Tech Recruiter",
        bio: "Lisa has helped hundreds of tech professionals build personal brands that attract opportunities. With a background in tech recruiting, she understands what companies look for beyond technical skills.",
      },
      agenda: [
        "Why personal branding matters in tech",
        "Defining your unique value proposition",
        "Building your online presence",
        "Content creation strategies",
        "Networking effectively",
      ],
    },
    {
      id: 5,
      name: "Design Thinking for Problem Solving",
      startDate: "2024-11-02",
      startTime: "14:00",
      endDate: "2024-11-02",
      endTime: "17:00",
      description:
        "Apply design thinking methodology to solve complex problems in any field. This workshop introduces the design thinking process and provides hands-on experience with each stage through interactive exercises.",
      speaker: {
        name: "Dr. James Lee",
        title: "Design Thinking Professor at Stanford d.school",
        bio: "Dr. Lee has taught design thinking at Stanford for 12 years and has consulted with Fortune 500 companies on implementing design thinking processes. His approach combines academic rigor with practical application.",
      },
      agenda: [
        "Introduction to design thinking",
        "Empathize: User research techniques",
        "Define: Problem framing",
        "Ideate: Creative brainstorming",
        "Prototype: Rapid visualization",
        "Test: Feedback and iteration",
      ],
    },
  ])

  const [selectedWorkshop, setSelectedWorkshop] = useState(null)
  const [isEditingWorkshop, setIsEditingWorkshop] = useState(false)
  const [workshopFormData, setWorkshopFormData] = useState({
    id: null,
    name: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    speaker: {
      name: "",
      title: "",
      bio: "",
    },
    agenda: [""],
  })

  const handleCreateWorkshop = () => {
    setIsEditingWorkshop(true)
    setSelectedWorkshop(null)
    setWorkshopFormData({
      id: Date.now(),
      name: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      description: "",
      speaker: {
        name: "",
        title: "",
        bio: "",
      },
      agenda: [""],
    })
  }

  const handleEditWorkshop = (workshop) => {
    setIsEditingWorkshop(true)
    setSelectedWorkshop(workshop)
    setWorkshopFormData({
      ...workshop,
      agenda: [...workshop.agenda],
    })
  }

  const handleDeleteWorkshop = (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      setWorkshops(workshops.filter((workshop) => workshop.id !== id))
      if (selectedWorkshop && selectedWorkshop.id === id) {
        setSelectedWorkshop(null)
      }
    }
  }

  const handleWorkshopFormChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("speaker.")) {
      const speakerField = name.split(".")[1]
      setWorkshopFormData({
        ...workshopFormData,
        speaker: {
          ...workshopFormData.speaker,
          [speakerField]: value,
        },
      })
    } else {
      setWorkshopFormData({
        ...workshopFormData,
        [name]: value,
      })
    }
  }

  const handleAgendaItemChange = (index, value) => {
    const updatedAgenda = [...workshopFormData.agenda]
    updatedAgenda[index] = value
    setWorkshopFormData({
      ...workshopFormData,
      agenda: updatedAgenda,
    })
  }

  const handleAddAgendaItem = () => {
    setWorkshopFormData({
      ...workshopFormData,
      agenda: [...workshopFormData.agenda, ""],
    })
  }

  const handleRemoveAgendaItem = (index) => {
    if (workshopFormData.agenda.length > 1) {
      const updatedAgenda = [...workshopFormData.agenda]
      updatedAgenda.splice(index, 1)
      setWorkshopFormData({
        ...workshopFormData,
        agenda: updatedAgenda,
      })
    }
  }

  const handleWorkshopSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (
      !workshopFormData.name ||
      !workshopFormData.startDate ||
      !workshopFormData.startTime ||
      !workshopFormData.endDate ||
      !workshopFormData.endTime ||
      !workshopFormData.description ||
      !workshopFormData.speaker.name
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (selectedWorkshop) {
      // Update existing workshop
      setWorkshops(workshops.map((workshop) => (workshop.id === workshopFormData.id ? workshopFormData : workshop)))
      alert("Workshop updated successfully!")
    } else {
      // Create new workshop with current timestamp as ID
      const newWorkshop = {
        ...workshopFormData,
        id: Date.now(),
      }
      setWorkshops([...workshops, newWorkshop])
      alert("Workshop created successfully!")
    }

    setIsEditingWorkshop(false)
    setSelectedWorkshop(null)
  }

  const handleViewWorkshopDetails = (workshop) => {
    setSelectedWorkshop(workshop)
    setIsEditingWorkshop(false)
  }

  const getInitials = (name) => {
    if (!name) return ""
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
  }

  const formatDateTime = (date, time) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const formattedDate = new Date(`${date}T${time}`).toLocaleDateString(undefined, options)
    const formattedTime = new Date(`${date}T${time}`).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })
    return `${formattedDate} at ${formattedTime}`
  }

  const upcomingWorkshops = workshops
    .filter((workshop) => {
      const workshopDate = new Date(`${workshop.startDate}T${workshop.startTime}`)
      return workshopDate >= new Date()
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.startDate}T${a.startTime}`)
      const dateB = new Date(`${b.startDate}T${b.startTime}`)
      return dateA - dateB
    })

  const renderWorkshopForm = () => (
    <div className="workshop-form-container">
      <div className="workshop-form-header">
        <h2>{selectedWorkshop ? "Edit Workshop" : "Create New Workshop"}</h2>
        <button className="modal-close-button" onClick={() => setIsEditingWorkshop(false)}>
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleWorkshopSubmit} className="workshop-form">
        <div className="form-group">
          <label htmlFor="name">Workshop Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={workshopFormData.name}
            onChange={handleWorkshopFormChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date*</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={workshopFormData.startDate}
              onChange={handleWorkshopFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time*</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={workshopFormData.startTime}
              onChange={handleWorkshopFormChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="endDate">End Date*</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={workshopFormData.endDate}
              onChange={handleWorkshopFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time*</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={workshopFormData.endTime}
              onChange={handleWorkshopFormChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Workshop Description*</label>
          <textarea
            id="description"
            name="description"
            value={workshopFormData.description}
            onChange={handleWorkshopFormChange}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="speaker-section">
          <h3>Speaker Information</h3>
          <div className="form-group">
            <label htmlFor="speaker.name">Speaker Name*</label>
            <input
              type="text"
              id="speaker.name"
              name="speaker.name"
              value={workshopFormData.speaker.name}
              onChange={handleWorkshopFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="speaker.title">Speaker Title*</label>
            <input
              type="text"
              id="speaker.title"
              name="speaker.title"
              value={workshopFormData.speaker.title}
              onChange={handleWorkshopFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="speaker.bio">Speaker Bio*</label>
            <textarea
              id="speaker.bio"
              name="speaker.bio"
              value={workshopFormData.speaker.bio}
              onChange={handleWorkshopFormChange}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        <div className="agenda-section">
          <h3>Workshop Agenda</h3>
          {workshopFormData.agenda.map((item, index) => (
            <div key={index} className="agenda-item">
              <div className="form-group agenda-input">
                <label htmlFor={`agenda-${index}`}>Agenda Item {index + 1}*</label>
                <input
                  type="text"
                  id={`agenda-${index}`}
                  value={item}
                  onChange={(e) => handleAgendaItemChange(index, e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="remove-agenda-btn"
                onClick={() => handleRemoveAgendaItem(index)}
                disabled={workshopFormData.agenda.length <= 1}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button type="button" className="add-agenda-btn" onClick={handleAddAgendaItem}>
            + Add Agenda Item
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-workshop-btn">
            {selectedWorkshop ? "Update Workshop" : "Create Workshop"}
          </button>
          <button type="button" className="cancel-workshop-btn" onClick={() => setIsEditingWorkshop(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )

  const renderWorkshopDetails = () => (
    <div className="workshop-details-container">
      <div className="workshop-details-header">
        <button className="back-button" onClick={() => setSelectedWorkshop(null)}>
          <X size={16} /> Back to Workshops
        </button>
        <div className="workshop-actions">
          <button className="edit-workshop-btn" onClick={() => handleEditWorkshop(selectedWorkshop)}>
            <Edit size={16} /> Edit
          </button>
          <button className="delete-workshop-btn" onClick={() => handleDeleteWorkshop(selectedWorkshop.id)}>
            <X size={16} /> Delete
          </button>
        </div>
      </div>

      <div className="workshop-details-content">
        <h1>{selectedWorkshop.name}</h1>

        <div className="workshop-meta-details">
          <div className="workshop-meta-item">
            <CalendarIcon size={18} /> {formatDateTime(selectedWorkshop.startDate, selectedWorkshop.startTime)}
          </div>
          <div className="workshop-meta-item">
            <CalendarIcon size={18} /> {formatDateTime(selectedWorkshop.endDate, selectedWorkshop.endTime)}
          </div>
          <div className="workshop-meta-item workshop-category">Career Development</div>
          <div className="workshop-meta-item workshop-type">
            <User size={18} /> Live Workshop
          </div>
        </div>

        <div className="workshop-description-section">
          <h2>About This Workshop</h2>
          <p>{selectedWorkshop.description}</p>
        </div>

        <div className="workshop-speaker-section">
          <h2>Speaker</h2>
          <div className="speaker-info">
            <div className="speaker-avatar">{getInitials(selectedWorkshop.speaker.name)}</div>
            <div className="speaker-details">
              <h3>{selectedWorkshop.speaker.name}</h3>
              <p className="speaker-title">{selectedWorkshop.speaker.title}</p>
              <p className="speaker-bio">{selectedWorkshop.speaker.bio}</p>
            </div>
          </div>
        </div>

        <div className="workshop-agenda-section">
          <h2>Workshop Agenda</h2>
          <ol className="agenda-list">
            {selectedWorkshop.agenda.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )

  const renderWorkshopsList = () => (
    <div className="workshops-container">
      <div className="workshops-header">
        <div>
          <h1>Career Workshops</h1>
          <p>Enhance your skills and prepare for your career with our online workshops</p>
        </div>
        <button className="create-workshop-btn" onClick={handleCreateWorkshop}>
          <Plus size={16} /> Create New Workshop
        </button>
      </div>

      {workshops.length > 0 ? (
        <div className="workshops-list">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="workshop-card">
              <div className="workshop-card-header">
                <div className="workshop-type-badge">Live</div>
                <h3>{workshop.name}</h3>
              </div>
              <div className="workshop-card-content">
                <div className="workshop-meta">
                  <div className="workshop-date">
                    <CalendarIcon size={14} /> {formatDateTime(workshop.startDate, workshop.startTime)}
                  </div>
                  <div className="workshop-speaker">
                    <User size={14} /> {workshop.speaker.name}
                  </div>
                  <div className="workshop-category">Career Development</div>
                </div>
                <p className="workshop-description-preview">
                  {workshop.description.length > 150
                    ? workshop.description.substring(0, 150) + "..."
                    : workshop.description}
                </p>
                <div className="workshop-attendance">
                  <div className="attendance-bar">
                    <div className="attendance-progress" style={{ width: "75%" }}></div>
                  </div>
                  <span className="attendance-text">Registration open</span>
                </div>
              </div>
              <div className="workshop-card-footer">
                <div className="workshop-status">
                  <span className="status-badge upcoming">Upcoming</span>
                </div>
                <div className="workshop-actions">
                  <button className="card-action-btn view-btn" onClick={() => handleViewWorkshopDetails(workshop)}>
                    View Details
                  </button>
                  <button
                    className="card-action-btn edit-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditWorkshop(workshop)
                    }}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    className="card-action-btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteWorkshop(workshop.id)
                    }}
                  >
                    <X size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-workshops">
          <p>No workshops found.</p>
          <p>Click "Create New Workshop" to add a workshop.</p>
        </div>
      )}
    </div>
  )

  return (
    <>{isEditingWorkshop ? renderWorkshopForm() : selectedWorkshop ? renderWorkshopDetails() : renderWorkshopsList()}</>
  )
}

export default Workshops
