import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Ant Design Components
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Descriptions,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  List,
  Menu,
  message,
  Modal,
  Popconfirm,
  Progress,
  Rate,
  Row,
  Select,
  Space,
  Steps,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  Upload
} from 'antd';

// Ant Design Icons
import {
  BellOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  DollarOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  FileDoneOutlined,
  FilePdfOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FilterOutlined,
  InboxOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  PrinterOutlined,
  SearchOutlined,
  SolutionOutlined,
  StarFilled,
  StarOutlined,
  SyncOutlined,
  TrophyOutlined,
  UploadOutlined,
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons';


import "./Student.css";
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const { Step } = Steps;
const { Dragger } = Upload;
const { Panel } = Collapse;
const { TabPane } = Tabs;
// ==================== Profile Component ====================
const ProfileContent = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Computer Science student with interest in web development and data analysis.',
    major: 'Computer Science',
    semester: 5,
    graduationYear: 2024,
    gpa: 3.7,
    jobInterests: ['Web Development', 'Data Analysis', 'UI/UX Design'],
    skills: ['JavaScript', 'React', 'Python', 'HTML/CSS', 'SQL'],
    internships: [
      {
        id: 1,
        company: 'Tech Solutions Inc.',
        position: 'Frontend Developer Intern',
        duration: 'June 2022 - August 2022',
        status: 'completed',
        location: 'San Francisco, CA',
        skillsGained: ['React', 'Redux', 'TypeScript'],
        responsibilities: [
          'Developed responsive web interfaces using React',
          'Collaborated with UX team to implement designs',
          'Participated in code reviews'
        ],
        recommendationLetter: true,
        supervisorContact: 'jane.smith@techsolutions.com'
      },
      {
        id: 2,
        company: 'Data Analytics Co.',
        position: 'Data Science Intern',
        duration: 'June 2023 - Present',
        status: 'current',
        location: 'Remote',
        skillsGained: ['Python', 'Pandas', 'SQL'],
        responsibilities: [
          'Analyzed large datasets for business insights',
          'Created predictive models using machine learning',
          'Prepared data visualizations for stakeholders'
        ],
        recommendationLetter: false,
        supervisorContact: 'michael.johnson@dataanalytics.com'
      }
    ],
    partTimeJobs: [
      {
        id: 1,
        company: 'University IT Department',
        position: 'Student Technician',
        duration: 'September 2021 - Present',
        responsibilities: [
          'Provided technical support to students and faculty',
          'Maintained computer labs',
          'Assisted with network troubleshooting'
        ]
      }
    ],
    activities: [
      {
        id: 1,
        organization: 'Computer Science Club',
        role: 'Vice President',
        duration: '2021 - Present',
        description: 'Organized hackathons and tech talks for members'
      }
    ]
  });

  const majors = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Business Administration',
    'Biology',
    'Psychology'
  ];

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const graduationYears = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  const jobInterestOptions = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'Cloud Computing',
    'Cybersecurity',
    'DevOps',
    'Product Management'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInternshipChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      internships: prev.internships.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddInternship = () => {
    setFormData(prev => ({
      ...prev,
      internships: [
        ...prev.internships,
        {
          id: Date.now(),
          company: '',
          position: '',
          duration: '',
          status: 'current',
          location: '',
          skillsGained: [],
          responsibilities: [''],
          recommendationLetter: false,
          supervisorContact: ''
        }
      ]
    }));
  };

  const handleRemoveInternship = (id) => {
    setFormData(prev => ({
      ...prev,
      internships: prev.internships.filter(item => item.id !== id)
    }));
  };

  const handlePartTimeJobChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      partTimeJobs: prev.partTimeJobs.map(job => 
        job.id === id ? { ...job, [field]: value } : job
      )
    }));
  };

  const handleAddPartTimeJob = () => {
    setFormData(prev => ({
      ...prev,
      partTimeJobs: [
        ...prev.partTimeJobs,
        {
          id: Date.now(),
          company: '',
          position: '',
          duration: '',
          responsibilities: ['']
        }
      ]
    }));
  };

  const handleRemovePartTimeJob = (id) => {
    setFormData(prev => ({
      ...prev,
      partTimeJobs: prev.partTimeJobs.filter(job => job.id !== id)
    }));
  };

  const handleActivityChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.map(activity => 
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    }));
  };

  const handleAddActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [
        ...prev.activities,
        {
          id: Date.now(),
          organization: '',
          role: '',
          duration: '',
          description: ''
        }
      ]
    }));
  };

  const handleRemoveActivity = (id) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    setEditMode(false);
    message.success('Profile updated successfully');
  };

  return (
    <div className="profile-content">
      <div className="profile-header">
        <Title level={2}><UserOutlined /> My Profile</Title>
        <Button 
          onClick={() => setEditMode(!editMode)}
          type={editMode ? 'default' : 'primary'}
          icon={editMode ? <DeleteOutlined /> : <EditOutlined />}
        >
          {editMode ? 'Cancel Editing' : 'Edit Profile'}
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
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
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
              <TextArea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
              />
            </Form.Item>
          </Card>

          {/* Academic Information Section */}
          <Card title={<span><BookOutlined /> Academic Information</span>} className="form-section">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Major">
                  <Select
                    name="major"
                    value={formData.major}
                    onChange={(value) => handleChange({ target: { name: 'major', value } })}
                    style={{ width: '100%' }}
                  >
                    {majors.map(major => (
                      <Option key={major} value={major}>{major}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Current Semester">
                  <Select
                    name="semester"
                    value={formData.semester}
                    onChange={(value) => handleChange({ target: { name: 'semester', value } })}
                    style={{ width: '100%' }}
                  >
                    {semesters.map(sem => (
                      <Option key={sem} value={sem}>Semester {sem}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Graduation Year">
                  <Select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={(value) => handleChange({ target: { name: 'graduationYear', value } })}
                    style={{ width: '100%' }}
                  >
                    {graduationYears.map(year => (
                      <Option key={year} value={year}>{year}</Option>
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
                onChange={(value) => handleChange({ target: { name: 'gpa', value } })}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Card>

          {/* Job Interests Section */}
          <Card title={<span><SolutionOutlined /> Job Interests</span>} className="form-section">
            <Form.Item label="Select your job interests">
              <Checkbox.Group
                options={jobInterestOptions}
                value={formData.jobInterests}
                onChange={(values) => handleArrayChange('jobInterests', values)}
              />
            </Form.Item>
          </Card>

          {/* Skills Section */}
          <Card title={<span><TrophyOutlined /> Skills</span>} className="form-section">
            <Form.Item label="Add your skills (comma separated)">
              <Input
                value={formData.skills.join(', ')}
                onChange={(e) => {
                  const skills = e.target.value.split(',').map(s => s.trim());
                  handleArrayChange('skills', skills);
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
            title={<span><SolutionOutlined /> Internships</span>}
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
                      <h4>{internship.position} at {internship.company}</h4>
                      <Tag color={internship.status === 'current' ? 'green' : 'blue'}>
                        {internship.status === 'current' ? 'Current' : 'Completed'}
                      </Tag>
                    </div>
                  }
                  extra={
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveInternship(internship.id)}
                    />
                  }
                >
                  <div className="internship-edit-form">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Company">
                          <Input
                            value={internship.company}
                            onChange={(e) => handleInternshipChange(internship.id, 'company', e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Position">
                          <Input
                            value={internship.position}
                            onChange={(e) => handleInternshipChange(internship.id, 'position', e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Duration">
                          <Input
                            value={internship.duration}
                            onChange={(e) => handleInternshipChange(internship.id, 'duration', e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Status">
                          <Select
                            value={internship.status}
                            onChange={(value) => handleInternshipChange(internship.id, 'status', value)}
                            style={{ width: '100%' }}
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
                        onChange={(e) => handleInternshipChange(internship.id, 'location', e.target.value)}
                        prefix={<EnvironmentOutlined />}
                      />
                    </Form.Item>

                    <Form.Item label="Skills Gained (comma separated)">
                      <Input
                        value={internship.skillsGained.join(', ')}
                        onChange={(e) => {
                          const skills = e.target.value.split(',').map(s => s.trim());
                          handleInternshipChange(internship.id, 'skillsGained', skills);
                        }}
                      />
                    </Form.Item>

                    <Form.Item label="Supervisor Contact">
                      <Input
                        value={internship.supervisorContact}
                        onChange={(e) => handleInternshipChange(internship.id, 'supervisorContact', e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Checkbox
                        checked={internship.recommendationLetter}
                        onChange={(e) => handleInternshipChange(internship.id, 'recommendationLetter', e.target.checked)}
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
                              const newResponsibilities = [...internship.responsibilities];
                              newResponsibilities[idx] = e.target.value;
                              handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
                            }}
                          />
                          {idx === internship.responsibilities.length - 1 && (
                            <Button
                              type="dashed"
                              onClick={() => {
                                const newResponsibilities = [...internship.responsibilities, ''];
                                handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
                              }}
                              icon={<PlusOutlined />}
                            />
                          )}
                          {internship.responsibilities.length > 1 && (
                            <Button
                              danger
                              onClick={() => {
                                const newResponsibilities = internship.responsibilities.filter((_, i) => i !== idx);
                                handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
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
            title={<span><TeamOutlined /> Part-Time Jobs</span>}
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
                      <h4>{job.position} at {job.company}</h4>
                    </div>
                  }
                  extra={
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemovePartTimeJob(job.id)}
                    />
                  }
                >
                  <div className="job-edit-form">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Company">
                          <Input
                            value={job.company}
                            onChange={(e) => handlePartTimeJobChange(job.id, 'company', e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Position">
                          <Input
                            value={job.position}
                            onChange={(e) => handlePartTimeJobChange(job.id, 'position', e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Duration">
                      <Input
                        value={job.duration}
                        onChange={(e) => handlePartTimeJobChange(job.id, 'duration', e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Responsibilities">
                      {job.responsibilities.map((resp, idx) => (
                        <div key={idx} className="responsibility-item">
                          <Input
                            value={resp}
                            onChange={(e) => {
                              const newResponsibilities = [...job.responsibilities];
                              newResponsibilities[idx] = e.target.value;
                              handlePartTimeJobChange(job.id, 'responsibilities', newResponsibilities);
                            }}
                          />
                          {idx === job.responsibilities.length - 1 && (
                            <Button
                              type="dashed"
                              onClick={() => {
                                const newResponsibilities = [...job.responsibilities, ''];
                                handlePartTimeJobChange(job.id, 'responsibilities', newResponsibilities);
                              }}
                              icon={<PlusOutlined />}
                            />
                          )}
                          {job.responsibilities.length > 1 && (
                            <Button
                              danger
                              onClick={() => {
                                const newResponsibilities = job.responsibilities.filter((_, i) => i !== idx);
                                handlePartTimeJobChange(job.id, 'responsibilities', newResponsibilities);
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
            title={<span><TrophyOutlined /> College Activities</span>}
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
                      <h4>{activity.role} at {activity.organization}</h4>
                    </div>
                  }
                  extra={
                    <Button 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveActivity(activity.id)}
                    />
                  }
                >
                  <div className="activity-edit-form">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Organization">
                          <Input
                            value={activity.organization}
                            onChange={(e) => handleActivityChange(activity.id, 'organization', e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Role">
                          <Input
                            value={activity.role}
                            onChange={(e) => handleActivityChange(activity.id, 'role', e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Duration">
                      <Input
                        value={activity.duration}
                        onChange={(e) => handleActivityChange(activity.id, 'duration', e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Description">
                      <TextArea
                        rows={3}
                        value={activity.description}
                        onChange={(e) => handleActivityChange(activity.id, 'description', e.target.value)}
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
            <Button type="primary" htmlType="submit">Save Changes</Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </div>
        </Form>
      ) : (
        <div className="profile-view">
          {/* View Mode - Basic Information */}
          <Card title={<span><UserOutlined /> Basic Information</span>} className="profile-section">
            <Descriptions column={2}>
              <Descriptions.Item label="Name">{formData.firstName} {formData.lastName}</Descriptions.Item>
              <Descriptions.Item label="Email">{formData.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{formData.phone}</Descriptions.Item>
              <Descriptions.Item label="Bio">{formData.bio}</Descriptions.Item>
            </Descriptions>
          </Card>

          {/* View Mode - Academic Information */}
          <Card title={<span><BookOutlined /> Academic Information</span>} className="profile-section">
            <Descriptions column={2}>
              <Descriptions.Item label="Major">{formData.major}</Descriptions.Item>
              <Descriptions.Item label="Current Semester">Semester {formData.semester}</Descriptions.Item>
              <Descriptions.Item label="Graduation Year">{formData.graduationYear}</Descriptions.Item>
              <Descriptions.Item label="GPA">{formData.gpa}</Descriptions.Item>
            </Descriptions>
          </Card>

          {/* View Mode - Job Interests */}
          <Card title={<span><SolutionOutlined /> Job Interests</span>} className="profile-section">
            <div className="tags-container">
              {formData.jobInterests.map((interest, index) => (
                <Tag key={index} color="blue">{interest}</Tag>
              ))}
            </div>
          </Card>

          {/* View Mode - Skills */}
          <Card title={<span><TrophyOutlined /> Skills</span>} className="profile-section">
            <div className="tags-container">
              {formData.skills.map((skill, index) => (
                <Tag key={index} color="green">{skill}</Tag>
              ))}
            </div>
          </Card>

          {/* View Mode - Internships */}
          <Card title={<span><SolutionOutlined /> Internships</span>} className="profile-section">
            {formData.internships.length > 0 ? (
              formData.internships.map((internship, index) => (
                <Card 
                  key={index} 
                  className={`internship-card ${internship.status}`}
                  title={
                    <div className="internship-header">
                      <h4>{internship.position} at {internship.company}</h4>
                      <Tag color={internship.status === 'current' ? 'green' : 'blue'}>
                        {internship.status === 'current' ? 'Current' : 'Completed'}
                      </Tag>
                    </div>
                  }
                >
                  <div className="internship-view">
                    <div className="internship-meta">
                      <p><CalendarOutlined /> {internship.duration}</p>
                      <p><EnvironmentOutlined /> {internship.location}</p>
                      {internship.recommendationLetter && (
                        <p><StarOutlined /> Recommendation letter available</p>
                      )}
                    </div>

                    <Divider orientation="left">Skills Gained</Divider>
                    <div className="skills-container">
                      {internship.skillsGained.map((skill, idx) => (
                        <Tag key={idx} color="geekblue">{skill}</Tag>
                      ))}
                    </div>

                    <Divider orientation="left">Responsibilities</Divider>
                    <List
                      dataSource={internship.responsibilities}
                      renderItem={item => <List.Item>{item}</List.Item>}
                    />

                    {internship.supervisorContact && (
                      <>
                        <Divider orientation="left">Supervisor Contact</Divider>
                        <p><MailOutlined /> {internship.supervisorContact}</p>
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
          <Card title={<span><TeamOutlined /> Part-Time Jobs</span>} className="profile-section">
            {formData.partTimeJobs.length > 0 ? (
              formData.partTimeJobs.map((job, index) => (
                <Card 
                  key={index} 
                  className="job-card"
                  title={
                    <div className="job-header">
                      <h4>{job.position} at {job.company}</h4>
                    </div>
                  }
                >
                  <div className="job-view">
                    <div className="job-meta">
                      <p><CalendarOutlined /> {job.duration}</p>
                    </div>

                    <Divider orientation="left">Responsibilities</Divider>
                    <List
                      dataSource={job.responsibilities}
                      renderItem={item => <List.Item>{item}</List.Item>}
                    />
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
          <Card title={<span><TrophyOutlined /> College Activities</span>} className="profile-section">
            {formData.activities.length > 0 ? (
              formData.activities.map((activity, index) => (
                <Card 
                  key={index} 
                  className="activity-card"
                  title={
                    <div className="activity-header">
                      <h4>{activity.role} at {activity.organization}</h4>
                    </div>
                  }
                >
                  <div className="activity-view">
                    <div className="activity-meta">
                      <p><CalendarOutlined /> {activity.duration}</p>
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
  );
};


// ==================== Dashboard Component ====================

const DashboardContent = () => {
  const stats = [
    { title: 'Available Internships', value: 142, icon: <FileSearchOutlined /> },
    { title: 'Active Applications', value: 4, icon: <ClockCircleOutlined /> },
    { title: 'Completed Internships', value: 2, icon: <CheckCircleOutlined /> },
    { title: 'Profile Completion', value: 75, icon: <UserOutlined /> }
  ];

  const [suggestedCompanies, setSuggestedCompanies] = useState([
    {
      id: 1,
      name: 'Google',
      industry: 'Technology',
      matchScore: 92,
      why: 'Matches your skills in React and Node.js, and your interest in large-scale systems',
      saved: false,
      viewed: false
    },
    {
      id: 2,
      name: 'Airbnb',
      industry: 'Travel/Tech',
      matchScore: 88,
      why: 'Strong UX focus aligns with your design coursework',
      saved: false,
      viewed: false
    },
    {
      id: 3,
      name: 'Spotify',
      industry: 'Music/Tech',
      matchScore: 85,
      why: 'Recommended by 3 past interns with similar profiles',
      saved: false,
      viewed: false
    }
  ]);

  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'internship_cycle',
      title: 'New Internship Cycle Starting Soon',
      message: 'The Fall 2023 internship cycle begins in 2 weeks. Get ready to apply!',
      date: '2023-08-15',
      read: false
    },
    {
      id: 2,
      type: 'report_status',
      title: 'Internship Report Status Updated',
      message: 'Your report for "Web Developer Intern" has been approved by your supervisor.',
      date: '2023-08-10',
      read: false
    }
  ]);

  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [profileCompletionModalVisible, setProfileCompletionModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('suggestions');

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const toggleSaveCompany = (id) => {
    setSuggestedCompanies(suggestedCompanies.map(company => 
      company.id === id ? {...company, saved: !company.saved} : company
    ));
  };

  const markAsViewed = (id) => {
    setSuggestedCompanies(suggestedCompanies.map(company => 
      company.id === id ? {...company, viewed: true} : company
    ));
  };

  const refreshSuggestions = () => {
    // In a real app, this would fetch new suggestions from an API
    // For now, we'll just shuffle the existing ones
    setSuggestedCompanies([...suggestedCompanies].sort(() => 0.5 - Math.random()));
  };

  return (
    <div className="student-dashboard">
      <h1>Welcome, Student</h1>
      <p className="subtitle">Here's an overview of your internship journey</p>

      {/* Notifications Section */}
      <Card 
        title="Notifications" 
        className="section-card"
        extra={<Button type="text" icon={<BellOutlined />} />}
      >
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={notification => (
            <List.Item 
              className={notification.read ? 'notification-read' : 'notification-unread'}
              onClick={() => markAsRead(notification.id)}
              actions={[
                <Button type="text" icon={<CloseOutlined />} onClick={(e) => {
                  e.stopPropagation();
                  setNotifications(notifications.filter(n => n.id !== notification.id));
                }} />
              ]}
            >
              <List.Item.Meta
                avatar={<BellOutlined />}
                title={notification.title}
                description={
                  <>
                    <p>{notification.message}</p>
                    <small>{notification.date}</small>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Row gutter={16} className="stats-grid">
        {stats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={6}>
            <Card 
              className="stat-card"
              hoverable
              onClick={() => {
                if (stat.title === 'Profile Completion') {
                  setProfileCompletionModalVisible(true);
                }
              }}
            >
              <div className="stat-content">
                <div className="stat-icon">{stat.icon}</div>
                <div>
                  <h3>{stat.title}</h3>
                  {stat.title === 'Profile Completion' ? (
                    <>
                      <Progress percent={stat.value} status="active" />
                      <p>Complete your profile for better matches</p>
                    </>
                  ) : (
                    <p className="stat-value">{stat.value}</p>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Enhanced Suggested Companies Section */}
      <Card 
        title="Career Opportunities" 
        className="section-card"
        extra={
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Suggested Companies" key="suggestions" />
            <TabPane tab="Saved Companies" key="saved" />
          </Tabs>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Button 
            icon={<SyncOutlined />} 
            onClick={refreshSuggestions}
            style={{ marginRight: 8 }}
          >
            Refresh Suggestions
          </Button>
          <Input.Search 
            placeholder="Filter companies..." 
            allowClear 
            style={{ width: 300 }}
          />
        </div>

        <Table
          dataSource={activeTab === 'suggestions' 
            ? suggestedCompanies 
            : suggestedCompanies.filter(c => c.saved)
          }
          rowKey="id"
          columns={[
            {
              title: 'Company',
              dataIndex: 'name',
              key: 'name',
              render: (text, record) => (
                <div onClick={() => markAsViewed(record.id)}>
                  <strong>{text}</strong>
                  {record.viewed || <Badge dot />}
                </div>
              )
            },
            {
              title: 'Industry',
              dataIndex: 'industry',
              key: 'industry',
              filters: [
                { text: 'Technology', value: 'Technology' },
                { text: 'Travel/Tech', value: 'Travel/Tech' },
                { text: 'Music/Tech', value: 'Music/Tech' },
              ],
              onFilter: (value, record) => record.industry.includes(value),
            },
            {
              title: 'Match Score',
              dataIndex: 'matchScore',
              key: 'matchScore',
              sorter: (a, b) => a.matchScore - b.matchScore,
              render: (score) => (
                <Tooltip title={`Match score: ${score}%`}>
                  <Progress 
                    percent={score} 
                    status={score > 90 ? 'success' : score > 80 ? 'active' : 'normal'} 
                    format={() => `${score}%`}
                  />
                </Tooltip>
              )
            },
            {
              title: 'Why Recommended',
              dataIndex: 'why',
              key: 'why',
              render: (text) => <Text ellipsis={{ tooltip: text }}>{text}</Text>
            },
            {
              title: 'Action',
              key: 'action',
              render: (_, record) => (
                <Space>
                  <Button 
                    type="primary" 
                    onClick={() => markAsViewed(record.id)}
                  >
                    View Openings
                  </Button>
                  <Button 
                    icon={record.saved ? <StarFilled /> : <StarOutlined />} 
                    onClick={() => toggleSaveCompany(record.id)}
                  >
                    {record.saved ? 'Saved' : 'Save'}
                  </Button>
                </Space>
              )
            }
          ]}
          pagination={{ pageSize: 5 }}
          rowClassName={(record) => record.viewed ? '' : 'unviewed-row'}
        />
      </Card>

          <Card title="Complete Your Profile" className="section-card profile-completion">
        <p>Improve your chances of getting matched with the right internship.</p>
        <div className="profile-tasks">
          <Checkbox>Add job interests</Checkbox>
          <Checkbox>Add your skills</Checkbox>
          <Checkbox>Upload your resume</Checkbox>
        </div>
        <Button 
          type="primary"
          onClick={() => setProfileCompletionModalVisible(true)}
        >
          Complete Profile
        </Button>
        
        <Divider />
        <div className="video-guide-section">
          <h3>Not sure what internships count for your major?</h3>
          <p>Watch this short guide to understand the requirements:</p>
          <Button 
            type="primary" 
            icon={<PlayCircleOutlined />}
            onClick={() => setVideoModalVisible(true)}
          >
            Watch Video Guide
          </Button>
        </div>
      </Card>

      {/* Video Modal */}
      <Modal
        title="Internship Requirements Guide"
        visible={videoModalVisible}
        onCancel={() => setVideoModalVisible(false)}
        footer={null}
        width={800}
      >
        <div className="video-container">
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
        <div className="video-description">
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
  );
};


// ==================== Internship Component ====================
const InternshipContent = () => {
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      title: 'Frontend Developer Intern',
      duration: '3 months',
      industry: 'Technology',
      isPaid: true,
      salary: '$20/hr',
      skills: ['React', 'JavaScript', 'HTML/CSS'],
      description: 'Work on building responsive user interfaces using React. Collaborate with design team to implement UI components.',
    
      postedDate: '2023-10-15'
    },
    {
      id: 2,
      company: 'Data Analytics Co.',
      title: 'Data Science Intern',
      duration: '6 months',
      industry: 'Data Science',
      isPaid: true,
      salary: '$22/hr',
      skills: ['Python', 'Pandas', 'SQL', 'Machine Learning'],
      description: 'Analyze large datasets and build predictive models. Work with data engineering team to clean and process data.',
      
      postedDate: '2023-10-10'
    },
    {
      id: 3,
      company: 'Creative Designs',
      title: 'UI/UX Design Intern',
      duration: '4 months',
      industry: 'Design',
      isPaid: false,
      salary: 'Unpaid',
      skills: ['Figma', 'User Research', 'Prototyping'],
      description: 'Create wireframes and prototypes for client projects. Conduct user research and usability testing.',
      
      postedDate: '2023-10-05'
    },
    {
      id: 4,
      company: 'Global Finance',
      title: 'Financial Analyst Intern',
      duration: '3 months',
      industry: 'Finance',
      isPaid: true,
      salary: '$18/hr',
      skills: ['Excel', 'Financial Modeling', 'Data Analysis'],
      description: 'Assist with financial reporting and analysis. Prepare presentations for senior management.',
      
      postedDate: '2023-09-20'
    },
  ]);

  const [filteredInternships, setFilteredInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    industry: null,
    duration: null,
    isPaid: null
  });
  const [uploading, setUploading] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationStep, setApplicationStep] = useState(0);
  const [form] = Form.useForm();
  const [applicationFormVisible, setApplicationFormVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    setFilteredInternships(internships);
  }, [internships]);

  useEffect(() => {
    let result = [...internships];
    
    if (searchText) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.company.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (filters.industry) {
      result = result.filter(item => item.industry === filters.industry);
    }
    
    if (filters.duration) {
      result = result.filter(item => item.duration === filters.duration);
    }
    
    if (filters.isPaid !== null) {
      result = result.filter(item => item.isPaid === filters.isPaid);
    }
    
    
    setFilteredInternships(result);
  }, [searchText, filters, internships]);

  const industries = [...new Set(internships.map(item => item.industry))];
  const durations = [...new Set(internships.map(item => item.duration))];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      industry: null,
      duration: null,
      isPaid: null,
      
    });
    setSearchText('');
  };

  const showInternshipDetails = (internship) => {
    setSelectedInternship(internship);
    setIsModalVisible(true);
  };

  const handleApply = () => {
    setApplicationFormVisible(true);
    setApplicationStep(0);
    form.resetFields();
    setUploadedFiles([]);
  };

  const handleNext = () => {
    // Special validation for documents step
    if (applicationStep === 1 && uploadedFiles.length === 0) {
      message.error('Please upload at least one document');
      return;
    }

    form.validateFields()
      .then(() => {
        setApplicationStep(applicationStep + 1);
      })
      .catch(err => {
        message.error('Please complete all required fields');
      });
  };

  const submitApplication = async (values) => {
    const formData = new FormData();
    
    // Append form values
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Append files
    uploadedFiles.forEach(file => {
      formData.append('documents', file);
    });
    
    try {
      setUploading(true);
      // Here you would typically send to your backend:
      // await axios.post('/api/applications', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success('Application submitted successfully!');
      setApplicationFormVisible(false);
      setIsModalVisible(false);
      setApplicationSubmitted(true);
    } catch (error) {
      message.error('Application failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
      const isDOC = file.type === 'application/msword' || 
                   file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isLt5M = file.size / 1024 / 1024 < 5;
      
      if (!isPDF && !isDOC) {
        message.error('You can only upload PDF or Word documents!');
        return Upload.LIST_IGNORE;
      }
      
      if (!isLt5M) {
        message.error('File must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      
      setUploadedFiles(prev => [...prev, file]);
      return false;
    },
    onRemove: (file) => {
      setUploadedFiles(prev => prev.filter(f => f.uid !== file.uid));
    },
    fileList: uploadedFiles,
    multiple: true,
    maxCount: 5,
    accept: '.pdf,.doc,.docx'
  };

  const steps = [
    {
      title: 'Personal Information',
      icon: <UserOutlined />,
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="john.doe@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="+1 (123) 456-7890" />
          </Form.Item>

          <Form.Item
            name="education"
            label="Current Education"
            rules={[{ required: true, message: 'Please enter your education level' }]}
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
      )
    },
    {
      title: 'Documents',
      icon: <FileDoneOutlined />,
      content: (
        <>
          <Text strong>Upload supporting documents:</Text>
          <div style={{ margin: '16px 0' }}>
            <Alert
              message="Required Documents"
              description="Please upload your CV/resume and any other supporting documents"
              type="info"
              showIcon
            />
          </div>

          <Upload.Dragger {...uploadProps} style={{ padding: '20px' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to upload</p>
            <p className="ant-upload-hint">
              Supports PDF, DOC, DOCX (Max 5 files, 5MB each)
            </p>
          </Upload.Dragger>

          {uploadedFiles.length === 0 && (
            <Alert
              message="No documents uploaded"
              type="warning"
              showIcon
              style={{ marginTop: 16 }}
            />
          )}

          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <Text strong>Files to be submitted:</Text>
              <List
                size="small"
                dataSource={uploadedFiles}
                renderItem={file => (
                  <List.Item>
                    <FileTextOutlined style={{ marginRight: 8 }} />
                    {file.name} - {(file.size / 1024).toFixed(2)} KB
                  </List.Item>
                )}
              />
            </div>
          )}
        </>
      )
    },
    {
      title: 'Additional Information',
      icon: <SolutionOutlined />,
      content: (
        <>
          <Form.Item
            name="coverLetter"
            label="Cover Letter"
            rules={[{ required: true, message: 'Please write a cover letter' }]}
          >
            <TextArea
              rows={6}
              placeholder="Explain why you're a good fit for this internship..."
            />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Availability (Hours/Week)"
            rules={[{ required: true, message: 'Please enter your availability' }]}
          >
            <InputNumber min={10} max={40} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Available Start Date"
            rules={[{ required: true, message: 'Please select a start date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </>
      )
    }
  ];

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      filters: industries.map(industry => ({ text: industry, value: industry })),
      onFilter: (value, record) => record.industry === value,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration.localeCompare(b.duration),
    },
    {
      title: 'Compensation',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid, record) => (
        <Tag color={isPaid ? 'green' : 'orange'} icon={isPaid ? <DollarOutlined /> : null}>
          {isPaid ? `Paid (${record.salary})` : 'Unpaid'}
        </Tag>
      ),
      filters: [
        { text: 'Paid', value: true },
        { text: 'Unpaid', value: false },
      ],
      onFilter: (value, record) => record.isPaid === value,
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          onClick={() => showInternshipDetails(record)}
          icon={<FileTextOutlined />}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="internship-content">
      <Card title="Available Internships" className="internship-card">
        <div className="internship-toolbar">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Search
                placeholder="Search by job title or company"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
              />
            </Col>
            <Col xs={24} sm={12} md={16} lg={18}>
              <div className="filter-section">
                <span className="filter-label"><FilterOutlined /> Filters:</span>
                <Select
                  placeholder="Industry"
                  style={{ width: 120 }}
                  allowClear
                  onChange={value => handleFilterChange('industry', value)}
                  value={filters.industry}
                >
                  {industries.map(industry => (
                    <Option key={industry} value={industry}>{industry}</Option>
                  ))}
                </Select>
                <Select
                  placeholder="Duration"
                  style={{ width: 120 }}
                  allowClear
                  onChange={value => handleFilterChange('duration', value)}
                  value={filters.duration}
                >
                  {durations.map(duration => (
                    <Option key={duration} value={duration}>{duration}</Option>
                  ))}
                </Select>
                <Select
                  placeholder="Paid/Unpaid"
                  style={{ width: 120 }}
                  allowClear
                  onChange={value => handleFilterChange('isPaid', value)}
                  value={filters.isPaid}
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Unpaid</Option>
              
                  <Option value="current">Current</Option>
                  <Option value="completed">Completed</Option>
                </Select>
                <Button type="link" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Divider />

        <Table
          columns={columns}
          dataSource={filteredInternships}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Card>

      {/* Internship Details Modal */}
      <Modal
        title="Internship Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="apply" 
            type="primary" 
            onClick={handleApply}
            icon={<SolutionOutlined />}
          >
            Apply Now
          </Button>,
        ]}
        width={800}
      >
        {selectedInternship && (
          <div className="internship-details">
            <h2>{selectedInternship.title}</h2>
            <h3>{selectedInternship.company}</h3>
            
            <div className="details-section">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Industry:</strong> {selectedInternship.industry}</p>
                  <p><strong>Duration:</strong> {selectedInternship.duration}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Compensation:</strong> 
                    {selectedInternship.isPaid ? (
                      <Tag color="green">{selectedInternship.salary}</Tag>
                    ) : (
                      <Tag color="orange">Unpaid</Tag>
                    )}
                  </p>
                  <p><strong>Posted Date:</strong> {selectedInternship.postedDate}</p>
                </Col>
              </Row>
            </div>

            <Divider />

            <div className="description-section">
              <h4>Job Description</h4>
              <p>{selectedInternship.description}</p>
            </div>

            <div className="skills-section">
              <h4>Required Skills</h4>
              <div className="skills-list">
                {selectedInternship.skills.map((skill, index) => (
                  <Tag key={index} color="blue">{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Application Form Modal */}
      <Modal
        title={`Application for ${selectedInternship?.title || 'Internship'}`}
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
            <Button 
              key="submit" 
              type="primary" 
              loading={uploading}
              onClick={() => form.submit()}
            >
              Submit Application
            </Button>
          )
        ]}
        width={800}
        destroyOnClose
      >
        <Steps current={applicationStep} style={{ marginBottom: 24 }}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={submitApplication}
        >
          <div style={{ minHeight: '300px' }}>
            {steps[applicationStep].content}
          </div>
        </Form>
      </Modal>
    </div>
  );
};


const Applications = () => {
  // Sample data - replace with your actual API data
  const [applications, setApplications] = useState([
    {
      id: 1,
      internshipTitle: 'Frontend Developer Intern',
      company: 'Tech Solutions Inc.',
      appliedDate: '2023-10-15',
      status: 'pending',
      decisionDate: null,
      notes: 'Application under review'
    },
    {
      id: 2,
      internshipTitle: 'Data Science Intern',
      company: 'Data Analytics Co.',
      appliedDate: '2023-10-10',
      status: 'accepted',
      decisionDate: '2023-10-25',
      notes: 'Congratulations! Start date: Nov 15'
    },
    {
      id: 3,
      internshipTitle: 'UI/UX Design Intern',
      company: 'Creative Designs',
      appliedDate: '2023-10-05',
      status: 'rejected',
      decisionDate: '2023-10-20',
      notes: 'Position filled'
    },
    {
      id: 4,
      internshipTitle: 'Financial Analyst Intern',
      company: 'Global Finance',
      appliedDate: '2023-09-20',
      status: 'finalized',
      decisionDate: '2023-10-01',
      notes: 'Application processed'
    },
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const statusColors = {
    pending: 'processing',
    accepted: 'success',
    rejected: 'error',
    finalized: 'default'
  };

  const statusIcons = {
    pending: <ClockCircleOutlined />,
    accepted: <CheckCircleOutlined />,
    rejected: <CloseCircleOutlined />,
    finalized: <FileTextOutlined />
  };

  const columns = [
    {
      title: 'Internship',
      dataIndex: 'internshipTitle',
      key: 'internshipTitle',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ color: '#666', fontSize: 12 }}>{record.company}</div>
        </div>
      ),
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag icon={statusIcons[status]} color={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Accepted', value: 'accepted' },
        { text: 'Rejected', value: 'rejected' },
        { text: 'Finalized', value: 'finalized' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Decision Date',
      dataIndex: 'decisionDate',
      key: 'decisionDate',
      render: (date) => date || 'N/A',
      responsive: ['lg'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedApplication(record);
            setIsModalVisible(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="My Applications"
      bordered={false}
      style={{ marginBottom: 24 }}
      headStyle={{ borderBottom: 0 }}
    >
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />

      <Modal
        title="Application Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={
          <Button type="primary" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        }
        width={700}
      >
        {selectedApplication && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Internship">
              {selectedApplication.internshipTitle}
            </Descriptions.Item>
            <Descriptions.Item label="Company">
              {selectedApplication.company}
            </Descriptions.Item>
            <Descriptions.Item label="Applied Date">
              {selectedApplication.appliedDate}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={statusColors[selectedApplication.status]}
                text={
                  <span style={{ textTransform: 'capitalize' }}>
                    {selectedApplication.status}
                  </span>
                }
              />
            </Descriptions.Item>
            {selectedApplication.decisionDate && (
              <Descriptions.Item label="Decision Date">
                {selectedApplication.decisionDate}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Notes">
              {selectedApplication.notes}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Card>
  );
};


const Reports = () => {
  // State for courses in the major
  const [coursesInMajor, setCoursesInMajor] = useState([
    { id: 1, code: 'CS101', name: 'Introduction to Programming', selected: false },
    { id: 2, code: 'CS201', name: 'Data Structures', selected: false },
    { id: 3, code: 'CS301', name: 'Algorithms', selected: false },
    { id: 4, code: 'CS401', name: 'Database Systems', selected: false },
    { id: 5, code: 'CS402', name: 'Web Development', selected: false },
    { id: 6, code: 'CS403', name: 'Software Engineering', selected: false },
  ]);

  const [internships, setInternships] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      title: 'Frontend Developer Intern',
      completedDate: '2023-08-15',
      status: 'completed',
      hasEvaluation: true,
      hasReport: true,
      position: 'Frontend Developer',
      duration: 'June 2022 - August 2022',
      responsibilities: ['Developed React components', 'Participated in code reviews'],
      skillsGained: ['React', 'TypeScript', 'Redux'],
      reportStatus: 'approved',
      reportComments: '',
      startDate: '2022-06-01',
      endDate: '2022-08-15',
      relevantCourses: []
    },
    {
      id: 2,
      company: 'Data Analytics Co.',
      title: 'Data Science Intern',
      completedDate: '2023-12-20',
      status: 'completed',
      hasEvaluation: false,
      hasReport: false,
      position: 'Data Science Intern',
      duration: 'September 2022 - December 2022',
      responsibilities: ['Analyzed datasets', 'Built predictive models'],
      skillsGained: ['Python', 'Pandas', 'Machine Learning'],
      reportStatus: 'flagged',
      reportComments: 'Please provide more details about your modeling approach',
      startDate: '2022-09-01',
      endDate: '2022-12-20',
      relevantCourses: []
    },
    {
      id: 3,
      company: 'Cloud Services Ltd.',
      title: 'DevOps Intern',
      completedDate: null,
      status: 'current',
      hasEvaluation: false,
      hasReport: false,
      position: 'DevOps Intern',
      duration: 'January 2023 - Present',
      responsibilities: ['Assisted with CI/CD pipelines', 'Cloud infrastructure monitoring'],
      skillsGained: ['AWS', 'Docker', 'Kubernetes'],
      reportStatus: null,
      reportComments: '',
      startDate: '2023-01-10',
      endDate: null,
      relevantCourses: []
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Summer Internship Technical Report',
      internshipId: 1,
      introduction: 'This report documents my summer internship experience...',
      body: 'Detailed description of my work and learnings...',
      isFinalized: false,
      createdAt: '2023-08-20',
      status: 'approved',
      relevantCourses: [1, 2, 4]
    },
    {
      id: 2,
      title: 'Data Science Internship Preliminary Report',
      internshipId: 2,
      introduction: 'Initial report on my data science internship...',
      body: 'First month focused on data cleaning and analysis...',
      isFinalized: false,
      createdAt: '2023-10-15',
      status: 'flagged',
      adminComments: 'Please provide more details about your modeling approach',
      relevantCourses: [2, 3, 5]
    }
  ]);

  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      internshipId: 1,
      company: 'Tech Solutions Inc.',
      wouldRecommend: true,
      rating: 4,
      comments: 'Excellent learning environment with knowledgeable mentors.',
      isFinalized: false,
      createdAt: '2023-08-25'
    }
  ]);

  const [selectedInternship, setSelectedInternship] = useState(internships[0]);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
  const [appealModalVisible, setAppealModalVisible] = useState(false);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [reportForm] = Form.useForm();
  const [evaluationForm] = Form.useForm();
  const [appealForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Initialize selected courses when report is loaded
  useEffect(() => {
    if (currentReport) {
      const selected = coursesInMajor.map(course => ({
        ...course,
        selected: currentReport.relevantCourses.includes(course.id)
      }));
      setCoursesInMajor(selected);
      setSelectedCourses(selected.filter(c => c.selected));
    } else {
      setCoursesInMajor(coursesInMajor.map(c => ({ ...c, selected: false })));
      setSelectedCourses([]);
    }
  }, [currentReport]);

  // Filter internships based on search, status, and date range
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.company.toLowerCase().includes(searchText.toLowerCase()) || 
                         internship.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'current' && internship.status === 'current') ||
                         (statusFilter === 'completed' && internship.status === 'completed');
    const matchesDate = !dateRange || 
                       (internship.startDate >= dateRange[0] && 
                        (!internship.endDate || internship.endDate <= dateRange[1]));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Toggle course selection
  const toggleCourseSelection = (courseId) => {
    setCoursesInMajor(coursesInMajor.map(course => 
      course.id === courseId ? { ...course, selected: !course.selected } : course
    ));
  };

  // Save selected courses to report
  const saveSelectedCourses = () => {
    const selected = coursesInMajor.filter(course => course.selected);
    setSelectedCourses(selected);
    setCourseModalVisible(false);
    message.success('Selected courses saved');
  };

  const handleCreateReport = () => {
    reportForm.resetFields();
    setCurrentReport(null);
    setSelectedCourses([]);
    setReportModalVisible(true);
  };

  const handleEditReport = (report) => {
    setCurrentReport(report);
    reportForm.setFieldsValue(report);
    setReportModalVisible(true);
  };

  const handleDeleteReport = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setReports(reports.filter(report => report.id !== id));
      message.success('Report deleted successfully');
    } catch (error) {
      message.error('Error deleting report');
    }
  };

  const handleSubmitReport = async () => {
    try {
      const values = await reportForm.validateFields();
      const courseIds = selectedCourses.map(c => c.id);
      
      if (currentReport) {
        const updatedReport = {
          ...currentReport,
          ...values,
          relevantCourses: courseIds
        };
        await new Promise(resolve => setTimeout(resolve, 500));
        setReports(reports.map(r => r.id === currentReport.id ? updatedReport : r));
        message.success('Report updated successfully');
      } else {
        const newReport = {
          id: Date.now(),
          ...values,
          internshipId: selectedInternship.id,
          isFinalized: false,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'pending',
          relevantCourses: courseIds
        };
        setReports([...reports, newReport]);
        message.success('Report created successfully');
      }
      
      setReportModalVisible(false);
    } catch (error) {
      message.error('Error submitting report');
    }
  };

  const handleCreateEvaluation = () => {
    evaluationForm.resetFields();
    setCurrentEvaluation(null);
    setEvaluationModalVisible(true);
  };

  const handleEditEvaluation = (evaluation) => {
    setCurrentEvaluation(evaluation);
    evaluationForm.setFieldsValue(evaluation);
    setEvaluationModalVisible(true);
  };

  const handleDeleteEvaluation = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvaluations(evaluations.filter(evaluation => evaluation.id !== id));
      message.success('Evaluation deleted successfully');
    } catch (error) {
      message.error('Error deleting evaluation');
    }
  };

  const handleSubmitEvaluation = async () => {
    try {
      const values = await evaluationForm.validateFields();
      
      if (currentEvaluation) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setEvaluations(evaluations.map(e => e.id === currentEvaluation.id ? {...e, ...values} : e));
        message.success('Evaluation updated successfully');
      } else {
        const newEvaluation = {
          id: Date.now(),
          ...values,
          internshipId: selectedInternship.id,
          company: selectedInternship.company,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setEvaluations([...evaluations, newEvaluation]);
        message.success('Evaluation created successfully');
      }
      
      setEvaluationModalVisible(false);
    } catch (error) {
      message.error('Error submitting evaluation');
    }
  };

  const handleDownloadReport = (id) => {
    message.success('Downloading report as PDF...');
    // In a real implementation, this would generate and download a PDF
  };

  const handleFinalizeReport = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setReports(reports.map(r => r.id === id ? {...r, isFinalized: true} : r));
      message.success('Report finalized successfully');
    } catch (error) {
      message.error('Error finalizing report');
    }
  };

  const handleFinalizeEvaluation = async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvaluations(evaluations.map(e => e.id === id ? {...e, isFinalized: true} : e));
      message.success('Evaluation finalized successfully');
    } catch (error) {
      message.error('Error finalizing evaluation');
    }
  };

  const handleAppealReport = (report) => {
    setCurrentReport(report);
    appealForm.resetFields();
    setAppealModalVisible(true);
  };

  const handleSubmitAppeal = async () => {
    try {
      const values = await appealForm.validateFields();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReports(reports.map(r => 
        r.id === currentReport.id ? {...r, appealMessage: values.message, status: 'appealed'} : r
      ));
      
      message.success('Appeal submitted successfully');
      setAppealModalVisible(false);
    } catch (error) {
      message.error('Error submitting appeal');
    }
  };

  // Enhanced expanded row content with courses
  const expandedRowRender = (record) => {
    const report = reports.find(r => r.internshipId === record.id);
    const evaluation = evaluations.find(e => e.internshipId === record.id);
    const relevantCourses = report?.relevantCourses?.map(id => 
      coursesInMajor.find(c => c.id === id)
    ).filter(Boolean);

    return (
      <div className="expanded-content">
        <Collapse defaultActiveKey={['responsibilities', 'skills']}>
          <Panel header="Responsibilities" key="responsibilities">
            <ul>
              {record.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Panel>
          
          <Panel header="Skills Gained" key="skills">
            <div className="skills-tags">
              {record.skillsGained.map(skill => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Panel>

          {report && (
            <Panel header="Report Details" key="report">
              <p><strong>Title:</strong> {report.title}</p>
              <p><strong>Status:</strong> 
                <Tag color={
                  report.status === 'approved' ? 'green' : 
                  report.status === 'flagged' ? 'orange' : 
                  report.status === 'rejected' ? 'red' : 'blue'
                }>
                  {report.status?.toUpperCase() || 'DRAFT'}
                </Tag>
              </p>
              
              {report.adminComments && (
                <>
                  <p><strong>Supervisor Comments:</strong></p>
                  <Alert message={report.adminComments} type="warning" showIcon />
                </>
              )}

              {relevantCourses?.length > 0 && (
                <>
                  <Divider />
                  <p><strong>Relevant Courses That Helped:</strong></p>
                  <List
                    size="small"
                    dataSource={relevantCourses}
                    renderItem={course => (
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
              <p><strong>Rating:</strong> <Rate disabled defaultValue={evaluation.rating} /></p>
              <p><strong>Recommend:</strong> 
                <Tag color={evaluation.wouldRecommend ? 'green' : 'red'}>
                  {evaluation.wouldRecommend ? 'Yes' : 'No'}
                </Tag>
              </p>
              <p><strong>Status:</strong> 
                <Tag color={evaluation.isFinalized ? 'green' : 'orange'}>
                  {evaluation.isFinalized ? 'FINALIZED' : 'DRAFT'}
                </Tag>
              </p>
              <p><strong>Comments:</strong> {evaluation.comments}</p>
            </Panel>
          )}
        </Collapse>
      </div>
    );
  };

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
            <Select
              defaultValue="all"
              style={{ width: 150 }}
              onChange={setStatusFilter}
            >
              <Option value="all">All Statuses</Option>
              <Option value="current">Current</Option>
              <Option value="completed">Completed</Option>
            </Select>
            <DatePicker.RangePicker 
              onChange={setDateRange}
              style={{ width: 250 }}
            />
          </Space>
        }
      >
        <Table 
          columns={[
            {
              title: 'Company',
              dataIndex: 'company',
              key: 'company',
            },
            {
              title: 'Position',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Duration',
              dataIndex: 'duration',
              key: 'duration',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (status) => (
                <Tag color={status === 'completed' ? 'green' : 'orange'}>
                  {status.toUpperCase()}
                </Tag>
              ),
            },
            {
              title: 'Report Status',
              key: 'reportStatus',
              render: (_, record) => {
                const report = reports.find(r => r.internshipId === record.id);
                if (!report) return '-';
                
                let color = 'default';
                if (report.status === 'approved') color = 'green';
                if (report.status === 'flagged') color = 'orange';
                if (report.status === 'rejected') color = 'red';
                
                return (
                  <Tag color={color}>
                    {report.status ? report.status.toUpperCase() : 'PENDING'}
                  </Tag>
                );
              },
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, record) => {
                const report = reports.find(r => r.internshipId === record.id);
                return (
                  <Space size="middle">
                    <Button 
                      type="link" 
                      onClick={() => {
                        setSelectedInternship(record);
                        report ? handleEditReport(report) : handleCreateReport();
                      }}
                    >
                      {report ? 'View Report' : 'Create Report'}
                    </Button>
                    {report && ['flagged', 'rejected'].includes(report.status) && (
                      <Button 
                        type="link" 
                        onClick={() => handleAppealReport(report)}
                      >
                        Appeal
                      </Button>
                    )}
                  </Space>
                );
              },
            }
          ]}
          dataSource={filteredInternships}
          rowKey="id"
          pagination={false}
          expandable={{
            expandedRowRender,
            rowExpandable: record => true,
          }}
        />
      </Card>

      {/* Reports Section */}
      <Card title="My Reports" className="section-card">
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleCreateReport}
          className="mb-16"
        >
          New Report
        </Button>
        <Table 
          columns={[
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: 'Company',
              key: 'company',
              render: (_, record) => {
                const internship = internships.find(i => i.id === record.internshipId);
                return internship ? internship.company : 'N/A';
              }
            },
            {
              title: 'Created Date',
              dataIndex: 'createdAt',
              key: 'createdAt',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (status) => {
                let color = 'default';
                if (status === 'approved') color = 'green';
                if (status === 'flagged') color = 'orange';
                if (status === 'rejected') color = 'red';
                if (status === 'appealed') color = 'blue';
                
                return (
                  <Tag color={color}>
                    {status ? status.toUpperCase() : 'PENDING'}
                  </Tag>
                );
              },
            },
            {
              title: 'Finalized',
              dataIndex: 'isFinalized',
              key: 'isFinalized',
              render: (isFinalized) => (
                <Tag color={isFinalized ? 'green' : 'orange'}>
                  {isFinalized ? 'YES' : 'NO'}
                </Tag>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, record) => (
                <Space size="middle">
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />} 
                    onClick={() => handleEditReport(record)}
                  >
                    View
                  </Button>
                  {!record.isFinalized && (
                    <>
                      <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        onClick={() => handleEditReport(record)}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this report?"
                        onConfirm={() => handleDeleteReport(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
                      </Popconfirm>
                    </>
                  )}
                  <Button 
                    type="link" 
                    icon={<DownloadOutlined />} 
                    onClick={() => handleDownloadReport(record.id)}
                  >
                    PDF
                  </Button>
                  {!record.isFinalized && (
                    <Button 
                      type="link" 
                      icon={<CheckCircleOutlined />} 
                      onClick={() => handleFinalizeReport(record.id)}
                    >
                      Finalize
                    </Button>
                  )}
                  {['flagged', 'rejected'].includes(record.status) && (
                    <Button 
                      type="link" 
                      onClick={() => handleAppealReport(record)}
                    >
                      Appeal
                    </Button>
                  )}
                </Space>
              ),
            }
          ]}
          dataSource={reports}
          rowKey="id"
        />
      </Card>

      {/* Evaluations Section */}
      <Card title="My Evaluations" className="section-card">
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleCreateEvaluation}
          className="mb-16"
        >
          New Evaluation
        </Button>
        <Table 
          columns={[
            {
              title: 'Company',
              dataIndex: 'company',
              key: 'company',
            },
            {
              title: 'Recommend',
              dataIndex: 'wouldRecommend',
              key: 'wouldRecommend',
              render: (recommend) => (
                <Tag color={recommend ? 'green' : 'red'}>
                  {recommend ? 'Recommended' : 'Not Recommended'}
                </Tag>
              ),
            },
            {
              title: 'Rating',
              dataIndex: 'rating',
              key: 'rating',
              render: (rating) => `${rating}/5`,
            },
            {
              title: 'Status',
              dataIndex: 'isFinalized',
              key: 'status',
              render: (isFinalized) => (
                <Tag color={isFinalized ? 'green' : 'orange'}>
                  {isFinalized ? 'Finalized' : 'Draft'}
                </Tag>
              ),
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, record) => (
                <Space size="middle">
                  <Button 
                    type="link" 
                    icon={<EyeOutlined />} 
                    onClick={() => handleEditEvaluation(record)}
                  >
                    View
                  </Button>
                  {!record.isFinalized && (
                    <>
                      <Button 
                        type="link" 
                        icon={<EditOutlined />} 
                        onClick={() => handleEditEvaluation(record)}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this evaluation?"
                        onConfirm={() => handleDeleteEvaluation(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
                      </Popconfirm>
                    </>
                  )}
                  <Button 
                    type="link" 
                    icon={<DownloadOutlined />} 
                    onClick={() => message.info('Download functionality would be implemented here')}
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
            }
          ]}
          dataSource={evaluations}
          rowKey="id"
        />
      </Card>

      {/* Report Modal with Course Selection */}
      <Modal
        title={currentReport ? 'Edit Report' : 'Create Report'}
        visible={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        onOk={handleSubmitReport}
        width={800}
      >
        <Form form={reportForm} layout="vertical">
          <Form.Item
            name="title"
            label="Report Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter report title" />
          </Form.Item>
          <Form.Item
            name="introduction"
            label="Introduction"
            rules={[{ required: true, message: 'Please write an introduction' }]}
          >
            <TextArea rows={4} placeholder="Write your introduction here..." />
          </Form.Item>
          <Form.Item
            name="body"
            label="Report Body"
            rules={[{ required: true, message: 'Please write the report body' }]}
          >
            <TextArea rows={8} placeholder="Write your report here..." />
          </Form.Item>
          
          {/* Course Selection Section */}
          <Form.Item label="Relevant Courses">
            <Button 
              type="primary" 
              onClick={() => setCourseModalVisible(true)}
              icon={<PlusOutlined />}
            >
              Select Courses
            </Button>
            {selectedCourses.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h4>Selected Courses:</h4>
                <List
                  size="small"
                  dataSource={selectedCourses}
                  renderItem={course => (
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
        visible={courseModalVisible}
        onOk={saveSelectedCourses}
        onCancel={() => setCourseModalVisible(false)}
        width={600}
      >
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <List
            dataSource={coursesInMajor}
            renderItem={course => (
              <List.Item>
                <Checkbox
                  checked={course.selected}
                  onChange={() => toggleCourseSelection(course.id)}
                >
                  {course.code} - {course.name}
                </Checkbox>
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Evaluation Modal */}
      <Modal
        title={currentEvaluation ? 'Edit Evaluation' : 'Create Evaluation'}
        visible={evaluationModalVisible}
        onCancel={() => setEvaluationModalVisible(false)}
        onOk={handleSubmitEvaluation}
        width={600}
        footer={[
          <Button key="back" onClick={() => setEvaluationModalVisible(false)}>
            Cancel
          </Button>,
          currentEvaluation?.isFinalized ? null : (
            <Button 
              key="submit" 
              type="primary" 
              onClick={() => evaluationForm.submit()}
            >
              {currentEvaluation ? 'Update' : 'Submit'}
            </Button>
          ),
          currentEvaluation && !currentEvaluation.isFinalized && (
            <Button 
              key="finalize"
              type="primary" 
              onClick={() => {
                evaluationForm.submit().then(() => {
                  handleFinalizeEvaluation(currentEvaluation.id);
                  setEvaluationModalVisible(false);
                });
              }}
            >
              Submit & Finalize
            </Button>
          )
        ]}
      >
        <Form form={evaluationForm} layout="vertical">
          <Form.Item
            name="wouldRecommend"
            label="Would you recommend this company to other students?"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select 
              placeholder="Select recommendation"
              disabled={currentEvaluation?.isFinalized}
            >
              <Option value={true}>Yes, I recommend</Option>
              <Option value={false}>No, I don't recommend</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating (1-5)"
            rules={[{ required: true, message: 'Please provide a rating' }]}
          >
            <Select 
              placeholder="Select rating"
              disabled={currentEvaluation?.isFinalized}
            >
              <Option value={1}>1 - Poor</Option>
              <Option value={2}>2 - Fair</Option>
              <Option value={3}>3 - Good</Option>
              <Option value={4}>4 - Very Good</Option>
              <Option value={5}>5 - Excellent</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="comments"
            label="Comments"
            rules={[{ required: true, message: 'Please provide comments' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Share your experience..." 
              disabled={currentEvaluation?.isFinalized}
            />
          </Form.Item>
          {currentEvaluation?.isFinalized && (
            <Alert
              message="This evaluation has been finalized and cannot be modified."
              type="warning"
              showIcon
            />
          )}
        </Form>
      </Modal>

      {/* Appeal Modal */}
      <Modal
        title="Appeal Report Decision"
        visible={appealModalVisible}
        onCancel={() => setAppealModalVisible(false)}
        onOk={handleSubmitAppeal}
        width={600}
      >
        {currentReport && (
          <>
            <Alert 
              message="Supervisor Comments" 
              description={currentReport.adminComments}
              type="warning"
              showIcon
              className="mb-16"
            />
            <Form form={appealForm} layout="vertical">
              <Form.Item
                name="message"
                label="Your Appeal Message"
                rules={[{ required: true, message: 'Please explain why you are appealing' }]}
              >
                <TextArea rows={6} placeholder="Please provide details about why you believe the decision should be reconsidered..." />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
};



// ==================== Main Student Component ====================
const Student = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch(activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "profile":
        return <ProfileContent />;
      case "internships":
        return <InternshipContent />;
      case "applications":
        return <Applications/>;
      case "reports":
        return <Reports/>
      default:
        return <DashboardContent />;
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <PieChartOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'internships',
      icon: <FileSearchOutlined />,
      label: 'Internships',
    },
    {
      key: 'applications',
      icon: <SolutionOutlined />,
      label: 'Applications',
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'My Internships',
    },
  ];

  return (
    <div className="student-container">
      <div className="student-sidebar">
        <div className="sidebar-header">
          <h2>Student Portal</h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={(e) => setActiveTab(e.key)}
          items={menuItems}
        />
      </div>
      <div className="student-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Student;