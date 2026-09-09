import { Link, useNavigate } from 'react-router-dom'
import Button from './Button.jsx'
import useAuth from '../hooks/useAuth.js'

const Navbar = () => {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link className="brand" to="/">Taskflow</Link>
      {token ? (
        <div className="nav-actions">
          <span>{user?.userName || 'Account'}</span>
          <Button onClick={handleLogout} variant="secondary">Logout</Button>
        </div>
      ) : (
        <div className="nav-actions">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
