const env = {
  production: import.meta.env.PROD,
  mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN,
  weatherApiKey: import.meta.env.VITE_WEATHER_API_KEY || '',
};

export default env; 