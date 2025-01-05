import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';

interface avatarPro {
    imageUrl: string;
    userEmail: string;

}

function BloggerAvatar({ imageUrl, userEmail }: avatarPro) {
    const firstChar = userEmail.charAt(0).toUpperCase();

    return (
        <Avatar className='w-6 h-6'>
            {imageUrl && <Image width={40} height={40} src={imageUrl} alt='userAvatar' />}
            <AvatarFallback>{firstChar}</AvatarFallback>
        </Avatar>
    )
}

export default BloggerAvatar