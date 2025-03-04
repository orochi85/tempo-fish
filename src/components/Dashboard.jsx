import { Container, Typography, Paper, Grid, Alert, Box, useTheme, alpha } from '@mui/material';
import { useLocation } from '../contexts/LocationContext';
import CitySearch from './CitySearch';
import WeatherCard from './WeatherCard';
import FishingMap from './FishingMap';
import SolunarCard from './SolunarCard';
import TidesCard from './TidesCard';
import WindChart from './WindChart';
import Logo from './Logo';
import { useMemo } from 'react';
import { WavingHand, LocationOn, WbSunny, Brightness3 } from '@mui/icons-material';
import UVIndex from './UVIndex';
import WeatherAlerts from './WeatherAlerts';

function Dashboard() {
  const { location, isLoading } = useLocation();
  const theme = useTheme();

  const welcomeInfo = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        greeting: 'Bom dia',
        message: 'O dia está perfeito para pescar!',
        icon: <WbSunny sx={{ color: '#ffd700' }} />
      };
    }
    if (hour >= 12 && hour < 18) {
      return {
        greeting: 'Boa tarde',
        message: 'Que tal aproveitar para pescar?',
        icon: <WbSunny sx={{ color: '#ff8c00' }} />
      };
    }
    return {
      greeting: 'Boa noite',
      message: 'A pesca noturna está ótima!',
      icon: <Brightness3 sx={{ color: '#4a90e2' }} />
    };
  }, []);

  const cardStyle = {
    background: alpha('#ffffff', 0.98),
    backdropFilter: 'blur(20px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: '1px solid',
    borderColor: alpha('#000000', 0.1),
    boxShadow: 'none',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.005)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#f5f5f7',
      pt: { xs: 1, sm: 2 },
      pb: { xs: 2, sm: 4 }
    }}>
      <Container maxWidth="xl" sx={{ 
        px: { xs: 1, sm: 2, md: 4 },
        height: '100%'
      }}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} md={3}>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12}>
                <Box sx={{ 
                  mb: { xs: 1, sm: 2 },
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  px: { xs: 1, sm: 2 }
                }}>
                  <Logo />
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    background: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    borderRadius: { xs: '12px', sm: '16px' },
                    border: '1px solid',
                    borderColor: alpha('#000000', 0.1),
                    overflow: 'hidden',
                    mb: { xs: 1, sm: 2 }
                  }}
                >
                  <Box sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 0.5, sm: 1 }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      mb: 1
                    }}>
                      <WavingHand sx={{ 
                        color: '#f5a623',
                        animation: 'waving 2s ease-in-out infinite',
                        '@keyframes waving': {
                          '0%': { transform: 'rotate(0deg)' },
                          '25%': { transform: 'rotate(-20deg)' },
                          '75%': { transform: 'rotate(20deg)' },
                          '100%': { transform: 'rotate(0deg)' }
                        }
                      }} />
                      <Typography variant="h5" sx={{ fontWeight: '500' }}>
                        {welcomeInfo.greeting}, Pescador!
                      </Typography>
                      {welcomeInfo.icon}
                    </Box>

                    <Typography variant="body1" sx={{ color: '#666' }}>
                      {welcomeInfo.message}
                    </Typography>

                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1,
                      color: theme.palette.info.main,
                      mt: 1
                    }}>
                      <LocationOn />
                      <Typography>
                        {isLoading ? 'Obtendo sua localização...' : `Você está em ${location.cityName}`}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ 
                  ...cardStyle, 
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <CitySearch />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ 
                  ...cardStyle,
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <SolunarCard />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ 
                  ...cardStyle,
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <TidesCard />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12}>
                <Paper sx={{ 
                  ...cardStyle, 
                  p: { xs: 1, sm: 2 }, 
                  minHeight: { xs: '300px', sm: '400px', md: '500px' },
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <FishingMap />
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Paper sx={{ 
                  ...cardStyle,
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <WeatherCard />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ 
                  ...cardStyle,
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <UVIndex />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ 
                  ...cardStyle,
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <WeatherAlerts />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper sx={{ 
                  ...cardStyle,
                  borderRadius: { xs: '12px', sm: '16px' }
                }}>
                  <WindChart />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 