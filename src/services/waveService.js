import axios from 'axios';

export const getWaves = async (lat, lon) => {
  const response = await axios.get(`/api/waves?lat=${lat}&lon=${lon}`);
  return response.data;
}; 