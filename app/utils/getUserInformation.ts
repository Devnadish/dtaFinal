import axios, { AxiosError } from "axios";

// Default user information in case of failures
const DEFAULT_USER_INFO = {
  ip: "",
  city: "Unknown",
  region: "Unknown",
  country: "Unknown",
  country_code: "XX",
  latitude: 0,
  longitude: 0,
  timezone: "UTC",
};

// Cache for IP lookups (lasts for current session)
const ipCache = new Map<string, { data: typeof DEFAULT_USER_INFO; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

// IP geolocation service configuration
const IP_SERVICES = [
  {
    name: "ipwho.is",
    url: (ip: string) => `https://ipwho.is/${ip}`,
    transform: (data: any) => ({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      country_code: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    }),
    timeout: 5000,
  },
  {
    name: "ipapi.co",
    url: (ip: string) => `https://ipapi.co/${ip}/json/`,
    transform: (data: any) => data,
    timeout: 6000,
  },
  {
    name: "ipwhois.app",
    url: (ip: string) => `https://ipwhois.app/json/${ip}`,
    transform: (data: any) => ({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      country_code: data.country_code,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    }),
    timeout: 6000,
  },
];

const isValidIP = (ip: string): boolean => {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

const MAX_RETRIES = 2;

export const getUserInformation = async (ipAddress: string, userAgent: string) => {
  try {
    // Check cache first
    const now = Date.now();
    const cachedData = ipCache.get(ipAddress);
    if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    // Validate or fetch the client's IP
    if (!isValidIP(ipAddress)) {
      try {
        const response = await axios.get("https://api.ipify.org?format=json", { timeout: 2000 });
        ipAddress = response.data.ip;
      } catch (error) {
        console.error("Failed to fetch client IP:", error);
        return DEFAULT_USER_INFO;
      }
    }

    // Try each service in sequence
    for (const service of IP_SERVICES) {
      let attempts = 0;
      while (attempts < MAX_RETRIES) {
        try {
          const response = await axios.get(service.url(ipAddress), {
            headers: { "User-Agent": userAgent },
            timeout: service.timeout,
          });

          if (response.status === 429) {
            console.warn(`Rate limited by ${service.name}, trying next service...`);
            break;
          }

          const userInfo = service.transform(response.data);
          if (userInfo.ip && userInfo.country) {
            ipCache.set(ipAddress, { data: userInfo, timestamp: now });
            return userInfo;
          }
        } catch (error) {
          const axiosError = error as AxiosError;

          // Handle specific errors
          if (axiosError.code === "ECONNABORTED" || axiosError.message === "This operation was aborted") {
            console.warn(`Request to ${service.name} aborted, retrying...`);
          } else if (axiosError.response?.status === 429 || axiosError.response?.status === 403) {
            console.warn(`Rate limited or forbidden by ${service.name}, trying next service...`);
            break;
          } else {
            console.error(`Error with ${service.name}:`, axiosError.message);
          }

          attempts++;
        }

        // Add a small delay before retrying
        if (attempts < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }
  } catch (error) {
    console.error("Unexpected error in getUserInformation:", error);
  }

  return DEFAULT_USER_INFO;
};