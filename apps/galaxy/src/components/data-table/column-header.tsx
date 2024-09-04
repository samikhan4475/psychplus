import { Flex, Text } from '@radix-ui/themes'
import { type Column } from '@tanstack/react-table'
import { cn } from '@/utils'

interface ColumnHeaderProps<TData, TValue> {
  column?: Column<TData, TValue>
  label: string
  className?: string
}

const ColumnHeader = <TData, TValue>({
  column,
  className,
  label,
}: ColumnHeaderProps<TData, TValue>) => {
  return (
    <Flex height="100%" align="center">
      <Text className={cn('text-[11.5px] font-regular', className)}>
        {label}
      </Text>
    </Flex>
  )
}

export { ColumnHeader }
