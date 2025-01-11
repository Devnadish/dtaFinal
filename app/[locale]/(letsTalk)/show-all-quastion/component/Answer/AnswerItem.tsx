import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FAQ } from "@/type/faq";
import Link from "next/link";
import FormattedDate from "@/components/FormattedDate ";
import { UserAvatar } from "@/components/UserAvatar";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";

interface FAQItemProps {
  faq: FAQ;
}
interface LinkComponentProps {
  title: ReactNode; // Allow string or JSX for the title
  className?: string; // Optional className
  slug: string; // Optional
}

function AnswerCard({ faq }: FAQItemProps) {
  if (faq.answers.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">
            No answers available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const firstAnswer = faq.answers[0];
  const totalComments = firstAnswer.comments?.length ?? 0;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      {/* Answer Section */}
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "text-blue-500 hover:text-blue-500 text-lg"
            )}
          >
            <CardTitle>{faq.answers.length}</CardTitle>
            <span className="text-xs text-blue-500">Answer </span>
          </div>
          <LinkComponent
            title={"Show All"}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "text-blue-500 hover:text-blue-500 capitalize font-semibold"
            )}
            slug={faq.slug}
          />
        </div>
        <p className="text-lg text-card-foreground">{firstAnswer.content}</p>

        {/* Display formatted dates under the answer */}
        <div className="flex items-center justify-between mt-4 space-y-1 text-sm text-muted-foreground">
          <FormattedDate date={faq.updatedAt} />
          <UserAvatar userEmail={faq.answers[0].userEmail ?? ""} size="sm" />
        </div>
      </CardHeader>

      <Separator />

      {/* Comments Section */}

      <CardFooter className="items-center justify-between p-2">
        <h3 className="text-sm text-blue-500">Comments ({totalComments})</h3>
        <LinkComponent
          title={"Add Comment"}
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "text-green-500 hover:text-blue-500 capitalize font-semibold"
          )}
          slug={faq.slug}
        />
      </CardFooter>
    </Card>
  );
}

// Simplified DetailItem component without Tooltip

export default AnswerCard;

// router.push(`/detailquastion/${slug}`);
const LinkComponent = async ({
  title,
  className,
  slug,
}: LinkComponentProps) => {
  const locale = await getLocale();
  return (
    <Link href={`/${locale}/detailquastion/${slug}`} className={className}>
      {title}
    </Link>
  );
};
