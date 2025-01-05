

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface ViewerProps {
    counter?: number;
    commentlength?: number;
}

const VieweCounter: React.FC<ViewerProps> = ({ counter = 0, commentlength = 0 }) => {
    return (
        <div className='absolute top-1 left-1 z-10 flex items-center'>
            <div className={cn(
                'flex items-center gap-2 justify-center p-1.5 text-xs text-white border backdrop-blur-sm bg-black/50 rounded-lg',
                'transition-all duration-300 ease-in-out',
                'hover:bg-black/60',
                'animate-in fade-in-0 slide-in-from-left-1',
            )}>
                <div className='flex items-center gap-2 px-1'>
                    <Icon 
                        icon="hugeicons:eye" 
                        className="w-5 h-5 transition-transform duration-300 hover:scale-110" 
                    />
                    <span className="font-medium">{counter}</span>
                </div>
                <div className='flex items-center gap-2 px-1 border-l border-white/20'>
                    <Icon 
                        icon="fluent:comment-20-filled" 
                        className="w-5 h-5 transition-transform duration-300 hover:scale-110" 
                    />
                    <span className="font-medium">{commentlength}</span>
                </div>
            </div>
        </div>
    );
};

export default VieweCounter;