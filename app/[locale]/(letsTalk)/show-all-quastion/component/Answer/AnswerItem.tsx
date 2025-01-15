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
import { UserAvatar } from "@/components/UserAvatar";
import QLinkComponent from "../LinkComponent";
import FormattedDate from "../../../../../../components/FormattedDate ";

interface FAQItemProps {
  faq: FAQ;
  locale: string;
}

function AnswerCard({ faq, locale }: FAQItemProps) {
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
    <Card className="w-full max-w-4xl ml-auto">
      {/* Answer Section */}
      <CardHeader>
        <header className="flex flex-row items-center justify-between w-full">
          <QLinkComponent
            title={<CardTitle>View {faq.answers.length} Answer</CardTitle>}
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),
              "text-muted-foreground/70 hover:text-muted-foreground capitalize w-fit"
            )}
            icon="mdi:eye"
            slug={faq.slug}
            locale={locale}
          />

          <FormattedDate date={faq.updatedAt} />
        </header>

        <section className="flex w-full items-center gap-2">
          <UserAvatar userEmail={faq.answers[0].userEmail ?? ""} size="sm" />
          <p className="text-lg text-card-foreground">{firstAnswer.content}</p>
        </section>
      </CardHeader>

      {/* Comments Section */}
      <CardFooter className="items-center justify-between p-2">
        <h3 className="text-sm text-blue-500 w-full">
          Comments ({totalComments})
        </h3>
        <QLinkComponent
          title="Add comments"
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "text-green-500 hover:text-primary capitalize"
          )}
          icon="ic:baseline-add-comment"
          slug={faq.slug}
          locale={locale}
        />
      </CardFooter>
    </Card>
  );
}

export default AnswerCard;
