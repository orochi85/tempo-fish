import { Card, CardContent, Typography, Box, Alert, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../services/weatherService';
import { useLocation } from '../contexts/LocationContext';
import { FishOutlined, Warning } from '@mui/icons-material';

function FishingConditions() {
  const { location } = useLocation();
  const { data: weather } = useQuery({
    queryKey: ['weather', location.lat, location.lon],
    queryFn: () => getWeather(location.lat, location.lon)
  });

  const calculateFishingScore = () => {
    if (!weather) return 0;
    
    let score = 50; // pontuação base

    // Ajusta baseado na velocidade do vento
    if (weather.wind.speed < 5) score += 20;
    else if (weather.wind.speed > 10) score -= 20;

    // Ajusta baseado na temperatura
    if (weather.main.temp >= 20 && weather.main.temp <= 28) score += 15;
    else if (weather.main.temp < 15 || weather.main.temp > 30) score -= 15;

    // Ajusta baseado na pressão atmosférica
    if (weather.main.pressure >= 1010 && weather.main.pressure <= 1020) score += 15;

    return Math.min(Math.max(score, 0), 100); // mantém entre 0 e 100
  };

  const getFishingConditionText = (score) => {
    if (score >= 80) return 'Excelentes condições para pesca!';
    if (score >= 60) return 'Boas condições para pesca';
    if (score >= 40) return 'Condições moderadas para pesca';
    return 'Condições desfavoráveis para pesca';
  };

  const score = calculateFishingScore();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <FishOutlined sx={{ mr: 1 }} />
          Condições para Pesca
        </Typography>

        <Box sx={{ mt: 3, mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={score} 
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                backgroundColor: score > 60 ? 'success.main' : score > 40 ? 'warning.main' : 'error.main',
              },
            }}
          />
        </Box>

        <Typography variant="h6" align="center" gutterBottom>
          {score}% Favorável
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          {getFishingConditionText(score)}
        </Typography>

        {weather && weather.wind.speed > 10 && (
          <Alert severity="warning" icon={<Warning />}>
            Ventos fortes podem afetar a pesca ({weather.wind.speed} m/s)
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default FishingConditions; 