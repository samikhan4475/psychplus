import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface TextCellProps {
  empty?: boolean
}

const TextCell = ({
  empty,
  children,
}: React.PropsWithChildren<TextCellProps>) => {
  return (
    <Flex direction="column" height="100%" justify="center" px="1">
      <Text
        className={cn('text-[11px]', {
          'text-gray-9': empty,
        })}
      >
        {children}
      </Text>
    </Flex>
  )
}

export { TextCell }
