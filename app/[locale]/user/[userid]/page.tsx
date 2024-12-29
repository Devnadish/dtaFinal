import { getUserProfile } from "@/actions/user/user";
import StatisticsBox from "./_component/StatisticsBox";
import UserInfoBox from "./_component/UserInfoBox";
import ProfileAvatar from "./_component/ProfileAvatar";
import UserQuastion from "./_component/UserQuastion";
import LogingOut from "./_component/LogingOut";
import { cn } from "@/lib/utils";
import MotionDiv from "@/components/MotionDiv";

export const dynamic = "force-dynamic";

interface PageProps {
      params: Promise<{ userid: string }>;
}


interface UserProfile {
  userHistory: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    mobile: string | null;
    emailVerified: Date | null;
    mobileVerified: boolean;
    subscriptionType: string | null;
    initailBalance: number | null;
    usedBalance: number | null;
  };
  quastion: any[];
  QuestionsWithAnswers: any[];
  PendingQuestions: any[];
  RejectedQuestions: any[];
}

export default async function Page({ params }: PageProps) {
  const   userid  = (await params).userid;
  const userProfile = await getUserProfile(userid) as UserProfile;

  if (!userProfile?.userHistory) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            User not found
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The user profile you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const {
    userHistory,
    QuestionsWithAnswers,
    PendingQuestions,
    RejectedQuestions,
  } = userProfile;

  const currentBalance = (userHistory?.initailBalance ?? 0) - (userHistory?.usedBalance ?? 0);

  return (
    <MotionDiv 
      className={cn(
        "flex flex-col items-center w-full",
        "gap-6 md:gap-8",
        "px-4 py-6 md:py-8"
      )}
    >
      <div className="relative w-full flex justify-center">
        <ProfileAvatar
          src={userHistory.image}
          name={userHistory.name}
        />
        <div className="absolute right-0 top-0">
          <LogingOut />
        </div>
      </div>

      <div className="w-full space-y-6">
        <UserInfoBox 
          userHistory={userHistory} 
          currentBalance={currentBalance} 
        />
        <StatisticsBox
          QuestionsWithAnswers={QuestionsWithAnswers}
          PendingQuestions={PendingQuestions}
          RejectedQuestions={RejectedQuestions}
        />
        <UserQuastion 
          QuestionsWithAnswers={QuestionsWithAnswers} 
        />
      </div>
    </MotionDiv>
  );
}