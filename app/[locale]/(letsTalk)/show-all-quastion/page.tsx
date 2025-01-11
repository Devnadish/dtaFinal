import { GetQuestions } from "./actions/FaqActions";
import { questionStatus, questionQueryMode } from "../../../../constant/enums";
import React from "react";
import { SortOption } from "../../../../type/faq";
import QuastionsList from "./component/FAQ/QuastionsList";

export interface propType {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function page({ searchParams }: propType) {
  const sp = await searchParams;
  const sortKey = (sp["sortKey"] as SortOption) || "createdAt";
  const sortDirection = (sp["sortDirection"] as "asc" | "desc") || "desc";
  const statusParam =
    (sp["status"] as questionStatus) || questionStatus.ANSWERED;

  const defaultParams = {
    tag: "all",
    search: "",
    querymode: questionQueryMode.QUESTIONS,
    status: statusParam,
    page: 1,
    limit: 10,
    sortKey: sortKey,
    sortDirection: sortDirection,
  };

  const FAQ = await GetQuestions(defaultParams);
  const { QuestionsWithAnswers } = FAQ;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Frequently Asked Questions
      </h1>
      <QuastionsList
        initialFAQs={QuestionsWithAnswers}
        sortKey={sortKey}
        sortDirection={sortDirection}
      />
    </div>
  );
}

export default page;
