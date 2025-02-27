import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { LocationOn, WavingHand } from '@mui/icons-material';

function WelcomeDialog({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const handleRequestLocation = () => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onClose({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
        setError('Não foi possível obter sua localização. Por favor, permita o acesso ou busque sua cidade manualmente.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  return (
    <Dialog
      open={true}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WavingHand color="primary" />
        <Typography variant="h5">{getGreeting()}, Pescador!</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography paragraph>
          Bem-vindo ao seu assistente de pesca! Para fornecer as melhores previsões
          e informações sobre condições de pesca, precisamos da sua localização.
        </Typography>
        <Typography paragraph>
          Você pode permitir o acesso à sua localização atual ou buscar manualmente
          sua cidade depois.
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={() => onClose(null)}
          color="inherit"
        >
          Buscar Manualmente
        </Button>
        <Button
          onClick={handleRequestLocation}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LocationOn />}
          disabled={loading}
        >
          Usar Minha Localização
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WelcomeDialog; 