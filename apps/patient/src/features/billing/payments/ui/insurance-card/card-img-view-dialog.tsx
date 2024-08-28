import { Dialog, Button, Box } from '@radix-ui/themes'
import { CloseDialogIcon } from '@/components-v2'
import { ViewPictureIcon } from '@/components'
import Image from 'next/image'

interface CardImgViewDialogProps {
  imageSrc: string | undefined | null
}

const CardImgViewDialog = ({ imageSrc }: CardImgViewDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger >
        <Button className="bg-transparent p-0">
          <ViewPictureIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[780px] p-0">
        <Box className="after:bg-white after:w-9 after:h-9 after:rounded-full after:absolute after:top-3 after:right-3 after:shadow-3">
          <Box className="relative z-10"><CloseDialogIcon /></Box>
        </Box>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="insurance card preview"
            className="w-[780px] h-[492px]"
            width={780}   
            height={492} 
          />
        ) : (
          <p>No image to display</p>
        )}
       
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CardImgViewDialog }
