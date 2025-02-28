import { Card, CardContent, Typography, Box, CircularProgress, Paper, IconButton, Tooltip } from '@mui/material';
import { WaterOutlined, ArrowUpward, ArrowDownward, Info } from '@mui/icons-material';
import { format, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useQuery } from '@tanstack/react-query';

function TidesCard() {
  const [selectedTide, setSelectedTide] = useState(null);
  const { location } = useLocation();
  
  const generateTidesData = (lat, lon) => {
    const baseTime = new Date();
    const latitudeEffect = Math.sin(Math.abs(lat) * Math.PI / 90) * 2;
    const longitudeOffset = (lon / 15) * 60;
    
    const dayOfYear = Math.floor((baseTime - new Date(baseTime.getFullYear(), 0, 0)) / 86400000);
    const lunarPhase = (dayOfYear % 29.5) / 29.5;
    
    const baseCoefficient = 70 + Math.sin(lunarPhase * 2 * Math.PI) * 20;
    
    const tides = [];
    for (let i = 0; i < 4; i++) {
      const hourOffset = i * 6 + (longitudeOffset / 60);
      const time = addHours(baseTime, hourOffset);
      const isHigh = i % 2 === 0;
      
      const height = isHigh 
        ? 1.0 + latitudeEffect + (lunarPhase * 0.5)
        : 0.2 + (latitudeEffect * 0.3);
      
      tides.push({
        time,
        height: Math.max(0.1, height),
        type: isHigh ? 'high' : 'low',
        moonPhase: lunarPhase < 0.5 ? 'Crescente' : 'Minguante',
        coefficient: Math.round(baseCoefficient + (isHigh ? 10 : -10))
      });
    }
    
    return tides;
  };

  const { data: tides, isLoading, refetch } = useQuery({
    queryKey: ['tides', location.lat, location.lon],
    queryFn: () => generateTidesData(location.lat, location.lon),
    enabled: Boolean(location.lat && location.lon)
  });

  useEffect(() => {
    if (location.lat && location.lon) {
      refetch();
    }
  }, [location.lat, location.lon, refetch]);

  const getTideIcon = (type) => {
    return type === 'high' ? (
      <ArrowUpward color="primary" />
    ) : (
      <ArrowDownward color="error" />
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WaterOutlined />
          Tábua de Marés
          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
            {location.cityName}
          </Typography>
        </Typography>

        <Box sx={{ mt: 2 }}>
          {tides?.map((tide, index) => (
            <Paper
              key={index}
              elevation={selectedTide === index ? 3 : 1}
              sx={{
                mb: 2,
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: selectedTide === index ? 'primary.light' : 'background.paper',
                color: selectedTide === index ? 'white' : 'text.primary'
              }}
              onClick={() => setSelectedTide(index)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getTideIcon(tide.type)}
                <Box>
                  <Typography variant="h6">
                    {format(tide.time, "HH:mm", { locale: ptBR })}
                  </Typography>
                  <Typography variant="body2" color={selectedTide === index ? 'inherit' : 'text.secondary'}>
                    {tide.height.toFixed(1)}m
                  </Typography>
                </Box>
              </Box>
              
              <Tooltip title={`Coeficiente de Maré: ${tide.coefficient}%`}>
                <IconButton size="small" color={selectedTide === index ? 'inherit' : 'primary'}>
                  <Info />
                </IconButton>
              </Tooltip>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default TidesCard; 