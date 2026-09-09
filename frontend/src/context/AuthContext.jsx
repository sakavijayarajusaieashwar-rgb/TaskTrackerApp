/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../api/authApi.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('jwttoken'))
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('todoUser') || 'null'))

  const login = async (email, password) => {
    const response = await loginUser(email, password)
    localStorage.setItem('jwttoken', response.token)
    const nextUser = { userName: response.userName, email: response.email }
    localStorage.setItem('todoUser', JSON.stringify(nextUser))
    setToken(response.token)
    setUser(nextUser)
    return response
  }

  const register = (userName, email, password) => registerUser(userName, email, password)

  const logout = () => {
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('todoUser')
    setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ token, user, login, logout, register }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
