import { Card, CardContent, Typography, Box, CircularProgress, Grid } from '@mui/material';
import { Air, Navigation } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from '../contexts/LocationContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
  return directions[index];
}

function getBeaufortScale(speed) {
  if (speed < 2) return 'Calmo';
  if (speed < 6) return 'Aragem';
  if (speed < 12) return 'Brisa Leve';
  if (speed < 20) return 'Brisa Fraca';
  if (speed < 29) return 'Brisa Moderada';
  if (speed < 39) return 'Brisa Forte';
  if (speed < 50) return 'Vento Fresco';
  return 'Vento Forte';
}

function WindChart() {
  const { location } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ['wind', location.lat, location.lon],
    queryFn: async () => {
      // Simulando dados de vento por enquanto
      const hours = Array.from({ length: 24 }, (_, i) => i);
      return {
        currentSpeed: Math.round(Math.random() * 20 + 10),
        direction: Math.round(Math.random() * 360),
        hourly: hours.map(hour => ({
          hour: `${hour}:00`,
          speed: Math.round(Math.random() * 20 + 10)
        }))
      };
    }
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

  const chartData = {
    labels: data?.hourly.map(h => h.hour),
    datasets: [
      {
        label: 'Velocidade do Vento (km/h)',
        data: data?.hourly.map(h => h.speed),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'km/h'
        }
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Air />
          Previsão do Vento
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="h4">
              {data?.currentSpeed} km/h
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getBeaufortScale(data?.currentSpeed)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
              <Navigation 
                sx={{ 
                  transform: `rotate(${data?.direction}deg)`,
                  transition: 'transform 0.3s ease'
                }} 
              />
              <Typography>
                {getWindDirection(data?.direction)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ height: 300 }}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default WindChart; 