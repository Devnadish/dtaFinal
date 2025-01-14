import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { FAQ } from "@/type/faq";
import { useLocale } from "next-intl";
import { UserAvatar } from "@/components/UserAvatar";
import AnswerCard from "../Answer/AnswerItem";
import Link from "next/link";
import { cn } from "../../../../../../lib/utils";
import { buttonVariants } from "../../../../../../components/ui/button";
import ShowDate from "../../../detailquastion/[slug]/component/ShowDate";
import QLinkComponent from "../LinkComponent";

interface FAQItemProps {
  faq: FAQ;
}

// Internal MetadataDisplay Component
function MetadataDisplay({ faq }: { faq: FAQ }) {
  return (
    <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
      <span className="flex items-center">
        <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
        {faq.viewerCount} views
      </span>
      <span className="flex items-center">
        <Icon icon="mdi:heart" className="w-4 h-4 mr-1" />
        {faq.loveCount} loves
      </span>
      <span className="flex items-center">
        <Icon icon="mdi:thumb-down" className="w-4 h-4 mr-1" />
        {faq.dislovCount} dislikes
      </span>

      <p className="ml-auto">
        <strong>Priority:</strong> {faq.priority}
      </p>
    </div>
  );
}

// Internal TagsDisplay Component
function TagsDisplay({ faq }: { faq: FAQ }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {faq.tagged.map((tag, index) => (
        <Badge key={index} variant="secondary">
          {tag.tag}
        </Badge>
      ))}
    </div>
  );
}

// Internal LinkComponent Component

// Main FAQItem Component
export function FAQItem({ faq }: FAQItemProps) {
  const locale = useLocale();

  return (
    <Card className="mb-6">
      <CardHeader>
        <ShowDate created={faq?.createdAt} updated={faq?.updatedAt} />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <UserAvatar userEmail={faq.userEmail} size="md" />

            <CardTitle className="leading-5 font-semibold">
              {faq.question}
            </CardTitle>
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            {faq.images.length > 0 && (
              <span className="flex items-center text-xs bg-green-800 p-1 rounded-lg border border-green-400 text-green-300 justify-center">
                <Icon icon="mdi:image" className="w-4 h-4 mr-1" />
                {faq.images.length}
              </span>
            )}
            {faq.voiceRecordings.length > 0 && (
              <span className="flex items-center text-xs bg-purple-800 p-1 rounded-lg border border-purple-400 text-purple-300 justify-center">
                <Icon icon="mdi:microphone" className="w-4 h-4 mr-1" />
                {faq.voiceRecordings.length}
              </span>
            )}
          </div>
        </div>
        <MetadataDisplay faq={faq} />
        <QLinkComponent
          title={"Show All Answer Messages"}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "text-blue-500 hover:text-blue-500 capitalize font-semibold"
          )}
          slug={faq.slug}
          locale={locale}
        />
      </CardHeader>
      <CardContent>
        <TagsDisplay faq={faq} />
        <AnswerCard faq={faq} />
      </CardContent>
    </Card>
  );
}
