import React from 'react';
import { Link } from 'react-router-dom';
import './videocard.css';

/**
// PUBLIC_INTERFACE
// VideoCard displays basic video metadata in the grid.
*/
export default function VideoCard({ video }) {
  return (
    <div className="sf-video-card">
      <Link to={`/videos/${video.id}`} className="sf-video-thumb" aria-label={`Open ${video.title}`}>
        {/* Thumbnail placeholder, could be replaced by real thumbnail URL */}
        <div className="thumb">{video.title?.[0]?.toUpperCase() || 'V'}</div>
      </Link>
      <div className="sf-video-meta">
        <h3 className="title">
          <Link to={`/videos/${video.id}`}>{video.title}</Link>
        </h3>
        <div className="muted">{video.genre || 'General'}</div>
      </div>
    </div>
  );
}
