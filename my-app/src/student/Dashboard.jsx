"use client"

import { useState } from "react"
// Ant Design Components
import {
  Badge,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Steps,
  Table,
  Tabs,
  Tooltip,
  Typography,
  Upload,
} from "antd"

// Ant Design Icons
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileSearchOutlined,
  InboxOutlined,
  PlayCircleOutlined,
  StarFilled,
  StarOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons"

import "./Dashboard.css"

const { TabPane } = Tabs
const { Step } = Steps
const { Option } = Select

const DashboardContent = () => {
  const stats = [
    { title: "Available Internships", value: 142, icon: <FileSearchOutlined /> },
    { title: "Active Applications", value: 4, icon: <ClockCircleOutlined /> },
    { title: "Completed Internships", value: 2, icon: <CheckCircleOutlined /> },
    { title: "Profile Completion", value: 75, icon: <UserOutlined /> },
  ]

  const [suggestedCompanies, setSuggestedCompanies] = useState([
    {
      id: 1,
      name: "Google",
      industry: "Technology",
      matchScore: 92,
      why: "Matches your skills in React and Node.js, and your interest in large-scale systems",
      saved: false,
      viewed: false,
    },
    {
      id: 2,
      name: "Airbnb",
      industry: "Travel/Tech",
      matchScore: 88,
      why: "Strong UX focus aligns with your design coursework",
      saved: false,
      viewed: false,
    },
    {
      id: 3,
      name: "Spotify",
      industry: "Music/Tech",
      matchScore: 85,
      why: "Recommended by 3 past interns with similar profiles",
      saved: false,
      viewed: false,
    },
  ])

  const [videoModalVisible, setVideoModalVisible] = useState(false)
  const [profileCompletionModalVisible, setProfileCompletionModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("suggestions")

  const toggleSaveCompany = (id) => {
    setSuggestedCompanies(
      suggestedCompanies.map((company) => (company.id === id ? { ...company, saved: !company.saved } : company)),
    )
  }

  const markAsViewed = (id) => {
    setSuggestedCompanies(
      suggestedCompanies.map((company) => (company.id === id ? { ...company, viewed: true } : company)),
    )
  }

  const refreshSuggestions = () => {
    // In a real app, this would fetch new suggestions from an API
    // For now, we'll just shuffle the existing ones
    setSuggestedCompanies([...suggestedCompanies].sort(() => 0.5 - Math.random()))
  }

  return (
    <div className="dashboard-container unique2">
      {/* Welcome Section */}
      <div className="welcome-section unique2">
        <h1 className="dashboard-title unique2">Welcome, Student</h1>
        <p className="dashboard-subtitle unique2">Here's an overview of your internship journey</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview unique2">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card unique2"
            onClick={() => {
              if (stat.title === "Profile Completion") {
                setProfileCompletionModalVisible(true)
              }
            }}
            style={{ cursor: stat.title === "Profile Completion" ? "pointer" : "default" }}
          >
            <div className="stat-icon unique2">{stat.icon}</div>
            <div className="stat-content unique2">
              <span className="stat-title unique2">{stat.title}</span>
              {stat.title === "Profile Completion" ? (
                <div style={{ width: "100%" }}>
                  <Progress
                    percent={stat.value}
                    status="active"
                    strokeColor="#5f2878"
                    style={{ marginBottom: "8px" }}
                  />
                  <span style={{ fontSize: "12px", color: "#6c757d" }}>Complete your profile for better matches</span>
                </div>
              ) : (
                <span className="stat-value unique2">{stat.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-content unique2">
        {/* Career Opportunities Section */}
        <div className="dashboard-card unique2">
          <div className="card-header unique2">
            <h2 className="card-title unique2">Career Opportunities</h2>
            <Tabs activeKey={activeTab} onChange={setActiveTab} className="card-tabs unique2">
              <TabPane tab="Suggested Companies" key="suggestions" />
              <TabPane tab="Saved Companies" key="saved" />
            </Tabs>
          </div>
          <div className="card-body unique2" style={{ padding: "20px" }}>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
              <Button icon={<SyncOutlined />} onClick={refreshSuggestions}>
                Refresh Suggestions
              </Button>
              <Input.Search placeholder="Filter companies..." allowClear style={{ width: 300 }} />
            </div>

            <Table
              dataSource={activeTab === "suggestions" ? suggestedCompanies : suggestedCompanies.filter((c) => c.saved)}
              rowKey="id"
              columns={[
                {
                  title: "Company",
                  dataIndex: "name",
                  key: "name",
                  render: (text, record) => (
                    <div onClick={() => markAsViewed(record.id)}>
                      <strong>{text}</strong>
                      {record.viewed || <Badge dot />}
                    </div>
                  ),
                },
                {
                  title: "Industry",
                  dataIndex: "industry",
                  key: "industry",
                  filters: [
                    { text: "Technology", value: "Technology" },
                    { text: "Travel/Tech", value: "Travel/Tech" },
                    { text: "Music/Tech", value: "Music/Tech" },
                  ],
                  onFilter: (value, record) => record.industry.includes(value),
                },
                {
                  title: "Match Score",
                  dataIndex: "matchScore",
                  key: "matchScore",
                  sorter: (a, b) => a.matchScore - b.matchScore,
                  render: (score) => (
                    <Tooltip title={`Match score: ${score}%`}>
                      <Progress
                        percent={score}
                        status={score > 90 ? "success" : score > 80 ? "active" : "normal"}
                        format={() => `${score}%`}
                        strokeColor="#5f2878"
                      />
                    </Tooltip>
                  ),
                },
                {
                  title: "Why Recommended",
                  dataIndex: "why",
                  key: "why",
                  render: (text) => <Typography.Text ellipsis={{ tooltip: text }}>{text}</Typography.Text>,
                },
                {
                  title: "Action",
                  key: "action",
                  render: (_, record) => (
                    <Space>
                      <Button type="primary" onClick={() => markAsViewed(record.id)}>
                        View Openings
                      </Button>
                      <Button
                        icon={record.saved ? <StarFilled /> : <StarOutlined />}
                        onClick={() => toggleSaveCompany(record.id)}
                      >
                        {record.saved ? "Saved" : "Save"}
                      </Button>
                    </Space>
                  ),
                },
              ]}
              pagination={{ pageSize: 5 }}
              rowClassName={(record) => (record.viewed ? "" : "unviewed-row unique2")}
            />
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="dashboard-card profile-card unique2">
          <div className="card-header unique2">
            <h2 className="card-title unique2">Complete Your Profile</h2>
          </div>
          <div className="card-body unique2" style={{ padding: "20px" }}>
            <p>Improve your chances of getting matched with the right internship.</p>
            <div className="profile-tasks unique2">
              <Checkbox>Add job interests</Checkbox>
              <Checkbox>Add your skills</Checkbox>
              <Checkbox>Upload your resume</Checkbox>
            </div>
            <Button type="primary" onClick={() => setProfileCompletionModalVisible(true)} style={{ marginTop: "16px" }}>
              Complete Profile
            </Button>

            <Divider />
            <div className="video-guide-section unique2">
              <h3>Not sure what internships count for your major?</h3>
              <p>Watch this short guide to understand the requirements:</p>
              <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => setVideoModalVisible(true)}>
                Watch Video Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Modal
        title="Internship Requirements Guide"
        visible={videoModalVisible}
        onCancel={() => setVideoModalVisible(false)}
        footer={null}
        width={800}
      >
        <div className="video-container unique2">
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/example-video-id"
            title="Internship Requirements Guide"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-description unique2">
          <h4>Key Points:</h4>
          <ul>
            <li>Internships must be directly related to your major</li>
            <li>Minimum of 300 hours required for full credit</li>
            <li>Must have a supervisor who can evaluate your work</li>
            <li>Project-based internships are acceptable</li>
            <li>Remote internships are permitted with proper documentation</li>
          </ul>
        </div>
      </Modal>

      {/* Profile Completion Modal */}
      <Modal
        title="Complete Your Profile"
        visible={profileCompletionModalVisible}
        onCancel={() => setProfileCompletionModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setProfileCompletionModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Save Changes
          </Button>,
        ]}
      >
        <Steps current={1} style={{ marginBottom: 24 }}>
          <Step title="Basic Info" />
          <Step title="Skills" />
          <Step title="Interests" />
          <Step title="Documents" />
        </Steps>

        <Form layout="vertical">
          <Form.Item label="Your Skills">
            <Select mode="tags" placeholder="Add your skills">
              <Option value="react">React</Option>
              <Option value="node">Node.js</Option>
              <Option value="python">Python</Option>
              <Option value="java">Java</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Internship Interests">
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox value="frontend">Frontend Development</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="backend">Backend Development</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="data">Data Science</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Upload Resume">
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default DashboardContent