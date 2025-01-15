import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { FAQ } from "@/type/faq";
import { useLocale } from "next-intl";
import { UserAvatar } from "@/components/UserAvatar";
import AnswerCard from "../Answer/AnswerItem";
import { cn } from "../../../../../../lib/utils";
import { buttonVariants } from "../../../../../../components/ui/button";
import ShowDate from "../../../detailquastion/[slug]/component/ShowDate";
import QLinkComponent from "../LinkComponent";

interface FAQItemProps {
  faq: FAQ;
}

// MetadataDisplay Component
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

// TagsDisplay Component
function TagsDisplay({ faq }: { faq: FAQ }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 mt-2">
      {faq.tagged.map((tag, index) => (
        <Badge key={index} variant="secondary">
          {tag.tag}
        </Badge>
      ))}
    </div>
  );
}

// MediaIndicator Component
function MediaIndicator({
  icon,
  count,
  bgColor,
  borderColor,
  textColor,
}: {
  icon: string;
  count: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center text-xs p-1 rounded-lg border justify-center",
        bgColor,
        borderColor,
        textColor
      )}
    >
      <Icon icon={icon} className="w-4 h-4 mr-1" />
      {count}
    </span>
  );
}

// UserInfo Component
function UserInfo({ faq }: { faq: FAQ }) {
  return (
    <div className="flex w-full items-center gap-2">
      <UserAvatar userEmail={faq.userEmail} size="md" />
      <CardTitle className="leading-5 font-semibold">{faq.question}</CardTitle>
    </div>
  );
}

// MediaIndicators Component
function MediaIndicators({ faq }: { faq: FAQ }) {
  return (
    <div className="flex  items-center justify-end gap-2">
      {faq.images.length > 0 && (
        <MediaIndicator
          icon="mdi:image"
          count={faq.images.length}
          bgColor="bg-green-800"
          borderColor="border-green-400"
          textColor="text-green-300"
        />
      )}
      {faq.voiceRecordings.length > 0 && (
        <MediaIndicator
          icon="mdi:microphone"
          count={faq.voiceRecordings.length}
          bgColor="bg-purple-800"
          borderColor="border-purple-400"
          textColor="text-purple-300"
        />
      )}
    </div>
  );
}

// Main FAQItem Component
export function FAQItem({ faq }: FAQItemProps) {
  const locale = useLocale();

  return (
    <Card className="mb-6 overflow-hidden gap-2">
      <CardHeader className="bg-secondary/70">
        <div className="flex w-full items-center justify-between ">
          <ShowDate created={faq?.createdAt} updated={faq?.updatedAt} />
          <MediaIndicators faq={faq} />
        </div>
        <UserInfo faq={faq} />
        <MetadataDisplay faq={faq} />
        <QLinkComponent
          title="Show All Answer Messages"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "text-primary/70 hover:text-primary capitalize font-semibold w-full sm:w-1/3 justify-center self-center sm:self-end"
          )}
          slug={faq.slug}
          locale={locale}
        />
      </CardHeader>
      <CardContent>
        <TagsDisplay faq={faq} />
        <AnswerCard faq={faq} locale={locale} />
      </CardContent>
    </Card>
  );
}
