import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Icon } from "@iconify/react";
import { FAQ } from "@/type/faq";
import { useLocale } from "next-intl";
import { UserAvatar } from "@/components/UserAvatar";
import AnswerCard from "../Answer/AnswerItem";

interface FAQItemProps {
  faq: FAQ;
}

export function FAQItem({ faq }: FAQItemProps) {
  const locale = useLocale();

  function MetadataDisplay() {
    return (
      <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
        <span className="flex items-center">
          <Icon icon="mdi:eye" className="w-4 h-4 mr-1" />
          {faq.viewerCount} views
        </span>
        <span className="flex items-center">
          <Icon icon="mdi:heart" className="w-4 h-4 mr-1" />
          {faq.loveCount} loves
        </span>
        <span className="flex items-center">
          <Icon icon="mdi:thumb-down" className="w-4 h-4 mr-1" />
          {faq.dislovCount} dislikes
        </span>
        <p className="ml-auto">
          <strong>Priority:</strong> {faq.priority}
        </p>
        {faq.images.length > 0 && (
          <span className="flex items-center">
            <Icon icon="mdi:image" className="w-4 h-4 mr-1" />
            {faq.images.length} images
          </span>
        )}
      </div>
    );
  }

  function TagsDisplay() {
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {faq.tagged.map((tag, index) => (
          <Badge key={index} variant="secondary">
            {tag.tag}
          </Badge>
        ))}
      </div>
    );
  }

  // function DetailsAccordion() {
  //   if (faq.answers.length === 0) {
  //     return <p>No answers available.</p>;
  //   }

  //   const firstAnswer = faq.answers[0];
  //   const firstAnswerTeaser = firstAnswer.content.substring(0, 200) + "...";

  //   return (
  //     <Accordion type="single" collapsible className="w-full">
  //       <AccordionItem value="details">
  //         <AccordionTrigger>
  //           <div className="p-4 bg-gray-400 rounded-lg">
  //             <p className="text-lg font-medium">{firstAnswerTeaser}</p>
  //             <button className="text-blue-600">Show Details</button>
  //           </div>
  //         </AccordionTrigger>
  //         <AccordionContent>
  //           <div>
  //             <p>{firstAnswer.content}</p>
  //             {/* Display comments */}
  //             {firstAnswer.comments?.length > 0 ? (
  //               <div>
  //                 <h3>Comments:</h3>
  //                 <ul>
  //                   {firstAnswer.comments.map((comment, index) => (
  //                     <li key={index}>{comment.content}</li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             ) : (
  //               <p>No comments yet.</p>
  //             )}
  //             {/* Other details */}
  //             <div className="grid grid-cols-2 gap-4 text-sm mb-4">
  //               <div>
  //                 <p>
  //                   <strong>Status:</strong>{" "}
  //                   {faq.published ? "Published" : "Unpublished"}
  //                 </p>
  //                 <p>
  //                   <strong>Created:</strong>{" "}
  //                   {faq.createdAt.toLocaleDateString()}
  //                 </p>
  //                 <p>
  //                   <strong>Updated:</strong>{" "}
  //                   {faq.updatedAt.toLocaleDateString()}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p>
  //                   <strong>User Plan:</strong> {faq.userPlan}
  //                 </p>
  //                 <p>
  //                   <strong>Answered:</strong> {faq.gotAnswer ? "Yes" : "No"}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         </AccordionContent>
  //       </AccordionItem>
  //     </Accordion>
  //   );
  // }
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex w-full items-center  gap-2">
          <UserAvatar userEmail={faq.userEmail} size="md" />
          <CardTitle>{faq.question}</CardTitle>
        </div>
        <MetadataDisplay />
      </CardHeader>
      <CardContent>
        <TagsDisplay />
        <AnswerCard faq={faq} />
      </CardContent>
      {/* <Lightbox /> */}
    </Card>
  );
}
