import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ userName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://localhost:3000/users/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Registration failed')
      navigate('/login')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">Start simply</p>
        <h1>Create your account</h1>
        <label>Name<input value={form.userName} onChange={(event) => setForm({ ...form, userName: event.target.value })} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
        <p className="form-note">Already registered? <Link to="/login">Log in</Link></p>
      </form>
    </main>
  )
}

export default RegisterPage