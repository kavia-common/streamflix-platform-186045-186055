import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from ?? "/";

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="sf-card p-6">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Login</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Sign in to view your watch history and keep progress synced.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            try {
              await login(email, password);
              navigate(redirectTo, { replace: true });
            } catch (err) {
              setError(err instanceof Error ? err.message : "Login failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Email</label>
            <input className="sf-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Password</label>
            <input className="sf-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>

          {error ? <div className="text-sm text-red-600 dark:text-red-400">{error}</div> : null}

          <button className="sf-button w-full" disabled={loading} type="submit">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Don’t have an account? <Link className="sf-link" to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
