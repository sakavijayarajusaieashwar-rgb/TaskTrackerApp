import { useState } from 'react'
import Button from '../components/Button.jsx'
import InputField from '../components/InputField.jsx'
import TaskCard from '../components/TaskCard.jsx'
import useTasks from '../hooks/useTasks.js'

const emptyForm = { taskHeading: '', taskDescription: '', isCompleted: false }

const TaskListPage = () => {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitTask = async (event) => {
    event.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      if (editingId) {
        await editTask(editingId, form)
      } else {
        await addTask(form)
      }
      setForm(emptyForm)
      setEditingId(null)
    } catch (requestError) {
      setFormError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (task) => {
    setEditingId(task._id)
    setForm({
      taskHeading: task.taskHeading,
      taskDescription: task.taskDescription,
      isCompleted: task.isCompleted
    })
  }

  const toggleTask = (task) => editTask(task._id, { isCompleted: !task.isCompleted })

  return (
    <main className="page-shell">
      <section className="page-heading">
        <p className="eyebrow">Your workspace</p>
        <h1>Keep small promises to yourself.</h1>
        <p>{tasks.filter((task) => !task.isCompleted).length} tasks still in motion.</p>
      </section>

      <form className="task-form" onSubmit={submitTask}>
        <h2>{editingId ? 'Edit task' : 'Add a task'}</h2>
        <InputField label="Task heading" name="taskHeading" value={form.taskHeading} onChange={updateField} required />
        <InputField label="Description" name="taskDescription" value={form.taskDescription} onChange={updateField} required />
        {formError && <p className="error-message">{formError}</p>}
        <div className="form-actions">
          <Button type="submit" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Save changes' : 'Add task'}</Button>
          {editingId && <Button type="button" variant="secondary" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancel</Button>}
        </div>
      </form>

      {loading && <p className="state-message">Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && tasks.length === 0 && <p className="state-message">No tasks yet. Add your first one above.</p>}
      <section className="task-list" aria-label="Tasks">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={startEdit} onDelete={removeTask} onToggle={toggleTask} />
        ))}
      </section>
    </main>
  )
}

export default TaskListPage
