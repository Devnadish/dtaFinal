import db from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import {
  questionQueryMode,
  questionStatus,
} from "../../../../../constant/enums";
import { SortOption } from "../../../../../type/faq";

interface GetQuestionsParams {
  tag: string;
  search: string;
  querymode: questionQueryMode;
  status: questionStatus;
  page?: number;
  limit?: number;
  sortKey?: SortOption;
  sortDirection?: "asc" | "desc";
  tags?: string[];
}

interface GetQuestionsResult {
  QuestionsWithAnswers: any[];
  QueryCont: number;
  pagesCount: number;
}

function buildWhereCondition(
  tag: string,
  search: string,
  querymode: questionQueryMode,
  status: questionStatus
): Prisma.faqWhereInput {
  const baseCondition: Prisma.faqWhereInput = {};

  switch (status) {
    case questionStatus.PUBLISHED:
      baseCondition.published = true;
      baseCondition.rejected = false;
      baseCondition.gotAnswer = false;
      break;
    case questionStatus.REJECTED:
      baseCondition.rejected = true;
      break;
    case questionStatus.ANSWERED:
      baseCondition.published = true;
      baseCondition.rejected = false;
      baseCondition.gotAnswer = true;
      break;
    case questionStatus.PENDING:
      baseCondition.published = true;
      baseCondition.rejected = false;
      baseCondition.gotAnswer = false;
      break;
    default:
      throw new Error(`Invalid status: ${status}`);
  }

  if (tag !== "all") {
    baseCondition.tagged = {
      some: {
        tag: {
          equals: tag.toLowerCase(),
        },
      },
    };
  }

  if (search) {
    if (querymode === questionQueryMode.QUESTIONS) {
      baseCondition.question = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    } else {
      baseCondition.answers = {
        some: {
          content: search,
        },
      };
    }
  }

  return baseCondition;
}

export async function GetQuestions({
  tag,
  search,
  querymode,
  status,
  page = 1,
  limit = 10,
  sortKey = "createdAt",
  sortDirection = "desc",
}: GetQuestionsParams): Promise<GetQuestionsResult> {
  const skip = (page - 1) * limit;
  const whereCondition = buildWhereCondition(tag, search, querymode, status);

  const orderByClause: Prisma.faqOrderByWithRelationInput = {};
  orderByClause[sortKey] = sortDirection;

  try {
    const QueryCont = await db.faq.count({
      where: whereCondition,
    });

    const pagesCount = Math.ceil(QueryCont / limit);

    const QuestionsWithAnswers = await db.faq.findMany({
      where: whereCondition,
      include: {
        answers: { include: { comments: true } },
        tagged: true,
        images: true,
        voiceRecordings: true,
        faqInteractions: true,
      },
      orderBy: orderByClause,
      skip,
      take: limit,
    });
    const tags = await countTagsInFaq();

    return { QuestionsWithAnswers, QueryCont, pagesCount, tags };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function countTagsInFaq() {
  const tagCounts = await db.tagged.groupBy({
    by: ["tag"],
    _count: {
      id: true, // Count the occurrences of each tag
    },
  });

  const tagsData = tagCounts.map(({ tag, _count }) => ({
    tag,
    count: _count.id,
  }));
  const totalCount = tagsData.reduce((sum, { count }) => sum + count, 0); // Calculate total count
  // Update to include total count

  // Sort tags by count in descending order
  const tags = tagsData.sort((a, b) => b.count - a.count);

  return { tags, totalCount };
}
