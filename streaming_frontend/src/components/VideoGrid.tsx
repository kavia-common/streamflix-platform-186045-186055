import React from "react";
import type { Video } from "../types";
import { VideoCard } from "./VideoCard";

type Props = {
  videos: Video[];
  onSelect: (v: Video) => void;
};

// PUBLIC_INTERFACE
export function VideoGrid({ videos, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} onClick={() => onSelect(v)} />
      ))}
    </div>
  );
}
