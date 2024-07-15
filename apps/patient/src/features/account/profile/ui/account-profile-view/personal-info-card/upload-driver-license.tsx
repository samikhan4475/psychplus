import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'

interface DriverLicenseInputProps {
  savedImg?: string
  onImageChanged: (file: File | undefined) => void
  className: string
  disabled?: boolean
}

const DriverLicenseInput = ({
  savedImg,
  onImageChanged,
  className,
  disabled,
}: DriverLicenseInputProps) => {
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
    <>
      {imageSrc ? (
        <Flex
          align="center"
          justify="center"
          className="h-48 cursor-pointer items-center justify-center rounded-[5px] border border-dashed border-[#bebebe] text-accent-12 sm:h-24 sm:flex-1"
          onClick={!disabled ? handleImageInput : undefined}
        >
          <Box width="100%" height="100%" className="relative">
            <Image
              loader={() => imageSrc as string}
              src={imageSrc}
              alt="drivers license preview"
              fill
              className="bg-white rounded-[5px] transition-transform sm:hover:z-[1000] sm:hover:scale-[2.5] sm:hover:shadow-3"
            />
            {hasPreviewImage ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setPreviewImage(null)
                  fileInputRef.current?.value &&
                    (fileInputRef.current.value = '')
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
        </Flex>
      ) : (
        <Button
          type="button"
          radius="large"
          className={cn(className, { 'bg-gray-3 text-gray-9': disabled })}
          disabled={disabled}
          onClick={handleImageInput}
        >
          Upload
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={onImageChange}
        accept="image/png, image/jpeg, image/jpg"
      />
    </>
  )
}

export { DriverLicenseInput }
