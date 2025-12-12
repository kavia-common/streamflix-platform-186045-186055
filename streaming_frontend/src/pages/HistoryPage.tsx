import React, { useEffect, useState } from "react";
import type { HistoryItem, Video } from "../types";
import { api } from "../lib/api";
import { VideoCard } from "../components/VideoCard";
import { PlayerModal } from "../components/PlayerModal";

// PUBLIC_INTERFACE
export function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Video | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.listHistory();
      setItems(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load history");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="sf-card p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">History</div>
            <div className="text-xs text-slate-600 dark:text-slate-300">Your recent watch activity.</div>
          </div>
          <button className="sf-button-secondary" type="button" onClick={load} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>

      {error ? <div className="mt-4 sf-card p-4 text-sm text-red-600 dark:text-red-400">{error}</div> : null}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <VideoCard
            key={it.id}
            video={it.video}
            subtitle={
              it.completed
                ? "Completed"
                : typeof it.lastPositionSeconds === "number"
                  ? `Last position: ${Math.floor(it.lastPositionSeconds)}s`
                  : "In progress"
            }
            onClick={() => setSelected(it.video)}
          />
        ))}
      </div>

      {!loading && !error && items.length === 0 ? (
        <div className="mt-4 sf-card p-8 text-center">
          <div className="text-sm font-semibold text-slate-900 dark:text-white">No history yet</div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Play something to see it here.</div>
        </div>
      ) : null}

      {selected ? (
        <PlayerModal
          video={selected}
          onClose={() => {
            setSelected(null);
            void load();
          }}
        />
      ) : null}
    </div>
  );
}
