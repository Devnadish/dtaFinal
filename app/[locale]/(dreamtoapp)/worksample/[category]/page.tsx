import { getImages } from "@/lib/awsImages";
import React from "react";
import ImageGallery from "@/components/ImageGallery";
import { propType } from "@/constant/type";
import Text from "@/components/Text";
import { getLocale, getTranslations } from "next-intl/server";
import { getImagesFromCloudinary } from "@/utils/cloudinary/cloudinary";

export const dynamic = "force-dynamic";

export default async function Page({ params, searchParams }: propType) {
  const category = (await params).category;
  const prefix = (await searchParams).prefix;

  const locale = await getLocale(); 
  const t= await getTranslations("workSample");

  const unsluggedSlug = decodeURIComponent(category).replace(/-/g, " ");
  
const galleryPath = "dreamToApp/workSample/" + prefix  ;

  const gallery = await getImagesFromCloudinary(galleryPath);

  if (!gallery) {
    return   <Text variant="h1" locale={locale} >{t("nosample")}</Text>;
  }

  return (
    <div>
      <Text variant="h1" locale={locale} >  
        <span className="uppercase text-primary ml-2 underline"> {t("galleryof")} </span>
        {unsluggedSlug}
      </Text>

      <ImageGallery gallery={gallery} altTitle={unsluggedSlug} />
    </div>
  );
}