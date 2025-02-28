import axios from 'axios';

export const getWinds = async (lat, lon) => {
  const response = await axios.get(`/api/winds?lat=${lat}&lon=${lon}`);
  return response.data;
}; 