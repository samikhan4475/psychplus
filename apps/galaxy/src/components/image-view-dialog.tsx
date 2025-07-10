import { Avatar, Box, Dialog, Flex } from '@radix-ui/themes'
import { cn } from '@/utils'
import { PictureFallback, ViewIcon } from './icons'

const ImageViewDialog = ({
  previewSrc,
  disabled = false,
}: {
  previewSrc: string | undefined
  disabled?: boolean
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <ViewIcon
          className={cn('cursor-pointer', {
            '!pointer-events-none': disabled,
          })}
          width={16.67}
          height={10}
        />
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex className="h-[100%] w-[100%]" align="center" justify="center">
          <Avatar
            size="9"
            color="gray"
            className="mx-auto h-[100%] w-[100%] [&__.rt-AvatarImage]:[imageRendering:-webkit-optimize-contrast]"
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
