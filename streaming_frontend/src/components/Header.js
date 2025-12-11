import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './header.css';

/**
// PUBLIC_INTERFACE
// Header shows app brand, navigation links, and auth actions.
*/
export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sf-header">
      <div className="sf-header__left">
        <Link to="/" className="sf-brand">StreamFlix</Link>
        <nav className="sf-nav">
          <Link to="/">Browse</Link>
          {user && <Link to="/history">History</Link>}
        </nav>
      </div>
      <div className="sf-header__right">
        {user ? (
          <>
            <span className="sf-user">Hi, {user.name || user.email}</span>
            <button className="btn" onClick={logout} aria-label="Logout">Logout</button>
          </>
        ) : (
          <>
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn btn-secondary" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
