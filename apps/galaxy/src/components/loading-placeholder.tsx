import { Box, Flex } from '@radix-ui/themes'
import { PsychPlusPlusIcon } from '@/components'
import { cn } from '@/utils'

interface LoadingPlaceholderProps {
  className?: string
}

const LoadingPlaceholder = ({ className }: LoadingPlaceholderProps) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className={cn('flex-1', className)}
      width="100%"
    >
      <Box className="animate-loader h-[45px] w-[45px] text-gray-4">
        <PsychPlusPlusIcon />
      </Box>
    </Flex>
  )
}

export { LoadingPlaceholder }
