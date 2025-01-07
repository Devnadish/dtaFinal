import { DashboardFaqCounter } from "@/app/[locale]/dashboard/quastion/actions/dashboard";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { getLocale } from "next-intl/server";
import { FaqType } from "@/type/faq";

interface QueryLinkProps {
  queryType: FaqType;
  count: number;
  title: string;
  icon: string;
  locale: string; // Ensure locale is of type string
  hint: string;
}


const InfogCard: React.FC<QueryLinkProps> = ({
  queryType,
  count,
  title,
  icon,
  locale,
}) => (
  <div
    className="flex flex-row items-center justify-center p-4 gap-4  bg-secondary rounded-2xl shadow-md hover:shadow-lg  w-full border border-border "
    aria-label={`View ${queryType} questions`}
  >
    <Icon icon={icon} className="h-8 w-8 text-blue-500 " />
    <h3 className="text-sm md:text-xl font-bold text-foreground">{title}</h3>
    <p className="text-base text-muted-foreground">{count} Questions</p>
  </div>
);

const QueryCard: React.FC<QueryLinkProps> = ({
  queryType,
  count,
  title,
  icon,
  locale, hint
}) => (
  <Link
    href={{
      pathname: `/${locale}/dashboard/quastion/show-quastion-list`,
      query: { type: `${queryType}` },
    }}


    className="flex flex-col items-center justify-center p-6 bg-secondary rounded-2xl shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 w-full max-w-md"
    aria-label={`View ${queryType} questions`}
  >
    <Icon icon={icon} className="h-10 w-10 text-blue-500 mb-4" />
    <h3 className="text-xl font-bold text-foreground uppercase">{title}</h3>
    <p className="text-base text-muted-foreground">{count} Questions</p>
    <p className="text-xs text-muted-foreground">{hint}</p>
  </Link>
);

const Page: React.FC = async () => {
  const {
    allQuestions,
    answeredQuestions,
    unPublishedQuestions,
    rejectedQuestions,
    needAnswerQuestions,
  } = await DashboardFaqCounter();
  const locale = await getLocale()

  return (
    <div className="px-4 md:px-8 lg:px-12 py-4 space-y-4">
      <InfogCard
        queryType="all"
        count={allQuestions}
        icon="mdi:clipboard-outline"
        title="All Questions"
        locale={locale}
        hint={"all"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        <QueryCard
          queryType="answered"
          count={answeredQuestions}
          icon="mdi:check-circle-outline"
          title="Answered"
          locale={locale}
          hint={"Published =true, Rejected=false"}
        />
        <QueryCard
          queryType="pending"
          count={needAnswerQuestions}
          icon="mdi:help-circle-outline"
          title="Pending"
          locale={locale}
          hint={"gotAnswer=true"}
        />

        <QueryCard
          queryType="rejected"
          count={rejectedQuestions}
          icon="mdi:close-circle-outline"
          title="Rejected"
          locale={locale}
          hint={"rejected=true"}
        />
        <QueryCard
          queryType="offline"
          count={unPublishedQuestions}
          icon="mdi:eye-off-outline"
          title="offline"
          locale={locale}
          hint={"Publish=false"}
        />
      </div>
    </div>
  );
};

export default Page;