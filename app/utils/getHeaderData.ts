import { headers } from "next/headers";

export const getHeaderData = async () => {
  console.log("Current Environment:", process.env.NODE_ENV);

  // Access the headers
  const headersList = await headers();

  // Log specific headers
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  console.log("X-Forwarded-For:", forwardedFor);
  console.log("X-Real-IP:", realIp);

  // Retrieve the IP address with the correct order of checks
  let ipAddress;
  if (process.env.NODE_ENV === "development") {
    ipAddress = "168.149.37.35"; // Use the hardcoded IP in development
  } else {
    ipAddress = forwardedFor || realIp || "Not Available"; // Use headers in production
  }

  // Ensure to get the first IP if multiple are present
  ipAddress = ipAddress.split(",")[0].trim();

  console.log("Determined IP Address:", ipAddress);
  return { ipAddress };
};
