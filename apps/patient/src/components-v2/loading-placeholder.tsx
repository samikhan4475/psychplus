import { PlusIcon } from '@psychplus-v2/components'
import { cn } from '@psychplus-v2/utils'
import { Box, Flex } from '@radix-ui/themes'

interface LoadingPlaceholderProps {
  containerClassName?: string
}

const LoadingPlaceholder = ({
  containerClassName,
}: LoadingPlaceholderProps) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    className={cn('py-16', containerClassName)}
    width="100%"
  >
    <Box className="animate-loader h-[50px] w-[50px] text-gray-4">
      <PlusIcon />
    </Box>
  </Flex>
)

export { LoadingPlaceholder }
