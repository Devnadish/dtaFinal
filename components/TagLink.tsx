import Link from "next/link";
import Typography from './Text';

function TagLink({
  tag,
  count,
  name,
}: {
  tag: string;
  count: number;
  name: string;
}) {
  return (
    <Link
      href={{ query: { tagname: tag.toLowerCase() } }}
      className="text-white  font-cairo flex items-center justify-center gap-1    w-16 text-xs"
    >
      <Typography variant="span">{name}</Typography>
      <Typography variant="span" className="text-primary text-xs">{count}</Typography>
    </Link>
  );
}

export default TagLink;
