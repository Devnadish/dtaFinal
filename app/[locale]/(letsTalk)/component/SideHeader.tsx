import * as React from "react";
import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import avatar from "@/public/assets/image/default-avatar.png";
import { User } from "lucide-react";

interface SideHeaderProps {
  email?: string;
  name?: string;
  image?: string;
  isCollapsed: boolean;
  locale?: string;
}

export function SideHeader({
  email,
  name,
  image,
  isCollapsed,
  locale,
}: SideHeaderProps) {
  const isUserLoggedIn = !!(email || name || image);

  return (
    <SidebarHeader>
      <div
        className={cn(
          "bg-gradient-to-r from-secondary to-muted  shadow transition-all duration-300 hover:shadow-xl",
          isCollapsed
            ? "flex justify-center items-center rounded-lg size-8 "
            : "flex flex-col items-center justify-center p-6"
        )}
      >
        {isUserLoggedIn ? (
          <UserInfo
            email={email}
            name={name}
            image={image}
            isCollapsed={isCollapsed}
          />
        ) : (
          <LoginPrompt isCollapsed={isCollapsed} />
        )}
      </div>
    </SidebarHeader>
  );
}

function UserInfo({ email, name, image, isCollapsed }: SideHeaderProps) {
  return (
    <div
      className={cn(
        "flex",
        isCollapsed ? "w-10 h-10" : "flex-col items-center gap-4"
      )}
    >
      <div
        className={cn(
          "relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-white shadow-md",
          isCollapsed ? "w-10 h-10 " : "w-16 h-16"
        )}
      >
        <Image
          src={image || avatar}
          alt={name || "User"}
          fill
          className="object-cover"
        />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col items-center justify-center">
          {name && (
            <span className="text-sm font-semibold text-muted-foreground">
              {name}
            </span>
          )}
          {email && (
            <span className="text-sm text-muted-foreground">{email}</span>
          )}
        </div>
      )}
    </div>
  );
}

function LoginPrompt({ isCollapsed }: { isCollapsed: boolean }) {
  const fallbackImage = "/assets/images/default-avatar.png";
  console.log(fallbackImage);
  if (isCollapsed) {
    return (
      <div className="flex rounded-full border-2 border-muted-foreground ">
        <User className="size-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="text-center flex items-center justify-center flex-col">
      <p className="text-lg font-semibold text-white mb-2">
        Welcome! Please log in.
      </p>
      <div className="flex rounded-full border-2 border-muted-foreground ">
        <User className="size-9 text-muted-foreground" />
      </div>
    </div>
  );
}
