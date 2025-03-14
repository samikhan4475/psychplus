import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components-v2'

export default function Loading() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      grow="1"
      className="h-full"
    >
      <LoadingPlaceholder />
    </Flex>
  )
}
