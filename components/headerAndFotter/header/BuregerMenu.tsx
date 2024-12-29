"use client";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useLocale, useTranslations } from "next-intl";

import MenuItems from "./MenuItems";
import Typography from "@/components/Text";

export default function BuregerMenu() {
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  
  return (
    <Sheet>
      <SheetTrigger
        className="rounded-full md:hidden w-[50px] h-[50px] flex items-center justify-center text-foreground flex-col"
        aria-label="Open menu"
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        forceMount
        side="right"
        className="w-72 flex flex-col items-center gap-4"
      >
        <SheetHeader className="w-full justify-center items-center">
        <SheetTitle className="hidden">menu</SheetTitle>
          <Typography variant="h2"   locale={locale}>
            {t("welcomeMsg")}
          </Typography>
          <Typography 
            variant="p"
            className={`w-full ${locale === "ar" ? "text-right" : "text-left"} text-pretty text-muted-foreground`}
            locale={locale}
          >
            {t("welcomeDesction")}
          </Typography>
        </SheetHeader>
        <div className="w-full flex flex-col items-center justify-center gap-4 border-t border-border pt-4">
          <MenuItems />
        </div>
      </SheetContent>
    </Sheet>
  );
}

const MenuIcon = React.memo(() => {
  return (
    <div className="w-[30px] h-[30px] bg-orangeColor/50 rounded-md flex items-center justify-around flex-col p-1">
      <div className="w-full h-[4px] bg-blueColor rounded-md" />
      <div className="w-full h-[4px] bg-blueColor rounded-md" />
      <div className="w-full h-[4px] bg-blueColor rounded-md" />
    </div>
  );
});

MenuIcon.displayName = "MenuIcon";
