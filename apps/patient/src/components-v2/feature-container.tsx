import { cn } from '@psychplus/ui/cn'
import { Flex } from '@radix-ui/themes'

const FeatureContainer = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
  <Flex
    direction="column"
    gap={{ xs: '5' }}
    className={cn("sm:border-y sm:border-gray-5 border-none border-0", className)}
  >
    {children}
  </Flex>
)

export { FeatureContainer }
