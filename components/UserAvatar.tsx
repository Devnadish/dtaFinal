import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "lucide-react";
import { GetUserByEmail } from "../actions/user/user";

interface UserAvatarProps {
  userEmail?: string;
  name?: string;
  avatarUrl?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

// Define size classes for the avatar and fallback icon
const sizeClasses = {
  xs: {
    avatar: "h-6 w-6", // Extra small size
    icon: "h-3 w-3", // Fallback icon size for xs
  },
  sm: {
    avatar: "h-8 w-8", // Small size
    icon: "h-4 w-4", // Fallback icon size for sm
  },
  md: {
    avatar: "h-10 w-10", // Medium size (default)
    icon: "h-5 w-5", // Fallback icon size for md
  },
  lg: {
    avatar: "h-12 w-12", // Large size
    icon: "h-6 w-6", // Fallback icon size for lg
  },
};

export async function UserAvatar({
  userEmail,
  name,
  avatarUrl,
  size = "md",
}: UserAvatarProps) {
  // Fetch user data if userEmail is provided
  const user = userEmail ? await GetUserByEmail(userEmail) : null;

  // Determine the avatar content
  const avatarContent = (
    <Avatar className={sizeClasses[size].avatar}>
      <AvatarImage src={user?.image ?? avatarUrl ?? ""} alt={name || "User"} />
      <AvatarFallback>
        {name ? (
          name.charAt(0).toUpperCase()
        ) : (
          <User className={sizeClasses[size].icon} /> // Fallback icon with dynamic size
        )}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{avatarContent}</TooltipTrigger>
        <TooltipContent>
          <p>{user?.name || name || "Guest"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
