import { createTheme } from '@mui/material/styles';

export default function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
    },
  });
} 