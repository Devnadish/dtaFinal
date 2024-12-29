import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { addLoadingParam } from "@/lib/nadish";
import { Icon } from "@iconify/react";

const ApplayFilter = React.memo(
  ({
    tagValue,
    searchValue,
    queryMode,
    setTagValue,
    setSearchValue,
    setQueryMode,
    sorting,
    setSorting,
  }: {
    tagValue: string;
    searchValue: string;
    queryMode: string;
    setTagValue: React.Dispatch<React.SetStateAction<string>>;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    setQueryMode: React.Dispatch<React.SetStateAction<string>>;
    sorting: string;
    setSorting: React.Dispatch<React.SetStateAction<string>>;
    // onClose: () => void;
  }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilter = async () => {
      setIsLoading(true);

      let query = "";

      if (searchValue) {
        query += `search=${encodeURIComponent(searchValue)}`;
      }

      if (tagValue) {
        query += `${query ? "&" : ""}tag=${encodeURIComponent(tagValue)}`;
      }

      if (queryMode) {
        query += `${query ? "&" : ""}mode=${encodeURIComponent(queryMode)}`;
      }

      if (sorting) {
        query += `${query ? "&" : ""}sort=${encodeURIComponent(sorting)}`;
      }

      if (query) {
        await router.push(`/faq/ansewrd?${query}`);
      } else {
        await router.push("/faq/ansewrd");
      }
    };

    const handleRemoveFilter = async () => {
      setTagValue("");
      setSearchValue("");
      setQueryMode("questions");
      setSorting("newest");
      await router.push("/faq/ansewrd");
    };

    return (
      <div className="flex  items-start justify-end gap-4 border-t border-border pt-4 w-full">
        <SheetClose asChild>
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={handleApplyFilter}
            disabled={isLoading}
          >
            {/* <ApplyFilterIcon />  */}
            <Icon
              icon="mdi:filter-check" 
              className="w-5 h-5 text-gray-400" 
            />
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            variant={"secondary"}
            onClick={handleRemoveFilter}
            disabled={isLoading}
          >
            {/* <RemoveFilter /> */}
            <Icon
              icon="material-symbols:close-rounded"
              className="w-5 h-5 text-gray-400"
            />
          </Button>
        </SheetClose>
      </div>
    );
  }
);

export default ApplayFilter;
