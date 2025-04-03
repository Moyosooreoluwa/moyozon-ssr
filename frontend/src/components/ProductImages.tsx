'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductImages({
  mainImage,
  images,
}: {
  mainImage: string;
  images: string[];
}) {
  const allImages =
    images && images.length > 0 ? [mainImage, ...images] : [mainImage];
  const [selectedImage, setSelectedImage] = useState(mainImage);
  return (
    <>
      <div>
        {/* Main Image */}
        <Image
          src={selectedImage}
          alt="Product Image"
          width={400}
          height={600}
          className="rounded-lg"
        />

        {/* Thumbnail Images */}
        {images.length > 0 && (
          <div className="flex gap-2 mt-4">
            {allImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                width={80}
                height={80}
                className={`cursor-pointer border-2 rounded-lg ${
                  selectedImage === img ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
