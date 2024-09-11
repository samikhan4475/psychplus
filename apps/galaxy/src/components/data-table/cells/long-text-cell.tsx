import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { cn } from '@/utils'

interface LongTextCellProps {
  children: React.ReactNode
  className?: string
}

const LongTextCell = ({ children, className }: LongTextCellProps) => {
  return (
    <Flex className={cn('flex h-full flex-col justify-center px-1', className)}>
      <Tooltip content={<Text className="select-text">{children}</Text>}>
        <Text
          className={cn(
            'line-clamp-1 select-text overflow-ellipsis text-[11px]',
            className,
          )}
        >
          {children}
        </Text>
      </Tooltip>
    </Flex>
  )
}

export { LongTextCell }
