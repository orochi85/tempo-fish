import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const WeatherCard = ({ date, temperature, description }) => {
  const formattedDate = format(parseISO(date), 'dd/MM/yyyy', { locale: ptBR });

  return (
    <div>
      <h3>{formattedDate}</h3>
      <p>Temperatura: {temperature}°C</p>
      <p>Descrição: {description}</p>
    </div>
  );
};

export default WeatherCard; 