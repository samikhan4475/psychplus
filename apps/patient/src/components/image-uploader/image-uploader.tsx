'use client'

import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { Flex, Text } from '@radix-ui/themes'

interface ImageUploaderProps {
  onFileChange?: (file: File | undefined) => void
  displayText?: string
  defaultImage?: string | null
}

const ImageUploader = ({
  onFileChange,
  displayText = 'Upload Image',
  defaultImage = null,
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
      className="flex h-[257px] w-[312px] cursor-pointer rounded-[20px] border border-dashed border-[#bebebe]"
      onClick={handleFileInputClick}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {previewImage ? (
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={previewImage}
            layout="fill"
            objectFit="cover"
            className="rounded-[20px] p-1"
            alt="Preview"
          />
        </div>
      ) : (
        <Flex
          display="inline-flex"
          direction="column"
          className="relative left-[95px] top-[46px] inline-flex items-center"
        >
          <Image
            src="/images/upload-icon.svg"
            alt=""
            width={120}
            height={120}
          />
          <div className="text-center text-[14px]">
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
