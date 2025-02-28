import { IconButton } from '@mui/material';
import { WbSunny, DarkMode } from '@mui/icons-material';

function ThemeToggle({ isDark, onToggle }) {
  return (
    <IconButton
      onClick={onToggle}
      sx={{
        bgcolor: 'background.paper',
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}
    >
      {isDark ? <WbSunny /> : <DarkMode />}
    </IconButton>
  );
}

export default ThemeToggle; 