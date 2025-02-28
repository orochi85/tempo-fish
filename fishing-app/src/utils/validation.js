export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove tags HTML
    .slice(0, 1000); // Limita tamanho
};

export const validateCoordinates = (lat, lon) => {
  const isValidLat = typeof lat === 'number' && lat >= -90 && lat <= 90;
  const isValidLon = typeof lon === 'number' && lon >= -180 && lon <= 180;
  return isValidLat && isValidLon;
};

export const validateCity = (cityName) => {
  if (typeof cityName !== 'string') return false;
  return /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(cityName);
}; 