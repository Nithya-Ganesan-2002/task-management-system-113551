import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// PUBLIC_INTERFACE
function TaskForm({ onSubmit, initialTask, onCancel }) {
  /**
   * Task creation/edit form. Facilitates new & edit.
   * @param {Function} onSubmit - Called with task object.
   * @param {Object} initialTask - For editing (optional).
   * @param {Function} onCancel - Cancel handler (optional).
   */
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [dueDate, setDueDate] = useState(initialTask?.due_date ? new Date(initialTask.due_date) : null);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setDueDate(initialTask.due_date ? new Date(initialTask.due_date) : null);
    }
  }, [initialTask]);

  return (
    <form
      className="task-form"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          title,
          description,
          due_date: dueDate ? dueDate.toISOString().slice(0, 10) : null,
        });
      }}
    >
      <input
        type="text"
        value={title}
        autoFocus
        required
        placeholder="Task title"
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        placeholder="Description (optional)"
        rows={3}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      <div className="calendar-row">
        <label>Due Date:</label>
        <DatePicker
          selected={dueDate}
          onChange={setDueDate}
          placeholderText="(optional)"
          className="date-picker"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div className="task-form-buttons">
        <button type="submit" className="btn">{initialTask ? "Update" : "Add"} Task</button>
        {onCancel && (
          <button className="btn btn-cancel" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
