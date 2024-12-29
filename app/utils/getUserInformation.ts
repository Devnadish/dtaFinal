import { UserInformation } from "@/type/types";
import axios, { AxiosError, AxiosResponse } from "axios";

// Default user information in case of failures
const DEFAULT_USER_INFO: UserInformation = {
  ip: "",
  city: "Unknown",
  region: "Unknown",
  country: "Unknown",
  country_code: "XX",
  latitude: 0,
  longitude: 0,
  timezone: "UTC",
};

// In-memory cache for IP lookups (lasts for current session)
const ipCache: Map<string, { data: UserInformation; timestamp: number }> = new Map();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

// Multiple IP geolocation service endpoints with different timeouts and priorities
const IP_SERVICES = [
  {
    url: (ip: string) => `https://ipwho.is/${ip}`, // Faster primary service
    transform: (data: any): UserInformation => ({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      country_code: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    }),
    timeout: 3000,
  },
  {
    url: (ip: string) => `https://ipapi.co/${ip}/json/`,
    transform: (data: any): UserInformation => data,
    timeout: 4000,
  },
  {
    url: (ip: string) => `https://ipwhois.app/json/${ip}`,
    transform: (data: any): UserInformation => ({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      country_code: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    }),
    timeout: 4000,
  }
];

const isValidIP = (ip: string): boolean => {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

const MAX_RETRIES = 2;

export const getUserInformations = async (
  ipAddress: string,
  userAgent: string
): Promise<UserInformation> => {
  // Check cache first
  const now = Date.now();
  const cachedData = ipCache.get(ipAddress);
  if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
    return cachedData.data;
  }

  // If IP is invalid, try to get client's real IP
  if (!isValidIP(ipAddress)) {
    try {
      const response = await axios.get('https://api.ipify.org?format=json', {
        timeout: 2000
      });
      ipAddress = response.data.ip;
    } catch {
      return DEFAULT_USER_INFO;
    }
  }

  // Try each service in sequence
  for (const service of IP_SERVICES) {
    let attempts = 0;
    while (attempts < MAX_RETRIES) {
      try {
        const response = await axios.get(service.url(ipAddress), {
          headers: {
            'User-Agent': userAgent,
          },
          timeout: service.timeout,
        });

        if (response.status === 429) {
          break; // Try next service
        }

        // Transform and validate the response
        const userInfo = service.transform(response.data);
        if (userInfo.ip && userInfo.country) {
          // Cache the successful result
          ipCache.set(ipAddress, { data: userInfo, timestamp: now });
          return userInfo;
        }
      } catch (error) {
        attempts++;
        const axiosError = error as AxiosError;
        
        // If it's a rate limit or forbidden error, move to next service immediately
        if (axiosError.response?.status === 429 || axiosError.response?.status === 403) {
          break;
        }
      }
      
      // Only add delay if we're going to retry
      if (attempts < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  return DEFAULT_USER_INFO;
};