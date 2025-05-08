import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Companyregister.css"; 

export default function CompanyRegister() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [logo, setLogo] = useState(null);
  const [email, setEmail] = useState("");
  const [documents, setDocuments] = useState(null);

  const [companyNameError, setCompanyNameError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [companySizeError, setCompanySizeError] = useState("");
  const [logoError, setLogoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [documentsError, setDocumentsError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;
    setCompanyNameError("");
    setIndustryError("");
    setCompanySizeError("");
    setLogoError("");
    setEmailError("");
    setDocumentsError("");

    if (!companyName) {
      setCompanyNameError("Company name is required.");
      hasError = true;
    }
    if (!industry) {
      setIndustryError("Industry is required.");
      hasError = true;
    }
    if (!companySize) {
      setCompanySizeError("Please select a company size.");
      hasError = true;
    }
    if (!logo) {
      setLogoError("Company logo is required.");
      hasError = true;
    }
    if (!email) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email address format.");
      hasError = true;
    }
    if (!documents) {
      setDocumentsError("Proof of legitimacy is required.");
      hasError = true;
    }

    if (hasError) return;

    console.log("Company Registration Data:", {
      companyName,
      industry,
      companySize,
      logo,
      email,
      documents,
    });

    alert("Registration submitted successfully!");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="company-register-container">
      <div className="registration-box">
        <button className="back-button" onClick={handleBack}>
          <span className="arrow">&#8592;</span> {/* Left arrow symbol */}
        </button>

        <h2>Company Registration</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="input-field"
        />
        {companyNameError && <p className="error-text">{companyNameError}</p>}

        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="input-field"
        />
        {industryError && <p className="error-text">{industryError}</p>}

        <select
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className="select-field"
        >
          <option value="">Select Company Size</option>
          <option value="small">Small (≤ 50 employees)</option>
          <option value="medium">Medium (51 - 100 employees)</option>
          <option value="large">Large (101 - 500 employees)</option>
          <option value="corporate">Corporate (&gt; 500 employees)</option>
        </select>
        {companySizeError && <p className="error-text">{companySizeError}</p>}

        <input
          type="email"
          placeholder="CompanyName@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        {emailError && <p className="error-text">{emailError}</p>}

        <label className="input-label">Upload Company Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          className="input-field"
        />
        {logoError && <p className="error-text">{logoError}</p>}

        <label className="input-label">Upload Proof of Legitimacy</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={(e) => setDocuments(e.target.files[0])}
          className="input-field"
        />
        {documentsError && <p className="error-text">{documentsError}</p>}

        <button className="cta-button" onClick={handleSubmit}>
          Register Company
        </button>
      </div>
    </div>
  );
}
