"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

import { Icon } from "@iconify/react"; // Import Iconify
import Link from "next/link";
import { useLocale } from "next-intl";
import { SideHeader } from "./SideHeader";
import SideFooter from "./SideFooter";
interface User {
  useEmail: string;
  useName: string;
  userImage: string;
}
// Menu items
export function FAQAppSidebar({ useEmail, useName, userImage }: User) {
  const locale = useLocale();
  const { state } = useSidebar();

  const quastions = [
    {
      title: "Home",
      url: "/",
      icon: "mdi:home-outline", // Home icon
    },
    {
      title: "Answered",
      url: `/${locale}/show-all-quastion?status=answered`, // Add query parameter
      icon: "mdi:check-decagram", // User icon
    },
    {
      title: "Pending",
      url: `/${locale}/show-all-quastion?status=pending`, // Add query parameter
      icon: "mdi:watch-later", // User icon
    },
    {
      title: "Rejected",
      url: `/${locale}/show-all-quastion?status=rejected`, // Add query parameter
      icon: "mdi:cancel-circle", // Tag icon
    },
    {
      title: "Analitic",
      url: `/${locale}/Analtic`, // Add query parameter
      icon: "mdi:chart-bar-stacked", // Tag icon
    },
  ];
  const filterOptions = [
    {
      title: "By Tag",
      url: `/${locale}/dashboard/clients`,
      icon: "mdi:account-outline", // User icon
    },
    {
      title: "By User",
      url: `/${locale}/dashboard/clients`,
      icon: "mdi:account-outline", // User icon
    },
  ];

  return (
    <Sidebar
      variant="sidebar"
      className="z-50"
      side={locale === "en" ? "left" : "right"}
      collapsible="icon"
    >
      <SideHeader
        email={useEmail}
        name={useName}
        image={userImage}
        isCollapsed={state === "collapsed"}
        locale={locale}
      />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Questions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quastions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <Icon icon={item.icon} className="h-5 w-5" />{" "}
                      {/* Iconify icon */}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
      <SideFooter
        email={useEmail}
        name={useName}
        image={userImage}
        isCollapsed={state === "collapsed"}
        locale={locale}
      />
    </Sidebar>
  );
}
