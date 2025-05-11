"use client"

import { useState, useEffect, useMemo } from "react"
import { PieChart, Star, Info, Award, TrendingUp, BookOpen, BarChart2, Download } from "lucide-react"

function Statistics() {
  const [jspdfLoaded, setJspdfLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    script.async = true
    script.onload = () => {
      setJspdfLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Sample data for statistics
  const reportsData = [
    {
      id: 1,
      type: "internship",
      title: "Software Engineering Internship Report",
      studentName: "Alice Smith",
      studentId: 101,
      major: "Computer Science",
      company: "Dell Technologies",
      status: "accepted",
    },
    {
      id: 2,
      type: "evaluation",
      title: "Data Science Internship Evaluation",
      studentName: "Bob Johnson",
      studentId: 102,
      major: "Data Science",
      company: "IBM",
      status: "pending",
    },
    {
      id: 3,
      type: "internship",
      title: "UX Design Internship Report",
      studentName: "Diana Lee",
      studentId: 104,
      major: "Design",
      company: "Microsoft",
      status: "flagged",
    },
    {
      id: 4,
      type: "evaluation",
      title: "Business Analyst Internship Evaluation",
      studentName: "George Harris",
      studentId: 107,
      major: "Business Administration",
      company: "PwC",
      status: "rejected",
    },
    {
      id: 5,
      type: "internship",
      title: "Marketing Internship Report",
      studentName: "Fiona Green",
      studentId: 106,
      major: "Marketing",
      company: "Amazon",
      status: "accepted",
    },
  ]

  const reportStats = useMemo(() => {
    const currentCycle = { accepted: 0, rejected: 0, flagged: 0, pending: 0, total: 0 }
    if (reportsData && reportsData.length > 0) {
      reportsData.forEach((report) => {
        currentCycle.total++
        if (report.status === "accepted") currentCycle.accepted++
        else if (report.status === "rejected") currentCycle.rejected++
        else if (report.status === "flagged") currentCycle.flagged++
        else if (report.status === "pending") currentCycle.pending++
      })
    }
    return {
      currentCycle,
      previousCycle: { accepted: 38, rejected: 10, flagged: 9, pending: 0, total: 57 },
      reviewTime: { average: 3.2, min: 1, max: 7 },
    }
  }, [reportsData])

  const topCourses = useMemo(() => {
    if (!reportsData || reportsData.length === 0) return []
    const courseCounts = {}
    reportsData.forEach((report) => {
      if (report.major) {
        courseCounts[report.major] = (courseCounts[report.major] || 0) + 1
      }
    })
    return Object.entries(courseCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [reportsData])

  const topCompaniesByInternships = useMemo(() => {
    if (!reportsData || reportsData.length === 0) return []
    const companyCounts = {}
    reportsData.forEach((report) => {
      if (report.company) {
        companyCounts[report.company] = (companyCounts[report.company] || 0) + 1
      }
    })
    return Object.entries(companyCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [reportsData])

  const topRatedCompanies = [
    { name: "Microsoft", rating: 4.8 },
    { name: "IBM", rating: 4.6 },
    { name: "Dell Technologies", rating: 4.5 },
    { name: "Amazon", rating: 4.3 },
    { name: "Oracle", rating: 4.2 },
  ]

  const generateStatisticsPDF = () => {
    if (!jspdfLoaded || !window.jspdf) {
      console.error("jsPDF library is not loaded for Statistics PDF.")
      alert("PDF library not loaded. Please try again later.")
      return
    }
    const { jsPDF } = window.jspdf
    const doc = new jsPDF()
    let yPos = 20

    doc.setFont("helvetica", "bold")
    doc.setFontSize(20)
    doc.text("Internship Statistics Report", 105, yPos, { align: "center" })
    yPos += 15

    doc.setFontSize(10)
    doc.setTextColor(150)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" })
    yPos += 15
    doc.setTextColor(0)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("Report Status (Current Cycle)", 20, yPos)
    yPos += 10

    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    doc.text(`Total Reports Submitted: ${reportStats.currentCycle.total}`, 25, yPos)
    yPos += 7
    doc.text(`Accepted: ${reportStats.currentCycle.accepted}`, 25, yPos)
    yPos += 7
    doc.text(`Rejected: ${reportStats.currentCycle.rejected}`, 25, yPos)
    yPos += 7
    doc.text(`Flagged: ${reportStats.currentCycle.flagged}`, 25, yPos)
    yPos += 7
    doc.text(`Pending: ${reportStats.currentCycle.pending}`, 25, yPos)
    yPos += 10

    const completed =
      reportStats.currentCycle.accepted + reportStats.currentCycle.rejected + reportStats.currentCycle.flagged
    const completionRate =
      reportStats.currentCycle.total > 0 ? Math.round((completed / reportStats.currentCycle.total) * 100) : 0
    const acceptanceRate = completed > 0 ? Math.round((reportStats.currentCycle.accepted / completed) * 100) : 0
    doc.text(`Completion Rate (Accepted/Rejected/Flagged of Total): ${completionRate}%`, 25, yPos)
    yPos += 7
    doc.text(`Acceptance Rate (Accepted of Completed): ${acceptanceRate}%`, 25, yPos)
    yPos += 15

    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("Most Popular Courses in Internships", 20, yPos)
    yPos += 10
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    if (topCourses.length > 0) {
      topCourses.forEach((course) => {
        doc.text(`- ${course.name}: ${course.count} reports`, 25, yPos)
        yPos += 7
      })
    } else {
      doc.text("No course data available.", 25, yPos)
      yPos += 7
    }
    yPos += 10

    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("Top Companies by Internship Report Count", 20, yPos)
    yPos += 10
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    if (topCompaniesByInternships.length > 0) {
      topCompaniesByInternships.forEach((company) => {
        doc.text(`- ${company.name}: ${company.count} reports`, 25, yPos)
        yPos += 7
      })
    } else {
      doc.text("No company internship data available from reports.", 25, yPos)
      yPos += 7
    }
    yPos += 10

    if (yPos > 250) {
      doc.addPage()
      yPos = 20
    }
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("Top Rated Companies (Sample Data)", 20, yPos)
    yPos += 10
    doc.setFont("helvetica", "normal")
    doc.setFontSize(12)
    topRatedCompanies.forEach((company) => {
      doc.text(`- ${company.name}: Rating ${company.rating.toFixed(1)}/5.0`, 25, yPos)
      yPos += 7
    })
    yPos += 10

    const pageCount = doc.internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text("Generated by SCAD Office", 105, 280, { align: "center" })
      doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: "center" })
    }

    doc.save("Internship_Statistics_Report.pdf")
  }

  const renderBarChart = (data, valueKey, labelKey, maxValue, colorClass) => {
    if (!data || data.length === 0) return <p>No data available for this chart.</p>
    const maxVal = maxValue || Math.max(...data.map((item) => item[valueKey]), 0)
    if (maxVal === 0) return <p>No data to display in chart.</p>

    return (
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={index} className="bar-chart-item">
            <div className="bar-chart-label">{item[labelKey]}</div>
            <div className="bar-chart-bar-container">
              <div className={`bar-chart-bar ${colorClass}`} style={{ width: `${(item[valueKey] / maxVal) * 100}%` }}>
                <span className="bar-chart-value">{item[valueKey]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderPieChart = (data) => {
    if (!data || !data.currentCycle || data.currentCycle.total === 0) {
      return (
        <div className="pie-chart-container">
          <div className="pie-chart-placeholder">
            <PieChart size={80} />
          </div>
          <p>No report data for pie chart.</p>
        </div>
      )
    }
    const total = data.currentCycle.total
    const segments = [
      {
        label: "Accepted",
        value: data.currentCycle.accepted,
        color: "#4caf50",
        percentage: total > 0 ? Math.round((data.currentCycle.accepted / total) * 100) : 0,
      },
      {
        label: "Rejected",
        value: data.currentCycle.rejected,
        color: "#f44336",
        percentage: total > 0 ? Math.round((data.currentCycle.rejected / total) * 100) : 0,
      },
      {
        label: "Flagged",
        value: data.currentCycle.flagged,
        color: "#ff9800",
        percentage: total > 0 ? Math.round((data.currentCycle.flagged / total) * 100) : 0,
      },
      {
        label: "Pending",
        value: data.currentCycle.pending,
        color: "#2196f3",
        percentage: total > 0 ? Math.round((data.currentCycle.pending / total) * 100) : 0,
      },
    ]
    return (
      <div className="pie-chart-container">
        <div className="pie-chart">
          <div className="pie-chart-visualization">
            <div className="pie-chart-placeholder">
              <PieChart size={80} />
            </div>
          </div>
          <div className="pie-chart-legend">
            {segments.map((segment, index) => (
              <div key={index} className="pie-chart-legend-item">
                <div className="pie-chart-legend-color" style={{ backgroundColor: segment.color }}></div>
                <div className="pie-chart-legend-label">
                  {segment.label}: {segment.value} ({segment.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderStarRating = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) stars.push(<Star key={i} size={16} className="star-filled" />)
      else if (i === fullStars && hasHalfStar) stars.push(<Star key={i} size={16} className="star-half" />)
      else stars.push(<Star key={i} size={16} className="star-empty" />)
    }
    return (
      <div className="star-rating">
        {stars} <span className="rating-value">({rating.toFixed(1)})</span>
      </div>
    )
  }

  const currentCycleCompletionRate =
    reportStats.currentCycle.total > 0
      ? Math.round(
          ((reportStats.currentCycle.accepted + reportStats.currentCycle.rejected + reportStats.currentCycle.flagged) /
            reportStats.currentCycle.total) *
            100,
        )
      : 0

  const currentCycleAcceptanceRate =
    reportStats.currentCycle.accepted + reportStats.currentCycle.rejected + reportStats.currentCycle.flagged > 0
      ? Math.round(
          (reportStats.currentCycle.accepted /
            (reportStats.currentCycle.accepted +
              reportStats.currentCycle.rejected +
              reportStats.currentCycle.flagged)) *
            100,
        )
      : 0

  return (
    <div className="statistics-section">
      <div className="statistics-header">
        <h2>Internship Statistics</h2>
        <button className="download-stats-button" onClick={generateStatisticsPDF} disabled={!jspdfLoaded}>
          <Download size={16} /> Download Statistics Report
        </button>
      </div>
      <div className="statistics-content">
        <div className="statistics-card">
          <div className="statistics-card-header">
            <h3>
              <BarChart2 size={18} /> Reports Status (Current Cycle)
            </h3>
          </div>
          <div className="statistics-card-content">
            {renderPieChart(reportStats)}
            <div className="statistics-summary">
              <div className="summary-item">
                <div className="summary-label">Total Reports</div>
                <div className="summary-value">{reportStats.currentCycle.total}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Completion Rate</div>
                <div className="summary-value">{currentCycleCompletionRate}%</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Acceptance Rate</div>
                <div className="summary-value">{currentCycleAcceptanceRate}%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="statistics-card">
          <div className="statistics-card-header">
            <h3>
              <Info size={18} /> Average Review Time (Sample)
            </h3>
          </div>
          <div className="statistics-card-content">
            <div className="review-time-stats">
              <div className="review-time-item">
                <div className="review-time-value">{reportStats.reviewTime.average}</div>
                <div className="review-time-label">Average Days</div>
              </div>
              <div className="review-time-item">
                <div className="review-time-value">{reportStats.reviewTime.min}</div>
                <div className="review-time-label">Minimum Days</div>
              </div>
              <div className="review-time-item">
                <div className="review-time-value">{reportStats.reviewTime.max}</div>
                <div className="review-time-label">Maximum Days</div>
              </div>
            </div>
            <div className="review-time-note">
              <Info size={16} />
              <span>Review time is calculated from submission date to final decision (sample data shown).</span>
            </div>
          </div>
        </div>
        <div className="statistics-card">
          <div className="statistics-card-header">
            <h3>
              <BookOpen size={18} /> Most Popular Courses in Internships
            </h3>
          </div>
          <div className="statistics-card-content">
            {renderBarChart(topCourses, "count", "name", undefined, "course-bar")}
          </div>
        </div>
        <div className="statistics-card">
          <div className="statistics-card-header">
            <h3>
              <TrendingUp size={18} /> Top Companies by Internship Report Count
            </h3>
          </div>
          <div className="statistics-card-content">
            {renderBarChart(topCompaniesByInternships, "count", "name", undefined, "company-bar")}
          </div>
        </div>
        <div className="statistics-card">
          <div className="statistics-card-header">
            <h3>
              <Award size={18} /> Top Rated Companies (Sample)
            </h3>
          </div>
          <div className="statistics-card-content">
            <div className="top-rated-companies">
              {topRatedCompanies.map((company, index) => (
                <div key={index} className="top-rated-company">
                  <div className="company-rank">{index + 1}</div>
                  <div className="company-info">
                    <div className="company-name">{company.name}</div>
                    {renderStarRating(company.rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
