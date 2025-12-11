import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Browse from './pages/Browse';
import VideoDetail from './pages/VideoDetail';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import './App.css';

/**
// PUBLIC_INTERFACE
// App entry sets up routing and AuthProvider.
// Routes:
// - / (Browse, public)
// - /videos/:id (Detail, protected to ensure cookie presence for streaming)
// - /history (protected)
// - /login, /register (public)
*/
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Browse />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/videos/:id" element={<VideoDetail />} />
            <Route path="/history" element={<History />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div className="container" style={{ padding: 24 }}>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
