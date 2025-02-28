import { Box } from '@mui/material';

function Logo() {
  return (
    <Box
      component="img"
      src="https://i.postimg.cc/nM7grsSG/tempo-fish.png"
      alt="TempoFish Logo"
      sx={{
        width: '100%',
        maxWidth: '280px',
        height: 'auto',
        objectFit: 'contain',
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
          filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))'
        }
      }}
    />
  );
}

export default Logo; 