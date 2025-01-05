"use server";

import { ActionResponse } from "@/type/types"; // Adjust the import based on your project structure
import { z } from "zod";
import db from "@/lib/prisma"; // Adjust the import based on your project structure
import { revalidatePath } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { getHeaderData } from "@/app/utils/getHeaderData";
import { getIPUserInformation } from "@/app/utils/ipinfo";

export async function newPackageRequest(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const locale = await getLocale();
  const t = await getTranslations({
    namespace: "errors",
    locale,
  });

  const messages = await getTranslations({
    namespace: "messages",
    locale,
  });

  // Define the schema for package request validation
  const packageRequestSchema = z.object({
    name: z.string().min(2, t("nameRequired")), // Ensure name is at least 2 characters
    phone: z.string().min(10, t("phoneRequired")).max(15, t("phoneTooLong")), // Validate phone number length
    serviceType: z.string().min(1, t("serviceTypeRequired")), // Ensure service type is selected
  });

  // Validate the form data
  const validation = packageRequestSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    serviceType: formData.get("serviceType"),
  });

  // Handle validation errors
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors[0].message, // Return the first validation error message
    };
  }

  const { ipAddress } = await getHeaderData();
  const userLocation = await getIPUserInformation(ipAddress);
  console.log("from server:", { userLocation, ipAddress });

  // Prepare the package request data
  const packageRequestData = {
    name: validation.data.name,
    phone: validation.data.phone,
    request: validation.data.serviceType,
    ip: userLocation.ip || "", // You can get the IP address from the request headers or a service
    country: userLocation.country || "", // You can use a service like ipinfo.io to get the country
    city: userLocation.city || "", // Same as above
    latitude: userLocation.latitude.toString() || "", // Same as above
    longitude: userLocation.longitude.toString() || "", // Same as above
  };
  console.log(packageRequestData);

  try {
    // Save the package request to the database
    await db.packageRequest.create({
      data: packageRequestData, // Pass the flat object directly
    });

    // Revalidate the pricing page (optional)
    revalidatePath("/pricing");

    return {
      success: true,
      message: messages("packageRequestAdded"), // Success message
    };
  } catch (error) {
    console.error("Error saving package request:", error);
    return {
      success: false,
      message: t("unexpectedError"), // Generic error message
    };
  }
}
