import { cn } from '@psychplus-v2/utils'
import { Flex, Text, Tooltip } from '@radix-ui/themes'

interface LongTextCellProps {
  children: React.ReactNode
  className?: string
}

const LongTextCell = ({ children, className }: LongTextCellProps) => {
  return (
    <Flex className={cn('flex h-full flex-col justify-center', className)}>
      <Tooltip content={<Text className="select-text">{children}</Text>}>
        <Text
          className={cn(
            'text-pp-black-3 line-clamp-1 select-text overflow-ellipsis',
            className,
          )}
          size="1"
          weight="regular"
        >
          {children}
        </Text>
      </Tooltip>
    </Flex>
  )
}

export { LongTextCell }
