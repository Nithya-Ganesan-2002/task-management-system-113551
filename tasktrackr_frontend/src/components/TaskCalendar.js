import React from "react";
import { format, parseISO, isSameDay } from "date-fns";

// PUBLIC_INTERFACE
function TaskCalendar({ tasks, onSelectDate }) {
  /**
   * Renders a basic calendar grid showing which days have tasks.
   * Clicking a date calls onSelectDate(dateString).
   */
  // For simplicity, just show the current month.
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Get all due dates this month as strings.
  const daysWithTasks = tasks
    .filter(task => !!task.due_date && new Date(task.due_date).getMonth() === currentMonth)
    .map(task => format(parseISO(task.due_date), "yyyy-MM-dd"));

  // Calculate first day (weekday) of the month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Days header
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const rows = [];
  let cells = [];

  // Fill blank cells to first weekday
  for (let i = 0; i < firstDay; i++) {
    cells.push(<td key={`empty-${i}`}></td>);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = format(new Date(currentYear, currentMonth, day), "yyyy-MM-dd");
    const hasTasks = daysWithTasks.includes(dateStr);
    cells.push(
      <td
        key={dateStr}
        className={`calendar-cell${hasTasks ? " has-task" : ""}`}
        onClick={() => hasTasks && onSelectDate(dateStr)}
        tabIndex={hasTasks ? 0 : -1}
        aria-label={hasTasks ? `One or more tasks due on ${dateStr}` : `No tasks due`}
      >
        <span className="calendar-day">{day}</span>
        {hasTasks && <span className="calendar-dot"></span>}
      </td>
    );
    // Wrap weeks
    if ((cells.length) % 7 === 0) {
      rows.push(<tr key={`weekrow-${day}`}>{cells}</tr>);
      cells = [];
    }
  }
  // Fill final row with blanks if needed
  if (cells.length) {
    while (cells.length < 7) cells.push(<td key={`empty-end${cells.length}`}></td>);
    rows.push(<tr key="lastrow">{cells}</tr>);
  }

  return (
    <div className="calendar-container">
      <h3>
        {now.toLocaleString("default", { month: "long" })} {currentYear}
      </h3>
      <table className="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map(dw => <th key={dw}>{dw}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <div className="calendar-hint">
        <span className="calendar-dot"></span> indicates days with tasks
      </div>
    </div>
  );
}

export default TaskCalendar;
