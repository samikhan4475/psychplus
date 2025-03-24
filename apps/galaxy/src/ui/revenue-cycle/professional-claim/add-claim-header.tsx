import { PropsWithChildren, ReactNode } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ClaimHeadersProps extends PropsWithChildren {
  title: string
  buttons?: ReactNode
  className?: string
}

const ClaimHeaders = ({
  title,
  buttons,
  children,
  className,
}: ClaimHeadersProps) => {
  return (
    <Box className={cn('border-pp-ac-border my-1 rounded-3 border', className)}>
      <Flex className="bg-pp-table-subRows flex w-full flex-1 cursor-pointer items-center justify-between rounded-1 p-1">
        <Flex align="center">
          <Flex className="mr-3 transition-transform duration-200"></Flex>
          <Text size="3" weight="medium" className="text-gray-800">
            {title}
          </Text>
        </Flex>
        {buttons && <Flex>{buttons}</Flex>}
      </Flex>
      <Flex className="p-4">{children}</Flex>
    </Box>
  )
}

export { ClaimHeaders }
