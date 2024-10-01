import { Flex } from '@radix-ui/themes'
import { cn } from '@/utils'

interface FormFieldContainerProps {
  className?: string
}

const FormFieldContainer = ({
  className,
  children,
}: React.PropsWithChildren<FormFieldContainerProps>) => (
  <Flex className={cn('gap-x-1 flex-1', className)} align="center">
    {children}
  </Flex>
)

export { FormFieldContainer }
