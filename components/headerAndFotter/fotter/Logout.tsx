import { Icon } from "@iconify/react";
import { signOut, useSession } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <button onClick={() => signOut()} className="text-muted-foreground">
      <Icon icon="material-symbols:logout-rounded" className="w-5 h-5" />
    </button>
  );
}
