import React from "react";
// import { Post } from "@/sanity.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { urlFor } from "@/lib/imageUrl";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Text from "@/components/Text";
import { getLocale, getTranslations } from "next-intl/server";
import { dateToString } from "@/lib/nadish";
import { ExtendedPost } from "@/type/types";




const PostCard = React.memo(async ({ post }: { post: ExtendedPost }) => {
  const t = await getTranslations("button");
  const locale = await getLocale();
  const publishedAtDate = post.publishedAt?.toString()
  // const image = urlFor(post.mainImage).width(800).height(450).format('webp').quality(80).url()

  return (
    <Card className="w-full flex flex-col h-full mx-auto   overflow-hidden">
      <div className="relative w-full h-0 pb-[50%]">
        <Image
          src={
            post.mainImage
              ? urlFor(post.mainImage).width(800).height(450).format('webp').quality(80).url()
              : "/fallback-image.jpg"
          }
          alt={post.title || "Fallback image"}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105 rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <CardHeader>
        <Text variant="h3" className="font-bold" locale={locale}>
          {post.title}
        </Text>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-row  items-end" >

          <Text
            variant="p"
            locale={locale}
            className="`text-muted-foreground line-clamp-2"
          >
            {post.description}
          </Text>
          {post.description && post.description.length > 95 && (
            <div className="flex items-center justify-end">
              <Link
                href={`/${locale}/showblog/${post?.slug?.current}`}
              > <Icon
                  icon="si:expand-more-square-line"
                  width={24}
                  height={24}
                  className="w-5 h-5 cursor-pointer text-blue-500 hover:text-primary"
                /></Link>

            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Link
          href={`/${locale}/showblog/${post?.slug?.current}`}
          className="w-full border border-primary/10 rounded-md p-2 hover:bg-primary/10"
        >
          <Text
            variant="span"
            className="text-primary hover:text-primary/80 block text-center "
            locale={locale}
          >
            {t("more")}
          </Text>

        </Link>
        <MoreInformation publishedAtDate={publishedAtDate ?? ""} viewerCount={post?.viewsCount} commentCount={post?.commentsCount} />
      </CardFooter>

    </Card>
  );
});

PostCard.displayName = "PostCard";
export default PostCard;


const MoreInformation = ({ publishedAtDate, viewerCount, commentCount }: { publishedAtDate: string, viewerCount: number, commentCount: number }) => {

  return (
    <div className="flex flex-row items-center justify-between p-2 w-full">
      <span className="text-[10px]   text-muted-foreground flex items-center gap-2 w-fit ">{dateToString(publishedAtDate ?? "")}</span>
      <div className='flex flrex-row gap-2 text-xs text-muted-foreground'>

        <div className='flex items-center gap-2 px-1 '>
          <Icon
            icon="hugeicons:eye"
            className="w-4 h-4 transition-transform  duration-300 hover:scale-110"
          />
          <span className="font-medium text">{viewerCount}</span>
        </div>
        <div className='flex items-center gap-2 px-1 border-l border-white/20'>
          <Icon
            icon="fluent:comment-20-filled"
            className="w-4 h-4 transition-transform duration-300 hover:scale-110"
          />
          <span className="font-medium">{commentCount}</span>
        </div>

      </div>
    </div>
  )
}