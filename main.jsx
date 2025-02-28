import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocationProvider } from './contexts/LocationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Opcional: ajuste as opções padrão
    },
  },
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