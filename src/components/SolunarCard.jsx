import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { WbTwilight } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../contexts/LocationContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function SolunarCard() {
  const { location } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ['solunar', location.lat, location.lon],
    queryFn: async () => {
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${location.lat}&lng=${location.lon}&formatted=0`
      );
      const data = await response.json();
      return data.results;
    }
  });

  if (isLoading) {
    return (
      <Card sx={{ 
        borderRadius: '16px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }
      }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ 
      borderRadius: '16px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
      }
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontWeight: '600',
          color: 'text.primary'
        }}>
          <WbTwilight sx={{ color: 'primary.main' }} />
          Horários Solares
        </Typography>

        <Box sx={{ display: 'grid', gap: 2 }}>
          {[
            { label: 'Nascer do Sol', time: data.sunrise },
            { label: 'Pôr do Sol', time: data.sunset },
            { label: 'Meio-dia Solar', time: data.solar_noon }
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: '12px',
                backgroundColor: 'background.paper',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: '500', color: 'text.primary' }}>
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {format(new Date(item.time), 'HH:mm', { locale: ptBR })}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default SolunarCard; 