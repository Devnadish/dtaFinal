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
  longitude: 0
};

// Cache the geolocation lookup
export const getGeoLocation = cache(async (ip: string): Promise<GeoLocation> => {
  if (!ip || ip === "" || ip === "127.0.0.1") {
    return DEFAULT_LOCATION;
  }

  try {
    // Clean the IP address
    const cleanIp = ip.split(',')[0].trim().replace(/^::ffff:/, '');
    
    // Use ipapi.co as it's free and doesn't require API key for low volume
    const response = await fetch(`https://ipapi.co/${cleanIp}/json/`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Geolocation API error:', response.statusText);
      return DEFAULT_LOCATION;
    }

    const data = await response.json();
    
    return {
      city: data.city || 'Unknown',
      country: data.country_name || 'Unknown',
      latitude: data.latitude || 0,
      longitude: data.longitude || 0
    };
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return DEFAULT_LOCATION;
  }
});