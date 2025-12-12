import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="sf-card p-8 text-center">
        <div className="text-lg font-bold text-slate-900 dark:text-white">Page not found</div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          The page you’re looking for doesn’t exist.
        </div>
        <div className="mt-6">
          <Link className="sf-button" to="/">
            Go to Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
