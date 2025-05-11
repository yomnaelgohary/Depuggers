"use client"

import { useState, useEffect } from "react" // Import useEffect for potential logging if needed
import "./scad.css"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import Companies from "./pages/Companies"
import Students from "./pages/Students"
import Internships from "./pages/Internships"
import InternshipCycle from "./pages/InternshipCycle"
import Evaluations from "./pages/Evaluations"
import Statistics from "./pages/Statistics"
import Workshops from "./pages/Workshops"
import Appointments from "./pages/Appointments"
import MyAppointments from "./pages/MyAppointments"
import { NotificationsProvider } from "./components/NotificationsContext"

function SCAD() {
  const [activePage, setActivePage] = useState("dashboard")
  // Navigation history state
  const [navigationHistory, setNavigationHistory] = useState(["dashboard"]) // Initialize with the starting page
  // Current position in navigation history
  const [historyPosition, setHistoryPosition] = useState(0)

  const handlePageChange = (page) => {
    // If we're not at the end of the history, truncate the history
    if (historyPosition < navigationHistory.length - 1) {
      const newHistory = navigationHistory.slice(0, historyPosition + 1)
      setNavigationHistory([...newHistory, page])
    } else {
      // We're at the end, just add the new page
      setNavigationHistory((prevHistory) => [...prevHistory, page])
    }

    // Update the position to the end
    setHistoryPosition((prev) => prev + 1)
    // Update active page
    setActivePage(page)

    console.log("Navigation: Going to", page)
  }

  // Navigate back in history
  const handleNavigateBack = () => {
    if (historyPosition > 0) {
      const newPosition = historyPosition - 1
      const previousPage = navigationHistory[newPosition]
      setHistoryPosition(newPosition)
      setActivePage(previousPage)
      console.log("Navigation: Going back to", previousPage)
    }
  }

  // Navigate forward in history
  const handleNavigateForward = () => {
    if (historyPosition < navigationHistory.length - 1) {
      const newPosition = historyPosition + 1
      const nextPage = navigationHistory[newPosition]
      setHistoryPosition(newPosition)
      setActivePage(nextPage)
      console.log("Navigation: Going forward to", nextPage)
    }
  }

  // For debugging
  useEffect(() => {
    console.log("Current History:", navigationHistory)
    console.log("Current Position:", historyPosition)
    console.log("Active Page:", activePage)
  }, [navigationHistory, historyPosition, activePage])

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard activePage={activePage} onPageChange={handlePageChange} />
      case "companies":
        return <Companies />
      case "students":
        return <Students />
      case "internships":
        return <Internships />
      case "internship-cycle":
        return <InternshipCycle />
      case "evaluations":
        return <Evaluations />
      case "statistics":
        return <Statistics />
      case "workshops":
        return <Workshops />
      case "appointments":
        return <Appointments />
      case "my-appointments":
        return <MyAppointments />
      default:
        // Fallback to Dashboard, ensure onPageChange is available if Dashboard uses it.
        return <Dashboard activePage={activePage} onPageChange={handlePageChange} />
    }
  }

  return (
    <NotificationsProvider>
      <div className="scad-container">
        <Sidebar activePage={activePage} onPageChange={handlePageChange} />
        <div className="scad-content">
          <Header
            onRequestAppointment={() => handlePageChange("appointments")}
            onShowMyAppointments={() => handlePageChange("my-appointments")}
            onInternshipCycleClick={() => handlePageChange("internship-cycle")}
            onStatisticsClick={() => handlePageChange("statistics")}
            onNavigateBack={handleNavigateBack}
            onNavigateForward={handleNavigateForward}
            canGoBack={historyPosition > 0}
            canGoForward={historyPosition < navigationHistory.length - 1}
          />
          <main className="scad-main">{renderPage()}</main>
        </div>
      </div>
    </NotificationsProvider>
  )
}

export default SCAD
