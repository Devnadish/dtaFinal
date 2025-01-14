"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Text from "../../../../../components/Text";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import useRouterPush from "../../../../../hooks/use-routerPush";

// Define the type for a tag
interface Tag {
  tag: string;
  count: number;
}

// Define the props for the TagComponent
interface TagComponentProps {
  tags?: Tag[];
  locale: string;
}

// Subcomponent for the dropdown
function TagDropdown({
  tags,
  onSelect,
  selectedValue,
  locale,
}: {
  tags: Tag[];
  onSelect: (value: string) => void;
  selectedValue: string;
  locale: string; // Add locale prop here
}) {
  if (!tags) return null;

  return (
    <Command>
      <CommandInput placeholder="Search tag..." className="h-9" />
      <CommandList>
        <CommandEmpty>No tag found.</CommandEmpty>
        <CommandGroup>
          {tags.map((tag) => (
            <CommandItem
              key={crypto.randomUUID()} // Add the key prop here
              value={tag.tag}
              onSelect={onSelect}
            >
              <div className="flex items-center gap-4 w-full justify-between">
                <Text variant="p" locale={locale}>
                  {tag.tag}
                </Text>
                <span className="bg-secondary rounded-xl text-xs p-1  flex items-center justify-center">
                  {tag.count}
                </span>
              </div>
              <Check
                className={cn(
                  "ml-auto h-4 w-4",
                  selectedValue === tag.tag ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default function TagComponent({ tags = [], locale }: TagComponentProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { routerPush, isPending } = useRouterPush();

  const handleSearch = (currentValue: string) => {
    console.log(currentValue);

    const params = new URLSearchParams(searchParams.toString());
    if (currentValue) {
      params.set("tag", currentValue); // Add search query to URL
    } else {
      params.delete("tag"); // Remove search query if empty
    }
    router.push(`?${params.toString()}`);
  };

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    handleSearch(currentValue);
  };

  const handleRemoveTag = () => {
    // Create a new URLSearchParams object from the current searchParams
    const params = new URLSearchParams(searchParams.toString());

    // Remove the "search" parameter from the URL
    params.delete("tag");

    // Push the updated URL without the "search" parameter
    routerPush(`?${params.toString()}`);
    setValue("");
    // Clear the input value
  };
  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? tags.find((tag) => tag.tag === value)?.tag
              : "Select tag..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          {tags.length > 0 ? (
            <TagDropdown
              tags={tags}
              onSelect={handleSelect}
              selectedValue={value}
              locale={locale} // Add locale prop here
            />
          ) : (
            <div className="p-2 text-sm text-gray-500">No tags available.</div>
          )}
        </PopoverContent>
      </Popover>
      <div>
        {isPending && (
          <Icon
            icon={"mdi:loading"} // Dynamic icon name
            className="h-5 w-5  animate-spin" // Dynamic class
          />
        )}
        {value && (
          <Button
            type="button"
            size="icon"
            variant={"secondary"}
            onClick={handleRemoveTag}
            disabled={isPending}
          >
            <Icon
              icon={isPending ? "mdi:loading" : "mdi:clear"} // Dynamic icon name
              className={`h-5 w-5 ${isPending ? "animate-spin" : ""}`} // Dynamic class
            />
          </Button>
        )}
      </div>
    </div>
  );
}
