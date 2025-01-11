import Image from "next/image";
import { useState } from "react";

function ImageGallery({images: string[]}) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Images:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer"
            onClick={() => setSelectedImage(image.url)}
          >
            <Image
              src={image.url}
              alt={`FAQ image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


function Lightbox() {
    if (!selectedImage) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        onClick={() => setSelectedImage(null)}
      >
        <div className="relative max-w-3xl max-h-full">
          <Image
            src={selectedImage}
            alt="Selected FAQ image"
            layout="responsive"
            width={800}
            height={600}
            objectFit="contain"
          />
          <Button
            variant="secondary"
            className="absolute top-4 right-4"
            onClick={() => setSelectedImage(null)}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }