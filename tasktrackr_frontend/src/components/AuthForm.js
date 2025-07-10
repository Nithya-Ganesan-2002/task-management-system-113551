import React, { useState } from "react";

// PUBLIC_INTERFACE
export function LoginForm({ onLogin, error }) {
  /**
   * Basic login form allowing users to enter credentials.
   * @param {function} onLogin - Called with (username, password).
   * @param {string} error - Error message.
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="auth-form-container">
      <h2>Sign In</h2>
      <form onSubmit={e => {e.preventDefault(); onLogin(username, password);}}>
        <input
          type="text" placeholder="Username" autoFocus
          value={username} onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-large">Login</button>
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}

// PUBLIC_INTERFACE
export function RegisterForm({ onRegister, error }) {
  /**
   * Registration form for creating a new account.
   * @param {function} onRegister - Called with (username, password).
   * @param {string} error - Error message.
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="auth-form-container">
      <h2>Create Account</h2>
      <form onSubmit={e => {e.preventDefault(); onRegister(username, password);}}>
        <input
          type="text"
          placeholder="Username"
          value={username} onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-large">Register</button>
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}
