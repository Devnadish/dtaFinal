import { Icon } from "@iconify/react"; // Import Iconify
import Link from "next/link";

interface NoQuestionsFoundProps {
  status: string; // Pass the status parameter as a prop
  locale: string;
}

const NoQuestionsFound = ({ status, locale }: NoQuestionsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg border">
      <Icon icon="mdi:file-remove-outline" className="text-6xl text-gray-400" />
      <p className="text-lg text-gray-600">
        No questions found with the current filters.
      </p>
      <Link
        href={`/${locale}/show-all-quastion?status=${status}`} // Include the status parameter in the URL
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Clear Filters
      </Link>
    </div>
  );
};

export default NoQuestionsFound;
