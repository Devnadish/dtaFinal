import dynamic from "next/dynamic";
import Link from "next/link";
import TaskCounter from "@/components/TaskCounter";
import { convertToSlug } from "@/lib/nadish";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import Text from "@/components/Text";
import { Icon } from "@iconify/react"
import { collectWorkSamples, getImagesFromCloudinary } from "@/utils/cloudinary/cloudinary";


export const metadata = {
  title: "Our Work",
};
interface WorkCategory {
  id: string;
  titleKey: string;
  icon: string;
  prefix: string;
  images?: string[]; // Assuming images are URLs or similar
}

// Define the type for the data returned by collectWorkCategoryData
interface WorkCategoryData {
  id: string;
  title: string;
  icon: React.ReactNode; // Assuming you're using React
  prefix: string;
  images: string[];
}

// Define the workCategory array with the WorkCategory type
const workCategory: WorkCategory[] = [
  { id: "sm", titleKey: "smMenuTilte", icon: "simple-icons:dm", prefix: "sm" },
  { id: "uiux", titleKey: "uiUxMenuTitle", icon: "simple-icons:nextui", prefix: "ui" },
  { id: "identity", titleKey: "identityMenuTitle", icon: "simple-icons:accuweather", prefix: "identity" },
  { id: "signboard", titleKey: "singBoardMEnuTitle", icon: "teenyicons:sign-outline", prefix: "signboard" },
  { id: "cnc", titleKey: "cncMenuTitle", icon: "game-icons:circular-sawblade", prefix: "cnc" },
  { id: "character", titleKey: "Character", icon: "game-icons:charcuterie", prefix: "character" },
  { id: "coverpage", titleKey: "Coverpage", icon: "gis:landcover-map", prefix: "coverage" },
  { id: "logo", titleKey: "Logo", icon: "ion:logo-designernews", prefix: "logo" },
  { id: "flyer", titleKey: "flyer", icon: "codicon:file-media", prefix: "flyer" },
  { id: "infograph", titleKey: "infograph", icon: "tabler:chart-infographic", prefix: "infograph" },
  { id: "menu", titleKey: "menu", icon: "ic:sharp-restaurant-menu", prefix: "menu" },
  { id: "package", titleKey: "package", icon: "hugeicons:package", prefix: "package" },
  { id: "poster", titleKey: "poster", icon: "game-icons:target-poster", prefix: "poster" },
];

// Define the async function with proper typing
async function collectWorkCategoryData(locale: string): Promise<WorkCategoryData[]> {
  const t = await getTranslations("workSample");
  const imagesOnCloudinary = await collectWorkSamples(workCategory.map(cat => cat.prefix));

  // Populate the images array for each category
  workCategory.forEach((category, index) => {
    category.images = imagesOnCloudinary[index]?.workSample || []; // Assuming imagesOnCloudinary is structured correctly
  });

  const data: WorkCategoryData[] = workCategory.map(({ id, titleKey, icon, prefix, images }) => ({
    id,
    title: t(titleKey),
    icon: <Icon icon={icon} width={48} className="text-primary" />,
    prefix,
    images: images || [], // Ensure images is always an array
  }));

  return data; // Return the structured data
}



// Example usage in your page function
 
async function page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;
  const t = await getTranslations("workSample");
  const data = await collectWorkCategoryData(locale);
  console.log({data});
  

  return (
    <div className={cn(
      "min-h-screen w-full",
      "py-4 sm:py-6 md:py-8",
      "px-2 sm:px-4 md:px-6",
      "bg-gradient-to-br from-background via-background/98 to-background/95"
    )}>
      <div className="max-w-[1400px] mx-auto">
        <div className={cn(
          "mb-6 sm:mb-8 md:mb-12 text-center",
          "px-2 sm:px-4",
          "animate-in slide-in-from-bottom-4 duration-700"
        )}>
          <Text variant="h1" locale={locale} className={cn(
            "text-2xl sm:text-3xl md:text-4xl font-bold",
            "bg-gradient-to-r from-primary via-primary/80 to-primary/60",
            "bg-clip-text text-transparent",
            "mb-2 sm:mb-4"
          )}>
            {t("pageTitle")}
          </Text>
          <Text variant="p" locale={locale} className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {t("pageDescription")}
          </Text>
        </div>

        <div className={cn(
          "grid gap-2 sm:gap-3 md:gap-4",
          "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
          "p-2 sm:p-4",
          "place-items-center"
        )}>
          {data.map((el) => {
            const titleUrl = convertToSlug(el.title);
            return (
              <Link
              href={`/${locale}/worksample/${titleUrl}?prefix=${el.prefix}`}
              prefetch={false}
               
              className={cn(
                "relative flex items-center justify-center",
                "w-full max-w-[200px] min-h-[120px]",
                "rounded-xl",
                "bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80",
                "border border-border/30",
                "flex-col gap-1.5 sm:gap-2",
                "p-3 sm:p-4",
                "group",
                "transition-all duration-300 ease-in-out",
                "hover:scale-[1.02] sm:hover:scale-105",
                "hover:bg-gradient-to-br hover:from-primary/30 hover:via-primary/20 hover:to-primary/10",
                "hover:border-primary/30",
                "hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)]"
              )}
              key={el.id}
            >
              <TaskCounter  taskCounter={el.images.length} />
              
              <div className={cn(
                "absolute inset-0",
                "bg-gradient-to-br from-primary/5 via-primary/3 to-transparent",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-500",
                "rounded-xl"
              )} />
              
              <div className={cn(
                "relative z-10",
                "flex flex-col items-center",
                "gap-1.5 sm:gap-2",
                "transition-transform duration-300",
                "group-hover:translate-y-[-2px]"
              )}>
                <div className={cn(
                  "transition-transform duration-300",
                  "group-hover:scale-110",
                  "text-primary/80 group-hover:text-primary",
                  "scale-90 sm:scale-100"
                )}>
                  {el.icon}
                  
                </div>
                <Text locale={locale} variant="span" className={cn(
                  "text-xs sm:text-sm font-medium text-center",
                  "text-foreground/80 group-hover:text-primary",
                  "transition-colors duration-300",
                  "line-clamp-2"
                )}>
                  {el.title}
                </Text>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;

// const { url, error } = await uploadToCloudinary(file, 'my-specific-folder');
// //       setImageUrl(url);
// //       setUploadError(error);