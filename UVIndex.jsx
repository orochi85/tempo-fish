import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UVIndex.css';

const UVIndex = ({ lat, lng, alt }) => {
  const [uvIndex, setUVIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUVIndex = async () => {
      try {
        const response = await axios.get('https://api.openuv.io/api/v1/uv', {
          params: {
            lat: lat,
            lng: lng,
            alt: alt,
            dt: new Date().toISOString(), // Data e hora atuais
          },
          headers: {
            'x-access-token': 'openuv-919vrm7oa0xp2-io', // Sua chave de API
          },
        });
        setUVIndex(response.data.result.uv);
      } catch (error) {
        console.error('Erro ao buscar índice UV:', error);
        setError('Erro ao buscar índice UV. Tente novamente mais tarde.');
      }
    };

    fetchUVIndex();
  }, [lat, lng, alt]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="uv-index">
      <h3>Índice UV</h3>
      {uvIndex !== null ? (
        <p>O índice UV atual é: {uvIndex}</p>
      ) : (
        <p>Carregando índice UV...</p>
      )}
    </div>
  );
};

export default UVIndex; 