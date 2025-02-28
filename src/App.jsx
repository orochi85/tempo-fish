import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import getTheme from './theme';

function App() {
  const [mode, setMode] = useState('light');
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1100
          }}
        >
          <ThemeToggle 
            isDark={mode === 'dark'} 
            onToggle={() => setMode(mode === 'light' ? 'dark' : 'light')}
          />
        </Box>
        <Dashboard />
      </Box>
    </ThemeProvider>
  );
}

export default App;
