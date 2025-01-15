import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { FAQAppSidebar } from "./component/faq-sidebar";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "15rem",
          "--sidebar-width-mobile": "200px",
        } as React.CSSProperties & { [key: `--${string}`]: string }
      } // Type assertion
    >
      <FAQAppSidebar
        useEmail={user?.email ?? ""}
        useName={user?.name ?? ""}
        userImage={user?.image ?? ""}
      />

      <SidebarInset>
        <SidebarTrigger className="-ml-1 sticky top-[60px]" />
        <main className="px-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
