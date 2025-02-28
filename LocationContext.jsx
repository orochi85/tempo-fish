import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Exemplo de chamada à API usando axios
    axios.get('https://api.example.com/location')
      .then(response => {
        setLocation(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar localização:', error);
      });
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext); 