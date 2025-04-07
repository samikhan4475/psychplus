import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'

export default function Loading() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      flexGrow="1"
      className="h-full"
    >
      <LoadingPlaceholder />
    </Flex>
  )
}
