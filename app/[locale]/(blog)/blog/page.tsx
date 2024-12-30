import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import SectionView from "./component/SectionView";
import BodyContainer from "@/components/Container";
import { getData } from "./actions/getAllBlog";

const LoadingSection = () => (
  <div className="w-full h-48 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
);

export default async function BlogsHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const { blogs } = await getData(locale)
  const t = await getTranslations("HomePage");
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* <AnimatedModal /> */}
      <BodyContainer>
        
          <Suspense   fallback={<LoadingSection />}>
            <SectionView
              posts={blogs}
              locale={locale}
            />

          </Suspense>
   
      </BodyContainer>
    </main>
  );
}
