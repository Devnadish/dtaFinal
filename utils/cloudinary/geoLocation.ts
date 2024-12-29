import { cache } from 'react';

interface GeoLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  error?: string;
}

const DEFAULT_LOCATION: GeoLocation = {
  city: 'Unknown',
  country: 'Unknown',
  latitude: 0,
  longitude: 0,
};

// Cache the geolocation fetch to avoid multiple calls
export const getGeoLocation = cache(async (ip: string): Promise<GeoLocation> => {
  if (!ip) {
    console.error('No IP address provided');
    return DEFAULT_LOCATION;
  }

  // Clean the IP address
  const cleanIp = ip.split(',')[0].trim().replace(/^::ffff:/, '');

  // Try multiple geolocation services in order of preference
  const geoServices = [
    {
      url: `https://ipapi.co/${cleanIp}/json/`,
      transform: (data: any) => ({
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
      }),
    },
    {
      url: `https://ipwho.is/${cleanIp}`,
      transform: (data: any) => ({
        city: data.city || 'Unknown',
        country: data.country || 'Unknown',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
      }),
    },
  ];

  for (const service of geoServices) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(service.url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return service.transform(data);

    } catch (error) {
      console.error(`Geolocation service error (${service.url}):`, error);
      // Continue to next service if available
      continue;
    }
  }

  // If all services fail, return default location
  console.error('All geolocation services failed');
  return {
    ...DEFAULT_LOCATION,
    error: 'Failed to fetch location data',
  };
});