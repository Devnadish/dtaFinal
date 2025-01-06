import { useState } from 'react'
import Image from 'next/image'
import { Image as ImageType } from '@/types/faq'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Upload } from 'lucide-react'

interface ImageManagerProps {
  images: ImageType[]
  onChange: (images: ImageType[]) => void
}

export function ImageManager({ images, onChange }: ImageManagerProps) {
  const [newImageUrl, setNewImageUrl] = useState('')

  const handleAddImage = () => {
    if (newImageUrl) {
      const newImage: ImageType = { id: Date.now().toString(), url: newImageUrl }
      onChange([...images, newImage])
      setNewImageUrl('')
    }
  }

  const handleRemoveImage = (id: string) => {
    const newImages = images.filter(image => image.id !== id)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter image URL"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <Button onClick={handleAddImage}>
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
              onClick={() => handleRemoveImage(image.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

