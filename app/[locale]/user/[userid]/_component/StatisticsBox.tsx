import { cn } from "@/lib/utils";
import MotionDiv from "@/components/MotionDiv";
import { Icon } from '@iconify/react';

interface StatItemProps {
  icon: React.ReactNode;
  count: string;
  label: string;
  color?: string;
}

const StatItem = ({ icon, count, label, color = "primary" }: StatItemProps) => (
  <MotionDiv
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "flex flex-col items-center justify-center",
      "p-4 rounded-xl",
      "bg-gradient-to-br from-background/80 to-background/60",
      "backdrop-blur-md",
      "border border-border/50",
      "transition-all duration-300",
      "hover:shadow-lg hover:shadow-purple-500/5",
      "hover:border-purple-500/20",
      "group cursor-pointer"
    )}
  >
    <div className={cn(
      "p-2 rounded-lg transition-all duration-300 group-hover:scale-110",
      {
        'bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20': color === 'primary',
        'bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20': color === 'warning',
        'bg-gradient-to-br from-red-500/10 to-rose-500/5 border border-red-500/20': color === 'destructive'
      }
    )}>
      {icon}
    </div>
    <div className={cn(
      "text-xl font-bold mt-2 mb-1 transition-colors duration-300",
      {
        'text-purple-500 group-hover:text-purple-600': color === 'primary',
        'text-yellow-500 group-hover:text-yellow-600': color === 'warning',
        'text-red-500 group-hover:text-red-600': color === 'destructive'
      }
    )}>
      {count}
    </div>
    <div className="text-sm text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors">
      {label}
    </div>
  </MotionDiv>
);

interface StatisticsBoxProps {
  QuestionsWithAnswers: any[];
  PendingQuestions: any[];
  RejectedQuestions: any[];
}

const StatisticsBox: React.FC<StatisticsBoxProps> = ({
  QuestionsWithAnswers,
  PendingQuestions,
  RejectedQuestions,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatItem
        icon={<Icon icon="solar:chat-square-dots-bold" className="text-2xl text-purple-500" />}
        count={String(QuestionsWithAnswers.length + PendingQuestions.length + RejectedQuestions.length)}
        label="Total Questions"
      />
      <StatItem
        icon={<Icon icon="solar:chat-square-like-bold" className="text-2xl text-purple-500" />}
        count={String(QuestionsWithAnswers.length)}
        label="Answered"
        color="primary"
      />
      <StatItem
        icon={<Icon icon="solar:hourglass-bold" className="text-2xl text-yellow-500" />}
        count={String(PendingQuestions.length)}
        label="Pending"
        color="warning"
      />
      <StatItem
        icon={<Icon icon="solar:close-circle-bold" className="text-2xl text-red-500" />}
        count={String(RejectedQuestions.length)}
        label="Rejected"
        color="destructive"
      />
    </div>
  );
};

export default StatisticsBox;