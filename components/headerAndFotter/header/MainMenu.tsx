import { Icon } from "@iconify/react";
import React from "react";
// import Link from "next/link";

import Typography from "@/components/Text";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import AuthButton from "./AuthButton";
import { getLocale, getTranslations } from "next-intl/server";
import Logo from "./Logo";

import { Link } from "next-view-transitions";

const MainMenu = React.memo(async () => {
  const t = await getTranslations("MenuItems");
  const locale = await getLocale();

  const menuItems = [
    {
      href: `/${locale}/prices`,
      label: t("price"),
      description: t("priceDescription"),
      icon: <Icon icon="lucide:dollar-sign" />,
    },
    {
      href: `/${locale}/worksample`,
      label: t("sample"),
      description: t("sampleDescription"),
      icon: <Icon icon="lucide:briefcase" />,
    },
    // {
    //   href: `/${locale}/blog`,
    //   label: t("blog"),
    //   description: t("blogDescription"),
    //   icon: <Book size={16} className="text-primary" />,
    // },
    {
      href: `/${locale}/contactus`,
      label: t("contact"),
      description: t("contactDescription"),
      icon: <Icon icon="lucide:message-circle" />,
    },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-40",
        "w-full py-2 px-4",
        "bg-secondary/80 backdrop-blur-md",
        "border-b border-border/30",
        "shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]",
        "flex items-center justify-between",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="flex items-center justify-center gap-3">
        <Logo locale={locale} />
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5",
                "rounded-xl transition-all duration-300",
                "hover:bg-primary/5 active:bg-primary/10",
                "border border-white/30",
                "group"
              )}
            >
              <Icon icon="lucide:menu" />
              <Typography
                variant="span"
                locale={locale}
                className="text-sm font-medium text-foreground/80"
              >
                {t("menu")}
              </Typography>
              <Icon icon="lucide:chevron-down" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className={cn(
              "w-[300px] p-4 z-50",
              "backdrop-blur-xl bg-background/80",
              "border border-border/50",
              "shadow-[0_4px_20px_-3px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
            )}
            sideOffset={8}
          >
            <div className="grid gap-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 p-3",
                    "rounded-xl transition-all duration-300",
                    "hover:bg-primary/5 active:bg-primary/10",
                    "border border-transparent hover:border-border/50",
                    "group"
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      "bg-primary/5 group-hover:bg-primary/10",
                      "transition-all duration-300"
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Typography
                      variant="span"
                      locale={locale}
                      className={cn(
                        "text-sm font-medium",
                        "group-hover:text-primary",
                        "transition-colors duration-300"
                      )}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="p"
                      locale={locale}
                      className="text-xs text-muted-foreground/80 line-clamp-1"
                    >
                      {item.description}
                    </Typography>
                  </div>
                </Link>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* FAQ Link - Separate from HoverCard menu */}
      <div className="flex items-center justify-center gap-3">
        <LetsTalk locale={locale} t={t} />
        <TempLetsTalk locale={locale} t={t} />
        <LatestNews locale={locale} t={t} />

        <AuthButton />
      </div>
    </nav>
  );
});

MainMenu.displayName = "MainMenu";

export default MainMenu;

const LetsTalk = ({ locale, t }: { locale: string; t: any }) => {
  return (
    <Link
      // href={`/${locale}/faq/ansewrd`}
      href={`/${locale}/show-all-quastion?status=answered`}
      className={cn(
        "relative flex items-center gap-2",
        "px-3 py-2",
        "rounded-lg transition-all duration-300",
        "bg-gradient-to-r from-primary/5 to-primary/10",
        "border border-primary/20",
        "overflow-hidden group",
        "hover:shadow-[0_4px_12px_-6px_rgba(0,0,0,0.1)]",
        "hover:border-primary/40",
        "hover:scale-[1.01]"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-r from-primary/10 to-primary/5",
          "blur-lg transition-all duration-500",
          "group-hover:blur-xl"
        )}
      />

      <div className={cn("relative flex items-center gap-2", "z-10")}>
        <div
          className={cn(
            "p-1.5 rounded-md",
            "bg-primary/10 group-hover:bg-primary/20",
            "transition-all duration-300",
            "group-hover:rotate-[360deg]"
          )}
        >
          <Icon icon="lucide:message-circle" />
        </div>

        <Typography
          variant="span"
          locale={locale}
          className={cn(
            "text-xs font-medium",
            "bg-clip-text",
            "transition-all duration-300",
            "group-hover:text-primary/90",
            "group-hover:translate-x-0.5"
          )}
        >
          {t("faq")}
        </Typography>
      </div>
    </Link>
  );
};

const LatestNews = ({ locale, t }: { locale: string; t: any }) => {
  return (
    <Link
      href={`/${locale}/blog`}
      className={cn(
        "relative flex items-center gap-2",
        "px-3 py-2",
        "rounded-lg transition-all duration-300",
        "bg-gradient-to-r from-primary/5 to-primary/10",
        "border border-primary/20",
        "overflow-hidden group",
        "hover:shadow-[0_4px_12px_-6px_rgba(0,0,0,0.1)]",
        "hover:border-primary/40",
        "hover:scale-[1.01]"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-r from-primary/10 to-primary/5",
          "blur-lg transition-all duration-500",
          "group-hover:blur-xl"
        )}
      />

      <div className={cn("relative flex items-center gap-2", "z-10")}>
        <div
          className={cn(
            "p-1.5 rounded-md",
            "bg-primary/10 group-hover:bg-primary/20",
            "transition-all duration-300",
            "group-hover:rotate-[360deg]"
          )}
        >
          <Icon icon="flat-color-icons:news" />
        </div>

        <Typography
          variant="span"
          locale={locale}
          className={cn(
            "text-xs font-medium",
            "bg-clip-text",
            "transition-all duration-300",
            "group-hover:text-primary/90",
            "group-hover:translate-x-0.5"
          )}
        >
          {t("news")}
        </Typography>
      </div>
    </Link>
  );
};

const TempLetsTalk = ({ locale, t }: { locale: string; t: any }) => {
  return (
    <Link
      href={`/${locale}/faq/ansewrd`}
      className={cn(
        "relative flex items-center gap-2 bg-green-300",
        "px-3 py-2",
        "rounded-lg transition-all duration-300",
        "border border-primary/20",
        "overflow-hidden group",
        "hover:shadow-[0_4px_12px_-6px_rgba(0,0,0,0.1)]",
        "hover:border-primary/40",
        "hover:scale-[1.01]"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-r from-primary/10 to-primary/5",
          "blur-lg transition-all duration-500",
          "group-hover:blur-xl"
        )}
      />

      <div className={cn("relative flex items-center gap-2", "z-10")}>
        <div
          className={cn(
            "p-1.5 rounded-md",
            "bg-primary/10 group-hover:bg-primary/20",
            "transition-all duration-300",
            "group-hover:rotate-[360deg]"
          )}
        >
          <Icon icon="lucide:message-circle" />
        </div>

        <Typography
          variant="span"
          locale={locale}
          className={cn(
            "text-xs font-medium",
            "bg-clip-text",
            "transition-all duration-300",
            "group-hover:text-primary/90",
            "group-hover:translate-x-0.5"
          )}
        >
          {t("faq")}
        </Typography>
      </div>
    </Link>
  );
};
