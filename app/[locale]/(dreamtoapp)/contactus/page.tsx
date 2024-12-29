import type { Metadata } from "next";
import FormContact from "@/components/FormContact";
import { getTranslations } from "next-intl/server";
import { generateMetadata as generateBaseMetadata } from '@/app/utils/metadata';
;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateBaseMetadata({
    locale: locale,
    path: `/${locale}`,
    title: 'Dream To App - Turn Your Dreams Into Reality',
    description: 'Professional app development services tailored to your needs. Transform your idea into reality with our expert team.'
  });
}
export default async function ContactUs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // const locale = await params.locale;
  const locale = (await params).locale;
  const t = await getTranslations("contactus");
  const userData = {};

  return (
    <div className="flex items-center justify-start bg-muted rounded p-4 sm:p-6 lg:p-8 mb-10">
      <div className="bg-card rounded-lg shadow-xl p-6 sm:p-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-orangeColor mb-6 text-center font-cairo">
          {t("pagetitle")}
        </h1>
        <p className="text-sm text-muted-foreground mb-6 text-center font-cairo">
          {t("hint")}
        </p>
        <FormContact lang={locale} user={userData} />
      </div>
    </div>
  );
}
