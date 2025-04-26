import Image from 'next/image'
import { Box, Button, Dialog } from '@radix-ui/themes'
import { ViewPictureIcon } from '@/components'
import { CloseDialogIcon } from '@/components-v2'

interface CardImgViewDialogProps {
  imageSrc: string | undefined | null
}

const CardImgViewDialog = ({ imageSrc }: CardImgViewDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-transparent p-0">
          <ViewPictureIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative w-full max-w-[780px] p-0">
        <Box className="after:bg-white after:rounded-full after:absolute after:right-3 after:top-2 after:h-9 after:w-9 after:shadow-3">
          <Box className="relative z-10">
            <CloseDialogIcon />
          </Box>
        </Box>
        {imageSrc ? (
          <Box className="relative h-[80vh] w-full">
            <Image
              src={imageSrc}
              alt="insurance card preview"
              fill
              className="object-contain"
            />
          </Box>
        ) : (
          <p className="p-4 text-center">No image to display</p>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CardImgViewDialog }
