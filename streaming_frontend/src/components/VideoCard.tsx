import React from "react";
import type { Video } from "../types";
import { cn } from "../lib/utils";

type Props = {
  video: Video;
  onClick?: () => void;
  subtitle?: string;
};

// PUBLIC_INTERFACE
export function VideoCard({ video, onClick, subtitle }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "sf-card group w-full overflow-hidden text-left",
        onClick ? "cursor-pointer" : "cursor-default",
      )}
    >
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-brand-primary/10 to-slate-100 dark:to-slate-900">
        {video.posterUrl ? (
          <img src={video.posterUrl} alt={video.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-lg bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
              No poster
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1 p-4">
        <div className="line-clamp-1 text-sm font-bold text-slate-900 dark:text-white">{video.title}</div>
        <div className="line-clamp-2 text-xs text-slate-600 dark:text-slate-300">
          {subtitle ?? video.description ?? "—"}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {video.genre ? (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {video.genre}
            </span>
          ) : null}
          {video.year ? (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {video.year}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
