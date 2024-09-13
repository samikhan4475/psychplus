import { Avatar, Box, Dialog, Flex } from '@radix-ui/themes'
import { PictureFallback, ViewIcon } from './icons'

const ImageViewDialog = ({
  previewSrc,
}: {
  previewSrc: string | undefined
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <ViewIcon className="cursor-pointer" width={16.67} height={10} />
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex className="h-[100%] w-[100%]" align="center" justify="center">
          <Avatar
            size="9"
            color="gray"
            className="mx-auto h-[100%] w-[100%]"
            src={previewSrc}
            fallback={
              <Box>
                <PictureFallback width={150} height={150} />
              </Box>
            }
          />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ImageViewDialog }
