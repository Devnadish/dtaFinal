import { AppSidebar } from "@/components/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="-ml-1" />
        <main className="px-4">
          {children}
        </main>
      </SidebarInset>

    </SidebarProvider>
  )
}



// import Link from "next/link";
// import React from "react";

// const menuItems = [
//   { name: "Quastion", href: "/dashboard/quastion" },
//   { name: "Tags", href: "/dashboard/tags" },
// ];

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="bg-gray-800 text-white p-4">
//         <nav>
//           <ul className="flex space-x-4 justify-between">
//             {menuItems.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className="hover:underline"
//                   aria-label={item.name}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </header>
//       <main className="flex-grow p-4">{children}</main>
//     </div>
//   );
// };

// export default DashboardLayout;
