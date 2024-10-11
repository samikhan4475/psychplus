import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

const DateCell = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  return (
    <Flex direction="column" height="100%" justify="center">
      <Text
        className={cn('text-pp-black-3', className)}
        size="1"
        weight="regular"
      >
        {children}
      </Text>
    </Flex>
  )
}

export { DateCell }
