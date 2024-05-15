import { cn } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'

interface CardContainerProps {
  className?: string
}

const CardContainer = ({
  children,
  className,
}: React.PropsWithChildren<CardContainerProps>) => (
  <Flex
    position="relative"
    width="100%"
    height="100%"
    direction="column"
    className={cn('bg-white rounded-3 px-8 py-7 shadow-2', className)}
  >
    {children}
  </Flex>
)

export { CardContainer }
