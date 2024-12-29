"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

export  function SignInButton() {
    const t =  useTranslations("login");
    const handleLogin = async () => {
      await signIn("google");
    };
  
    return (
      <form
        action={handleLogin}
      >
        <Button
          variant={"outline"}
          type="submit"
          className="text-sm font-normal font-tajawalLight"
        >
          {t("login")}
        </Button>
      </form>
    );
  }