"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X, Settings, MessageCircle, FileText, LogOut } from "lucide-react"
import Register from "../register/Register.component"
import FileManager from "../files/Files.compounent"
import "./Responsive-App-Bar.styls.scss"
import ChatBot from "../chat-bot/Chat-Bot.component"

const drawerWidth = 240

const NAV_ITEMS = [
  { label: "פרטי משתמש", icon: <Settings className="nav-icon" />, component: "register" },
  { label: "התכתבות", icon: <MessageCircle className="nav-icon" />, component: "chat" },
  { label: "קבצים", icon: <FileText className="nav-icon" />, component: "files" },
]

function ResponsiveDrawerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selected, setSelected] = useState("התכתבות")
  const [chats, setChats] = useState([[{ text: "שלום! איך אפשר לעזור?", sender: "bot" }]])
  const [currentChatIndex, setCurrentChatIndex] = useState(0)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("auth_token")
    // Redirect to login page
    navigate("/")
  }

  const drawer = (
    <div className="drawer-content">
      <div className="nav-logo">
        <img src="/placeholder.svg?height=60&width=150" alt="Logo" className="nav-logo-image" />
      </div>
      <div className="divider"></div>
      <nav className="nav-list">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`nav-item-button ${selected === item.label ? "nav-item-selected" : ""}`}
            onClick={() => {
              setSelected(item.label)
              if (window.innerWidth < 600) setMobileOpen(false)
            }}
          >
            <div className="nav-item-content">
              <span className="nav-item-text">{item.label}</span>
              <span className="nav-item-icon">{item.icon}</span>
            </div>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <span className="logout-text">התנתק</span>
          <LogOut className="logout-icon" />
        </button>
      </div>
    </div>
  )

  const renderContent = () => {
    const selectedItem = NAV_ITEMS.find((item) => item.label === selected)
    if (!selectedItem) return <div className="content-placeholder">בחר פריט מהתפריט</div>

    switch (selectedItem.component) {
      case "register":
        return <Register />
      case "chat":
        return (
          <ChatBot
            chats={chats}
            setChats={setChats}
            currentChatIndex={currentChatIndex}
            setCurrentChatIndex={setCurrentChatIndex}
          />
        )
      case "files":
        return <FileManager />
      default:
        return <div className="content-placeholder">תוכן לא נמצא</div>
    }
  }

  return (
    <div className="dashboard-root">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button className="menu-button" onClick={handleDrawerToggle}>
          <Menu className="menu-icon" />
        </button>
        <h1 className="mobile-title">AIdForce - לוח בקרה</h1>
      </div>

      {/* Navigation */}
      <nav className="nav-container">
        {/* Desktop Drawer */}
        <div className="drawer-permanent">{drawer}</div>

        {/* Mobile Drawer */}
        <div className={`drawer-temporary ${mobileOpen ? "drawer-open" : ""}`}>
          <div className="drawer-backdrop" onClick={handleDrawerToggle}></div>
          <div className="drawer-paper">
            <button className="close-button" onClick={handleDrawerToggle}>
              <X className="close-icon" />
            </button>
            {drawer}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">{renderContent()}</main>
    </div>
  )
}

export default ResponsiveDrawerLayout
