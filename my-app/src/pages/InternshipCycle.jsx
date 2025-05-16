"use client"

import { useState, useMemo, useRef } from "react" // Added useRef
import { ChevronLeft, CalendarIcon, Clock, Check } from "lucide-react"

function InternshipCycle() {
  const [isSetupMode, setIsSetupMode] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentView, setCurrentView] = useState("overview")
  const [selectedMonth, setSelectedMonth] = useState(null)

  const currentYear = new Date().getFullYear()

  // Refs for date inputs
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  // ... (keep cycleHighlightedDays, months, handleMonthClick, goBackToOverview, handleSetupSubmit, renderMonthView, renderOverview) ...
  // ALL THE PREVIOUSLY PROVIDED LOGIC FOR THESE FUNCTIONS REMAINS THE SAME
  // For brevity, I'm omitting them here, but they should be in your actual file.

  // Calculate cycle highlighted days based on custom duration
  const cycleHighlightedDays = useMemo(() => {
    if (!startDate || !endDate) return []
    const days = []
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (end <= start) return []
    const currentDate = new Date(start)
    while (currentDate <= end) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return days
  }, [startDate, endDate])

  // Calculate ALL months
  const months = useMemo(() => {
    if (!startDate || !endDate) {
      const defaultMonths = []
      for (let i = 0; i < 12; i++) {
        const monthDate = new Date(currentYear, i, 1)
        defaultMonths.push({
          index: i, year: currentYear, name: monthDate.toLocaleString("default", { month: "long" }),
          highlightedDays: 0, daysInMonth: new Date(currentYear, i + 1, 0).getDate(), isActive: false,
        })
      }
      return defaultMonths
    }
    const start = new Date(startDate); const end = new Date(endDate)
    const startYear = start.getFullYear(); const endYear = end.getFullYear()
    const m = []; const yearSpan = endYear - startYear + 1
    for (let yearOffset = 0; yearOffset < yearSpan; yearOffset++) {
      const year = startYear + yearOffset
      for (let i = 0; i < 12; i++) {
        const monthDate = new Date(year, i, 1)
        const highlightedInMonth = cycleHighlightedDays.filter(d => d.getMonth() === i && d.getFullYear() === year).length
        m.push({
          index: i, year: year, name: monthDate.toLocaleString("default", { month: "long" }),
          highlightedDays: highlightedInMonth, daysInMonth: new Date(year, i + 1, 0).getDate(), isActive: highlightedInMonth > 0,
        })
      }
    }
    return m
  }, [cycleHighlightedDays, startDate, endDate, currentYear])

  const handleMonthClick = (monthIndex, year) => {
    setSelectedMonth({ index: monthIndex, year: year }); setCurrentView("month")
  }
  const goBackToOverview = () => setCurrentView("overview")

  const handleSetupSubmit = (e) => {
    e.preventDefault()
    if (startDate && endDate && new Date(endDate) > new Date(startDate)) {
      setIsSetupMode(false)
    } else {
      alert("Please ensure the end date is after the start date.")
    }
  }

  const renderMonthView = () => {
    if (!selectedMonth) return null;
    const month = selectedMonth.index, year = selectedMonth.year;
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" });
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(<td key={`empty-${i}`} className="empty-day"></td>);
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isHighlighted = cycleHighlightedDays.some(hd => hd.toDateString() === date.toDateString());
      const isToday = new Date().toDateString() === date.toDateString();
      days.push(
        <td key={day} className={`calendar-day ${isHighlighted ? "highlighted" : ""} ${isToday ? "today" : ""}`}>
          <div className="day-content"><span className="day-number">{day}</span>{isHighlighted && <div className="day-indicator"></div>}</div>
        </td>
      );
    }
    const weeks = []; for (let i = 0; i < days.length; i += 7) weeks.push(<tr key={`week-${i / 7}`}>{days.slice(i, i + 7)}</tr>);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="month-view">
        <div className="month-header">
          <button className="back-button" onClick={goBackToOverview}><ChevronLeft size={20} /><span>Back</span></button>
          <h2>{monthName} {year}</h2>
        </div>
        <table className="month-calendar">
          <thead><tr>{dayNames.map(day => <th key={day}>{day}</th>)}</tr></thead>
          <tbody>{weeks}</tbody>
        </table>
        <div className="calendar-legend">
          <div className="legend-item"><div className="legend-indicator highlighted"></div><span>Internship Cycle Day</span></div>
          <div className="legend-item"><div className="legend-indicator today"></div><span>Today</span></div>
        </div>
      </div>
    );
  };

  const renderOverview = () => {
    const startDateObj = new Date(startDate); const endDateObj = new Date(endDate);
    const formattedStartDate = startDateObj.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    const formattedEndDate = endDateObj.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    const monthsByYear = {};
    months.forEach(month => { if (!monthsByYear[month.year]) monthsByYear[month.year] = []; monthsByYear[month.year].push(month); });
    return (
      <div className="calendar-overview">
        <h2>Internship Cycle Calendar</h2>
        <p className="cycle-dates">
          {formattedStartDate} - {formattedEndDate}, {startDateObj.getFullYear()}
          {startDateObj.getFullYear() !== endDateObj.getFullYear() && ` - ${endDateObj.getFullYear()}`}
        </p>
        {Object.keys(monthsByYear).map(year => (
          <div key={year} className="year-section">
            <h3 className="year-heading">{year}</h3>
            <div className="months-grid">
              {monthsByYear[year].map(month => (
                <div key={`${month.year}-${month.index}`} className={`month-card ${month.isActive ? "active-month" : "inactive-month"}`} onClick={() => handleMonthClick(month.index, month.year)}>
                  <h3>{month.name}</h3>
                  <div className="month-stats">
                    <div className="month-progress">{month.highlightedDays > 0 && <div className="progress-bar" style={{ width: `${(month.highlightedDays / month.daysInMonth) * 100}%` }}></div>}</div>
                    <p>{month.highlightedDays} active days</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="calendar-summary">
          <div className="summary-item"><CalendarIcon size={20} /><div><h4>Total Duration</h4><p>{Math.ceil(Math.abs(endDateObj - startDateObj) / (1000 * 60 * 60 * 24)) + 1} days</p></div></div>
          <div className="summary-item"><Clock size={20} /><div><h4>Active Days</h4><p>{cycleHighlightedDays.length} days</p></div></div>
        </div>
        <button className="edit-duration-button" onClick={() => setIsSetupMode(true)}>Edit Duration</button>
      </div>
    );
  };


  const renderSetupForm = () => (
    <div className="setup-form-container">
      <h2 className="setup-form-title">Set Internship Cycle Duration</h2>
      <form onSubmit={handleSetupSubmit} className="duration-form">
        <div className="form-group">
          <label htmlFor="start-date">Start Date</label>
          <div className="date-input-container"> {/* Wrapper for input and icon */}
            <input
              id="start-date"
              type="date"
              ref={startDateInputRef} // Assign ref
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="date-picker-input"
              placeholder="dd/mm/yyyy"
            />
            <CalendarIcon
              className="custom-calendar-icon"
              size={20}
              onClick={() => startDateInputRef.current?.showPicker()} // Programmatically open picker
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="end-date">End Date</label>
          <div className="date-input-container"> {/* Wrapper for input and icon */}
            <input
              id="end-date"
              type="date"
              ref={endDateInputRef} // Assign ref
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              required
              className="date-picker-input"
              placeholder="dd/mm/yyyy"
            />
            <CalendarIcon
              className="custom-calendar-icon"
              size={20}
              onClick={() => endDateInputRef.current?.showPicker()} // Programmatically open picker
            />
          </div>
        </div>
        <button type="submit" className="setup-submit-button">
          <Check size={16} style={{ marginRight: '8px' }} />
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