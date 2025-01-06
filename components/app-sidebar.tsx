import { Icon } from "@iconify/react"; // Import Iconify
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useLocale } from "next-intl"

// Menu items
export function AppSidebar() {
    const locale = useLocale()

    const items = [
        {
            title: "Home",
            url: "/",
            icon: "mdi:home-outline", // Home icon
        },
        {
            title: "Client Request",
            url: `/${locale}/dashboard/clients`,
            icon: "mdi:account-outline", // User icon
        },
        {
            title: "Tags",
            url: `/${locale}/dashboard/tags`,
            icon: "mdi:tag-outline", // Tag icon
        },
        {
            title: "Question",
            url: `/${locale}/dashboard/quastion`,
            icon: "mdi:comment-question-outline", // Question icon
        },
        {
            title: "Blogs",
            url: `/${locale}/dashboard/blog`,
            icon: "mdi:post-outline",
        },
        {
            title: "Users",
            url: `/${locale}/dashboard/users`,
            icon: "mdi:account-group-outline", // Users icon
        },
        {
            title: "Settings",
            url: `/ ${locale} / dashboard / setting`,
            icon: "mdi:cog-outline", // Settings icon
        },
    ]

    return (
        <Sidebar variant="sidebar">
            <SidebarContent className="mt-[60px]">
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2">
                                            <Icon icon={item.icon} className="h-5 w-5" /> {/* Iconify icon */}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}