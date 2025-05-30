
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ResponsiveDrawerLayout from "../../components/responsive-app-bar/Responsive-App-Bar.component"

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      // Redirect to login if not authenticated
      navigate("/")
    } else {
      setIsLoading(false)
    }
  }, [navigate])

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return <ResponsiveDrawerLayout />
}

export default Dashboard
