export type ID = number;

export type User = {
  id: ID;
  email: string;
};

export type Video = {
  id: ID;
  title: string;
  description: string;
  tags: string; // comma-separated
  durationSeconds?: number | null;
  contentType: string;
  streamUrl: string; // absolute URL returned by backend (proxy-aware if backend trusts proxy headers)
};

export type HistoryItem = {
  video: Video;
  progressSeconds: number;
};
