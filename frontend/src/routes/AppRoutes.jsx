import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import App from '../App.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />} />
        <Route path="/page" element={<App />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
