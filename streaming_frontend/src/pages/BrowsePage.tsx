import React, { useEffect, useMemo, useState } from "react";
import type { Video } from "../types";
import { api } from "../lib/api";
import { Sidebar, type BrowseFilters } from "../components/Sidebar";
import { VideoGrid } from "../components/VideoGrid";
import { PlayerModal } from "../components/PlayerModal";

function useDebounced<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

// PUBLIC_INTERFACE
export function BrowsePage() {
  const [filters, setFilters] = useState<BrowseFilters>({ q: "", genre: "" });
  const debounced = useDebounced(filters, 250);

  const [videos, setVideos] = useState<Video[]>([]);
  const [selected, setSelected] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emptyState = useMemo(() => !loading && !error && videos.length === 0, [loading, error, videos]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.listVideos({ q: debounced.q, genre: debounced.genre });
        setVideos(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load videos");
      } finally {
        setLoading(false);
      }
    })();
  }, [debounced.genre, debounced.q]);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[18rem_1fr]">
      <Sidebar filters={filters} onChange={setFilters} />

      <main className="space-y-4">
        <div className="sf-card p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Browse</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Search and filter videos, then click to play.
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              {loading ? "Loading…" : `${videos.length} result(s)`}
            </div>
          </div>
        </div>

        {error ? (
          <div className="sf-card p-4 text-sm text-red-600 dark:text-red-400">{error}</div>
        ) : null}

        {emptyState ? (
          <div className="sf-card p-8 text-center">
            <div className="text-sm font-semibold text-slate-900 dark:text-white">No videos found</div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              Try adjusting your search or genre filter.
            </div>
          </div>
        ) : (
          <VideoGrid videos={videos} onSelect={(v) => setSelected(v)} />
        )}
      </main>

      {selected ? <PlayerModal video={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  );
}
