import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import Header from '../components/Header';
import VideoPlayer from '../components/VideoPlayer';
import '../components/header.css';
import '../components/videoplayer.css';

/**
// PUBLIC_INTERFACE
// VideoDetail page - loads video metadata and plays the stream.
*/
export default function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/videos/${id}`);
        if (!cancel) setVideo(data);
      } catch {
        if (!cancel) setVideo(null);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [id]);

  return (
    <div>
      <Header />
      <div className="container" style={{ padding: 16 }}>
        {loading ? (
          <div>Loading...</div>
        ) : video ? (
          <>
            <h1 style={{ marginTop: 0 }}>{video.title}</h1>
            <VideoPlayer id={id} title={video.title} />
            {video.description && <p style={{ marginTop: 12 }}>{video.description}</p>}
            <div className="muted" style={{ marginTop: 6 }}>
              {video.genre && <>Genre: {video.genre} · </>}
              {video.duration && <>Duration: {Math.round(video.duration / 60)} min</>}
            </div>
          </>
        ) : (
          <div>Not found.</div>
        )}
      </div>
    </div>
  );
}
