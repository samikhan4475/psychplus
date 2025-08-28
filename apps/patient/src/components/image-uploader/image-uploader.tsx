'use client'

import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { DefaultImagePlaceholderIcon } from '@/components-v2/icons/default-image-placeholder-icon'
import { UploadImage } from '@/components-v2/icons/upload-image'
import { NewImageUpload } from '@/components-v2/icons/new-image-upload'
import { ImageViewDialog } from '../image-view-dialog'

interface ImageUploaderProps {
  onFileChange?: (file: File | undefined) => void
  displayText?: string
  defaultImage?: string | null
  maxHeightClassName?: string
}

const ImageUploader = ({
  onFileChange,
  displayText = 'Upload Image',
  defaultImage = null,
  maxHeightClassName,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(defaultImage)

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    const objectUrl = selectedFile ? URL.createObjectURL(selectedFile) : null

    setPreviewImage(objectUrl)
    onFileChange?.(selectedFile || undefined)
  }

  return (
    <>
      <button
        type="button"
        className={cn(
          'flex justify-center border cursor-pointer aspect-square rounded-[8px] border-pp-gray-2 w-full',
          maxHeightClassName ?? 'max-h-[105px]',
        )}
        onClick={handleFileInputClick}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {previewImage ? (
          <div className="overflow-hidden rounded-[8px] h-full w-full relative">
            <Image
              src={previewImage}
              layout="fill"
              objectFit="cover"
              alt="Preview"
            />
          </div>
        ) : (
          <Flex
            display="inline-flex"
            direction="column"
            className="items-center p-4"
          >
            <div className='pt-4'>
              <DefaultImagePlaceholderIcon width={24} height={24} />
            </div>

            <div className="mt-2 text-center text-[12px]">
              <Text dangerouslySetInnerHTML={{ __html: displayText }} />
            </div>
          </Flex>
        )}

        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </button>

      <Flex gap="6" className='flex-row mt-4 justify-center'>
        <ImageViewDialog disabled={previewImage === null} previewSrc={previewImage as string} />

        <button onClick={handleFileInputClick}>
          <UploadImage />
        </button>

        <button onClick={handleFileInputClick}>
          <NewImageUpload />
        </button>
      </Flex>
    </>

  )
}

export { ImageUploader }
