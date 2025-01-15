import { FAQ } from "@/type/faq";
import { SortOption } from "../../actions/Faqtypes";
import { FAQItem } from "./ShowFAQitem";

interface QuastionsListProps {
  initialFAQs: FAQ[];
  sortKey: SortOption;
  sortDirection: "asc" | "desc";
}

export default function QuastionsList({ initialFAQs }: QuastionsListProps) {
  if (!initialFAQs || !Array.isArray(initialFAQs)) {
    return <div>No FAQs available.</div>;
  }

  return (
    <div id="homeQuastion">
      {initialFAQs.map((faq) => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
