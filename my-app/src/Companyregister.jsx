import React, { useState } from 'react';
import './Companyregister.css';

const Companyregister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    industry: '',
    companySize: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const [logo, setLogo] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({
    companyName: '',
    companyEmail: '',
    industry: '',
    companySize: '',
    logo: '',
    documents: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }));
        return;
      }
      setLogo(file);
      setErrors(prev => ({ ...prev, logo: '' }));
    }
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.type.match('application/pdf') || 
      file.type.match('image.*') ||
      file.type.match('application/msword') ||
      file.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    );

    if (validFiles.length !== files.length) {
      setErrors(prev => ({ ...prev, documents: 'Please upload only PDF, DOC, DOCX, JPG, or PNG files' }));
    } else {
      setDocuments(prev => [...prev, ...validFiles]);
      setErrors(prev => ({ ...prev, documents: '' }));
    }
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const removeLogo = () => {
    setLogo(null);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      valid = false;
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
      valid = false;
    }

    if (!formData.companySize) {
      newErrors.companySize = 'Please select company size';
      valid = false;
    }

    if (!logo) {
      newErrors.logo = 'Company logo is required';
      valid = false;
    }

    if (documents.length === 0) {
      newErrors.documents = 'At least one verification document is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ ...formData, logo, documents });
      setSuccessMessage('Registration submitted successfully!');
     setFormData({ companyName: '', companyEmail: '', industry: '', companySize: '' });
     setLogo(null);
     setDocuments([]);
    }
  };

  return (
    <div className="company-register-container">
      <div className="register-header">
        <h1>Company Registration</h1>
        <p className="subtitle">Join the SCAD System to post internship opportunities</p>
      </div>

      <div className="register-content">
        <h2>Register Your Company</h2>
        <p className="form-description">Fill in your company details to create an account</p>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={errors.companyName ? 'error' : ''}
              />
              {errors.companyName && <span className="error-message">{errors.companyName}</span>}
            </div>

            <div className="form-group">
              <label>Company Email</label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                className={errors.companyEmail ? 'error' : ''}
              />
              {errors.companyEmail && <span className="error-message">{errors.companyEmail}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={errors.industry ? 'error' : ''}
              >
                <option value="">Select an industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
              </select>
              {errors.industry && <span className="error-message">{errors.industry}</span>}
            </div>

            <div className="form-group">
              <label>Company Size</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className={errors.companySize ? 'error' : ''}
              >
                <option value="">Select company size</option>
                <option value="1-10">Small (50 employees or less) </option>
                <option value="11-50">Meduim (more than 50, ≤ 100 employees)</option>
                <option value="51-200">Large (more than 100, ≤ 500 employees)</option>
                <option value="201-500">Corporate (more than 500 employees)</option>
                
              </select>
              {errors.companySize && <span className="error-message">{errors.companySize}</span>}
            </div>
          </div>

          <div className="form-section">
            <label>Company Logo</label>
            <div className={`file-upload-box ${errors.logo ? 'error-border' : ''}`}>
              {logo ? (
                <div className="uploaded-file">
                  <span>{logo.name}</span>
                  <button type="button" onClick={removeLogo} className="remove-btn">
                    ×
                  </button>
                </div>
              ) : (
                <p className="upload-prompt">Drag and drop a file here, or click to browse</p>
              )}
              <input
                type="file"
                id="logo-upload"
                onChange={handleLogoUpload}
                accept="image/*"
              />
              <label htmlFor="logo-upload" className="upload-btn">
                {logo ? 'Change Logo' : 'Upload Logo'}
              </label>
            </div>
            {errors.logo && <span className="error-message">{errors.logo}</span>}
          </div>

          <div className="form-section">
            <h3>Verification Documents</h3>
            <p>Upload documents that prove your company is legitimate (tax documents, business license, etc.)</p>
            <div className={`file-upload-box ${errors.documents ? 'error-border' : ''}`}>
              {documents.length > 0 ? (
                <div className="uploaded-files">
                  {documents.map((doc, index) => (
                    <div key={index} className="uploaded-file">
                      <span>{doc.name}</span>
                      <button type="button" onClick={() => removeDocument(index)} className="remove-btn">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="upload-prompt">Drag and drop files here, or click to browse</p>
              )}
              <input
                type="file"
                id="document-upload"
                onChange={handleDocumentUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
              />
              <label htmlFor="document-upload" className="upload-btn">
                {documents.length > 0 ? 'Add More Documents' : 'Upload Documents'}
              </label>
            </div>
            {errors.documents && <span className="error-message">{errors.documents}</span>}
          </div>
          <div class="footer-actions">
          <button type="submit" className="submit-btn">Submit Registration</button>
         </div>
         </form>
         {successMessage && <div className="success-message">{successMessage}</div>}

        <p className="login-link">Already registered? <a href="/login">Log in here</a></p>
      </div>
      
    </div>
  );
};

export default Companyregister;