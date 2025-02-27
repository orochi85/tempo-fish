import { Box, Typography, CircularProgress } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../contexts/LocationContext';
import env from '../config/env';

function UVIndex() {
  const { location } = useLocation();
  const currentHour = new Date().getHours();
  const isDayTime = currentHour >= 6 && currentHour < 18; // Entre 6h e 18h

  const { data, isLoading } = useQuery({
    queryKey: ['uv', location.lat, location.lon],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/uvi?lat=${location.lat}&lon=${location.lon}&appid=${env.weatherApiKey}`
        );
        const data = await response.json();
        return { uvIndex: isDayTime ? data.value : 0 };
      } catch (error) {
        console.error('Erro ao buscar índice UV:', error);
        // Cálculo aproximado baseado na hora do dia e latitude
        const baseUV = isDayTime ? Math.abs(Math.cos(location.lat * Math.PI / 180) * 10) : 0;
        const hourFactor = currentHour >= 10 && currentHour <= 14 ? 1 : 0.5;
        return { uvIndex: Math.round(baseUV * hourFactor) };
      }
    },
    enabled: !!location.lat && !!location.lon,
    refetchInterval: 1000 * 60 * 30, // Atualiza a cada 30 minutos
    staleTime: 1000 * 60 * 15 // Considera dados frescos por 15 minutos
  });

  const getUVLevel = (index) => {
    if (!isDayTime) return { level: 'Noite', color: '#1a237e', advice: 'Sem exposição UV durante a noite' };
    if (index <= 2) return { level: 'Baixo', color: '#3CB371', advice: 'Pode ficar ao ar livre com segurança' };
    if (index <= 5) return { level: 'Moderado', color: '#FFD700', advice: 'Use protetor solar e chapéu' };
    if (index <= 7) return { level: 'Alto', color: '#FFA500', advice: 'Evite exposição entre 10h e 16h' };
    if (index <= 10) return { level: 'Muito Alto', color: '#FF4500', advice: 'Procure sombra e use proteção' };
    return { level: 'Extremo', color: '#800080', advice: 'Evite sair ao ar livre se possível' };
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  const uvInfo = getUVLevel(data?.uvIndex || 0);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mb: 2 
      }}>
        <WbSunny sx={{ 
          color: uvInfo.color,
          animation: isDayTime ? 'pulse 2s infinite' : 'none',
          '@keyframes pulse': {
            '0%': { opacity: 0.6 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0.6 }
          }
        }} />
        <Typography variant="h6">
          Índice UV
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: uvInfo.color,
            fontWeight: 'bold'
          }}
        >
          {data?.uvIndex.toFixed(1) || 0}
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            {uvInfo.level}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {uvInfo.advice}
          </Typography>
          {!isDayTime && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, fontStyle: 'italic' }}>
              Medição noturna - UV mínimo
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default UVIndex; 