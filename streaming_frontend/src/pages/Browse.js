import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import '../components/header.css';
import '../components/sidebar.css';
import '../components/videocard.css';
import './browse.css';

/**
// PUBLIC_INTERFACE
// Browse page - list videos with search and filters, responsive grid.
*/
export default function Browse() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ genre: '', sort: 'newest' });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useMemo(() => {
    const p = {};
    if (query) p.q = query;
    if (filters.genre) p.genre = filters.genre;
    if (filters.sort) p.sort = filters.sort;
    return p;
  }, [query, filters]);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/videos', { params });
        if (!cancel) setVideos(Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : []);
      } catch {
        if (!cancel) setVideos([]);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [params]);

  return (
    <div className="sf-layout">
      <Header />
      <div className="sf-content">
        <Sidebar query={query} setQuery={setQuery} filters={filters} setFilters={setFilters} />
        <main className="sf-main">
          {loading ? (
            <div className="muted">Loading...</div>
          ) : (
            <div className="sf-grid">
              {videos.map(v => <VideoCard key={v.id} video={v} />)}
              {!videos.length && <div className="muted">No results.</div>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
