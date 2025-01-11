import { FAQ, SortOption } from "@/type/faq";
import { FAQItem } from "./FaqItem";
import SortControls from "./SortControls ";

interface QuastionsListProps {
  initialFAQs: FAQ[];
  sortKey: SortOption;
  sortDirection: "asc" | "desc";
}

export default function QuastionsList({
  initialFAQs,
  sortKey,
  sortDirection,
}: QuastionsListProps) {
  if (!initialFAQs || !Array.isArray(initialFAQs)) {
    return <div>No FAQs available.</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">FAQs</h2>
        <SortControls sortKey={sortKey} sortDirection={sortDirection} />
      </div>
      {initialFAQs.map((faq) => (
        <FAQItem key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
