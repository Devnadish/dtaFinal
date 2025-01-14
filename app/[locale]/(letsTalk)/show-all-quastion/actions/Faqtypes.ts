import {
  questionQueryMode,
  questionStatus,
} from "../../../../../constant/enums";
export type SortOption = "createdAt" | "viewerCount" | "loveCount" | "priority";
export interface SortConfig {
  key: SortOption;
  direction: "asc" | "desc";
}

export interface GetQuestionsParams {
  tag: string;
  search: string;
  querymode: questionQueryMode;
  status: questionStatus;
  page?: number;
  limit?: number;
  sortKey?: SortOption;
  sortDirection?: "asc" | "desc";
}

export interface GetQuestionsResult {
  QuestionsWithAnswers: any[];
  QueryCont: number;
  pagesCount: number;
  tags: { tag: string; count: number }[];
  totalCount: number;
}
