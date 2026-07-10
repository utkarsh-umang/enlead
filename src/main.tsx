import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from "react-dom/client";
import { OpenAPI } from "./client";
import { apiBaseUrl } from "./config/api";
import App from "./App.tsx";
import "./index.css";

OpenAPI.BASE = apiBaseUrl;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
