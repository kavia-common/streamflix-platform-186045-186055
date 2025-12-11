import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../api/client';
import '../components/header.css';

/**
// PUBLIC_INTERFACE
// History page - displays user's watch history.
*/
export default function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/users/history');
        if (!cancel) setItems(Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : []);
      } catch {
        if (!cancel) setItems([]);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <div className="sf-layout">
      <Header />
      <main className="container" style={{ padding: 16 }}>
        <h1>Watch History</h1>
        {loading ? (
          <div>Loading...</div>
        ) : items.length ? (
          <ul>
            {items.map((it, idx) => (
              <li key={idx}>
                <strong>{it.title || it.video_title || it.video_id}</strong> — {it.status} — {new Date(it.created_at || it.timestamp || Date.now()).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <div className="muted">No history yet.</div>
        )}
      </main>
    </div>
  );
}
