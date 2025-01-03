import { Icon } from "@iconify/react";

import { dateToSting } from "@/lib/nadish";

const CreateAndUpdateDate = ({
  createdAt,
  updatedAt,
}: {
  createdAt?: Date;
  updatedAt?: Date;
}) => (
  <div className="flex items-center  flex-row  gap-2 justify-end w-fit ">
    <div className="text-[10px]   text-muted-foreground flex items-center gap-2 w-fit ">
       <Icon icon="lucide:edit" className="w-3 h-3 " />
      {dateToSting(updatedAt?.toString() ?? "")}
    </div>
    {createdAt && (
      <div className="text-[10px]   text-muted-foreground flex items-center gap-2  ">
        <Icon icon="lucide:edit" className="w-3 h-3 " />
        {dateToSting(createdAt.toString())}
      </div>
    )}
  </div>
);
export default CreateAndUpdateDate;
