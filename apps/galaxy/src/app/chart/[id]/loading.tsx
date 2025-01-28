import { LoadingPlaceholder } from '@/components'
import { Flex } from '@radix-ui/themes'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
  <Flex direction="column" align="center" justify="center" flexGrow="1" className='h-full'>
    <LoadingPlaceholder />
  </Flex>
)
}
