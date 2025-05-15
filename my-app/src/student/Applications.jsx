"use client"

import { useState } from "react"
// Ant Design Components
import { Badge, Button, Card, Descriptions, Modal, Table, Tag } from "antd"

// Ant Design Icons
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  FileTextOutlined,
} from "@ant-design/icons"

import "./Applications.css"

const Applications = () => {
  // Sample data - replace with your actual API data
  const [applications, setApplications] = useState([
    {
      id: 1,
      internshipTitle: "Frontend Developer Intern",
      company: "Tech Solutions Inc.",
      appliedDate: "2023-10-15",
      status: "pending",
      decisionDate: null,
      notes: "Application under review",
    },
    {
      id: 2,
      internshipTitle: "Data Science Intern",
      company: "Data Analytics Co.",
      appliedDate: "2023-10-10",
      status: "accepted",
      decisionDate: "2023-10-25",
      notes: "Congratulations! Start date: Nov 15",
    },
    {
      id: 3,
      internshipTitle: "UI/UX Design Intern",
      company: "Creative Designs",
      appliedDate: "2023-10-05",
      status: "rejected",
      decisionDate: "2023-10-20",
      notes: "Position filled",
    },
    {
      id: 4,
      internshipTitle: "Financial Analyst Intern",
      company: "Global Finance",
      appliedDate: "2023-09-20",
      status: "finalized",
      decisionDate: "2023-10-01",
      notes: "Application processed",
    },
  ])

  const [selectedApplication, setSelectedApplication] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const statusColors = {
    pending: "processing",
    accepted: "success",
    rejected: "error",
    finalized: "default",
  }

  const statusIcons = {
    pending: <ClockCircleOutlined />,
    accepted: <CheckCircleOutlined />,
    rejected: <CloseCircleOutlined />,
    finalized: <FileTextOutlined />,
  }

  const columns = [
    {
      title: "Internship",
      dataIndex: "internshipTitle",
      key: "internshipTitle",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ color: "#666", fontSize: 12 }}>{record.company}</div>
        </div>
      ),
    },
    {
      title: "Applied Date",
      dataIndex: "appliedDate",
      key: "appliedDate",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag icon={statusIcons[status]} color={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Accepted", value: "accepted" },
        { text: "Rejected", value: "rejected" },
        { text: "Finalized", value: "finalized" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Decision Date",
      dataIndex: "decisionDate",
      key: "decisionDate",
      render: (date) => date || "N/A",
      responsive: ["lg"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedApplication(record)
            setIsModalVisible(true)
          }}
        >
          Details
        </Button>
      ),
    },
  ]

  return (
    <div className="applications-container">
      <Card title="My Applications" bordered={false} className="applications-card" headStyle={{ borderBottom: 0 }}>
        <Table
          columns={columns}
          dataSource={applications}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
          className="applications-table"
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
          className="application-modal"
        >
          {selectedApplication && (
            <Descriptions bordered column={1} className="application-details">
              <Descriptions.Item label="Internship">{selectedApplication.internshipTitle}</Descriptions.Item>
              <Descriptions.Item label="Company">{selectedApplication.company}</Descriptions.Item>
              <Descriptions.Item label="Applied Date">{selectedApplication.appliedDate}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={statusColors[selectedApplication.status]}
                  text={<span style={{ textTransform: "capitalize" }}>{selectedApplication.status}</span>}
                />
              </Descriptions.Item>
              {selectedApplication.decisionDate && (
                <Descriptions.Item label="Decision Date">{selectedApplication.decisionDate}</Descriptions.Item>
              )}
              <Descriptions.Item label="Notes">{selectedApplication.notes}</Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Card>
    </div>
  )
}

export default Applications
