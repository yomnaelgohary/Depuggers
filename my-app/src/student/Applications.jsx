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
  const [searchText, setSearchText] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: null,
  })
  const [filteredApplications, setFilteredApplications] = useState(applications)

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

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      status: null,
    })
    setSearchText("")
    applyFilters()
  }

  const clearSearch = () => {
    setSearchText("")
    applyFilters()
  }

  const handleSearch = (value) => {
    setSearchText(value)
    applyFilters()
  }

  const applyFilters = () => {
    let result = [...applications]

    if (searchText) {
      result = result.filter(
        (item) =>
          item.internshipTitle.toLowerCase().includes(searchText.toLowerCase()) ||
          item.company.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status)
    }

    setFilteredApplications(result)
  }

  const hasActiveFilters = () => {
    return filters.status !== null || searchText !== ""
  }

  // Apply filters when component mounts or filters change
  useState(() => {
    applyFilters()
  }, [filters, searchText])

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
      render: (status) => {
        let statusClass = "pending-unique13";
        if (status === "accepted") statusClass = "accepted-unique13";
        else if (status === "rejected") statusClass = "rejected-unique13";
        else if (status === "finalized") statusClass = "flagged-unique13";
        return (
          <span className={`status-pill-unique13 ${statusClass}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        );
      },
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
          className="unique-view-profile-button unique-btn-white"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedApplication(record)
            setIsModalVisible(true)
          }}
        >
          View Details
        </Button>
      ),
    },
  ]

  return (
    <div className="unique-applications-container">
      <Card title="My Applications" bordered={false} className="unique-applications-card" headStyle={{ borderBottom: 0 }}>
        <div className="unique-filters">
          <button className="unique-filter-button" onClick={toggleFilters}>
            <span className="filter-icon">≡</span> Filters
          </button>
          <div className="unique-search-container">
            <input
              type="text"
              placeholder="Search internship"
              className="unique-search-input"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchText && (
              <button className="unique-clear-search" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="unique-filter-modal-overlay">
            <div className="unique-filter-modal">
              <div className="unique-filter-modal-header">
                <h2>Filters</h2>
                <button className="unique-close-button" onClick={toggleFilters}>
                  ✕
                </button>
              </div>

              <div className="unique-filter-modal-content">
                <div className="unique-filter-section">
                  <h3>STATUS</h3>
                  <div className="unique-filter-options">
                    <button
                      className={`unique-filter-option ${filters.status === "pending" ? "selected" : ""}`}
                      onClick={() => handleFilterChange("status", "pending")}
                    >
                      Pending
                    </button>
                    <button
                      className={`unique-filter-option ${filters.status === "accepted" ? "selected" : ""}`}
                      onClick={() => handleFilterChange("status", "accepted")}
                    >
                      Accepted
                    </button>
                    <button
                      className={`unique-filter-option ${filters.status === "rejected" ? "selected" : ""}`}
                      onClick={() => handleFilterChange("status", "rejected")}
                    >
                      Rejected
                    </button>
                    <button
                      className={`unique-filter-option ${filters.status === "finalized" ? "selected" : ""}`}
                      onClick={() => handleFilterChange("status", "finalized")}
                    >
                      Finalized
                    </button>
                  </div>
                </div>
              </div>

              <div className="unique-filter-actions">
                <button className={`unique-reset-button ${hasActiveFilters() ? "active" : ""}`} onClick={resetFilters}>
                  Reset
                </button>
                <button className="unique-apply-button" onClick={toggleFilters}>
                  Show {filteredApplications.length} applications
                </button>
              </div>
            </div>
          </div>
        )}

        {searchText && (
          <div className="unique-search-results">
            <div className="unique-results-count">
              Found {filteredApplications.length} {filteredApplications.length === 1 ? "application" : "applications"}{" "}
              matching "{searchText}"
            </div>
          </div>
        )}

        <Table
          columns={columns}
          dataSource={filteredApplications}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
          className="unique-applications-table"
        />

        <Modal
          title="Application Details"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={
            <Button type="primary" onClick={() => setIsModalVisible(false)} className="unique-btn-white">
              Close
            </Button>
          }
          width={700}
          className="unique-application-modal"
        >
          {selectedApplication && (
            <Descriptions bordered column={1} className="unique-application-details">
              <Descriptions.Item label="Internship">{selectedApplication.internshipTitle}</Descriptions.Item>
              <Descriptions.Item label="Company">{selectedApplication.company}</Descriptions.Item>
              <Descriptions.Item label="Applied Date">{selectedApplication.appliedDate}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <span className={`status-pill-unique13 ${
                  selectedApplication.status === "accepted"
                    ? "accepted-unique13"
                    : selectedApplication.status === "rejected"
                    ? "rejected-unique13"
                    : selectedApplication.status === "finalized"
                    ? "flagged-unique13"
                    : "pending-unique13"
                }`}>
                  {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                </span>
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