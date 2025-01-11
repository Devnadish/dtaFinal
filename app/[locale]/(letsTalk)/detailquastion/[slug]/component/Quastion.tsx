import { faq, tagged, comment } from "@prisma/client";
import { Answer } from "@/type/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ViewerCounter, { DislikeCounter, LoveItConter } from "./ViewerCounter";
import UserInformation from "@/components/UserInformaton";
import ShowDate from "./ShowDate";
import { getLocale } from "next-intl/server";
import Text from "../../../../../../components/Text";

// Define the type for the props
interface QuastionProps {
  item: FaqWithAnswers;
  userEmail: string;
}

// Extend the faq type to include answers, tagged, and comments
interface FaqWithAnswers extends faq {
  answers?: Answer[];
  tagged?: tagged[];
  comments?: comment[];
}

// Props for QuastionContent
interface QuastionContentProps {
  item: FaqWithAnswers;
  userEmail: string;
  locale: string;
}

// Props for QuastionFooter
interface QuastionFooterProps {
  item: FaqWithAnswers;
  userEmail: string;
  locale: string;
}

const QuastionContent = ({ item, userEmail, locale }: QuastionContentProps) => (
  <CardContent className="flex flex-col p-6 bg-secondary/50">
    <div className="flex items-start gap-4">
      <UserInformation email={userEmail ?? ""} showName={false} />
      <Text
        variant="h3"
        locale={locale}
        className="text-lg font-semibold text-foreground"
      >
        {item.question}
      </Text>
    </div>

    <ShowDate created={item?.createdAt} updated={item?.updatedAt} />
  </CardContent>
);

const QuastionFooter = ({ item, userEmail }: QuastionFooterProps) => (
  <CardFooter className="flex items-center w-full justify-between p-4 border-t">
    <div className="flex items-center gap-3">
      <LoveItConter
        loveCount={item?.loveCount ?? 0}
        slug={item?.slug ?? ""}
        userEmail={userEmail}
      />
      <DislikeCounter
        dislovCount={item?.dislovCount ?? 0}
        slug={item?.slug ?? ""}
        userEmail={userEmail}
      />
    </div>

    <ViewerCounter
      viewerCount={item?.viewerCount}
      loveCount={item?.loveCount ?? 0}
      dislikeCount={item?.dislovCount ?? 0}
    />
  </CardFooter>
);

const Quastion: React.FC<QuastionProps> = async ({ item, userEmail }) => {
  const locale = await getLocale();
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-foreground/50">
      <QuastionContent item={item} userEmail={userEmail} locale={locale} />
      <QuastionFooter item={item} userEmail={userEmail} locale={locale} />
    </Card>
  );
};

export default Quastion;
