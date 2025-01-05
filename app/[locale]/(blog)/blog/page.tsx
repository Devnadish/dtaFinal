import { getTranslations } from "next-intl/server";
import SectionView from "../../../../components/blog/SectionView";
import BodyContainer from "@/components/Container";
import { getData } from "../../../../actions/blog/getAllBlog";
import { homeSections } from "@/constant/enums";

export default async function BlogsHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const { blogs } = await getData(locale, homeSections.BLOG)
  const t = await getTranslations("HomePage");
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* <AnimatedModal /> */}
      <BodyContainer>
        <SectionView
          posts={blogs}
          locale={locale} title={""} icon={undefined} />
      </BodyContainer>
    </main>
  );
}
