


export default async function PostLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string, slug: string }>;
}) {
    // const { locale, slug } = await params;



    return (

        <div className="flex flex-col min-h-screen w-full gap-3 " >

            <main className="flex-grow w-full">{children}</main>
        </div>


    );
}



