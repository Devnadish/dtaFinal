import React from "react";
import { auth } from "@/auth";
import { GetDetailQuastion } from "./actions/detailQuastion";
import Quastion from "./component/Quastion";
import Answers from "./component/Answers";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = await GetDetailQuastion(slug);
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!question) {
    // Handle the case when the question is not found
    return <div>Question not found</div>;
  }

  const islogin = session?.user ? true : false;
  return (
    <div className="flex flex-col gap-4 ">
      <Quastion item={question} key={question.id} userEmail={userEmail ?? ""} />
      <Answers
        answer={question?.answers}
        userEmail={question?.userEmail}
        slug={question?.slug}
        islogin={islogin}
      />
    </div>
    // tags
    //answer
  );
}

export default page;
