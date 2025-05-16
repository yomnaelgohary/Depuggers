"use client"

import { useState } from "react"
import {
  UserOutlined,
  StarFilled,
  StarOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import "./ViewedMyProfile.css"

const ViewedMyProfile = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("recent")

  // Sample data for companies that viewed the profile
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Tech Innovations Inc.",
      industry: "Technology",
      location: "San Francisco, CA",
      viewedDate: "2023-05-14T10:30:00",
      logo: "T",
      saved: true,
      viewCount: 3,
    },
    {
      id: 2,
      name: "Creative Design Studio",
      industry: "Design",
      location: "New York, NY",
      viewedDate: "2023-05-12T14:45:00",
      logo: "C",
      saved: false,
      viewCount: 1,
    },
    {
      id: 3,
      name: "Global Media Group",
      industry: "Media",
      location: "Los Angeles, CA",
      viewedDate: "2023-05-10T09:15:00",
      logo: "G",
      saved: true,
      viewCount: 2,
    },
    {
      id: 4,
      name: "Savannah Digital Marketing",
      industry: "Marketing",
      location: "Savannah, GA",
      viewedDate: "2023-05-09T16:20:00",
      logo: "S",
      saved: false,
      viewCount: 1,
    },
    {
      id: 5,
      name: "Innovative Solutions LLC",
      industry: "Consulting",
      location: "Atlanta, GA",
      viewedDate: "2023-05-08T11:10:00",
      logo: "I",
      saved: false,
      viewCount: 4,
    },
  ])

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`
  }

  // Toggle saved status for a company
  const toggleSaved = (id) => {
    setCompanies(companies.map((company) => (company.id === id ? { ...company, saved: !company.saved } : company)))
  }

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort companies based on selected sort option
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.viewedDate) - new Date(a.viewedDate)
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "viewCount") {
      return b.viewCount - a.viewCount
    }
    return 0
  })

  return (
    <div className="viewed-profile-container-unique6">
      <div className="viewed-profile-header-unique6">
        <h1>Companies That Viewed My Profile</h1>
        <p>See which companies have shown interest in your profile</p>
      </div>

      <div className="viewed-profile-actions-unique6">
        

        
      </div>

      <div className="viewed-profile-stats-unique6">
        <div className="stat-card-unique6">
          <h3>{companies.length}</h3>
          <p>Total Views</p>
        </div>
        <div className="stat-card-unique6">
          <h3>{companies.filter((c) => c.saved).length}</h3>
          <p>Saved Companies</p>
        </div>
        <div className="stat-card-unique6">
          <h3>{companies.reduce((sum, company) => sum + company.viewCount, 0)}</h3>
          <p>Total Impressions</p>
        </div>
      </div>

      <div className="companies-list-unique6">
        {sortedCompanies.length > 0 ? (
          sortedCompanies.map((company) => (
            <div className="company-card-unique6" key={company.id}>
              <div
                className="company-logo-unique6"
                style={{ backgroundColor: company.saved ? "var(--primary-color)" : "#6c757d" }}
              >
                {company.logo}
              </div>
              <div className="company-info-unique6">
                <h3>{company.name}</h3>
                <p className="company-details-unique6">
                  <span>{company.industry}</span> • <span>{company.location}</span>
                </p>
                <div className="view-details-unique6">
                  <span className="view-count-unique6">
                    <UserOutlined /> Viewed {company.viewCount} {company.viewCount === 1 ? "time" : "times"}
                  </span>
                  <span className="view-time-unique6">
                    <ClockCircleOutlined /> {formatRelativeTime(company.viewedDate)}
                  </span>
                </div>
              </div>
              <div className="company-actions-unique6">
                <button
                  className={`save-button-unique6 ${company.saved ? "saved-unique6" : ""}`}
                  onClick={() => toggleSaved(company.id)}
                >
                  {company.saved ? <StarFilled /> : <StarOutlined />}
                </button>
                <button className="message-button-unique6">
                  <MessageOutlined />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results-unique6">
            <p>No companies match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewedMyProfile