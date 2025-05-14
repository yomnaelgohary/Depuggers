import React, { useState, useEffect } from 'react';
// Ant Design Components
import {
  Alert,
  Button,
  Card,
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
  Space,
  Steps,
  Table,
  Tag,
  Upload
} from 'antd';

// Ant Design Icons
import {
  DollarOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FilterOutlined,
  InboxOutlined,
  SearchOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';

import "./Internships.css";

const { Search } = Input;
const { Option } = Select;
const { Step } = Steps;
const { TextArea } = Input;
const { Dragger } = Upload;

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

export default InternshipContent;
