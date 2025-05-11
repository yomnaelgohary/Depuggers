"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, CalendarIcon, Clock } from "lucide-react"

function InternshipCycle() {
  const [currentView, setCurrentView] = useState("overview")
  const [selectedMonth, setSelectedMonth] = useState(null)

  const currentYear = new Date().getFullYear()

  const cycleHighlightedDays = useMemo(() => {
    const days = []
    const startMonth = 6
    const endMonth = 8
    const year = new Date().getFullYear()
    for (let month = startMonth; month <= endMonth; month++) {
      const lastDay = new Date(year, month + 1, 0).getDate()
      for (let day = 1; day <= lastDay; day++) days.push(new Date(year, month, day))
    }
    return days
  }, [])

  const months = useMemo(() => {
    const m = []
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentYear, i, 1)
      const monthName = monthDate.toLocaleString("default", { month: "long" })
      const highlightedInMonth = cycleHighlightedDays.filter(
        (day) => day.getMonth() === i && day.getFullYear() === currentYear,
      ).length
      const isActiveMonth = i >= 6 && i <= 8
      m.push({
        index: i,
        name: monthName,
        highlightedDays: isActiveMonth ? highlightedInMonth : 0,
        daysInMonth: new Date(currentYear, i + 1, 0).getDate(),
        isActive: isActiveMonth,
      })
    }
    return m
  }, [currentYear, cycleHighlightedDays])

  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex)
    setCurrentView("month")
  }

  const goBackToOverview = () => setCurrentView("overview")

  const renderMonthView = () => {
    const month = selectedMonth
    const year = currentYear
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" })
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) days.push(<td key={`empty-${i}`} className="empty-day"></td>)
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
    for (let i = 0; i < days.length; i += 7) weeks.push(<tr key={`week-${i / 7}`}>{days.slice(i, i + 7)}</tr>)
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

  const renderOverview = () => (
    <div className="calendar-overview">
      <h2>Internship Cycle Calendar</h2>
      <p className="cycle-dates">July 1st - October 1st, {currentYear}</p>
      <div className="months-grid">
        {months.map((month) => (
          <div
            key={month.index}
            className={`month-card ${month.isActive ? "active-month" : "inactive-month"}`}
            onClick={() => handleMonthClick(month.index)}
          >
            <h3>{month.name}</h3>
            <div className="month-stats">
              <div className="month-progress">
                {month.isActive && (
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
      <div className="calendar-summary">
        <div className="summary-item">
          <CalendarIcon size={20} />
          <div>
            <h4>Total Duration</h4>
            <p>3 months</p>
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
    </div>
  )

  return <div className="calendar-container">{currentView === "overview" ? renderOverview() : renderMonthView()}</div>
}

export default InternshipCycle
