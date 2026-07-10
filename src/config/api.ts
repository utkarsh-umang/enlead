/**
 * API base URL for the generated client (see @/client, generated via
 * `npm run generate-client` against the lead-management-system backend's
 * /openapi.json — see main.tsx for where this gets wired to OpenAPI.BASE).
 *
 * Override with VITE_API_BASE_URL when the backend isn't on localhost:8000
 * (e.g. the docker-compose frontend service sets this explicitly).
 */
const raw = import.meta.env.VITE_API_BASE_URL;
export const apiBaseUrl = typeof raw === 'string' && raw.trim() !== '' ? raw.trim() : 'http://localhost:8000';
