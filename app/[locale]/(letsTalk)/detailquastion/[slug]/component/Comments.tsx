import { Answer } from "@/type/types";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import CommentForm from "./CommentForm";
import { UserAvatar } from "@/components/UserAvatar";
import Text from "@/components/Text";
import { getLocale } from "next-intl/server";

import { CollapsibleComponent } from "@/components/ui/Collapse";
import FormattedDate from "../../../../../../components/FormattedDate ";
import CommentItemActions from "./CommentItemActions";

// Types
interface CommentsProps {
  answerId: string;
  userEmail: string;
  item: Answer;
  slug: string;
  islogin: boolean;
}

interface CommentItemProps {
  comment: string;
  email: string;
  createDate: Date;
  locale: string;
}

async function Comments({
  answerId,
  userEmail,
  item,
  slug,
  islogin,
}: CommentsProps) {
  const locale = await getLocale();

  return (
    <div className="space-y-4 w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        {islogin && (
          <>
            <UserAvatar userEmail={userEmail} size="sm" />
            <CommentForm
              answerId={answerId}
              userEmail={userEmail}
              slug={slug}
            />
          </>
        )}
      </div>
      <CommentStats commentCount={item.comments.length} locale={locale} />
      {item.comments.length > 0 ? (
        <CommentList comments={item.comments} locale={locale} />
      ) : (
        <NoComments locale={locale} />
      )}
    </div>
  );
}

function CommentStats({
  commentCount,
  locale,
}: {
  commentCount: number;
  locale: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900 w-fit">
      <Icon
        icon="solar:chat-square-like-bold"
        className="w-4 h-4 text-purple-500"
      />
      <Text
        variant="span"
        locale={locale}
        className="text-xs font-medium text-purple-700 dark:text-purple-300"
      >
        {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
      </Text>
    </div>
  );
}

function NoComments({ locale }: { locale: string }) {
  return (
    <div
      className={cn(
        "p-6 rounded-lg text-center",
        "bg-gray-50 dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-sm"
      )}
    >
      <Icon
        icon="solar:chat-square-outline"
        className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500"
        aria-hidden="true"
      />
      <Text
        variant="h3"
        locale={locale}
        className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2"
      >
        No comments yet
      </Text>
      <Text
        variant="p"
        locale={locale}
        className="text-sm text-gray-600 dark:text-gray-300 mb-4"
      >
        Be the first to share your thoughts!
      </Text>
    </div>
  );
}

function CommentList({
  comments,
  locale,
}: {
  comments: Answer["comments"];
  locale: string;
}) {
  const visibleComments = comments.slice(0, 3);
  const remainingComments = comments.slice(3);

  return (
    <div className="space-y-2">
      <ul className="space-y-1">
        {visibleComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment.content}
            email={comment.userEmail ?? ""}
            createDate={comment.createdAt}
            locale={locale}
          />
        ))}
      </ul>
      {remainingComments.length > 0 && (
        <CollapsibleComponent
          title={
            <Text
              variant="span"
              locale={locale}
              className="text-sm font-medium text-purple-600 dark:text-purple-400"
            >
              Show {remainingComments.length} more{" "}
              {remainingComments.length === 1 ? "comment" : "comments"}
            </Text>
          }
        >
          <ul className="space-y-3 mt-3">
            {remainingComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment.content}
                email={comment.userEmail ?? ""}
                createDate={comment.createdAt}
                locale={locale}
              />
            ))}
          </ul>
        </CollapsibleComponent>
      )}
    </div>
  );
}

function CommentItem({ comment, email, createDate, locale }: CommentItemProps) {
  return (
    <li
      className={cn(
        "p-2",
        "text-muted-foreground border-b  border-foreground/30"
      )}
    >
      <div className="flex items-start gap-3">
        <UserAvatar userEmail={email} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center  gap-2">
            <Text
              variant="p"
              locale={locale}
              className="text-xs text-foreground/70"
            >
              {email.split("@")[0]}
            </Text>
            <FormattedDate
              date={createDate}
              icon={
                <Icon
                  icon="material-symbols:schedule"
                  className="w-4 h-4 text-gray-400 dark:text-gray-500"
                />
              }
            />
          </div>
          <Text
            variant="p"
            locale={locale}
            className="text-sm text-foreground/80"
          >
            {comment}
          </Text>
        </div>
      </div>
      <CommentItemActions />
    </li>
  );
}

export default Comments;
