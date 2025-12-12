import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="sf-card p-6">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Register</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Create an account to track your progress.</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            try {
              await register(email, password);
              navigate("/", { replace: true });
            } catch (err) {
              setError(err instanceof Error ? err.message : "Registration failed");
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
            <input className="sf-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength={6} required />
            <div className="text-xs text-slate-500 dark:text-slate-400">Use at least 6 characters.</div>
          </div>

          {error ? <div className="text-sm text-red-600 dark:text-red-400">{error}</div> : null}

          <button className="sf-button w-full" disabled={loading} type="submit">
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Already have an account? <Link className="sf-link" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
