import {
  getTranslations,
  Metadata,
  generateBaseMetadata,
  getData,
  homeSections,
  BodyContainer,
  IconClient,
  SectionTitle,
  SectionView,
} from './imports'
import { Post } from "@/sanity.types";



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generateBaseMetadata({
    locale,
    path: `/${locale}`,
    title: locale === "en" ? 'Dream To App - Turn Your Dreams Into Reality' : "حقق حلمك معنا",
    description: 'Professional app development services tailored to your needs. Transform your idea into reality with our expert team.'
  });
}

// Separate data fetching for better error handling
async function fetchPageData(locale: string) {
  try {
    const [serviceBlog, tecnologyeBlog, t] = await Promise.all([
      getData(locale, homeSections.SERVICE),
      getData(locale, homeSections.TECHNOLOGY),
      getTranslations("HomePage")
    ]);
    return { serviceBlog, tecnologyeBlog, t, error: null };
  } catch (error) {
    console.error("Failed to fetch page data:", error);
    return {
      serviceBlog: { blogs: [] },
      tecnologyeBlog: { blogs: [] },
      t: null,
      error
    };
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const { serviceBlog, tecnologyeBlog, t, error } = await fetchPageData(locale);


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load content. Please try again later.</p>
      </div>
    );
  }

  if (!t) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <BodyContainer className="gap-8">
        <SectionTitle title={t("Service")} icon={<IconClient icon="ic:round-touch-app" width={38} height={38} />} locale={locale} />
        <SectionView
          posts={serviceBlog.blogs}
        />
        <SectionTitle title={t("Expert")} icon={<IconClient icon="mdi:arm-flex" width={38} height={38} />} locale={locale} />
        <SectionView
          posts={tecnologyeBlog.blogs}
        />
      </BodyContainer>
    </main>
  );
}