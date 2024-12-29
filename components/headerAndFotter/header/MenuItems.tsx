import React from "react";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";


import { Icon } from "@iconify/react";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import Typography from "@/components/Text";

const MenuItems = React.memo(() => {
  const t = useTranslations("MenuItems");
  const locale = useLocale();

  // Define menu items with their corresponding icons
  const menuItems = [
    {
      href: `/${locale}/prices`,
      label: t("price"),
      icon: <Icon icon="material-symbols:attach-money-rounded" className="text-primary" />,
    },
    {
      href: `/${locale}/worksample`,
      label: t("sample"),
      icon: <Icon icon="material-symbols:work-history-rounded" className="text-primary" />,
    },
    {
      href: `/${locale}/blog`,
      label: t("blog"),
      icon: <Icon icon="material-symbols:article-rounded" className="text-primary" />,
    },
    {
      href: `/${locale}/faq/ansewrd`,
      label: t("faq"),
      icon: <Icon icon="material-symbols:help-center-rounded" className="text-primary" />,
    },
    {
      href: `/${locale}/contactus`,
      label: t("contactUs"),
      icon: <Icon icon="material-symbols:mail-outline-rounded" className="text-primary" />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-start justify-center gap-4">
      {menuItems.map((item) => (
        <SheetClose asChild key={item.label}>
          <Link
            href={item.href}
            className="flex items-center gap-2 hover:text-primary hover:bg-primary/10 p-2 rounded-md w-full"
          >
            {item.icon}
            <Typography variant="span" className="text-base font-semibold" locale={locale}>
              {item.label}
            </Typography>
          </Link>
        </SheetClose>
      ))}
    </div>
  );
});

MenuItems.displayName = "MenuItems";
export default MenuItems;
