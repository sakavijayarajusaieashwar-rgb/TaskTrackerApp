import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const emptyTask = { taskHeading: '', taskDescription: '' }

const App = () => {
	const navigate = useNavigate()
	const [tasks, setTasks] = useState([])
	const [form, setForm] = useState(emptyTask)
	const [editingId, setEditingId] = useState(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState('')
	const [filter, setFilter] = useState('all')

	const request = async (path, options = {}) => {
		const response = await fetch(`${API_BASE_URL}${path}`, {
			...options,
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('jwttoken')}`, ...options.headers }
		})
		const data = await response.json().catch(() => ({}))
		if (!response.ok) throw new Error(data.message || 'Request failed')
		return data
	}

	const loadTasks = async () => {
		try {
			const data = await request('/tasks')
			setTasks(data.tasks || [])
		} catch (requestError) {
			setError(requestError.message)
		} finally {
			setLoading(false)
		}
	}

	// Load the current user's tasks once when the page opens.
	// eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
	useEffect(() => { loadTasks() }, [])

	const submit = async (event) => {
		event.preventDefault()
		setSaving(true)
		setError('')
		try {
			await request(editingId ? `/tasks/${editingId}` : '/tasks', {
				method: editingId ? 'PUT' : 'POST', body: JSON.stringify(form)
			})
			setForm(emptyTask)
			setEditingId(null)
			await loadTasks()
		} catch (requestError) { setError(requestError.message) }
		finally { setSaving(false) }
	}

	const changeStatus = async (task) => {
		try {
			await request(`/tasks/${task._id}`, { method: 'PUT', body: JSON.stringify({ isCompleted: !task.isCompleted }) })
			await loadTasks()
		} catch (requestError) { setError(requestError.message) }
	}

	const deleteTask = async (id) => {
		try {
			await request(`/tasks/${id}`, { method: 'DELETE' })
			await loadTasks()
		} catch (requestError) { setError(requestError.message) }
	}

	const visibleTasks = tasks.filter((task) => {
		if (filter === 'completed') return task.isCompleted
		if (filter === 'pending') return !task.isCompleted
		return true
	})

	return (
		<main className="page-shell">
			<header className="topbar">
				<div className="brand"><span className="brand-mark">✓</span> Task Manager</div>
				<button className="logout-button" onClick={() => { Cookies.remove('jwttoken'); navigate('/login') }}>Logout</button>
			</header>
			<section className="page-heading">
				<p className="eyebrow">Your workspace</p>
				<h1>Task Manager</h1>
				<p>Stay focused on what needs doing next.</p>
			</section>
			<section className="summary-grid" aria-label="Task summary">
				<div className="summary-card"><span>Total Tasks</span><strong>{tasks.length}</strong></div>
				<div className="summary-card summary-completed"><span>Completed</span><strong>{tasks.filter((task) => task.isCompleted).length}</strong></div>
				<div className="summary-card summary-pending"><span>Pending</span><strong>{tasks.filter((task) => !task.isCompleted).length}</strong></div>
			</section>
			<form className="task-form" onSubmit={submit}>
				<h2>Create a New Task</h2>
				<label>Task Title<input value={form.taskHeading} onChange={(event) => setForm({ ...form, taskHeading: event.target.value })} required /></label>
				<label>Description<textarea rows="4" value={form.taskDescription} onChange={(event) => setForm({ ...form, taskDescription: event.target.value })} required /></label>
				<button className="primary-button" disabled={saving}>{saving ? 'Creating...' : 'Create Task'}</button>
			</form>
			{error && <p className="error-message">{error}</p>}
			<section className="tasks-section">
				<div className="tasks-toolbar">
					<h2>Tasks</h2>
					<div className="filters" aria-label="Task filters">
						{['all', 'pending', 'completed'].map((option) => <button key={option} className={filter === option ? 'filter active' : 'filter'} onClick={() => setFilter(option)}>{option[0].toUpperCase() + option.slice(1)}</button>)}
					</div>
				</div>
				{loading ? <p className="state-message">Loading tasks...</p> : visibleTasks.length === 0 ? <p className="empty-state">No tasks yet. Create your first task.</p> : visibleTasks.map((task) => (
					<article className={`task-card ${task.isCompleted ? 'task-completed' : 'task-pending'}`} key={task._id}>
						<div className="task-content"><div className="task-title-row"><h3>{task.taskHeading}</h3><span className={`status-badge ${task.isCompleted ? 'badge-completed' : 'badge-pending'}`}>{task.isCompleted ? 'COMPLETED' : 'PENDING'}</span></div><p>{task.taskDescription}</p></div>
						<div className="task-actions"><button className="complete-button" onClick={() => changeStatus(task)}>{task.isCompleted ? 'Mark pending' : 'Complete'}</button><button className="edit-button" onClick={() => { setEditingId(task._id); setForm({ taskHeading: task.taskHeading, taskDescription: task.taskDescription }) }}>Edit</button><button className="delete-button" onClick={() => deleteTask(task._id)}>Delete</button></div>
					</article>
				))}
			</section>
			{editingId && (
				<div className="modal-backdrop" onClick={() => { setEditingId(null); setForm(emptyTask) }}>
					<form className="edit-modal" onSubmit={submit} onClick={(event) => event.stopPropagation()}>
						<div className="modal-header">
							<h2>Edit task</h2>
							<button type="button" className="close-button" onClick={() => { setEditingId(null); setForm(emptyTask) }}>×</button>
						</div>
						<label>Task Title<input value={form.taskHeading} onChange={(event) => setForm({ ...form, taskHeading: event.target.value })} required /></label>
						<label>Description<textarea rows="4" value={form.taskDescription} onChange={(event) => setForm({ ...form, taskDescription: event.target.value })} required /></label>
						<button className="primary-button" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
					</form>
				</div>
			)}
		</main>
	)
}

export default App