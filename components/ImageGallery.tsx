"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoaderComponent from "@/components/Loader";

interface ImageGalleryProps {
  gallery: string[];
  altTitle: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  }
};

function NoGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[300px] w-full rounded-xl bg-gray-50/10 backdrop-blur-sm border border-gray-200/20"
    >
      <p className="text-gray-500">No images available</p>
    </motion.div>
  );
}

function ImageModal({ image, altTitle }: { image: string; altTitle: string }) {
  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full"
    >
      <Image
        src={image}
        alt={altTitle}
        fill
        className="object-contain"
        quality={100}
        priority
        sizes="90vw"
      />
    </motion.div>
  );
}

function ImageGallery({ gallery, altTitle }: ImageGalleryProps) {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  if (!gallery.length) {
    return <NoGallery />;
  }

  return (
    <div className="w-full">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center min-h-[300px]"
          >
            <LoaderComponent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[90vw] h-[90vh] p-0 border-0 bg-black/80">
          <DialogHeader className="sr-only">
            <DialogTitle>View Image</DialogTitle>
          </DialogHeader>
          <AnimatePresence mode="wait">
            {selectedImage && (
              <ImageModal
                image={selectedImage}
                altTitle={altTitle}
              />
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
      >
        {gallery.map((image: string, index: number) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleImageClick(image)}
            className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50/10 backdrop-blur-sm border border-gray-200/20 shadow-xl cursor-pointer"
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1} - ${altTitle}`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
              onLoad={() => setLoading(false)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
            />
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ImageGallery;