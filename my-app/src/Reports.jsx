"use client"

import { useState } from "react"
// Ant Design Components
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Row,
  Select,
  Tag,
  Typography,
} from "antd"

// Ant Design Icons
import {
  BookOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  SolutionOutlined,
  StarOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons"

import "./Profile.css"

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

const ProfileContent = () => {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    bio: "Computer Science student with interest in web development and data analysis.",
    major: "Computer Science",
    semester: 5,
    graduationYear: 2024,
    gpa: 3.7,
    jobInterests: ["Web Development", "Data Analysis", "UI/UX Design"],
    skills: ["JavaScript", "React", "Python", "HTML/CSS", "SQL"],
    internships: [
      {
        id: 1,
        company: "Tech Solutions Inc.",
        position: "Frontend Developer Intern",
        duration: "June 2022 - August 2022",
        status: "completed",
        location: "San Francisco, CA",
        skillsGained: ["React", "Redux", "TypeScript"],
        responsibilities: [
          "Developed responsive web interfaces using React",
          "Collaborated with UX team to implement designs",
          "Participated in code reviews",
        ],
        recommendationLetter: true,
        supervisorContact: "jane.smith@techsolutions.com",
      },
      {
        id: 2,
        company: "Data Analytics Co.",
        position: "Data Science Intern",
        duration: "June 2023 - Present",
        status: "current",
        location: "Remote",
        skillsGained: ["Python", "Pandas", "SQL"],
        responsibilities: [
          "Analyzed large datasets for business insights",
          "Created predictive models using machine learning",
          "Prepared data visualizations for stakeholders",
        ],
        recommendationLetter: false,
        supervisorContact: "michael.johnson@dataanalytics.com",
      },
    ],
    partTimeJobs: [
      {
        id: 1,
        company: "University IT Department",
        position: "Student Technician",
        duration: "September 2021 - Present",
        responsibilities: [
          "Provided technical support to students and faculty",
          "Maintained computer labs",
          "Assisted with network troubleshooting",
        ],
      },
    ],
    activities: [
      {
        id: 1,
        organization: "Computer Science Club",
        role: "Vice President",
        duration: "2021 - Present",
        description: "Organized hackathons and tech talks for members",
      },
    ],
  })

  const majors = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Biology",
    "Psychology",
  ]

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]
  const graduationYears = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i)

  const jobInterestOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
    "Product Management",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInternshipChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      internships: prev.internships.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const handleAddInternship = () => {
    setFormData((prev) => ({
      ...prev,
      internships: [
        ...prev.internships,
        {
          id: Date.now(),
          company: "",
          position: "",
          duration: "",
          status: "current",
          location: "",
          skillsGained: [],
          responsibilities: [""],
          recommendationLetter: false,
          supervisorContact: "",
        },
      ],
    }))
  }

  const handleRemoveInternship = (id) => {
    setFormData((prev) => ({
      ...prev,
      internships: prev.internships.filter((item) => item.id !== id),
    }))
  }

  const handlePartTimeJobChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      partTimeJobs: prev.partTimeJobs.map((job) => (job.id === id ? { ...job, [field]: value } : job)),
    }))
  }

  const handleAddPartTimeJob = () => {
    setFormData((prev) => ({
      ...prev,
      partTimeJobs: [
        ...prev.partTimeJobs,
        {
          id: Date.now(),
          company: "",
          position: "",
          duration: "",
          responsibilities: [""],
        },
      ],
    }))
  }

  const handleRemovePartTimeJob = (id) => {
    setFormData((prev) => ({
      ...prev,
      partTimeJobs: prev.partTimeJobs.filter((job) => job.id !== id),
    }))
  }

  const handleActivityChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) => (activity.id === id ? { ...activity, [field]: value } : activity)),
    }))
  }

  const handleAddActivity = () => {
    setFormData((prev) => ({
      ...prev,
      activities: [
        ...prev.activities,
        {
          id: Date.now(),
          organization: "",
          role: "",
          duration: "",
          description: "",
        },
      ],
    }))
  }

  const handleRemoveActivity = (id) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((activity) => activity.id !== id),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Profile updated:", formData)
    setEditMode(false)
    message.success("Profile updated successfully")
  }

  return (
    <div className="profile-content">
      <div className="profile-header">
        <Title level={2}>
          <UserOutlined /> My Profile
        </Title>
        <Button
          onClick={() => setEditMode(!editMode)}
          type={editMode ? "default" : "primary"}
          icon={editMode ? <DeleteOutlined /> : <EditOutlined />}
        >
          {editMode ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      {editMode ? (
        <Form onSubmit={handleSubmit} className="profile-form">
          {/* Basic Information Section */}
          <Card title="Basic Information" className="form-section">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name">
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name">
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    prefix={<MailOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone">
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    prefix={<PhoneOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Bio">
              <TextArea name="bio" value={formData.bio} onChange={handleChange} rows={3} />
            </Form.Item>
          </Card>

          {/* Academic Information Section */}
          <Card
            title={
              <span>
                <BookOutlined /> Academic Information
              </span>
            }
            className="form-section"
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Major">
                  <Select
                    name="major"
                    value={formData.major}
                    onChange={(value) => handleChange({ target: { name: "major", value } })}
                    style={{ width: "100%" }}
                  >
                    {majors.map((major) => (
                      <Option key={major} value={major}>
                        {major}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Current Semester">
                  <Select
                    name="semester"
                    value={formData.semester}
                    onChange={(value) => handleChange({ target: { name: "semester", value } })}
                    style={{ width: "100%" }}
                  >
                    {semesters.map((sem) => (
                      <Option key={sem} value={sem}>
                        Semester {sem}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Graduation Year">
                  <Select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={(value) => handleChange({ target: { name: "graduationYear", value } })}
                    style={{ width: "100%" }}
                  >
                    {graduationYears.map((year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="GPA">
              <InputNumber
                min={0}
                max={4}
                step={0.1}
                name="gpa"
                value={formData.gpa}
                onChange={(value) => handleChange({ target: { name: "gpa", value } })}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Card>

          {/* Job Interests Section */}
          <Card
            title={
              <span>
                <SolutionOutlined /> Job Interests
              </span>
            }
            className="form-section"
          >
            <Form.Item label="Select your job interests">
              <Checkbox.Group
                options={jobInterestOptions}
                value={formData.jobInterests}
                onChange={(values) => handleArrayChange("jobInterests", values)}
              />
            </Form.Item>
          </Card>

          {/* Skills Section */}
          <Card
            title={
              <span>
                <TrophyOutlined /> Skills
              </span>
            }
            className="form-section"
          >
            <Form.Item label="Add your skills (comma separated)">
              <Input
                value={formData.skills.join(", ")}
                onChange={(e) => {
                  const skills = e.target.value.split(",").map((s) => s.trim())
                  handleArrayChange("skills", skills)
                }}
              />
              <div className="skills-display">
                {formData.skills.map((skill, index) => (
                  <Tag key={index}>{skill}</Tag>
                ))}
              </div>
            </Form.Item>
          </Card>

          {/* Internships Section */}
          <Card
            title={
              <span>
                <SolutionOutlined /> Internships
              </span>
            }
            className="form-section"
            extra={
              <Button type="primary" onClick={handleAddInternship} icon={<PlusOutlined />}>
                Add Internship
              </Button>
            }
          >
            {formData.internships.length > 0 ? (
              formData.internships.map((internship) => (
                <Card
                  key={internship.id}
                  className={`internship-card ${internship.status}`}
                  title={
                    <div className="internship-header">
                      <h4>
                        {internship.position} at {internship.company}
                      </h4>
                      <Tag color={internship.status === "current" ? "green" : "blue"}>
                        {internship.status === "current" ? "Current" : "Completed"}
                      </Tag>
                    </div>
                  }
                  extra={
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleRemoveInternship(internship.id)} />
                  }
                >
                  <div className="internship-edit-form">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Company">
                          <Input
                            value={internship.company}
                            onChange={(e) => handleInternshipChange(internship.id, "company", e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Position">
                          <Input
                            value={internship.position}
                            onChange={(e) => handleInternshipChange(internship.id, "position", e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Duration">
                          <Input
                            value={internship.duration}
                            onChange={(e) => handleInternshipChange(internship.id, "duration", e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Status">
                          <Select
                            value={internship.status}
                            onChange={(value) => handleInternshipChange(internship.id, "status", value)}
                            style={{ width: "100%" }}
                          >
                            <Option value="current">Current</Option>
                            <Option value="completed">Completed</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Location">
                      <Input
                        value={internship.location}
                        onChange={(e) => handleInternshipChange(internship.id, "location", e.target.value)}
                        prefix={<EnvironmentOutlined />}
                      />
                    </Form.Item>

                    <Form.Item label="Skills Gained (comma separated)">
                      <Input
                        value={internship.skillsGained.join(", ")}
                        onChange={(e) => {
                          const skills = e.target.value.split(",").map((s) => s.trim())
                          handleInternshipChange(internship.id, "skillsGained", skills)
                        }}
                      />
                    </Form.Item>

                    <Form.Item label="Supervisor Contact">
                      <Input
                        value={internship.supervisorContact}
                        onChange={(e) => handleInternshipChange(internship.id, "supervisorContact", e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Checkbox
                        checked={internship.recommendationLetter}
                        onChange={(e) =>
                          handleInternshipChange(internship.id, "recommendationLetter", e.target.checked)
                        }
                      >
                        Received recommendation letter
                      </Checkbox>
                    </Form.Item>

                    <Form.Item label="Responsibilities">
                      {internship.responsibilities.map((resp, idx) => (
                        <div key={idx} className="responsibility-item">
                          <Input
                            value={resp}
                            onChange={(e) => {
                              const newResponsibilities = [...internship.responsibilities]
                              newResponsibilities[idx] = e.target.value
                              handleInternshipChange(internship.id, "responsibilities", newResponsibilities)
                            }}
                          />
                          {idx === internship.responsibilities.length - 1 && (
                            <Button
                              type="dashed"
                              onClick={() => {
                                const newResponsibilities = [...internship.responsibilities, ""]
                                handleInternshipChange(internship.id, "responsibilities", newResponsibilities)
                              }}
                              icon={<PlusOutlined />}
                            />
                          )}
                          {internship.responsibilities.length > 1 && (
                            <Button
                              danger
                              onClick={() => {
                                const newResponsibilities = internship.responsibilities.filter((_, i) => i !== idx)
                                handleInternshipChange(internship.id, "responsibilities", newResponsibilities)
                              }}
                              icon={<DeleteOutlined />}
                            />
                          )}
                        </div>
                      ))}
                    </Form.Item>
                  </div>
                </Card>
              ))
            ) : (
              <div className="empty-state">
                <p>No internships added yet.</p>
                <Button type="primary" onClick={handleAddInternship}>
                  Add Your First Internship
                </Button>
              </div>
            )}
          </Card>

          {/* Part-Time Jobs Section */}
          <Card
            title={
              <span>
                <TeamOutlined /> Part-Time Jobs
              </span>
            }
            className="form-section"
            extra={
              <Button type="primary" onClick={handleAddPartTimeJob} icon={<PlusOutlined />}>
                Add Job
              </Button>
            }
          >
            {formData.partTimeJobs.length > 0 ? (
              formData.partTimeJobs.map((job) => (
                <Card
                  key={job.id}
                  className="job-card"
                  title={
                    <div className="job-header">
                      <h4>
                        {job.position} at {job.company}
                      </h4>
                    </div>
                  }
                  extra={<Button danger icon={<DeleteOutlined />} onClick={() => handleRemovePartTimeJob(job.id)} />}
                >
                  <div className="job-edit-form">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Company">
                          <Input
                            value={job.company}
                            onChange={(e) => handlePartTimeJobChange(job.id, "company", e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Position">
                          <Input
                            value={job.position}
                            onChange={(e) => handlePartTimeJobChange(job.id, "position", e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Duration">
                      <Input
                        value={job.duration}
                        onChange={(e) => handlePartTimeJobChange(job.id, "duration", e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Responsibilities">
                      {job.responsibilities.map((resp, idx) => (
                        <div key={idx} className="responsibility-item">
                          <Input
                            value={resp}
                            onChange={(e) => {
                              const newResponsibilities = [...job.responsibilities]
                              newResponsibilities[idx] = e.target.value
                              handlePartTimeJobChange(job.id, "responsibilities", newResponsibilities)
                            }}
                          />
                          {idx === job.responsibilities.length - 1 && (
                            <Button
                              type="dashed"
                              onClick={() => {
                                const newResponsibilities = [...job.responsibilities, ""]
                                handlePartTimeJobChange(job.id, "responsibilities", newResponsibilities)
                              }}
                              icon={<PlusOutlined />}
                            />
                          )}
                          {job.responsibilities.length > 1 && (
                            <Button
                              danger
                              onClick={() => {
                                const newResponsibilities = job.responsibilities.filter((_, i) => i !== idx)
                                handlePartTimeJobChange(job.id, "responsibilities", newResponsibilities)
                              }}
                              icon={<DeleteOutlined />}
                            />
                          )}
                        </div>
                      ))}
                    </Form.Item>
                  </div>
                </Card>
              ))
            ) : (
              <div className="empty-state">
                <p>No part-time jobs added yet.</p>
              </div>
            )}
          </Card>

          {/* College Activities Section */}
          <Card
            title={
              <span>
                <TrophyOutlined /> College Activities
              </span>
            }
            className="form-section"
            extra={
              <Button type="primary" onClick={handleAddActivity} icon={<PlusOutlined />}>
                Add Activity
              </Button>
            }
          >
            {formData.activities.length > 0 ? (
              formData.activities.map((activity) => (
                <Card
                  key={activity.id}
                  className="activity-card"
                  title={
                    <div className="activity-header">
                      <h4>
                        {activity.role} at {activity.organization}
                      </h4>
                    </div>
                  }
                  extra={<Button danger icon={<DeleteOutlined />} onClick={() => handleRemoveActivity(activity.id)} />}
                >
                  <div className="activity-edit-form">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Organization">
                          <Input
                            value={activity.organization}
                            onChange={(e) => handleActivityChange(activity.id, "organization", e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Role">
                          <Input
                            value={activity.role}
                            onChange={(e) => handleActivityChange(activity.id, "role", e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Duration">
                      <Input
                        value={activity.duration}
                        onChange={(e) => handleActivityChange(activity.id, "duration", e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Description">
                      <TextArea
                        rows={3}
                        value={activity.description}
                        onChange={(e) => handleActivityChange(activity.id, "description", e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </Card>
              ))
            ) : (
              <div className="empty-state">
                <p>No activities added yet.</p>
              </div>
            )}
          </Card>

          <div className="form-actions">
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </div>
        </Form>
      ) : (
        <div className="profile-view">
          {/* View Mode - Basic Information */}
          <Card
            title={
              <span>
                <UserOutlined /> Basic Information
              </span>
            }
            className="profile-section"
          >
            <Descriptions column={2}>
              <Descriptions.Item label="Name">
                {formData.firstName} {formData.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{formData.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{formData.phone}</Descriptions.Item>
              <Descriptions.Item label="Bio">{formData.bio}</Descriptions.Item>
            </Descriptions>
          </Card>

          {/* View Mode - Academic Information */}
          <Card
            title={
              <span>
                <BookOutlined /> Academic Information
              </span>
            }
            className="profile-section"
          >
            <Descriptions column={2}>
              <Descriptions.Item label="Major">{formData.major}</Descriptions.Item>
              <Descriptions.Item label="Current Semester">Semester {formData.semester}</Descriptions.Item>
              <Descriptions.Item label="Graduation Year">{formData.graduationYear}</Descriptions.Item>
              <Descriptions.Item label="GPA">{formData.gpa}</Descriptions.Item>
            </Descriptions>
          </Card>

          {/* View Mode - Job Interests */}
          <Card
            title={
              <span>
                <SolutionOutlined /> Job Interests
              </span>
            }
            className="profile-section"
          >
            <div className="tags-container">
              {formData.jobInterests.map((interest, index) => (
                <Tag key={index} color="blue">
                  {interest}
                </Tag>
              ))}
            </div>
          </Card>

          {/* View Mode - Skills */}
          <Card
            title={
              <span>
                <TrophyOutlined /> Skills
              </span>
            }
            className="profile-section"
          >
            <div className="tags-container">
              {formData.skills.map((skill, index) => (
                <Tag key={index} color="green">
                  {skill}
                </Tag>
              ))}
            </div>
          </Card>

          {/* View Mode - Internships */}
          <Card
            title={
              <span>
                <SolutionOutlined /> Internships
              </span>
            }
            className="profile-section"
          >
            {formData.internships.length > 0 ? (
              formData.internships.map((internship, index) => (
                <Card
                  key={index}
                  className={`internship-card ${internship.status}`}
                  title={
                    <div className="internship-header">
                      <h4>
                        {internship.position} at {internship.company}
                      </h4>
                      <Tag color={internship.status === "current" ? "green" : "blue"}>
                        {internship.status === "current" ? "Current" : "Completed"}
                      </Tag>
                    </div>
                  }
                >
                  <div className="internship-view">
                    <div className="internship-meta">
                      <p>
                        <CalendarOutlined /> {internship.duration}
                      </p>
                      <p>
                        <EnvironmentOutlined /> {internship.location}
                      </p>
                      {internship.recommendationLetter && (
                        <p>
                          <StarOutlined /> Recommendation letter available
                        </p>
                      )}
                    </div>

                    <Divider orientation="left">Skills Gained</Divider>
                    <div className="skills-container">
                      {internship.skillsGained.map((skill, idx) => (
                        <Tag key={idx} color="geekblue">
                          {skill}
                        </Tag>
                      ))}
                    </div>

                    <Divider orientation="left">Responsibilities</Divider>
                    <List
                      dataSource={internship.responsibilities}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />

                    {internship.supervisorContact && (
                      <>
                        <Divider orientation="left">Supervisor Contact</Divider>
                        <p>
                          <MailOutlined /> {internship.supervisorContact}
                        </p>
                      </>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="empty-state">
                <p>No internships added yet.</p>
              </div>
            )}
          </Card>

          {/* View Mode - Part-Time Jobs */}
          <Card
            title={
              <span>
                <TeamOutlined /> Part-Time Jobs
              </span>
            }
            className="profile-section"
          >
            {formData.partTimeJobs.length > 0 ? (
              formData.partTimeJobs.map((job, index) => (
                <Card
                  key={index}
                  className="job-card"
                  title={
                    <div className="job-header">
                      <h4>
                        {job.position} at {job.company}
                      </h4>
                    </div>
                  }
                >
                  <div className="job-view">
                    <div className="job-meta">
                      <p>
                        <CalendarOutlined /> {job.duration}
                      </p>
                    </div>

                    <Divider orientation="left">Responsibilities</Divider>
                    <List dataSource={job.responsibilities} renderItem={(item) => <List.Item>{item}</List.Item>} />
                  </div>
                </Card>
              ))
            ) : (
              <div className="empty-state">
                <p>No part-time jobs added yet.</p>
              </div>
            )}
          </Card>

          {/* View Mode - College Activities */}
          <Card
            title={
              <span>
                <TrophyOutlined /> College Activities
              </span>
            }
            className="profile-section"
          >
            {formData.activities.length > 0 ? (
              formData.activities.map((activity, index) => (
                <Card
                  key={index}
                  className="activity-card"
                  title={
                    <div className="activity-header">
                      <h4>
                        {activity.role} at {activity.organization}
                      </h4>
                    </div>
                  }
                >
                  <div className="activity-view">
                    <div className="activity-meta">
                      <p>
                        <CalendarOutlined /> {activity.duration}
                      </p>
                    </div>

                    <Divider orientation="left">Description</Divider>
                    <p>{activity.description}</p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="empty-state">
                <p>No activities added yet.</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}

export default ProfileContent
