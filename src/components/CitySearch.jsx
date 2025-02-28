import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useLocation } from '../contexts/LocationContext';
import { LocationOn } from '@mui/icons-material';

// Coordenadas reais de algumas cidades principais
const CITY_COORDINATES = {
  'São Paulo': { lat: -23.5505, lon: -46.6333 },
  'Rio de Janeiro': { lat: -22.9068, lon: -43.1729 },
  'Belo Horizonte': { lat: -19.9167, lon: -43.9345 },
  'Salvador': { lat: -12.9714, lon: -38.5014 },
  'Brasília': { lat: -15.7975, lon: -47.8919 },
  'Curitiba': { lat: -25.4284, lon: -49.2733 },
  'Fortaleza': { lat: -3.7172, lon: -38.5433 },
  'Manaus': { lat: -3.1190, lon: -60.0217 },
  'Recife': { lat: -8.0476, lon: -34.8770 },
};

function CitySearch() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const { setLocation } = useLocation();

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        const cidadesFormatadas = response.data.map(city => {
          const cityName = `${city.nome}-${city.microrregiao.mesorregiao.UF.sigla}`;
          const coordinates = CITY_COORDINATES[city.nome] || {
            lat: -23.5505 + (Math.random() - 0.5) * 10, // Coordenadas aleatórias mais próximas de SP
            lon: -46.6333 + (Math.random() - 0.5) * 10
          };

          return {
            ...city,
            searchName: removeDiacritics(cityName).toLowerCase(),
            displayName: cityName,
            lat: coordinates.lat,
            lon: coordinates.lon
          };
        });

        setCities(cidadesFormatadas.sort((a, b) => a.nome.localeCompare(b.nome)));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
        setLoading(false);
      }
    };

    fetchCidades();
  }, []);

  const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Autocomplete
        options={cities}
        loading={loading}
        getOptionLabel={(option) => option.displayName || ''}
        inputValue={inputValue}
        onInputChange={(_, newValue) => setInputValue(newValue)}
        onChange={(_, newValue) => {
          if (newValue) {
            setLocation({
              cityName: newValue.displayName,
              lat: newValue.lat,
              lon: newValue.lon
            });
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar cidade"
            placeholder="Digite o nome da cidade"
            InputProps={{
              ...params.InputProps,
              startAdornment: <LocationOn color="action" />,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
              '& .MuiInputLabel-root': {
                transform: 'translate(14px, 14px) scale(1)',
                '&.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -6px) scale(0.75)',
                },
              },
              '& .MuiAutocomplete-inputRoot': {
                paddingRight: '14px !important',
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
              {option.displayName}
            </Box>
          </Box>
        )}
        noOptionsText="Nenhuma cidade encontrada"
        loadingText="Carregando cidades..."
        sx={{
          '& .MuiAutocomplete-popper': {
            borderRadius: '12px',
          },
        }}
      />
    </Box>
  );
}

export default CitySearch; 