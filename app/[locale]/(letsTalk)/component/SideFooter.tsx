import * as React from "react";
import Image from "next/image";
import { SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import avatar from "@/public/assets/image/thinking.png";
import SideBarAddQuastion from "../show-all-quastion/component/SideBarAddQuastion";
import Text from "../../../../components/Text";
import { Icon } from "@iconify/react";

interface SideHeaderProps {
  email?: string;
  name?: string;
  image?: string;
  isCollapsed: boolean;
  locale: string;
}

export default function SideFooter({
  email,
  name,
  image,
  isCollapsed,
  locale,
}: SideHeaderProps) {
  const isUserLoggedIn = !!(email || name || image);

  return (
    <SidebarFooter>
      <div
        className={cn(
          "bg-gradient-to-r from-secondary to-muted w-full shadow transition-all duration-300 hover:shadow-xl",
          isCollapsed
            ? "flex justify-center items-center rounded-lg size-8 "
            : "flex flex-col items-center justify-center p-3 rounded-md"
        )}
      >
        {isUserLoggedIn ? (
          <SideBarAddQuastion isCollapsed={isCollapsed} />
        ) : (
          <LoginPrompt isCollapsed={isCollapsed} locale={locale} />
        )}
      </div>
    </SidebarFooter>
  );
}

function LoginPrompt({
  isCollapsed,
  locale,
}: {
  isCollapsed: boolean;
  locale: string;
}) {
  if (isCollapsed) {
    return (
      <Image
        src={avatar}
        alt="User Avatar"
        width={52}
        height={100}
        className="absolute bottom-2 left-2"
      />
    );
  } else {
    return (
      <div className="text-center flex items-center justify-center flex-col relative h-[100px] w-full">
        {/* <div className="absolute -top-7 left-0 w-full h-full bg-greenColor"> */}
        <Image
          src={avatar}
          alt="User Avatar"
          width={52}
          height={100}
          className="absolute -top-10 left-2"
        />
        {/* </div> */}
        <Text
          variant="p"
          locale={locale}
          className="text-lg font-semibold text-white bg-black w-full text-right p-1 "
        >
          Log in To Ask.
        </Text>
      </div>
    );
  }
}

const SideBarAddQuastionCollapse = () => {
  return (
    <div className="relative  items-center justify-center h-[150px] w-[52px] flex flex-col">
      <Icon
        icon="bxs:message-add"
        className="text-green-600 z-20  -top-[5px] absolute "
      />
      <Image
        src={avatar}
        alt="User Avatar"
        width={52}
        height={100}
        className="absolute top-2 -right-4 "
      />
    </div>
  );
};
