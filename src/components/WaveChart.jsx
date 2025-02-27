import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

function WaveChart() {
  const data = {
    labels: ['00h', '03h', '06h', '09h', '12h', '15h', '18h', '21h'],
    datasets: [
      {
        label: 'Altura das Ondas (m)',
        data: [1.2, 1.5, 1.8, 1.6, 1.4, 1.3, 1.5, 1.7],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Previsão de Ondas
        </Typography>
        <div style={{ height: '300px' }}>
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

export default WaveChart; 