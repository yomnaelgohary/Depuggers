"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import LoginPage from "./LoginPage" // Import the separated LoginPage component
import SCAD from "./SCAD"
import Faculty from "./Faculty"
import ReportView from "./report-view"
import Company from "./Company"
import CompanyRegister from "./Companyregister"
import Student from "./Student"
import ProStudent from "./ProStudent"

// Main App component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-company" element={<CompanyRegister />} />
        <Route path="/SCAD" element={<SCAD />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/report-view/:studentId" element={<ReportView />} />
        <Route path="/company" element={<Company />} />
        <Route path="/student" element={<Student />} />
        <Route path="/prostudent" element={<ProStudent />} />
      </Routes>
    </Router>
  )
}

export default App