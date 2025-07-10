import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar({ user, onLogout }) {
  /** Navbar with links for authentication and tasks.*/
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <span role="img" aria-label="logo">✅</span> TaskTrackr
      </div>
      <div className="navbar__links">
        <Link to="/tasks" className="navbar__link">Tasks</Link>
        {user && (
          <Link to="/calendar" className="navbar__link">Calendar</Link>
        )}
      </div>
      <div className="navbar__user">
        {user ? (
          <>
            <span className="navbar__username">Hello, {user.username}</span>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
