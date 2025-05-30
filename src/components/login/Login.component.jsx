"use client"

import { useState } from "react"
import { User, Mail, Lock } from "lucide-react"
import "./Login.styls.css"

// Custom Button Component
const CustomButton = ({ children, onClick, className = "", ...props }) => {
  return (
    <button onClick={onClick} className={`custom-button ${className}`} {...props}>
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

// Custom Checkbox Component
const CustomCheckbox = ({ id, checked, onCheckedChange, className = "", ...props }) => {
  return (
    <div className="custom-checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="custom-checkbox-input"
        {...props}
      />
      <div
        className={`custom-checkbox ${checked ? "checked" : ""} ${className}`}
        onClick={() => onCheckedChange(!checked)}
      >
        {checked && (
          <svg className="custom-checkbox-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

function LoginForm({ onLoginSuccess = () => {} }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async () => {
    onLoginSuccess("mock_token_" + Date.now())
    return;
    try {
      const response = await fetch("http://localhost:5000/api/register-or-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // alert(data.message) // הצלחה או התחברות
        // Call the onLoginSuccess callback with a mock token
        onLoginSuccess("mock_token_" + Date.now())
      } else {
        alert(data.error || "אירעה שגיאה")
      }
    } catch (error) {
      console.error("שגיאה ב־fetch:", error)
      alert("שגיאה בחיבור לשרת")
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Glassmorphic Card */}
        <div className="login-card">
          {/* User Icon */}
          <div className="user-icon-container">
            <div className="user-icon">
              <User className="user-icon-svg" strokeWidth={2} />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="welcome-text">
            <h2 className="welcome-title">ברוך הבא</h2>
            <span className="welcome-subtitle">הרשמה / כניסה:</span>
          </div>

          {/* Email Input */}
          <div className="input-group">
            <div className="input-wrapper">
              <div className="input-icon">
                <Mail className="icon-svg" />
              </div>
              <CustomInput
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <div className="input-wrapper">
              <div className="input-icon">
                <Lock className="icon-svg" />
              </div>
              <CustomInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="form-options">
            <div className="remember-me">
              <CustomCheckbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
              <CustomLabel htmlFor="remember">Remember me</CustomLabel>
            </div>
            <button className="forgot-password">Forgot Password?</button>
          </div>

          {/* Login Button */}
          <CustomButton onClick={handleLogin}>LOGIN</CustomButton>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
