import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../contexts/LocationContext';

export default function WeatherAlerts() {
  const { location } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ['weatherAlerts', location.lat, location.lon],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,hourly,daily&appid=600a0f362f4d58a845afab7f24a58544`
      );
      const data = await response.json();
      return data.alerts || [];
    }
  });

  if (isLoading) {
    return (
      <Card sx={{ 
        borderRadius: '16px', 
        background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transform: 'rotate(-2deg)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '16px',
      }}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ff6b6b80 100%)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transform: 'rotate(-2deg)',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '16px',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Warning sx={{ fontSize: '2rem', color: '#ffffff' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            Alertas Meteorológicos
          </Typography>
        </Box>
        {data.length > 0 ? (
          data.map((alert, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                {alert.event}
              </Typography>
              <Typography variant="body1" sx={{ color: '#ffffff' }}>
                {alert.description}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ffffff', mt: 1 }}>
                De: {new Date(alert.start * 1000).toLocaleString()} até {new Date(alert.end * 1000).toLocaleString()}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#ffffff' }}>
            Nenhum alerta meteorológico ativo.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
} 