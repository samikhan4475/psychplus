import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { EditCameraIcon, ImagePlaceholderIcon } from '@/components'
import { CardImgViewDialog } from './card-img-view-dialog'

interface CardInputProps {
  savedImg?: string
  onImageChanged: (file: File | undefined) => void
  label: string
  disabled?: boolean
}

const CardInput = ({
  savedImg,
  onImageChanged,
  label,
  disabled = false,
}: CardInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageInput = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    setPreviewImage(objectUrl)
    onImageChanged(file)
  }

  const clearImage = () => {
    setPreviewImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    onImageChanged(undefined)
  }

  const imageSrc = previewImage || savedImg
  const hasImage = !!imageSrc

  return (
    <Box className="flex-1">
      <div
        onClick={handleImageInput}
        className={cn(
          'bg-white relative flex h-[230px] w-full cursor-pointer items-center justify-center rounded-[5px] border border-dashed border-[#bebebe]',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleImageInput();
          }
        }}
      >
        {hasImage ? (
          <div className="relative h-full w-full">
            <Image
              loader={() => imageSrc as string}
              src={imageSrc}
              alt="insurance card preview"
              fill
              className="rounded-md object-contain"
            />

            {previewImage && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  clearImage()
                }}
                color="gray"
                variant="outline"
                className="rounded-full text-white shadow-md absolute -right-2 -top-2 z-10 h-[20px] w-[20px] bg-accent-12"
              >
                <XIcon strokeWidth={1.5} className="h-[18px] w-[18px]" />
              </IconButton>
            )}
          </div>
        ) : (
          <Flex
            height="100%"
            direction="column"
            align="center"
            justify="center"
          >
            <ImagePlaceholderIcon />
            <Text
              className="text-sm w-[92px] pt-2 leading-[20px] text-[#151B4A]"
              align="center"
              size="1"
            >
              {label}
            </Text>
          </Flex>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onImageChange}
          accept="image/png, image/jpeg, image/jpg"
          disabled={disabled}
        />
      </div>

      <Flex gap="3" align="center" className="pt-2">
        {hasImage && <CardImgViewDialog imageSrc={imageSrc} />}
        <Box onClick={handleImageInput} className="cursor-pointer">
          <EditCameraIcon />
        </Box>
      </Flex>
    </Box>
  )
}

export { CardInput }
