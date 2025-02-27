import axios from 'axios';

const API_KEY = 'a659c18e-b917-4602-8c75-0e3c9e5b2530';

export const getTides = async (lat, lon) => {
  const response = await axios.get(
    `https://www.worldtides.info/api/v2?heights&lat=${lat}&lon=${lon}&key=${API_KEY}`
  );
  return response.data;
}; 