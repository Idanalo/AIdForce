
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../../components/login/Login.component"

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Check if user is authenticated (you can replace this with your actual auth check)
  useEffect(() => {
    // For demo purposes, we'll check localStorage
    const token = localStorage.getItem("auth_token")
    if (token) {
      setIsAuthenticated(true)
      navigate("/dashboard")
    }
  }, [navigate])

  // Handle successful login
  const handleLoginSuccess = (token) => {
    localStorage.setItem("auth_token", token)
    setIsAuthenticated(true)
    navigate("/dashboard")
  }

  return (
    <div className="home-container">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  )
}

export default Home
