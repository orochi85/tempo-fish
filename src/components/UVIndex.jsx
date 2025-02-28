import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../contexts/LocationContext';

function getUVIndexSeverity(uvIndex) {
  if (uvIndex <= 2) return { severity: 'Baixo', color: '#4caf50' }; // Verde
  if (uvIndex <= 5) return { severity: 'Moderado', color: '#ffeb3b' }; // Amarelo
  if (uvIndex <= 7) return { severity: 'Alto', color: '#ff9800' }; // Laranja
  if (uvIndex <= 10) return { severity: 'Muito Alto', color: '#f44336' }; // Vermelho
  return { severity: 'Extremo', color: '#9c27b0' }; // Roxo
}

export default function UVIndex() {
  const { location } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ['uvIndex', location.lat, location.lon],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${location.lat}&lon=${location.lon}&appid=600a0f362f4d58a845afab7f24a58544`
      );
      const data = await response.json();
      return data.value;
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

  const { severity, color } = getUVIndexSeverity(data);

  return (
    <Card sx={{ 
      borderRadius: '16px',
      background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
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
          <WbSunny sx={{ fontSize: '2rem', color: '#ffffff' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            Índice UV
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
          {data?.toFixed(1)}
        </Typography>
        <Typography variant="body1" sx={{ color: '#ffffff', mt: 1 }}>
          {severity}
        </Typography>
        <Typography variant="body1" sx={{ color: '#ffffff', mt: 1 }}>
          {data <= 2
            ? 'Proteção solar não é necessária.'
            : data <= 5
            ? 'Use protetor solar e óculos escuros.'
            : data <= 7
            ? 'Evite exposição prolongada ao sol.'
            : 'Evite sair ao sol no horário de pico.'}
        </Typography>
      </CardContent>
    </Card>
  );
} 