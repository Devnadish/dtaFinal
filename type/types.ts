// types.ts
import { faq } from "@prisma/client";
import { SVGProps } from "react";
import { Post as OriginalPost } from "@/tmpl/sanity.types";

// Blog Types
export interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: { url: string };
  description: string;
  categories: string[];
  publishedAt: Date;
  section: string;
  language: string;
}

export interface EnrichedBlog extends Blog {
  viewsCount: number;
  commentsCount: number;
}

// FAQ Types
export interface Answer {
  id: string;
  content: string;
  userEmail: string | null;
  faqId: string;
  createdAt: Date;
  updatedAt: Date;
  comments: {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    answerId: string;
    userEmail: string | null;
    userImage: string | null;
  }[];
}

export interface Tag {
  id: string;
  tag: string;
  faqId: string;
}

export interface FaqItem extends faq {
  answers?: Answer[] | undefined;
  tagged?: Tag[] | undefined;
}

// Filter Types
export interface FilterOptionsProps {
  tags: {
    tag: string;
    count: number;
  }[];
  totalCount: number;
  tagValue: string;
  searchValue: string;
  queryMode: string;
  sorting: string;

  setTagValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setQueryMode: React.Dispatch<React.SetStateAction<string>>;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
}

// User Types

export interface UserInformation {
  ip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

// Comment Types
export interface commentFormData {
  comment: string;
  userEmail: string;
  userImage: string;
}

export interface requestFormData {
  name: string;
  phone: string;
  userImage: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof commentFormData]?: string[];
  };
}

// Icon Types
export interface IconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
}

// Post Types
export interface ExtendedPost extends OriginalPost {
  viewsCount: number;
  commentsCount: number;
}
