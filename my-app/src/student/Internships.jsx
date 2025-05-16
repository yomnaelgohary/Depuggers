"use client"

import { useState, useEffect } from "react"
// Ant Design Components
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Modal,
  Row,
  Select,
  Steps,
  Tag,
  Upload,
  Typography,
} from "antd"

// Ant Design Icons
import { FileTextOutlined, FileDoneOutlined, InboxOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons"

import "./internships.css"

const { Search } = Input
const { Option } = Select
const { Step } = Steps
const { TextArea } = Input
const { Dragger } = Upload
const { Text } = Typography

const InternshipContent = () => {
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: "Tech Solutions Inc.",
      title: "Frontend Developer Intern",
      duration: "3 months",
      industry: "Technology",
      isPaid: true,
      salary: "$20/hr",
      skills: ["React", "JavaScript", "HTML/CSS"],
      description:
        "Work on building responsive user interfaces using React. Collaborate with design team to implement UI components.",
      location: "San Francisco, CA",
      startDate: "2023-11-01",
      endDate: "2024-02-01",
      timeSlot: "9:00 AM - 5:00 PM",
      timeOfDay: "MORNING",
      workHours: "40 hours/week",
      applications: 24,
      isLearningOpportunity: true,
      postedDate: "2023-10-15",
      status: "active",
    },
    {
      id: 2,
      company: "Data Analytics Co.",
      title: "Data Science Intern",
      duration: "6 months",
      industry: "Data Science",
      isPaid: true,
      salary: "$22/hr",
      skills: ["Python", "Pandas", "SQL", "Machine Learning"],
      description:
        "Analyze large datasets and build predictive models. Work with data engineering team to clean and process data.",
      location: "New York, NY",
      startDate: "2023-12-01",
      endDate: "2024-06-01",
      timeSlot: "10:00 AM - 6:00 PM",
      timeOfDay: "MORNING",
      workHours: "35 hours/week",
      applications: 37,
      isLearningOpportunity: true,
      postedDate: "2023-10-10",
      status: "active",
    },
    {
      id: 3,
      company: "Creative Designs",
      title: "UI/UX Design Intern",
      duration: "4 months",
      industry: "Design",
      isPaid: false,
      salary: "Unpaid",
      skills: ["Figma", "User Research", "Prototyping"],
      description: "Create wireframes and prototypes for client projects. Conduct user research and usability testing.",
      location: "Los Angeles, CA",
      startDate: "2023-11-15",
      endDate: "2024-03-15",
      timeSlot: "9:00 AM - 3:00 PM",
      timeOfDay: "MORNING",
      workHours: "25 hours/week",
      applications: 19,
      isLearningOpportunity: true,
      postedDate: "2023-10-05",
      status: "active",
    },
    {
      id: 4,
      company: "Global Finance",
      title: "Financial Analyst Intern",
      duration: "3 months",
      industry: "Finance",
      isPaid: true,
      salary: "$18/hr",
      skills: ["Excel", "Financial Modeling", "Data Analysis"],
      description: "Assist with financial reporting and analysis. Prepare presentations for senior management.",
      location: "Chicago, IL",
      startDate: "2023-10-01",
      endDate: "2024-01-01",
      timeSlot: "8:00 AM - 4:00 PM",
      timeOfDay: "MORNING",
      workHours: "30 hours/week",
      applications: 42,
      isLearningOpportunity: false,
      postedDate: "2023-09-20",
      status: "completed",
    },
  ])

  const [filteredInternships, setFilteredInternships] = useState([])
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    industry: null,
    duration: null,
    isPaid: null,
  })
  const [uploading, setUploading] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [applicationStep, setApplicationStep] = useState(0)
  const [form] = Form.useForm()
  const [applicationFormVisible, setApplicationFormVisible] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  useEffect(() => {
    setFilteredInternships(internships)
  }, [internships])

  useEffect(() => {
    applyFilters()
  }, [searchText, filters, internships])

  const industries = [...new Set(internships.map((item) => item.industry))]
  const durations = [...new Set(internships.map((item) => item.duration))]
  const locations = [...new Set(internships.map((item) => item.location))]

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      industry: null,
      duration: null,
      isPaid: null,
    })
    setSearchText("")
  }

  const clearSearch = () => {
    setSearchText("")
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const applyFilters = () => {
    let result = [...internships]

    if (searchText) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) ||
          item.company.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    if (filters.industry) {
      result = result.filter((item) => item.industry === filters.industry)
    }

    if (filters.duration) {
      result = result.filter((item) => item.duration === filters.duration)
    }

    if (filters.isPaid !== null) {
      result = result.filter((item) => item.isPaid === filters.isPaid)
    }

    setFilteredInternships(result)
  }

  const hasActiveFilters = () => {
    return filters.industry !== null || filters.duration !== null || filters.isPaid !== null
  }

  const showInternshipDetails = (internship) => {
    setSelectedInternship(internship)
    setIsModalVisible(true)
  }

  const handleApply = () => {
    setApplicationFormVisible(true)
    setApplicationStep(0)
    form.resetFields()
    setUploadedFiles([])
  }

  const handleNext = () => {
    // Special validation for documents step
    if (applicationStep === 1 && uploadedFiles.length === 0) {
      message.error("Please upload at least one document")
      return
    }

    form
      .validateFields()
      .then(() => {
        setApplicationStep(applicationStep + 1)
      })
      .catch((err) => {
        message.error("Please complete all required fields")
      })
  }

  const submitApplication = async (values) => {
    const formData = new FormData()

    // Append form values
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value)
    })

    // Append files
    uploadedFiles.forEach((file) => {
      formData.append("documents", file)
    })

    try {
      setUploading(true)
      // Here you would typically send to your backend:
      // await axios.post('/api/applications', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500))

      message.success("Application submitted successfully!")
      setApplicationFormVisible(false)
      setIsModalVisible(false)
      setApplicationSubmitted(true)
    } catch (error) {
      message.error("Application failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const uploadProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf"
      const isDOC =
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isPDF && !isDOC) {
        message.error("You can only upload PDF or Word documents!")
        return Upload.LIST_IGNORE
      }

      if (!isLt5M) {
        message.error("File must be smaller than 5MB!")
        return Upload.LIST_IGNORE
      }

      setUploadedFiles((prev) => [...prev, file])
      return false
    },
    onRemove: (file) => {
      setUploadedFiles((prev) => prev.filter((f) => f.uid !== file.uid))
    },
    fileList: uploadedFiles,
    multiple: true,
    maxCount: 5,
    accept: ".pdf,.doc,.docx",
  }

  const steps = [
    {
      title: "Personal Information",
      icon: <UserOutlined />,
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="john.doe@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input placeholder="+1 (123) 456-7890" />
          </Form.Item>

          <Form.Item
            name="education"
            label="Current Education"
            rules={[{ required: true, message: "Please enter your education level" }]}
          >
            <Select placeholder="Select your education level">
              <Option value="high_school">High School</Option>
              <Option value="bachelors">Bachelor's Degree</Option>
              <Option value="masters">Master's Degree</Option>
              <Option value="phd">PhD</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Documents",
      icon: <FileDoneOutlined />,
      content: (
        <>
          <Text strong>Upload supporting documents:</Text>
          <div style={{ margin: "16px 0" }}>
            <Alert
              message="Required Documents"
              description="Please upload your CV/resume and any other supporting documents"
              type="info"
              showIcon
            />
          </div>

          <Upload.Dragger {...uploadProps} style={{ padding: "20px" }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to upload</p>
            <p className="ant-upload-hint">Supports PDF, DOC, DOCX (Max 5 files, 5MB each)</p>
          </Upload.Dragger>

          {uploadedFiles.length === 0 && (
            <Alert message="No documents uploaded" type="warning" showIcon style={{ marginTop: 16 }} />
          )}

          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              <Text strong>Files to be submitted:</Text>
              <List
                size="small"
                dataSource={uploadedFiles}
                renderItem={(file) => (
                  <List.Item>
                    <FileTextOutlined style={{ marginRight: 8 }} />
                    {file.name} - {(file.size / 1024).toFixed(2)} KB
                  </List.Item>
                )}
              />
            </div>
          )}
        </>
      ),
    },
    {
      title: "Additional Information",
      icon: <SolutionOutlined />,
      content: (
        <>
          <Form.Item
            name="coverLetter"
            label="Cover Letter"
            rules={[{ required: true, message: "Please write a cover letter" }]}
          >
            <TextArea rows={6} placeholder="Explain why you're a good fit for this internship..." />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Availability (Hours/Week)"
            rules={[{ required: true, message: "Please enter your availability" }]}
          >
            <InputNumber min={10} max={40} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Available Start Date"
            rules={[{ required: true, message: "Please select a start date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </>
      ),
    },
  ]

  return (
    <div className="intern-content">
      <div className="intern-filters">
        <button className="intern-filter-button" onClick={toggleFilters}>
          <span className="intern-filter-icon">≡</span> Filters
        </button>
        <div className="intern-search-container">
          <input
            type="text"
            placeholder="Search job title"
            className="intern-search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <button className="intern-clear-search" onClick={clearSearch}>
              ×
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="intern-filter-modal-overlay">
          <div className="intern-filter-modal">
            <div className="intern-filter-modal-header">
              <h2>Filters</h2>
              <button className="intern-close-button" onClick={toggleFilters}>
                ✕
              </button>
            </div>

            <div className="intern-filter-modal-content">
              <div className="intern-filter-section">
                <h3>INDUSTRY</h3>
                <div className="intern-filter-options">
                  {industries.map((industry, index) => (
                    <button
                      key={index}
                      className={`intern-filter-option ${filters.industry === industry ? "selected" : ""}`}
                      onClick={() => handleFilterChange("industry", industry)}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              <div className="intern-filter-section">
                <h3>DURATION</h3>
                <div className="intern-filter-options">
                  {durations.map((duration, index) => (
                    <button
                      key={index}
                      className={`intern-filter-option ${filters.duration === duration ? "selected" : ""}`}
                      onClick={() => handleFilterChange("duration", duration)}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              <div className="intern-filter-section">
                <h3>LOCATION</h3>
                <div className="intern-filter-options">
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      className={`intern-filter-option ${filters.location === location ? "selected" : ""}`}
                      onClick={() => handleFilterChange("location", location)}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              <div className="intern-filter-section">
                <h3>PAYMENT</h3>
                <div className="intern-filter-options">
                  <button
                    className={`intern-filter-option ${filters.isPaid === true ? "selected" : ""}`}
                    onClick={() => handleFilterChange("isPaid", true)}
                  >
                    Paid
                  </button>
                  <button
                    className={`intern-filter-option ${filters.isPaid === false ? "selected" : ""}`}
                    onClick={() => handleFilterChange("isPaid", false)}
                  >
                    Unpaid
                  </button>
                </div>
              </div>
            </div>

            <div className="intern-filter-actions">
              <button className={`intern-reset-button ${hasActiveFilters() ? "active" : ""}`} onClick={resetFilters}>
                Reset
              </button>
              <button className="intern-apply-button" onClick={toggleFilters}>
                Show {filteredInternships.length} jobs
              </button>
            </div>
          </div>
        </div>
      )}

      {searchText && (
        <div className="intern-search-results">
          <div className="intern-results-count">
            Found {filteredInternships.length} {filteredInternships.length === 1 ? "job" : "jobs"} matching "
            {searchText}"
          </div>
        </div>
      )}

      <div className="intern-job-listings">
        {filteredInternships.map((internship) => (
          <div
            className={`intern-job-card ${internship.status === "completed" ? "completed-job" : ""}`}
            key={internship.id}
          >
            {internship.status === "completed" && <div className="intern-completed-banner">INTERNSHIP COMPLETE</div>}

            {internship.isPaid && internship.salary && (
              <div className="intern-job-salary">
                <div className="intern-amount">{internship.salary}</div>
                <div className="intern-hourly-rate">Hourly Rate</div>
              </div>
            )}

            <div className="intern-job-details">
              <div className="intern-company-name">{internship.company}</div>
              {internship.isLearningOpportunity && (
                <div className="intern-learning-opportunity">LEARNING OPPORTUNITY</div>
              )}

              <h3 className="intern-job-title">
                {searchText ? <HighlightText text={internship.title} highlight={searchText} /> : internship.title}
              </h3>

              <div className="intern-job-requirements">
                <div className="intern-requirement-label">REQUIRES:</div>
                <div className="intern-requirement-tags">
                  {internship.skills.map((skill, index) => (
                    <span className="intern-requirement-tag" key={index}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="intern-job-location">
                <span className="intern-location-icon">◎</span>
                <span>{internship.location}</span>
              </div>

              <div className="intern-job-duration">
                <span className="intern-calendar-icon">📅</span>
                <div>
                  <div className="intern-date-range">
                    {internship.startDate} - {internship.endDate}
                  </div>
                  <div className="intern-duration">{internship.duration}</div>
                </div>
                <div className="intern-time-slot">
                  <div className="intern-time">{internship.timeSlot}</div>
                  <div className="intern-time-of-day">{internship.timeOfDay}</div>
                </div>
              </div>

              <div className="intern-job-work-hours">
                <span className="intern-work-hours-icon">⏱</span>
                <span>{internship.workHours}</span>
              </div>

              {internship.description && <div className="intern-job-description">{internship.description}</div>}
            </div>

            <button className="intern-apply-now-button" onClick={() => handleApply()}>
              Apply Now
            </button>

            <div className={`intern-job-status ${internship.isPaid ? "paid" : "unpaid"}`}>
              {internship.isPaid ? "PAID" : "UNPAID"}
            </div>
          </div>
        ))}
      </div>

      {/* Internship Details Modal */}
      <Modal
        title="Internship Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button key="apply" type="primary" onClick={handleApply} icon={<SolutionOutlined />}>
            Apply Now
          </Button>,
        ]}
        width={800}
      >
        {selectedInternship && (
          <div className="intern-internship-details">
            <h2>{selectedInternship.title}</h2>
            <h3>{selectedInternship.company}</h3>

            <div className="intern-details-section">
              <Row gutter={16}>
                <Col span={12}>
                  <p>
                    <strong>Industry:</strong> {selectedInternship.industry}
                  </p>
                  <p>
                    <strong>Duration:</strong> {selectedInternship.duration}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedInternship.location}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Compensation:</strong>
                    {selectedInternship.isPaid ? (
                      <Tag color="green">{selectedInternship.salary}</Tag>
                    ) : (
                      <Tag color="orange">Unpaid</Tag>
                    )}
                  </p>
                  <p>
                    <strong>Posted Date:</strong> {selectedInternship.postedDate}
                  </p>
                  <p>
                    <strong>Work Hours:</strong> {selectedInternship.workHours}
                  </p>
                </Col>
              </Row>
            </div>

            <Divider />

            <div className="intern-description-section">
              <h4>Job Description</h4>
              <p>{selectedInternship.description}</p>
            </div>

            <div className="intern-skills-section">
              <h4>Required Skills</h4>
              <div className="intern-skills-list">
                {selectedInternship.skills.map((skill, index) => (
                  <Tag key={index} color="blue">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Application Form Modal */}
      <Modal
        title={`Application for ${selectedInternship?.title || "Internship"}`}
        visible={applicationFormVisible}
        onCancel={() => setApplicationFormVisible(false)}
        footer={[
          applicationStep > 0 && (
            <Button key="back" onClick={() => setApplicationStep(applicationStep - 1)}>
              Previous
            </Button>
          ),
          applicationStep < steps.length - 1 ? (
            <Button key="next" type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button key="submit" type="primary" loading={uploading} onClick={() => form.submit()}>
              Submit Application
            </Button>
          ),
        ]}
        width={800}
        destroyOnClose
      >
        <Steps current={applicationStep} style={{ marginBottom: 24 }}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        <Form form={form} layout="vertical" onFinish={submitApplication}>
          <div style={{ minHeight: "300px" }}>{steps[applicationStep].content}</div>
        </Form>
      </Modal>
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
          <span key={i} className="intern-highlight">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  )
}

export default InternshipContent
