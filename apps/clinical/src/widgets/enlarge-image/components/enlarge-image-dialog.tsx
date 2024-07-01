import { Avatar, Box, Flex } from '@radix-ui/themes'
import { PictureFallback } from '@psychplus/ui/icons'

const EnlargeImageDialog = ({
  previewSrc,
}: {
  previewSrc: string | undefined
}) => {
  return (
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
  )
}

export { EnlargeImageDialog }
