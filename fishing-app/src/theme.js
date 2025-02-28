import { createTheme, alpha } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#60a5fa' : '#1976d2',
    },
    background: {
      default: mode === 'dark' ? '#0f172a' : '#f5f5f7',
      paper: mode === 'dark' ? alpha('#1e293b', 0.9) : alpha('#ffffff', 0.9)
    }
  }
});

export default getTheme; 