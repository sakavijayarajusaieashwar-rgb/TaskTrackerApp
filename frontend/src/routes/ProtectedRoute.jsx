import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = () => {
  return Cookies.get('jwttoken') ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
