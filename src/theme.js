import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#60a5fa' : '#1976d2',
    },
    background: {
      default: mode === 'dark' ? '#0f172a' : '#f5f5f7',
      paper: mode === 'dark' ? '#1e293b' : '#ffffff'
    }
  }
});

export default getTheme; 