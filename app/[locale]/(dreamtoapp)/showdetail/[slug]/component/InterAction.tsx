import React from 'react'
import dynamic from "next/dynamic";
import Viewer from './VieweCounter'
import SkeletonUi from '@/components/headerAndFotter/fotter/SkeltionUi';

const Comments = dynamic(
    () => import('./Comments'),
    {
        loading: () => <p>loading ..</p>,
    }
);

function InterAction() {
    return (
        <div className='w-full flex  items-center justify-between px-4 '>
            <Viewer />
            <Comments />
        </div>
    )
}

export default InterAction