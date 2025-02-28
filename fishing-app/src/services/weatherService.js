import axios from 'axios';

const API_KEY = '600a0f362f4d58a845afab7f24a58544';

export const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'pt_br'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    return null;
  }
}; 