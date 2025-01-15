import { GetQuestions } from "./actions/FaqActions";
import { questionStatus, questionQueryMode } from "../../../../constant/enums";
import React from "react";
import QuastionsList from "./component/FAQ/QuastionsList";
import AddQuastionComponent from "./component/AddQuastionComponent";
import SearchComponent from "./component/SearchComponent";
import SortControls from "./component/FAQ/SortControls ";
import TagComponent from "./component/TagComponent";
import { getLocale } from "next-intl/server";
import { Icon } from "@iconify/react"; // Import Iconify
import NoQuestionsFound from "./component/NoQuestionsFoundProps";
import { GetQuestionsParams, SortOption } from "./actions/Faqtypes";
import FakFaq from "../../../../components/FakFaq";

export interface propType {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function page({ searchParams }: propType) {
  const sp = await searchParams;

  // Extract and type-cast the query parameters
  const sortKey = (sp["sortKey"] as SortOption) || "createdAt";
  const sortDirection = (sp["sortDirection"] as "asc" | "desc") || "desc";
  const statusParam =
    (sp["status"] as questionStatus) || questionStatus.ANSWERED;
  const tag = (sp["tag"] as string) || "all";
  const search = (sp["search"] as string) || "";
  const querymode =
    (sp["querymode"] as questionQueryMode) || questionQueryMode.QUESTIONS;
  const page = parseInt(sp["page"] as string) || 1;
  const limit = parseInt(sp["limit"] as string) || 10;

  // Construct the parameters object to send to the backend
  const defaultParams: GetQuestionsParams = {
    tag, // Use the selected tag for filtering
    search,
    querymode,
    status: statusParam,
    page, // Optional
    limit, // Optional
    sortKey, // Optional
    sortDirection, // Optional
    // tags: [] // Removed since it's not needed
  };

  const locale = await getLocale();
  const FAQ = await GetQuestions(defaultParams);
  const { QuestionsWithAnswers, tags, QueryCont } = FAQ;

  return (
    <div
      className="flex w-full flex-col   gap-4 container mx-auto px-4  "
      id="homepage"
    >
      {/* <FakFaq /> */}
      {/* <AddQuastionComponent /> */}
      <QuastionHeader QueryCont={QueryCont} />
      <div className="flex items-center flex-wrap justify-between gap-4">
        <SearchComponent />
        <QuastionFilter
          tags={tags}
          locale={locale}
          sortKey={sortKey}
          sortDirection={sortDirection}
        />
      </div>
      {QueryCont === 0 ? (
        <NoQuestionsFound status={statusParam} locale={locale} />
      ) : (
        <QuastionsList
          initialFAQs={QuestionsWithAnswers}
          sortKey={sortKey}
          sortDirection={sortDirection}
        />
      )}
    </div>
  );
}

export default page;

const QuastionHeader = ({ QueryCont }: { QueryCont: number }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-bold   text-center sm:text-left">
        Product Guide And Help Center
      </h1>
      <div className="text-sm text-muted-foreground text-center bg-secondary p-2 rounded-md flex items-center gap-2">
        <Icon
          icon="material-symbols-light:document-search-outline"
          className=""
        />
        {QueryCont}
      </div>
    </div>
  );
};

export interface quastionFilterProp {
  locale: string;
  sortKey: SortOption;
  sortDirection: "asc" | "desc";
  tags: { count: number; tag: string }[]; // type define in types/faq.d.ts file
}
const QuastionFilter = ({
  locale,
  sortKey,
  sortDirection,
  tags,
}: quastionFilterProp) => {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <TagComponent tags={tags} locale={locale} />
      <SortControls sortKey={sortKey} sortDirection={sortDirection} />
    </div>
  );
};
