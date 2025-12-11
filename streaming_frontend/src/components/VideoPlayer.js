import React, { useEffect, useRef, useState } from 'react';
import api from '../api/client';
import './videoplayer.css';

/**
// PUBLIC_INTERFACE
// VideoPlayer streams video from /videos/stream/:id and reports watch progress to /users/history.
// Props: id (string), title (string)
*/
export default function VideoPlayer({ id, title }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [quarterSent, setQuarterSent] = useState(false);
  const [finished, setFinished] = useState(false);

  // Construct stream URL using baseURL from axios client
  const baseURL = (api && api.defaults && api.defaults.baseURL) || process.env.REACT_APP_API_BASE || '';
  const src = `${baseURL.replace(/\/+$/, '')}/videos/stream/${encodeURIComponent(id)}`;

  // Helper to post progress events
  const postProgress = async (status) => {
    try {
      await api.post('/users/history', {
        video_id: id,
        status,
        title,
      });
    } catch (e) {
      // fail silently to not interrupt playback
      // console.debug('history post failed', e?.response?.status);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => {
      if (!started) {
        setStarted(true);
        postProgress('start');
      }
    };
    const onTimeUpdate = () => {
      if (!quarterSent && v.duration && v.currentTime / v.duration >= 0.25) {
        setQuarterSent(true);
        postProgress('25%');
      }
    };
    const onEnded = () => {
      if (!finished) {
        setFinished(true);
        postProgress('finish');
      }
    };

    v.addEventListener('play', onPlay);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', onEnded);

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', onEnded);
    };
  }, [id, started, quarterSent, finished]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="sf-player">
      <video
        ref={videoRef}
        className="sf-player__video"
        src={src}
        controls
        // withCredentials for <video> is implicit via cookie; ensure same-origin by absolute URL with axios baseURL.
        crossOrigin="use-credentials"
      />
      {title && <div className="sf-player__title">{title}</div>}
    </div>
  );
}
