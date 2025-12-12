import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Video } from "../types";
import { api, getVideoStreamUrl } from "../lib/api";

type Props = {
  video: Video;
  onClose: () => void;
};

// PUBLIC_INTERFACE
export function PlayerModal({ video, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [lastPos, setLastPos] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  const streamUrl = useMemo(() => {
    // Prefer backend-provided URL (already includes /videos/{id}/stream and correct host).
    // Fallback to building from VITE_API_BASE_URL.
    return video.streamUrl || getVideoStreamUrl(video.id);
  }, [video.id, video.streamUrl]);

  useEffect(() => {
    // Close on ESC
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function persistHistory(progressSeconds: number) {
    // Best-effort: backend may reject if unauthenticated; we don't block the player.
    setSaving(true);
    try {
      await api.upsertHistory({
        videoId: video.id,
        progressSeconds,
      });
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Play ${video.title}`}
      onMouseDown={(e) => {
        // Click outside closes
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-950">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <div className="min-w-0">
            <div className="truncate text-sm font-bold text-slate-900 dark:text-white">{video.title}</div>
            <div className="truncate text-xs text-slate-600 dark:text-slate-300">
              {saving ? "Saving progress…" : "Watching"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="sf-button-secondary"
              onClick={async () => {
                await persistHistory(Math.floor(lastPos));
                onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>

        <div className="bg-black">
          <video
            ref={videoRef}
            className="h-auto w-full"
            controls
            autoPlay
            playsInline
            src={streamUrl}
            onTimeUpdate={() => {
              const el = videoRef.current;
              if (!el) return;
              setLastPos(el.currentTime || 0);
            }}
            onEnded={async () => {
              // Mark completion as "end of video" by setting progress to duration if known,
              // otherwise keep current position.
              const fallback = Math.floor(lastPos);
              const duration = typeof videoRef.current?.duration === "number" ? videoRef.current?.duration : undefined;
              const progress = duration && Number.isFinite(duration) ? Math.floor(duration) : fallback;
              await persistHistory(progress);
            }}
          />
        </div>

        {video.description ? (
          <div className="px-4 py-4 text-sm text-slate-700 dark:text-slate-200">{video.description}</div>
        ) : null}
      </div>
    </div>
  );
}
