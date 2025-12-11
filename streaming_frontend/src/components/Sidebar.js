import React from 'react';
import './sidebar.css';

/**
// PUBLIC_INTERFACE
// Sidebar contains search input and simple filtering controls.
// Props:
// - query, setQuery
// - filters: { genre, sort }, setFilters
*/
export default function Sidebar({ query, setQuery, filters, setFilters }) {
  const onChange = (e) => setQuery(e.target.value);

  const setGenre = (e) => setFilters((f) => ({ ...f, genre: e.target.value }));
  const setSort = (e) => setFilters((f) => ({ ...f, sort: e.target.value }));

  return (
    <aside className="sf-sidebar">
      <div className="sf-sidebar__section">
        <label htmlFor="search">Search</label>
        <input id="search" value={query} onChange={onChange} placeholder="Search videos..." />
      </div>

      <div className="sf-sidebar__section">
        <label htmlFor="genre">Genre</label>
        <select id="genre" value={filters.genre} onChange={setGenre}>
          <option value="">All</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="documentary">Documentary</option>
        </select>
      </div>

      <div className="sf-sidebar__section">
        <label htmlFor="sort">Sort</label>
        <select id="sort" value={filters.sort} onChange={setSort}>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="title">Title</option>
        </select>
      </div>
    </aside>
  );
}
