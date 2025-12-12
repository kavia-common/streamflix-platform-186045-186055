export type ID = string;

export type User = {
  id: ID;
  email: string;
};

export type Video = {
  id: ID;
  title: string;
  description?: string | null;
  posterUrl?: string | null;
  durationSeconds?: number | null;
  genre?: string | null;
  year?: number | null;
};

export type HistoryItem = {
  id: ID;
  video: Video;
  lastPositionSeconds?: number | null;
  completed?: boolean | null;
  updatedAt?: string | null;
};
