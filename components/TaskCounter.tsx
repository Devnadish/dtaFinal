import { cn } from "@/lib/utils";
import React from "react";

// Assuming TaskCounterProps is defined as follows:
interface TaskCounterProps {
  taskCounter: number; // Ensure taskCounter is of type number
}

const TaskCounter: React.FC<TaskCounterProps> = ({ taskCounter }) => {
  return (
    <div className={cn(
      "absolute right-2 top-2",
      "min-w-[22px] h-[22px]",
      "flex items-center justify-center",
      "text-[10px] font-medium",
      "text-primary",
      "bg-primary/10",
      "border border-primary/30",
      "rounded-full px-1.5",
      "transition-all duration-300",
      "group-hover:bg-primary/20",
      "group-hover:border-primary/50",
      "group-hover:scale-110",
      "z-20"
    )}>
      {taskCounter}
    </div>
  );
};

export default TaskCounter;