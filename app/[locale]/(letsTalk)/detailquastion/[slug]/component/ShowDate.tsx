import React from "react";
import { Icon } from "@iconify/react"; // Import the Icon component
import FormattedDate from "@/components/FormattedDate ";

// Define the props interface
interface ShowDateProps {
  created: Date; // created is a Date object
  updated: Date; // updated is a Date object
}

function ShowDate({ created, updated }: ShowDateProps) {
  return (
    <div>
      <div className="flex items-center gap-4 self-end">
        <FormattedDate
          date={created} // Use the `created` prop
          icon={
            <Icon
              icon="material-symbols:create-new-folder-outline"
              className="w-4 h-4 text-muted-foreground"
            />
          }
        />
        <FormattedDate
          date={updated} // Use the `updated` prop
          icon={
            <Icon
              icon="material-symbols:update"
              className="w-4 h-4 text-muted-foreground"
            />
          }
        />
      </div>
    </div>
  );
}

export default ShowDate;
