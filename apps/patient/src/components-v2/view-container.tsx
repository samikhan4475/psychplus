import { cn } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'

interface ViewContainerProps {
  className?: string
}

const ViewContainer = ({
  children,
  className,
}: React.PropsWithChildren<ViewContainerProps>) => (
  <Flex width="100%" direction="column" align="center">
    <Flex
      width="100%"
      direction="column"
      gap="5"
      className={cn('max-w-[var(--container-4)] py-[50px]', className)}
    >
      {children}
    </Flex>
  </Flex>
)

export { ViewContainer }
