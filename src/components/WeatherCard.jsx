import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { WbSunny, Cloud, Opacity, Air } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from "../services/weatherService";
import { useLocation } from "../contexts/LocationContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function WeatherCard() {
  const { location } = useLocation();
  
  const { data, isLoading } = useQuery({
    queryKey: ['weather', location.lat, location.lon],
    queryFn: () => getWeather(location.lat, location.lon)
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WbSunny />
          Condições do Tempo
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h4" gutterBottom>
            {Math.round(data?.main?.temp)}°C
          </Typography>

          <Typography variant="body1" color="text.secondary" gutterBottom>
            {format(new Date(data?.dt * 1000), "EEEE, d 'de' MMMM", { locale: ptBR })}
          </Typography>

          <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Cloud />
              <Typography>
                Nuvens: {data?.clouds?.all}%
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Opacity />
              <Typography>
                Umidade: {data?.main?.humidity}%
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Air />
              <Typography>
                Vento: {Math.round(data?.wind?.speed * 3.6)} km/h
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WeatherCard; 