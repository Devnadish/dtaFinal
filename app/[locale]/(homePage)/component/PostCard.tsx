import React, { useState } from "react";
import { Post } from "@/sanity.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { urlFor } from "@/lib/imageUrl";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Text from "@/components/Text";


const PostCard = React.memo(({ post }: { post: Post }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const t = useTranslations("button");
  const locale = useLocale();

  return (
    <Card className="w-full flex flex-col h-full mx-auto   overflow-hidden">
      <div className="relative w-full h-0 pb-[50%]">
        <Image
          src={
            post.mainImage
              ? urlFor(post.mainImage).url()
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
        <Text
          variant="p"
          locale={locale}
          className={`text-muted-foreground ${isDescriptionExpanded ? "" : "line-clamp-2"}`}
        >
          {post.description}
        </Text>

        {post.description && post.description.length > 100 && (
          <div className="flex items-center justify-end">
            {isDescriptionExpanded ? (
              <Icon
                icon="mingcute:chevron-up-fill"
                width={24}
                height={24}
                className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary"
                onClick={() => setIsDescriptionExpanded(false)}
              />
            ) : (
              <Icon
                icon="mingcute:chevron-down-fill"
                width={24}
                height={24}
                className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary"
                onClick={() => setIsDescriptionExpanded(true)}
              />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          href={`/${locale}/showdetail/${post?.slug?.current}`}
          className="w-full"
        >
          <Text
            variant="span"
            className="text-primary hover:text-primary/80 block text-center"
            locale={locale}
          >
            {t("more")}
          </Text>
        </Link>
      </CardFooter>
    </Card>
  );
});

PostCard.displayName = "PostCard";
export default PostCard;
