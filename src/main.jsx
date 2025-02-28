import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocationProvider } from './contexts/LocationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 30, // 30 minutos
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <App />
      </LocationProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
