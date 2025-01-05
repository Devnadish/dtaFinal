import React from "react";
import { getWorksamplesWebsites } from "./actions/actions";
import WebsiteCard from "./component/WebsiteCard";
import MotionDiv from "@/components/MotionDiv";
import SectionTitle from "@/components/SectionTitle";
import { Icon } from "@iconify/react";


interface Website {
    id: number;
    name: string;
    link: string;
    image: string;
}




async function Page() {
    const websiteSample = await getWorksamplesWebsites("website")

    return (
        <div className="max-w-6xl mx-auto p-4 flex flex-col gap-2">
            <SectionTitle title={"website"}
                icon={
                    <Icon
                        icon="fluent-mdl2:website"
                        className="w-14 h-14 text-emerald-500"
                    />
                } />
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {websiteSample.map((website) => (
                    <WebsiteCard
                        key={website.id}
                        name={website.name}
                        link={website.link}
                        image={website.image}
                    />
                ))}
            </MotionDiv>
        </div>
    );
}

export default Page;