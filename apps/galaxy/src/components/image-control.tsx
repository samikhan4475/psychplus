'use client'

import { ChangeEvent, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Flex } from '@radix-ui/themes'
import { cn } from '@/utils'
import { ImageEditIcon } from './icons'
import { ImageViewDialog } from './image-view-dialog'

const ImageCaptureDialog = dynamic(
  () =>
    import('./image-capture-dialog.tsx').then((mod) => mod.ImageCaptureDialog),
  {
    ssr: false,
  },
)
interface ImageControlsProps {
  onFileChange: (file: File | undefined) => void
  previewSrc?: string
  className?: string
  disableControls?: boolean
}

const ImageControls = ({
  previewSrc,
  onFileChange,
  className,
  disableControls = false,
}: ImageControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle image upload

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    onFileChange(selectedFile)
  }

  return (
    <Flex align="center" className={cn('gap-[14px]', className)}>
      <ImageViewDialog previewSrc={previewSrc} />
      <button
        onClick={handleFileInputClick}
        onKeyDown={(e) => e.stopPropagation()}
        type="button"
        className={cn({
          'cursor-pointer': !disableControls,
          'cursor-not-allowed': disableControls,
        })}
        disabled={disableControls}
      >
        <ImageEditIcon width={16} height={16} />
        <input
          type="file"
          ref={fileInputRef}
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </button>
      <ImageCaptureDialog onCapture={onFileChange} disabled={disableControls} />
    </Flex>
  )
}

export { ImageControls }
