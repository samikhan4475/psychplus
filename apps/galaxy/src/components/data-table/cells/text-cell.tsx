import { Flex, Text } from '@radix-ui/themes'
import { cn, formatCurrency } from '@/utils'

interface TextCellProps {
  empty?: boolean
  hasPayment?: boolean
  className?: string
  wrapperClass?: string
}

const TextCell = ({
  empty,
  hasPayment,
  children,
  className,
  wrapperClass,
}: React.PropsWithChildren<TextCellProps>) => {
  return (
    <Flex height="100%" align="center" className={cn(wrapperClass)}>
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
        {!empty && hasPayment ? formatCurrency(Number(children)) : children}
      </Text>
    </Flex>
  )
}

export { TextCell }
