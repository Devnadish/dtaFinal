import type { Metadata } from "next";
import { generateMetadata as generateBaseMetadata } from '@/app/utils/metadata';
import { routing } from '@/i18n/routing';
import InterAction from "./component/InterAction";




export default async function PostLayout({
    children,
    params,
    comments
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string, slug: string }>;
    comments: React.ReactNode;
}) {
    // const { locale, slug } = await params;



    return (

        <div className="flex flex-col min-h-screen w-full gap-3 " >

            <main className="flex-grow w-full">{children}</main>
        </div>

        // <div >
        //     {/* <InterAction /> */}
        //     {children}
        //     {comments}
        // </div>
    );
}



// Update DashboardLayout component
// const AnsweredLayout = async ({
//     children,
//     tags,
// }: {
//     children: React.ReactNode;
//     tags: React.ReactNode;
// }) => {
//     return (
//         <div className="flex flex-col min-h-screen w-full gap-3">
//             <div className="flex flex-col md:flex-row  gap-4 w-full justify-end ">
//                 {tags}
//             </div>
//             <main className="flex-grow w-full">{children}</main>
//         </div>
//     );
// };

