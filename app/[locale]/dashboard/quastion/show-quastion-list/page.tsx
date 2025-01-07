import React from "react";
import { faqs } from "./actions/getAllQuastion";
import { propType } from "@/constant/type";
import { FAQ } from "@/type/faq";
import { ShowFaqList } from "./compnent/ShowFaqList";

export default async function Page({ params, searchParams }: propType) {
  const SP = (await searchParams).type ?? 'all'; // Default to 'all' if type is not provided

  const getFaqs = await faqs(SP as string);

  return (
    <>
      <div className="w-full flex items-center justify-between bg-secondary rounded-lg border p-2">
        <p className="uppercase flex gap-2 items-center">
          <strong>Type:</strong> {SP}
        </p>
        <p>
          <strong>Count:</strong> {getFaqs.length}
        </p>
      </div>
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">FAQ Display</h1>
          {getFaqs.length > 0 ? (
            <ShowFaqList faqs={getFaqs as FAQ[]} />
          ) : (
            <div className="text-center p-8 bg-slate-100 rounded-lg shadow-md">
              <p className="text-xl font-medium text-gray-600">
                No FAQs available for this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}