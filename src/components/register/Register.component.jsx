import { useState } from "react"
import { User } from "lucide-react"
import "./Register.styls.scss"

// Custom Input Component
const CustomInput = ({ type, placeholder, name, value, onChange, className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`custom-input ${className}`}
      {...props}
    />
  )
}

// Custom Button Component
const CustomButton = ({ children, onClick, className = "", ...props }) => {
  return (
    <button onClick={onClick} className={`custom-button ${className}`} {...props}>
      {children}
    </button>
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

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    phone: "",
    injuryType: "",
    handicap: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    // בדיקת תקינות פרטים
    const isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      /^\d{9}$/.test(formData.id) &&
      /^\d{10}$/.test(formData.phone) &&
      formData.injuryType.trim() !== "" &&
      formData.handicap >= 0 &&
      formData.handicap <= 100

    if (!isValid) {
      alert("אנא מלא/י את כל הפרטים בצורה תקינה")
      return
    }

    // שליחה לשרת רק אם הכל תקין
    try {
      const response = await fetch("http://localhost:5000/api/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert("הפרטים עודכנו בהצלחה!")
      } else {
        alert(data.error || "אירעה שגיאה בעדכון")
      }
    } catch (error) {
      console.error("שגיאה:", error)
      alert("שגיאה בחיבור לשרת")
    }
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Glassmorphic Card */}
        <div className="register-card">
          {/* User Icon */}
          <div className="user-icon-container">
            <div className="user-icon">
              <User className="user-icon-svg" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <div className="register-title">
            <h2 className="title-text">פרטים אישיים</h2>
          </div>

          {/* Form Fields */}
          <div className="form-fields">
            <div className="form-group">
              <CustomLabel htmlFor="firstName">שם פרטי</CustomLabel>
              <CustomInput
                type="text"
                placeholder="שם פרטי"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <CustomLabel htmlFor="lastName">שם משפחה</CustomLabel>
              <CustomInput
                type="text"
                placeholder="שם משפחה"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <CustomLabel htmlFor="id">תעודת זהות</CustomLabel>
              <CustomInput type="text" placeholder="תעודת זהות" name="id" value={formData.id} onChange={handleChange} />
            </div>

            <div className="form-group">
              <CustomLabel htmlFor="phone">טלפון</CustomLabel>
              <CustomInput
                type="text"
                placeholder="טלפון"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <CustomLabel htmlFor="injuryType">סוג פציעה</CustomLabel>
              <CustomInput
                type="text"
                placeholder="סוג פציעה"
                name="injuryType"
                value={formData.injuryType}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <CustomLabel htmlFor="handicap">אחוזי נכות</CustomLabel>
              <CustomInput
                type="number"
                placeholder="אחוזי נכות"
                name="handicap"
                value={formData.handicap}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <CustomButton onClick={handleSubmit}>עדכון</CustomButton>
        </div>
      </div>
    </div>
  )
}
