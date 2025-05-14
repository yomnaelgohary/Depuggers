"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, CalendarIcon, Clock, Check } from "lucide-react"

function InternshipCycle() {
  // Add states for setup mode and custom duration
  const [isSetupMode, setIsSetupMode] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentView, setCurrentView] = useState("overview")
  const [selectedMonth, setSelectedMonth] = useState(null)

  const currentYear = new Date().getFullYear()

  // Calculate cycle highlighted days based on custom duration
  const cycleHighlightedDays = useMemo(() => {
    if (!startDate || !endDate) return []

    const days = []
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Ensure end date is after start date
    if (end <= start) return []

    // Generate all days between start and end dates
    const currentDate = new Date(start)
    while (currentDate <= end) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }, [startDate, endDate])

  // Calculate ALL months with their properties, not just those in the cycle
  const months = useMemo(() => {
    if (!startDate || !endDate) {
      // Return all months of current year when no dates are selected
      const defaultMonths = []
      for (let i = 0; i < 12; i++) {
        const monthDate = new Date(currentYear, i, 1)
        const monthName = monthDate.toLocaleString("default", { month: "long" })
        defaultMonths.push({
          index: i,
          year: currentYear,
          name: monthName,
          highlightedDays: 0,
          daysInMonth: new Date(currentYear, i + 1, 0).getDate(),
          isActive: false,
        })
      }
      return defaultMonths
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()

    const m = []
    // Handle multi-year internships if needed
    const yearSpan = endYear - startYear + 1

    // Generate all months for each year in the span
    for (let yearOffset = 0; yearOffset < yearSpan; yearOffset++) {
      const year = startYear + yearOffset

      for (let i = 0; i < 12; i++) {
        const monthDate = new Date(year, i, 1)
        const monthName = monthDate.toLocaleString("default", { month: "long" })
        const highlightedInMonth = cycleHighlightedDays.filter(
          (day) => day.getMonth() === i && day.getFullYear() === year,
        ).length

        m.push({
          index: i,
          year: year,
          name: monthName,
          highlightedDays: highlightedInMonth,
          daysInMonth: new Date(year, i + 1, 0).getDate(),
          isActive: highlightedInMonth > 0,
        })
      }
    }

    return m
  }, [cycleHighlightedDays, startDate, endDate, currentYear])

  const handleMonthClick = (monthIndex, year) => {
    setSelectedMonth({ index: monthIndex, year: year })
    setCurrentView("month")
  }

  const goBackToOverview = () => setCurrentView("overview")

  // Handle form submission to set the internship cycle
  const handleSetupSubmit = (e) => {
    e.preventDefault()
    if (startDate && endDate && new Date(endDate) > new Date(startDate)) {
      setIsSetupMode(false)
    }
  }

  const renderMonthView = () => {
    if (!selectedMonth) return null

    const month = selectedMonth.index
    const year = selectedMonth.year
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" })
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="empty-day"></td>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isHighlighted = cycleHighlightedDays.some(
        (highlightedDay) => highlightedDay.toDateString() === date.toDateString(),
      )
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <td key={day} className={`calendar-day ${isHighlighted ? "highlighted" : ""} ${isToday ? "today" : ""}`}>
          <div className="day-content">
            <span className="day-number">{day}</span>
            {isHighlighted && <div className="day-indicator"></div>}
          </div>
        </td>,
      )
    }

    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<tr key={`week-${i / 7}`}>{days.slice(i, i + 7)}</tr>)
    }

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="month-view">
        <div className="month-header">
          <button className="back-button" onClick={goBackToOverview}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h2>
            {monthName} {year}
          </h2>
        </div>
        <table className="month-calendar">
          <thead>
            <tr>
              {dayNames.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-indicator highlighted"></div>
            <span>Internship Cycle Day</span>
          </div>
          <div className="legend-item">
            <div className="legend-indicator today"></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    )
  }

  const renderOverview = () => {
    // Format dates for display
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    const formattedStartDate = startDateObj.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    const formattedEndDate = endDateObj.toLocaleDateString("en-US", { month: "long", day: "numeric" })

    // Group months by year for better organization
    const monthsByYear = {}
    months.forEach((month) => {
      if (!monthsByYear[month.year]) {
        monthsByYear[month.year] = []
      }
      monthsByYear[month.year].push(month)
    })

    return (
      <div className="calendar-overview">
        <h2>Internship Cycle Calendar</h2>
        <p className="cycle-dates">
          {formattedStartDate} - {formattedEndDate}, {startDateObj.getFullYear()}
          {startDateObj.getFullYear() !== endDateObj.getFullYear() && ` - ${endDateObj.getFullYear()}`}
        </p>

        {/* Render months grouped by year */}
        {Object.keys(monthsByYear).map((year) => (
          <div key={year} className="year-section">
            <h3 className="year-heading">{year}</h3>
            <div className="months-grid">
              {monthsByYear[year].map((month) => (
                <div
                  key={`${month.year}-${month.index}`}
                  className={`month-card ${month.isActive ? "active-month" : "inactive-month"}`}
                  onClick={() => handleMonthClick(month.index, month.year)}
                >
                  <h3>{month.name}</h3>
                  <div className="month-stats">
                    <div className="month-progress">
                      {month.highlightedDays > 0 && (
                        <div
                          className="progress-bar"
                          style={{ width: `${(month.highlightedDays / month.daysInMonth) * 100}%` }}
                        ></div>
                      )}
                    </div>
                    <p>{month.highlightedDays} active days</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="calendar-summary">
          <div className="summary-item">
            <CalendarIcon size={20} />
            <div>
              <h4>Total Duration</h4>
              <p>{Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24))} days</p>
            </div>
          </div>
          <div className="summary-item">
            <Clock size={20} />
            <div>
              <h4>Active Days</h4>
              <p>{cycleHighlightedDays.length} days</p>
            </div>
          </div>
        </div>
        <button className="edit-duration-button" onClick={() => setIsSetupMode(true)}>
          Edit Duration
        </button>
      </div>
    )
  }

  const renderSetupForm = () => (
    <div className="setup-form-container">
      <h2>Set Internship Cycle Duration</h2>
      <form onSubmit={handleSetupSubmit} className="duration-form">
        <div className="form-group">
          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-date">End Date</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          <Check size={16} />
          Set Internship Cycle
        </button>
      </form>
    </div>
  )

  return (
    <div className="calendar-container">
      {isSetupMode ? renderSetupForm() : currentView === "overview" ? renderOverview() : renderMonthView()}
    </div>
  )
}

export default InternshipCycle
