import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface DateTimeCellProps {
  className?: string
}

const DateTimeCell = ({
  children,
  className,
}: React.PropsWithChildren<DateTimeCellProps>) => {
  return (
    <Flex direction="column" height="100%" justify="center">
      <Text
        size="1"
        weight="regular"
        className={cn('text-pp-black-3', className)}
      >
        {children}
      </Text>
    </Flex>
  )
}

export { DateTimeCell }
