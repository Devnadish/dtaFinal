"use client";
import React, { useState, useTransition } from "react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { Icon } from "@iconify/react"; // Import Iconify
import { useRouter, useSearchParams } from "next/navigation";
import useRouterPush from "../../../../../hooks/use-routerPush";

function SearchComponent() {
  const router = useRouter();
  const { routerPush, isPending } = useRouterPush();

  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(""); // State to manage the input value
  // Handle search
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery); // Add search query to URL
    } else {
      params.delete("search"); // Remove search query if empty
    }
    routerPush(`?${params.toString()}`);
  };
  const handleRemoveSearch = () => {
    // Create a new URLSearchParams object from the current searchParams
    const params = new URLSearchParams(searchParams.toString());

    // Remove the "search" parameter from the URL
    params.delete("search");

    // Push the updated URL without the "search" parameter
    routerPush(`?${params.toString()}`);
    setSearchQuery("");
    // Clear the input value
  };

  return (
    <form
      className="flex items-center gap-2 w-full mx-auto"
      action={handleSearch}
    >
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={isPending} // Update state on input change
      />
      <Button type="submit" size="icon" variant={"secondary"}>
        {/* Iconify search icon */}
        <Icon
          icon={isPending ? "mdi:loading" : "mdi:magnify"} // Dynamic icon name
          className={`h-5 w-5 ${isPending ? "animate-spin" : ""}`} // Dynamic class
        />
      </Button>
      {searchQuery && (
        <Button
          type="button"
          size="icon"
          variant={"secondary"}
          onClick={handleRemoveSearch}
          disabled={isPending}
        >
          <Icon
            icon={"mdi:clear"} // Dynamic icon name
          />
        </Button>
      )}
    </form>
  );
}

export default SearchComponent;
