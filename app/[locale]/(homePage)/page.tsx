import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from '@/app/utils/metadata';
import { Icon } from '@iconify/react';
import SectionView from "./component/SectionView";
import { getData } from "./actions/getAllservice";
import BodyContainer from "@/components/Container";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateBaseMetadata({
    locale: locale,
    path: `/${locale}`,
    title: locale === "en" ? 'Dream To App - Turn Your Dreams Into Reality' : "حقق حلمك معنا",
    description: 'Professional app development services tailored to your needs. Transform your idea into reality with our expert team.'
  });
}

const LoadingSection = () => (
  <div className="w-full h-48 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;


  const { service, tecnology, support, free } = await getData(locale)
  const t = await getTranslations("HomePage");


  const sections = [
    {
      data: service,
      title: t("Service"),
      icon: <Icon icon="ic:round-touch-app" width={38} height={38} />, // Updated icon
    },
    {
      data: tecnology,
      title: t("Expert"),
      icon: <Icon icon="mdi:arm-flex" width={38} height={38} />, // Updated icon
    },
    
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* <AnimatedModal /> */}
      <BodyContainer>
        {sections.map((section, index) => (
          <Suspense key={section.title} fallback={<LoadingSection />}>
            <SectionView
              posts={section.data}
              title={section.title}
              icon={section.icon}
              locale={locale}
            />

          </Suspense>
        ))}
      </BodyContainer>
    </main>
  );
}
