import { Card, CardContent, Typography, Box } from '@mui/material';
import { WbTwilight } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../services/weatherService';
import { useLocation } from '../contexts/LocationContext';

function SolunarCard() {
  const { location } = useLocation();
  const { data } = useQuery({
    queryKey: ['weather', location.lat, location.lon],
    queryFn: () => getWeather(location.lat, location.lon)
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Horários Solares
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WbTwilight sx={{ mr: 1 }} />
            <Typography>
              Nascer do Sol: {data ? new Date(data.sys.sunrise * 1000).toLocaleTimeString() : '--:--'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WbTwilight sx={{ mr: 1 }} />
            <Typography>
              Pôr do Sol: {data ? new Date(data.sys.sunset * 1000).toLocaleTimeString() : '--:--'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SolunarCard; 