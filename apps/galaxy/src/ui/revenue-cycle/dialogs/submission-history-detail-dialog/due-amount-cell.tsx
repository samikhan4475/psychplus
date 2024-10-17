import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface DueAmountCellProps {
  empty?: boolean
  hasPayment?: boolean
  className?: string
}

const DueAmountCell = ({
  empty,
  hasPayment,
  children,
  className,
}: React.PropsWithChildren<DueAmountCellProps>) => {
  return (
    <Flex height="100%" width='100%' align="center" justify='end'>
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
        {!empty && hasPayment ? '$' : ''}
        {children}
      </Text>
    </Flex>
  )
}

export { DueAmountCell }
