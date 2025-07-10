import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { LoginForm, RegisterForm } from "./components/AuthForm";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskCalendar from "./components/TaskCalendar";
import "./App.css";
import "./components/Navbar.css";
import "./components/AuthForm.css";
import "./components/Task.css";
import "./components/Calendar.css";
import logo from "./logo.svg";
import axios from "axios";

// Adjust the backend URL as needed:
const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// PUBLIC_INTERFACE
function App() {
  // Auth, User, Tasks, CRUD state
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [authError, setAuthError] = useState("");
  const [taskError, setTaskError] = useState("");
  const [refresh, setRefresh] = useState(0); // trigger re-fetch after CRUD

  // Theme handler (light/dark mode)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Simulated token storage (in-memory). Use real JWT/cookie in production.
  const [token, setToken] = useState(null);

  // Fetch tasks for user
  useEffect(() => {
    if (!token) {
      setTasks([]);
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks || []);
      } catch {
        setTasks([]);
      }
    })();
  }, [token, refresh]);

  // Login handler
  const handleLogin = async (username, password) => {
    setAuthError("");
    try {
      const res = await axios.post(`${API_BASE}/login`, { username, password });
      setUser(res.data.user);
      setToken(res.data.token);
    } catch (e) {
      setAuthError("Invalid login credentials.");
    }
  };

  // Registration handler
  const handleRegister = async (username, password) => {
    setAuthError("");
    try {
      const res = await axios.post(`${API_BASE}/register`, { username, password });
      setUser(res.data.user);
      setToken(res.data.token);
    } catch (e) {
      setAuthError("Unable to register account. Try a different username.");
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setTasks([]);
    setSelectedTask(null);
  };

  // Task CRUD handlers
  const handleTaskCreate = async (data) => {
    setTaskError("");
    try {
      await axios.post(`${API_BASE}/tasks`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedTask(null);
      setRefresh(r => r + 1);
    } catch {
      setTaskError("Could not create task.");
    }
  };
  const handleTaskEdit = async (data) => {
    setTaskError("");
    try {
      await axios.put(`${API_BASE}/tasks/${selectedTask.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedTask(null);
      setRefresh(r => r + 1);
    } catch {
      setTaskError("Could not update task.");
    }
  };
  const handleTaskDelete = async (taskId) => {
    setTaskError("");
    try {
      await axios.delete(`${API_BASE}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedTask(null);
      setRefresh(r => r + 1);
    } catch {
      setTaskError("Could not delete task.");
    }
  };
  const handleTaskComplete = async (taskId, completed) => {
    setTaskError("");
    try {
      await axios.patch(`${API_BASE}/tasks/${taskId}`, { completed }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefresh(r => r + 1);
    } catch {
      setTaskError("Failed to complete task.");
    }
  };

  // Calendar: filter tasks by selected day
  const [calendarFilter, setCalendarFilter] = useState(null);
  const filteredTasks = calendarFilter
    ? tasks.filter(
        t =>
          t.due_date &&
          new Date(t.due_date).toISOString().slice(0, 10) ===
            calendarFilter
      )
    : tasks;

  // Main App router and views
  return (
    <Router>
      <div className="App">
        <header>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <Navbar user={user} onLogout={handleLogout} />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/tasks" replace /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <LoginForm onLogin={handleLogin} error={authError} />
                )
              }
            />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/tasks" replace />
                ) : (
                  <RegisterForm onRegister={handleRegister} error={authError} />
                )
              }
            />
            <Route
              path="/tasks"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <div>
                    <section>
                      <h1 style={{ textAlign: "center" }}>Your Tasks</h1>
                      {taskError && (
                        <div className="form-error" style={{ margin: "0 auto", maxWidth: 500 }}>
                          {taskError}
                        </div>
                      )}
                      <TaskForm
                        key={selectedTask ? selectedTask.id : "new"}
                        initialTask={selectedTask}
                        onSubmit={selectedTask ? handleTaskEdit : handleTaskCreate}
                        onCancel={selectedTask ? () => setSelectedTask(null) : null}
                      />
                      <TaskList
                        tasks={filteredTasks}
                        onEdit={task => setSelectedTask(task)}
                        onDelete={handleTaskDelete}
                        onToggleComplete={handleTaskComplete}
                      />
                      <div style={{ margin: "2rem auto", maxWidth: 500 }}>
                        <button
                          className="btn"
                          style={{ float: "right" }}
                          onClick={() => {
                            setCalendarFilter(null);
                          }}
                        >
                          Show All Tasks
                        </button>
                      </div>
                    </section>
                  </div>
                )
              }
            />
            <Route
              path="/calendar"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <TaskCalendar
                    tasks={tasks}
                    onSelectDate={dateStr => {
                      setCalendarFilter(dateStr);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  />
                )
              }
            />
            <Route
              path="*"
              element={<h2 style={{ margin: "3em auto", textAlign: "center" }}>Page not found</h2>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
