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
      statusFilter === "all" ||
      (statusFilter === "current" && internship.status === "current") ||
      (statusFilter === "completed" && internship.status === "completed")
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

  // Enhanced expanded row content with courses
  const expandedRowRender = (record) => {
    const report = reports.find((r) => r.internshipId === record.id)
    const evaluation = evaluations.find((e) => e.internshipId === record.id)
    const relevantCourses = report?.relevantCourses
      ?.map((id) => coursesInMajor.find((c) => c.id === id))
      .filter(Boolean)

    return (
      <div className="expanded-content">
        <Collapse defaultActiveKey={["responsibilities", "skills"]}>
          <Panel header="Responsibilities" key="responsibilities">
            <ul>
              {record.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Panel>

          <Panel header="Skills Gained" key="skills">
            <div className="skills-tags">
              {record.skillsGained.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Panel>

          {report && (
            <Panel header="Report Details" key="report">
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
                      <List.Item>
                        <Tag color="blue">{course.code}</Tag> {course.name}
                      </List.Item>
                    )}
                  />
                </>
              )}
            </Panel>
          )}

          {evaluation && (
            <Panel header="Evaluation Details" key="evaluation">
              <p>
                <strong>Rating:</strong> <Rate disabled defaultValue={evaluation.rating} />
              </p>
              <p>
                <strong>Recommend:</strong>
                <Tag color={evaluation.wouldRecommend ? "green" : "red"}>
                  {evaluation.wouldRecommend ? "Yes" : "No"}
                </Tag>
              </p>
              <p>
                <strong>Status:</strong>
                <Tag color={evaluation.isFinalized ? "green" : "orange"}>
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
    <div className="reports-container">
      {/* Internships Section */}
      <Card
        title="My Internships"
        className="section-card"
        extra={
          <Space>
            <Input.Search
              placeholder="Search by company or title"
              allowClear
              onSearch={setSearchText}
              style={{ width: 250 }}
            />
            <Select defaultValue="all" style={{ width: 150 }} onChange={setStatusFilter}>
              <Option value="all">All Statuses</Option>
              <Option value="current">Current</Option>
              <Option value="completed">Completed</Option>
            </Select>
            <DatePicker.RangePicker onChange={setDateRange} style={{ width: 250 }} />
          </Space>
        }
      >
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
              render: (status) => <Tag color={status === "completed" ? "green" : "orange"}>{status.toUpperCase()}</Tag>,
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

                return <Tag color={color}>{report.status ? report.status.toUpperCase() : "PENDING"}</Tag>
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
                      type="link"
                      onClick={() => {
                        setSelectedInternship(record)
                        report ? handleEditReport(report) : handleCreateReport()
                      }}
                    >
                      {report ? "View Report" : "Create Report"}
                    </Button>
                    {report && ["flagged", "rejected"].includes(report.status) && (
                      <Button type="link" onClick={() => handleAppealReport(report)}>
                        Appeal
                      </Button>
                    )}
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
            rowExpandable: (record) => true,
          }}
        />
      </Card>

      {/* Reports Section */}
      <Card title="My Reports" className="section-card">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateReport} className="mb-16">
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

                return <Tag color={color}>{status ? status.toUpperCase() : "PENDING"}</Tag>
              },
            },
            {
              title: "Finalized",
              dataIndex: "isFinalized",
              key: "isFinalized",
              render: (isFinalized) => <Tag color={isFinalized ? "green" : "orange"}>{isFinalized ? "YES" : "NO"}</Tag>,
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <Space size="middle">
                  <Button type="link" icon={<EyeOutlined />} onClick={() => handleEditReport(record)}>
                    View
                  </Button>
                  {!record.isFinalized && (
                    <>
                      <Button type="link" icon={<EditOutlined />} onClick={() => handleEditReport(record)}>
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this report?"
                        onConfirm={() => handleDeleteReport(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Popconfirm>
                    </>
                  )}
                  <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownloadReport(record.id)}>
                    PDF
                  </Button>
                  {!record.isFinalized && (
                    <Button type="link" icon={<CheckCircleOutlined />} onClick={() => handleFinalizeReport(record.id)}>
                      Finalize
                    </Button>
                  )}
                  {["flagged", "rejected"].includes(record.status) && (
                    <Button type="link" onClick={() => handleAppealReport(record)}>
                      Appeal
                    </Button>
                  )}
                </Space>
              ),
            },
          ]}
          dataSource={reports}
          rowKey="id"
        />
      </Card>

      {/* Evaluations Section */}
      <Card title="My Evaluations" className="section-card">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateEvaluation} className="mb-16">
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
                <Tag color={recommend ? "green" : "red"}>{recommend ? "Recommended" : "Not Recommended"}</Tag>
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
                <Tag color={isFinalized ? "green" : "orange"}>{isFinalized ? "Finalized" : "Draft"}</Tag>
              ),
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <Space size="middle">
                  <Button type="link" icon={<EyeOutlined />} onClick={() => handleEditEvaluation(record)}>
                    View
                  </Button>
                  {!record.isFinalized && (
                    <>
                      <Button type="link" icon={<EditOutlined />} onClick={() => handleEditEvaluation(record)}>
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this evaluation?"
                        onConfirm={() => handleDeleteEvaluation(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Popconfirm>
                    </>
                  )}
                  <Button
                    type="link"
                    icon={<DownloadOutlined />}
                    onClick={() => message.info("Download functionality would be implemented here")}
                  >
                    PDF
                  </Button>
                  {!record.isFinalized && (
                    <Button
                      type="link"
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
        />
      </Card>

      {/* Report Modal with Course Selection */}
      <Modal
        title={currentReport ? "Edit Report" : "Create Report"}
        open={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        onOk={handleSubmitReport}
        width={800}
      >
        <Form form={reportForm} layout="vertical">
          <Form.Item name="title" label="Report Title" rules={[{ required: true, message: "Please enter a title" }]}>
            <Input placeholder="Enter report title" />
          </Form.Item>
          <Form.Item
            name="introduction"
            label="Introduction"
            rules={[{ required: true, message: "Please write an introduction" }]}
          >
            <TextArea rows={4} placeholder="Write your introduction here..." />
          </Form.Item>
          <Form.Item
            name="body"
            label="Report Body"
            rules={[{ required: true, message: "Please write the report body" }]}
          >
            <TextArea rows={8} placeholder="Write your report here..." />
          </Form.Item>

          {/* Course Selection Section */}
          <Form.Item label="Relevant Courses">
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
                    <List.Item>
                      <Tag color="blue">{course.code}</Tag> {course.name}
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
      >
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          <List
            dataSource={coursesInMajor}
            renderItem={(course) => (
              <List.Item>
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
        <Form form={evaluationForm} layout="vertical">
          <Form.Item
            name="wouldRecommend"
            label="Would you recommend this internship to other students?"
            rules={[{ required: true, message: "Please answer this question" }]}
          >
            <Select>
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
            <TextArea rows={4} placeholder="Share your thoughts about the internship..." />
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
      >
        <Form form={appealForm} layout="vertical">
          <Form.Item
            name="message"
            label="Appeal Message"
            rules={[{ required: true, message: "Please enter your appeal message" }]}
          >
            <TextArea rows={4} placeholder="Explain why you are appealing this report..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Reports
