import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#9a0036',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f5f5f7',
      paper: alpha('#ffffff', 0.9)
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `
            radial-gradient(circle at 100% 0%, ${alpha('#42a5f5', 0.1)} 0%, transparent 25%),
            radial-gradient(circle at 0% 100%, ${alpha('#1976d2', 0.15)} 0%, transparent 25%)
          `,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundImage: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 24px ${alpha('#000000', 0.12)}`
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${alpha('#000000', 0.08)}`
        }
      }
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h6: {
      fontWeight: 600
    },
    subtitle1: {
      fontWeight: 500
    }
  },
  shadows: [
    'none',
    `0 2px 4px ${alpha('#000000', 0.08)}`,
    `0 4px 8px ${alpha('#000000', 0.12)}`,
    // ... outros níveis de sombra
  ]
});

export default theme; 