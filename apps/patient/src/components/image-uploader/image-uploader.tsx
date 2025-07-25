'use client'

import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

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
    <button
      type="button"
      className={cn(
        'flex aspect-square h-auto w-full max-w-[312px] cursor-pointer justify-center rounded-[20px] border border-dashed border-[#bebebe] md:w-2/4',
        maxHeightClassName ?? 'max-h-[156px]',
      )}
      onClick={handleFileInputClick}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {previewImage ? (
        <div className="relative h-full w-full overflow-hidden rounded-[20px]">
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
          <Image src="/images/upload-icon.svg" alt="" width={80} height={80} />
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
  )
}

export { ImageUploader }
