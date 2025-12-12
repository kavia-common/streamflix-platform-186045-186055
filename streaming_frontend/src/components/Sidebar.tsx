import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../lib/utils";

export type BrowseFilters = {
  q: string;
  tag: string;
};

type Props = {
  filters: BrowseFilters;
  onChange: (next: BrowseFilters) => void;
};

// PUBLIC_INTERFACE
export function Sidebar({ filters, onChange }: Props) {
  const [open, setOpen] = useState(true);

  // Simple helper options; backend implements `tag` as a substring match on a comma-separated field.
  const tags = useMemo(() => ["", "Action", "Comedy", "Drama", "Sci-Fi", "Documentary"], []);

  return (
    <aside className="w-full md:w-72">
      <div className="sf-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900 dark:text-white">Explore</div>
          <button
            type="button"
            className="sf-button-secondary px-3 py-1.5 text-xs md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide" : "Show"}
          </button>
        </div>

        <div className={cn("space-y-4", !open && "hidden md:block")}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Search</label>
            <input
              className="sf-input"
              placeholder="Title, description…"
              value={filters.q}
              onChange={(e) => onChange({ ...filters, q: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Tag</label>
            <select
              className="sf-input"
              value={filters.tag}
              onChange={(e) => onChange({ ...filters, tag: e.target.value })}
            >
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t || "All"}
                </option>
              ))}
            </select>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800" />

          <nav className="space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "block rounded-lg px-3 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                )
              }
              end
            >
              Browse
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                cn(
                  "block rounded-lg px-3 py-2 text-sm font-semibold transition",
                  isActive
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                )
              }
            >
              History
            </NavLink>

            <div className="pt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Account</div>

            <Link
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              to="/register"
            >
              Register
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
