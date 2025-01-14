// types/index.ts

import { Prisma } from "@prisma/client";

// FAQ type
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
  images: FaqImage[];
  voiceRecordings: FaqVoiceRecording[];
  faqInteractions: FaqInteraction[];
  tagged: Tagged[];
}

// Answer type
export interface Answer {
  id: string;
  content: string;
  userEmail: string | null;
  faqId: string;
  createdAt: Date;
  updatedAt: Date;
  faq: FAQ;
  comments: Comment[];
}

// Comment type
export interface Comment {
  id: string;
  content: string;
  answerId: string;
  answer: Answer;
  userEmail: string | null;
  userImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// FaqImage type
export interface FaqImage {
  id: string;
  url: string | null;
  publicId: string | null;
  published: boolean;
  faqId: string;
  faq: FAQ;
  createdAt: Date;
}

// FaqVoiceRecording type
export interface FaqVoiceRecording {
  id: string;
  url: string | null;
  publicId: string | null;
  published: boolean;
  faqId: string;
  faq: FAQ;
  createdAt: Date;
}

// FaqInteraction type
export interface FaqInteraction {
  id: string;
  createdAt: Date;
  userEmail: string | null;
  userImage: string | null;
  isLoved: boolean;
  isDisliked: boolean;
  faqId: string;
  faq: FAQ;
}

// Tagged type
export interface Tagged {
  id: string;
  faqId: string;
  tag: string;
  faq: FAQ;
}

// Tag type
export interface Tag {
  id: string;
  tag: string;
}

// Optionally, you can also define Prisma types for more flexibility
export type FAQWithRelations = Prisma.faqGetPayload<{
  include: {
    answers: true;
    images: true;
    voiceRecordings: true;
    faqInteractions: true;
    tagged: true;
  };
}>;
