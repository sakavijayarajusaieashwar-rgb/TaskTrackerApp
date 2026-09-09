import Button from './Button.jsx'

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => (
  <article className={`task-card ${task.isCompleted ? 'task-complete' : ''}`}>
    <div className="task-card-top">
      <h2>{task.taskHeading}</h2>
      <div className="task-actions">
        <Button onClick={() => onEdit(task)} variant="secondary">Edit</Button>
        <Button onClick={() => onDelete(task._id)} variant="danger">Delete</Button>
      </div>
    </div>
    <p>{task.taskDescription}</p>
    <label className="status-toggle">
      <input type="checkbox" checked={Boolean(task.isCompleted)} onChange={() => onToggle(task)} />
      <span>{task.isCompleted ? 'Completed' : 'Mark complete'}</span>
    </label>
  </article>
)

export default TaskCard
