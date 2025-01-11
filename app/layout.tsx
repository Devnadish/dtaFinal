import type { Metadata } from "next";
import "./globals.css";
import {
  outfit,
  geistMono,
  amiri,
  cairo,
  tajawal,
  tajawalLight,
} from "@/lib/importFonts";
import { ThemeProvider } from "@/provider/theme-provider";
import { SessionProvider } from "next-auth/react";
import { generateMetadata as generateBaseMetadata } from "./utils/metadata";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import { getLocale } from "next-intl/server";
import MainMenu from "@/components/headerAndFotter/header/MainMenu";
import FooterBar from "@/components/headerAndFotter/fotter/FooterBar";
import BodyContainer from "@/components/Container";
import { Directions } from "@/constant/enums";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/sonner";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Validate locale
// if (!routing.locales.includes(locale as any)) {
//   notFound();
// }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const locale = await getLocale();
  return generateBaseMetadata({
    locale: locale || routing.defaultLocale,
    path: "/",
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <ViewTransitions>
      <html
        lang={locale}
        dir={locale === "en" ? Directions.LTR : Directions.RTL}
        suppressHydrationWarning
      >
        <body
          className={`${outfit.variable} ${geistMono.variable} ${amiri.variable} ${cairo.variable} ${tajawal.variable} ${tajawalLight.variable} antialiased`}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SessionProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </SessionProvider>
          </NextIntlClientProvider>
          <Toaster position="top-right" />
        </body>
      </html>
    </ViewTransitions>
  );
}
