import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    cityName: 'Carregando...',
    lat: 0,
    lon: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  async function getCityNameFromCoords(lat, lon) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      return response.data.address.city || response.data.address.town || 'Localização Desconhecida';
    } catch (error) {
      console.error('Erro ao buscar nome da cidade:', error);
      return 'Localização Desconhecida';
    }
  }

  useEffect(() => {
    async function getUserLocation() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        const { latitude, longitude } = position.coords;
        const cityName = await getCityNameFromCoords(latitude, longitude);
        
        setLocation({
          cityName,
          lat: latitude,
          lon: longitude
        });
      } catch (error) {
        console.log('Erro ou permissão negada:', error);
        // Fallback para São Paulo se não conseguir a localização
        setLocation({
          cityName: 'São Paulo',
          lat: -23.5505,
          lon: -46.6333
        });
      } finally {
        setIsLoading(false);
      }
    }

    getUserLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation, isLoading }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
} 