"use server";
import db from "@/lib/prisma";
import { faq } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function GetUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email: email } });
  return user;
}

export async function GetUserById(id: string) {
  const user = await db.user.findUnique({ where: { id } });
  return user;
}

export async function getUserProfile(id: string) {
  const userHistory = await db.user.findUnique({ where: { id } });
  let quastion: faq[] = [];
  if (userHistory?.email) {
    quastion = await db.faq.findMany({
      where: { userEmail: userHistory.email },
    });
  }

  const QuestionsWithAnswers = quastion.filter(
    (Question) => Question.gotAnswer && Question.published && !Question.rejected
  );
  const PendingQuestions = quastion.filter(
    (Question) =>
      !Question.gotAnswer && Question.published && !Question.rejected
  );
  const RejectedQuestions = quastion.filter((Question) => Question.rejected);
  // remian Notifaction,Favorite,Like

  return {
    userHistory,
    quastion,
    QuestionsWithAnswers,
    PendingQuestions,
    RejectedQuestions,
  };
}
// export async function updateUserProfile(id: string, data: { name?: string; mobile?: string }) {
//   const user = await db.user.update({
//     where: { id },
//     data: {
//       ...(data.name && { name: data.name }),
//       ...(data.mobile && { mobile: data.mobile }),
//     },
//   });
  
//   revalidatePath(`/user/${id}`);
//   return user;
// }



// Store OTP codes temporarily (in production, use Redis or similar)
const otpStore = new Map<string, { code: string; expires: Date }>();

export async function sendPhoneVerification(phone: string) {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP with 5-minute expiration
  otpStore.set(phone, {
    code: otp,
    expires: new Date(Date.now() + 5 * 60 * 1000)
  });

  // In production, integrate with SMS service like Twilio
  // For now, just console.log the OTP
  console.log(`OTP for ${phone}: ${otp}`);

  return { success: true };
}

export async function verifyPhone(phone: string, otp: string) {
  const storedOTP = otpStore.get(phone);
  
  if (!storedOTP) {
    throw new Error("No OTP found for this phone number");
  }

  if (new Date() > storedOTP.expires) {
    otpStore.delete(phone);
    throw new Error("OTP has expired");
  }

  if (storedOTP.code !== otp) {
    throw new Error("Invalid OTP");
  }

  // Clear the OTP after successful verification
  otpStore.delete(phone);

  return { success: true };
}

export async function updateUserProfile(id: string, data: { name?: string; mobile?: string; isVerified?: boolean }) {
  const user = await db.user.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.mobile && { mobile: data.mobile }),
      ...(data.isVerified !== undefined && { mobileVerified: data.isVerified }),
    },
  });
  
  revalidatePath(`/user/${id}`);
  return user;
}