import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface TextCellProps {
  empty?: boolean
  className?: string
}

const TextCell = ({
  empty,
  children,
  className,
}: React.PropsWithChildren<TextCellProps>) => {
  return (
    <Flex height="100%" align="center">
      <Text
        className={cn(
          'text-pp-black-3',
          {
            'text-gray-9': empty,
          },
          className,
        )}
        weight="regular"
        size="1"
      >
        {children}
      </Text>
    </Flex>
  )
}

export { TextCell }
