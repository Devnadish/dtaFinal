import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import React from "react";
import { FaqCounter } from "@/actions/faq/faq";
import ShowQuastionType from "./_component/ShowQuastionType";

interface LinkTitle {
  pending: string;
  answered: string;
  rejected: string;
}

const FAQSection = async ({
  user,
  answered,
  pending,
  rejected,
}: {
  user: any;
  answered: any;
  pending: any;
  rejected: any;
}) => {
  const t = await getTranslations("Faq");
  const linkTitle: LinkTitle = {
    pending: t("pending"),
    answered: t("answered"),
    rejected: t("rejected"),
  };

  return (

    <ShowQuastionType
      answeredQuestions={answered}
      pendingQuestions={pending}
      rejectedQuestions={rejected}
      msgHint={t("notPerfect")}
      linkTitle={linkTitle}
    />
  );
};

const fetchFaqData = async (locale: string) => {
  const session = await auth();
  const { answeredQuestions, pendingQuestions, rejectedQuestions } =
    await FaqCounter();

  return {
    session,
    answeredQuestions,
    rejectedQuestions,
    pendingQuestions,
  };
};

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  const { session, answeredQuestions, rejectedQuestions, pendingQuestions } =
    await fetchFaqData(locale);

  return (
    <div className="relative flex flex-col min-h-screen w-full gap-3">
      <FAQSection
        user={session?.user}
        answered={answeredQuestions}
        pending={pendingQuestions}
        rejected={rejectedQuestions}
      />
      <main className="flex-grow w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;