import ipinfo from "ipinfo";

export const getIPUserInformation = async (ipAddress: string) => {
  try {
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
    if (!token) {
      throw new Error('NEXT_PUBLIC_IPINFO_TOKEN is not defined');
    }
    const response = await ipinfo(ipAddress, token);

    // Safely handle response.loc
    const [latitude, longitude] = response.loc?.split(",").map(parseFloat) || [0, 0];

    return {
      ip: response.ip,
      city: response.city || "Unknown",
      region: response.region || "Unknown",
      country: response.country || "Unknown",
      country_code: response.countryCode || "XX",
      latitude: latitude,
      longitude: longitude,
      timezone: response.timezone || "UTC",
    };
  } catch (error) {
    console.error("Error fetching IP info:", error);
    return {
      ip: ipAddress,
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
      country_code: "XX",
      latitude: 0,
      longitude: 0,
      timezone: "UTC",
    };
  }
};