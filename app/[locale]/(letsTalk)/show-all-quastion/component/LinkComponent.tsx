import Link from "next/link";
import { Icon } from "@iconify/react";

export default function QLinkComponent({
  title,
  className = "",
  slug,
  locale,
  icon = "lucide:chevrons-up-down", // Default icon
}: {
  title: React.ReactNode;
  className?: string;
  slug: string;
  locale: string;
  icon?: string; // Iconify icon (optional)
}) {
  return (
    <Link href={`/${locale}/detailquastion/${slug}`} className={className}>
      {title}
      <Icon
        icon={icon} // Iconify icon
        className="h-4 w-4"
        aria-label="Link icon" // Accessibility improvement
      />
    </Link>
  );
}
