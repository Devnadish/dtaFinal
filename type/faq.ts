export interface Tag {
  tag: string;
}

export interface Answer {
  content: string;
}

export interface Image {
  url: string;
}

export interface VoiceRecording {
  url: string;
}

export interface FAQ {
  id: string;
  slug: string;
  question: string;
  userEmail: string;
  priority: number;
  userPlan: string;
  viewerCount: number;
  loveCount: number;
  dislovCount: number;
  published: boolean;
  rejected: boolean;
  gotAnswer: boolean;
  rejectedReason: string;
  createdAt: Date;
  updatedAt: Date;
  answers: Answer[];
  images: Image[];
  voiceRecordings: VoiceRecording[];
  faqInteractions: any[];
  tagged: Tag[];
}

export type SortOption = "createdAt" | "viewerCount" | "loveCount" | "priority";

export interface SortConfig {
  key: SortOption;
  direction: "asc" | "desc";
}

export type FaqType = "all" | "pending" | "answered" | "rejected" | "offline";
