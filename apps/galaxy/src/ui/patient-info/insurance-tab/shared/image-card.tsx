'use client'

import { useState } from 'react'
import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import { PictureFallback } from '@/components/icons'

const ImageControls = dynamic(
  () =>
    import('@/components/image-control.tsx').then((mod) => mod.ImageControls),
  {
    ssr: false,
  },
)
interface PhotoCardProps {
  title?: string
  className?: string
  savedImg?: string
  onImageChanged?: (file: File | undefined) => void
  noControls?: boolean
}
const ImageCard = ({
  title,
  className,
  savedImg,
  onImageChanged,
  noControls = false,
}: PhotoCardProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const onImageChange = (file: File | undefined) => {
    if (!file) return
    const objectUrl = file ? URL.createObjectURL(file) : null

    setPreviewImage(objectUrl)
    onImageChanged?.(file)
  }

  let imageSrc: string | undefined | null = previewImage

  if (!imageSrc) {
    imageSrc = savedImg
  }

  return (
    <Flex gap="2" direction="column" className={className}>
      {title && (
        <Text size="1" weight="medium">
          {title}
        </Text>
      )}
      <Box className="border-pp-focus-outline w-fit rounded-2 border border-dashed p-1">
        <Avatar
          src={imageSrc}
          alt={title ?? ''}
          className="max-h-[140px] min-h-[140px] min-w-[200px] max-w-[200px] rounded-1 shadow-3"
          fallback={<PictureFallback width={140} height={150} />}
        />
      </Box>
      {!noControls && (
        <ImageControls previewSrc={imageSrc} onFileChange={onImageChange} />
      )}
    </Flex>
  )
}

export { ImageCard }
