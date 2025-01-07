import { getQusationById } from './component/faq/faqActions';
import { FAQEditor } from './component/faq/FAQEditor';
import { FAQ } from '@/type/faq';
import { propType } from '@/constant/type'
import React from 'react'

async function page({ params, searchParams }: propType) {
    const id = (await params).id;
    const FAQ = await getQusationById(id);
    if (!FAQ) return <div>Not Found</div>



    return (
        <div className="container mx-auto ">
            <h1 className="text-2xl font-bold mb-4">Edit FAQ</h1>
            <FAQEditor faq={FAQ as FAQ} />
        </div>
    )
}

export default page





