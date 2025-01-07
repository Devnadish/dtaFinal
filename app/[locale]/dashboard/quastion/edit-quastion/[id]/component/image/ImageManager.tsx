import { useState } from 'react'
import Image from 'next/image'
import { Image as ImageType } from '@/type/faq'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Upload } from 'lucide-react'

interface ImageManagerProps {
  images: ImageType[]
}

export function ImageManager({ images }: ImageManagerProps) {
  const [newImageUrl, setNewImageUrl] = useState('')





  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <Button >
          <Upload className="mr-2 h-4 w-4" /> Add Image
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <Image
              src={image.url}
              alt={`FAQ image`}
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"

            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

