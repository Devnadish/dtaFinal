import { faq, tagged } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import More from "./More";
import Q from "./Q";
import OneAnswer from "./Answers";
import { Answer } from "@/type/types";
import FormattedDate from "../../FormattedDate ";
import ViewerCounter from "../../../app/[locale]/(letsTalk)/detailquastion/[slug]/component/ViewerCounter";
import TagList from "../../../app/[locale]/(letsTalk)/detailquastion/[slug]/component/TagList";

interface FaqWithAnswers extends faq {
  answers?: Answer[];
  tagged?: tagged[];
}

function ShowQuastion({ item }: { item: FaqWithAnswers }) {
  return (
    <article className="group relative">
      <Card
        className="border border-gray-200 dark:border-gray-800 
        bg-white dark:bg-gray-900 rounded-xl shadow-sm 
        hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700
        transition-all duration-300"
      >
        {/* Status Indicator */}
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full bg-green-400 
          shadow-lg shadow-green-400/20"
        />

        <CardHeader
          className="p-6 bg-gradient-to-br from-gray-50/80 via-gray-50/40 to-transparent 
          dark:from-gray-800/80 dark:via-gray-800/40 dark:to-transparent 
          border-b border-gray-100 dark:border-gray-800"
        >
          <header className="space-y-4">
            {/* Metadata section with enhanced styling */}
            <div
              className="flex flex-col md:flex-row items-center justify-between w-full gap-4
              p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
            >
              <FormattedDate date={item?.createdAt} />
              <FormattedDate date={item?.updatedAt} />
              <ViewerCounter
                viewerCount={item?.viewerCount ?? 0}
                loveCount={item?.loveCount ?? 0}
                dislikeCount={item?.dislovCount ?? 0}
              />
            </div>

            {/* Question section with enhanced typography */}
            <div className="mt-2 px-3">
              <Q quastion={item?.question} auther={item?.userEmail} />
            </div>
          </header>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Tags with enhanced styling */}
          <nav
            aria-label="Question tags"
            className="flex flex-wrap gap-2 px-3 py-2
            bg-gray-50/50 dark:bg-gray-800/50 rounded-lg"
          >
            <TagList tags={item?.tagged?.map((tag) => tag.tag)} />
          </nav>

          {/* Answer section with enhanced styling */}
          <section
            aria-label="Answer"
            className="pt-6 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-3 py-2 bg-white dark:bg-gray-900 rounded-lg">
              <OneAnswer answer={item?.answers} />
            </div>
          </section>

          {/* Footer with enhanced styling */}
          <footer className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="px-3 py-2 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
              <More
                slug={item?.slug || ""}
                AnswerCount={item?.answers?.length ?? 0}
              />
            </div>
          </footer>
        </CardContent>

        {/* Hover Effect Overlay */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5
          transition-opacity duration-300 pointer-events-none"
        />
      </Card>
    </article>
  );
}

export default ShowQuastion;
