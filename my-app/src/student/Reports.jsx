"use client"

import { useState, useEffect } from "react"
// Ant Design Components
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Rate,
  Select,
  Space,
  Table,
  Tag,
} from "antd"

// Ant Design Icons
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons"

import "./reports.css"

const { Panel } = Collapse
const { TextArea } = Input
const { Option } = Select

const Reports = () => {
  // State for courses in the major
  const [coursesInMajor, setCoursesInMajor] = useState([
    { id: 1, code: "CS101", name: "Introduction to Programming", selected: false },
    { id: 2, code: "CS201", name: "Data Structures", selected: false },
    { id: 3, code: "CS301", name: "Algorithms", selected: false },
    { id: 4, code: "CS401", name: "Database Systems", selected: false },
    { id: 5, code: "CS402", name: "Web Development", selected: false },
    { id: 6, code: "CS403", name: "Software Engineering", selected: false },
  ])

  const [internships, setInternships] = useState([
    {
      id: 1,
      company: "Tech Solutions Inc.",
      title: "Frontend Developer Intern",
      completedDate: "2023-08-15",
      status: "completed",
      hasEvaluation: true,
      hasReport: true,
      position: "Frontend Developer",
      duration: "June 2022 - August 2022",
      responsibilities: ["Developed React components", "Participated in code reviews"],
      skillsGained: ["React", "TypeScript", "Redux"],
      reportStatus: "approved",
      reportComments: "",
      startDate: "2022-06-01",
      endDate: "2022-08-15",
      relevantCourses: [],
    },
    {
      id: 2,
      company: "Data Analytics Co.",
      title: "Data Science Intern",
      completedDate: "2023-12-20",
      status: "completed",
      hasEvaluation: false,
      hasReport: false,
      position: "Data Science Intern",
      duration: "September 2022 - December 2022",
      responsibilities: ["Analyzed datasets", "Built predictive models"],
      skillsGained: ["Python", "Pandas", "Machine Learning"],
      reportStatus: "flagged",
      reportComments: "Please provide more details about your modeling approach",
      startDate: "2022-09-01",
      endDate: "2022-12-20",
      relevantCourses: [],
    },
    {
      id: 3,
      company: "Cloud Services Ltd.",
      title: "DevOps Intern",
      completedDate: null,
      status: "current",
      hasEvaluation: false,
      hasReport: false,
      position: "DevOps Intern",
      duration: "January 2023 - Present",
      responsibilities: ["Assisted with CI/CD pipelines", "Cloud infrastructure monitoring"],
      skillsGained: ["AWS", "Docker", "Kubernetes"],
      reportStatus: null,
      reportComments: "",
      startDate: "2023-01-10",
      endDate: null,
      relevantCourses: [],
    },
  ])

  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Summer Internship Technical Report",
      internshipId: 1,
      introduction: "This report documents my summer internship experience...",
      body: "Detailed description of my work and learnings...",
      isFinalized: false,
      createdAt: "2023-08-20",
      status: "approved",
      relevantCourses: [1, 2, 4],
    },
    {
      id: 2,
      title: "Data Science Internship Preliminary Report",
      internshipId: 2,
      introduction: "Initial report on my data science internship...",
      body: "First month focused on data cleaning and analysis...",
      isFinalized: false,
      createdAt: "2023-10-15",
      status: "flagged",
      adminComments: "Please provide more details about your modeling approach",
      relevantCourses: [2, 3, 5],
    },
  ])

  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      internshipId: 1,
      company: "Tech Solutions Inc.",
      wouldRecommend: true,
      rating: 4,
      comments: "Excellent learning environment with knowledgeable mentors.",
      isFinalized: false,
      createdAt: "2023-08-25",
    },
  ])

  const [selectedInternship, setSelectedInternship] = useState(internships[0])
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false)
  const [appealModalVisible, setAppealModalVisible] = useState(false)
  const [courseModalVisible, setCourseModalVisible] = useState(false)
  const [currentReport, setCurrentReport] = useState(null)
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [reportForm] = Form.useForm()
  const [evaluationForm] = Form.useForm()
  const [appealForm] = Form.useForm()
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
  })
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  // Initialize selected courses when report is loaded
  useEffect(() => {
    if (currentReport) {
      const selected = coursesInMajor.map((course) => ({
        ...course,
        selected: currentReport.relevantCourses.includes(course.id),
      }))
      setCoursesInMajor(selected)
      setSelectedCourses(selected.filter((c) => c.selected))
    } else {
      setCoursesInMajor(coursesInMajor.map((c) => ({ ...c, selected: false })))
      setSelectedCourses([])
    }
  }, [currentReport])

  // Filter internships based on search, status, and date range
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.company.toLowerCase().includes(searchText.toLowerCase()) ||
      internship.title.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "current" && internship.status === "current") ||
      (filters.status === "completed" && internship.status === "completed")
    const matchesDate =
      !dateRange ||
      (internship.startDate >= dateRange[0] && (!internship.endDate || internship.endDate <= dateRange[1]))

    return matchesSearch && matchesStatus && matchesDate
  })

  // Toggle course selection
  const toggleCourseSelection = (courseId) => {
    setCoursesInMajor(
      coursesInMajor.map((course) => (course.id === courseId ? { ...course, selected: !course.selected } : course)),
    )
  }

  // Save selected courses to report
  const saveSelectedCourses = () => {
    const selected = coursesInMajor.filter((course) => course.selected)
    setSelectedCourses(selected)
    setCourseModalVisible(false)
    message.success("Selected courses saved")
  }

  const handleCreateReport = () => {
    reportForm.resetFields()
    setCurrentReport(null)
    setSelectedCourses([])
    setReportModalVisible(true)
  }

  const handleEditReport = (report) => {
    setCurrentReport(report)
    reportForm.setFieldsValue(report)
    setReportModalVisible(true)
  }

  const handleDeleteReport = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setReports(reports.filter((report) => report.id !== id))
      message.success("Report deleted successfully")
    } catch (error) {
      message.error("Error deleting report")
    }
  }

  const handleSubmitReport = async () => {
    try {
      const values = await reportForm.validateFields()
      const courseIds = selectedCourses.map((c) => c.id)

      if (currentReport) {
        const updatedReport = {
          ...currentReport,
          ...values,
          relevantCourses: courseIds,
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
        setReports(reports.map((r) => (r.id === currentReport.id ? updatedReport : r)))
        message.success("Report updated successfully")
      } else {
        const newReport = {
          id: Date.now(),
          ...values,
          internshipId: selectedInternship.id,
          isFinalized: false,
          createdAt: new Date().toISOString().split("T")[0],
          status: "pending",
          relevantCourses: courseIds,
        }
        setReports([...reports, newReport])
        message.success("Report created successfully")
      }

      setReportModalVisible(false)
    } catch (error) {
      message.error("Error submitting report")
    }
  }

  const handleCreateEvaluation = () => {
    evaluationForm.resetFields()
    setCurrentEvaluation(null)
    setEvaluationModalVisible(true)
  }

  const handleEditEvaluation = (evaluation) => {
    setCurrentEvaluation(evaluation)
    evaluationForm.setFieldsValue(evaluation)
    setEvaluationModalVisible(true)
  }

  const handleDeleteEvaluation = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setEvaluations(evaluations.filter((evaluation) => evaluation.id !== id))
      message.success("Evaluation deleted successfully")
    } catch (error) {
      message.error("Error deleting evaluation")
    }
  }

  const handleSubmitEvaluation = async () => {
    try {
      const values = await evaluationForm.validateFields()

      if (currentEvaluation) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setEvaluations(evaluations.map((e) => (e.id === currentEvaluation.id ? { ...e, ...values } : e)))
        message.success("Evaluation updated successfully")
      } else {
        const newEvaluation = {
          id: Date.now(),
          ...values,
          internshipId: selectedInternship.id,
          company: selectedInternship.company,
          createdAt: new Date().toISOString().split("T")[0],
        }
        setEvaluations([...evaluations, newEvaluation])
        message.success("Evaluation created successfully")
      }

      setEvaluationModalVisible(false)
    } catch (error) {
      message.error("Error submitting evaluation")
    }
  }

  const handleDownloadReport = (id) => {
    message.success("Downloading report as PDF...")
    // In a real implementation, this would generate and download a PDF
  }

  const handleFinalizeReport = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setReports(reports.map((r) => (r.id === id ? { ...r, isFinalized: true } : r)))
      message.success("Report finalized successfully")
    } catch (error) {
      message.error("Error finalizing report")
    }
  }

  const handleFinalizeEvaluation = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setEvaluations(evaluations.map((e) => (e.id === id ? { ...e, isFinalized: true } : e)))
      message.success("Evaluation finalized successfully")
    } catch (error) {
      message.error("Error finalizing evaluation")
    }
  }

  const handleAppealReport = (report) => {
    setCurrentReport(report)
    appealForm.resetFields()
    setAppealModalVisible(true)
  }

  const handleSubmitAppeal = async () => {
    try {
      const values = await appealForm.validateFields()
      await new Promise((resolve) => setTimeout(resolve, 500))

      setReports(
        reports.map((r) =>
          r.id === currentReport.id ? { ...r, appealMessage: values.message, status: "appealed" } : r,
        ),
      )

      message.success("Appeal submitted successfully")
      setAppealModalVisible(false)
    } catch (error) {
      message.error("Error submitting appeal")
    }
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      status: "all",
    })
    setSearchText("")
  }

  const clearSearch = () => {
    setSearchText("")
  }

  const hasActiveFilters = () => {
    return filters.status !== "all" || searchText !== ""
  }

  const handleExpandRow = (record) => {
    const key = record.id
    const expanded = expandedRowKeys.includes(key)
    const newExpandedKeys = expanded
      ? expandedRowKeys.filter((k) => k !== key)
      : [...expandedRowKeys, key]
    setExpandedRowKeys(newExpandedKeys)
  }

  // Enhanced expanded row content with courses
  const expandedRowRender = (record) => {
    const report = reports.find((r) => r.internshipId === record.id)
    const evaluation = evaluations.find((e) => e.internshipId === record.id)
    const relevantCourses = report?.relevantCourses
      ?.map((id) => coursesInMajor.find((c) => c.id === id))
      .filter(Boolean)

    return (
      <div className="unique4-expanded-content">
        <Collapse defaultActiveKey={["responsibilities", "skills"]} className="unique4-ant-collapse">
          <Panel header="Responsibilities" key="responsibilities" className="unique4-ant-collapse-header">
            <ul>
              {record.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Panel>

          <Panel header="Skills Gained" key="skills" className="unique4-ant-collapse-header">
            <div className="unique4-skills-tags">
              {record.skillsGained.map((skill) => (
                <Tag key={skill} className="unique4-ant-tag">{skill}</Tag>
              ))}
            </div>
          </Panel>

          {report && (
            <Panel header="Report Details" key="report" className="unique4-ant-collapse-header">
              <p>
                <strong>Title:</strong> {report.title}
              </p>
              <p>
                <strong>Status:</strong>
                <Tag
                  color={
                    report.status === "approved"
                      ? "green"
                      : report.status === "flagged"
                        ? "orange"
                        : report.status === "rejected"
                          ? "red"
                          : "blue"
                  }
                  className="unique4-ant-tag"
                >
                  {report.status?.toUpperCase() || "DRAFT"}
                </Tag>
              </p>

              {report.adminComments && (
                <>
                  <p>
                    <strong>Supervisor Comments:</strong>
                  </p>
                  <Alert message={report.adminComments} type="warning" showIcon />
                </>
              )}

              {relevantCourses?.length > 0 && (
                <>
                  <Divider />
                  <p>
                    <strong>Relevant Courses That Helped:</strong>
                  </p>
                  <List
                    size="small"
                    dataSource={relevantCourses}
                    renderItem={(course) => (
                      <List.Item className="unique4-ant-list-item">
                        <Tag color="blue" className="unique4-ant-tag">{course.code}</Tag> {course.name}
                      </List.Item>
                    )}
                  />
                </>
              )}
            </Panel>
          )}

          {evaluation && (
            <Panel header="Evaluation Details" key="evaluation" className="unique4-ant-collapse-header">
              <p>
                <strong>Rating:</strong> <Rate disabled defaultValue={evaluation.rating} />
              </p>
              <p>
                <strong>Recommend:</strong>
                <Tag color={evaluation.wouldRecommend ? "green" : "red"} className="unique4-ant-tag">
                  {evaluation.wouldRecommend ? "Yes" : "No"}
                </Tag>
              </p>
              <p>
                <strong>Status:</strong>
                <Tag color={evaluation.isFinalized ? "green" : "orange"} className="unique4-ant-tag">
                  {evaluation.isFinalized ? "FINALIZED" : "DRAFT"}
                </Tag>
              </p>
              <p>
                <strong>Comments:</strong> {evaluation.comments}
              </p>
            </Panel>
          )}
        </Collapse>
      </div>
    )
  }

  return (
    <div className="unique4-reports-container">
      {/* Internships Section */}
      <Card title="My Internships" className="unique4-section-card">
        <div className="unique4-filters">
          <button className="unique4-filter-button" onClick={toggleFilters}>
            <span className="filter-icon">≡</span> Filters
          </button>
          <div className="unique4-search-container">
            <input
              type="text"
              placeholder="Search by company or title"
              className="unique4-search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button className="unique4-clear-search" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="unique4-filter-modal-overlay">
            <div className="unique4-filter-modal">
              <div className="unique4-filter-modal-header">
                <h2>Filters</h2>
                <button className="unique4-close-button" onClick={toggleFilters}>
                  ✕
                </button>
              </div>

              <div className="unique4-filter-modal-content">
                <div className="unique4-filter-section">
                  <h3>STATUS</h3>
                  <div className="unique4-filter-options">
                    <button
                      className={`unique4-filter-option ${filters.status === "all" ? "unique4-selected" : ""}`}
                      onClick={() => handleFilterChange("status", "all")}
                    >
                      All
                    </button>
                    <button
                      className={`unique4-filter-option ${filters.status === "current" ? "unique4-selected" : ""}`}
                      onClick={() => handleFilterChange("status", "current")}
                    >
                      Current
                    </button>
                    <button
                      className={`unique4-filter-option ${filters.status === "completed" ? "unique4-selected" : ""}`}
                      onClick={() => handleFilterChange("status", "completed")}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                <div className="unique4-filter-section">
                  <h3>DATE RANGE</h3>
                  <DatePicker.RangePicker onChange={setDateRange} style={{ width: "100%" }} />
                </div>
              </div>

              <div className="unique4-filter-actions">
                <button className={`unique4-reset-button ${hasActiveFilters() ? "unique4-active" : ""}`} onClick={resetFilters}>
                  Reset
                </button>
                <button className="unique4-apply-button" onClick={toggleFilters}>
                  Show {filteredInternships.length} internships
                </button>
              </div>
            </div>
          </div>
        )}

        {searchText && (
          <div className="unique4-search-results">
            <div className="unique4-results-count">
              Found {filteredInternships.length} {filteredInternships.length === 1 ? "internship" : "internships"}{" "}
              matching "{searchText}"
            </div>
          </div>
        )}

        <Table
          columns={[
            {
              title: "Company",
              dataIndex: "company",
              key: "company",
            },
            {
              title: "Position",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "Duration",
              dataIndex: "duration",
              key: "duration",
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status) => <Tag color={status === "completed" ? "green" : "orange"} className="unique4-ant-tag">{status.toUpperCase()}</Tag>,
            },
            {
              title: "Report Status",
              key: "reportStatus",
              render: (_, record) => {
                const report = reports.find((r) => r.internshipId === record.id)
                if (!report) return "-"

                let color = "default"
                if (report.status === "approved") color = "green"
                if (report.status === "flagged") color = "orange"
                if (report.status === "rejected") color = "red"

                return <Tag color={color} className="unique4-ant-tag">{report.status ? report.status.toUpperCase() : "PENDING"}</Tag>
              },
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => {
                const report = reports.find((r) => r.internshipId === record.id)
                return (
                  <Space size="middle">
                    <Button
                      className="unique4-view-profile-button"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        setSelectedInternship(record)
                        report ? handleEditReport(report) : handleCreateReport()
                      }}
                    >
                      View Report
                    </Button>
                    {report && ["flagged", "rejected"].includes(report.status) && (
                      <Button className="unique4-view-profile-button" onClick={() => handleAppealReport(report)}>
                        Appeal
                      </Button>
                    )}
                    <Button className="unique4-view-profile-button" icon={<EyeOutlined />} onClick={() => handleExpandRow(record)}>
                      View More
                    </Button>
                  </Space>
                )
              },
            },
          ]}
          dataSource={filteredInternships}
          rowKey="id"
          pagination={false}
          expandable={{
            expandedRowRender,
            expandedRowKeys,
            onExpand: (expanded, record) => handleExpandRow(record),
          }}
          className="unique4-ant-table"
        />
      </Card>

      {/* Reports Section */}
      <Card title="My Reports" className="unique4-section-card">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateReport} className="unique4-mb-16">
          New Report
        </Button>
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "Company",
              key: "company",
              render: (_, record) => {
                const internship = internships.find((i) => i.id === record.internshipId)
                return internship ? internship.company : "N/A"
              },
            },
            {
              title: "Created Date",
              dataIndex: "createdAt",
              key: "createdAt",
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status) => {
                let color = "default"
                if (status === "approved") color = "green"
                if (status === "flagged") color = "orange"
                if (status === "rejected") color = "red"
                if (status === "appealed") color = "blue"

                return <Tag color={color} className="unique4-ant-tag">{status ? status.toUpperCase() : "PENDING"}</Tag>
              },
            },
            {
              title: "Finalized",
              dataIndex: "isFinalized",
              key: "isFinalized",
              render: (isFinalized) => <Tag color={isFinalized ? "green" : "orange"} className="unique4-ant-tag">{isFinalized ? "YES" : "NO"}</Tag>,
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <Space size="middle">
                  <Button className="unique4-view-profile-button" icon={<EyeOutlined />} onClick={() => handleEditReport(record)}>
                    View
                  </Button>
                  {!record.isFinalized && (
                    <>
                      <Button className="unique4-view-profile-button" icon={<EditOutlined />} onClick={() => handleEditReport(record)}>
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this report?"
                        onConfirm={() => handleDeleteReport(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button className="unique4-view-profile-button" danger icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Popconfirm>
                    </>
                  )}
                  <Button className="unique4-view-profile-button" icon={<DownloadOutlined />} onClick={() => handleDownloadReport(record.id)}>
                    Download
                  </Button>
                  {!record.isFinalized && (
                    <Button className="unique4-view-profile-button" icon={<CheckCircleOutlined />} onClick={() => handleFinalizeReport(record.id)}>
                      Finalize
                    </Button>
                  )}
                 
                </Space>
              ),
            },
          ]}
          dataSource={reports}
          rowKey="id"
          className="unique4-ant-table"
        />
      </Card>

      {/* Evaluations Section */}
      <Card title="My Evaluations" className="unique4-section-card">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateEvaluation} className="unique4-mb-16">
          New Evaluation
        </Button>
        <Table
          columns={[
            {
              title: "Company",
              dataIndex: "company",
              key: "company",
            },
            {
              title: "Recommend",
              dataIndex: "wouldRecommend",
              key: "wouldRecommend",
              render: (recommend) => (
                <Tag color={recommend ? "green" : "red"} className="unique4-ant-tag">{recommend ? "Recommended" : "Not Recommended"}</Tag>
              ),
            },
            {
              title: "Rating",
              dataIndex: "rating",
              key: "rating",
              render: (rating) => `${rating}/5`,
            },
            {
              title: "Status",
              dataIndex: "isFinalized",
              key: "status",
              render: (isFinalized) => (
                <Tag color={isFinalized ? "green" : "orange"} className="unique4-ant-tag">{isFinalized ? "Finalized" : "Draft"}</Tag>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <Space size="middle">
                  <Button className="unique4-view-profile-button" icon={<EyeOutlined />} onClick={() => handleEditEvaluation(record)}>
                    View
                  </Button>
                  {!record.isFinalized && (
                    <>
                      <Button className="unique4-view-profile-button" icon={<EditOutlined />} onClick={() => handleEditEvaluation(record)}>
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this evaluation?"
                        onConfirm={() => handleDeleteEvaluation(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button className="unique4-view-profile-button" danger icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Popconfirm>
                    </>
                  )}
                  <Button
                    className="unique4-view-profile-button"
                    icon={<DownloadOutlined />}
                    onClick={() => message.info("Download functionality would be implemented here")}
                  >
                    Download
                  </Button>
                  {!record.isFinalized && (
                    <Button
                      className="unique4-view-profile-button"
                      icon={<CheckCircleOutlined />}
                      onClick={() => handleFinalizeEvaluation(record.id)}
                    >
                      Finalize
                    </Button>
                  )}
                </Space>
              ),
            },
          ]}
          dataSource={evaluations}
          rowKey="id"
          className="unique4-ant-table"
        />
      </Card>

      {/* Report Modal with Course Selection */}
      <Modal
        title={currentReport ? "Edit Report" : "Create Report"}
        open={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        onOk={handleSubmitReport}
        width={800}
        className="unique4-ant-modal-content"
      >
        <Form form={reportForm} layout="vertical" className="unique4-ant-form-item-label">
          <Form.Item name="title" label="Report Title" rules={[{ required: true, message: "Please enter a title" }]}>
            <Input placeholder="Enter report title" className="unique4-ant-input" />
          </Form.Item>
          <Form.Item
            name="introduction"
            label="Introduction"
            rules={[{ required: true, message: "Please write an introduction" }]}
          >
            <TextArea rows={4} placeholder="Write your introduction here..." className="unique4-ant-input" />
          </Form.Item>
          <Form.Item
            name="body"
            label="Report Body"
            rules={[{ required: true, message: "Please write the report body" }]}
          >
            <TextArea rows={8} placeholder="Write your report here..." className="unique4-ant-input" />
          </Form.Item>

          {/* Course Selection Section */}
          <Form.Item label="Relevant Courses" className="unique4-ant-form-item-label">
            <Button type="primary" onClick={() => setCourseModalVisible(true)} icon={<PlusOutlined />}>
              Select Courses
            </Button>
            {selectedCourses.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h4>Selected Courses:</h4>
                <List
                  size="small"
                  dataSource={selectedCourses}
                  renderItem={(course) => (
                    <List.Item className="unique4-ant-list-item">
                      <Tag color="blue" className="unique4-ant-tag">{course.code}</Tag> {course.name}
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>

      {/* Course Selection Modal */}
      <Modal
        title="Select Relevant Courses"
        open={courseModalVisible}
        onOk={saveSelectedCourses}
        onCancel={() => setCourseModalVisible(false)}
        width={600}
        className="unique4-ant-modal-content"
      >
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          <List
            dataSource={coursesInMajor}
            renderItem={(course) => (
              <List.Item className="unique4-ant-list-item">
                <Checkbox checked={course.selected} onChange={() => toggleCourseSelection(course.id)}>
                  {course.code} - {course.name}
                </Checkbox>
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Evaluation Modal */}
      <Modal
        title={currentEvaluation ? "Edit Evaluation" : "Create Evaluation"}
        open={evaluationModalVisible}
        onCancel={() => setEvaluationModalVisible(false)}
        onOk={handleSubmitEvaluation}
        width={600}
        className="unique4-ant-modal-content"
        footer={[
          <Button key="back" onClick={() => setEvaluationModalVisible(false)}>
            Cancel
          </Button>,
          currentEvaluation?.isFinalized ? null : (
            <Button key="submit" type="primary" onClick={() => evaluationForm.submit()}>
              {currentEvaluation ? "Update" : "Submit"}
            </Button>
          ),
          currentEvaluation && !currentEvaluation.isFinalized && (
            <Button
              key="finalize"
              type="primary"
              onClick={() => {
                evaluationForm.submit().then(() => {
                  handleFinalizeEvaluation(currentEvaluation.id)
                  setEvaluationModalVisible(false)
                })
              }}
            >
              Finalize
            </Button>
          ),
        ]}
      >
        <Form form={evaluationForm} layout="vertical" className="unique4-ant-form-item-label">
          <Form.Item
            name="wouldRecommend"
            label="Would you recommend this internship to other students?"
            rules={[{ required: true, message: "Please answer this question" }]}
          >
            <Select className="unique4-ant-select-selector">
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="rating"
            label="Overall Rating (1-5)"
            rules={[{ required: true, message: "Please provide a rating" }]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item name="comments" label="Additional Comments">
            <TextArea rows={4} placeholder="Share your thoughts about the internship..." className="unique4-ant-input" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Appeal Modal */}
      <Modal
        title="Appeal Report"
        open={appealModalVisible}
        onCancel={() => setAppealModalVisible(false)}
        onOk={handleSubmitAppeal}
        width={600}
        className="unique4-ant-modal-content"
      >
        <Form form={appealForm} layout="vertical" className="unique4-ant-form-item-label">
          <Form.Item
            name="message"
            label="Appeal Message"
            rules={[{ required: true, message: "Please enter your appeal message" }]}
          >
            <TextArea rows={4} placeholder="Explain why you are appealing this report..." className="unique4-ant-input" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Reports