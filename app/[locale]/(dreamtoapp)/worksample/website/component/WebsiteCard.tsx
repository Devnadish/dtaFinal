"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
interface Website {
    id: number;
    name: string;
    link: string;
    image: string;
}

const WebsiteCard: React.FC<Pick<Website, "name" | "link" | "image">> = ({
    name,
    link,
    image,
}) => {
    console.log(link)
    return (
        <motion.div
            className="relative bg-transparent rounded-lg overflow-hidden shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative w-full h-64">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    // objectFit="cover"
                    className="object-cover rounded-lg"
                    loading="lazy"
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black to-black/50 flex items-center justify-center opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <div
                            className="text-white font-bold text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded hover:bg-gradient-to-l focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Visit{" "}
                            <Icon
                                icon="fa6-solid:external-link"
                                className="inline-block ml-1"
                                aria-hidden="true"
                            />
                        </div>
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WebsiteCard;

