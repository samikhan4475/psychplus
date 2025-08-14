import { Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { NoShowHeaderProps } from '../types'

export const NoShowHeader = ({
  title,
  buttons,
  children,
  className,
}: NoShowHeaderProps) => {
  return (
    <Box className={cn('border-pp-ac-border my-1 rounded-3 border', className)}>
      <Flex className="bg-pp-bg-accent flex w-full flex-1 cursor-pointer items-center justify-between rounded-1 py-1">
        <Flex align="center">
          <Flex className="mr-3 transition-transform duration-200"></Flex>
          <Text size="3" weight="medium" className="text-gray-800">
            {title}
          </Text>
        </Flex>
        {buttons && <Flex>{buttons}</Flex>}
      </Flex>
      <Flex className="  py-3">{children}</Flex>
    </Box>
  )
}
