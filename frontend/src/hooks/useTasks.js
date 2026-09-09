import { useCallback, useEffect, useState } from 'react'
import { createTask, deleteTask, getTasks, updateTask } from '../api/taskApi.js'
import useAuth from './useAuth.js'

const useTasks = () => {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTasks = useCallback(async () => {
    if (!token) {
      setTasks([])
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await getTasks()
      setTasks(Array.isArray(response.tasks) ? response.tasks : [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    const loadTimer = setTimeout(loadTasks, 0)
    return () => clearTimeout(loadTimer)
  }, [loadTasks])

  const runTaskAction = async (action) => {
    setError('')
    try {
      await action()
      await loadTasks()
    } catch (requestError) {
      setError(requestError.message)
      throw requestError
    }
  }

  return {
    tasks,
    loading,
    error,
    addTask: (task) => runTaskAction(() => createTask(task)),
    editTask: (id, task) => runTaskAction(() => updateTask(id, task)),
    removeTask: (id) => runTaskAction(() => deleteTask(id)),
    reloadTasks: loadTasks
  }
}

export default useTasks
