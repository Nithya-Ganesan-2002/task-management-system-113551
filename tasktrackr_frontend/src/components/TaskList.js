import React from "react";

// PUBLIC_INTERFACE
function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  /**
   * Renders the main task list with edit/delete/complete controls.
   * @param {Array} tasks - List of task objects.
   * @param {Function} onEdit - Handler(task).
   * @param {Function} onDelete - Handler(taskId).
   * @param {Function} onToggleComplete - Handler(taskId, completed).
   */
  if (!tasks.length) return <div className="task-list-empty">No tasks yet 🎉</div>;
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id}
            className={`task-item${task.completed ? " completed" : ""}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id, !task.completed)}
            aria-label="Complete task"
          />
          <span className="task-title">{task.title}</span>
          {task.due_date && (
            <span className="task-date">
              {new Date(task.due_date).toLocaleDateString()}
            </span>
          )}
          <div className="task-actions">
            <button className="btn btn-edit" onClick={() => onEdit(task)}>Edit</button>
            <button className="btn btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
