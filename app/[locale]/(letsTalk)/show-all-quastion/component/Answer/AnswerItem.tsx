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
import FormattedDate from "@/components/FormattedDate ";
import { UserAvatar } from "@/components/UserAvatar";

interface FAQItemProps {
  faq: FAQ;
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
      </CardFooter>
    </Card>
  );
}

export default AnswerCard;
