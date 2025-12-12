import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { cn } from "../lib/utils";

// PUBLIC_INTERFACE
export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-success" />
          <div className="text-base font800 font-bold tracking-tight">StreamFlix</div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
              )
            }
          >
            Browse
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
              )
            }
          >
            History
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="sf-button-secondary" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? "Dark" : "Light"}
          </button>

          {user ? (
            <>
              <div className="hidden text-sm text-slate-600 dark:text-slate-300 sm:block">{user.email}</div>
              <button
                type="button"
                className="sf-button-secondary"
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="sf-button-secondary" to="/login">
                Login
              </Link>
              <Link className="sf-button" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
