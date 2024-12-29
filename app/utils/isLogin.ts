import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function isLogin() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return session;
}
