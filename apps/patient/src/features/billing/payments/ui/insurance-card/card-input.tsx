import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { ImageIcon, XIcon } from 'lucide-react'

interface CardInputProps {
  savedImg?: string
  onImageChanged: (file: File | undefined) => void
  label: string
}

const CardInput = ({ savedImg, onImageChanged, label }: CardInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const objectUrl = file ? URL.createObjectURL(file) : null

    setPreviewImage(objectUrl)
    onImageChanged(file)
  }

  const hasPreviewImage = !!previewImage
  let imageSrc: string | undefined | null = previewImage

  if (!imageSrc) {
    imageSrc = savedImg
  }

  return (
    <Flex
      align="center"
      justify="center"
      className="h-48 cursor-pointer items-center justify-center rounded-[5px] border border-dashed border-[#bebebe] text-accent-12 sm:h-24 sm:flex-1"
      onClick={handleImageInput}
    >
      {imageSrc ? (
        <Box width="100%" height="100%" className="relative">
          <Image
            loader={() => imageSrc as string}
            src={imageSrc}
            alt="insurance card preview"
            fill
            style={{ objectFit: 'cover' }}
            className="bg-white rounded-[5px] transition-transform sm:hover:z-[1000] sm:hover:scale-[2.5] sm:hover:shadow-3"
          />
          {hasPreviewImage ? (
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setPreviewImage(null)
                fileInputRef.current?.value && (fileInputRef.current.value = '')
                onImageChanged(undefined)
              }}
              color="gray"
              variant="outline"
              className="rounded-full text-white absolute -right-2 -top-2 h-[20px] w-[20px] cursor-pointer bg-accent-12"
            >
              <XIcon strokeWidth={1.5} className="h-[18px] w-[18px]" />
            </IconButton>
          ) : null}
        </Box>
      ) : (
        <Flex height="100%" direction="column" align="center" justify="center">
          <ImageIcon strokeWidth={1.5} className="h-[18px] w-[18px]" />
          <Text size="1">{label}</Text>
        </Flex>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={onImageChange}
        accept="image/png, image/jpeg, image/jpg"
      />
    </Flex>
  )
}

export { CardInput }
