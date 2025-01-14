import Comments from "./Comments";
import { Answer } from "@/type/types";
import UserInformation from "@/components/UserInformaton";
import ShowDate from "./ShowDate";
import Text from "@/components/Text";
import { getLocale } from "next-intl/server";

const Answers = async ({
  answer,
  userEmail,
  slug,
  islogin,
}: {
  answer?: Answer[];
  userEmail: string;
  slug: string;
  islogin: boolean;
}) => {
  if (!answer) return null;
  const locale = await getLocale();

  return (
    <div className="flex flex-col gap-2 w-full items-end max-w-5xl ml-auto ">
      <Text variant="h6" locale={locale} className="text-emerald-500">
        {!islogin && "Login Required To add Comment"}
      </Text>
      {answer.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-baseline gap-2 w-[97%] bg-foreground/20 p-4 rounded-md "
        >
          <ShowDate created={item?.createdAt} updated={item?.updatedAt} />
          <div className="flex items-center gap-2 w-full">
            <UserInformation email={item.userEmail ?? ""} showName={false} />
            <Text variant="p" locale={locale} className="text-sm  text-wrap">
              {item.content}
            </Text>
          </div>
          <Comments
            answerId={item.id}
            userEmail={userEmail}
            item={item}
            slug={slug}
            islogin={islogin}
          />
        </div>
      ))}
    </div>
  );
};

export default Answers;
