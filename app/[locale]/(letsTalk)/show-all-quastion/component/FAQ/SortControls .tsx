"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { SortOption } from "../../actions/Faqtypes";

interface SortControlsProps {
  sortKey: SortOption;
  sortDirection: "asc" | "desc";
}

export default function SortControls({
  sortKey,
  sortDirection,
}: SortControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (key: SortOption) => {
    const newDirection =
      sortKey === key && sortDirection === "desc" ? "asc" : "desc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortKey", key);
    params.set("sortDirection", newDirection);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={sortKey}
        onValueChange={(value: SortOption) => handleSortChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Date Created</SelectItem>
          <SelectItem value="viewerCount">View Count</SelectItem>
          <SelectItem value="loveCount">Love Count</SelectItem>
          <SelectItem value="priority">Priority</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleSortChange(sortKey)}
      >
        <Icon
          icon={
            sortDirection === "asc"
              ? "mdi:sort-ascending"
              : "mdi:sort-descending"
          }
          className="h-4 w-4"
        />
        <span className="sr-only">
          {sortDirection === "asc" ? "Sort Ascending" : "Sort Descending"}
        </span>
      </Button>
    </div>
  );
}
