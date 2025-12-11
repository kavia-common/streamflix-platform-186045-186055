import axios from 'axios';

/**
 * Axios API client configured for cookie-based auth.
 * - baseURL is read from REACT_APP_API_BASE (configure via .env).
 * - withCredentials ensures cookies are sent for auth.
 * - Global interceptors handle JSON responses and simple error passing.
 */

// PUBLIC_INTERFACE
export const createApiClient = () => {
  /** Create a configured axios instance. */
  const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:3001';
  const client = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Forward the error so callers can handle based on status code
      return Promise.reject(error);
    }
  );

  return client;
};

const api = createApiClient();

export default api;
