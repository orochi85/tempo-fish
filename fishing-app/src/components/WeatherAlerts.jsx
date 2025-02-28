import { Box, Typography, CircularProgress, Alert, Stack } from '@mui/material';
import { Warning, Info } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../contexts/LocationContext';

function WeatherAlerts() {
  const { location } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ['alerts', location.cityName],
    queryFn: async () => {
      const response = await fetch('https://apiprevmet3.inmet.gov.br/avisos/rss');
      const data = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
      const items = xml.querySelectorAll('item');
      
      return Array.from(items).map(item => ({
        title: item.querySelector('title')?.textContent || '',
        description: item.querySelector('description')?.textContent || '',
        area: item.querySelector('AreaAviso')?.textContent || '',
        severity: item.querySelector('Severidade')?.textContent || '',
        date: new Date(item.querySelector('pubDate')?.textContent || ''),
      })).filter(alert => 
        alert.area.toLowerCase().includes(location.cityName.toLowerCase())
      ).slice(0, 3); // Limita a 3 alertas mais recentes
    }
  });

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'perigo':
        return '#d32f2f';
      case 'perigo potencial':
        return '#ed6c02';
      default:
        return '#2e7d32';
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mb: 2 
      }}>
        <Warning />
        <Typography variant="h6">
          Alertas Meteorológicos
        </Typography>
      </Box>

      {data && data.length > 0 ? (
        <Stack spacing={2}>
          {data.map((alert, index) => (
            <Alert 
              key={index}
              severity={alert.severity.toLowerCase() === 'perigo' ? 'error' : 'warning'}
              icon={<Info />}
              sx={{ 
                '& .MuiAlert-icon': {
                  color: getSeverityColor(alert.severity)
                },
                borderLeft: `4px solid ${getSeverityColor(alert.severity)}`
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {alert.title}
              </Typography>
              <Typography variant="body2">
                {alert.description.split('.')[0]}.
              </Typography>
            </Alert>
          ))}
        </Stack>
      ) : (
        <Alert severity="success">
          Não há alertas ativos para sua região.
        </Alert>
      )}
    </Box>
  );
}

export default WeatherAlerts; 