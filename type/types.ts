import { faq } from "@prisma/client";
import { SVGProps } from "react";
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

export interface Tag {
  id: string;
  tag: string;
}

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

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptionType: string;
  image: string;
  initailBalance: number;
  usedBalance: number;
}

export interface IconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
}

export interface UserInformation {
  ip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

export interface commentFormData {
  comment: string;
  userEmail: string;
  userImage: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof commentFormData]?: string[];
  };
}
