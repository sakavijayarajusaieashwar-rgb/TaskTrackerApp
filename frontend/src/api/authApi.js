import { apiRequest } from './axiosInstance.js'

export const registerUser = (userName, email, password) => apiRequest('/users/register', {
  method: 'POST',
  body: JSON.stringify({ userName, email, password })
})

export const loginUser = (email, password) => apiRequest('/users/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
