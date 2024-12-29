import FooterBar from "@/components/headerAndFotter/fotter/FooterBar";
import BodyContainer from "@/components/Container";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import NextTopLoader from 'nextjs-toploader';
import MainMenu from "@/components/headerAndFotter/header/MainMenu";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from '../utils/metadata';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return generateBaseMetadata({
    locale,
    path: `/${locale}`,
    title: 'Dream To App - Turn Your Dreams Into Reality',
    description: 'Professional app development services tailored to your needs. Transform your idea into reality with our expert team.'
  });
}

export async function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={getLangDir(locale)}>
        <MainMenu />
        {/* <BodyContainer locale={locale}> */}
        <NuqsAdapter>
          <NextTopLoader height={7} showAtBottom={false} />
          {children}
        </NuqsAdapter>
        {/* </BodyContainer> */}
        <FooterBar />
      </div>
    </NextIntlClientProvider>
  );
}