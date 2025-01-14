import Link from "next/link";

export default function QLinkComponent({
  title,
  className,
  slug,
  locale,
}: {
  title: string;
  className?: string;
  slug: string;
  locale: string;
}) {
  return (
    <Link href={`/${locale}/detailquastion/${slug}`} className={className}>
      {title}
    </Link>
  );
}
