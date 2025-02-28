import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocationProvider } from './contexts/LocationContext';
import Dashboard from './components/Dashboard';
import getTheme from './theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <ThemeProvider theme={getTheme('light')}>
          <Dashboard />
        </ThemeProvider>
      </LocationProvider>
    </QueryClientProvider>
  );
} 