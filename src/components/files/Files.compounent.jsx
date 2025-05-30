import { useState } from "react"
import { Upload, File, Calendar, Download, Trash2, FileText, Plus, ArrowRight, Search, X } from "lucide-react"
import "./Files.styls.scss"

// Custom Button Component
const CustomButton = ({ children, onClick, className = "", variant = "primary", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`custom-button ${variant === "secondary" ? "custom-button-secondary" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Input Component
const CustomInput = ({ type, placeholder, value, onChange, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`custom-input ${className}`}
      {...props}
    />
  )
}

// Custom Label Component
const CustomLabel = ({ htmlFor, children, className = "", ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`custom-label ${className}`} {...props}>
      {children}
    </label>
  )
}

export default function FileManager() {
  const [documents, setDocuments] = useState([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [documentName, setDocumentName] = useState("")
  const [documentDate, setDocumentDate] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSaveDocument = () => {
    if (!selectedFile || !documentName || !documentDate) {
      alert("אנא מלא את כל השדות")
      return
    }

    const newDocument = {
      id: Date.now(),
      name: documentName,
      date: documentDate,
      file: selectedFile,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
    }

    setDocuments([...documents, newDocument])

    // Reset form
    setDocumentName("")
    setDocumentDate("")
    setSelectedFile(null)
    setShowUploadForm(false)
  }

  const handleDownload = (document) => {
    const url = URL.createObjectURL(document.file)
    const a = document.createElement("a")
    a.href = url
    a.download = document.fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDelete = (documentId) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
    if (showSearch) {
      setSearchQuery("")
    }
  }

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="file-manager-container">
      <div className="file-manager-wrapper">
        {/* Floating Action Buttons */}
        {!showUploadForm && (
          <div className="floating-buttons">
            <button className="floating-add-button" onClick={() => setShowUploadForm(true)} title="הוסף מסמך חדש">
              <Plus className="action-button-icon" />
            </button>
            <button className="floating-search-button" onClick={toggleSearch} title="חפש מסמכים">
              {showSearch ? <X className="action-button-icon" /> : <Search className="action-button-icon" />}
            </button>
          </div>
        )}

        {/* Main Card */}
        <div className="file-manager-card">
          {!showUploadForm ? (
            /* Documents List View */
            <>
              {/* Header */}
              <div className="header-container">
                <div className="file-icon">
                  <FileText className="file-icon-svg" strokeWidth={2} />
                </div>
              </div>

              <div className="welcome-text">
                <h2 className="welcome-title">מנהל קבצים</h2>
                <span className="welcome-subtitle">המסמכים השמורים שלך</span>
              </div>

              {/* Search Bar (Conditional) */}
              {showSearch && (
                <div className="search-section">
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Search className="icon-svg" />
                    </div>
                    <CustomInput
                      type="text"
                      placeholder="חפש מסמכים..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {/* Documents List */}
              <div className="documents-container">
                {filteredDocuments.length > 0 ? (
                  <div className="documents-list">
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="document-item">
                        <div className="document-info">
                          <div className="document-header">
                            <File className="document-icon" />
                            <div className="document-details">
                              <span className="document-name">{doc.name}</span>
                              <span className="document-meta">
                                {doc.date} • {formatFileSize(doc.fileSize)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="document-actions">
                          <button
                            className="action-button download-button"
                            onClick={() => handleDownload(doc)}
                            title="הורד קובץ"
                          >
                            <Download className="action-icon" />
                          </button>
                          <button
                            className="action-button delete-button"
                            onClick={() => handleDelete(doc.id)}
                            title="מחק מסמך"
                          >
                            <Trash2 className="action-icon" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery && documents.length > 0 ? (
                  <div className="no-results">
                    <Search className="no-results-icon" />
                    <span className="no-results-text">לא נמצאו מסמכים</span>
                    <span className="no-results-subtext">נסה לחפש במילים אחרות</span>
                  </div>
                ) : (
                  <div className="empty-state">
                    <FileText className="empty-icon" />
                    <span className="empty-text">אין מסמכים שמורים</span>
                    <span className="empty-subtext">לחץ על הכפתור + כדי להוסיף מסמך ראשון</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Upload Form View */
            <>
              {/* Header with Back Button */}
              <div className="upload-header">
                <button
                  className="back-button"
                  onClick={() => {
                    setShowUploadForm(false)
                    setSelectedFile(null)
                    setDocumentName("")
                    setDocumentDate("")
                  }}
                >
                  <ArrowRight className="back-icon" />
                </button>
                <div className="header-container">
                  <div className="file-icon">
                    <Upload className="file-icon-svg" strokeWidth={2} />
                  </div>
                </div>
              </div>

              <div className="welcome-text">
                <h2 className="welcome-title">העלאת מסמך</h2>
                <span className="welcome-subtitle">הוסף מסמך חדש לאוסף</span>
              </div>

              {/* Upload Section */}
              {!selectedFile ? (
                <div className="upload-section">
                  <input
                    type="file"
                    id="file-input"
                    className="file-input-hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="file-input" className="upload-area">
                    <Upload className="upload-icon" />
                    <span className="upload-text">לחץ כדי להעלות קובץ</span>
                    <span className="upload-subtext">PDF, DOC, TXT, JPG, PNG</span>
                  </label>
                </div>
              ) : (
                /* Upload Form */
                <div className="upload-form">
                  <div className="selected-file">
                    <File className="file-icon-small" />
                    <span>{selectedFile?.name}</span>
                  </div>

                  <div className="input-group">
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <FileText className="icon-svg" />
                      </div>
                      <CustomInput
                        type="text"
                        placeholder="שם המסמך"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <Calendar className="icon-svg" />
                      </div>
                      <CustomInput
                        type="date"
                        placeholder="תאריך הפקת המסמך"
                        value={documentDate}
                        onChange={(e) => setDocumentDate(e.target.value)}
                      />
                    </div>
                    <CustomLabel className="date-label">תאריך הפקת המסמך</CustomLabel>
                  </div>

                  <div className="form-buttons">
                    <CustomButton onClick={handleSaveDocument}>שמור מסמך</CustomButton>
                    <CustomButton
                      variant="secondary"
                      onClick={() => {
                        setSelectedFile(null)
                        setDocumentName("")
                        setDocumentDate("")
                      }}
                    >
                      בחר קובץ אחר
                    </CustomButton>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
